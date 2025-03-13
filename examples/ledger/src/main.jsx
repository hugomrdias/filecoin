import './styles/index.css'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WalletProvider, mainnet, testnet } from 'iso-filecoin-react'
import {
  WalletAdapterFilsnap,
  WalletAdapterHd,
  WalletAdapterLedger,
  WalletAdapterLocal,
} from 'iso-filecoin-wallets'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.jsx'
import { toast } from './components/toast.jsx'

const appEl = document.getElementById('app')
const queryClient = new QueryClient()
const wallets = [
  new WalletAdapterLedger({
    transport: TransportWebHID,
  }),
  new WalletAdapterFilsnap(),
  WalletAdapterHd.fromMnemonic({
    mnemonic:
      'already turtle birth enroll since owner keep patch skirt drift any dinner',
  }),
  WalletAdapterLocal.create(),
]

if (appEl) {
  createRoot(appEl).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <WalletProvider
          adapters={wallets}
          onError={(error) => toast.error(error)}
          network="testnet"
          chains={{ mainnet, testnet }}
        >
          <App />
        </WalletProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}
