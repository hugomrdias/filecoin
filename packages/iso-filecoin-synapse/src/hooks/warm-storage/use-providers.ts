import { type UseQueryOptions, useQuery } from '@tanstack/react-query'
import { useConfig } from 'wagmi'
import {
  type PDPProvider,
  readProviders,
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
