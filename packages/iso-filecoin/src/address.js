/**
 * Filecoin address
 *
 * @module
 */

import { blake2b } from '@noble/hashes/blake2b'
import * as leb128 from 'iso-base/leb128'
import { base32, hex } from 'iso-base/rfc4648'
import { concat, equals, isBufferSource, u8 } from 'iso-base/utils'
import {
  checkNetworkPrefix,
  checksumEthAddress,
  getCache,
  getNetwork,
  NETWORKS,
} from './utils.js'

export { checksumEthAddress } from './utils.js'

/**
 * @import {AddressRpcOptions, AddressRpcSafetyOptions} from './types.js'
 */

/**
 * @typedef {import('./types.js').IAddress} IAddress
 * @typedef { string | IAddress | BufferSource} Value
 */

/**
 * Protocol indicator
 */
export const PROTOCOL_INDICATOR = /** @type {const} */ ({
  ID: 0,
  SECP256K1: 1,
  ACTOR: 2,
  BLS: 3,
  DELEGATED: 4,
})

const symbol = Symbol.for('filecoin-address')

/**
 * Asserts that the given value is an {@link IAddress} instance.
 *
 * @example
 * ```ts twoslash
 * import { isAddress, fromString } from 'iso-filecoin/address'
 *
 * const address = isAddress(fromString('f1...')) // true

 * const notAddress = isAddress('f1...') // falseeeeeee
 * ```
 *
 * @param {any} val
 * @returns {val is IAddress}
 */
export function isAddress(val) {
  return Boolean(val?.[symbol])
}

/**
 * Check if object is a {@link AddressSecp256k1} instance
 *
 * @param {any} val
 * @returns {val is AddressSecp256k1}
 */
export function isAddressSecp256k1(val) {
  return Boolean(val?.[symbol]) && val.protocol === PROTOCOL_INDICATOR.SECP256K1
}

/**
 * Check if object is a {@link AddressBLS} instance
 *
 * @param {any} val
 * @returns {val is AddressBLS}
 */
export function isAddressBls(val) {
  return Boolean(val?.[symbol]) && val.protocol === PROTOCOL_INDICATOR.BLS
}

/**
 * Check if object is a {@link AddressId} instance
 *
 * @param {any} val
 * @returns {val is AddressId}
 */
export function isAddressId(val) {
  return Boolean(val?.[symbol]) && val.protocol === PROTOCOL_INDICATOR.ID
}

/**
 * Check if object is a {@link AddressDelegated} instance
 *
 * @param {any} val
 * @returns {val is AddressDelegated}
 */
export function isAddressDelegated(val) {
  return Boolean(val?.[symbol]) && val.protocol === PROTOCOL_INDICATOR.DELEGATED
}

/**
 * Validate checksum
 *
 * @param {Uint8Array} actual
 * @param {Uint8Array} expected
 */
function validateChecksum(actual, expected) {
  return equals(actual, expected)
}

/**
 * Check if string is valid Ethereum address
 *
 * Based on viem implementation  {@link https://github.com/wevm/viem/blob/main/src/utils/address/isAddress.ts}
 *
 * @param {string} address
 */
export function isEthAddress(address) {
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) return false
  if (address.toLowerCase() === address) return true
  return checksumEthAddress(address) === address
}

/**
 * Checks if address is an Ethereum ID mask address
 *
 * @param {string} address
 */
export function isIdMaskAddress(address) {
  if (!isEthAddress(address)) {
    return false
  }
  const bytes = hex.decode(address.substring(2))
  const idMaskPrefix = new Uint8Array(12).fill(255, 0, 1)
  return equals(bytes.slice(0, 12), idMaskPrefix)
}

/**
 * Address from Ethereum address
 *
 * @param {string} address
 * @param {import('./types.js').Network} network
 * @returns {IAddress}
 */
export function fromEthAddress(address, network) {
  if (isIdMaskAddress(address)) {
    return AddressId.fromIdMaskAddress(address, network)
  }
  return AddressDelegated.fromEthAddress(address, network)
}

/**
 * Ethereum address from f0 or f4 addresses
 *
 * @param {IAddress} address
 */
export function toEthAddress(address) {
  if (address.protocol === PROTOCOL_INDICATOR.ID) {
    return /** @type {AddressId} */ (address).toIdMaskAddress()
  }

  if (address.protocol === PROTOCOL_INDICATOR.DELEGATED) {
    return /** @type {AddressDelegated} */ (address).toEthAddress()
  }
  throw new Error(
    `Invalid protocol indicator: ${address.protocol}. Only Delegated ad ID Addresses are supported.`
  )
}

