/**
 * Derivation path from chain
 *
 * @param {import('../types').Network} network
 * @param {number} [index=0] - Account index (default 0)
 */
export function pathFromNetwork(network, index = 0) {
  switch (network) {
    case 'mainnet':
      return `m/44'/461'/0'/0/${index}`

    case 'testnet':
      return `m/44'/1'/0'/0/${index}`

    default:
      throw new Error(`Unknown network: ${network}`)
  }
}
