import type { QueryClient } from '@tanstack/react-query'
import * as dn from 'dnum'
import { BrowserProvider, JsonRpcSigner } from 'ethers'
import { useMemo } from 'react'
import type { Account, Chain, Client, Transport } from 'viem'
import { type Config, useConnectorClient } from 'wagmi'

export function formatBalance(
  data:
    | { value?: bigint; decimals?: number; compact?: boolean; digits?: number }
    | undefined
) {
  return dn.format([data?.value ?? 0n, data?.decimals ?? 18], {
    compact: data?.compact ?? true,
    digits: data?.digits ?? 4,
  })
}

export function formatFraction(
  data:
    | { value?: bigint; decimals?: number; compact?: boolean; digits?: number }
    | undefined
) {
  return dn.format([data?.value ?? 0n, data?.decimals ?? 18], {
    compact: data?.compact ?? false,
    digits: data?.digits ?? 8,
  })
}

export function invalidateQueries(
  queryClient: QueryClient,
  scopeKey: string[]
) {
  return queryClient.invalidateQueries({
    predicate: (query) => {
      if (
        query.queryKey[1] &&
        typeof query.queryKey[1] === 'object' &&
        'scopeKey' in query.queryKey[1]
      ) {
        const scope = query.queryKey[1] as { scopeKey: string }
        return scopeKey.some((key) => scope.scopeKey === key)
      }

      return false
    },
  })
}

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new BrowserProvider(transport, network)
  const signer = new JsonRpcSigner(provider, account.address)
  return signer
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId })
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client])
}
