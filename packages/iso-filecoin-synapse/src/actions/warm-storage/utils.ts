import { SIZE_CONSTANTS, TIME_CONSTANTS } from '@filoz/synapse-sdk'
import { LOCKUP_PERIOD } from '../../constants.js'
import type { OperatorApprovalsResult } from '../payments.js'
import type { ServicePriceResult } from './service-price.js'

export type StorageCosts = {
  perEpoch: bigint
  perDay: bigint
  perMonth: bigint
}

export interface CalculateStorageCostsResult {
  withCDN: StorageCosts
  withoutCDN: StorageCosts
}

/**
 * Calculate the costs for a storage operation
 */
export function calculateStorageCosts(
  sizeInBytes: bigint,
  prices: ServicePriceResult
): CalculateStorageCostsResult {
  const {
    pricePerTiBPerMonthNoCDN,
    pricePerTiBPerMonthWithCDN,
    epochsPerMonth,
  } = prices
  // Calculate price per byte per epoch
  const pricePerEpochNoCDN =
    (pricePerTiBPerMonthNoCDN * sizeInBytes) /
    (SIZE_CONSTANTS.TiB * epochsPerMonth)
  const pricePerEpochWithCDN =
    (pricePerTiBPerMonthWithCDN * sizeInBytes) /
    (SIZE_CONSTANTS.TiB * epochsPerMonth)

  return {
    withCDN: {
      perEpoch: pricePerEpochWithCDN,
      perDay: pricePerEpochWithCDN * TIME_CONSTANTS.EPOCHS_PER_DAY,
      perMonth: pricePerEpochWithCDN * epochsPerMonth,
    },
    withoutCDN: {
      perEpoch: pricePerEpochNoCDN,
      perDay: pricePerEpochNoCDN * TIME_CONSTANTS.EPOCHS_PER_DAY,
      perMonth: pricePerEpochNoCDN * epochsPerMonth,
    },
  }
}

export interface EstimateLockupOptions {
  prices: ServicePriceResult
  sizeInBytes: bigint
  withCDN: boolean
}
export interface EstimateLockupResult {
  lockup: bigint
  rate: bigint
  costs: StorageCosts
}

export function estimateLockup(
  options: EstimateLockupOptions
): EstimateLockupResult {
  const { withCDN, withoutCDN } = calculateStorageCosts(
    options.sizeInBytes,
    options.prices
  )
  const costs = options.withCDN ? withCDN : withoutCDN
  const costPerEpoch = costs.perEpoch

  const lockup = costPerEpoch * LOCKUP_PERIOD
  const rate = costPerEpoch * TIME_CONSTANTS.EPOCHS_PER_DAY
  return {
    lockup,
    rate,
    costs,
  }
}

export interface CalculateAllowanceNeededResult {
  depositAmountNeeded: bigint
  rateAllowanceNeeded: bigint
  lockupAllowanceNeeded: bigint
  currentRateAllowance: bigint
  currentLockupAllowance: bigint
  currentRateUsed: bigint
  currentLockupUsed: bigint
  sufficient: boolean
  costs: StorageCosts
}
/**
 * Calculate the allowance needed for a storage operation
 * TODO check if it needs creation fee with getClientProofSetsWithDetails
 */
export function calculateAllowanceNeeded(
  costs: StorageCosts,
  operatorApprovals: OperatorApprovalsResult
): CalculateAllowanceNeededResult {
  const ratePerEpoch = costs.perEpoch

  // Calculate lockup period based on provided days (default: 10)
  const lockupInEpoch =
    TIME_CONSTANTS.DEFAULT_LOCKUP_DAYS * TIME_CONSTANTS.EPOCHS_PER_DAY
  const lockupNeeded = ratePerEpoch * lockupInEpoch

  // Calculate required allowances (current usage + new requirement)
  const totalRateNeeded = operatorApprovals.rateUsed + ratePerEpoch
  const totalLockupNeeded = operatorApprovals.lockupUsed + lockupNeeded

  const sufficient =
    operatorApprovals.rateAllowance >= totalRateNeeded &&
    operatorApprovals.lockupAllowance >= totalLockupNeeded

  return {
    depositAmountNeeded: lockupNeeded,

    rateAllowanceNeeded: totalRateNeeded,
    lockupAllowanceNeeded: totalLockupNeeded,

    currentRateAllowance: operatorApprovals.rateAllowance,
    currentLockupAllowance: operatorApprovals.lockupAllowance,
    currentRateUsed: operatorApprovals.rateUsed,
    currentLockupUsed: operatorApprovals.lockupUsed,
    sufficient,
    costs,
  }
}
