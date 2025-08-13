import { type ClassValue, clsx } from 'clsx'
import * as dn from 'dnum'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Truncates a string by keeping a specified number of characters at the start and end,
 * replacing the middle with "...". If the string is too short, returns it as is.
 *
 * @param str - The string to truncate.
 * @param startLen - Number of characters to keep at the start.
 * @param endLen - Number of characters to keep at the end.
 * @returns The truncated string.
 * @example
 * ```ts twoslash
 * import { truncateMiddle } from 'filsnap/utils'
 * truncateMiddle('f1abcdef1234567890abcdef', 4, 4) // "f1ab...cdef"
 * ```
 */
export function truncateMiddle(
  str: string,
  startLen: number,
  endLen: number
): string {
  if (str.length <= startLen + endLen + 3) return str
  return `${str.slice(0, startLen)}...${str.slice(-endLen)}`
}

export function formatBalance(
  data: { value?: bigint; decimals?: number } | undefined,
  options: { compact?: boolean; digits?: number } = {}
) {
  return dn.format([data?.value ?? 0n, data?.decimals ?? 18], {
    compact: options.compact ?? true,
    digits: options.digits ?? 4,
  })
}
