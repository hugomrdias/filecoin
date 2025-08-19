import { type Config, readContracts } from '@wagmi/core'
import { type Address, isAddressEqual } from 'viem'
import { getChain } from '../chains.js'
import { SIZE_CONSTANTS, TIME_CONSTANTS } from '../constants.js'
import {
  readPdpVerifierGetNextRootId,
  readWarmStorageGetClientProofSets,
  type readWarmStorageGetServicePrice,
  readWarmStorageRailToProofSet,
} from '../gen.js'
import type { OperatorApprovalResult } from './payments.js'

/**
 * Get the proof sets for an address
 *
 * @param config - The wagmi config
 * @param address - The address of the client
 * @returns The proof sets for the address
 */
export async function getClientProofSets({
  config,
  address,
}: {
  config: Config
  address: Address
}) {
  const proofsSets = await readWarmStorageGetClientProofSets(config, {
    args: [address],
  })

  return proofsSets.filter(
    (data) =>
      data.payer !== '0x0000000000000000000000000000000000000000' &&
      Number(data.railId) !== 0
  )
}

/**
 * Get enhanced proof set information including chain details
 *
 * @param config - The wagmi config
 * @param address - The address of the client
 * @param onlyManaged - If true, only return proof sets managed by this Pandora contract (default: false)
 * @returns Array of proof set information with additional chain data and clear ID separation
 */
export async function getClientProofSetsWithDetails({
  config,
  address,
  onlyManaged = false,
}: {
  config: Config
  address: Address
  onlyManaged?: boolean
}) {
  const chainId = config.state.chainId
  const chain = getChain(chainId)
  const proofsSets = await getClientProofSets({ config, address })
  const proofsPromises = proofsSets.map(async (proofSet) => {
    // Get the actual PDPVerifier proof set ID from the rail ID
    try {
      const pdpVerifierProofSetId = await readWarmStorageRailToProofSet(
        config,
        {
          args: [proofSet.railId],
        }
      )

      if (pdpVerifierProofSetId === 0n) {
        // If railToProofSet returns 0, this rail doesn't exist in this Pandora contract
        return onlyManaged
          ? null // Will be filtered out
          : {
              ...proofSet,
              pdpVerifierProofSetId: 0,
              nextRootId: 0,
              currentRootCount: 0,
              isLive: false,
              isManaged: false,
            }
      }

      const [isLive, listenerResult] = await readContracts(config, {
        allowFailure: false,
        contracts: [
          {
            address: chain.contracts.pdp.address,
            abi: chain.contracts.pdp.abi,
            functionName: 'proofSetLive',
            args: [pdpVerifierProofSetId],
          },
          {
            address: chain.contracts.pdp.address,
            abi: chain.contracts.pdp.abi,
            functionName: 'getProofSetListener',
            args: [pdpVerifierProofSetId],
          },
        ],
      })

      const isManaged =
        listenerResult &&
        isAddressEqual(listenerResult, chain.contracts.pandora.address)

      if (onlyManaged && !isManaged) {
        // Skip unmanaged proof sets if onlyManaged is true
        return null // Will be filtered out
      }

      // Get next root ID only if the proof set is live

      const nextRootId = isLive
        ? await readPdpVerifierGetNextRootId(config, {
            args: [pdpVerifierProofSetId],
          })
        : 0n

      return {
        ...proofSet,
        pdpVerifierProofSetId,
        nextRootId,
        currentRootCount: nextRootId,
        isLive,
        isManaged,
      }
    } catch (error) {
      // Re-throw the error to let the caller handle it
      throw new Error(
        `Failed to get details for proof set with rail ID ${proofSet.railId}: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  })

  const proofsWithDetails = await Promise.all(proofsPromises)

  return proofsWithDetails.filter((proof) => proof !== null)
}

/**
 * Calculate the costs for a storage operation
 */
export function calculateStorageCosts(
  sizeInBytes: bigint,
  prices: Awaited<ReturnType<typeof readWarmStorageGetServicePrice>>
) {
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

/**
 * Calculate the allowance needed for a storage operation
 * TODO check if it needs creation fee with getClientProofSetsWithDetails
 */
export function calculateAllowanceNeeded(
  costs: {
    perEpoch: bigint
    perDay: bigint
    perMonth: bigint
  },
  lockupDays: bigint,
  approval: OperatorApprovalResult
) {
  const ratePerEpoch = costs.perEpoch

  // Calculate lockup period based on provided days (default: 10)
  const lockupInEpoch =
    (lockupDays ?? TIME_CONSTANTS.DEFAULT_LOCKUP_DAYS) *
    TIME_CONSTANTS.EPOCHS_PER_DAY
  const lockupNeeded = ratePerEpoch * lockupInEpoch

  // Calculate required allowances (current usage + new requirement)
  const totalRateNeeded = approval.rateUsed + ratePerEpoch
  const totalLockupNeeded = approval.lockupUsed + lockupNeeded

  const sufficient =
    approval.rateAllowance >= totalRateNeeded &&
    approval.lockupAllowance >= totalLockupNeeded

  return {
    depositAmountNeeded: lockupNeeded,
    rateAllowanceNeeded: totalRateNeeded,
    lockupAllowanceNeeded: totalLockupNeeded,
    currentRateAllowance: approval.rateAllowance,
    currentLockupAllowance: approval.lockupAllowance,
    currentRateUsed: approval.rateUsed,
    currentLockupUsed: approval.lockupUsed,
    sufficient,
    costs,
  }
}
