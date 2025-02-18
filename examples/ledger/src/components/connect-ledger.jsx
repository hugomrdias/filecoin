import { useAddresses, useBalance, useWallet } from 'iso-filecoin-react'
import { useEffect, useLayoutEffect, useState } from 'react'
import ExplorerLink from './explorer-link.jsx'
import Modal from './modal.js'
import { toast } from './toast.jsx'

/**
 * Connect to the network.
 */
export default function ConnectLedger() {
  const {
    connected,
    wallets,
    deriveAccount,
    account,
    wallet,
    select,
    loading,
    connecting,
    disconnecting,
    disconnect,
    network,
    changeNetwork,
  } = useWallet()

  const { data } = useBalance()
  const { address0x, addressId } = useAddresses()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (connected) {
      setIsOpen(false)
    }
  }, [connected])

  useLayoutEffect(() => {
    if (address0x.isLoadingError) {
      toast.error(address0x.error)
    }
    if (addressId.isLoadingError) {
      toast.error(addressId.error)
    }
  }, [
    address0x.isLoadingError,
    address0x.error,
    addressId.isLoadingError,
    addressId.error,
  ])

  return (
    <div className="Cell100 Box Grid">
      <div className="Cell50">
        <h3>Network</h3>
        <select
          name="network"
          id="network"
          className="u-FullWidth"
          disabled={connecting}
          onChange={(event) => {
            const value = /** @type {import('iso-filecoin/types').Network} */ (
              event.target.value
            )
            changeNetwork(value)
          }}
          value={network}
        >
          <option value="testnet">Testnet</option>
          <option value="mainnet">Mainnet</option>
        </select>
      </div>
      <div
        className="Cell50"
        style={{
          alignContent: 'center',
          textAlign: 'center',
        }}
      >
        {!connected && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            disabled={connected || connecting}
          >
            {connecting ? 'Connecting...' : 'Connect'}
          </button>
        )}
        {connected && (
          <button
            type="button"
            onClick={() => disconnect()}
            disabled={disconnecting || connecting || !connected}
          >
            Disconnect
          </button>
        )}
      </div>

      {connected && (
        <div className="Cell100">
          <h3>Wallet</h3>
          <p>{wallet?.name}</p>
          <p>{wallet?.url}</p>
          <br />
          <h3>Account</h3>
          <code>{account?.path}</code>
          <ExplorerLink
            address={account?.address.toString()}
            chain="filecoin"
          />
          <ExplorerLink address={addressId.data?.toString()} chain="id" />
          <ExplorerLink address={address0x.data?.toString()} chain="ethereum" />
          <div>
            <b>
              {data?.toFIL().toFormat({ decimalPlaces: 4, suffix: ' FIL' }) ??
                ' '}
            </b>
          </div>
          <br />
          <hr />
          <br />

          <button
            type="button"
            onClick={() => deriveAccount(1)}
            disabled={disconnecting || connecting || !connected}
          >
            Change to Account 1
          </button>
          <button
            type="button"
            onClick={() => deriveAccount(0)}
            disabled={disconnecting || connecting || !connected}
          >
            Change to Account 0
          </button>
        </div>
      )}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h4>Connect a wallet</h4>
        {wallets.map((wallet) => (
          <button
            key={wallet.name}
            title={
              wallet.support === 'NotDetected' && wallet.name === 'Filsnap'
                ? 'Install Metamask'
                : wallet.name
            }
            type="button"
            className="modal-button"
            onClick={() => select(wallet.name)}
            disabled={
              connecting ||
              connected ||
              wallet.support === 'NotDetected' ||
              loading
            }
          >
            <img
              src={wallet?.icon}
              alt={wallet?.name}
              style={{
                display: 'inline',
                width: '24px',
                verticalAlign: 'bottom',
                marginRight: '5px',
              }}
            />
            <span>{wallet.name}</span>
          </button>
        ))}
      </Modal>
    </div>
  )
}
