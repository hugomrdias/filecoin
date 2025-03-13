import type _LedgerTransport from '@ledgerhq/hw-transport/lib-es/Transport'
import type BigNumber from 'bignumber.js'
import type { Driver } from 'iso-kv'
import type { JsonValue, SetOptional, SetRequired } from 'type-fest'
import type { z } from 'zod'
// import type { WalletSupport as _WalletSupport } from './adapters/common'
import type { AddressId, PROTOCOL_INDICATOR } from './address'
import type { MessageSchema } from './message.js'
import type { RPC } from './rpc'
import type { SignatureObj, SignatureType } from './signature'

export type Transport = _LedgerTransport
export type TransportImpl = typeof _LedgerTransport

export type { MaybeResult } from 'iso-web/types'
export type * from './message.js'
export type {
  LotusSignature,
  Signature,
  SignatureCode,
  SignatureObj,
  SignatureType,
} from './signature.js'
// export type * from './adapters/types'

export type MessageObj = z.infer<typeof MessageSchema>
export type PartialMessageObj = SetOptional<
  MessageObj,
  | 'version'
  | 'nonce'
  | 'gasLimit'
  | 'gasFeeCap'
  | 'gasPremium'
  | 'method'
  | 'params'
>

export type ProtocolIndicator = typeof PROTOCOL_INDICATOR
export type ProtocolIndicatorCode = ProtocolIndicator[keyof ProtocolIndicator]

export type HexAddress = `0x${string}`
export type CID = {
  '/': string
}

export type Cache = boolean | Driver | undefined

/**
 * Account types
 */

/**
 * Account interface
 */

export interface IAccount {
  type: SignatureType
  address: IAddress
  publicKey: Uint8Array
  /**
   * Derivation path - only for HD wallets
   */
  path?: string
  /**
   * Private key - only for RAW and HD wallets
   */
  privateKey?: Uint8Array
}
export type IAccountWithPath = SetRequired<IAccount, 'path'>

/**
 * Address types
 */

/**
 * Options for RPC-based address methods
 */
export interface AddressRpcOptions {
  rpc: RPC
  cache?: Cache
}

export type Safety = 'safe' | 'finalized' | 'latest'

/**
 * Options for RPC-based address methods with safety
 */
export interface AddressRpcSafetyOptions extends AddressRpcOptions {
  safety?: Safety
}

/**
 * Address interface
 */
export interface IAddress {
  protocol: ProtocolIndicatorCode
  payload: Uint8Array
  network: Network
  networkPrefix: NetworkPrefix
  namespace?: number
  id?: bigint
  checksum: () => Uint8Array
  toContractDestination: () => HexAddress
  toString: () => string
  toBytes: () => Uint8Array
  /**
   * Convert to ID address
   */
  toIdAddress: (options: AddressRpcOptions) => Promise<AddressId>
  /**
   * Converts any address to a 0x address, either id masked address or eth address depending on the address type.
   * Delegated addresses convert to eth address and f1, f2, f3 convert to id masked address
   * and f0 depends on the underline address type
   */
  to0x: (options: AddressRpcOptions) => Promise<string>
}

export interface DerivationPathComponents {
  purpose: number
  coinType: number
  account: number
  change: number
  addressIndex: number
}

export type Network = 'mainnet' | 'testnet'
export type NetworkPrefix = 'f' | 't'

export type ChainRpcUrls = {
  http: string[]
  webSocket?: string[] | undefined
}
export type ChainBlockExplorer = {
  name: string
  url: string
  apiUrl?: string | undefined
}

export type ChainContract = {
  address: HexAddress
  blockCreated?: number | undefined
}

export interface Chain {
  id: number
  name: string
  testnet?: boolean
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: {
    [key: string]: ChainRpcUrls
    default: ChainRpcUrls
  }
  blockExplorers?: {
    [key: string]: ChainBlockExplorer
    default: ChainBlockExplorer
  }
  contracts?: {
    [key: string]: ChainContract
  }
  /**
   * CAIP-2 chain ID
   */
  caipId: `${string}:${string}`
  /**
   * Chain ID 0x prefixed hex string
   */
  chainId: string
  iconUrls?: string[]
}

/**
 * Ethereum chain type (Metamask)
 */
export type EthereumChain = {
  /** A 0x-prefixed hexadecimal string */
  chainId: string
  /** The chain name. */
  chainName: string
  /** Native currency for the chain. */
  nativeCurrency?:
    | {
        name: string
        symbol: string
        decimals: number
      }
    | undefined
  rpcUrls: string[]
  blockExplorerUrls?: string[] | undefined
  iconUrls?: string[] | undefined
}

/**
 * JSON-RPC 2.0
 */

