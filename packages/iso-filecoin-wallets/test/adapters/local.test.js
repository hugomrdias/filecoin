import { base64pad } from 'iso-base/rfc4648'
import { WalletAdapterLocal } from '../../src/local.js'
import { PRIVATE_KEY, connectorTests } from './base.js'

/** @type {import('../../src/types.js').WalletAdapter | undefined} */
let wallet
connectorTests({
  walletName: 'Local mainnet',
  network: 'mainnet',
  // biome-ignore lint/suspicious/useAwait: <explanation>
  beforeEachHook: async () => {
    wallet = new WalletAdapterLocal({
      signatureType: 'SECP256K1',
      privateKey: base64pad.decode(PRIVATE_KEY),
    })
    return { wallet }
  },
  afterEachHook: async () => {
    if (wallet) {
      await wallet.disconnect()
    }
    wallet = undefined
  },
})

connectorTests({
  walletName: 'Local testnet',
  network: 'testnet',
  // biome-ignore lint/suspicious/useAwait: <explanation>
  beforeEachHook: async () => {
    wallet = new WalletAdapterLocal({
      signatureType: 'SECP256K1',
      privateKey: base64pad.decode(PRIVATE_KEY),
    })
    return { wallet }
  },
  afterEachHook: async () => {
    if (wallet) {
      await wallet.disconnect()
    }
    wallet = undefined
  },
})
