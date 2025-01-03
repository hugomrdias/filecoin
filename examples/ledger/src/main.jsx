import './styles/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FilsnapProvider } from 'filsnap-adapter-react'
import { render } from 'preact'

import { WagmiProvider } from 'wagmi'
import { App } from './app.jsx'
import { configWagmi } from './config.js'

const queryClient = new QueryClient()

/** @type {Partial<import('filsnap-adapter-react').FilsnapProviderProps['config']>} */
const config = {
  network: 'testnet',
}

const SNAP_ID = 'npm:filsnap'

// eslint-disable-next-line unicorn/prefer-query-selector
const appEl = document.getElementById('app')

if (appEl) {
  render(
    <WagmiProvider config={configWagmi}>
      <QueryClientProvider client={queryClient}>
        <FilsnapProvider
          snapId={SNAP_ID}
          snapVersion=">=0.5.0"
          config={config}
          reconnectOnMount={true}
          syncWithProvider={true}
        >
          <App />
        </FilsnapProvider>
      </QueryClientProvider>
    </WagmiProvider>,
    appEl
  )
}
