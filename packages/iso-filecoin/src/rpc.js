import { request } from 'iso-web/http'
import * as z from 'zod/v4'
import { Message } from './message.js'
import { Signature } from './signature.js'
import { getNetworkPrefix, isZodErrorLike } from './utils.js'

export {
  AbortError,
  HttpError,
  JsonError,
  NetworkError,
  RequestError,
  RetryError,
  TimeoutError,
} from 'iso-web/http'

/**
 * @import {ChainGetTipSetByHeightParams,  FilecoinAddressToEthAddressParams, GasEstimateMessageGasResponse, GasEstimateParams, JsonRpcResponse, MaybeResult, MpoolGetNonceResponse, MpoolPushResponse, Options, PushMessageParams, RpcOptions, Safety, StateAccountKeyParams, StateNetworkNameResponse, TipSet, VersionResponse, waitMsgParams, WalletBalanceResponse} from './types.js'
 */

/**
 * @typedef {import('iso-web/types').RequestOptions} RequestOptions
 * @typedef {import('iso-web/http').Errors | import('iso-web/http').JsonError} RequestErrors
 */

/**
 * Error symbol
 */
const symbol = Symbol.for('rpc-error')

/**
 * Check if a value is a RpcError
 *
 * @param {unknown} value
 * @returns {value is RpcError}
 */
export function isRpcError(value) {
  return value instanceof Error && symbol in value
}

export class RpcError extends Error {
  /** @type {boolean} */
  [symbol] = true

  name = 'RpcError'

  /** @type {unknown} */
  cause

  /**
   *
   * @param {string} message
   * @param {ErrorOptions} [options]
   */
  constructor(message, options = {}) {
    super(message, options)

    this.cause = options.cause
  }
  /**
   * Check if a value is a RequestError
   *
   * @param {unknown} value
   * @returns {value is RpcError}
   */
  static is(value) {
    return isRpcError(value) && value.name === 'RpcError'
  }
}

export class JsonRpcError extends RpcError {
  name = 'JsonRpcError'

  /** @type {import('./types.js').JsonRpcError} */
  cause

  /**
   *
   * @param {import('./types.js').JsonRpcError} cause
   */
  constructor(cause) {
    super(cause.message, { cause })
    this.cause = cause
  }
  /**
   * Check if a value is a JsonRpcError
   *
   * @param {unknown} value
   * @returns {value is JsonRpcError}
   */
  static is(value) {
    return isRpcError(value) && value.name === 'JsonRpcError'
  }
}

export class ValidationRpcError extends RpcError {
  name = 'ValidationRpcError'

  /** @type {import('zod/v4').ZodError} */
  cause

  /**
   *
   * @param {import('zod/v4').ZodError} cause
   */
  constructor(cause) {
    const message = z.prettifyError(cause)
    super(message, { cause })
    this.cause = cause
  }
  /**
   * Check if a value is a ValidationRpcError
   *
   * @param {unknown} value
   * @returns {value is ValidationRpcError}
   */
  static is(value) {
    return isRpcError(value) && value.name === 'ValidationRpcError'
  }
}

/**
 * RPC
 */
export class RPC {
  /**
   *
   * TODO: remove fetch from Options and use fetch from RequestOptions
   * TODO: either remove token or merge this.headers with fetchOptions.headers
   *
   * @param {Options} options
   * @param {RequestOptions} [fetchOptions]
   */
  constructor(
    {
      api,
      token,
      network = 'mainnet',
      fetch = globalThis.fetch.bind(globalThis),
    },
    fetchOptions = {}
  ) {
    this.fetch = fetch
    this.api = new URL(api)
    this.network = network
    this.headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }

