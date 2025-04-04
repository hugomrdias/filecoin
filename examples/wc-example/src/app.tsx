import { createAppKit } from '@reown/appkit/react'

import { useState } from 'react'
import { WagmiProvider } from 'wagmi'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ActionButtonList } from './components/actions-list'
import { InfoList } from './components/info-list'
import {
  filecoinAdapter,
  metadata,
  networks,
  projectId,
  wagmiAdapter,
} from './config'
import './App.css'
import { chainImages } from './config/filecoin-adapter'

const queryClient = new QueryClient()

const generalConfig = {
  projectId,
  networks,
  metadata,
}

// Create modal
createAppKit({
  adapters: [wagmiAdapter, filecoinAdapter],
  ...generalConfig,
  debug: true,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  chainImages,
})

export function App() {
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >(undefined)
  const [signedMsg, setSignedMsg] = useState('')
  const [balance, setBalance] = useState('')

  const receiveHash = (hash: `0x${string}`) => {
    setTransactionHash(hash) // Update the state with the transaction hash
  }

  const receiveSignedMsg = (signedMsg: string) => {
    setSignedMsg(signedMsg) // Update the state with the transaction hash
  }

  const receivebalance = (balance: string) => {
    setBalance(balance)
  }

  return (
    <div className={'pages'}>
      <img
        src="/reown.svg"
        alt="Reown"
        style={{ width: '150px', height: '150px' }}
      />
      <h1>AppKit Wagmi React dApp Example</h1>
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <appkit-button />
          <ActionButtonList
            sendHash={receiveHash}
            sendSignMsg={receiveSignedMsg}
            sendBalance={receivebalance}
          />

          <InfoList
            hash={transactionHash}
            signedMsg={signedMsg}
            balance={balance}
          />
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  )
}

export default App
