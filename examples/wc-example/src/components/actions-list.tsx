import type { ChainNamespace } from '@reown/appkit-common'
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
  useDisconnect,
} from '@reown/appkit/react'
import { useEffect } from 'react'
import { type Address, parseGwei } from 'viem'
import {
  useBalance,
  useEstimateGas,
  useSendTransaction,
  useSignMessage,
} from 'wagmi'

// test transaction
const TEST_TX = {
  to: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045' as Address, // vitalik address
  value: parseGwei('0.0001'),
}

interface ActionButtonListProps {
  sendHash: (hash: `0x${string}`) => void
  sendSignMsg: (hash: string) => void
  sendBalance: (balance: string) => void
}

export const ActionButtonList = ({
  sendHash,
  sendSignMsg,
  sendBalance,
}: ActionButtonListProps) => {
  const { disconnect } = useDisconnect() // AppKit hook to disconnect
  const { open } = useAppKit() // AppKit hook to open the modal
  const { switchNetwork } = useAppKitNetwork() // AppKithook to switch network
  const { address, isConnected } = useAppKitAccount() // AppKit hook to get the address and check if the user is connected

  const { data: gas } = useEstimateGas({ ...TEST_TX }) // Wagmi hook to estimate gas
  const { data: hash, sendTransaction } = useSendTransaction() // Wagmi hook to send a transaction
  const { signMessageAsync } = useSignMessage() // Wagmi hook to sign a message
  const { refetch } = useBalance({
    address: address as Address,
  }) // Wagmi hook to get the balance

  const { walletProvider, walletProviderType } = useAppKitProvider(
    'fil' as ChainNamespace
  )

  console.log(
    '🚀 ~ walletProvider, walletProviderType:',
    walletProvider,
    walletProviderType
  )

  useEffect(() => {
    if (hash) {
      sendHash(hash)
    }
  }, [hash, sendHash])

  // function to send a tx
  const handleSendTx = () => {
    try {
      sendTransaction({
        ...TEST_TX,
        gas, // Add the gas to the transaction
      })
    } catch (err) {
      console.log('Error sending transaction:', err)
    }
  }

  // function to sing a msg
  const handleSignMsg = async () => {
    const msg = 'Hello Reown AppKit!' // message to sign
    const sig = await signMessageAsync({
      message: msg,
      account: address as Address,
    })
    sendSignMsg(sig)
  }

  // function to get the balance
  const handleGetBalance = async () => {
    const balance = await refetch()

    console.log('🚀 ~ handleGetBalance ~ balance:', balance)

    sendBalance(
      `${balance?.data?.value.toString()} ${balance?.data?.symbol.toString()}`
    )
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
    } catch (error) {
      console.error('Failed to disconnect:', error)
    }
  }

  return (
    isConnected && (
      <div>
        <button type="button" onClick={() => open()}>
          Open
        </button>
        <button type="button" onClick={handleDisconnect}>
          Disconnect
        </button>
        <button type="button" onClick={() => switchNetwork(networks[1])}>
          Switch
        </button>
        <button type="button" onClick={handleSignMsg}>
          Sign msg
        </button>
        <button type="button" onClick={handleSendTx}>
          Send tx
        </button>
        <button type="button" onClick={handleGetBalance}>
          Get Balance
        </button>
      </div>
    )
  )
}