    this.fetchOptions = fetchOptions
  }

  /**
   * Version returns the version of the Filecoin node.
   *
   * @param {RequestOptions} [fetchOptions]
   */
  async version(fetchOptions = {}) {
    return await /** @type {typeof this.call<VersionResponse>}*/ (this.call)(
      { method: 'Filecoin.Version' },
      fetchOptions
    )
  }

  /**
   * NetworkName returns the name of the network the node is synced to.
   *
   * @param {RequestOptions} [fetchOptions]
   */
  async networkName(fetchOptions = {}) {
    return await /** @type {typeof this.call<StateNetworkNameResponse>}*/ (
      this.call
    )({ method: 'Filecoin.StateNetworkName' }, fetchOptions)
  }

  /**
   * GasEstimateMessageGas estimates gas values for unset message gas fields
   *
   * @see https://lotus.filecoin.io/reference/lotus/gas/#gasestimatemessagegas
   *
   * @param {GasEstimateParams} params
   * @param {RequestOptions} [fetchOptions]
   * @return {Promise<MaybeResult<GasEstimateMessageGasResponse, RequestErrors | JsonRpcError | RpcError | ValidationRpcError>>}
   */
  async gasEstimate(params, fetchOptions = {}) {
    const isFromValid = this.#isInvalidNetwork(params.msg.from)
    if (isFromValid.error) {
      return isFromValid
    }
    const isToValid = this.#isInvalidNetwork(params.msg.to)

    if (isToValid.error) {
      return isToValid
    }

    try {
      const msg = new Message(params.msg)
      return await /** @type {typeof this.call<GasEstimateMessageGasResponse>}*/ (
        this.call
      )(
        {
          method: 'Filecoin.GasEstimateMessageGas',
          params: [msg.toLotus(), { MaxFee: params.maxFee ?? '0' }, null],
        },
        fetchOptions
      )
    } catch (error) {
      if (isZodErrorLike(error)) {
        return {
          result: undefined,
          error: new ValidationRpcError(error),
        }
      }
      return {
        result: undefined,
        error: new RpcError('Failed to estimate gas', { cause: error }),
      }
    }
  }

  /**
   * WalletBalance returns the balance of the given address at the current head of the chain.
   *
   * @see https://lotus.filecoin.io/reference/lotus/wallet/#walletbalance
   *
   * @param {string} address
   * @param {RequestOptions} [fetchOptions]
   * @returns {Promise<MaybeResult<WalletBalanceResponse, RequestErrors | JsonRpcError | RpcError>>}
   */
  async balance(address, fetchOptions = {}) {
    const isValid = this.#isInvalidNetwork(address)
    if (isValid.error) {
      return isValid
    }
    return await /** @type {typeof this.call<WalletBalanceResponse>}*/ (
      this.call
    )({ method: 'Filecoin.WalletBalance', params: [address] }, fetchOptions)
  }

  /**
   * MpoolGetNonce gets next nonce for the specified sender. Note that this method may not be atomic. Use MpoolPushMessage instead.
   *
   * @see https://lotus.filecoin.io/reference/lotus/mpool/#mpoolgetnonce
   * @param {string} address
   * @param {RequestOptions} [fetchOptions]
   * @returns {Promise<MaybeResult<MpoolGetNonceResponse, RequestErrors | JsonRpcError | RpcError>>}
   */
  async nonce(address, fetchOptions = {}) {
    const isValid = this.#isInvalidNetwork(address)
    if (isValid.error) {
      return isValid
    }
    return await /** @type {typeof this.call<MpoolGetNonceResponse>}*/ (
      this.call
    )({ method: 'Filecoin.MpoolGetNonce', params: [address] }, fetchOptions)
  }

  /**
   * MpoolPush pushes a signed message to mempool.
   *
   * @see https://lotus.filecoin.io/reference/lotus/mpool/#mpoolpush
   *
   * @param {PushMessageParams} params
   * @param {RequestOptions} [fetchOptions]
   * @returns {Promise<MaybeResult<MpoolPushResponse, RequestErrors | JsonRpcError | RpcError | ValidationRpcError>>}
   */
  async pushMessage(params, fetchOptions = {}) {
    const isFromValid = this.#isInvalidNetwork(params.msg.from)
    if (isFromValid.error) {
      return isFromValid
    }
    const isToValid = this.#isInvalidNetwork(params.msg.to)
    if (isToValid.error) {
      return isToValid
    }

    try {
      return await /** @type {typeof this.call<MpoolPushResponse>}*/ (
        this.call
      )(
        {
          method: 'Filecoin.MpoolPush',
          params: [
            {
              Message: new Message(params.msg).toLotus(),
              Signature: new Signature(params.signature).toLotus(),
            },
          ],
        },
        fetchOptions
      )
    } catch (error) {
      if (isZodErrorLike(error)) {
        return {
          result: undefined,
          error: new ValidationRpcError(error),
        }
      }
      return {
        result: undefined,
        error: new RpcError('Failed to push message', { cause: error }),
      }
    }
  }

  /**
   * StateWaitMsg looks back in the chain for a message. If not found, it blocks until the message arrives on chain, and gets to the indicated confidence depth.
   *
   * Timeout is increased to 60s instead of the default 5s.
   *
   * @see https://lotus.filecoin.io/reference/lotus/state/#statewaitmsg
   * @param {waitMsgParams} params
   * @param {RequestOptions} [fetchOptions]
   * @returns {Promise<MaybeResult<MpoolPushResponse, RequestErrors | JsonRpcError>>}
   */
  async waitMsg(params, fetchOptions = {}) {
    return await /** @type {typeof this.call<MpoolPushResponse>}*/ (this.call)(
      {
        method: 'Filecoin.StateWaitMsg',
        params: [
          params.cid,
          params.confidence ?? 2,
          params.lookback ?? 100,
          false,
        ],
      },
      { timeout: 60_000, ...fetchOptions }
    )
  }

  /**
   * Converts any Filecoin address to an EthAddress.
   *
   * @see https://github.com/filecoin-project/lotus/blob/471819bf1ef8a4d5c7c0476a38ce9f5e23c59bfc/api/api_full.go#L743-L768
   * @param {FilecoinAddressToEthAddressParams} params
   * @param {RequestOptions} [fetchOptions]
   * @returns {Promise<MaybeResult<string, RequestErrors | JsonRpcError | RpcError>>}
   */
  async filecoinAddressToEthAddress(params, fetchOptions = {}) {
    const isValid = this.#isInvalidNetwork(params.address)
    if (isValid.error) {
      return isValid
    }

    return await /** @type {typeof this.call<string>} */ (this.call)(
      {
        method: 'Filecoin.FilecoinAddressToEthAddress',
        params: [params.address, params.blockNumber ?? 'finalized'],
      },
      fetchOptions
    )
  }

  /**
   * Public key address of the given ID address.
   *
   * @see https://github.com/filecoin-project/lotus/blob/master/documentation/en/api-v0-methods.md#StateAccountKey
   *
   *
   * @param {StateAccountKeyParams} params
   * @param {RequestOptions} [fetchOptions]
   * @returns {Promise<MaybeResult<string, RequestErrors | JsonRpcError | RpcError>>}
   */
  async stateAccountKey(params, fetchOptions = {}) {
    const isValid = this.#isInvalidNetwork(params.address)
    if (isValid.error) {
      return isValid
    }
    const r = await /** @type {typeof this.call<string>} */ (this.call)(
      {
        method: 'Filecoin.StateAccountKey',
        params: [
          params.address,
          params.tipSetKey === undefined ? null : params.tipSetKey,
        ],
      },
      fetchOptions
    )

    if (r.error) {
      return r
    }

    return {
      result: r.result,

      error: undefined,
    }
  }

  /**
   * Public key address of the given non-account ID address.
   *
   * @see https://github.com/filecoin-project/lotus/blob/master/documentation/en/api-v0-methods.md#StateLookupRobustAddress
   *
   *
   * @param {StateAccountKeyParams} params
   * @param {RequestOptions} [fetchOptions]
   * @returns {Promise<MaybeResult<string, RequestErrors | JsonRpcError | RpcError>>}
   */
  async stateLookupRobustAddress(params, fetchOptions = {}) {
    const isValid = this.#isInvalidNetwork(params.address)
    if (isValid.error) {
      return isValid
    }

    const r = await /** @type {typeof this.call<string>} */ (this.call)(
      {
        method: 'Filecoin.StateLookupRobustAddress',
        params: [
          params.address,
          params.tipSetKey === undefined ? null : params.tipSetKey,
        ],
      },
      fetchOptions
    )

    if (r.error) {
      return r
    }

    return {
      result: r.result,
      error: undefined,
    }
  }

  /**
   * Retrieves the ID address of the given address for a tipset.
   * If you dont have a specific tipset in mind, better to use {@link getIDAddress}.
   *
   * @see https://github.com/filecoin-project/lotus/blob/master/documentation/en/api-v0-methods.md#statelookupid
   *
   *
   * @param {StateAccountKeyParams} params
   * @param {RequestOptions} [fetchOptions]
   * @returns {Promise<MaybeResult<string, RequestErrors | JsonRpcError >>}
   */
  async stateLookupID(params, fetchOptions = {}) {
    const r = await /** @type {typeof this.call<string>} */ (this.call)(
      {
        method: 'Filecoin.StateLookupID',
        params: [
          params.address,
          params.tipSetKey === undefined ? null : params.tipSetKey,
        ],
      },
      fetchOptions
    )

    if (r.error) {
      return r
    }

    return {
      result: r.result,
      error: undefined,
    }
  }

  /**
   * The current head of the chain.
   *
   * @see https://github.com/filecoin-project/filecoin-docs/blob/main/reference/json-rpc/chain.md#chainhead
   *
   *
   * @param {RequestOptions} [fetchOptions]
   * @returns {Promise<MaybeResult<TipSet, RequestErrors | JsonRpcError >>}
   */
  async chainHead(fetchOptions = {}) {
    const r = await /** @type {typeof this.call<TipSet>} */ (this.call)(
      {
        method: 'Filecoin.ChainHead',
      },
      fetchOptions
    )

    return r
  }

  /**
   * Get tipset at the specified epoch (height). If there are no blocks at the specified epoch, a tipset at an earlier epoch will be returned.
   *
   * @see https://github.com/filecoin-project/filecoin-docs/blob/main/reference/json-rpc/chain.md#chaingettipsetbyheight
   *
   * @param {ChainGetTipSetByHeightParams} params
   * @param {RequestOptions} [fetchOptions]
   * @returns {Promise<MaybeResult<TipSet, RequestErrors | JsonRpcError >>}
   */
  async getTipSetByHeight(params, fetchOptions = {}) {
    const r = await /** @type {typeof this.call<TipSet>} */ (this.call)(
      {
        method: 'Filecoin.ChainGetTipSetByHeight',
        params: [
          params.height,
          params.tipSetKey === undefined ? null : params.tipSetKey,
        ],
      },
      fetchOptions
    )

    return r
  }

  /**
   * Looks back from latest height for a tipset
   *
   * @param {number} lookback - Chain epoch to look back to
   * @param {RequestOptions} [fetchOptions]
   * @returns {Promise<MaybeResult<TipSet, RequestErrors | JsonRpcError | RpcError>>}
   */
  async lookBackTipSet(lookback, fetchOptions = {}) {
    const head = await this.chainHead(fetchOptions)

    if (head.error) {
      return head
    }

    const wallTime = Math.floor(Date.now() / 1000)
    const filTime = head.result.Blocks[0].Timestamp

    // https://github.com/ribasushi/go-toolbox-interplanetary/blob/master/fil/time.go#L50-L61
    if (wallTime < filTime - 3 || wallTime > filTime + 10 + 4 * 30) {
      return {
        result: undefined,
        error: new RpcError('Chain is not synced'),
      }
    }

    if (lookback === 0) {
      return head
    }

    const height = head.result.Height - 1 - lookback
    return this.getTipSetByHeight(
      {
        height,
        tipSetKey: head.result.Cids,
      },
      fetchOptions
    )
  }

  /**
   * Get the ID address for an address with different safety guarantees
   *
   * @param {{address: string, safety?: Safety}} params
   * @param {RequestOptions} [fetchOptions]
   * @returns {Promise<MaybeResult<string, RequestErrors | JsonRpcError | RpcError>>}
   */
  async getIDAddress(params, fetchOptions = {}) {
    const safety = params.safety ?? 'finalized'

    let tipSetKey

    if (safety === 'finalized' || safety === 'safe') {
      const ts = await this.lookBackTipSet(
        safety === 'finalized' ? 900 : 30,
        fetchOptions
      )
      tipSetKey = ts.result?.Cids
      if (ts.error) {
        return ts
      }
    }

    if (safety === 'latest') {
      tipSetKey = null
    }

    return this.stateLookupID(
      {
        address: params.address,
        tipSetKey,
      },
      fetchOptions
    )
  }

  /**
   * Generic method to call any method on the lotus rpc api.
   *
   * @template R
   * @param {RpcOptions} rpcOptions
   * @param {RequestOptions} [fetchOptions]
   * @returns {Promise<MaybeResult<R, RequestErrors | JsonRpcError>>}
   */

  async call(rpcOptions, fetchOptions = {}) {
    const opts = {
      ...this.fetchOptions,
      ...fetchOptions,
    }

    const r = await /** @type {typeof request.json.post<JsonRpcResponse>} */ (
      request.json.post
    )(this.api, {
      ...opts,
      headers: this.headers,
      body: {
        jsonrpc: '2.0',
        method: rpcOptions.method,
        params: rpcOptions.params,
        id: 1,
      },
    })

    // normal request error
    if (r.error) {
      return {
        result: undefined,
        error: r.error,
      }
    }

    // json rpc error
    if (r.result.error) {
      return {
        result: undefined,
        error: new JsonRpcError(r.result.error),
      }
    }
    return { result: /** @type {R} */ (r.result.result), error: undefined }
  }

  /**
   * Check address against network
   *
   * @param {string} address
   * @returns {MaybeResult<undefined, RpcError>}
   */
  #isInvalidNetwork(address) {
    const prefix = getNetworkPrefix(this.network)

    if (!address.startsWith(prefix)) {
      return {
        result: undefined,
        error: new RpcError(
          `Address ${address} does not belong to ${this.network}`
        ),
      }
    }
    return { result: undefined, error: undefined }
  }
}
