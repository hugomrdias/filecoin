import { WalletAdapterHd } from '../../src/adapters/hd.js'
import { MNEMONIC, connectorTests } from './base.js'

/** @type {import('../../src/types.js').WalletAdapter | undefined} */
let wallet
connectorTests({
  walletName: 'HD mainnet',
  // biome-ignore lint/suspicious/useAwait: <explanation>
  beforeEachHook: async () => {
    wallet = WalletAdapterHd.fromMnemonic({
      network: 'mainnet',
      signatureType: 'SECP256K1',
      mnemonic: MNEMONIC,
      index: 0,
    })
    return wallet
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
  // biome-ignore lint/suspicious/useAwait: <explanation>
  beforeEachHook: async () => {
    wallet = WalletAdapterHd.fromMnemonic({
      network: 'testnet',
      signatureType: 'SECP256K1',
      mnemonic: MNEMONIC,
      index: 0,
    })
    return wallet
  },
  afterEachHook: async () => {
    if (wallet) {
      await wallet.disconnect()
    }
    wallet = undefined
  },
})
