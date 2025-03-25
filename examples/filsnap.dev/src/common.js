/**
 * Shorten an address to the first 5 and last 5 characters.
 *
 * @param {string | undefined} address
 */
export function shortAddress(address) {
  if (!address) return '...'
  if (address.length < 10) return address
  return `${address.slice(0, 5)}...${address.slice(-5)}`
}