/**
 * @param {Value} value - Value to convert to address
 * @param {import('./types.js').Network} [network] - Network
 * @returns {IAddress}
 */
export function from(value, network = 'mainnet') {
  if (isBufferSource(value)) {
    return fromBytes(u8(value), network)
  }

  if (isAddress(value)) {
    return value
  }

  if (typeof value === 'string') {
    return isEthAddress(value)
      ? fromEthAddress(value, network)
      : fromString(value)
  }

  throw new Error(`Invalid value: ${value}`)
}

/**
 * Address from string
 *
 * @param {string} address
 * @returns {IAddress}
 */
export function fromString(address) {
  const type = Number.parseInt(address[1])

  switch (type) {
    case PROTOCOL_INDICATOR.SECP256K1: {
      return AddressSecp256k1.fromString(address)
    }

    case PROTOCOL_INDICATOR.DELEGATED: {
      return AddressDelegated.fromString(address)
    }

    case PROTOCOL_INDICATOR.ACTOR: {
      return AddressActor.fromString(address)
    }

    case PROTOCOL_INDICATOR.BLS: {
      return AddressBLS.fromString(address)
    }

    case PROTOCOL_INDICATOR.ID: {
      return AddressId.fromString(address)
    }

    default: {
      throw new Error(`Invalid protocol indicator: ${type}`)
    }
  }
}

/**
 * Create address from bytes
 *
 * @param {Uint8Array} bytes
 * @param {import('./types.js').Network} network
 * @returns {IAddress}
 */
export function fromBytes(bytes, network) {
  const type = bytes[0]

  switch (type) {
    case PROTOCOL_INDICATOR.SECP256K1: {
      return AddressSecp256k1.fromBytes(bytes, network)
    }
    case PROTOCOL_INDICATOR.DELEGATED: {
      return AddressDelegated.fromBytes(bytes, network)
    }
    case PROTOCOL_INDICATOR.BLS: {
      return AddressBLS.fromBytes(bytes, network)
    }
    case PROTOCOL_INDICATOR.ACTOR: {
      return AddressActor.fromBytes(bytes, network)
    }
    case PROTOCOL_INDICATOR.ID: {
      return AddressId.fromBytes(bytes, network)
    }

    default: {
      throw new Error(`Invalid protocol indicator: ${type}`)
    }
  }
}

/**
 * Create address from public key bytes
 * Only for f1 SECP256K1 and f3 BLS
 *
 * @param {Uint8Array} bytes
 * @param {import('./types.js').Network} network
 * @param {import('./types.js').SignatureType} type
 * @returns IAddress
 */
export function fromPublicKey(bytes, network, type) {
  switch (type) {
    case 'SECP256K1': {
      return AddressSecp256k1.fromPublicKey(bytes, network)
    }

    case 'BLS': {
      return AddressBLS.fromPublicKey(bytes, network)
    }

    default: {
      throw new Error(`Invalid signature type: ${type}`)
    }
  }
}

/**
 * Create an `Address` instance from a 0x-prefixed hex string address returned by `Address.toContractDestination()`.
 *
 * @param {`0x${string}`} address - The 0x-prefixed hex string address.
 * @param {import("./types.js").Network} network - The network the address is on.
 */
export function fromContractDestination(address, network) {
  if (!address.startsWith('0x')) {
    throw new Error(`Expected 0x prefixed hex, instead got: '${address}'`)
  }
  return fromBytes(hex.decode(address.slice(2).toLowerCase()), network)
}

/**
 * Generic address class
 *
 * @implements {IAddress}
 */
class Address {
  /** @type {boolean} */
  [symbol] = true

  /**
   *
   * @param {Uint8Array} payload
   * @param {import("./types.js").Network} network
   */
  constructor(payload, network) {
    this.payload = payload
    this.network = network
    this.networkPrefix = NETWORKS[network]
    /** @type {import('./types.js').ProtocolIndicatorCode} */
    this.protocol = PROTOCOL_INDICATOR.ID
  }

  toString() {
    return `${this.networkPrefix}${this.protocol}${base32
      .encode(concat([this.payload, this.checksum()]), false)
      .toLowerCase()}`
  }

  toBytes() {
    return concat([hex.decode(`0${this.protocol}`), this.payload])
  }

  toContractDestination() {
    return /** @type {`0x${string}`} */ (`0x${hex.encode(this.toBytes())}`)
  }

