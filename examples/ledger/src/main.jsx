import './styles/index.css'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WalletProvider } from 'iso-filecoin-react'
import {
  WalletAdapterFilsnap,
  WalletAdapterHd,
  WalletAdapterLedger,
  WalletAdapterLocal,
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
  WalletAdapterLocal.create(),
]

if (appEl) {
  createRoot(appEl).render(
    <QueryClientProvider client={queryClient}>
      <WalletProvider adapters={wallets} network="testnet">
        <App />
      </WalletProvider>
    </QueryClientProvider>
  )
}
