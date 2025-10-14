import {
  type Account,
  type Address,
  type Chain,
  type Client,
  maxUint256,
  parseSignature,
  type Transport,
} from 'viem'
import {
  type GetBlockNumberErrorType,
  getBlockNumber,
  multicall,
  type ReadContractErrorType,
  readContract,
  type SimulateContractErrorType,
  signTypedData,
  simulateContract,
  type WriteContractErrorType,
  writeContract,
} from 'viem/actions'
import { getChain } from '../../chains.js'
import {
  EIP712_TYPES,
  ERC20_WITH_PERMIT_ABI,
  LOCKUP_PERIOD,
} from '../../constants.js'
import { erc20 } from '../index.js'

export type AccountInfoOptions = {
  /**
   * The address of the ERC20 token to query.
   * If not provided, the USDFC token address will be used.
   */
  token?: Address

  /**
   * The address of the account to query.
   */
  address: Address

  /**
   * The block number to query.
   * In filecoin, the block number is the epoch number.
   */
  blockNumber?: bigint
}

export type AccountInfoResult = {
  funds: bigint
  lockupCurrent: bigint
  lockupRate: bigint
  lockupLastSettledAt: bigint
  availableFunds: bigint
}

/**
 * Get the account info from the payments contract.
 *
 * @param client - The client to use.
 * @param options - The options to use.
 * @returns The account info including funds, lockup details, and available balance.
 * @throws - {@link ReadContractErrorType} if the read contract fails.
 * @throws - {@link GetBlockNumberErrorType} if the get block number fails.
 */
export async function accountInfo(
  client: Client<Transport, Chain>,
  options: AccountInfoOptions
): Promise<AccountInfoResult> {
  const chain = getChain(client.chain.id)
  const token = options.token ?? chain.contracts.usdfc.address
  const currentEpoch =
    options.blockNumber ??
    (await getBlockNumber(client, {
      cacheTime: 0,
    }))

  const [funds, lockupCurrent, lockupRate, lockupLastSettledAt] =
    await readContract(client, {
      address: chain.contracts.payments.address,
      abi: chain.contracts.payments.abi,
      functionName: 'accounts',
      args: [token, options.address],
    })

  const epochSinceSettlement = currentEpoch - lockupLastSettledAt
  const actualLockup = lockupCurrent + epochSinceSettlement * lockupRate
  const availableFunds = funds - actualLockup

  return {
    funds,
    lockupCurrent,
    lockupRate,
    lockupLastSettledAt,
    availableFunds,
  }
}

export type DepositOptions = {
  /**
   * The amount to deposit.
   */
  amount: bigint
  /**
   * The address of the ERC20 token to deposit.
   * If not provided, the USDFC token address will be used.
   */
  token?: Address

  /**
   * The address of the account to deposit from.
   */
  address?: Address
}

/**
 * Deposit funds to the payments contract.
 *
 * @param client - The client to use.
 * @param options - The options to use.
 * @returns The hash of the deposit transaction.
 * @throws - {@link SimulateContractErrorType} if the simulate contract fails.
 * @throws - {@link WriteContractErrorType} if the write contract fails.
 */
export async function deposit(
  client: Client<Transport, Chain, Account>,
  options: DepositOptions
) {
  const chain = getChain(client.chain.id)
  const token = options.token ?? chain.contracts.usdfc.address
  const from = options.address ?? client.account.address

  if (!from) {
    throw new Error('Address is required')
  }

  if (options.amount <= 0n) {
    throw new Error('Amount must be greater than 0')
  }

  const balance = await erc20.balance(client, {
    address: from,
    token,
  })

  if (balance.value < options.amount) {
    throw new Error('Transfer amount exceeds ERC20 balance')
  }

  if (balance.allowance < options.amount) {
    throw new Error('Transfer amount exceeds ERC20 allowance')
  }

  const { request } = await simulateContract(client, {
    account: client.account,
    address: chain.contracts.payments.address,
    abi: chain.contracts.payments.abi,
    functionName: 'deposit',
    args: [token, from, options.amount],
  })
  const hash = await writeContract(client, request)
  return hash
}

