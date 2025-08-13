import { useMemo } from 'react'
import { useBlock, useChainId, useConfig, useReadContract } from 'wagmi'
import { payments } from '@/lib/abi'
import { getChain } from '@/lib/chains'
import type { Address } from '@/lib/types'

export function useBalancePayments(address: `0x${string}` | undefined) {
  const config = useConfig()
  const chainId = useChainId({ config })
  const chain = getChain(chainId)

  const paymentsResult = useReadContract({
    query: {
      enabled: !!address,
    },
    address: chain.contracts.payments.address,
    abi: payments,
    functionName: 'accounts',
    // biome-ignore lint/style/noNonNullAssertion: address is not null
    args: [chain.contracts.usdfc.address, address!],
  })

  const blockResult = useBlock({
    blockTag: 'latest',
    chainId: chainId,
  })

  const data = useMemo(() => {
    if (paymentsResult.data && blockResult.data) {
      // accountData returns: (uint256 funds, uint256 lockupCurrent, uint256 lockupRate, uint256 lockupLastSettledAt)
      const [funds, lockupCurrent, lockupRate, lockupLastSettledAt] =
        paymentsResult.data

      const currentEpoch = blockResult.data.number
      const epochSinceSettlement = currentEpoch - lockupLastSettledAt
      const actualLockup = lockupCurrent + epochSinceSettlement * lockupRate
      const availableFunds = funds - actualLockup

      return {
        funds,
        lockupCurrent,
        lockupRate,
        lockupLastSettledAt,
        actualLockup,
        availableFunds,
      }
    }
  }, [paymentsResult.data, blockResult.data])

  return {
    isLoading: paymentsResult.isLoading || blockResult.isLoading,
    error: paymentsResult.error || blockResult.error,
    data,
  }
}

export function usePaymentsApproval({
  operator,
  client,
  token,
}: {
  operator?: Address
  client?: Address
  token?: Address
}) {
  const config = useConfig()
  const chainId = useChainId({ config })
  const chain = getChain(chainId)

  const aprovals = useReadContract({
    query: {
      enabled: !!client,
    },
    address: chain.contracts.payments.address,
    abi: chain.contracts.payments.abi,
    functionName: 'operatorApprovals',
    args: [
      token ?? chain.contracts.usdfc.address,
      client!,
      operator ?? chain.contracts.pandora.address,
    ],
  })

  aprovals.data

  return {
    ...aprovals,
    data: aprovals.data
      ? {
          isApproved: aprovals.data[0],
          rateAllowance: aprovals.data[1],
          rateUsed: aprovals.data[2],
          lockupAllowance: aprovals.data[2],
          lockupUsed: aprovals.data[4],
        }
      : undefined,
  }
}
