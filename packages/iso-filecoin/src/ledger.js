import { StatusCodes } from '@ledgerhq/errors'
import { secp256k1 as secp } from '@noble/curves/secp256k1'
import { hex } from 'iso-base/rfc4648'
import { utf8 } from 'iso-base/utf8'
import { buf, concat, u8 } from 'iso-base/utils'
import * as varint from 'iso-base/varint'

import { blake2b } from '@noble/hashes/blake2b'
import { AddressSecp256k1 } from './address.js'
import { getNetworkFromPath, lotusCid, parseDerivationPath } from './utils.js'

/**
 * @typedef {import('./types.js').Transport} Transport
 * @typedef {keyof typeof SIGNATURE_TYPE} SignatureType
 */

/**
 * Filecoin App APDU return messages
 *
 * @see https://github.com/Zondax/ledger-filecoin/blob/main/docs/APDUSPEC.md#return-codes
 * @type {Record<string, string>}
 *
 */
const RETURN_MSGS = {
  0x9000: 'Success',
  0x9001: 'Busy',
  0x6400: 'Execution Error',
  0x6700: 'Wrong Length',
  0x6982: 'Empty buffer',
  0x6983: 'Output buffer too small',
  0x6984: 'Data is invalid',
  0x6985: 'Conditions not satisfied',
  0x6986: 'Command rejected',
  0x6a80: 'Bad key handle',
  0x6b00: 'Invalid parameter(s)',
  0x6d00: 'Instriction not supported',
  0x6e00: 'Application not supported',
  0x6e01: 'Filecoin app not open',
  0x6f00: 'Unknown',
  0x6f01: 'Sign/verify error',
}

/**
 * APDU codes
 *
 * @see https://github.com/tendermint/ledger-validator-app/blob/master/deps/ledger-zxlib/include/apdu_codes.h
 */
export const APDU_CODES = {
  // ledger supports
  OK: 0x9000,
  BUSY: 0x9001,

  EXECUTION_ERROR: 0x6400,

  // ledger supports
  WRONG_LENGTH: 0x6700,

  /**
   * Ledger name is SECURITY_STATUS_NOT_SATISFIED
   *
   * @see https://github.com/LedgerHQ/ledger-live/blob/d376d5f165ac2b322f7eb3fceb6106c41e04191b/libs/ledgerjs/packages/errors/src/index.ts#L286
   */
  EMPTY_BUFFER: 0x6982,
  OUTPUT_BUFFER_TOO_SMALL: 0x6983,
  DATA_INVALID: 0x6984,
  /**
   * ledger supports
   *
   * @see https://github.com/LedgerHQ/ledger-live/blob/d376d5f165ac2b322f7eb3fceb6106c41e04191b/libs/ledgerjs/packages/errors/src/index.ts#L258
   */
  CONDITIONS_NOT_SATISFIED: 0x6985,
  COMMAND_NOT_ALLOWED: 0x6986,

  /**
   * Ledger name is INCORRECT_DATA
   *
   * @see https://github.com/LedgerHQ/ledger-live/blob/d376d5f165ac2b322f7eb3fceb6106c41e04191b/libs/ledgerjs/packages/errors/src/index.ts#L268
   */
  BAD_KEY_HANDLE: 0x6a80,

  /**
   * ledger supports
   *
   * @see https://github.com/LedgerHQ/ledger-live/blob/d376d5f165ac2b322f7eb3fceb6106c41e04191b/libs/ledgerjs/packages/errors/src/index.ts#L270
   */
  INVALIDP1P2: 0x6b00,
  // ledger supports
  INS_NOT_SUPPORTED: 0x6d00,
  // ledger supports
  CLA_NOT_SUPPORTED: 0x6e00,

  // ledger supports
  UNKNOWN: 0x6f00,

  SIGN_VERIFY_ERROR: 0x6f01,

  APP_NOT_OPEN: 0x6e01,
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
 * Filecoin app error
 */
export class FilecoinAppError extends Error {
  name = 'FilecoinAppError'
  /** @type {number} */
  statusCode

  /**
   * @param {number} statusCode The error status code coming from a Transport implementation
   * @param {string} [data] The error message coming from a instruction call
   */
  constructor(statusCode, data) {
    const statusCodeStr = statusCode.toString(16)
    const message = `Filecoin App: ${RETURN_MSGS[statusCode]}${data ? ` ${data}` : ''} (0x${statusCodeStr})`

    super(message)

    this.statusCode = statusCode
  }
}

/**
 * Check for error returned in the APDU response
 *
 * @param {Buffer} output
 */
function checkError(output) {
  const errorCodeData = output.subarray(-2)
  const code = hex.encode(errorCodeData)
  const intCode = Number.parseInt(code, 16)

  if (
    intCode === APDU_CODES.DATA_INVALID ||
    intCode === APDU_CODES.BAD_KEY_HANDLE
  ) {
    return new FilecoinAppError(
      intCode,
      output.subarray(0, output.length - 2).toString('ascii')
    )
  }
  if (intCode !== APDU_CODES.OK) {
    return new FilecoinAppError(intCode)
  }
}

/**
 * Sign chunk of data
 *
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
    [
      StatusCodes.OK,
      APDU_CODES.BAD_KEY_HANDLE,
      APDU_CODES.DATA_INVALID,
      APDU_CODES.APP_NOT_OPEN,
      APDU_CODES.COMMAND_NOT_ALLOWED,
    ]
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
 * @returns {boolean}
 * @example
 * ```ts twoslash
 * import { verifyRaw } from 'iso-filecoin/ledger'
 *
 * const signature = new Uint8Array([1, 2, 3])
 * const data = new Uint8Array([4, 5, 6])
 * const publicKey = new Uint8Array([7, 8, 9])
 * const isValid = verifyRaw(signature, data, publicKey)
 * // => true
 * ```
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
   * @example
   * ```ts twoslash
   * import { LedgerFilecoin } from 'iso-filecoin/ledger'
   * import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
   *
   * const transport = await TransportWebUSB.create()
   * const ledger = new LedgerFilecoin(transport)
   * const version = await ledger.getVersion()
   * // => '1.0.0'
   * ```
   */
  async getVersion() {
    const out = await this.transport.send(
      CLA,
      INS.GET_VERSION,
      0,
      0,
      undefined,
      [StatusCodes.OK, APDU_CODES.APP_NOT_OPEN]
    )
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
   * @returns {Promise<import('./types.js').IAccount>}
   */
  async getAddress(path, showOnDevice = false) {
    const out = await this.transport.send(
      CLA,
      INS.GET_ADDR_SECP256K1,
      showOnDevice ? 0x01 : 0x00,
      0x00,
      serializeDerivationPath(path),
      [StatusCodes.OK, APDU_CODES.APP_NOT_OPEN, APDU_CODES.COMMAND_NOT_ALLOWED]
    )

    const err = checkError(out)
    if (err) {
      throw err
    }

    const publicKey = u8(out.subarray(0, 65))

    return {
      type: 'SECP256K1',
      address: AddressSecp256k1.fromPublicKey(
        publicKey,
        getNetworkFromPath(path)
      ),
      publicKey,
      path,
    }
  }

  /**
   * Sign a message
   *
   * @param {string} path - Derivation path
   * @param {Uint8Array} message - Message to sign in bytes
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

  /**
   * Close the transport
   */
  close() {
    return this.transport.close()
  }
}
