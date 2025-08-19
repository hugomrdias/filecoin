import {
  type MutateOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useMemo } from 'react'
import { type Address, erc20Abi, type TransactionReceipt } from 'viem'
import { multicall, waitForTransactionReceipt } from 'viem/actions'
import {
  type UseReadContractParameters,
  useAccount,
  useBlock,
  useChainId,
  useConfig,
} from 'wagmi'
import { getChain } from '../chains.js'
import {
  simulatePaymentsDeposit,
  simulatePaymentsSetOperatorApproval,
  simulatePaymentsWithdraw,
  useReadPaymentsAccounts,
  writePaymentsDeposit,
  writePaymentsSetOperatorApproval,
  writePaymentsWithdraw,
} from '../gen.js'
import { invalidateQueries } from '../utils.js'

type BalanceProps = {
  address?: Address
  /**
   * The address of the ERC20 token to query.
   * If not provided, the USDFC token address will be used.
   * @default chain.contracts.usdfc.address
   */
  token?: Address
  /**
   * Whether to watch blocks.
   * @default false
   */
  watch?: boolean
  /**
   * The query options.
   */
  query?: Omit<UseReadContractParameters['query'], 'enabled' | 'scopeKey'>
}

/**
 * Get the balance of the payments contract including the lockup and rate.
 *
 * @param props - The props for the balance.
 * @param props.address - The address of the account to get the balance for.
 * @param props.token - The address of the ERC20 token to query.
 * @param props.watch - Whether to watch blocks.
 * @param props.query - The query options.
 * @returns The balance of the payments contract.
 */
