import {
  FilsnapAdapter,
  chainIdtoNetwork,
  createConnector,
  getProvider,
} from 'filsnap-adapter'
import { base64pad } from 'iso-base/rfc4648'
import { Signature } from 'iso-filecoin/signature'
import { TypedEventTarget } from 'iso-web/event-target'
import { WalletSupport, pathFromNetwork } from './common.js'

/**
 * @typedef {import('iso-filecoin/types').IAccountWithPath} IAccount
 * @typedef {import('iso-filecoin/types').Network} Network
 * @typedef {import('iso-filecoin/types').MessageObj} MessageObj
 * @typedef {import('iso-filecoin/types').SignatureType} SignatureType
 * @typedef {import('./types.js').WalletAdapter} WalletAdapter
 * @typedef {import('./types.js').WalletConfig} WalletConfig
 * @typedef {import('./types.js').WalletEvents} WalletEvents
 * @typedef {import('./types.js').WalletSupportType} WalletSupportType
 */

const symbol = Symbol.for('wallet-adapter-filsnap')

/**
 * Local wallet implementation
 *
 * @implements {WalletAdapter}
 * @extends {TypedEventTarget<WalletEvents>}
 */
export class WalletAdapterFilsnap extends TypedEventTarget {
  /** @type {boolean} */
  [symbol] = true
  name = 'Filsnap'
  url = 'https://snaps.metamask.io/snap/npm/filsnap/'
  icon =
    'data:image/svg+xml,%3Csvg%20viewBox%3D%2229%2034%20260%20240%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%222em%22%3E%3Cstyle%3E.st1%2C.st6%7Bfill%3A%23e4761b%3Bstroke%3A%23e4761b%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%7D.st6%7Bfill%3A%23f6851b%3Bstroke%3A%23f6851b%7D%3C%2Fstyle%3E%3Cpath%20style%3D%22fill%3A%23e2761b%3Bstroke%3A%23e2761b%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%22%20d%3D%22m274.1%2035.5-99.5%2073.9L193%2065.8z%22%2F%3E%3Cpath%20class%3D%22st1%22%20d%3D%22m44.4%2035.5%2098.7%2074.6-17.5-44.3zm193.9%20171.3-26.5%2040.6%2056.7%2015.6%2016.3-55.3zm-204.4.9L50.1%20263l56.7-15.6-26.5-40.6z%22%2F%3E%3Cpath%20class%3D%22st1%22%20d%3D%22m103.6%20138.2-15.8%2023.9%2056.3%202.5-2-60.5zm111.3%200-39-34.8-1.3%2061.2%2056.2-2.5zM106.8%20247.4l33.8-16.5-29.2-22.8zm71.1-16.5%2033.9%2016.5-4.7-39.3z%22%2F%3E%3Cpath%20d%3D%22m211.8%20247.4-33.9-16.5%202.7%2022.1-.3%209.3zm-105%200%2031.5%2014.9-.2-9.3%202.5-22.1z%22%20style%3D%22stroke-linecap%3Around%3Bstroke-linejoin%3Around%3Bfill%3A%23d7c1b3%3Bstroke%3A%23d7c1b3%22%2F%3E%3Cpath%20d%3D%22m138.8%20193.5-28.2-8.3%2019.9-9.1zm40.9%200%208.3-17.4%2020%209.1z%22%20style%3D%22stroke-linecap%3Around%3Bstroke-linejoin%3Around%3Bfill%3A%23233447%3Bstroke%3A%23233447%22%2F%3E%3Cpath%20d%3D%22m106.8%20247.4%204.8-40.6-31.3.9zM207%20206.8l4.8%2040.6%2026.5-39.7zm23.8-44.7-56.2%202.5%205.2%2028.9%208.3-17.4%2020%209.1zm-120.2%2023.1%2020-9.1%208.2%2017.4%205.3-28.9-56.3-2.5z%22%20style%3D%22stroke-linecap%3Around%3Bstroke-linejoin%3Around%3Bfill%3A%23cd6116%3Bstroke%3A%23cd6116%22%2F%3E%3Cpath%20d%3D%22m87.8%20162.1%2023.6%2046-.8-22.9zm120.3%2023.1-1%2022.9%2023.7-46zm-64-20.6-5.3%2028.9%206.6%2034.1%201.5-44.9zm30.5%200-2.7%2018%201.2%2045%206.7-34.1z%22%20style%3D%22stroke-linecap%3Around%3Bstroke-linejoin%3Around%3Bfill%3A%23e4751f%3Bstroke%3A%23e4751f%22%2F%3E%3Cpath%20class%3D%22st6%22%20d%3D%22m179.8%20193.5-6.7%2034.1%204.8%203.3%2029.2-22.8%201-22.9zm-69.2-8.3.8%2022.9%2029.2%2022.8%204.8-3.3-6.6-34.1z%22%2F%3E%3Cpath%20style%3D%22fill%3A%23c0ad9e%3Bstroke%3A%23c0ad9e%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%22%20d%3D%22m180.3%20262.3.3-9.3-2.5-2.2h-37.7l-2.3%202.2.2%209.3-31.5-14.9%2011%209%2022.3%2015.5h38.3l22.4-15.5%2011-9z%22%2F%3E%3Cpath%20style%3D%22fill%3A%23161616%3Bstroke%3A%23161616%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%22%20d%3D%22m177.9%20230.9-4.8-3.3h-27.7l-4.8%203.3-2.5%2022.1%202.3-2.2h37.7l2.5%202.2z%22%2F%3E%3Cpath%20d%3D%22m278.3%20114.2%208.5-40.8-12.7-37.9-96.2%2071.4%2037%2031.3%2052.3%2015.3%2011.6-13.5-5-3.6%208-7.3-6.2-4.8%208-6.1zM31.8%2073.4l8.5%2040.8-5.4%204%208%206.1-6.1%204.8%208%207.3-5%203.6%2011.5%2013.5%2052.3-15.3%2037-31.3-96.2-71.4z%22%20style%3D%22stroke-linecap%3Around%3Bstroke-linejoin%3Around%3Bfill%3A%23763d16%3Bstroke%3A%23763d16%22%2F%3E%3Cpath%20class%3D%22st6%22%20d%3D%22m267.2%20153.5-52.3-15.3%2015.9%2023.9-23.7%2046%2031.2-.4h46.5zm-163.6-15.3-52.3%2015.3-17.4%2054.2h46.4l31.1.4-23.6-46zm71%2026.4%203.3-57.7%2015.2-41.1h-67.5l15%2041.1%203.5%2057.7%201.2%2018.2.1%2044.8h27.7l.2-44.8z%22%2F%3E%3C%2Fsvg%3E'

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
   * @param {WalletConfig & ({version?: string, index?: number} )} config
   */
  constructor(config = {}) {
    super()
    this.#index = config.index ?? 0
    this.#isConnecting = false
    this.version = config.version ?? '*'
    this.network = config.network ?? 'mainnet'
    this.signatureType = config.signatureType ?? 'SECP256K1'
  }

