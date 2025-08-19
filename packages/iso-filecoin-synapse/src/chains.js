import * as chains from 'iso-filecoin/chains'
import { erc20Abi } from 'viem'
import * as generated from './gen.js'
/**
 * Filecoin Mainnet chain
 *
 * Compatible with Viem
 *
 * @type {import('./types.js').Chain}
 */
export const mainnet = {
  ...chains.mainnet,
  genesis: 1598306400,
  contracts: {
    ...chains.mainnet.contracts,
    usdfc: {
      address: '0x80B98d3aa09ffff255c3ba4A241111Ff1262F045',
      abi: erc20Abi,
    },
    payments: {
      address: '0x0000000000000000000000000000000000000000',
      abi: generated.paymentsAbi,
    },
    pandora: {
      address: '0x0000000000000000000000000000000000000000',
      abi: generated.warmStorageAbi,
    },
    pdp: {
      address: '0x0000000000000000000000000000000000000000',
      abi: generated.pdpVerifierAbi,
    },
  },
}

/**
 * Filecoin Calibration
 *
 * Compatible with Viem
 *
 * @type {import('./types.js').Chain}
 */
export const calibration = {
  ...chains.calibration,
  genesis: 1667326380,
  contracts: {
    ...chains.calibration.contracts,
    usdfc: {
      address: '0xb3042734b608a1B16e9e86B374A3f3e389B4cDf0',
      abi: erc20Abi,
    },
    payments: {
      address: '0x0E690D3e60B0576D01352AB03b258115eb84A047',
      abi: generated.paymentsAbi,
    },
    pandora: {
      address: '0xf49ba5eaCdFD5EE3744efEdf413791935FE4D4c5',
      abi: generated.warmStorageAbi,
    },
    pdp: {
      address: '0x5A23b7df87f59A291C26A2A1d684AD03Ce9B68DC',
      abi: generated.pdpVerifierAbi,
    },
  },
}

/**
 * Get a chain by id
 *
 * @param {number} id
 * @returns {import('./types.js').Chain}
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
