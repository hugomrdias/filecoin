import { useReadUsdfcBalanceOf } from 'iso-filecoin-synapse/gen'
import type { Address } from 'viem'

type Props = {
  address?: Address
  query?: Omit<
    NonNullable<Parameters<typeof useReadUsdfcBalanceOf>[0]>['query'],
    'enabled' | 'select'
  >
}

export function useBalanceUsdfc({ address, query }: Props) {
  return useReadUsdfcBalanceOf({
    args: [address!],
    query: {
      ...query,
      enabled: !!address,
      select(data) {
        return {
          value: data,
          decimals: 18,
          symbol: 'USDFC',
        }
      },
    },
  })
}
