import { version } from 'os'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import { listen } from '@ledgerhq/logs'
import { clsx } from 'clsx'
import { hex } from 'iso-base/rfc4648'
import { utf8 } from 'iso-base/utf8'
import { AddressSecp256k1 } from 'iso-filecoin/address'
import { parseDerivationPath } from 'iso-filecoin/utils'

/**
 *
 * @returns {Promise<HID>}
 */
function getHID() {
  return window.navigator.hid
}

const returnCodes = {
  6400: 'Execution Error',
  6982: 'Empty buffer',
  6983: 'Output buffer too small',
  6986: 'Command not allowed',
  '6d00': 'INS not supported',
  '6e00': 'CLA not supported',
  '6f00': 'Unknown',
  9000: 'Success',
}

/**
 *
 * @param {import('@ledgerhq/hw-transport').default} transport
 */
async function getVersion(transport) {
  const out = await transport.send(0x06, 0x00, 0, 0)
  const errorCodeData = out.subarray(-2)
  const code = hex.encode(errorCodeData)
  if (code !== '9000') {
    throw new Error(returnCodes[hex.encode(errorCodeData)] || 'Unknown')
  }

  return out.subarray(1, 4).join('.')
}

/**
 *
 * @param {import('@ledgerhq/hw-transport').default} transport
 * @param {string} path
 */
async function getAddress(transport, path, showOnDevice = false) {
  const pathComponents = parseDerivationPath(path)
  const buf = new ArrayBuffer(20)
  const view = new DataView(buf)
  view.setUint32(0, 0x80000000 + pathComponents.purpose, true)
  view.setUint32(4, 0x80000000 + pathComponents.coinType, true)
  view.setUint32(8, 0x80000000 + pathComponents.account, true)
  view.setUint32(12, pathComponents.change, true)
  view.setUint32(16, pathComponents.addressIndex, true)

  const data = new Uint8Array(view.buffer, view.byteOffset, view.byteLength)
  const out = await transport.send(
    0x06,
    0x01,
    showOnDevice ? 0x01 : 0x00,
    0x00,
    data
  )

  const errorCodeData = out.subarray(-2)
  const code = hex.encode(errorCodeData)
  if (code !== '9000') {
    throw new Error(returnCodes[hex.encode(errorCodeData)] || 'Unknown')
  }
  const byteLen = out.subarray(65, 66)
  const addressStringLength = out.subarray(66 + byteLen[0], 66 + byteLen[0] + 1)
  const addressString = out.subarray(
    66 + byteLen[0] + 1,
    66 + byteLen[0] + 1 + addressStringLength[0]
  )

  return addressString.toString()
}

/**
 * Connect to the network.
 */
export default function ConnectLedger() {
  async function onConnect() {
    console.log('connect', await TransportWebHID.isSupported())

    // Filter on devices with the Nintendo Switch Joy-Con USB Vendor/Product IDs.
    const filters = [
      {
        vendorId: 0x2c97, // Nintendo Co., Ltd
      },
      {
        productId: 0x0004,
      },
    ]

    // Prompt user to select a Joy-Con device.
    const [device] = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
    })

    // const devices = await TransportWebHID.list()
    // console.log('devices', devices)

    // const transport = await TransportWebHID.create()

    // const version = await getVersion(transport)

    // const address = await getAddress(transport, "m/44'/1'/0'/0/0", true)

    // console.log(
    //   '🚀 ~ file: connect-ledger.jsx:142 ~ onConnect ~ address:',
    //   address
    // )

    // transport.on('disconnect', () => {
    //   console.log('disconnect')
    // })
    // listen((log) => console.log('LOG', log))
  }
  return (
    <div class={clsx('Cell100', 'Box', 'u-AlignCenter')}>
      <button type="button" data-testid="connect-snap" onClick={onConnect}>
        Connect Ledger
      </button>
    </div>
  )
}
