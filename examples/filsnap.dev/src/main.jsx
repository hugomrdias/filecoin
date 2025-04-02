import '@radix-ui/themes/styles.css'
import './styles/index.css'
import { Theme } from '@radix-ui/themes'

import { http, WagmiProvider, createConfig } from 'wagmi'
import { filecoin, filecoinCalibration } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

import Buffer from 'buffer'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FilecoinProvider } from 'iso-filecoin-react'
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
  connectors: [
    metaMask({
      dappMetadata: {
        name: 'Filsnap',
        url: 'https://filsnap.dev',
        iconUrl: 'https://filsnap.dev/filecoin-logo.svg',
        base64Icon:
          'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNDAgNDAiPjxzdHlsZT4uc3QxLWxvZ297ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojZmZmfTwvc3R5bGU+PGRlZnM+PGZpbHRlciBpZD0iYS1sb2dvIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjAiIHk9IjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIxIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAxIDAiLz48L2ZpbHRlcj48L2RlZnM+PG1hc2sgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBpZD0iYi1sb2dvXzEiPjxnIGZpbHRlcj0idXJsKCNhLWxvZ28pIj48cGF0aCBpZD0iYS1sb2dvXzEiIGNsYXNzPSJzdDEtbG9nbyIgZD0iTTAgMGg0MHY0MEgwVjB6Ii8+PC9nPjwvbWFzaz48cGF0aCBkPSJNMjAgNDBDOSA0MCAwIDMxIDAgMTkuOS4xIDguOSA5LS4xIDIwLjEgMCAzMS4xLjEgNDAgOSA0MCAyMC4yIDM5LjkgMzEuMSAzMSA0MCAyMCA0MCIgbWFzaz0idXJsKCNiLWxvZ29fMSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDA5MGZmIi8+PHBhdGggY2xhc3M9InN0MS1sb2dvIiBkPSJtMjEuOSAxNy42LS42IDMuMiA1LjcuOC0uNCAxLjUtNS42LS44Yy0uNCAxLjMtLjYgMi43LTEuMSAzLjktLjUgMS40LTEgMi44LTEuNiA0LjEtLjggMS43LTIuMiAyLjktNC4xIDMuMi0xLjEuMi0yLjMuMS0zLjItLjYtLjMtLjItLjYtLjYtLjYtLjkgMC0uNC4yLS45LjUtMS4xLjItLjEuNyAwIDEgLjEuMy4zLjYuNy44IDEuMS42LjggMS40LjkgMi4yLjMuOS0uOCAxLjQtMS45IDEuNy0zIC42LTIuNCAxLjItNC43IDEuNy03LjF2LS40bC01LjMtLjguMi0xLjUgNS41LjguNy0zLjEtNS43LS45LjItMS42IDUuOS44Yy4yLS42LjMtMS4xLjUtMS42LjUtMS44IDEtMy42IDIuMi01LjIgMS4yLTEuNiAyLjYtMi42IDQuNy0yLjUuOSAwIDEuOC4zIDIuNCAxIC4xLjEuMy4zLjMuNSAwIC40IDAgLjktLjMgMS4yLS40LjMtLjkuMi0xLjMtLjItLjMtLjMtLjUtLjYtLjgtLjktLjYtLjgtMS41LS45LTIuMi0uMi0uNS41LTEgMS4yLTEuMyAxLjktLjcgMi4xLTEuMiA0LjMtMS45IDYuNWw1LjUuOC0uNCAxLjUtNS4zLS44Ii8+PC9zdmc+',
      },
    }),
  ],
  multiInjectedProviderDiscovery: false,
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
          <FilecoinProvider adapters={wallets} network="mainnet">
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </FilecoinProvider>
        </WagmiProvider>
      </Theme>
    </StrictMode>
  )
}
