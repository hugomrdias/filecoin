import { type UseQueryOptions, useQuery } from '@tanstack/react-query'
import { useConfig } from 'wagmi'
import {
  type ServicePriceResult,
  servicePrice,
} from '../../actions/warm-storage/service-price.js'

/**
 * The props for the useServicePrice hook.
 */
export interface UseServicePriceProps {
  query?: Omit<UseQueryOptions<ServicePriceResult>, 'queryKey' | 'queryFn'>
}

/**
 * The result for the useServicePrice hook.
 */
export type UseServicePriceResult = ServicePriceResult

/**
 * Get the service price for the warm storage.
 *
 * @param props - The props to use.
 * @returns The service price.
 */
export function useServicePrice(props?: UseServicePriceProps) {
  const config = useConfig()

  return useQuery({
    ...props?.query,
    queryKey: ['synapse-warm-storage-get-service-price'],
    queryFn: async () => {
      const result = await servicePrice(config.getClient())
      return result
    },
  })
}