export interface JsonRpcError {
  code: number
  message: string
  data?: JsonValue
}
export interface JsonRpcRequest {
  jsonrpc: '2.0'
  id?: number | string | null
  /**
   * A String containing the name of the method to be invoked. Method names that begin with the word rpc followed by a period character (U+002E or ASCII 46) are reserved for rpc-internal methods and extensions and MUST NOT be used for anything else.
   */
  method: string
  params?: JsonValue
}

export type JsonRpcResponse =
  | {
      jsonrpc: '2.0'
      id: number | string | null
      result: JsonValue
      error?: undefined
    }
  | {
      jsonrpc: '2.0'
      id: number | string | null
      error: JsonRpcError
      result?: undefined
    }

// RPC types
export interface Options {
  token?: string
  api: string | URL
  network?: Network
  fetch?: typeof globalThis.fetch
}

export interface RpcOptions {
  method: `Filecoin.${string}`
  params?: JsonValue
}

export interface MsgReceipt {
  ExitCode: number
  Return: string | null
  GasUsed: number
  EventsRoot: CID | null
}

export type TipSetKey = CID[]
export interface MsgLookup {
  Height: number
  Message: CID
  Receipt: MsgReceipt
  ReturnDec: unknown | null
  TipSet: TipSetKey
}

export interface Block {
  BLSAggregate: {
    Data: string
    Type: 2
  }
  BeaconEntries: {
    Data: string
    Round: number
  }[]
  BlockSig: {
    Data: string
    Type: 2
  }
  ElectionProof: {
    VRFProof: string
    WinCount: number
  }
  ForkSignaling: number
  Height: number
  Messages: CID
  /**
   * The miner address of the block.
   */
  Miner: string
  ParentBaseFee: string
  ParentMessageReceipts: CID
  ParentStateRoot: CID
  /**
   * BitInt as a string
   */
  ParentWeight: string
  Parents: CID[]
  Ticket: {
    VRFProof: string
  }
  Timestamp: number
  WinPoStProof: {
    PoStProof: number
    ProofBytes: string
  }[]
}

export interface TipSet {
  Cids: CID[]
  Height: number
  Blocks: Block[]
}

/**
 * Lotus API responses
 *
 * @see https://filecoin-shipyard.github.io/js-lotus-client/api/api.html
 */

/**
 * Lotus message
 */
export interface LotusMessage {
  Version: 0
  To: string
  From: string
  Nonce: number
  Value: string
  GasLimit: number
  GasFeeCap: string
  GasPremium: string
  Method: number
  Params: string
  CID?: CID
}

export type VersionResponse = {
  Version: string
  APIVersion: number
  BlockDelay: number
}
export type StateNetworkNameResponse = Network
export type MpoolGetNonceResponse = number
export type GasEstimateMessageGasResponse = LotusMessage

/**
 * Wallet balance in attoFIL
 *
 * @example '99999927137190925849'
 */
export type WalletBalanceResponse = string
export type MpoolPushResponse = CID
export type WaitMsgResponse = MsgLookup

// RPC methods params

export interface GasEstimateParams {
  /**
   * Message to estimate gas for
   *
   * @see https://lotus.filecoin.io/reference/lotus/gas/#gasestimatemessagegas
   */
  msg: PartialMessageObj
  /**
   * Max fee to pay for gas (attoFIL/gas units)
   *
   * @default '0'
   */
  maxFee?: string
}

export interface PushMessageParams {
  msg: MessageObj
  signature: SignatureObj
}

export interface waitMsgParams {
  cid: CID
  /**
   * Confidence depth to wait for
   *
   * @default 2
   */
  confidence?: number
  /**
   * How chain epochs to look back to find the message
   *
   * @default 100
   */
  lookback?: number
}

export interface StateAccountKeyParams {
  address: string
  tipSetKey?: TipSetKey | null
}
export type BlockNumber = '0x${string}'
export interface FilecoinAddressToEthAddressParams {
  /**
   * The Filecoin address to convert.
   */
  address: string
  /**
   * The block number or state for the conversion.
   * Defaults to "finalized" for maximum safety.
   * Possible values: "pending", "latest", "finalized", "safe", or a specific block number represented as hex.
   */
  blockNumber?: 'pending' | 'latest' | 'finalized' | 'safe' | BlockNumber
}

export interface ChainGetTipSetByHeightParams {
  height: number
  tipSetKey?: TipSetKey | null
}

// Token types
export type FormatOptions = BigNumber.Format & {
  /**
   * @default 18
   * @see https://mikemcl.github.io/bignumber.js/#decimal-places
   */
  decimalPlaces?: number
  /**
   * @default BigNumber.ROUND_HALF_DOWN
   * @see https://mikemcl.github.io/bignumber.js/#constructor-properties
   */
  roundingMode?: BigNumber.RoundingMode
}
