import type _LedgerTransport from '@ledgerhq/hw-transport/lib-es/Transport'
import type { TypedEventTarget } from 'iso-web/event-target'
import type { Signature } from '../signature'
import type { IAccount, MessageObj, Network, SignatureType } from '../types'
import type { WalletSupport as _WalletSupport } from './common'

export type Transport = _LedgerTransport
export type TransportImpl = typeof _LedgerTransport

export type WalletSupportType = keyof typeof _WalletSupport

export type WalletEvents = {
  accountChanged: CustomEvent<IAccount>
  networkChanged: CustomEvent<{ network: Network; account?: IAccount }>
  disconnect: CustomEvent
  connect: CustomEvent<IAccount>
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
}
export interface WalletHDConfig extends WalletConfig {
  /**
   * Derivation path address index
   * @default 0
   */
  index?: number
  seed: Uint8Array
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

/**
 * Wallet adapter interface
 */
export interface WalletAdapter extends TypedEventTarget<WalletEvents> {
  name: string
  url: string
  icon: string
  network: Network
  readonly support: WalletSupportType
  readonly connecting: boolean
  readonly connected: boolean
  account: IAccount | undefined
  checkSupport: () => Promise<void>
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  deriveAccount: (index: number) => Promise<IAccount>
  changeNetwork: (
    network: Network
  ) => Promise<{ network: Network; account?: IAccount }>

  /**
   * Sign raw bytes
   *
   * @param data - raw bytes to sign
   */
  sign(data: Uint8Array): Promise<Signature>

  /**
   * Sign filecoin message
   *
   * @param message - Filecoin message to sign
   */
  signMessage: (message: MessageObj) => Promise<Signature>
}
