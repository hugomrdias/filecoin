import '@radix-ui/themes/styles.css'
import './styles/index.css'
import { Theme } from '@radix-ui/themes'

import { http, WagmiProvider, createConfig } from 'wagmi'
import { filecoin, filecoinCalibration } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

import Buffer from 'buffer'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WalletProvider } from 'iso-filecoin-react'
import {
  WalletAdapterFilsnap,
  WalletAdapterHd,
  WalletAdapterLedger,
} from 'iso-filecoin-wallets'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.jsx'

// ledger transport needs this
globalThis.Buffer = Buffer

export const config = createConfig({
  chains: [filecoin, filecoinCalibration],
  connectors: [metaMask()],
  transports: {
    [filecoin.id]: http(),
    [filecoinCalibration.id]: http(),
  },
})

const appEl = document.getElementById('app')
const queryClient = new QueryClient()
const wallets = [
  new WalletAdapterLedger({
    transport: TransportWebUSB,
  }),
  new WalletAdapterFilsnap(),
  new WalletAdapterHd(),
]

if (appEl) {
  createRoot(appEl).render(
    <StrictMode>
      <Theme
        appearance="dark"
        accentColor="blue"
        grayColor="auto"
        radius="medium"
      >
        <WagmiProvider config={config}>
          <WalletProvider adapters={wallets} network="mainnet">
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </WalletProvider>
        </WagmiProvider>
      </Theme>
    </StrictMode>
  )
}
