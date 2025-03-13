import { Toaster } from 'react-hot-toast'
import ConnectLedger from './components/connect-ledger.jsx'
import { Logo } from './components/logo.jsx'

/**
 * App component.
 */
export default function App() {
  return (
    <main className="App">
      <div className="Grid">
        <div className="Cell100" style={{ textAlign: 'center' }}>
          <Logo
            width="40"
            height="40"
            style={{ marginRight: '10px', display: 'inline' }}
          />
          <h1 style={{ display: 'inline', verticalAlign: 'super' }}>
            Filecoin Wallet
          </h1>
        </div>

        <ConnectLedger />
      </div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#161f27',
            color: '#dbdbdb',
          },
        }}
      />
    </main>
  )
}
