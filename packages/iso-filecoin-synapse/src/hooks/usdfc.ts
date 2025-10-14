import { type MutateOptions, useMutation } from '@tanstack/react-query'
import { useConfig } from 'wagmi'
import { getConnectorClient } from 'wagmi/actions'
import { watchUsdfc } from '../actions/usdfc.ts'

export interface UseWatchUsdfcProps {
  mutation?: Omit<MutateOptions<boolean, Error>, 'mutationFn'>
}

export function useWatchUsdfc(props?: UseWatchUsdfcProps) {
  const config = useConfig()

  return useMutation({
    ...props?.mutation,
    mutationFn: async () => {
      const client = await getConnectorClient(config)
      return await watchUsdfc(client)
    },
  })
}