  checksum() {
    return blake2b(this.toBytes(), {
      dkLen: 4,
    })
  }

  /**
   * @inheritdoc IAddress.toIdAddress
   * @param {AddressRpcSafetyOptions} options
   * @returns {Promise<AddressId>}
   */
  async toIdAddress(options) {
    const { rpc } = options
    if (rpc.network !== this.network) {
      throw new Error(
        `Network mismatch. RPC network: ${rpc.network} Address network: ${this.network}`
      )
    }

    const cache = getCache(options.cache)
    const key = ['id', this.toString()]

    let idAddress

    if (isAddressId(this)) {
      idAddress = /** @type {AddressId} */ (this)
    }

    const cached = await /** @type {typeof cache.get<string>}*/ (cache.get)(key)
    if (cached && options.safety === 'finalized') {
      return AddressId.fromString(cached)
    }

    if (isAddressDelegated(this)) {
      const id = await rpc.getIDAddress({
        address: this.toString(),
        safety: options.safety ?? 'finalized',
      })
      if (id.error) {
        throw new Error(id.error.message)
      }

      idAddress = AddressId.fromString(id.result)
    } else {
      // f1,f2 and f3 uses the faster endpoint
      idAddress = AddressId.fromIdMaskAddress(
        await this.to0x(options),
        this.network
      )
    }

    if (options.safety === 'finalized') {
      await cache.set(key, idAddress.toString())
    }
    return idAddress
  }

  /**
   * @inheritdoc IAddress.to0x
   * @param {AddressRpcSafetyOptions} options
   * @returns {Promise<string>}
   */
  async to0x(options) {
    const { rpc } = options
    if (rpc.network !== this.network) {
      throw new Error(
        `Network mismatch. RPC network: ${rpc.network} Address network: ${this.network}`
      )
    }

    const cache = getCache(options.cache)
    const key = ['0x', this.toString()]
    const cached = await /** @type {typeof cache.get<string>}*/ (cache.get)(key)
    if (cached && options.safety === 'finalized') {
      return cached
    }

    // f1,f2 and f3 uses the faster endpoint
    const r = await rpc.filecoinAddressToEthAddress({
      address: this.toString(),
      blockNumber: options.safety ?? 'finalized',
    })

    if (r.error) {
      throw new Error(r.error.message)
    }

    if (!isIdMaskAddress(r.result)) {
      throw new Error(`Invalid ID masked 0x address: ${r.result}`)
    }

    if (options.safety === 'finalized') {
      await cache.set(key, r.result)
    }
    return r.result
  }
}

/**
 * ID Address f0..
 *
 * Protocol 0 addresses are simple IDs. All actors have a numeric ID even if they don’t have public keys. The payload of an ID address is base10 encoded. IDs are not hashed and do not have a checksum.
 *
 * @see https://spec.filecoin.io/appendix/address/#section-appendix.address.protocol-0-ids
 *
 * @implements {IAddress}
 */
export class AddressId extends Address {
  /**
   *
   * @param {Uint8Array} payload
   * @param {import("./types.js").Network} network
   */
  constructor(payload, network) {
    super(payload, network)
    this.protocol = PROTOCOL_INDICATOR.ID
    this.id = leb128.unsigned.decode(payload)[0]
  }

  /**
   * Create address from string
   *
   * @param {string} address
   */
  static fromString(address) {
    const networkPrefix = address[0]
    const protocolIndicator = address[1]

    if (!checkNetworkPrefix(networkPrefix)) {
      throw new Error(`Invalid network: ${networkPrefix}`)
    }

    if (Number.parseInt(protocolIndicator) !== PROTOCOL_INDICATOR.ID) {
      throw new Error(`Invalid protocol indicator: ${protocolIndicator}`)
    }

    const newAddress = new AddressId(
      leb128.unsigned.encode(address.slice(2)),
      getNetwork(networkPrefix)
    )

    return newAddress
  }

  /**
   * Create address from bytes
   *
   * @param {Uint8Array} bytes
   * @param {import('./types.js').Network} network
   */
  static fromBytes(bytes, network) {
    if (bytes[0] !== PROTOCOL_INDICATOR.ID) {
      throw new Error(`Invalid protocol indicator: ${bytes[0]}`)
    }
    return new AddressId(bytes.subarray(1), network)
  }

