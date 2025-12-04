import { bls12_381 as bls } from '@noble/curves/bls12-381'
import { secp256k1 as secp } from '@noble/curves/secp256k1'
import { blake2b } from '@noble/hashes/blake2.js'
import { HDKey } from '@scure/bip32'
import * as bip39 from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english.js'
import { base64pad, hex } from 'iso-base/rfc4648'
import { utf8 } from 'iso-base/utf8'
import { concat } from 'iso-base/utils'
import { z } from 'zod'
import { fromPublicKey } from './address.js'
import { Message } from './message.js'
import { Signature } from './signature.js'
import { getNetworkFromPath } from './utils.js'

/**
 * @import {SetRequired} from 'type-fest'
 */

/**
 * FRC-102 prefix
 *
 * @see https://github.com/filecoin-project/FIPs/blob/master/FRCs/frc-0102.md
 */
const FRC_102_PREFIX = '\x19Filecoin Signed Message:\n'

/**
 * Schemas
 */
export const Schemas = {
  lotusPrivateKey: z.object({
    Type: z.union([z.literal('bls'), z.literal('secp256k1')]),
    /**
     * Lotus BLS private key is little endian so you need to reverse the byte order.
     * base64pad(private-key)
     */
    PrivateKey: z.string(),
  }),
}

/**
 * Generate mnemonic
 */
export function generateMnemonic() {
  return bip39.generateMnemonic(wordlist, 256)
}

/**
 * Get seed from mnemonic
 *
 * @param {string} mnemonic
 * @param {string} [password]
 */
export function mnemonicToSeed(mnemonic, password) {
  return bip39.mnemonicToSeedSync(mnemonic, password)
}

/**
 * Get HD account from mnemonic
 *
 * @param {string} mnemonic
 * @param {import('./types.js').SignatureType} type
 * @param {string} path
 * @param {string} [password]
 * @param {import('./types.js').Network} [network]
 */
export function accountFromMnemonic(mnemonic, type, path, password, network) {
  const seed = mnemonicToSeed(mnemonic, password)
  return accountFromSeed(seed, type, path, network)
}

/**
 * Get HD account from seed
 *
 * @param {Uint8Array} seed
 * @param {import('./types.js').SignatureType} type
 * @param {string} path
 * @param {import('./types.js').Network} [network]
 * @returns {SetRequired<import('./types.js').IAccount, 'privateKey' | 'path'>}
 */
export function accountFromSeed(seed, type, path, network) {
  const masterKey = HDKey.fromMasterSeed(seed)
  const privateKey = masterKey.derive(path).privateKey

  if (!privateKey) {
    throw new Error('Private key could not be generated.')
  }

  if (!network) {
    network = getNetworkFromPath(path)
  }

  const { address, publicKey } = getPublicKey(privateKey, network, type)

  return {
    type,
    privateKey,
    publicKey,
    address,
    path,
  }
}

/**
 * Get account from private key
 *
 * Lotus BLS private key is little endian so you need to reverse the byte order. Use `lotusBlsPrivateKeyToBytes` to convert.
 *
 * @param {Uint8Array} privateKey
 * @param {import('./types.js').SignatureType} type
 * @param {import('./types.js').Network} network
 * @param {string} [path]
 * @returns {SetRequired<import('./types.js').IAccount, 'privateKey'>}
 */
export function accountFromPrivateKey(privateKey, type, network, path) {
  if (privateKey.length !== 32) {
    throw new Error('Private key should be 32 bytes.')
  }

  const { address, publicKey } = getPublicKey(privateKey, network, type)

  return {
    type,
    privateKey,
    publicKey,
    address,
    path,
  }
}

/**
 * Get account from lotus private key export
 *
 * @param {string} lotusHex - Lotus hex encoded private key .ie `hex({"Type":"bls","PrivateKey":"base64pad(private-key)"})`
 * @param {import('./types.js').Network} network - Network
 * @returns {import('./types.js').IAccount}
 */
export function accountFromLotus(lotusHex, network) {
  const lotusJson = Schemas.lotusPrivateKey.parse(
    JSON.parse(utf8.encode(hex.decode(lotusHex)))
  )
  if (lotusJson.Type === 'bls') {
    return accountFromPrivateKey(
      lotusBlsPrivateKeyToBytes(lotusJson.PrivateKey),
      'BLS',
      network
    )
  }
  return accountFromPrivateKey(
    base64pad.decode(lotusJson.PrivateKey),
    'SECP256K1',
    network
  )
}

/**
 * Create account
 *
 * @param {import('./types.js').SignatureType} type
 * @param {import('./types.js').Network} network
 * @returns {SetRequired<import('./types.js').IAccount, 'privateKey'>}
 */
export function create(type, network) {
  switch (type) {
    case 'SECP256K1': {
      return accountFromPrivateKey(secp.utils.randomPrivateKey(), type, network)
    }

    case 'BLS': {
      return accountFromPrivateKey(bls.utils.randomPrivateKey(), type, network)
    }
    default: {
      throw new Error(
        `Create does not support "${type}" type. Use SECP256K1 or BLS.`
      )
    }
  }
}

/**
 * Get public key from private key
 *
 * @param {Uint8Array} privateKey
 * @param {import('./types.js').Network} network
 * @param {import('./types.js').SignatureType} type
 * @returns {import('./types.js').IAccount}
 */
