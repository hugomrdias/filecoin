import * as Chains from 'iso-filecoin/chains'
import { RPC } from 'iso-filecoin/rpc'
import { Token } from 'iso-filecoin/token'
import React, {
  createElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { useQueries, useQuery } from '@tanstack/react-query'
export { mainnet, testnet } from 'iso-filecoin/chains'

/**
 * @import { WalletProviderProps, WalletAdapter, IAccount, Network, WalletContextType  } from './types.js'
 */

/**
 * @typedef {import('iso-filecoin/types').Chain} Chain
 */

/**
 * no op
 */
const noop = () => {
  // do nothing
}

const noopStorage = {
  getItem: () => null,
  setItem: () => {
    // do nothing
  },
  removeItem: () => {
    // do nothing
  },
}

const PREFIX = 'iso-filecoin.'

function getDefaultStorage() {
  const storage = (() => {
    if (typeof window !== 'undefined' && window.localStorage)
      return window.localStorage
    return noopStorage
  })()
  return {
    /**
     * @param {string} key
     */
    getItem(key) {
      return storage.getItem(PREFIX + key)
    },
    /**
     * @param {string} key
     */
    removeItem(key) {
      storage.removeItem(PREFIX + key)
    },
    /**
     * @param {string} key
     * @param {string} value
     */
    setItem(key, value) {
      try {
        storage.setItem(PREFIX + key, value)
      } catch {
        // silence errors by default (QuotaExceededError, SecurityError, etc.)
      }
    },
  }
}

/**
 * Wallet context
 */
const WalletContext =
  /** @type {typeof React.createContext<WalletContextType>} */ (
    React.createContext
  )({
    chain: Chains.mainnet,
    network: 'mainnet',
    wallets: [],
    wallet: undefined,
    account: undefined,
    connecting: false,
    connected: false,
    disconnecting: false,
    loading: true,
    rpc: new RPC({
      api: Chains.mainnet.rpcUrls.default.http[0],
      network: 'mainnet',
    }),
    select: () => Promise.resolve(),
    connect: () => Promise.resolve(),
    disconnect: () => Promise.resolve(),
    changeNetwork: () => Promise.resolve(),
    deriveAccount: () => Promise.resolve(),
  })

/**
 *
 * @param {React.PropsWithChildren<WalletProviderProps>} props
 * @returns
 */
export function WalletProvider({
  children,
  adapters,
  onError = noop,
  chains,
  network: _network = 'mainnet',
  connectOnSelect = true,
}) {
  const [adapter, setAdapter] =
    /** @type {typeof useState<WalletAdapter | undefined>} */ (useState)(
      undefined
    )

  const [rpc, setRpc] = /** @type {typeof useState<RPC>} */ (useState)(
    new RPC({
      api: chains[_network].rpcUrls.default.http[0],
      network: _network,
    })
  )
  const [chain, setChain] = /** @type {typeof useState<Chain>} */ (useState)(
    chains[_network]
  )

  const [connecting, setConnecting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [disconnecting, setDisconnecting] = useState(false)
  const [connected, setConnected] = useState(false)
  const [network, setNetwork] = /** @type {typeof useState<Network>} */ (
    useState
  )(_network)

  const [wallets, setWallets] =
    /** @type {typeof useState<WalletAdapter[]>} */ (useState)(() =>
      adapters
        .filter(({ support }) => support !== 'NotSupported')
        .map((adapter) => {
          adapter.changeNetwork(_network)
          return adapter
        })
    )

  /**
   * Effects
   */

  /**
   * Initial adapter support check on mount once
   */
  // biome-ignore lint/correctness/useExhaustiveDependencies: just need to check support once
  useEffect(() => {
    async function setup() {
      try {
        const a = await Promise.all(
          wallets.map(async (w) => {
            await w.checkSupport()
            return w
          })
        )

        const lastWallet = getDefaultStorage().getItem('adapter')
        setWallets(() =>
          a
            .filter(({ support }) => support !== 'NotSupported')
            .sort((a, b) => {
              if (a.support === 'NotDetected' && b.support === 'Detected') {
                return 1
              }
              if (a.support === 'Detected' && b.support === 'Detected') {
                return 0
              }
              return -1
            })
        )

        if (lastWallet) {
          setAdapter(wallets.find((wallet) => wallet.name === lastWallet))
        }
      } catch (error) {
        onError(/** @type {Error} */ (error))
      } finally {
        setLoading(false)
      }
    }

    setup()
  }, [])

  // Setup and teardown event listeners when the adapter changes
  useEffect(() => {
    if (!adapter) return

    const handleConnect = () => {
      setConnecting(false)
      setConnected(true)
      setDisconnecting(false)
      getDefaultStorage().setItem('adapter', adapter.name)
    }

    const handleDisconnect = () => {
      setAdapter(undefined)
      setConnecting(false)
      setConnected(false)
      setDisconnecting(false)
      getDefaultStorage().removeItem('adapter')
    }

    const handleNetworkChanged = (
      /** @type {CustomEvent<{ network: Network; account?: IAccount }>} */ evt
    ) => {
      setNetwork(evt.detail.network)
      setChain(chains[evt.detail.network])
      setRpc(
        new RPC({
          api: Chains[evt.detail.network].rpcUrls.default.http[0],
          network: evt.detail.network,
        })
      )
      setConnecting(false)
    }

    const handleError = (/** @type {CustomEvent<Error>} */ evt) => {
      if (onError) {
        onError(evt.detail, adapter)
      }
    }
    const handleAccountChanged = () => {
      setConnecting(false)
    }

    adapter.on('connect', handleConnect)
    adapter.on('disconnect', handleDisconnect)
    adapter.on('error', handleError)
    adapter.on('networkChanged', handleNetworkChanged)
    adapter.on('accountChanged', handleAccountChanged)
    // globalThis.addEventListener('beforeunload', handleDisconnect)

    if (connectOnSelect) {
      connect()
    }

    return () => {
      // globalThis.removeEventListener('beforeunload', handleDisconnect)
      adapter.off('connect', handleConnect)
      adapter.off('disconnect', handleDisconnect)
      adapter.off('error', handleError)
      adapter.off('networkChanged', handleNetworkChanged)
      adapter.off('accountChanged', handleAccountChanged)
    }
  }, [
    adapter,
    chains,
    connectOnSelect,
    onError,
    setAdapter,
    setNetwork,
    setRpc,
    setChain,
  ])

  /**
   * Callbacks
   */
  const selectWallet = useCallback(
    async (/** @type {string} */ nextWalletName) => {
      if (nextWalletName === adapter?.name) {
        return
      }
      await disconnect()
      setAdapter(wallets.find((wallet) => wallet.name === nextWalletName))
    },
    [adapter, wallets, setAdapter]
  )

  const connect = useCallback(async () => {
    if (disconnecting || connecting || connected) {
      return
    }
    if (!adapter) {
      return onError(new Error('Adapter not found'), undefined)
    }
    try {
      setConnecting(true)
      await adapter.connect()
    } catch {
      setAdapter(undefined)
    } finally {
      setConnecting(false)
    }
  }, [adapter, disconnecting, connecting, connected, onError, setAdapter])

  const disconnect = useCallback(async () => {
    if (disconnecting || !adapter) {
      return
    }
    try {
      setDisconnecting(true)
      await adapter.disconnect()
    } catch {
      // ignore will be handled by the error handler
    } finally {
      setDisconnecting(false)
    }
  }, [adapter, disconnecting])

  const changeNetwork = React.useCallback(
    async (/** @type {Network} */ network) => {
      try {
        setConnecting(true)
        for (const wallet of wallets) {
          await wallet.changeNetwork(network)
        }
        if (!adapter) {
          setNetwork(network)
          setChain(chains[network])
          setRpc(
            new RPC({
              api: chains[network].rpcUrls.default.http[0],
              network: network,
            })
          )
        }
      } catch {
        // ignore will be handled by the error handler
      } finally {
        setConnecting(false)
      }
    },
    [wallets, setNetwork, adapter, setChain, chains, setRpc]
  )

  const deriveAccount = React.useCallback(
    async (/** @type {number} */ index) => {
      try {
        if (adapter) {
          setConnecting(true)
          await adapter.deriveAccount(index)
        }
      } catch {
        // ignore will be handled by the error handler
      } finally {
        setConnecting(false)
      }
    },
    [adapter]
  )

  return createElement(
    WalletContext.Provider,
    {
      value: {
        chain,
        wallets,
        wallet: adapter,
        account: adapter?.account,
        connecting,
        connected,
        disconnecting,
        loading,
        network,
        rpc,
        select: selectWallet,
        connect,
        disconnect,
        changeNetwork,
        deriveAccount,
      },
    },
    children
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider.')
  }
  return context
}

export function useBalance() {
  const { account, network, rpc } = useContext(WalletContext)
  const address = account?.address.toString()

  return useQuery({
    queryKey: ['balance', network, address],
    queryFn: async () => {
      if (!address) {
        throw new Error('Address not found')
      }
      const balance = await rpc.balance(address)

      if (balance.error) {
        throw new Error(balance.error.message)
      }
      return new Token(balance.result)
    },
    enabled: !!account,
  })
}

/**
 * Resolve addresses from the network
 * TODO: use cache
 */
export function useAddresses() {
  const { account, network, rpc } = useContext(WalletContext)

  return useQueries({
    queries: [
      {
        queryKey: ['addresses-id', network, account?.address.toString()],
        queryFn: async () => {
          try {
            return await account?.address.toIdAddress({ rpc })
          } catch (error) {
            throw new Error('ID address not found', { cause: error })
          }
        },
        enabled: !!account,
        retry: 1,
      },
      {
        queryKey: ['addresses-0x', network, account?.address.toString()],
        queryFn: async () => {
          try {
            return await account?.address.to0x({ rpc })
          } catch (error) {
            throw new Error('0x address not found', { cause: error })
          }
        },
        retry: 1,
        enabled: !!account,
      },
    ],
    combine: (result) => {
      return {
        addressId: result[0],
        address0x: result[1],
      }
    },
  })
}
