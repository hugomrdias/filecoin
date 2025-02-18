import { TypedEventTarget } from 'iso-web/event-target'
import { LedgerFilecoin } from '../ledger.js'
import { Message } from '../message.js'
import { Signature } from '../signature.js'
import { WalletSupport, pathFromNetwork } from './common.js'

export { WalletSupport } from './common.js'

/**
 * @typedef {import('../types.js').IAccount} IAccount
 * @typedef {import('../types.js').Network} Network
 * @typedef {import('../types.js').MessageObj} MessageObj
 * @typedef {import('../types.js').SignatureType} SignatureType
 * @typedef {import('./types.js').WalletAdapter} WalletAdapter
 * @typedef {import('./types.js').WalletConfig} WalletConfig
 * @typedef {import('./types.js').WalletEvents} WalletEvents
 * @typedef {import('./types.js').WalletSupportType} WalletSupportType
 * @typedef {import('./types.js').WalletLedgerConfig} WalletLedgerConfig
 */

/**
 * Ledger wallet implementation
 *
 * @extends {TypedEventTarget<WalletEvents>}
 * @implements {WalletAdapter}
 */
export class WalletAdapterLedger extends TypedEventTarget {
  name = 'Ledger'
  url = 'https://ledger.com'
  icon =
    'data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20147%20128%22%20fill%3D%22white%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%222em%22%3E%3Cpath%20d%3D%22M0%2091.655V128h55.293v-8.06H8.056V91.655zm138.944%200v28.285H91.707v8.058H147V91.655zm-83.57-55.31v55.308h36.333v-7.269H63.43V36.345zM0%200v36.345h8.056V8.058h47.237V0zm91.707%200v8.058h47.237v28.287H147V0z%22%2F%3E%3C%2Fsvg%3E'

  /** @type {IAccount | undefined}*/
  account = undefined

  /** @type {WalletLedgerConfig['transport']} */
  #transport

  /** @type {import('../ledger.js').LedgerFilecoin | undefined} */
  #app

  /** @type {number} */
  #index

  /** @type {boolean} */
  #isConnecting

  #onDisconnect

  /** @type {WalletSupportType} */
  #support = WalletSupport.NotChecked

  /**
   *
   * @param {WalletLedgerConfig} config
   */
  constructor(config) {
    super()
    this.#isConnecting = false
    this.#transport = config.transport
    this.#index = config.index ?? 0
    this.name = 'Ledger'
    this.network = config.network ?? 'mainnet'
    this.signatureType = config.signatureType ?? 'SECP256K1'
    this.#onDisconnect = this.disconnect.bind(this)
  }

  get connecting() {
    return this.#isConnecting
  }

  get connected() {
    return this.account !== undefined
  }

  get app() {
    return this.#app
  }

  get support() {
    return this.#support
  }

  async checkSupport() {
    this.#support = (await this.#transport.isSupported())
      ? WalletSupport.Detected
      : WalletSupport.NotSupported
  }

  /**
   * @param {import('../ledger.js').LedgerFilecoin} app
   * @returns {Promise<IAccount>}
   */
  async #createAccount(app) {
    const path = pathFromNetwork(this.network, this.#index)
    return await app.getAddress(path, false)
  }

  async connect() {
    /** @type {import('./types.js').Transport} */
    let transport
    try {
      if (this.#isConnecting || this.connected) {
        return
      }
      this.#isConnecting = true
      transport = await this.#transport.create()

      this.#app = new LedgerFilecoin(transport)
      this.account = await this.#createAccount(this.#app)

      this.emit('connect', this.account)
      transport.on('disconnect', this.#onDisconnect)
    } catch (error) {
      await this.disconnect()
      const err = /** @type {Error} */ (error)

      this.emit('error', err)
      throw error
    } finally {
      this.#isConnecting = false
    }
  }

  async disconnect() {
    if (this.#app) {
      this.#app.transport.off('disconnect', this.#onDisconnect)
      try {
        await this.#app.close()
      } catch (error) {
        this.emit('error', /** @type {Error} */ (error))
      }
      this.#app = undefined
      this.account = undefined
    }
    this.emit('disconnect')
  }

  /**
   * @param {Network} network
   */
  async changeNetwork(network) {
    try {
      if (this.network !== network) {
        this.network = network
        if (this.#app) {
          this.account = await this.#createAccount(this.#app)
        }
        this.emit('networkChanged', {
          network: this.network,
          account: this.account,
        })
      }

      return { account: this.account, network: this.network }
    } catch (error) {
      const err = /** @type {Error} */ (error)

      this.emit('error', err)
      throw error
    }
  }

  /**
   * @param { number } index
   */
  async deriveAccount(index) {
    try {
      if (!this.#app) {
        throw new Error('Adapter is not connected')
      }
      this.#index = index
      this.account = await this.#createAccount(this.#app)
      this.emit('accountChanged', this.account)
      return this.account
    } catch (error) {
      const err = /** @type {Error} */ (error)

      this.emit('error', err)
      throw error
    }
  }

  /**
   * @param {Uint8Array<ArrayBufferLike>} data
   */
  async sign(data) {
    try {
      if (!this.account || !this.#app) {
        throw new Error('Adapter is not connected')
      }

      if (!this.account.path) {
        throw new Error('Derivation path not found')
      }

      const raw = await this.#app.signRaw(this.account.path, data)
      return new Signature({
        type: this.signatureType,
        data: raw,
      })
    } catch (error) {
      const err = /** @type {Error} */ (error)

      this.emit('error', err)
      throw error
    }
  }

  /**
   * @param {MessageObj} message
   */
  async signMessage(message) {
    try {
      if (!this.account || !this.#app) {
        throw new Error('Adapter is not connected')
      }

      if (!this.account.path) {
        throw new Error('Derivation path not found')
      }

      const raw = await this.#app.sign(
        this.account.path,
        new Message(message).serialize()
      )
      return new Signature({
        type: this.signatureType,
        data: raw,
      })
    } catch (error) {
      const err = /** @type {Error} */ (error)

      this.emit('error', err)
      throw error
    }
  }
}