export type WithdrawOptions = {
  /**
   * The amount to withdraw.
   */
  amount: bigint
  /**
   * The address of the ERC20 token to withdraw.
   * If not provided, the USDFC token address will be used.
   */
  token?: Address

  /**
   * The address of the account to withdraw from.
   */
  address?: Address
}

/**
 * Withdraw funds from the payments contract.
 *
 * @param client - The client to use.
 * @param options - The options to use.
 * @returns The hash of the withdraw transaction.
 * @throws - {@link SimulateContractErrorType} if the simulate contract fails.
 * @throws - {@link WriteContractErrorType} if the write contract fails.
 */
export async function withdraw(
  client: Client<Transport, Chain, Account>,
  options: WithdrawOptions
) {
  const chain = getChain(client.chain.id)
  const token = options.token ?? chain.contracts.usdfc.address
  const from = options.address ?? client.account.address

  if (!from) {
    throw new Error('Address is required')
  }

  if (options.amount <= 0n) {
    throw new Error('Amount must be greater than 0')
  }

  const account = await accountInfo(client, {
    address: from,
    token,
  })

  if (account.availableFunds < options.amount) {
    throw new Error('Transfer amount exceeds available funds')
  }

  const { request } = await simulateContract(client, {
    account: client.account,
    address: chain.contracts.payments.address,
    abi: chain.contracts.payments.abi,
    functionName: 'withdraw',
    args: [token, options.amount],
  })
  const hash = await writeContract(client, request)
  return hash
}

export type DepositAndApproveOptions = {
  /**
   * The amount to deposit.
   */
  amount: bigint
  operator?: Address
  token?: Address
  address?: Address
}

export async function depositAndApprove(
  client: Client<Transport, Chain, Account>,
  options: DepositAndApproveOptions
) {
  const chain = getChain(client.chain.id)
  const token = options.token ?? chain.contracts.usdfc.address
  const operator = options.operator ?? chain.contracts.storage.address
  const address = options.address ?? client.account.address

  const [_balance, name, nonce, version] = await multicall(client, {
    allowFailure: false,
    contracts: [
      {
        address: token,
        abi: ERC20_WITH_PERMIT_ABI,
        functionName: 'balanceOf',
        args: [address],
      },
      {
        address: token,
        abi: ERC20_WITH_PERMIT_ABI,
        functionName: 'name',
      },
      {
        address: token,
        abi: ERC20_WITH_PERMIT_ABI,
        functionName: 'nonces',
        args: [address],
      },
      {
        address: token,
        abi: ERC20_WITH_PERMIT_ABI,
        functionName: 'version',
      },
    ],
  })

  const deadline = BigInt(Math.floor(Date.now() / 1000) + 3600) // 1 hour
  const domain = {
    chainId: client.chain.id,
    name: name,
    version: version,
    verifyingContract: token,
  }
  const message = {
    owner: address,
    spender: chain.contracts.payments.address,
    value: options.amount,
    nonce: nonce,
    deadline: deadline,
  }
  const signature = await signTypedData(client, {
    account: client.account,
    domain,
    types: EIP712_TYPES,
    primaryType: 'Permit',
    message,
  })

  const structuredSignature = parseSignature(signature)

  const { request } = await simulateContract(client, {
    account: client.account,
    address: chain.contracts.payments.address,
    abi: chain.contracts.payments.abi,
    functionName: 'depositWithPermitAndApproveOperator',
    args: [
      token,
      address,
      options.amount,
      deadline,
      Number(structuredSignature.v),
      structuredSignature.r,
      structuredSignature.s,
      operator,
      maxUint256,
      maxUint256,
      LOCKUP_PERIOD,
    ],
  })
  const hash = await writeContract(client, request)

  return hash
}
