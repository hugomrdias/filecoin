import { HDKey } from '@scure/bip32'
import { TypedEventTarget } from 'typescript-event-target'
import { Message } from '../message.js'
import { lotusCid } from '../utils.js'
import {
  getPublicKey,
  mnemonicToSeed,
  sign,
  signMessage,
  verify,
} from '../wallet.js'
import { pathFromNetwork } from './common.js'

/**
 * @typedef {import('../types.js').IWallet} Wallet
 */

/**
 * HD wallet implementation
 *
 * @implements{Wallet}
 * @extends {TypedEventTarget<import("../types.js").WalletEvents>}
 */
export class WalletHd extends TypedEventTarget {
  /**@type {import('../types.js').IAccount | undefined}*/
  #account = undefined

  /** @type {Uint8Array} */
  #seed

  /** @type {number} */
  #index
  /**
   *
   * @param {import("../types.js").WalletHDConfig} config
   */
  constructor(config) {
    super()
    this.#seed = config.seed
    this.#index = config.index ?? 0

    /** @type {import('../types').WalletType} */
    this.type = 'HD'
    this.network = config.network ?? 'mainnet'
    this.isConnected = false
    this.signatureType = config.signatureType ?? 'SECP256K1'
  }

  /**
   * HD wallet from mnemonic
   *
   * @param {import("../types.js").WalletHDMnemonicConfig} config
   * @returns
   */
  static fromMnemonic(config) {
    const seed = mnemonicToSeed(config.mnemonic, config.password)

    return new WalletHd({
      network: config.network,
      signatureType: config.signatureType,
      index: config.index,
      seed,
    })
  }

  /**
   * @returns {import('../types.js').IAccount}
   */
  #createAccount() {
    const path = pathFromNetwork(this.network, this.#index)
    const hdKey = HDKey.fromMasterSeed(this.#seed)
    const privateKey = hdKey.derive(path).privateKey

    if (!privateKey) {
      throw new Error('Private key not found')
    }

    if (privateKey.length !== 32) {
      throw new Error('Private key should be 32 bytes.')
    }

    const { address, pubKey } = getPublicKey(
      privateKey,
      this.network,
      this.signatureType
    )

    return {
      type: this.signatureType,
      address,
      publicKey: pubKey,
      privateKey,
      path,
    }
  }

  // biome-ignore lint/suspicious/useAwait: <explanation>
  async connect() {
    this.#account = this.#createAccount()
    this.isConnected = true
    this.dispatchTypedEvent(
      'connect',
      new CustomEvent('connect', { detail: this.#account })
    )
    return this.#account
  }

  // biome-ignore lint/suspicious/useAwait: <explanation>
  async disconnect() {
    this.isConnected = false
    this.#account = undefined
    this.dispatchTypedEvent('disconnect', new Event('disconnect'))
  }

  account() {
    if (!this.#account) {
      throw new Error('Client is not connected')
    }
    return this.#account
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

    return { account: this.#account, network }
  }

  /**
   * @param {number } index
   */
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async deriveAccount(index) {
    this.#index = index
    this.#account = this.#createAccount()
    this.dispatchTypedEvent(
      'accountChanged',
      new CustomEvent('accountChanged', { detail: this.#account })
    )
    return this.#account
  }

  /**
   *
   * @param {Uint8Array} data - Data to sign
   */
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async sign(data) {
    if (!this.#account) {
      throw new Error('Client is not connected')
    }

    if (!this.#account.privateKey) {
      throw new Error('Private key not found')
    }
    return sign(this.#account.privateKey, this.signatureType, data)
  }

  /**
   *
   * @param {import('../message.js').MessageObj} message - Filecoin message to sign
   */
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async signMessage(message) {
    if (!this.#account) {
      throw new Error('Client is not connected')
    }

    if (!this.#account.privateKey) {
      throw new Error('Private key not found')
    }
    return signMessage(this.#account.privateKey, this.signatureType, message)
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
