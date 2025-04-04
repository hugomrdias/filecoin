import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'
import * as Chains from 'iso-filecoin/chains'
import { http } from 'wagmi'
import { FilecoinAdapter } from './filecoin-adapter'
// Get projectId from https://cloud.reown.com
export const projectId =
  import.meta.env.VITE_PROJECT_ID || '44e17431f5bd907789195e5539ccdcee' // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://reown.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
}

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const networks = [
  Chains.mainnet,
  Chains.testnet,
  Chains.filecoinNative,
  Chains.filecoinCalibration,
  mainnet,
] as [AppKitNetwork, ...AppKitNetwork[]]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
  transports: {
    [Chains.mainnet.id]: http(),
    [Chains.testnet.id]: http(),
    [Chains.filecoinNative.id]: http(),
    [Chains.filecoinCalibration.id]: http(),
  },
})

export const filecoinAdapter = new FilecoinAdapter()

export const config = wagmiAdapter.wagmiConfig
