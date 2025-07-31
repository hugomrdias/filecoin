/** biome-ignore-all lint/suspicious/useAwait: sync version */
import {
  create,
  getPublicKey,
  personalSign,
  sign,
  signMessage,
} from 'iso-filecoin/wallet'
import { TypedEventTarget } from 'iso-web/event-target'
import { nanoid } from 'nanoid'
import { WalletSupport } from './common.js'

const symbol = Symbol.for('wallet-adapter-raw')

/**
 * @typedef {import('./types.js').WalletAdapter} WalletAdapter
 * @typedef {import('iso-filecoin/types').IAccount} IAccount
 * @typedef {import('iso-filecoin/types').Network} Network
 * @typedef {import('iso-filecoin/types').MessageObj} MessageObj
 * @typedef {import('iso-filecoin/types').SignatureType} SignatureType
 */

/**
 * @param {Uint8Array} privateKey
 * @param {Network} network
 * @param {SignatureType} signatureType
 * @returns {IAccount}
 */
function createAccount(privateKey, network, signatureType) {
  const { address, publicKey } = getPublicKey(
    privateKey,
    network,
    signatureType
  )

  return {
    type: signatureType,
    address,
    publicKey,
    privateKey: privateKey,
  }
}

/**
 * Raw wallet implementation
 *
 * @implements {WalletAdapter} - {@link WalletAdapter}
 * @extends {TypedEventTarget<import('./types.js').WalletEvents>}
 */
export class WalletAdapterRaw extends TypedEventTarget {
  /** @type {boolean} */
  [symbol] = true
  uid = `raw-${nanoid(5)}`
  id = 'raw'
  name = 'Raw (Unsafe)'
  url = 'https://filecoin.io'

  /**@type {IAccount | undefined}*/
  account = undefined

  /** @type {boolean} */
  #isConnecting

  /** @type {import('./types.js').WalletSupportType} */
  #support = WalletSupport.Detected

  /**
   *
   * @param {import('./types.js').WalletConfig & ({privateKey: Uint8Array} )} config
   */
  constructor(config) {
    super()
    this.#isConnecting = false
    this.network = config.network ?? 'mainnet'
    this.signatureType = config.signatureType ?? 'SECP256K1'
    this.privateKey = config.privateKey
    this.name = config.name ?? this.name
    if (!this.privateKey) {
      throw new Error('Private key not found')
    }

    if (this.privateKey.length !== 32) {
      throw new Error('Private key should be 32 bytes.')
    }
  }

  static create() {
    return new WalletAdapterRaw({
      network: 'mainnet',
      signatureType: 'SECP256K1',
      privateKey: create('SECP256K1', 'mainnet').privateKey,
    })
  }

  /**
   * @param {{ network?: Network }} [params]
   */

  async connect(params = {}) {
    if (this.#isConnecting || this.connected) {
      if (!this.account) throw new Error('No account found')
      return { account: this.account, network: this.network }
    }
    this.#isConnecting = true

    try {
      if (params.network) {
        this.network = params.network
      }

      this.account = createAccount(
        this.privateKey,
        this.network,
        this.signatureType
      )
      this.emit('connect', { account: this.account, network: this.network })
      return { account: this.account, network: this.network }
    } finally {
      this.#isConnecting = false
    }
  }

  get connecting() {
    return this.#isConnecting
  }

  get connected() {
    return this.account !== undefined
  }
  get support() {
    return this.#support
  }

  async checkSupport() {
    this.#support = WalletSupport.Detected
  }

  async disconnect() {
    this.account = undefined
    this.emit('disconnect')
  }

  /**
   * @param {Network} network
   */

  async changeNetwork(network) {
    if (!this.connected || !this.account) {
      throw new Error('Adapter is not connected')
    }

    if (this.network === network) {
      return { account: this.account, network: this.network }
    }

    this.account = createAccount(this.privateKey, network, this.signatureType)
    this.network = network
    this.emit('networkChanged', {
      network: this.network,
      account: this.account,
    })
    return { account: this.account, network: this.network }
  }

  /**
   * @param {number } _index
   * @returns {Promise<IAccount>}
   */
  async deriveAccount(_index) {
    const err = new Error('Local wallet is not a HD wallet')
    this.emit('error', err)
    throw err
  }

  /**
   * @type {WalletAdapter['sign']}
   */
  async sign(data) {
    if (!this.account) {
      throw new Error('Client is not connected')
    }
    return sign(this.privateKey, this.signatureType, data)
  }

  /**
   * @type {WalletAdapter['personalSign']}
   * @inheritdoc
   */
  async personalSign(data) {
    if (!this.account) {
      throw new Error('Client is not connected')
    }
    return personalSign(this.privateKey, this.signatureType, data)
  }

  /**
   *
   * @param {MessageObj} message - Filecoin message to sign
   */
  async signMessage(message) {
    if (!this.connected) {
      throw new Error('Client is not connected')
    }
    return signMessage(this.privateKey, this.signatureType, message)
  }
}
