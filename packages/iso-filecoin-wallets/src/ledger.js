import { LedgerFilecoin } from 'iso-filecoin/ledger'
import { Message } from 'iso-filecoin/message'
import { Signature } from 'iso-filecoin/signature'
import { pathFromNetwork } from 'iso-filecoin/utils'
import { TypedEventTarget } from 'iso-web/event-target'
import { nanoid } from 'nanoid'
import { WalletSupport } from './common.js'

export { WalletSupport } from './common.js'

const symbol = Symbol.for('wallet-adapter-ledger')

/**
 * @import { WalletAdapter, WalletEvents, WalletSupportType, WalletLedgerConfig } from './types.js'
 */

/**
 * @typedef {import('iso-filecoin/types').IAccount} IAccount
 * @typedef {import('iso-filecoin/types').Network} Network
 * @typedef {import('iso-filecoin/types').MessageObj} MessageObj
 * @typedef {import('iso-filecoin/types').SignatureType} SignatureType
 */

/**
 * Ledger wallet implementation
 *
 * @extends {TypedEventTarget<WalletEvents>}
 * @implements {WalletAdapter} - {@link WalletAdapter}
 */
export class WalletAdapterLedger extends TypedEventTarget {
  /** @type {boolean} */
  [symbol] = true
  uid = `ledger-${nanoid(5)}`
  id = 'ledger'
  name = 'Ledger'
  url = 'https://ledger.com'

  /** @type {IAccount | undefined}*/
  account = undefined

  /** @type {WalletLedgerConfig['transport']} */
  #transport

  /** @type {import('iso-filecoin/ledger').LedgerFilecoin | undefined} */
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
    this.name = config.name ?? this.name
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
   * @param {import('iso-filecoin/ledger').LedgerFilecoin} app
   * @returns {Promise<IAccount>}
   */
  async #createAccount(app) {
    const path = pathFromNetwork(this.network, this.#index)
    return await app.getAddress(path, false)
  }

  /**
   * @param {{ network?: Network }} [params]
   */
  async connect(params = {}) {
    /** @type {import('./types.js').Transport} */
    let transport
    try {
      if (this.#isConnecting || this.connected) {
        if (!this.account) throw new Error('No account found')
        return { account: this.account, network: this.network }
      }
      this.#isConnecting = true

      if (params.network) {
        this.network = params.network
      }

      transport = await this.#transport.create()
      this.#app = new LedgerFilecoin(transport)
      this.account = await this.#createAccount(this.#app)

      this.emit('connect', { account: this.account, network: this.network })
      transport.on('disconnect', this.#onDisconnect)
      return { account: this.account, network: this.network }
    } catch (error) {
      await this.disconnect()
      const err = /** @type {Error} */ (error)
      this.emit('error', err)
      throw err
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
    if (!this.#app || !this.account) {
      throw new Error('Adapter is not connected')
    }

    if (this.network === network) {
      return { account: this.account, network: this.network }
    }

    try {
      this.network = network
      this.account = await this.#createAccount(this.#app)
      this.emit('networkChanged', {
        network: this.network,
        account: this.account,
      })

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