export function useBalance(props?: BalanceProps) {
  const config = useConfig()
  const chainId = useChainId({ config })
  const chain = getChain(chainId)
  const token = props?.token ?? chain.contracts.usdfc.address
  const scopeKey = `synapse-payments-balance-${token}-${props?.address}`

  const blockResult = useBlock({
    blockTag: 'latest',
    chainId,
    watch: props?.watch ?? false,
    scopeKey,
  })

  const paymentsResult = useReadPaymentsAccounts({
    args: [token, props?.address!],
    query: {
      enabled: !!props?.address,
    },
    scopeKey,
  })

  const data = useMemo(() => {
    if (paymentsResult.data && blockResult.data) {
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
    ...paymentsResult,
    data,
  }
}

type DepositProps =
  | {
      from?: Address
      /**
       * The address of the ERC20 token to query.
       * If not provided, the USDFC token address will be used.
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
 * Deposit ERC20 tokens into the payments contract.
 *
 * @param props - The props for the deposit.
 * @param props.from - The address of the account to deposit from.
 * @param props.token - The address of the ERC20 token to deposit.
 * @param props.mutation - The mutation options.
 * @param props.onHash - The callback to call when the hash is available.
 * @returns The deposit mutation.
 */
export function useDeposit(props?: DepositProps) {
  const config = useConfig()
  const configChainId = useChainId({ config })
  const chain = getChain(configChainId)
  const account = useAccount({ config })
  const queryClient = useQueryClient()
  const token = props?.token ?? chain.contracts.usdfc.address

  return useMutation({
    mutationFn: async ({
      amount,
      from,
    }: {
      amount: bigint
      from?: Address
    }) => {
      from = from ?? account.address
      if (!from) {
        throw new Error('From address is required')
      }

      if (amount <= 0n) {
        throw new Error('Amount must be greater than 0')
      }

      // check balance and allowance
      const [balance, allowance] = await multicall(config.getClient(), {
        allowFailure: false,
        contracts: [
          {
            address: token,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [from],
          },
          {
            address: token,
            abi: erc20Abi,
            functionName: 'allowance',
            args: [from, chain.contracts.payments.address],
          },
        ],
      })
      if (balance < amount) {
        throw new Error('Insufficient balance')
      }
      if (allowance < amount) {
        throw new Error('Insufficient allowance')
      }

      const simulateApprove = await simulatePaymentsDeposit(config, {
        args: [token, from, amount],
      })
      const approve = await writePaymentsDeposit(
        config,
        simulateApprove.request
      )
      props?.onHash?.(approve)
      const transactionReceipt = await waitForTransactionReceipt(
        config.getClient(),
        {
          hash: approve,
        }
      )

      await invalidateQueries(queryClient, [
        `synapse-payments-balance-${token}-${from}`,
        `synapse-erc20-balance-${token}-${from}`,
      ])
      return transactionReceipt
    },
    ...props?.mutation,
  })
}

type WithdrawProps =
  | {
      from?: Address
      /**
       * The address of the ERC20 token to query.
       * If not provided, the USDFC token address will be used.
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
 * Withdraw ERC20 tokens from the payments contract.
 *
 * @param props - The props for the deposit.
 * @param props.from - The address of the account to deposit from.
 * @param props.token - The address of the ERC20 token to deposit.
 * @param props.mutation - The mutation options.
 * @param props.onHash - The callback to call when the hash is available.
 * @returns The deposit mutation.
 */
export function useWithdraw(props?: WithdrawProps) {
  const config = useConfig()
  const configChainId = useChainId({ config })
  const chain = getChain(configChainId)
  const account = useAccount({ config })
  const queryClient = useQueryClient()
  const token = props?.token ?? chain.contracts.usdfc.address

  return useMutation({
    mutationFn: async ({
      amount,
      from,
    }: {
      amount: bigint
      from?: Address
    }) => {
      from = from ?? account.address
      if (!from) {
        throw new Error('From address is required')
      }

      if (amount <= 0n) {
        throw new Error('Amount must be greater than 0')
      }
      const simulateWithdraw = await simulatePaymentsWithdraw(config, {
        args: [token, amount],
      })
      const withdraw = await writePaymentsWithdraw(
        config,
        simulateWithdraw.request
      )
      props?.onHash?.(withdraw)
      const transactionReceipt = await waitForTransactionReceipt(
        config.getClient(),
        {
          hash: withdraw,
        }
      )

      await invalidateQueries(queryClient, [
        `synapse-payments-balance-${token}-${from}`,
        `synapse-erc20-balance-${token}-${from}`,
      ])
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
 * Approve the operator to deposit and withdraw ERC20 tokens from the payments contract.
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
  const configChainId = useChainId({ config })
  const chain = getChain(configChainId)
  // const account = useAccount({ config })
  // const queryClient = useQueryClient()
  const token = props?.token ?? chain.contracts.usdfc.address
  const operator = props?.operator ?? chain.contracts.pandora.address

  return useMutation({
    mutationFn: async ({ lockup, rate }: { lockup: bigint; rate: bigint }) => {
      if (lockup < 0n) {
        throw new Error('Lockup must be positive')
      }
      if (rate < 0n) {
        throw new Error('Rate must be positive')
      }

      const simulateApprove = await simulatePaymentsSetOperatorApproval(
        config,
        {
          args: [token, operator, true, rate, lockup],
        }
      )
      const withdraw = await writePaymentsSetOperatorApproval(
        config,
        simulateApprove.request
      )
      props?.onHash?.(withdraw)
      const transactionReceipt = await waitForTransactionReceipt(
        config.getClient(),
        {
          hash: withdraw,
        }
      )

      // await invalidateQueries(queryClient, [
      //   `synapse-payments-balance-${token}-${from}`,
      //   `synapse-erc20-balance-${token}-${from}`,
      // ])
      return transactionReceipt
    },
    ...props?.mutation,
  })
}

type RevokeOperatorProps =
  | {
      /**
       * The address of the operator to revoke.
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
      mutation?: Omit<MutateOptions<TransactionReceipt, Error>, 'mutationFn'>
      onHash?: (hash: string) => void
    }
  | undefined

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
export function useRevokeOperator(props?: RevokeOperatorProps) {
  const config = useConfig()
  const configChainId = useChainId({ config })
  const chain = getChain(configChainId)
  // const account = useAccount({ config })
  // const queryClient = useQueryClient()
  const token = props?.token ?? chain.contracts.usdfc.address
  const operator = props?.operator ?? chain.contracts.pandora.address

  return useMutation({
    mutationFn: async () => {
      const simulateRevoke = await simulatePaymentsSetOperatorApproval(config, {
        args: [token, operator, false, 0n, 0n],
      })
      const revoke = await writePaymentsSetOperatorApproval(
        config,
        simulateRevoke.request
      )
      props?.onHash?.(revoke)
      const transactionReceipt = await waitForTransactionReceipt(
        config.getClient(),
        {
          hash: revoke,
        }
      )

      // await invalidateQueries(queryClient, [
      //   `synapse-payments-balance-${token}-${from}`,
      //   `synapse-erc20-balance-${token}-${from}`,
      // ])
      return transactionReceipt
    },
    ...props?.mutation,
  })
}
