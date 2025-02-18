import { encode } from '@ipld/dag-cbor'
import { base64pad } from 'iso-base/rfc4648'
import { z } from 'zod'

import * as Address from './address.js'
import { Token } from './token.js'
import { lotusCid } from './utils.js'

/**
 * @typedef {z.infer<typeof MessageSchema>} MessageObj
 *
 * @typedef {import('type-fest').SetOptional<MessageObj, 'version' | 'nonce' | 'gasLimit' | 'gasFeeCap' | 'gasPremium' | 'method' | 'params'>} PartialMessageObj
 */

/**
 * Message validation schema
 */
export const MessageSchema = z.object({
  version: z.literal(0).default(0),
  nonce: z.number().nonnegative().safe().default(0),
  gasLimit: z.number().nonnegative().safe().default(0),
  gasFeeCap: z.string().default('0'),
  gasPremium: z.string().default('0'),
  method: z.number().nonnegative().safe().default(0),
  to: z.string(),
  from: z.string(),
  /**
   * Value in attoFIL
   */
  value: z
    .string()
    .min(1)
    .refine((v) => !v.startsWith('-'), {
      message: 'value must not be negative',
    }),
  /**
   * Params encoded as base64pad
   */
  params: z.string().default(''),
})

const MessageSchemaPartial = MessageSchema.partial({
  version: true,
  nonce: true,
  gasLimit: true,
  gasFeeCap: true,
  gasPremium: true,
  method: true,
  params: true,
})

export const Schemas = {
  message: MessageSchema,
  messsagePartial: MessageSchemaPartial,
}

/**
 * Filecoin Message class
 */
export class Message {
  /** @type {Uint8Array | undefined} */
  #bytes

  /** @type {Uint8Array | undefined} */
  #cidBytes

  /**
   *
   * @param {PartialMessageObj} msg
   */
  constructor(msg) {
    const _msg = MessageSchema.parse(msg)
    this.version = _msg.version
    this.to = _msg.to
    this.from = _msg.from
    this.nonce = _msg.nonce
    this.value = _msg.value
    this.gasLimit = _msg.gasLimit
    this.gasFeeCap = _msg.gasFeeCap
    this.gasPremium = _msg.gasPremium
    this.method = _msg.method
    this.params = _msg.params
  }

  /**
   * Convert message to Lotus message
   */
  toLotus() {
    return {
      Version: this.version,
      To: this.to,
      From: this.from,
      Nonce: this.nonce,
      Value: this.value,
      GasLimit: this.gasLimit,
      GasFeeCap: this.gasFeeCap,
      GasPremium: this.gasPremium,
      Method: this.method,
      Params: this.params,
    }
  }

  /**
   * Create message from Lotus message
   *
   * @param {import('./types').LotusMessage} json
   */
  static fromLotus(json) {
    /** @type {MessageObj} */
    const obj = {
      version: json.Version,
      to: json.To,
      from: json.From,
      nonce: json.Nonce,
      value: json.Value,
      gasLimit: json.GasLimit,
      gasFeeCap: json.GasFeeCap,
      gasPremium: json.GasPremium,
      method: json.Method,
      params: json.Params,
    }

    return new Message(obj)
  }

  /**
   * Prepare message for signing with nonce and gas estimation
   *
   * @param {import('./rpc.js').RPC} rpc
   */
  async prepare(rpc) {
    if (this.nonce === 0) {
      const nonce = await rpc.nonce(this.from)
      if (nonce.error) {
        throw new Error(nonce.error.message)
      }

      this.nonce = nonce.result
    }

    if (
      (this.gasLimit === 0 && this.gasFeeCap === '0') ||
      this.gasPremium === '0'
    ) {
      const gas = await rpc.gasEstimate({ msg: this })

      if (gas.error) {
        throw new Error(gas.error.message)
      }

      this.gasLimit = gas.result.GasLimit
      this.gasFeeCap = gas.result.GasFeeCap
      this.gasPremium = gas.result.GasPremium
    }

    return this
  }

  /**
   * Serialize message using dag-cbor
   */
  serialize() {
    if (this.#bytes) {
      return this.#bytes
    }

    const msg = [
      this.version,
      Address.fromString(this.to).toBytes(),
      Address.fromString(this.from).toBytes(),
      this.nonce,
      Token.fromAttoFIL(this.value).toBytes(),
      this.gasLimit,
      Token.fromAttoFIL(this.gasFeeCap).toBytes(),
      Token.fromAttoFIL(this.gasPremium).toBytes(),
      this.method,
      base64pad.decode(this.params),
    ]

    this.#bytes = /** @type {Uint8Array}*/ (encode(msg))
    return this.#bytes
  }

  /**
   * CID bytes of the filecoin message
   */
  cidBytes() {
    if (this.#cidBytes) {
      return this.#cidBytes
    }
    this.#cidBytes = lotusCid(this.serialize())
    return this.#cidBytes
  }
}
