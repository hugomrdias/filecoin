import * as Chains from 'iso-filecoin/chains'
import { RPC } from 'iso-filecoin/rpc'
import { Token } from 'iso-filecoin/token'
import React, { createElement, useContext, useEffect, useState } from 'react'

import {
  useMutation,
  useMutationState,
  useQueries,
  useQuery,
} from '@tanstack/react-query'
export { mainnet, testnet } from 'iso-filecoin/chains'

/**
 * @import { WalletProviderProps, WalletAdapter, AccountNetwork, Network, WalletContextType, IAccount, ConnectionState, UseAccountReturnType  } from './types.js'
 */

/**
 * @typedef {import('iso-filecoin/types').Chain} Chain
 */

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
    network: 'mainnet',
    adapters: [],
    adapter: undefined,
    account: undefined,
    loading: true,
    error: undefined,
    setAccount: () => void 0,
    setAdapter: () => void 0,
    setNetwork: () => void 0,
    rpcs: {
      mainnet: new RPC({
        api: Chains.mainnet.rpcUrls.default.http[0],
        network: 'mainnet',
      }),
      testnet: new RPC({
        api: Chains.testnet.rpcUrls.default.http[0],
        network: 'testnet',
      }),
    },
  })

/**
 *
 * @param {React.PropsWithChildren<WalletProviderProps>} props
 * @returns
 */
export function WalletProvider({
  children,
  adapters: _adapters,
  rpcs = {
    mainnet: new RPC({
      api: Chains.mainnet.rpcUrls.default.http[0],
      network: 'mainnet',
    }),
    testnet: new RPC({
      api: Chains.testnet.rpcUrls.default.http[0],
      network: 'testnet',
    }),
  },
  network: _network = 'mainnet',
}) {
  const [error, setError] = /** @type {typeof useState<Error | undefined>} */ (
    useState
  )(undefined)
  const [loading, setLoading] = useState(true)

  const [adapter, setAdapter] =
    /** @type {typeof useState<WalletAdapter | undefined>} */ (useState)(
      undefined
    )

  const [network, setNetwork] = /** @type {typeof useState<Network>} */ (
    useState
  )(_network)

  const [adapters, setAdapters] =
    /** @type {typeof useState<WalletAdapter[]>} */ (useState)(() =>
      _adapters.filter(({ support }) => support !== 'NotSupported')
    )

  const [account, setAccount] =
    /** @type {typeof useState<IAccount|undefined>} */ (useState)(undefined)

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
          adapters.map(async (w) => {
            await w.checkSupport()
            return w
          })
        )

        setAdapters(() =>
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

        // restore last wallet and network
        const lastWallet = getDefaultStorage().getItem('adapter')
        const lastNetwork = /** @type {Network} */ (
          getDefaultStorage().getItem('network')
        )

        if (lastNetwork) {
          setNetwork(lastNetwork)
        }

        if (lastWallet) {
          const adapter = adapters.find((wallet) => wallet.name === lastWallet)
          if (adapter) {
            setAdapter(adapter)
            const { account } = await adapter.connect({
              network: lastNetwork ?? network,
            })
            setAccount(account)
          }
        }
      } catch (error) {
        setError(/** @type {Error} */ (error))
      } finally {
        setLoading(false)
      }
    }

    setup()
  }, [])

  // Setup and teardown event listeners when the adapter changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: Only needs to react to adapter changes
  useEffect(() => {
    if (!adapter) return

    const handleConnect = (/** @type {CustomEvent<AccountNetwork>} */ evt) => {
      getDefaultStorage().setItem('adapter', adapter.name)
      setAccount(evt.detail.account)
      setError(undefined)
    }

    const handleDisconnect = () => {
      setAdapter(undefined)
      setAccount(undefined)
      getDefaultStorage().removeItem('adapter')
      getDefaultStorage().removeItem('network')
      setError(undefined)
    }

    const handleNetworkChanged = (
      /** @type {CustomEvent<AccountNetwork>} */ evt
    ) => {
      setAccount(evt.detail.account)
      setNetwork(evt.detail.network)
      setError(undefined)
      getDefaultStorage().setItem('network', evt.detail.network)
    }

    const handleError = (/** @type {CustomEvent<Error>} */ evt) => {
      setError(evt.detail)
    }
    const handleAccountChanged = (/** @type {CustomEvent<IAccount>} */ evt) => {
      setAccount(evt.detail)
      setError(undefined)
    }

    if (adapter) {
      adapter.on('connect', handleConnect)
      adapter.on('disconnect', handleDisconnect)
      adapter.on('error', handleError)
      adapter.on('networkChanged', handleNetworkChanged)
      adapter.on('accountChanged', handleAccountChanged)
    }

    return () => {
      adapter.off('connect', handleConnect)
      adapter.off('disconnect', handleDisconnect)
      adapter.off('error', handleError)
      adapter.off('networkChanged', handleNetworkChanged)
      adapter.off('accountChanged', handleAccountChanged)
    }
  }, [adapter])

  return createElement(
    WalletContext.Provider,
    {
      value: {
        error,
        adapters,
        adapter,
        account,
        loading,
        network,
        setAccount,
        setNetwork,
        setAdapter,
        rpcs,
      },
    },
    children
  )
}

