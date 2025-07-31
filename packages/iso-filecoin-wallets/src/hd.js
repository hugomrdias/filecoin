/** biome-ignore-all lint/suspicious/useAwait: sync version */
import { pathFromNetwork } from 'iso-filecoin/utils'
import {
  accountFromSeed,
  mnemonicToSeed,
  personalSign,
  sign,
  signMessage,
} from 'iso-filecoin/wallet'
import { TypedEventTarget } from 'iso-web/event-target'
import { nanoid } from 'nanoid'
import { WalletSupport } from './common.js'

const symbol = Symbol.for('wallet-adapter-hd')

/**
 * @import { WalletAdapter, WalletEvents, WalletHDConfig, WalletHDMnemonicConfig, WalletSupportType } from './types.js'
 */

/**
 * @typedef {import('iso-filecoin/types').Network} Network
 * @typedef {import('iso-filecoin/types').IAccount} IAccount
 * @typedef {import('iso-filecoin/types').MessageObj} MessageObj
 * @typedef {import('iso-filecoin/types').SignatureType} SignatureType
 */

/**
 * HD wallet implementation
 *
 * @implements {WalletAdapter} - {@link WalletAdapter}
 * @extends {TypedEventTarget<WalletEvents>}
 */
export class WalletAdapterHd extends TypedEventTarget {
  /** @type {boolean} */
  [symbol] = true
  uid = `hd-${nanoid(5)}`
  id = 'hd'
  name = 'Burner Wallet'
  url = 'https://filecoin.io'
  /**@type {IAccount | undefined}*/
  account = undefined

  /** @type {Uint8Array | undefined} */
  #seed

  /** @type {number} */
  #index

  /** @type {boolean} */
  #isConnecting

  /** @type {WalletSupportType} */
  #support = WalletSupport.Detected

  /**
   *
   * @param {WalletHDConfig} config
   */
  constructor(config = {}) {
    super()
    this.name = config.name ?? this.name
    this.#seed = config.seed
    this.#index = config.index ?? 0
    this.#isConnecting = false

    this.network = config.network ?? 'mainnet'
    this.signatureType = config.signatureType ?? 'SECP256K1'
  }

  /**
   * @param {WalletAdapter} value
   * @returns {value is WalletAdapterHd}
   */
  static is(value) {
    return symbol in value
  }

  /**
   * HD wallet from mnemonic
   *
   * @param {WalletHDMnemonicConfig} config
   * @returns
   */
  static fromMnemonic(config) {
    const seed = mnemonicToSeed(config.mnemonic, config.password)

    return new WalletAdapterHd({
      network: config.network,
      signatureType: config.signatureType,
      index: config.index,
      seed,
    })
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

  /**
   * Setup the wallet from a mnemonic
   *
   * @param {WalletHDMnemonicConfig & { index?: number }} config
   */
  setup(config) {
    this.#seed = mnemonicToSeed(config.mnemonic, config.password)
    this.#index = config.index ?? this.#index
  }

  /**
   * @param {{ network?: Network }} [params]
   */
  async connect(params = {}) {
    if (!this.#seed) {
      throw new Error('No seed found')
    }
    if (this.#isConnecting || this.connected) {
      if (!this.account) throw new Error('No account found')
      return { account: this.account, network: this.network }
    }
    this.#isConnecting = true

    try {
      if (params.network) {
        this.network = params.network
      }

      this.account = accountFromSeed(
        this.#seed,
        this.signatureType,
        pathFromNetwork(this.network, this.#index),
        this.network
      )
      this.emit('connect', { account: this.account, network: this.network })
      return { account: this.account, network: this.network }
    } finally {
      this.#isConnecting = false
    }
  }

  async disconnect() {
    this.account = undefined
    this.emit('disconnect')
  }

  /**
   * @param {Network} network
   */
  async changeNetwork(network) {
    if (!this.connected || !this.account || !this.#seed) {
      throw new Error('Adapter is not connected')
    }

    if (this.network === network) {
      return { account: this.account, network: this.network }
    }

    this.account = accountFromSeed(
      this.#seed,
      this.signatureType,
      pathFromNetwork(network, this.#index),
      network
    )
    this.network = network
    this.emit('networkChanged', {
      network: this.network,
      account: this.account,
    })

    return { account: this.account, network: this.network }
  }

  /**
   * @param {number } index
   */
  async deriveAccount(index) {
    if (!this.connected || !this.account || !this.#seed) {
      throw new Error('Adapter is not connected')
    }

    this.#index = index
    this.account = accountFromSeed(
      this.#seed,
      this.signatureType,
      pathFromNetwork(this.network, this.#index),
      this.network
    )
    this.emit('accountChanged', this.account)
    return this.account
  }

  /**
   *
   * @param {Uint8Array} data - Data to sign
   */
  async sign(data) {
    if (!this.account) {
      throw new Error('Client is not connected')
    }

    if (!this.account.privateKey) {
      throw new Error('Private key not found')
    }
    return sign(this.account.privateKey, this.signatureType, data)
  }

  /**
   * @type {WalletAdapter['personalSign']}
   * @inheritdoc
   */
  async personalSign(data) {
    if (!this.account) {
      throw new Error('Client is not connected')
    }

    if (!this.account.privateKey) {
      throw new Error('Private key not found')
    }
    return personalSign(this.account.privateKey, this.signatureType, data)
  }

  /**
   *
   * @param {MessageObj} message - Filecoin message to sign
   */
  async signMessage(message) {
    if (!this.account) {
      throw new Error('Client is not connected')
    }

    if (!this.account.privateKey) {
      throw new Error('Private key not found')
    }
    return signMessage(this.account.privateKey, this.signatureType, message)
  }
}
