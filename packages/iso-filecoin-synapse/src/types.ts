import type { Chain as FilChain } from 'iso-filecoin/types'
import type { erc20Abi } from 'viem'
import type * as generated from './gen.js'

export type Address = `0x${string}`

export interface Chain extends FilChain<number> {
  id: number
  genesis: number
  contracts: {
    usdfc: {
      address: Address
      abi: typeof erc20Abi
    }
    payments: {
      address: Address
      abi: typeof generated.paymentsAbi
    }
    pandora: {
      address: Address
      abi: typeof generated.warmStorageAbi
    }
    pdp: {
      address: Address
      abi: typeof generated.pdpVerifierAbi
    }
  }
}

export type PandoraGetServicePriceResult = {
  pricePerTiBPerMonthNoCDN: bigint
  pricePerTiBPerMonthWithCDN: bigint
  tokenAddress: Address
  epochsPerMonth: bigint
}

export type PaymentsApproval = {
  isApproved: boolean
  rateAllowance: bigint
  rateUsed: bigint
  lockupAllowance: bigint
  lockupUsed: bigint
}

/**
 * Proof set information returned from Pandora contract
 *
 * numbers changed to bigint
 */
export interface ProofSetInfo {
  /** Pandora payment rail ID (different from PDPVerifier proof set ID) */
  railId: bigint
  /** Address paying for storage */
  payer: string
  /** SP's beneficiary address */
  payee: string
  /** Commission rate in basis points */
  commissionBps: bigint
  /** General metadata for the proof set */
  metadata: string
  /** Array of metadata for each root */
  rootMetadata: readonly string[]
  /** Client's sequential dataset ID within this Pandora contract */
  clientDataSetId: bigint
  /** Whether the proof set is using CDN */
  withCDN: boolean
}
