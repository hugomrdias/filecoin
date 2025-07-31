import type _LedgerTransport from '@ledgerhq/hw-transport/lib-es/Transport'
import type { Signature } from 'iso-filecoin/signature'
import type {
  IAccount,
  MessageObj,
  Network,
  SignatureType,
} from 'iso-filecoin/types'
import type { TypedEventTarget } from 'iso-web/event-target'
import type { WalletSupport as _WalletSupport } from './common'

export type Transport = _LedgerTransport
export type TransportImpl = typeof _LedgerTransport

export type WalletSupportType = keyof typeof _WalletSupport

export type WalletEvents = {
  accountChanged: CustomEvent<IAccount>
  networkChanged: CustomEvent<AccountNetwork>
  disconnect: CustomEvent
  connect: CustomEvent<AccountNetwork>
  error: CustomEvent<Error>
  stateChanged: CustomEvent<WalletSupportType>
}

export interface WalletConfig {
  /**
   * Network
   * @default mainnet
   */
  network?: Network
  /**
   * Signature type
   * @default SECP256K1
   */
  signatureType?: SignatureType

  /**
   * Wallet name
   */
  name?: string
}
export interface WalletHDConfig extends WalletConfig {
  /**
   * Derivation path address index
   * @default 0
   */
  index?: number
  seed?: Uint8Array
}
export interface WalletHDMnemonicConfig extends Omit<WalletHDConfig, 'seed'> {
  mnemonic: string
  password?: string
}

export interface WalletLedgerConfig extends WalletConfig {
  /**
   * Derivation path address index
   * @default 0
   */
  index?: number
  transport: {
    create: () => Promise<Transport>
    isSupported: () => Promise<boolean>
  }
}

export interface AccountNetwork {
  network: Network
  account: IAccount
}

/**
 * Wallet adapter interface
 */
export interface WalletAdapter extends TypedEventTarget<WalletEvents> {
  /**
   * Unique identifier for this wallet instance
   */
  readonly uid: string

  /**
   * Wallet adapter identifier (e.g. 'filsnap', 'ledger', 'hd', 'raw')
   */
  readonly id: string

  /**
   * Human readable wallet name
   */
  name: string

  /**
   * Wallet homepage URL
   */
  url: string

  /**
   * Current network (mainnet or testnet)
   */
  readonly network: Network

  /**
   * Wallet support status (NotChecked, Detected, NotDetected, NotSupported)
   */
  readonly support: WalletSupportType

  /**
   * Whether the wallet is in the process of connecting
   */
  readonly connecting: boolean

  /**
   * Whether the wallet is currently connected
   */
  readonly connected: boolean

  /**
   * Currently active account, if connected
   */
  readonly account: IAccount | undefined

  /**
   * Check if this wallet adapter is supported in the current environment
   */
  checkSupport: () => Promise<void>
  /**
   * Connect to the wallet
   * @param params - Connect params
   */
  connect: ({ network }: { network?: Network }) => Promise<AccountNetwork>
  /**
   * Disconnect from the wallet
   */
  disconnect: () => Promise<void>

  /**
   * Derive a new account at the given index
   * @param index - The derivation path index
   */
  deriveAccount: (index: number) => Promise<IAccount>

  /**
   * Change the network and derive a new account
   * @param network - The network to change to
   */
  changeNetwork: (network: Network) => Promise<AccountNetwork>

  /**
   * Sign raw bytes
   *
   * @deprecated Use {@link personalSign} instead
   * @param data - raw bytes to sign
   */
  sign(data: Uint8Array): Promise<Signature>

  /**
   * Sign FRC-102 message
   *
   * @see https://github.com/filecoin-project/FIPs/blob/master/FRCs/frc-0102.md
   * @param data - raw bytes to sign
   */
  personalSign: (data: Uint8Array) => Promise<Signature>

  /**
   * Sign filecoin message
   *
   * @param message - Filecoin message to sign
   */
  signMessage: (message: MessageObj) => Promise<Signature>
}
