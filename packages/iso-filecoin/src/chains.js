/**
 * Filecoin Mainnet chain
 *
 * @type {import('./types.js').Chain}
 */
export const mainnet = {
  id: 314,
  name: 'Filecoin - Mainnet',
  nativeCurrency: {
    name: 'Filecoin',
    symbol: 'FIL',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://api.node.glif.io/rpc/v1'] },
  },
  blockExplorers: {
    default: {
      name: 'Beryx',
      url: 'https://beryx.io/fil/mainnet',
    },
    filfox: {
      name: 'Filfox',
      url: 'https://filfox.info',
    },
    glif: {
      name: 'Glif',
      url: 'https://www.glif.io/en',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 3328594,
    },
  },
  chainId: '0x13a',
  caipId: 'fil:f',
  iconUrls: ['https://filsnap.dev/filecoin-logo.svg'],
}

/**
 * Filecoin Calibration testnet chain
 *
 * @type {import('./types.js').Chain}
 */
export const testnet = {
  id: 314_159,
  name: 'Filecoin - Calibration testnet',
  nativeCurrency: {
    name: 'Filecoin',
    symbol: 'tFIL',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://api.calibration.node.glif.io/rpc/v1'] },
  },
  blockExplorers: {
    default: {
      name: 'Beryx',
      url: 'https://beryx.io/fil/calibration',
    },
    filfox: {
      name: 'Filfox',
      url: 'https://calibration.filfox.info',
    },
    glif: {
      name: 'Glif',
      url: 'https://www.glif.io/en?network=calibrationnet',
    },
  },
  testnet: true,
  chainId: '0x4cb2f',
  caipId: 'fil:t',
  iconUrls: ['https://filsnap.dev/filecoin-logo.svg'],
}

/**
 * Converts a Chain to an Ethereum chain (Metamask)
 *
 * @param {import('./types.js').Chain} chain
 * @returns {import('./types.js').EthereumChain}
 */
export function toEthereumChain(chain) {
  let blockExplorerUrls = undefined

  if (chain.blockExplorers) {
    blockExplorerUrls = Object.values(chain.blockExplorers).flatMap(
      (explorer) => explorer.url
    )
  }
  return {
    chainId: chain.chainId,
    chainName: chain.name,
    rpcUrls: Object.values(chain.rpcUrls).flatMap((rpc) => rpc.http),
    blockExplorerUrls,
    nativeCurrency: chain.nativeCurrency,
    iconUrls: chain.iconUrls,
  }
}
