import { TypedEventTarget } from 'typescript-event-target'
import { Message } from '../message.js'
import { lotusCid } from '../utils.js'
import { getPublicKey, sign, signMessage, verify } from '../wallet.js'

/**
 * @typedef {import('../types').IWallet} IWallet
 */

/**
 * Local wallet implementation
 *
 * @implements{IWallet}
 * @extends {TypedEventTarget<import("../types").WalletEvents>}
 */
export class WalletLocal extends TypedEventTarget {
  /**@type {import('../types').IAccount | undefined}*/
  #account = undefined
  /**
   *
   * @param {import("../types").WalletConfig & ({privateKey: Uint8Array} )} config
   */
  constructor(config) {
    super()
    /** @type {import('../types').WalletType} */
    this.type = 'RAW'
    this.network = config.network ?? 'mainnet'
    this.signatureType = config.signatureType ?? 'SECP256K1'
    this.isConnected = false

    this.privateKey = config.privateKey

    if (!this.privateKey) {
      throw new Error('Private key not found')
    }

    if (this.privateKey.length !== 32) {
      throw new Error('Private key should be 32 bytes.')
    }
  }

  /**
   * @returns {import('../types').IAccount}
   */
  #createAccount() {
    const { address, pubKey } = getPublicKey(
      this.privateKey,
      this.network,
      this.signatureType
    )

    return {
      type: this.signatureType,
      address,
      publicKey: pubKey,
      privateKey: this.privateKey,
    }
  }

  account() {
    if (!this.#account) {
      throw new Error('Client is not connected')
    }
    return this.#account
  }

  // biome-ignore lint/suspicious/useAwait: <explanation>
  async connect() {
    this.#account = this.#createAccount()
    this.dispatchTypedEvent(
      'connect',
      new CustomEvent('connect', { detail: this.#account })
    )

    return this.#account
  }

  // biome-ignore lint/suspicious/useAwait: <explanation>
  async disconnect() {
    this.#account = undefined
    this.isConnected = false
    this.dispatchTypedEvent('disconnect', new Event('disconnect'))
  }

  /**
   * @param {import("../types").Network} network
   */
  // biome-ignore lint/suspicious/useAwait: <xplanation>
  async changeNetwork(network) {
    this.network = network
    this.#account = this.#createAccount()
    this.dispatchTypedEvent(
      'networkChanged',
      new CustomEvent('networkChanged', {
        detail: { network: this.network, account: this.#account },
      })
    )
    return this.#account
  }

  /**
   * @param {number } _index
   * @returns {Promise<import('../types').IAccount>}
   */
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async deriveAccount(_index) {
    throw new Error('Local wallet is not a HD wallet')
  }

  /**
   *
   * @param {Uint8Array} data - Data to sign
   */
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async sign(data) {
    if (!this.isConnected) {
      throw new Error('Client is not connected')
    }
    return sign(this.privateKey, this.signatureType, data)
  }

  /**
   *
   * @param {import('../message.js').MessageObj} message - Filecoin message to sign
   */
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async signMessage(message) {
    if (!this.isConnected) {
      throw new Error('Client is not connected')
    }
    return signMessage(this.privateKey, this.signatureType, message)
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
    return verify(signature, data, this.#account?.publicKey)
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
