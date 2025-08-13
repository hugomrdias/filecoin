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
