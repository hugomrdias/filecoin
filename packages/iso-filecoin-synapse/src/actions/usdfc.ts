import type { Account, Chain, Client, Transport } from 'viem'
import { watchAsset } from 'viem/actions'
import { getChain } from '../chains.js'

export async function watchUsdfc(client: Client<Transport, Chain, Account>) {
  const chain = getChain(client.chain.id)
  const token = chain.contracts.usdfc.address

  const result = await watchAsset(client, {
    type: 'ERC20',
    options: {
      address: token,
      symbol: 'USDFC',
      decimals: 18,
      image: 'https://app.usdfc.net/apple-touch-icon.png',
    },
  })

  return result
}
