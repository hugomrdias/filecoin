import { pathFromNetwork } from 'iso-filecoin/utils'
import {
  accountFromSeed,
  mnemonicToSeed,
  sign,
  signMessage,
} from 'iso-filecoin/wallet'
import { TypedEventTarget } from 'iso-web/event-target'
import { WalletSupport } from './common.js'

const symbol = Symbol.for('wallet-adapter-hd')

/**
 * @typedef {import('iso-filecoin/types').Network} Network
 * @typedef {import('iso-filecoin/types').IAccount} IAccount
 * @typedef {import('iso-filecoin/types').MessageObj} MessageObj
 * @typedef {import('iso-filecoin/types').SignatureType} SignatureType
 * @typedef {import('./types.js').WalletAdapter} WalletAdapter
 * @typedef {import('./types.js').WalletConfig} WalletConfig
 * @typedef {import('./types.js').WalletEvents} WalletEvents
 * @typedef {import('./types.js').WalletSupportType} WalletSupportType
 * @typedef {import('./types.js').WalletHDConfig} WalletHDConfig
 * @typedef {import('./types.js').WalletHDMnemonicConfig} WalletHDMnemonicConfig
 *
 */

/**
 * HD wallet implementation
 *
 * @implements {WalletAdapter}
 * @extends {TypedEventTarget<WalletEvents>}
 */
export class WalletAdapterHd extends TypedEventTarget {
  /** @type {boolean} */
  [symbol] = true
  name = 'HD Burner Wallet'
  url = 'https://filecoin.io'
  icon =
    'data:image/svg+xml,%3Csvg%20width%3D%2234%22%20height%3D%2234%22%20viewBox%3D%22-5%200%2034%2034%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M23.555%2025.1A11.979%2011.979%200%200%201%200%2021.857a7.9%207.9%200%200%201%20.485-2.924C1.643%2011.595%208.785%2011.063%204.8%200c0%200%206.65%201.727%208%2012.143%200%200%204.919-.163%201.6-7.286A21.31%2021.31%200%200%201%2024%2020c.027%201.71-.122%203.42-.445%205.1%22%20fill%3D%22%23FF6E6E%22%2F%3E%3Cpath%20d%3D%22M19%2026.5a7.5%207.5%200%200%201-14.975.484L4%2027s-.075-3.272%200-4c.684-6.611%202.6-9.563%205-14%20.067-2.639-1.115%207.273%205%2010a8.19%208.19%200%200%201%205%207.5%22%20fill%3D%22%230C0058%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'

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

  // biome-ignore lint/suspicious/useAwait: <explanation>
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
  // biome-ignore lint/suspicious/useAwait: <explanation>
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

  // biome-ignore lint/suspicious/useAwait: <explanation>
  async disconnect() {
    this.account = undefined
    this.emit('disconnect')
  }

  /**
   * @param {Network} network
   */

  // biome-ignore lint/suspicious/useAwait: <explanation>
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
  // biome-ignore lint/suspicious/useAwait: <explanation>
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
  // biome-ignore lint/suspicious/useAwait: <explanation>
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
   *
   * @param {MessageObj} message - Filecoin message to sign
   */
  // biome-ignore lint/suspicious/useAwait: <explanation>
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