export function useWalletProvider() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider.')
  }
  return context
}

/**
 * Hook to access the current wallet adapter and its state
 *
 * @example
 * ```ts twoslash
 * import { useAdapter } from 'iso-filecoin-react'
 *
 * function App() {
 *   const { adapter, error, loading } = useAdapter()
 *
 *   if (loading) return <div>Loading...</div>
 *   if (error) return <div>Error: {error.message}</div>
 *
 *   return <div>Current adapter: {adapter?.name}</div>
 * }
 * ```
 * @returns {Pick<WalletContextType, 'adapter' | 'error' | 'loading'>} Wallet adapter state
 */
export function useAdapter() {
  const { adapter, error, loading } = useWalletProvider()
  return { adapter, error, loading }
}

/**
 * Hook to access the current account and its state
 *
 * @example
 * ```ts twoslash
 * import { useAccount } from 'iso-filecoin-react'
 *
 * function App() {
 *   const { account, adapter, network, chain, state } = useAccount()
 *
 *   return <div>Current address: {account?.address.toString()}</div>
 * }
 * ```
 * @returns Account state
 */
export function useAccount() {
  const connect = useMutationState({
    filters: {
      mutationKey: ['connect'],
    },
    select: (mutation) => mutation.state.status,
  })

  const [state, setState] = /** @type {typeof useState<ConnectionState>} */ (
    useState
  )('disconnected')

  const { account, adapter, network } = useContext(WalletContext)
  useEffect(() => {
    if (connect[0] === 'pending') {
      setState('connecting')
    } else if (account) {
      setState('connected')
    } else {
      setState('disconnected')
    }
  }, [connect, account, setState])

  return /** @type {UseAccountReturnType} */ ({
    account,
    adapter,
    network,
    chain: Chains[network],
    state,
  })
}

/**
 * Hook to connect a wallet adapter
 *
 * @example
 * ```ts twoslash
 * import { useConnect } from 'iso-filecoin-react'
 *
 * function App() {
 *   const { adapters, error, mutate: connect, isPending } = useConnect()
 *
 *   return (
 *     <div>
 *       {adapters.map(adapter => (
 *         <button
 *           key={adapter.name}
 *           onClick={() => connect({ adapter })}
 *           disabled={isPending}
 *         >
 *           Connect {adapter.name}
 *         </button>
 *       ))}
 *       {error && <div>Error: {error.message}</div>}
 *     </div>
 *   )
 * }
 * ```
 * @returns Connection mutation and state
 */
export function useConnect() {
  const { setAdapter, network, adapter, adapters, loading } =
    useContext(WalletContext)
  const result = useMutation({
    mutationKey: ['connect'],
    mutationFn: (/** @type {{adapter: WalletAdapter}} */ params) => {
      return params.adapter.connect({ network })
    },
    onMutate: (params) => {
      setAdapter(params.adapter)
    },
  })

  return /** @type {typeof result & Pick<WalletContextType, 'adapters' | 'adapter' | 'loading'>} */ ({
    ...result,
    adapters,
    adapter,
    loading,
  })
}

export function useDisconnect() {
  const { adapter } = useContext(WalletContext)
  return useMutation({
    mutationKey: ['disconnect'],
    mutationFn: () => {
      if (!adapter) {
        throw new Error('Adapter not found')
      }
      return adapter.disconnect()
    },
  })
}

export function useChangeNetwork() {
  const { adapter, setNetwork } = useContext(WalletContext)
  return useMutation({
    mutationKey: ['changeNetwork'],
    mutationFn: async (/** @type {Network} */ network) => {
      if (!['mainnet', 'testnet'].includes(network)) {
        throw new Error(
          `Invalid network "${network}", must be "mainnet" or "testnet".`
        )
      }
      if (adapter) {
        const r = await adapter.changeNetwork(network)
        return r.network
      }
      setNetwork(network)
      return network
    },
  })
}

export function useDeriveAccount() {
  const { adapter } = useContext(WalletContext)
  return useMutation({
    mutationKey: ['deriveAccount'],
    mutationFn: (/** @type {number} */ index) => {
      if (!adapter) {
        throw new Error('Adapter not found')
      }
      return adapter.deriveAccount(index)
    },
  })
}

export function useBalance() {
  const { account, network, rpcs } = useContext(WalletContext)
  const address = account?.address.toString()

  return useQuery({
    queryKey: ['balance', network, address],
    queryFn: async () => {
      if (!address) {
        throw new Error('Address not found')
      }
      const balance = await rpcs[network].balance(address)

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
  const { account, network, rpcs } = useContext(WalletContext)

  return useQueries({
    queries: [
      {
        queryKey: ['addresses-id', network, account?.address.toString()],
        queryFn: async () => {
          try {
            return await account?.address.toIdAddress({ rpc: rpcs[network] })
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
            return await account?.address.to0x({ rpc: rpcs[network] })
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
