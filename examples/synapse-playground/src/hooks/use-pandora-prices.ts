import { useMutation } from '@tanstack/react-query'
import { getClientProofSetsWithDetails } from 'iso-filecoin-synapse'
import {
  readUsdfcAllowance,
  readUsdfcBalanceOf,
  simulateUsdfcApprove,
  writeUsdfcApprove,
} from 'iso-filecoin-synapse/gen'
import { useMemo } from 'react'
import type { PublicClient } from 'viem'
import { waitForTransactionReceipt } from 'viem/actions'
import { useChainId, useConfig, useReadContract } from 'wagmi'
import { getChain } from '@/lib/chains'
import { SIZE_CONSTANTS, TIME_CONSTANTS } from '@/lib/constants'
import type {
  Address,
  PandoraGetServicePriceResult,
  PaymentsApproval,
  ProofSetInfo,
} from '@/lib/types'
import { usePaymentsApproval } from './use-payments'

/**
 * Get the storage costs per month
 */
export function usePandoraPrices() {
  const config = useConfig()
  const chainId = useChainId({ config })
  const chain = getChain(chainId)

  const pandoraResult = useReadContract({
    address: chain.contracts.pandora.address,
    abi: chain.contracts.pandora.abi,
    functionName: 'getServicePrice',
  })

  return pandoraResult
}

/**
 * Check if client has sufficient allowances for a storage operation and calculate costs
 */
export function usePandoraAllowance({
  client,
  sizeInBytes = 10n * SIZE_CONSTANTS.GiB,
  withCDN = true,
  lockupDays = TIME_CONSTANTS.DEFAULT_LOCKUP_DAYS,
}: {
  client?: Address
  sizeInBytes?: bigint
  withCDN?: boolean
  lockupDays?: bigint
}) {
  // const config = useConfig()
  // const chainId = useChainId({ config })
  // const chain = getChain(chainId)

  const {
    data: allowance,
    isLoading: allowanceIsLoading,
    error: allowanceError,
  } = usePaymentsApproval({
    client,
  })

  const {
    data: prices,
    isLoading: pricesIsLoading,
    error: pricesError,
  } = usePandoraPrices()

  const data = useMemo(() => {
    if (!allowance || !prices) return undefined

    const costs = calculateStorageCosts(sizeInBytes, prices)
    const selectedCosts = withCDN ? costs.withCDN : costs

    return calculateAllowanceNeeded(selectedCosts, lockupDays, allowance)
  }, [allowance, prices, sizeInBytes])

  return {
    data,
    isLoading: allowanceIsLoading || pricesIsLoading,
    error: allowanceError || pricesError,
  }
}

/**
 * Calculate the costs for a storage operation
 */
function calculateStorageCosts(
  sizeInBytes: bigint,
  prices: PandoraGetServicePriceResult
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
    perEpoch: pricePerEpochNoCDN,
    perDay: pricePerEpochNoCDN * TIME_CONSTANTS.EPOCHS_PER_DAY,
    perMonth: pricePerEpochNoCDN * epochsPerMonth,
    withCDN: {
      perEpoch: pricePerEpochWithCDN,
      perDay: pricePerEpochWithCDN * TIME_CONSTANTS.EPOCHS_PER_DAY,
      perMonth: pricePerEpochWithCDN * epochsPerMonth,
    },
  }
}

/**
 * Calculate the allowance needed for a storage operation
 */
function calculateAllowanceNeeded(
  costs: {
    perEpoch: bigint
    perDay: bigint
    perMonth: bigint
  },
  lockupDays: bigint,
  approval: PaymentsApproval
) {
  const rateNeeded = costs.perEpoch

  // Calculate lockup period based on provided days (default: 10)
  const lockupPeriod =
    (lockupDays ?? TIME_CONSTANTS.DEFAULT_LOCKUP_DAYS) *
    TIME_CONSTANTS.EPOCHS_PER_DAY
  const lockupNeeded = rateNeeded * lockupPeriod

  // Calculate required allowances (current usage + new requirement)
  const totalRateNeeded = approval.rateUsed + rateNeeded
  const totalLockupNeeded = approval.lockupUsed + lockupNeeded

  const sufficient =
    approval.rateAllowance >= totalRateNeeded &&
    approval.lockupAllowance >= totalLockupNeeded

  let message = ''
  if (!sufficient) {
    const messages = []
    if (approval.rateAllowance < totalRateNeeded) {
      messages.push(
        `Rate allowance insufficient: current ${String(approval.rateAllowance)}, need ${String(totalRateNeeded)}`
      )
    }
    if (approval.lockupAllowance < totalLockupNeeded) {
      messages.push(
        `Lockup allowance insufficient: current ${String(approval.lockupAllowance)}, need ${String(totalLockupNeeded)}`
      )
    }
    message = messages.join('. ')
  }

  return {
    rateAllowanceNeeded: totalRateNeeded,
    lockupAllowanceNeeded: totalLockupNeeded,
    currentRateAllowance: approval.rateAllowance,
    currentLockupAllowance: approval.lockupAllowance,
    currentRateUsed: approval.rateUsed,
    currentLockupUsed: approval.lockupUsed,
    sufficient,
    message,
    costs,
    depositAmountNeeded: lockupNeeded,
  }
}

export async function getClientProofSets({
  client,
  clientAddress,
  chainId,
}: {
  client: PublicClient
  clientAddress: Address
  chainId: number
}): Promise<ProofSetInfo[]> {
  const chain = getChain(chainId)

  const proofSetsData = await client.readContract({
    address: clientAddress,
    abi: chain.contracts.pandora.abi,
    functionName: 'getClientProofSets',
    args: [clientAddress],
  })

  return proofSetsData.filter(
    (data) =>
      data.payer !== '0x0000000000000000000000000000000000000000' &&
      Number(data.railId) !== 0
  )
}

export const PROOF_SET_CREATION_FEE = BigInt(0.1 * 10 ** 18)
export function usePayment() {
  const config = useConfig()
  const chain = getChain(config.state.chainId)

  return useMutation({
    mutationFn: async ({
      address,
      rateAllowanceNeeded,
      lockupAllowanceNeeded,
      depositAmountNeeded,
    }: {
      address: Address
      rateAllowanceNeeded: bigint
      lockupAllowanceNeeded: bigint
      depositAmountNeeded: bigint
    }) => {
      console.log('🚀 ~ usePayment ~ address:', address)

      const proofs = await getClientProofSetsWithDetails({ config, address })
      const hasProofs = proofs.length > 0

      const fee = hasProofs ? 0n : PROOF_SET_CREATION_FEE
      const amount = fee + depositAmountNeeded

      const allowance = await readUsdfcAllowance(config, {
        args: [address, chain.contracts.payments.address],
      })
      const balance = await readUsdfcBalanceOf(config, {
        args: [address],
      })

      console.log('🚀 ~ usePayment ~ balance:', balance)
      console.log('🚀 ~ usePayment ~ amount:', amount)
      console.log('🚀 ~ usePayment ~ allowance:', allowance)

      // if (allowance < amount) {
      const simulateApprove = await simulateUsdfcApprove(config, {
        args: [chain.contracts.payments.address, amount],
      })
      const approve = await writeUsdfcApprove(config, simulateApprove.request)
      const transactionReceipt = await waitForTransactionReceipt(
        config.getClient(),
        {
          hash: approve,
        }
      )
      console.log('🚀 ~ usePayment ~ transactionReceipt:', transactionReceipt)
      // }

      console.log('🚀 ~ helloo:')
    },
  })
}
