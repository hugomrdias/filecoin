import type { QueryClient } from '@tanstack/react-query'
import * as dn from 'dnum'

export function formatBalance(
  data: { value?: bigint; decimals?: number } | undefined,
  options: { compact?: boolean; digits?: number } = {}
) {
  return dn.format([data?.value ?? 0n, data?.decimals ?? 18], {
    compact: options.compact ?? true,
    digits: options.digits ?? 4,
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
