import { useAccount } from 'wagmi'
import { ConnectWallet } from '@/components/connect-wallet'
import * as Icons from '@/components/icons'
import { NetworkSelector } from '@/components/network-selector'
import { Toaster } from '@/components/ui/sonner'
import { PaymentsAccount } from './components/payments-account'
import { Services } from './components/services'
import { WalletMenu } from './components/wallet-menu'

export function App() {
  const { isConnected } = useAccount()

  return (
    <div>
      <header>
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          <div className="flex flex-row gap-2 items-center">
            <a className="" href="/">
              <Icons.Filecoin className="w-8 h-8" />
            </a>
            <span className="text-xl font-bold">Pay</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            {isConnected && <WalletMenu />}
            <NetworkSelector />
          </div>
        </nav>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {isConnected && <PaymentsAccount />}
          {isConnected && <Services />}
          {!isConnected && <ConnectWallet />}
        </div>
      </main>
      <Toaster />
    </div>
  )
}

export default App
