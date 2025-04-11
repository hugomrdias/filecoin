import type { ChainNamespace } from '@reown/appkit-common'
import {
  useAppKitAccount,
  useAppKitProvider,
  useAppKitState,
  useWalletInfo,
} from '@reown/appkit/react'
import {
  type WalletAdapter,
  useAccount,
  useAppKitAdapter,
  useBalance,
} from 'iso-filecoin-react'

export const InfoList = () => {
  const state = useAppKitState() // AppKit hook to get the state
  const { address, caipAddress, isConnected, status, embeddedWalletInfo } =
    useAppKitAccount() // AppKit hook to get the account information
  const { walletInfo } = useWalletInfo() // AppKit hook to get the wallet info
  const { walletProvider } = useAppKitProvider<WalletAdapter>(
    'fil' as ChainNamespace
  )
  useAppKitAdapter({
    adapter: walletProvider,
  })

  const { account } = useAccount()
  const { data: balance } = useBalance()

  return (
    <>
      <section>
        <h2>Filecoin Hooks</h2>
        <pre>
          Address: {account?.address.toString()}
          <br />
          Balance: {balance?.value.toFIL().toFormat({ decimalPlaces: 1 })}
          <br />
        </pre>
      </section>
      <section>
        <h2>useAppKit</h2>
        <pre>
          Address: {address}
          <br />
          caip Address: {caipAddress}
          <br />
          Connected: {isConnected.toString()}
          <br />
          Status: {status}
          <br />
          Account Type: {embeddedWalletInfo?.accountType}
        </pre>
      </section>

      <section>
        <h2>State</h2>
        <pre>
          activeChain: {state.activeChain}
          <br />
          loading: {state.loading.toString()}
          <br />
          open: {state.open.toString()}
          <br />
          selectedNetworkId: {state.selectedNetworkId?.toString()}
          <br />
        </pre>
      </section>

      <section>
        <h2>WalletInfo</h2>
        <pre>
          Name: {JSON.stringify(walletInfo, null, 2)}
          <br />
        </pre>
      </section>
    </>
  )
}
