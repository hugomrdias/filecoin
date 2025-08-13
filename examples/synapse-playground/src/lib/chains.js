import * as abi from './abi'

/**
 * Filecoin Mainnet
 *
 * @type {import('./types').Chain}
 */
export const mainnet = {
  id: 314,
  name: 'Filecoin Mainnet',
  genesis: 1598306400,
  nativeCurrency: {
    decimals: 18,
    name: 'filecoin',
    symbol: 'FIL',
  },
  http: 'https://api.node.glif.io/rpc/v1',
  websocket: 'wss://wss.node.glif.io/apigw/lotus/rpc/v1',
  contracts: {
    usdfc: {
      address: '0x80B98d3aa09ffff255c3ba4A241111Ff1262F045',
      abi: abi.usdfc,
    },
    payments: {
      address: '0x0000000000000000000000000000000000000000',
      abi: abi.payments,
    },
    pandora: {
      address: '0x0000000000000000000000000000000000000000',
      abi: abi.pandora,
    },
    pdp: {
      address: '0x0000000000000000000000000000000000000000',
      abi: abi.pdp,
    },
  },
}

/**
 * Filecoin Calibration
 *
 * @type {import('./types').Chain}
 */
export const calibration = {
  id: 314159,
  name: 'Filecoin Calibration',
  genesis: 1667326380,
  nativeCurrency: {
    decimals: 18,
    name: 'testnet filecoin',
    symbol: 'tFIL',
  },
  http: 'https://api.calibration.node.glif.io/rpc/v1',
  websocket: 'wss://wss.calibration.node.glif.io/apigw/lotus/rpc/v1',
  contracts: {
    usdfc: {
      address: '0xb3042734b608a1B16e9e86B374A3f3e389B4cDf0',
      abi: abi.usdfc,
    },
    payments: {
      address: '0x0E690D3e60B0576D01352AB03b258115eb84A047',
      abi: abi.payments,
    },
    pandora: {
      address: '0xf49ba5eaCdFD5EE3744efEdf413791935FE4D4c5',
      abi: abi.pandora,
    },
    pdp: {
      address: '0x5A23b7df87f59A291C26A2A1d684AD03Ce9B68DC',
      abi: abi.pdp,
    },
  },
}

/**
 * Get a chain by id
 *
 * @param {number} id
 * @returns {import('./types').Chain}
 */
export function getChain(id) {
  switch (id) {
    case 314:
      return mainnet
    case 314159:
      return calibration
    default:
      throw new Error(`Chain with id ${id} not found`)
  }
}
