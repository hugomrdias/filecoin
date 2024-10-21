import { bls12_381 as bls } from '@noble/curves/bls12-381'
import { secp256k1 as secp } from '@noble/curves/secp256k1'
import { blake2b } from '@noble/hashes/blake2b'
import { HDKey } from '@scure/bip32'
import * as bip39 from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'
import { base64pad } from 'iso-base/rfc4648'
import { concat } from 'iso-base/utils'
import { fromPublicKey } from './address.js'
import { Message } from './message.js'
import { Signature } from './signature.js'
import { getNetworkFromPath } from './utils.js'

/**
 *
 * @returns
 */
export function generateMnemonic() {
  return bip39.generateMnemonic(wordlist, 256)
}

/**
 * @param {string} mnemonic
 * @param {string} [password]
 */
export function mnemonicToSeed(mnemonic, password) {
  return bip39.mnemonicToSeedSync(mnemonic, password)
}

/**
 * Get account from mnemonic
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
 * Get account from seed
 *
 * @param {Uint8Array} seed
 * @param {import('./types.js').SignatureType} type
 * @param {string} path
 * @param {import('./types.js').Network} [network]
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

  const { address, pubKey } = getPublicKey(privateKey, network, type)

  return {
    type,
    privateKey,
    pubKey,
    address,
    path,
  }
}

/**
 * Get account from private key
 *
 * @param {Uint8Array} privateKey
 * @param {import('./types.js').SignatureType} type
 * @param {import('./types.js').Network} network
 * @param {string} [path]
 */
export function accountFromPrivateKey(privateKey, type, network, path) {
  if (privateKey.length !== 32) {
    throw new Error('Private key should be 32 bytes.')
  }

  const { address, pubKey } = getPublicKey(privateKey, network, type)

  return {
    type,
    privateKey,
    pubKey,
    address,
    path,
  }
}

/**
 * Create account
 *
 * @param {import('./types.js').SignatureType} type
 * @param {import('./types.js').Network} network
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
 */
export function getPublicKey(privateKey, network, type) {
  switch (type) {
    case 'SECP256K1': {
      const publicKey = secp.getPublicKey(privateKey, false)

      return {
        pubKey: publicKey,
        address: fromPublicKey(publicKey, network, 'SECP256K1'),
      }
    }
    case 'BLS': {
      const publicKey = bls.getPublicKey(privateKey)

      return {
        pubKey: publicKey,
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
  const msg = new Message(message).serialize()
  const cid = concat([
    // cidv1 1byte + dag-cbor 1byte + blake2b-256 4bytes
    Uint8Array.from([0x01, 0x71, 0xa0, 0xe4, 0x02, 0x20]),
    blake2b(msg, {
      dkLen: 32,
    }),
  ])

  return sign(privateKey, type, cid)
}

/**
 * Sign arbitary bytes similar to `lotus wallet sign`
 *
 * Lotus private key is little endian so you need to reverse the byte order. Use `lotusBlsPrivateKeyToBytes` to convert.
 *
 * @param {Uint8Array} privateKey
 * @param {import('./types.js').SignatureType} type
 * @param {string | Uint8Array} message
 */
export function sign(privateKey, type, message) {
  switch (type) {
    case 'SECP256K1': {
      const signature = secp.sign(
        blake2b(message, {
          dkLen: 32,
        }),
        privateKey
      )

      return new Signature({
        type: 'SECP256K1',
        data: concat([
          signature.toCompactRawBytes(),
          Uint8Array.from([signature.recovery]),
        ]),
      })
    }

    case 'BLS': {
      const signature = bls.sign(message, privateKey)
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
 *
 * @param {import('./signature.js').Signature} signature
 * @param {Uint8Array} message
 * @param {Uint8Array} publicKey
 */
export function verify(signature, message, publicKey) {
  switch (signature.type) {
    case 'SECP256K1': {
      return secp.verify(
        secp.Signature.fromCompact(signature.data.subarray(0, 64)),
        blake2b(message, {
          dkLen: 32,
        }),
        publicKey
      )
    }

    case 'BLS': {
      return bls.verify(signature.data, message, publicKey)
    }
    default: {
      throw new Error(
        `Verify does not support "${signature.type}" type. Use SECP256K1 or BLS.`
      )
    }
  }
}

/**
 * Lotus BLS private key to bytes
 * Lotus private key is little endian so you need to reverse the byte order.
 * @param {string} priv
 */
export function lotusBlsPrivateKeyToBytes(priv) {
  return base64pad.decode(priv).reverse()
}
