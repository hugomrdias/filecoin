/** biome-ignore-all lint/suspicious/noConsole: node */
import { createConfig, http } from '@wagmi/core'
import { filecoin, filecoinCalibration } from '@wagmi/core/chains'
import {
  readUsdfcBalanceOf,
  usdfcAbi,
  usdfcAddress,
} from 'iso-filecoin-synapse/gen'
import { createClient } from 'viem'
import { readContract } from 'viem/actions'

export const config = createConfig({
  chains: [filecoin, filecoinCalibration],
  transports: {
    [filecoin.id]: http(),
    [filecoinCalibration.id]: http(),
  },
})

const client = createClient({
  chain: filecoinCalibration,
  transport: http(),
})

// 0x7e4ABd63A7C8314Cc28D388303472353D884f292

async function main() {
  const balance = await readUsdfcBalanceOf(config, {
    args: ['0x7e4ABd63A7C8314Cc28D388303472353D884f292'],
    chainId: filecoinCalibration.id,
  })

  const balance2 = await readContract(client, {
    address: usdfcAddress[client.chain.id],
    abi: usdfcAbi,
    functionName: 'balanceOf',
    args: ['0x7e4ABd63A7C8314Cc28D388303472353D884f292'],
  })

  console.log(balance, balance2)
}

main()
