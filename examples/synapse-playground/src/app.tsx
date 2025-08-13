import { useAccount } from 'wagmi'
import { ConnectWallet } from '@/components/connect-wallet'
import { NetworkSelector } from '@/components/network-selector'
import { PaymentsAccount } from './components/payments-account'
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
              <img alt="" className="h-8 w-auto" src="/filoz.svg" />
            </a>
            <span className="text-xl font-bold">Payments</span>
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
          {!isConnected && <ConnectWallet />}
        </div>
      </main>
    </div>
  )
}

export default App
