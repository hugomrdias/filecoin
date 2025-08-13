import { useCallback } from 'react'
import { useConnectorClient } from 'wagmi'
import { getChain } from '@/lib/chains'

export function useAddUsdfc() {
  const { data: client } = useConnectorClient()

  const addUsdfc = useCallback(async () => {
    if (client) {
      const chain = getChain(client.chain.id)

      const result = await client.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: chain.contracts.usdfc.address,
            symbol: 'USDFC',
            decimals: 18,
            image: 'https://app.usdfc.net/apple-touch-icon.png',
          },
        },
      })

      return result
    }
  }, [client])

  return {
    addUsdfc,
  }
}
