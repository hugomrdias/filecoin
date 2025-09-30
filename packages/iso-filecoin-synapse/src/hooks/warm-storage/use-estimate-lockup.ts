import { type UseQueryOptions, useQuery } from '@tanstack/react-query'
import { useConfig } from 'wagmi'
import { servicePrice } from '../../actions/warm-storage/service-price.js'
import {
  type EstimateLockupResult,
  estimateLockup,
} from '../../actions/warm-storage/utils.js'

export interface UseEstimateLockupProps {
  sizeInBytes: bigint
  withCDN: boolean

  query?: Omit<UseQueryOptions<EstimateLockupResult>, 'queryKey' | 'queryFn'>
}

export type UseEstimateLockupResult = EstimateLockupResult

export function useEstimateLockup(props: UseEstimateLockupProps) {
  const { sizeInBytes, withCDN, query } = props
  const config = useConfig()
  return useQuery({
    ...query,
    queryKey: [
      'synapse-warm-storage-estimate-lockup',
      sizeInBytes.toString(),
      withCDN,
    ],
    queryFn: async () => {
      const prices = await servicePrice(config.getClient())

      return estimateLockup({
        sizeInBytes,
        withCDN,
        prices,
      })
    },
  })
}
