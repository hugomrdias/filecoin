import type { Config } from '@wagmi/core'
import type { Address } from 'viem'
import { getChain } from '../chains.js'
import { readPaymentsOperatorApprovals } from '../gen.js'

export type OperatorApprovalProps = {
  config: Config
  operator?: Address
  address: Address
  token?: Address
}

export type OperatorApprovalResult = {
  isApproved: boolean
  rateAllowance: bigint
  lockupAllowance: bigint
  rateUsed: bigint
  lockupUsed: bigint
}

export async function operatorApproval(
  props: OperatorApprovalProps
): Promise<OperatorApprovalResult> {
  const chainId = props.config.state.chainId
  const chain = getChain(chainId)
  const token = props.token ?? chain.contracts.usdfc.address
  const operator = props.operator ?? chain.contracts.pandora.address

  const operatorApprovals = await readPaymentsOperatorApprovals(props.config, {
    args: [token, props.address, operator],
  })

  return {
    isApproved: operatorApprovals[0],
    rateAllowance: operatorApprovals[1],
    lockupAllowance: operatorApprovals[2],
    rateUsed: operatorApprovals[3],
    lockupUsed: operatorApprovals[4],
  }
}
