import { base64pad } from 'iso-base/rfc4648'
import { WalletAdapterRaw } from '../../src/local.js'
import { connectorTests, PRIVATE_KEY } from './base.js'

/** @type {import('../../src/types.js').WalletAdapter | undefined} */
let wallet
connectorTests({
  walletName: 'Local mainnet',
  network: 'mainnet',
  // biome-ignore lint/suspicious/useAwait: test
  beforeEachHook: async () => {
    wallet = new WalletAdapterRaw({
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
  // biome-ignore lint/suspicious/useAwait: test
  beforeEachHook: async () => {
    wallet = new WalletAdapterRaw({
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
