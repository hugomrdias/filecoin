import './styles/index.css'
import TransportWebBLE from '@ledgerhq/hw-transport-web-ble'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
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

const appEl = document.getElementById('app')
const queryClient = new QueryClient()
const wallets = [
  new WalletAdapterLedger({
    name: 'Ledger USB',
    transport: TransportWebHID,
  }),
  new WalletAdapterLedger({
    name: 'Ledger BLE',
    transport: TransportWebBLE,
  }),
  new WalletAdapterFilsnap(),
  new WalletAdapterHd(),
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
