/**
 * Filecoin EVM Mainnet chain
 *
 * @type {import('./types.js').Chain<number>}
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
    default: {
      http: ['https://api.node.glif.io/rpc/v1'],
      webSocket: ['wss://wss.node.glif.io/apigw/lotus/rpc/v1'],
    },
  },
  blockExplorers: {
    Beryx: {
      name: 'Beryx',
      url: 'https://beryx.io/fil/mainnet',
    },
    Filfox: {
      name: 'Filfox',
      url: 'https://filfox.info',
    },
    Glif: {
      name: 'Glif',
      url: 'https://www.glif.io/en',
    },
    default: {
      name: 'Blockscout',
      url: 'https://filecoin.blockscout.com',
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
 * @type {import('./types.js').Chain<number>}
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
    default: {
      http: ['https://api.calibration.node.glif.io/rpc/v1'],
      webSocket: ['wss://wss.calibration.node.glif.io/apigw/lotus/rpc/v1'],
    },
  },
  blockExplorers: {
    Beryx: {
      name: 'Beryx',
      url: 'https://beryx.io/fil/calibration',
    },
    Filfox: {
      name: 'Filfox',
      url: 'https://calibration.filfox.info',
    },
    Glif: {
      name: 'Glif',
      url: 'https://www.glif.io/en/calibrationnet',
    },
    default: {
      name: 'Blockscout',
      url: 'https://filecoin-testnet.blockscout.com',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 1446201,
    },
  },
  testnet: true,
  chainId: '0x4cb2f',
  chainNamespace: 'eip155',
  caipNetworkId: 'eip155:314159',
  iconUrls: ['https://filsnap.dev/filecoin-logo.svg'],
}

/**
 * Filecoin EVM Calibration testnet chain
 *
 * @type {import('./types.js').Chain<number>}
 */
export const calibration = testnet

/**
 * Filecoin Native chain
 *
 * @type {import('./types.js').Chain<string>}
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
 * @type {import('./types.js').Chain<string>}
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
