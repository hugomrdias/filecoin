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
      address: generated.paymentsAddress['314'],
      abi: generated.paymentsAbi,
    },
    storage: {
      address: generated.filecoinWarmStorageServiceAddress['314'],
      abi: generated.filecoinWarmStorageServiceAbi,
    },
    storageView: {
      address: generated.filecoinWarmStorageServiceStateViewAddress['314'],
      abi: generated.filecoinWarmStorageServiceStateViewAbi,
    },
    serviceProviderRegistry: {
      address: generated.serviceProviderRegistryAddress['314'],
      abi: generated.serviceProviderRegistryAbi,
    },
    sessionKeyRegistry: {
      address: generated.sessionKeyRegistryAddress['314'],
      abi: generated.sessionKeyRegistryAbi,
    },
    pdp: {
      address: generated.pdpVerifierAddress['314'],
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
      address: generated.paymentsAddress['314159'],
      abi: generated.paymentsAbi,
    },
    storage: {
      address: generated.filecoinWarmStorageServiceAddress['314159'],
      abi: generated.filecoinWarmStorageServiceAbi,
    },
    storageView: {
      address: generated.filecoinWarmStorageServiceStateViewAddress['314159'],
      abi: generated.filecoinWarmStorageServiceStateViewAbi,
    },
    serviceProviderRegistry: {
      address: generated.serviceProviderRegistryAddress['314159'],
      abi: generated.serviceProviderRegistryAbi,
    },
    sessionKeyRegistry: {
      address: generated.sessionKeyRegistryAddress['314159'],
      abi: generated.sessionKeyRegistryAbi,
    },
    pdp: {
      address: generated.pdpVerifierAddress['314159'],
      abi: generated.pdpVerifierAbi,
    },
  },
}

/**
 * Get a chain by id
 *
 * @param {number} [id] - The chain id. Defaults to mainnet.
 * @returns {import('./types.js').Chain}
 */
export function getChain(id) {
  if (id == null) {
    return mainnet
  }

  switch (id) {
    case 314:
      return mainnet
    case 314159:
      return calibration
    default:
      throw new Error(`Chain with id ${id} not found`)
  }
}
