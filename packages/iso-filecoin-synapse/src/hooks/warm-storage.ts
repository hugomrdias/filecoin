import { skipToken, useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'
import { type UseReadContractParameters, useChainId, useConfig } from 'wagmi'
import * as payments from '../actions/payments.js'
import * as actions from '../actions/warm-storage.js'
import { getChain } from '../chains.js'
import { readWarmStorageGetServicePrice } from '../gen.js'

type AllowanceProps = {
  address?: Address
  /**
   * The address of the ERC20 token to query.
   * If not provided, the USDFC token address will be used.
   * @default chain.contracts.usdfc.address
   */
  token?: Address
  withCDN?: boolean
  sizeInBytes: bigint
  lockupDays: bigint
  /**
   * The query options.
   */
  query?: Omit<UseReadContractParameters['query'], 'enabled' | 'scopeKey'>
}

export type AllowanceResult = ReturnType<
  typeof actions.calculateAllowanceNeeded
>

/**
 * Get the allowance of the payments contract including the lockup and rate.
 *
 * @param props - The props for the allowance.
 * @param props.address - The address of the account to get the balance for.
 * @param props.token - The address of the ERC20 token to query.
 * @param props.watch - Whether to watch blocks.
 * @param props.query - The query options.
 * @returns The balance of the payments contract.
 */
export function useAllowance(props?: AllowanceProps) {
  const config = useConfig()
  const chainId = useChainId({ config })
  const chain = getChain(chainId)
  const token = props?.token ?? chain.contracts.usdfc.address
  // const scopeKey = `synapse-payments-balance-${token}-${props?.address}`
  const address = props?.address

  return useQuery({
    queryKey: [
      'useAllowance',
      address,
      props?.sizeInBytes.toString(),
      props?.lockupDays.toString(),
      props?.withCDN,
      props?.token,
    ],
    staleTime: 0,
    queryFn: address
      ? async () => {
          const allowance = await payments.operatorApproval({
            config,
            address,
            token,
          })

          const prices = await readWarmStorageGetServicePrice(config, {})

          const costs = actions.calculateStorageCosts(props.sizeInBytes, prices)

          return actions.calculateAllowanceNeeded(
            props.withCDN ? costs.withCDN : costs.withoutCDN,
            props.lockupDays,
            allowance
          )
        }
      : skipToken,
  })
}
