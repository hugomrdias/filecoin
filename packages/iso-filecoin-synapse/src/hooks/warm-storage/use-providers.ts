import {
  skipToken,
  type UseQueryOptions,
  useQuery,
} from '@tanstack/react-query'
import type { Address } from 'viem'
import { useConfig } from 'wagmi'
import {
  type PDPProvider,
  type ProviderWithDataSets,
  readProviders,
  readProvidersWithDataSets,
} from '../../actions/warm-storage/providers.js'

export interface UseProvidersProps {
  query?: Omit<UseQueryOptions<UseProvidersResult>, 'queryKey' | 'queryFn'>
}

export type UseProvidersResult = PDPProvider[]

export function useProviders(props?: UseProvidersProps) {
  const config = useConfig()

  return useQuery({
    ...props?.query,
    queryKey: ['synapse-warm-storage-providers'],
    queryFn: () => {
      return readProviders(config.getClient())
    },
  })
}

export type UseProvidersWithDataSetsResult = ProviderWithDataSets[]
export interface UseProvidersWithDataSetsProps {
  query?: Omit<UseQueryOptions<ProviderWithDataSets[]>, 'queryKey' | 'queryFn'>
  address?: Address
}

export function useProvidersWithDataSets(props: UseProvidersWithDataSetsProps) {
  const config = useConfig()
  const address = props.address

  return useQuery({
    ...props?.query,
    queryKey: ['synapse-warm-storage-providers-with-data-sets', address],
    queryFn: address
      ? async () => {
          const data = await readProvidersWithDataSets(config.getClient(), {
            address,
          })
          return data
        }
      : skipToken,
  })
}