  /**
   * Create ID address from ID masked 0x address
   *
   * @param {string} address
   * @param {import('./types.js').Network} network
   */
  static fromIdMaskAddress(address, network) {
    if (!isIdMaskAddress(address)) {
      throw new Error(`Invalid Ethereum ID mask address: ${address}`)
    }

    const bytes = hex.decode(address.slice(2))

    if (bytes.length !== 20) {
      throw new Error(
        `Invalid Ethereum payload length: ${bytes.length} should be 20.`
      )
    }
    const dataview = new DataView(bytes.buffer)
    const idBigInt = dataview.getBigUint64(12, false)
    const leb128Id = leb128.unsigned.encode(idBigInt)

    return new AddressId(leb128Id, network)
  }

  /**
   * Convert address to ID masked 0x address
   *
   * To convert to an eth address you probably should use {@link to0x}
   */
  toIdMaskAddress() {
    const buf = new ArrayBuffer(20)
    const dataview = new DataView(buf)
    dataview.setUint8(0, 255)
    dataview.setBigUint64(12, this.id, false)
    return checksumEthAddress(`0x${hex.encode(new Uint8Array(buf))}`)
  }

  toString() {
    return `${this.networkPrefix}${this.protocol}${this.id}`
  }

  /**
   * Get robust address from public key address
   *
   * @param {AddressRpcOptions} options
   */
  async toRobust(options) {
    const { rpc } = options
    if (rpc.network !== this.network) {
      throw new Error(
        `Network mismatch. RPC network: ${rpc.network} Address network: ${this.network}`
      )
    }

    const cache = getCache(options.cache)
    const key = ['robust', this.toString()]
    const cached = await /** @type {typeof cache.get<string>}*/ (cache.get)(key)
    if (cached) {
      return fromString(cached)
    }

    const r = await rpc.stateAccountKey({ address: this.toString() })

    if (r.error) {
      throw new Error(r.error.message)
    }

    const robust = fromString(r.result)
    await cache.set(key, robust.toString())

    return robust
  }

  /**
   * @param {AddressRpcOptions} options
   */
  async to0x(options) {
    const { rpc } = options
    if (rpc.network !== this.network) {
      throw new Error(
        `Network mismatch. RPC network: ${rpc.network} Address network: ${this.network}`
      )
    }

    const cache = getCache(options.cache)
    const key = ['0x', this.toString()]
    const cached = await /** @type {typeof cache.get<string>}*/ (cache.get)(key)
    if (cached) {
      return cached
    }

    const robust = await this.toRobust(options)
    const eth = await robust.to0x(options)
    await cache.set(key, eth)

    return eth
  }
}

/**
 * Secp256k1 address f1..
 *
 * @see https://spec.filecoin.io/appendix/address/#section-appendix.address.protocol-1-libsecpk1-elliptic-curve-public-keys
 *
 * @implements {IAddress}
 */
export class AddressSecp256k1 extends Address {
  /**
   *
   * @param {Uint8Array} payload
   * @param {import("./types.js").Network} network
   */
  constructor(payload, network) {
    super(payload, network)
    this.protocol = PROTOCOL_INDICATOR.SECP256K1

    if (payload.length !== 20) {
      throw new Error(`Invalid payload length: ${payload.length} should be 20.`)
    }
  }

  /**
   * Create address from string
   *
   * @param {string} address
   */
  static fromString(address) {
    const networkPrefix = address[0]
    const protocolIndicator = address[1]

    if (!checkNetworkPrefix(networkPrefix)) {
      throw new Error(`Invalid network: ${networkPrefix}`)
    }

    if (Number.parseInt(protocolIndicator) !== PROTOCOL_INDICATOR.SECP256K1) {
      throw new Error(`Invalid protocol indicator: ${protocolIndicator}`)
    }

    const data = base32.decode(address.slice(2).toUpperCase())
    const payload = data.subarray(0, -4)
    const checksum = data.subarray(-4)
    const newAddress = new AddressSecp256k1(payload, getNetwork(networkPrefix))

    if (validateChecksum(newAddress.checksum(), checksum)) {
      return newAddress
    }
    throw new Error('Invalid checksum')
  }

  /**
   * Create address from bytes
   *
   * @param {Uint8Array} bytes
   * @param {import('./types.js').Network} network
   * @returns
   */
  static fromBytes(bytes, network) {
    if (bytes[0] !== PROTOCOL_INDICATOR.SECP256K1) {
      throw new Error(`Invalid protocol indicator: ${bytes[0]}`)
    }
    return new AddressSecp256k1(bytes.subarray(1), network)
  }

