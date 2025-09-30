import {
  type MutateOptions,
  skipToken,
  type UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import type { SetOptional } from 'type-fest'
import type { Address, TransactionReceipt } from 'viem'
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from 'viem/actions'
import { useAccount, useBlock, useChainId, useConfig } from 'wagmi'
import { getConnectorClient } from 'wagmi/actions'
import { payments } from '../../actions/index.js'
import type {
  AccountInfoOptions,
  AccountInfoResult,
  DepositOptions,
  OperatorApprovalsOptions,
  OperatorApprovalsResult,
  WithdrawOptions,
} from '../../actions/payments.js'
import { getChain } from '../../chains.js'
import { LOCKUP_PERIOD } from '../../constants.js'

interface UseAccountInfoProps
  extends SetOptional<AccountInfoOptions, 'address'> {
  /**
   * Whether to watch blocks.
   * @default false
   */
  watch?: boolean
  query?: Omit<UseQueryOptions<AccountInfoResult>, 'queryKey' | 'queryFn'>
}

/**
 * Get the account info from the payments contract.
 *
 * @param props - The props for the balance.
 * @param props.address - The address of the account to get the balance for.
 * @param props.token - The address of the ERC20 token to query.
 * @param props.watch - Whether to watch blocks.
 * @param props.query - The query options.
 * @returns The account info including funds, lockup details, and available balance.
 */
export function useAccountInfo(props?: UseAccountInfoProps) {
  const config = useConfig()
  const chainId = useChainId({ config })
  const chain = getChain(chainId)
  const token = props?.token ?? chain.contracts.usdfc.address
  const address = props?.address
  const { data } = useBlock({
    blockTag: 'latest',
    chainId,
    watch: props?.watch ?? false,
  })

  const result = useQuery({
    ...props?.query,
    queryKey: [
      'synapse-payments-account-info',
      address,
      token,
      data?.number?.toString(),
    ],
    queryFn: address
      ? async () => {
          return await payments.accountInfo(config.getClient(), {
            token,
            address,
            blockNumber: data?.number,
          })
        }
      : skipToken,
  })
  return result
}

export interface UseOperatorApprovalsProps
  extends SetOptional<OperatorApprovalsOptions, 'address'> {
  query?: Omit<UseQueryOptions<OperatorApprovalsResult>, 'queryKey' | 'queryFn'>
}

export type { OperatorApprovalsResult } from '../../actions/payments.js'

/**
 * Get the operator approvals from the payments contract.
 *
 * @param props - The props for the balance.
 * @returns The operator approvals.
 */
export function useOperatorApprovals(props?: UseOperatorApprovalsProps) {
  const config = useConfig()
  const chainId = useChainId({ config })
  const chain = getChain(chainId)
  const token = props?.token ?? chain.contracts.usdfc.address
  const operator = props?.operator ?? chain.contracts.storage.address
  const address = props?.address

  const result = useQuery({
    ...props?.query,
    queryKey: ['synapse-payments-operator-approvals', address, token, operator],
    queryFn: address
      ? async () => {
          return await payments.operatorApprovals(config.getClient(), {
            token,
            address,
            operator,
          })
        }
      : skipToken,
  })
  return result
}

type UseDepositVariables = Pick<DepositOptions, 'amount'>
interface UseDepositProps extends Omit<DepositOptions, 'amount'> {
  /**
   * The mutation options.
   */
  mutation?: Omit<
    MutateOptions<TransactionReceipt, Error, UseDepositVariables>,
    'mutationFn'
  >
  /**
   * The callback to call when the hash is available.
   */
  onHash?: (hash: string) => void
}

/**
 * Deposit ERC20 tokens into the payments contract.
 *
 * @param props - The props for the deposit.
 * @param props.address - The address of the account to deposit from.
 * @param props.token - The address of the ERC20 token to deposit.
 * @param props.mutation - The mutation options.
 * @param props.onHash - The callback to call when the hash is available.
 * @returns The deposit mutation.
 */
export function useDeposit(props?: UseDepositProps) {
  const config = useConfig()
  const chainId = useChainId({ config })
  const chain = getChain(chainId)
  const account = useAccount({ config })
  const queryClient = useQueryClient()
  const token = props?.token ?? chain.contracts.usdfc.address
  const from = props?.address ?? account.address

  return useMutation({
    mutationFn: async ({ amount }: UseDepositVariables) => {
      const client = await getConnectorClient(config, {
        account: account.address,
        chainId,
      })

      const hash = await payments.deposit(client, {
        amount,
        address: account.address,
        token,
      })

      props?.onHash?.(hash)
      const transactionReceipt = await waitForTransactionReceipt(
        config.getClient(),
        {
          hash: hash,
        }
      )

      queryClient.invalidateQueries({
        queryKey: ['synapse-payments-account-info', from, token],
      })
      queryClient.invalidateQueries({
        queryKey: ['synapse-erc20-balance', from, token],
      })
      return transactionReceipt
    },
    ...props?.mutation,
  })
}

type UseWithdrawVariables = Pick<WithdrawOptions, 'amount'>
type UseWithdrawProps = Omit<WithdrawOptions, 'amount'> & {
  mutation?: Omit<
    MutateOptions<TransactionReceipt, Error, UseWithdrawVariables>,
    'mutationFn'
  >
  onHash?: (hash: string) => void
}
/**
 * Withdraw ERC20 tokens from the payments contract.
 *
 * @param props - The props for the withdraw.
 * @returns The withdraw mutation.
 */
export function useWithdraw(props?: UseWithdrawProps) {
  const config = useConfig()
  const chainId = useChainId({ config })
  const chain = getChain(chainId)
  const account = useAccount({ config })
  const queryClient = useQueryClient()
  const token = props?.token ?? chain.contracts.usdfc.address
  const from = props?.address ?? account.address

  return useMutation({
    mutationFn: async ({ amount }: UseWithdrawVariables) => {
      const client = await getConnectorClient(config, {
        account: account.address,
        chainId,
      })

      const withdraw = await payments.withdraw(client, {
        amount,
        address: account.address,
        token,
      })
      props?.onHash?.(withdraw)
      const transactionReceipt = await waitForTransactionReceipt(
        config.getClient(),
        {
          hash: withdraw,
        }
      )

      queryClient.invalidateQueries({
        queryKey: ['synapse-payments-account-info', from, token],
      })
      queryClient.invalidateQueries({
        queryKey: ['synapse-erc20-balance', from, token],
      })
      return transactionReceipt
    },
    ...props?.mutation,
  })
}

type ApproveOperatorProps =
  | {
      /**
       * The address of the operator to approve.
       * If not provided, the operator will be the Warm Storage contract.
       */
      operator?: Address
      /**
       * The address of the ERC20 token to query.
       * If not provided, the USDFC token address will be used.
       */
      token?: Address
      /**
       * The mutation options.
       */
      mutation?: Omit<
        MutateOptions<
          TransactionReceipt,
          Error,
          { lockup: bigint; rate: bigint }
        >,
        'mutationFn'
      >
      onHash?: (hash: string) => void
    }
  | undefined

/**
 * Approve a service contract to act as an operator for payment rails.
 *
 * @param props - The props for the deposit.
 * @param props.operator - The address of the operator to approve.
 * @param props.token - The address of the ERC20 token to deposit.
 * @param props.mutation - The mutation options.
 * @param props.onHash - The callback to call when the hash is available.
 * @returns The deposit mutation.
 */
export function useApproveOperator(props?: ApproveOperatorProps) {
  const config = useConfig()
  const chainId = useChainId({ config })
  const chain = getChain(chainId)
  const account = useAccount({ config })
  const queryClient = useQueryClient()
  const token = props?.token ?? chain.contracts.usdfc.address
  const operator = props?.operator ?? chain.contracts.storage.address

  return useMutation({
    ...props?.mutation,
    mutationFn: async ({ lockup, rate }: { lockup: bigint; rate: bigint }) => {
      if (lockup < 0n) {
        throw new Error('Lockup must be positive')
      }
      if (rate < 0n) {
        throw new Error('Rate must be positive')
      }

      const client = await getConnectorClient(config, {
        account: account.address,
        chainId,
      })
      const { request } = await simulateContract(client, {
        address: chain.contracts.payments.address,
        abi: chain.contracts.payments.abi,
        functionName: 'setOperatorApproval',
        args: [token, operator, true, rate, lockup, LOCKUP_PERIOD],
      })

      const approve = await writeContract(client, request)
      props?.onHash?.(approve)
      const transactionReceipt = await waitForTransactionReceipt(
        config.getClient(),
        {
          hash: approve,
        }
      )

      queryClient.invalidateQueries({
        queryKey: [
          'synapse-payments-operator-approvals',
          account.address,
          token,
          operator,
        ],
      })
      queryClient.invalidateQueries({
        queryKey: ['synapse-erc20-balance', account.address, token],
      })

      return transactionReceipt
    },
  })
}

// type RevokeOperatorProps =
//   | {
//       /**
//        * The address of the operator to revoke.
//        * If not provided, the operator will be the Warm Storage contract.
//        */
//       operator?: Address
//       /**
//        * The address of the ERC20 token to query.
//        * If not provided, the USDFC token address will be used.
//        */
//       token?: Address
//       /**
//        * The mutation options.
//        */
//       mutation?: Omit<MutateOptions<TransactionReceipt, Error>, 'mutationFn'>
//       onHash?: (hash: string) => void
//     }
//   | undefined

/**
 * Revoke the operator to deposit and withdraw ERC20 tokens from the payments contract.
 *
 * @param props - The props for the deposit.
 * @param props.operator - The address of the operator to approve.
 * @param props.token - The address of the ERC20 token to deposit.
 * @param props.mutation - The mutation options.
 * @param props.onHash - The callback to call when the hash is available.
 * @returns The deposit mutation.
 */
// export function useRevokeOperator(props?: RevokeOperatorProps) {
//   const config = useConfig()
//   const configChainId = useChainId({ config })
//   const chain = getChain(configChainId)
//   // const account = useAccount({ config })
//   // const queryClient = useQueryClient()
//   const token = props?.token ?? chain.contracts.usdfc.address
//   const operator = props?.operator ?? chain.contracts.storage.address

//   return useMutation({
//     mutationFn: async () => {
//       const simulateRevoke = await simulatePaymentsSetOperatorApproval(config, {
//         args: [token, operator, false, 0n, 0n],
//       })
//       const revoke = await writePaymentsSetOperatorApproval(
//         config,
//         simulateRevoke.request
//       )
//       props?.onHash?.(revoke)
//       const transactionReceipt = await waitForTransactionReceipt(
//         config.getClient(),
//         {
//           hash: revoke,
//         }
//       )

//       // await invalidateQueries(queryClient, [
//       //   `synapse-payments-balance-${token}-${from}`,
//       //   `synapse-erc20-balance-${token}-${from}`,
//       // ])
//       return transactionReceipt
//     },
//     ...props?.mutation,
//   })
// }

export * from './use-deposit-and-approve.js'
