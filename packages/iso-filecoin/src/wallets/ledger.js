import { TypedEventTarget } from 'typescript-event-target'
import * as Address from '../address.js'
import { LedgerFilecoin } from '../ledger.js'
import { Message } from '../message.js'
import { Signature } from '../signature.js'
import { lotusCid } from '../utils.js'
import { verify } from '../wallet.js'
import { pathFromNetwork } from './common.js'

/**
 * @typedef {import('../types.js').IWallet} Wallet
 */

/**
 * Ledger wallet implementation
 *
 * @implements{Wallet}
 * @extends {TypedEventTarget<import("../types.js").WalletEvents>}
 */
export class WalletLedger extends TypedEventTarget {
  /**@type {import('../types.js').IAccount | undefined}*/
  #account = undefined

  /** @type {import('../types.js').Transport} */
  #transport

  /** @type {import('../ledger.js').LedgerFilecoin} */
  #app

  /** @type {number} */
  #index

  #onDisconnect

  /**
   *
   * @param {import("../types.js").WalletLedgerConfig} config
   */
  constructor(config) {
    super()
    this.#transport = config.transport
    this.#app = new LedgerFilecoin(this.#transport)
    this.#index = config.index ?? 0

    /** @type {import('../types.js').WalletType} */
    this.type = 'LEDGER'
    this.network = config.network ?? 'mainnet'
    this.isConnected = false
    this.signatureType = config.signatureType ?? 'SECP256K1'
    this.#onDisconnect = this.disconnect.bind(this)
  }

  /**
   * @returns {Promise<import('../types.js').IAccount>}
   */
  async #createAccount() {
    const path = pathFromNetwork(this.network, this.#index)
    const raw = await this.#app.getAddress(path, false)
    const address = Address.fromString(raw)

    return {
      type: this.signatureType,
      address,
      publicKey: address.toBytes(), // TODO: ledger needs support for public key
      path,
    }
  }

  async connect() {
    this.#account = await this.#createAccount()
    this.isConnected = true
    this.dispatchTypedEvent(
      'connect',
      new CustomEvent('connect', { detail: this.#account })
    )
    this.#transport.on('disconnect', this.#onDisconnect)

    return this.#account
  }

  async disconnect() {
    this.isConnected = false
    this.#account = undefined
    this.#transport.off('disconnect', this.#onDisconnect)
    await this.#transport.close()
    this.dispatchTypedEvent('disconnect', new Event('disconnect'))
  }

  account() {
    if (!this.#account) {
      throw new Error('Client is not connected')
    }
    return this.#account
  }

  /**
   * @param {import("../types.js").Network} network
   */
  async changeNetwork(network) {
    if (!this.isConnected) {
      throw new Error('Client is not connected')
    }
    this.network = network
    this.#account = await this.#createAccount()
    this.dispatchTypedEvent(
      'networkChanged',
      new CustomEvent('networkChanged', {
        detail: { network: this.network, account: this.#account },
      })
    )

    return { account: this.#account, network: this.network }
  }

  /**
   * @param {number } index
   */
  async deriveAccount(index) {
    if (!this.isConnected) {
      throw new Error('Client is not connected')
    }
    this.#index = index
    this.#account = await this.#createAccount()
    this.dispatchTypedEvent(
      'accountChanged',
      new CustomEvent('accountChanged', { detail: this.#account })
    )
    return this.#account
  }

  /**
   * @param {Uint8Array<ArrayBufferLike>} data
   */
  async sign(data) {
    if (!this.#account) {
      throw new Error('Client is not connected')
    }

    if (!this.#account.path) {
      throw new Error('Derivation path not found')
    }

    const raw = await this.#app.signRaw(this.#account.path, data)
    return new Signature({
      type: this.signatureType,
      data: raw,
    })
  }

  /**
   * @param {import('../message.js').MessageObj} message
   */
  async signMessage(message) {
    if (!this.#account) {
      throw new Error('Client is not connected')
    }

    if (!this.#account.path) {
      throw new Error('Derivation path not found')
    }

    const raw = await this.#app.sign(
      this.#account.path,
      new Message(message).serialize()
    )
    return new Signature({
      type: this.signatureType,
      data: raw,
    })
  }

  /**
   * @param {import("../signature.js").Signature} signature
   * @param {Uint8Array} data
   */
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async verify(signature, data) {
    if (!this.#account) {
      throw new Error('Client is not connected')
    }
    return verify(signature, data, this.#account.publicKey)
  }

  /**
   * @param {import("../signature.js").Signature} signature
   * @param {import('../message.js').MessageObj} message
   */
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async verifyMessage(signature, message) {
    if (!this.#account) {
      throw new Error('Client is not connected')
    }
    const data = new Message(message).serialize()
    const cid = lotusCid(data)
    return verify(signature, cid, this.#account.publicKey)
  }
}