  /**
   * @param {Uint8Array} publicKey
   * @param {import('./types.js').Network} network
   */
  static fromPublicKey(publicKey, network) {
    if (publicKey.length !== 65) {
      throw new Error(
        `Invalid public key length: ${publicKey.length} should be 65.`
      )
    }
    const payload = blake2b(publicKey, {
      dkLen: 20,
    })
    return new AddressSecp256k1(payload, network)
  }
}

/**
 * Actor Address f2..
 *
 * Protocol 2 addresses representing an Actor. The payload field contains the SHA256 hash of meaningful data produced as a result of creating the actor.
 *
 * @see https://spec.filecoin.io/appendix/address/#section-appendix.address.protocol-2-actor
 *
 * @implements {IAddress}
 */
export class AddressActor extends Address {
  /**
   *
   * @param {Uint8Array} payload
   * @param {import("./types.js").Network} network
   */
  constructor(payload, network) {
    super(payload, network)
    this.protocol = PROTOCOL_INDICATOR.ACTOR
    if (payload.length !== 20) {
      throw new Error(`Invalid payload length: ${payload.length} should be 20.`)
    }
  }

  /**
   * Create address from string
   *
   * @param {string} address
   */
  static fromString(address) {
    const networkPrefix = address[0]
    const protocolIndicator = address[1]

    if (!checkNetworkPrefix(networkPrefix)) {
      throw new Error(`Invalid network: ${networkPrefix}`)
    }

    if (Number.parseInt(protocolIndicator) !== PROTOCOL_INDICATOR.ACTOR) {
      throw new Error(`Invalid protocol indicator: ${protocolIndicator}`)
    }

    const data = base32.decode(address.slice(2).toUpperCase())
    const payload = data.subarray(0, -4)
    const checksum = data.subarray(-4)
    const newAddress = new AddressActor(payload, getNetwork(networkPrefix))

    if (validateChecksum(newAddress.checksum(), checksum)) {
      return newAddress
    }
    throw new Error('Invalid checksum')
  }

  /**
   * Create address from bytes
   *
   * @param {Uint8Array} bytes
   * @param {import('./types.js').Network} network
   * @returns
   */
  static fromBytes(bytes, network) {
    if (bytes[0] !== PROTOCOL_INDICATOR.ACTOR) {
      throw new Error(`Invalid protocol indicator: ${bytes[0]}`)
    }
    return new AddressActor(bytes.subarray(1), network)
  }
}

/**
 * BLS Address f3..
 *
 * Protocol 3 addresses represent BLS public encryption keys. The payload field contains the BLS public key.
 *
 * @see https://spec.filecoin.io/appendix/address/#section-appendix.address.protocol-3-bls
 *
 * @implements {IAddress}
 */
export class AddressBLS extends Address {
  /**
   *
   * @param {Uint8Array} payload
   * @param {import("./types.js").Network} network
   */
  constructor(payload, network) {
    super(payload, network)
    this.protocol = PROTOCOL_INDICATOR.BLS
    if (payload.length !== 48) {
      throw new Error(`Invalid payload length: ${payload.length} should be 48.`)
    }
  }

  /**
   * Create address from string
   *
   * @param {string} address
   */
  static fromString(address) {
    const networkPrefix = address[0]
    const protocolIndicator = address[1]

    if (!checkNetworkPrefix(networkPrefix)) {
      throw new Error(`Invalid network: ${networkPrefix}`)
    }

    if (Number.parseInt(protocolIndicator) !== PROTOCOL_INDICATOR.BLS) {
      throw new Error(
        `Invalid protocol indicator: ${protocolIndicator} expected ${PROTOCOL_INDICATOR.BLS}`
      )
    }

    const data = base32.decode(address.slice(2).toUpperCase())
    const payload = data.subarray(0, -4)
    const checksum = data.subarray(-4)
    const newAddress = new AddressBLS(payload, getNetwork(networkPrefix))

    if (validateChecksum(newAddress.checksum(), checksum)) {
      return newAddress
    }
    throw new Error('Invalid checksum')
  }

  /**
   * Create address from bytes
   *
   * @param {Uint8Array} bytes
   * @param {import('./types.js').Network} network
   * @returns
   */
  static fromBytes(bytes, network) {
    if (bytes[0] !== PROTOCOL_INDICATOR.BLS) {
      throw new Error(`Invalid protocol indicator: ${bytes[0]}`)
    }
    return new AddressBLS(bytes.subarray(1), network)
  }

