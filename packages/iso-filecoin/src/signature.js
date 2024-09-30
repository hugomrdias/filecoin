import { base64, hex } from 'iso-base/rfc4648'
import { concat, isBufferSource, u8 } from 'iso-base/utils'
import { z } from 'zod'

export const SIGNATURE_TYPE = /** @type {const} */ ({
  SECP256K1: 1,
  BLS: 2,
})

export const SIGNATURE_CODE = /** @type {const} */ ({
  1: 'SECP256K1',
  2: 'BLS',
})

/** @type {import("zod").ZodType<BufferSource>} */
const _zBufferSource = z.custom((value) => {
  return isBufferSource(value)
}, 'Value must be a BufferSource')

const zBuf = _zBufferSource.transform((value) => u8(value))

/**
 * @typedef {z.infer<typeof zBuf>} LotusSignature
 */

export const Schemas = {
  lotusSignature: z.object({
    Type: z.literal(1).or(z.literal(2)),
    Data: z.string(),
  }),
  signature: z.object({
    type: z.enum([SIGNATURE_CODE[1], SIGNATURE_CODE[2]]),
    data: zBuf,
  }),
}

export class Signature {
  /**
   *
   * @param {z.infer<typeof Schemas.signature>} sig
   */
  constructor(sig) {
    sig = Schemas.signature.parse(sig)
    this.type = sig.type
    this.data = sig.data
  }

  get code() {
    return SIGNATURE_TYPE[this.type]
  }

  /**
   *
   * @param {z.infer<typeof Schemas.lotusSignature>} json
   */
  static fromLotus(json) {
    json = Schemas.lotusSignature.parse(json)
    return new Signature({
      type: SIGNATURE_CODE[json.Type],
      data: base64.decode(json.Data),
    })
  }

  /**
   * Encodes the signature as a JSON object in the Lotus RPC format.
   *
   * @returns {import("./types.js").LotusSignature}
   */
  toLotus() {
    return {
      Type: this.code,
      Data: base64.encode(this.data, true),
    }
  }

  /**
   * Signature from Lotus-style hex encoded string
   *
   * Lotus adds 0x01 or 0x02 to the signature depending on the type.
   *
   * @param {string} str - Hex encoded signature
   */
  static fromLotusHex(str) {
    const bytes = hex.decode(str)

    if (bytes[0] === 0x02) {
      // bls
      const data = bytes.slice(1)
      if (data.length !== 96) {
        throw new Error('BLS signature length should be 96')
      }
      return new Signature({
        type: 'BLS',
        data: data,
      })
    }

    if (bytes[0] === 0x01) {
      // secp256k1
      const data = bytes.slice(1)
      if (data.length !== 65) {
        throw new Error('secp256k1 signature length should be 65')
      }
      return new Signature({
        type: 'SECP256K1',
        data: data,
      })
    }
    throw new Error('Invalid signature type')
  }

  /**
   * Encodes the signature as a Lotus-style hex encoded string
   *
   * Lotus adds 0x01 or 0x02 to the signature depending on the type.
   *
   * @returns {string} Hex encoded signature
   */
  toLotusHex() {
    if (this.type === 'BLS') {
      return hex.encode(concat([Uint8Array.from([0x02]), this.data]))
    }
    return hex.encode(concat([Uint8Array.from([0x01]), this.data]))
  }
}
