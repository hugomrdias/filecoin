/**
 * Filecoin EVM Mainnet chain
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
    Beryx: {
      name: 'Beryx',
      url: 'https://beryx.io/fil/mainnet',
    },
    filfox: {
      name: 'Filfox',
      url: 'https://filfox.info',
    },
    default: {
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
  chainNamespace: 'eip155',
  caipNetworkId: 'eip155:314',
  iconUrls: ['https://filsnap.dev/filecoin-logo.svg'],
}

/**
 * Filecoin EVM Calibration testnet chain
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
    Beryx: {
      name: 'Beryx',
      url: 'https://beryx.io/fil/calibration',
    },
    filfox: {
      name: 'Filfox',
      url: 'https://calibration.filfox.info',
    },
    default: {
      name: 'Glif',
      url: 'https://www.glif.io/en/calibrationnet',
    },
  },
  testnet: true,
  chainId: '0x4cb2f',
  chainNamespace: 'eip155',
  caipNetworkId: 'eip155:314159',
  iconUrls: ['https://filsnap.dev/filecoin-logo.svg'],
}

/**
 * Filecoin Native chain
 *
 * @type {import('./types.js').Chain}
 */
export const filecoinNative = {
  ...mainnet,
  id: 'f',
  name: 'Filecoin',
  chainNamespace: 'fil',
  caipNetworkId: 'fil:f',
  chainId: 'f',
}

/**
 * Filecoin Calibration chain
 *
 * @type {import('./types.js').Chain}
 */
export const filecoinNativeCalibration = {
  ...testnet,
  id: 't',
  name: 'Filecoin Calibration',
  chainNamespace: 'fil',
  caipNetworkId: 'fil:t',
  chainId: 't',
}

/**
 * Converts a Chain to an Ethereum chain (Metamask)
 *
 * @param {import('./types.js').Chain} chain
 * @returns {import('./types.js').EthereumChain}
 */
export function toEthereumChain(chain) {
  let blockExplorerUrls

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
