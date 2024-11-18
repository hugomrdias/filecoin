import { secp256k1 as secp } from '@noble/curves/secp256k1'
import { hex } from 'iso-base/rfc4648'
import { utf8 } from 'iso-base/utf8'
import { buf, concat } from 'iso-base/utils'
import * as varint from 'iso-base/varint'

import { blake2b } from '@noble/hashes/blake2b'
import { lotusCid, parseDerivationPath } from './utils.js'

/**
 * @typedef {import('./types.js').Transport} Transport
 * @typedef {keyof typeof SIGNATURE_TYPE} SignatureType
 */

/**
 * Filecoin App APDU return messages
 *
 * @see https://github.com/Zondax/ledger-filecoin/blob/main/docs/APDUSPEC.md#return-codes
 *
 * @type {Record<string, string>}
 */
const RETURN_MSGS = {
  6400: 'Execution Error',
  6982: 'Empty buffer',
  6983: 'Output buffer too small',
  6984: 'Data is invalid',
  6986: 'Command not allowed',
  '6a80': 'Bad key handle',
  '6d00': 'INS not supported',
  '6e00': 'CLA not supported',
  '6f00': 'Unknown',
  9000: 'Success',
}

export const EIP191_PREFIX = 'Filecoin Sign Bytes:\n'

export const IS_HID_SUPPORTED =
  // @ts-ignore
  'navigator' in globalThis && navigator.hid !== undefined

const CHUNK_SIZE = 250

/**
 * @see https://github.com/Zondax/ledger-filecoin/blob/main/docs/APDUSPEC.md
 */
const CLA = 0x06
const INS = {
  GET_VERSION: 0x00,
  GET_ADDR_SECP256K1: 0x01,
  SIGN_SECP256K1: 0x02,
  SIGN_DATA_CAP: 0x05,
  SIGN_CLIENT_DEAL: 0x06,
  SIGN_RAW_BYTES: 0x07,
}

const SIGNATURE_TYPE = {
  SECP256K1: 0x02,
  DATA_CAP: 0x05,
  CLIENT_DEAL: 0x06,
  RAW_BYTES: 0x07,
}

/**
 * Serialize derivation path
 *
 * @param {string} path
 */
function serializeDerivationPath(path) {
  const pathComponents = parseDerivationPath(path)
  const bytes = new ArrayBuffer(20)
  const view = new DataView(bytes)
  view.setUint32(0, 0x80000000 + pathComponents.purpose, true)
  view.setUint32(4, 0x80000000 + pathComponents.coinType, true)
  view.setUint32(8, 0x80000000 + pathComponents.account, true)
  view.setUint32(12, pathComponents.change, true)
  view.setUint32(16, pathComponents.addressIndex, true)

  return buf(view)
}

/**
 * @param {Buffer} output
 */
function checkError(output) {
  const errorCodeData = output.subarray(-2)
  const code = hex.encode(errorCodeData)

  if (code === '6984') {
    return new Error(
      `${RETURN_MSGS[code]} ${output.subarray(0, output.length - 2).toString('ascii')}`
    )
  }
  if (code !== '9000') {
    return new Error(RETURN_MSGS[code] || 'Unknown')
  }
}

/**
 * @param {Transport} transport - Ledger transport
 * @param {number} index
 * @param {number} size
 * @param {Uint8Array} data
 * @param {number} [instruction=0x02]
 */
async function signChunk(transport, index, size, data, instruction = 0x02) {
  let payloadDesc = 0x00
  if (index !== 0) {
    payloadDesc = 0x01
  }
  if (index === size - 1) {
    payloadDesc = 0x02
  }

  const out = await transport.send(
    0x06,
    instruction,
    payloadDesc,
    0,
    buf(data),
    [0x9000, 0x6984, 0x6a80, 0x6986]
  )

  const err = checkError(out)
  if (err) {
    throw err
  }

  return out.subarray(0, 65)
}

/**
 * Verify raw signature
 *
 * @param {Uint8Array} signature
 * @param {Uint8Array} data
 * @param {Uint8Array} publicKey
 * @returns
 */
export function verifyRaw(signature, data, publicKey) {
  const prefix = utf8.decode(EIP191_PREFIX)
  const prefixed = concat([prefix, data])
  const cid = lotusCid(prefixed)

  return secp.verify(
    signature.subarray(0, 64),
    blake2b(cid, {
      dkLen: 32,
    }),
    publicKey
  )
}

/**
 * Ledger Filecoin app client
 */
export class LedgerFilecoin {
  /**
   *
   * @param {Transport} transport  - Ledger transport
   */
  constructor(transport) {
    this.transport = transport
    transport.decorateAppAPIMethods(
      this,
      ['getVersion', 'getAddress', 'sign'],
      'Filecoin'
    )
  }

  /**
   * Get the version of the Filecoin app
   *
   * @see https://github.com/LedgerHQ/app-filecoin/blob/develop/docs/APDUSPEC.md#get_version
   *
   */
  async getVersion() {
    const out = await this.transport.send(CLA, INS.GET_VERSION, 0, 0)
    const err = checkError(out)
    if (err) {
      throw err
    }

    return out.subarray(1, 4).join('.')
  }

  /**
   * Get the secp256k1 address for a given derivation path
   *
   * @see https://github.com/LedgerHQ/app-filecoin/blob/develop/docs/APDUSPEC.md#ins_get_addr_secp256k1
   *
   * @param {string} path - Derivation path
   * @param {boolean} [showOnDevice=false] - Whether to show the address on the device
   */
  async getAddress(path, showOnDevice = false) {
    const out = await this.transport.send(
      CLA,
      INS.GET_ADDR_SECP256K1,
      showOnDevice ? 0x01 : 0x00,
      0x00,
      serializeDerivationPath(path)
    )
    const err = checkError(out)
    if (err) {
      throw err
    }

    const byteLen = out.subarray(65, 66)
    const addressStringLength = out.subarray(
      66 + byteLen[0],
      66 + byteLen[0] + 1
    )
    const addressString = out.subarray(
      66 + byteLen[0] + 1,
      66 + byteLen[0] + 1 + addressStringLength[0]
    )

    return addressString.toString()
  }

  /**
   * Sign a message
   *
   * @param {string} path - Derivation path
   * @param {Uint8Array} message - Message to sign
   * @param {SignatureType} [type=SECP256K1] - Signature type
   */
  async sign(path, message, type = 'SECP256K1') {
    const chunks = []
    chunks.push(serializeDerivationPath(path))

    for (
      let start = 0, end = 1;
      start < message.length;
      start += CHUNK_SIZE, end++
    ) {
      chunks.push(message.subarray(start, CHUNK_SIZE * end))
    }

    let result

    for (let index = 0; index < chunks.length; index++) {
      result = await signChunk(
        this.transport,
        index,
        chunks.length,
        chunks[index],
        SIGNATURE_TYPE[type]
      )
    }

    if (!result) {
      throw new Error('Sign failed')
    }

    return new Uint8Array(result.buffer, result.byteOffset, result.byteLength)
  }

  /**
   * Sign raw bytes using prefixed message similar to EIP-191
   *
   * @param {string} path - Derivation path
   * @param {Uint8Array} message - Message to sign
   */
  signRaw(path, message) {
    const prefix = utf8.decode(EIP191_PREFIX)
    const prefixed = concat([prefix, message])
    const data = concat([varint.encode(prefixed.length)[0], prefixed])

    return this.sign(path, data, 'RAW_BYTES')
  }
}
