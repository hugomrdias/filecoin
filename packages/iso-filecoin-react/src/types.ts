import type { WalletAdapter } from 'iso-filecoin-wallets/types'
import type { RPC } from 'iso-filecoin/rpc'
import type { Chain, IAccount, Network } from 'iso-filecoin/types'

export type { IAccount, Network } from 'iso-filecoin/types'
export type { WalletAdapter } from 'iso-filecoin-wallets/types'
export interface WalletProviderProps {
  /**
   * @default 'mainnet'
   */
  network?: Network
  chains: Record<Network, Chain>
  adapters: WalletAdapter[]
  connectOnSelect?: boolean
  onError?: (error: Error, adapter?: WalletAdapter) => void
}

export type WalletContextType = {
  chain: Chain
  network: Network
  wallets: WalletAdapter[]
  wallet: WalletAdapter | undefined
  account: IAccount | undefined
  connecting: boolean
  connected: boolean
  disconnecting: boolean
  rpc: RPC
  /**
   * Provider is checking adapters support
   */
  loading: boolean

  select(walletName: string | undefined): void
  connect(): Promise<void>
  disconnect(): Promise<void>
  changeNetwork(network: Network): Promise<void>
  deriveAccount(index: number): Promise<void>
}