export function getPublicKey(privateKey, network, type) {
  switch (type) {
    case 'SECP256K1': {
      const publicKey = secp.getPublicKey(privateKey, false)

      return {
        type: 'SECP256K1',
        publicKey,
        address: fromPublicKey(publicKey, network, 'SECP256K1'),
      }
    }
    case 'BLS': {
      const publicKey = bls.getPublicKey(privateKey)

      return {
        type: 'BLS',
        publicKey,
        address: fromPublicKey(publicKey, network, 'BLS'),
      }
    }
    default: {
      throw new Error(
        `getPublicKey does not support "${type}" type. Use SECP256K1 or BLS.`
      )
    }
  }
}

/**
 * Sign filecoin message
 *
 * @param {Uint8Array} privateKey
 * @param {import('./types.js').SignatureType} type
 * @param {import('./types.js').MessageObj} message
 * @returns
 */
export function signMessage(privateKey, type, message) {
  const cid = new Message(message).cidBytes()

  return sign(privateKey, type, cid)
}

/**
 * Sign arbitary bytes similar to `lotus wallet sign`
 *
 * Lotus BLS private key is little endian so you need to reverse the byte order. Use `lotusBlsPrivateKeyToBytes` to convert.
 *
 * @param {Uint8Array} privateKey
 * @param {import('./types.js').SignatureType} type
 * @param {Uint8Array} data
 */
export function sign(privateKey, type, data) {
  switch (type) {
    case 'SECP256K1': {
      const signature = secp.sign(
        blake2b(data, {
          dkLen: 32,
        }),
        privateKey
      )

      return new Signature({
        type: 'SECP256K1',
        data: concat([
          signature.toBytes('compact'),
          Uint8Array.from([signature.recovery]),
        ]),
      })
    }

    case 'BLS': {
      const signature = bls.sign(data, privateKey)
      return new Signature({
        type: 'BLS',
        data: signature,
      })
    }
    default: {
      throw new Error(
        `Sign does not support "${type}" type. Use SECP256K1 or BLS.`
      )
    }
  }
}

/**
 * Personal sign using FRC-102
 *
 * @see https://github.com/filecoin-project/FIPs/blob/master/FRCs/frc-0102.md
 *
 * @param {Uint8Array} privateKey
 * @param {import('./types.js').SignatureType} type
 * @param {Uint8Array} data
 */
export function personalSign(privateKey, type, data) {
  const prefix = utf8.decode(`${FRC_102_PREFIX}${data.length}`)
  return sign(privateKey, type, concat([prefix, data]))
}

/**
 * Personal verify using FRC-102
 *
 * @see https://github.com/filecoin-project/FIPs/blob/master/FRCs/frc-0102.md
 *
 * @param {import('./signature.js').Signature} signature
 * @param {Uint8Array} data
 * @param {Uint8Array} publicKey
 */
export function personalVerify(signature, data, publicKey) {
  const prefix = utf8.decode(`${FRC_102_PREFIX}${data.length}`)
  return verify(signature, concat([prefix, data]), publicKey)
}

/**
 * Verify signatures
 *
 * @param {import('./signature.js').Signature} signature
 * @param {Uint8Array} data
 * @param {Uint8Array} publicKey
 */
export function verify(signature, data, publicKey) {
  switch (signature.type) {
    case 'SECP256K1': {
      return secp.verify(
        secp.Signature.fromBytes(
          signature.data.subarray(0, 64),
          'compact'
        ).toBytes(),
        blake2b(data, {
          dkLen: 32,
        }),
        publicKey
      )
    }

    case 'BLS': {
      return bls.verify(signature.data, data, publicKey)
    }
    default: {
      throw new Error(
        `Verify does not support "${signature.type}" type. Use SECP256K1 or BLS.`
      )
    }
  }
}

/**
 * Lotus BLS base64 private key to bytes
 * Lotus BLS private key is little endian so you need to reverse the byte order.
 *
 * @param {string} priv
 */
export function lotusBlsPrivateKeyToBytes(priv) {
  return base64pad.decode(priv).reverse()
}

/**
 *
 * @param {Signature} signature
 * @param {Uint8Array} data
 */
export function recoverPublicKey(signature, data) {
  if (signature.type === 'BLS') {
    throw new Error('Recover public key is not supported for BLS')
  }

  const hash = blake2b(data, {
    dkLen: 32,
  })
  return secp.Signature.fromBytes(signature.data.subarray(0, 64), 'compact')
    .addRecoveryBit(signature.data[64])
    .recoverPublicKey(hash)
    .toRawBytes(false)
}

/**
 *
 * @param {Signature} signature
 * @param {Uint8Array} data
 * @param {import('./types.js').Network} network
 */
export function recoverAddress(signature, data, network) {
  const publicKey = recoverPublicKey(signature, data)
  return fromPublicKey(publicKey, network, 'SECP256K1')
}

/**
 * Export account to lotus private key export format (hex)
 *
 * @param {import('./types.js').IAccount} account
 */
export function accountToLotus(account) {
  if (account.privateKey == null) {
    throw new Error('Private key not found')
  }

  if (account.type === 'BLS') {
    return hex.encode(
      JSON.stringify({
        Type: 'bls',
        PrivateKey: base64pad.encode(account.privateKey?.reverse()),
      })
    )
  }
  return hex.encode(
    JSON.stringify({
      Type: 'secp256k1',
      PrivateKey: base64pad.encode(account.privateKey),
    })
  )
}
