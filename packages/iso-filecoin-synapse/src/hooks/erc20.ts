import { type Address, erc20Abi } from 'viem'
import { useConfig, useReadContracts } from 'wagmi'
import { getChain } from '../chains.js'

type Props = {
  address?: Address
  /**
   * The address of the ERC20 token to query.
   * If not provided, the USDFC token address will be used.
   */
  contract?: Address
  query?: Omit<
    NonNullable<Parameters<typeof useReadContracts>[0]>['query'],
    'enabled' | 'select'
  >
}

export function useBalance({ address, contract, query }: Props) {
  const config = useConfig()
  const chain = getChain(config.state.chainId)
  contract = contract ?? chain.contracts.usdfc.address
  return useReadContracts({
    query: {
      ...query,
      enabled: !!address,
      select(data) {
        return {
          value: data[0],
          decimals: data[1],
          symbol: data[2],
          allowance: data[3],
        }
      },
    },
    allowFailure: false,
    contracts: [
      {
        address: contract,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address!],
      },
      {
        address: contract,
        abi: erc20Abi,
        functionName: 'decimals',
      },
      {
        address: contract,
        abi: erc20Abi,
        functionName: 'symbol',
      },
      {
        address: contract,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [chain.contracts.payments.address, address!],
      },
    ],
  })
}
