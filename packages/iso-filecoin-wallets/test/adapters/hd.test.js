import { WalletAdapterHd } from '../../src/hd.js'
import { connectorTests, MNEMONIC } from './base.js'

/** @type {import('../../src/types.js').WalletAdapter | undefined} */
let wallet
connectorTests({
  walletName: 'HD mainnet',
  network: 'mainnet',
  // biome-ignore lint/suspicious/useAwait: todo
  beforeEachHook: async () => {
    wallet = WalletAdapterHd.fromMnemonic({
      signatureType: 'SECP256K1',
      mnemonic: MNEMONIC,
      index: 0,
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
  walletName: 'HD testnet',
  network: 'testnet',
  // biome-ignore lint/suspicious/useAwait: todo
  beforeEachHook: async () => {
    wallet = WalletAdapterHd.fromMnemonic({
      signatureType: 'SECP256K1',
      mnemonic: MNEMONIC,
      index: 0,
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
