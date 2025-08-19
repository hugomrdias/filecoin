import {
  type MutateOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { simulateContract, writeContract } from '@wagmi/core'
import { type Address, erc20Abi, type TransactionReceipt } from 'viem'
import { waitForTransactionReceipt } from 'viem/actions'
import {
  type UseReadContractsParameters,
  useAccount,
  useChainId,
  useConfig,
  useReadContracts,
} from 'wagmi'
import { getChain } from '../chains.js'
import { invalidateQueries } from '../utils.js'

type Props = {
  address?: Address
  /**
   * The address of the ERC20 token to query.
   * If not provided, the USDFC token address will be used.
   */
  token?: Address
  query?: Omit<
    UseReadContractsParameters['query'],
    'enabled' | 'select' | 'scopeKey'
  >
}

export function useBalance(props: Props) {
  const config = useConfig()
  const chain = getChain(config.state.chainId)
  const token = props.token ?? chain.contracts.usdfc.address
  const scopeKey = `synapse-erc20-balance-${token}-${props.address}`

  return useReadContracts({
    query: {
      ...props.query,
      enabled: !!props.address,
      select(data) {
        return {
          value: data[0],
          decimals: data[1],
          symbol: data[2],
          allowance: data[3],
        }
      },
    },
    scopeKey,
    allowFailure: false,
    contracts: [
      {
        address: token,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [props.address!],
      },
      {
        address: token,
        abi: erc20Abi,
        functionName: 'decimals',
      },
      {
        address: token,
        abi: erc20Abi,
        functionName: 'symbol',
      },
      {
        address: token,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [props.address!, chain.contracts.payments.address],
      },
    ],
  })
}

type ApproveAllowanceProps =
  | {
      /**
       * The address of the ERC20 token to query.
       * If not provided, the USDFC token address will be used.
       * @default chain.contracts.usdfc.address
       */
      token?: Address
      /**
       * The mutation options.
       */
      mutation?: Omit<
        MutateOptions<TransactionReceipt, Error, { amount: bigint }>,
        'mutationFn'
      >
      onHash?: (hash: string) => void
    }
  | undefined

/**
 * Approve the allowance of the USDFC token to the payments contract.
 */
export function useApproveAllowance(props?: ApproveAllowanceProps) {
  const config = useConfig()
  const chainId = useChainId({ config })
  const chain = getChain(chainId)
  const account = useAccount({ config })
  const queryClient = useQueryClient()
  const token = props?.token ?? chain.contracts.usdfc.address

  return useMutation({
    mutationFn: async ({ amount }: { amount: bigint }) => {
      const scopeKey = `synapse-erc20-balance-${token}-${account.address}`

      if (amount < 0n) {
        throw new Error('Amount must be positive')
      }

      const simulateApprove = await simulateContract(config, {
        account: account.address,
        address: token,
        abi: erc20Abi,
        functionName: 'approve',
        args: [chain.contracts.payments.address, amount],
      })

      const approve = await writeContract(config, simulateApprove.request)

      props?.onHash?.(approve)
      const transactionReceipt = await waitForTransactionReceipt(
        config.getClient(),
        {
          hash: approve,
        }
      )

      await invalidateQueries(queryClient, [scopeKey])
      return transactionReceipt
    },
    ...props?.mutation,
  })
}
