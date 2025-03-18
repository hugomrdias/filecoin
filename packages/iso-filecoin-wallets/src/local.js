import { create, getPublicKey, sign, signMessage } from 'iso-filecoin/wallet'
import { TypedEventTarget } from 'iso-web/event-target'
import { WalletSupport } from './common.js'

/**
 * @typedef {import('iso-filecoin/types').IAccount} IAccount
 * @typedef {import('iso-filecoin/types').Network} Network
 * @typedef {import('iso-filecoin/types').MessageObj} MessageObj
 * @typedef {import('iso-filecoin/types').SignatureType} SignatureType
 * @typedef {import('./types.js').WalletAdapter} WalletAdapter
 * @typedef {import('./types.js').WalletConfig} WalletConfig
 * @typedef {import('./types.js').WalletEvents} WalletEvents
 * @typedef {import('./types.js').WalletSupportType} WalletSupportType
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
 * Local wallet implementation
 *
 * @implements{WalletAdapter}
 * @extends {TypedEventTarget<WalletEvents>}
 */
export class WalletAdapterLocal extends TypedEventTarget {
  name = 'Local'
  url = 'https://filecoin.io'
  icon =
    'data:image/svg+xml,%3Csvg%20width%3D%2234%22%20height%3D%2234%22%20viewBox%3D%22-5%200%2034%2034%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M23.555%2025.1A11.979%2011.979%200%200%201%200%2021.857a7.9%207.9%200%200%201%20.485-2.924C1.643%2011.595%208.785%2011.063%204.8%200c0%200%206.65%201.727%208%2012.143%200%200%204.919-.163%201.6-7.286A21.31%2021.31%200%200%201%2024%2020c.027%201.71-.122%203.42-.445%205.1%22%20fill%3D%22%23FF6E6E%22%2F%3E%3Cpath%20d%3D%22M19%2026.5a7.5%207.5%200%200%201-14.975.484L4%2027s-.075-3.272%200-4c.684-6.611%202.6-9.563%205-14%20.067-2.639-1.115%207.273%205%2010a8.19%208.19%200%200%201%205%207.5%22%20fill%3D%22%230C0058%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'

  /**@type {IAccount | undefined}*/
  account = undefined

  /** @type {boolean} */
  #isConnecting

  /** @type {WalletSupportType} */
  #support = WalletSupport.Detected

  /**
   *
   * @param {WalletConfig & ({privateKey: Uint8Array} )} config
   */
  constructor(config) {
    super()
    this.#isConnecting = false
    this.network = config.network ?? 'mainnet'
    this.signatureType = config.signatureType ?? 'SECP256K1'
    this.privateKey = config.privateKey

    if (!this.privateKey) {
      throw new Error('Private key not found')
    }

    if (this.privateKey.length !== 32) {
      throw new Error('Private key should be 32 bytes.')
    }
  }

  static create() {
    return new WalletAdapterLocal({
      network: 'mainnet',
      signatureType: 'SECP256K1',
      privateKey: create('SECP256K1', 'mainnet').privateKey,
    })
  }

  /**
   * @param {{ network?: Network }} [params]
   */

  // biome-ignore lint/suspicious/useAwait: <explanation>
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

  // biome-ignore lint/suspicious/useAwait: <explanation>
  async checkSupport() {
    this.#support = WalletSupport.Detected
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
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async deriveAccount(_index) {
    const err = new Error('Local wallet is not a HD wallet')
    this.emit('error', err)
    throw err
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
    return sign(this.privateKey, this.signatureType, data)
  }

  /**
   *
   * @param {MessageObj} message - Filecoin message to sign
   */
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async signMessage(message) {
    if (!this.connected) {
      throw new Error('Client is not connected')
    }
    return signMessage(this.privateKey, this.signatureType, message)
  }
}