  /**
   * @param {WalletAdapter} value
   * @returns {value is WalletAdapterFilsnap}
   */
  static is(value) {
    return value instanceof WalletAdapterFilsnap && symbol in value
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

  async connect() {
    if (this.#isConnecting || this.connected) {
      return
    }
    this.#isConnecting = true

    try {
      const provider = this.#provider ?? (await getProvider())
      this.#connector = createConnector({
        provider,
        onDisconnect: () => {
          this.disconnect()
        },
        onChainChanged: (chain) => {
          const network = chainIdtoNetwork(chain)
          if (network) {
            this.changeNetwork(network)
          } else {
            this.disconnect()
          }
        },
      })

      this.filsnap = await FilsnapAdapter.connect({
        config: {
          network: this.network,
          derivationPath: pathFromNetwork(this.network, this.#index),
        },
        provider,
        snapId: 'npm:filsnap',
        snapVersion: this.version,
      })

      await this.#connector.connect({
        network: this.network,
      })

      const acc = await this.filsnap.getAccount()
      if (acc.error) {
        throw new Error(acc.error.message, { cause: acc.error.data })
      }
      this.account = acc.result
      this.emit('connect', this.account)
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

  async disconnect() {
    if (this.filsnap && this.#connector) {
      await this.#connector.disconnect()
      await this.filsnap.disconnect()
    }

    this.filsnap = undefined
    this.account = undefined
    this.emit('disconnect')
  }

  /**
   * @param {Network} network
   */
  async changeNetwork(network) {
    if (this.network !== network) {
      if (this.filsnap && this.#connector) {
        try {
          const changeChainResult = await this.filsnap.changeNetwork(network)
          if (changeChainResult.error) {
            throw new Error(changeChainResult.error.message, {
              cause: changeChainResult.error.data,
            })
          }
          await this.#connector.switchChain(network)
          this.account = changeChainResult.result.account
        } catch (error) {
          const err = /** @type {Error} */ (error)

          this.emit('error', err)
          throw error
        }
      }
      this.network = network
      this.emit('networkChanged', {
        network: network,
        account: this.account,
      })
    }

    return { account: this.account, network: this.network }
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
   *
   * @param {MessageObj} message - Filecoin message to sign
   */
  async signMessage(message) {
    if (!this.filsnap) {
      throw new Error('Adapter is not connected')
    }

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
}
