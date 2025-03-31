import './styles/index.css'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FilecoinProvider } from 'iso-filecoin-react'
import {
  WalletAdapterFilsnap,
  WalletAdapterHd,
  WalletAdapterLedger,
  WalletAdapterRaw,
} from 'iso-filecoin-wallets'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.jsx'

const appEl = document.getElementById('app')
const queryClient = new QueryClient()
const wallets = [
  new WalletAdapterLedger({
    transport: TransportWebHID,
  }),
  new WalletAdapterFilsnap(),
  new WalletAdapterHd(),
  WalletAdapterRaw.create(),
]

if (appEl) {
  createRoot(appEl).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <FilecoinProvider adapters={wallets} network="testnet">
          <App />
        </FilecoinProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}
