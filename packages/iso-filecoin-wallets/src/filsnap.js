import { createConnector, FilsnapAdapter, getProvider } from 'filsnap-adapter'
import { base64pad } from 'iso-base/rfc4648'
import { Signature } from 'iso-filecoin/signature'
import { pathFromNetwork } from 'iso-filecoin/utils'
import { TypedEventTarget } from 'iso-web/event-target'
import { nanoid } from 'nanoid'
import { WalletSupport } from './common.js'

/**
 * @import { WalletAdapter, WalletEvents, WalletConfig, WalletSupportType } from './types.js'
 */

/**
 * @typedef {import('iso-filecoin/types').IAccountWithPath} IAccount
 * @typedef {import('iso-filecoin/types').Network} Network
 * @typedef {import('iso-filecoin/types').MessageObj} MessageObj
 * @typedef {import('iso-filecoin/types').SignatureType} SignatureType
 */

const symbol = Symbol.for('wallet-adapter-filsnap')

/**
 * Filsnap wallet implementation
 *
 * @implements {WalletAdapter} - {@link WalletAdapter}
 * @extends {TypedEventTarget<WalletEvents>}
 */
export class WalletAdapterFilsnap extends TypedEventTarget {
  /** @type {boolean} */
  [symbol] = true
  uid = `filsnap-${nanoid(5)}`
  id = 'filsnap'
  name = 'Filsnap'
  url = 'https://snaps.metamask.io/snap/npm/filsnap/'

  /**@type {IAccount | undefined}*/
  account = undefined

  /** @type {boolean} */
  #isConnecting

  /** @type {import('filsnap-adapter').FilsnapAdapter | undefined} */
  filsnap

  /** @type {number} */
  #index

  /** @type {ReturnType<createConnector>|undefined} */
  #connector

  /** @type {import('filsnap-adapter').EIP1193Provider | undefined} */
  #provider

  /** @type {WalletSupportType} */
  #support =
    typeof window === 'undefined' || typeof document === 'undefined'
      ? WalletSupport.NotSupported
      : WalletSupport.NotChecked

  /**
   *
   * @param {WalletConfig & ({version?: string, index?: number, syncWithProvider?: boolean} )} config
   */
  constructor(config = {}) {
    super()
    this.name = config.name ?? this.name
    this.#index = config.index ?? 0
    this.#isConnecting = false
    this.version = config.version
    this.network = config.network ?? 'mainnet'
    this.signatureType = config.signatureType ?? 'SECP256K1'
    this.syncWithProvider = config.syncWithProvider ?? true
  }

  /**
   * @param {WalletAdapter} value
   * @returns {value is WalletAdapterFilsnap}
   */
  static is(value) {
    return value instanceof WalletAdapterFilsnap && symbol in value
  }

  /**
   * @param {{ network?: Network }} [params]
   */
  async connect(params = {}) {
    if (this.#isConnecting || this.connected) {
      if (!this.account) throw new Error('Already connecting')
      return { account: this.account, network: this.network }
    }
    this.#isConnecting = true

    try {
      if (params.network) {
        this.network = params.network
      }

      const provider = this.#provider ?? (await getProvider())

      this.filsnap = await FilsnapAdapter.connect({
        config: {
          network: this.network,
          derivationPath: pathFromNetwork(this.network, this.#index),
        },
        provider,
        snapId: 'npm:filsnap',
        snapVersion: this.version,
      })

      if (this.syncWithProvider) {
        this.#connector = createConnector({
          provider,
          onDisconnect: () => {
            this.disconnect()
          },
          onChainChanged: (network) => {
            if (network) {
              this.changeNetwork(network)
            }
          },
        })
        await this.#connector.connect({
          network: this.network,
        })
      }

      const acc = await this.filsnap.getAccount()
      if (acc.error) {
        throw new Error(acc.error.message, { cause: acc.error.data })
      }
      this.account = acc.result
      this.emit('connect', { account: acc.result, network: this.network })
      return { account: acc.result, network: this.network }
    } catch (error) {
      const err = /** @type {Error} */ (error)

      this.emit('error', err)
      throw error
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

  /**
   * @param {Network} network
   */
  async changeNetwork(network) {
    if (!this.filsnap || !this.account) {
      const err = new Error('Adapter is not connected')
      this.emit('error', err)
      throw err
    }

    if (this.network === network) {
      return { account: this.account, network: this.network }
    }

    try {
      const changeChainResult = await this.filsnap.changeNetwork(network)
      if (changeChainResult.error) {
        throw new Error(changeChainResult.error.message, {
          cause: changeChainResult.error.data,
        })
      }

      if (this.syncWithProvider && this.#connector) {
        await this.#connector.switchChain(network)
      }
      this.account = changeChainResult.result.account
      this.network = network
      this.emit('networkChanged', {
        network: network,
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
   * @param {number } _index
   * @returns {Promise<IAccount>}
   */
  async deriveAccount(_index) {
    if (!this.account || !this.filsnap) {
      throw new Error('Adapter is not connected')
    }
    if (this.#index !== _index) {
      try {
        const newAccount = await this.filsnap.deriveAccount(_index)
        if (newAccount.error) {
          throw new Error(newAccount.error.message, {
            cause: newAccount.error.data,
          })
        }
        this.#index = _index
        this.account = newAccount.result
        this.emit('accountChanged', this.account)
      } catch (error) {
        const err = /** @type {Error} */ (error)
        this.emit('error', err)
        throw error
      }
    }

    return this.account
  }

  /**
   *
   * @param {Uint8Array} data - Data to sign
   */
  async sign(data) {
    if (!this.filsnap) {
      throw new Error('Adapter is not connected')
    }
    const r = await this.filsnap.sign(data)
    if (r.error) {
      const err = new Error(r.error.message, { cause: r.error.data })
      this.emit('error', err)
      throw err
    }

    return r.result
  }

  /**
   * @type {WalletAdapter['personalSign']}
   * @inheritdoc
   */
  async personalSign(data) {
    if (!this.filsnap) {
      throw new Error('Adapter is not connected')
    }
    const r = await this.filsnap.personalSign(data)
    if (r.error) {
      const err = new Error(r.error.message, { cause: r.error.data })
      this.emit('error', err)
      throw err
    }

    return r.result
  }

  /**
   *
   * @param {MessageObj} message - Filecoin message to sign
   */
  async signMessage(message) {
    if (!this.filsnap) {
      throw new Error('Adapter is not connected')
    }

    // biome-ignore lint/correctness/noUnusedVariables: todo: fix
    const { from, ...rest } = message
    const r = await this.filsnap.signMessage(rest)
    if (r.error) {
      const err = new Error(r.error.message, { cause: r.error.data })
      this.emit('error', err)
      throw err
    }
    return new Signature({
      type: r.result.signature.type,
      data: base64pad.decode(r.result.signature.data),
    })
  }

  async checkSupport() {
    if (this.#support !== WalletSupport.NotChecked) {
      return
    }
    try {
      this.#provider = await getProvider()
      this.#support = WalletSupport.Detected
    } catch {
      this.#support = WalletSupport.NotDetected
    }
  }

  async disconnect() {
    if (this.filsnap) {
      await this.filsnap.disconnect()
    }
    if (this.#connector) {
      await this.#connector.disconnect()
    }

    this.filsnap = undefined
    this.account = undefined
    this.emit('disconnect')
  }
}
