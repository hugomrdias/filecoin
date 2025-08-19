import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { calibration, mainnet } from 'iso-filecoin-synapse/chains'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createConfig, http, WagmiProvider } from 'wagmi'

import { injected } from 'wagmi/connectors'
import App from './app'
import { ThemeProvider } from './components/theme-provider'

import './style.css'

const queryClient = new QueryClient()
export const config = createConfig({
  chains: [mainnet, calibration],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [calibration.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

// biome-ignore lint/style/noNonNullAssertion: react
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="synapse-theme">
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
)
