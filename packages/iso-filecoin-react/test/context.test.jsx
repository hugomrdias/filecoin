import assert from 'assert'
import { cleanup, render } from '@testing-library/react/pure'
import { FilecoinProvider, useWalletProvider } from '../src/wallet-provider.js'

afterEach(() => {
  cleanup()
})

function Component() {
  const { adapters } = useWalletProvider()
  return (
    <div>
      <h1>wallet</h1>
      {adapters.map((wallet) => (
        <div key={wallet.name}>{wallet.name}</div>
      ))}
    </div>
  )
}
it('should basic', () => {
  const result = render(
    <FilecoinProvider adapters={[]}>
      <Component />
    </FilecoinProvider>
  )

  assert.strictEqual(result.getByRole('heading').innerText, 'wallet')
  assert.strictEqual(result.getByRole('heading').nextSibling, null)
  // result.unmount()
})
