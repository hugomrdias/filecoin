import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as Chains from 'iso-filecoin/chains'
import { WagmiProvider } from 'wagmi'
import { http } from 'wagmi'
import { ActionButtonList } from './components/actions-list'
import { InfoList } from './components/info-list'
import './App.css'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { FilecoinProvider } from 'iso-filecoin-react'
import { FilecoinAppKitAdapter, chainImages } from 'iso-filecoin-wallets/appkit'
import { WalletAdapterFilsnap } from 'iso-filecoin-wallets/filsnap'
import { WalletAdapterLedger } from 'iso-filecoin-wallets/ledger'

const queryClient = new QueryClient()
// Get projectId from https://cloud.reown.com
export const projectId =
  import.meta.env.VITE_PROJECT_ID || '44e17431f5bd907789195e5539ccdcee' // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined')
}

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [Chains.mainnet, Chains.testnet, mainnet] as [
    AppKitNetwork,
    ...AppKitNetwork[],
  ],
  transports: {
    [Chains.mainnet.id]: http(),
    [Chains.testnet.id]: http(),
  },
})

// Set up the Filecoin Adapter
const adapters = [
  new WalletAdapterFilsnap({
    syncWithProvider: true,
  }),
  new WalletAdapterLedger({
    transport: TransportWebUSB,
  }),
]
export const filecoinAdapter = new FilecoinAppKitAdapter({ adapters })

// Create modal
createAppKit({
  adapters: [wagmiAdapter, filecoinAdapter],
  projectId,
  networks: [
    Chains.mainnet,
    Chains.testnet,
    Chains.filecoinNative,
    Chains.filecoinNativeCalibration,
    mainnet,
  ] as [AppKitNetwork, ...AppKitNetwork[]],
  metadata: {
    name: 'AppKit',
    description: 'AppKit Example',
    url: 'https://reown.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/179229932'],
  },
  debug: true,
  chainImages,
  themeMode: 'light',
})

export function App() {
  return (
    <div className={'pages'}>
      <img
        src="/reown.svg"
        alt="Reown"
        style={{ width: '150px', height: '150px' }}
      />
      <h1>Filecoin AppKit Example</h1>
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        <FilecoinProvider adapters={adapters}>
          <QueryClientProvider client={queryClient}>
            <appkit-button />
            <ActionButtonList />
            <InfoList />
          </QueryClientProvider>
        </FilecoinProvider>
      </WagmiProvider>
    </div>
  )
}

export default App
