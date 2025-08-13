import { useAccount, useDisconnect } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div>
      {address && <div>{address}</div>}
      <button onClick={() => disconnect()} type="button">
        Disconnect
      </button>
    </div>
  )
}
