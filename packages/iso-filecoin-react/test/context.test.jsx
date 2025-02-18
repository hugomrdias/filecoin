import assert from 'assert'
import { cleanup, render } from '@testing-library/react/pure'
import {
  WalletProvider,
  mainnet,
  testnet,
  useWallet,
} from '../src/wallet-provider.js'

afterEach(() => {
  cleanup()
})

function Component() {
  const { wallets } = useWallet()
  return (
    <div>
      <h1>wallet</h1>
      {wallets.map((wallet) => (
        <div key={wallet.name}>{wallet.name}</div>
      ))}
    </div>
  )
}
it('should basic', () => {
  const result = render(
    <WalletProvider adapters={[]} chains={{ mainnet, testnet }}>
      <Component />
    </WalletProvider>
  )

  assert.strictEqual(result.getByRole('heading').innerText, 'wallet')
  assert.strictEqual(result.getByRole('heading').nextSibling, null)
  // result.unmount()
})
