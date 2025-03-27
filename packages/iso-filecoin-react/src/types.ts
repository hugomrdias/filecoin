import type { WalletAdapter } from 'iso-filecoin-wallets/types'
import type { RPC } from 'iso-filecoin/rpc'
import type { Chain, IAccount, Network } from 'iso-filecoin/types'

export type { IAccount, Network } from 'iso-filecoin/types'
export type { WalletAdapter, AccountNetwork } from 'iso-filecoin-wallets/types'

/** Combines members of an intersection into a readable type. */
// https://twitter.com/mattpocockuk/status/1622730173446557697?s=20&t=NdpAcmEFXY01xkqU3KO0Mg
export type Compute<type> = { [key in keyof type]: type[key] } & unknown

/**
 * Wallet provider props
 */
export interface FilecoinProviderProps {
  /**
   * @default 'mainnet'
   */
  network?: Network
  adapters: WalletAdapter[]
  rpcs?: Record<Network, RPC>
  /**
   * @default true
   */
  reconnectOnMount?: boolean
}

/**
 * Wallet context type
 */
export type FilecoinContextType = {
  /** Current network (mainnet or testnet) */
  network: Network
  /** List of available wallet adapters */
  adapters: WalletAdapter[]
  /** Currently selected wallet adapter */
  adapter: WalletAdapter | undefined
  /** Currently connected account */
  account: IAccount | undefined
  /**
   * Provider is checking adapters support
   */
  loading: boolean
  /**
   * Provider is reconnecting to the last selected adapter
   */
  reconnecting: boolean
  /** Last error that occurred on the selected adapter */
  error: Error | undefined
  /** RPC clients for each network */
  rpcs: Record<Network, RPC>
  /** Set the current account */
  setAccount: (value: React.SetStateAction<IAccount | undefined>) => void
  /** Set the current network */
  setNetwork: (value: React.SetStateAction<Network>) => void
  /** Set the current wallet adapter */
  setAdapter: (value: React.SetStateAction<WalletAdapter | undefined>) => void
}

/**
 * Connection state
 */
export type ConnectionState =
  | 'connected'
  | 'disconnected'
  | 'connecting'
  | 'reconnecting'

/**
 * Use account return type
 */
export type UseAccountReturnType = Compute<
  Pick<FilecoinContextType, 'account' | 'adapter' | 'network'> & {
    /**
     * Current connection state
     */
    state: ConnectionState
    /** Current chain */
    chain: Chain
  }
>
