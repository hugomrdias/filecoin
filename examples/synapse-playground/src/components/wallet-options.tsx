import { useStore } from '@nanostores/react'
// import { type EIP1193Provider, getOrInstallSnap } from 'filsnap-adapter'
import { useEffect, useState } from 'react'
import { type Connector, useConnect } from 'wagmi'
import { filecoin, filecoinCalibration } from 'wagmi/chains'
import { store } from '@/lib/store'
import { Button } from './ui/button'

// const SNAP_ID = 'npm:filsnap' //'local:http://localhost:8080'
// const SNAP_ID = 'local:http://localhost:8080'

export function WalletOptions() {
  const { connectors, connect } = useConnect()
  const { network } = useStore(store, { keys: ['network'] })

  return connectors.map((connector) => {
    if (connector.id === 'injected') {
      return null
    }
    return (
      <WalletOption
        connector={connector}
        key={connector.uid}
        onClick={() => {
          // const provider = (await connector.getProvider()) as EIP1193Provider
          // if (provider.isMetaMask) {
          //   await getOrInstallSnap(provider, SNAP_ID, '*')
          // }
          connect({
            connector,
            chainId:
              network === 'mainnet' ? filecoin.id : filecoinCalibration.id,
          })
        }}
      />
    )
  })
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    ;(async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return (
    <Button disabled={!ready} onClick={onClick} type="button">
      {connector.name}
    </Button>
  )
}
