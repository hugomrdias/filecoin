import type * as abi from './abi'

export type Address = `0x${string}`
export type Chain = {
  id: number
  name: string
  genesis: number
  nativeCurrency: {
    decimals: number
    name: string
    symbol: string
  }
  http: string
  websocket: string
  contracts: {
    usdfc: {
      address: Address
      abi: typeof abi.usdfc
    }
    payments: {
      address: Address
      abi: typeof abi.payments
    }
    pandora: {
      address: Address
      abi: typeof abi.pandora
    }
    pdp: {
      address: Address
      abi: typeof abi.pdp
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
