import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { filecoin, filecoinCalibration } from 'wagmi/chains'

import { injected } from 'wagmi/connectors'
import App from './app'
import { ThemeProvider } from './components/theme-provider'

import './style.css'

const queryClient = new QueryClient()
export const config = createConfig({
  chains: [filecoin, filecoinCalibration],
  connectors: [injected()],
  transports: {
    [filecoin.id]: http(),
    [filecoinCalibration.id]: http(),
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
