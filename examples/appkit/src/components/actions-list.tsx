import type { AppKitNetwork } from '@reown/appkit-common'
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useDisconnect,
} from '@reown/appkit/react'
import { filecoinNative, filecoinNativeCalibration } from 'iso-filecoin/chains'

export const ActionButtonList = () => {
  const { disconnect } = useDisconnect() // AppKit hook to disconnect
  const { open } = useAppKit() // AppKit hook to open the modal
  const { switchNetwork } = useAppKitNetwork() // AppKithook to switch network
  const { isConnected } = useAppKitAccount() // AppKit hook to get the address and check if the user is connected

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
        <button
          type="button"
          onClick={() => switchNetwork(filecoinNative as AppKitNetwork)}
        >
          Change to Mainnet
        </button>
        <button
          type="button"
          onClick={() =>
            switchNetwork(filecoinNativeCalibration as AppKitNetwork)
          }
        >
          Change to Calibration
        </button>
        <button type="button" onClick={handleDisconnect}>
          Disconnect
        </button>
      </div>
    )
  )
}