  /**
   *
   * @param {Uint8Array} publicKey
   * @param {import('./types.js').Network} network
   */
  static fromPublicKey(publicKey, network) {
    if (publicKey.length !== 48) {
      throw new Error(
        `Invalid public key length: ${publicKey.length} should be 48.`
      )
    }
    return new AddressBLS(publicKey, network)
  }
}

/**
 * Delegated address f4..
 *
 * @see https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0048.md
 *
 * @implements {IAddress}
 */
export class AddressDelegated extends Address {
  /**
   * @param {number} namespace
   * @param {Uint8Array} payload
   * @param {import("./types.js").Network} network
   */
  constructor(namespace, payload, network) {
    super(payload, network)
    this.protocol = PROTOCOL_INDICATOR.DELEGATED
    this.namespace = namespace

    if (namespace !== 10) {
      throw new Error(
        `Invalid namespace: ${namespace}. Only Ethereum Address Manager (EAM) is supported.`
      )
    }
    if (payload.length === 0 || payload.length > 54) {
      throw new Error(
        `Invalid payload length: ${payload.length} should be 54 bytes or less.`
      )
    }
  }

  /**
   * Create address from string
   *
   * @param {string} address
   */
  static fromString(address) {
    const networkPrefix = address[0]
    const protocolIndicator = address[1]

    if (!checkNetworkPrefix(networkPrefix)) {
      throw new Error(`Invalid network: ${networkPrefix}`)
    }

    if (Number.parseInt(protocolIndicator) !== PROTOCOL_INDICATOR.DELEGATED) {
      throw new Error(`Invalid protocol indicator: ${protocolIndicator}`)
    }

    const namespace = address.slice(2, address.indexOf('f', 2))
    const dataEncoded = address.slice(address.indexOf('f', 2) + 1)

    const data = base32.decode(dataEncoded.toUpperCase())
    const payload = data.subarray(0, -4)
    const checksum = data.subarray(-4)
    const newAddress = new AddressDelegated(
      Number.parseInt(namespace),
      payload,
      getNetwork(networkPrefix)
    )

    if (validateChecksum(newAddress.checksum(), checksum)) {
      return newAddress
    }
    throw new Error('Invalid checksum')
  }

  /**
   * Create address from bytes
   *
   * @param {Uint8Array} bytes
   * @param {import('./types.js').Network} network
   * @returns
   */
  static fromBytes(bytes, network) {
    if (bytes[0] !== PROTOCOL_INDICATOR.DELEGATED) {
      throw new Error(`Invalid protocol indicator: ${bytes[0]}`)
    }

    const [namespace, size] = leb128.unsigned.decode(bytes, 1)

    return new AddressDelegated(
      Number(namespace),
      bytes.subarray(1 + size),
      network
    )
  }

  /**
   * Create delegated address from ethereum address
   *
   * @param {string} address
   * @param {import('./types.js').Network} network
   */
  static fromEthAddress(address, network) {
    if (!isEthAddress(address)) {
      throw new Error(`Invalid Ethereum address: ${address}`)
    }

    if (isIdMaskAddress(address)) {
      throw new Error(`Cannot convert Ethereum ID mask address: ${address}`)
    }

    const bytes = hex.decode(address.slice(2).toLowerCase())
    if (bytes.length !== 20) {
      throw new Error(
        `Invalid Ethereum payload length: ${bytes.length} should be 20.`
      )
    }

    return new AddressDelegated(10, bytes, network)
  }

  /**
   * Convert address to ethereum address
   *
   * @param {AddressRpcOptions} _rpc
   * @returns {Promise<string>}
   */
  to0x(_rpc) {
    return Promise.resolve(this.toEthAddress())
  }

  /**
   * Converts to 0x eth address, it's similar to {@link to0x} but sync
   * because f4s dont need to check the chain to get the address
   *
   */
  toEthAddress() {
    if (this.payload.length > 20) {
      throw new Error(
        `Invalid payload length: ${this.payload.length} should be 20.`
      )
    }

    return checksumEthAddress(`0x${hex.encode(this.payload)}`)
  }

  toString() {
    return `${this.networkPrefix}${this.protocol}${this.namespace}f${base32
      .encode(concat([this.payload, this.checksum()]), false)
      .toLowerCase()}`
  }

  toBytes() {
    const protocol = leb128.unsigned.encode(this.protocol)
    const namespace = leb128.unsigned.encode(this.namespace)
    return concat([protocol, namespace, this.payload])
  }
}
