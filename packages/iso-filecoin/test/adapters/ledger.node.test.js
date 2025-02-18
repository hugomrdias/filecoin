import assert from 'assert'
import _Zemu from '@zondax/zemu'
import pDefer from 'p-defer'
import { WalletAdapterLedger } from '../../src/adapters/ledger.js'
import { DEFAULT_OPTIONS, models } from '../setup.js'
import { MNEMONIC, connectorTests } from './base.js'
// @ts-ignore

const Zemu = /** @type {typeof _Zemu} */ (
  // @ts-ignore
  _Zemu.default
)

for (const model of models) {
  /** @type {_Zemu} */
  let sim
  /** @type {import('../../src/types.js').WalletAdapter | undefined} */
  let wallet
  connectorTests({
    walletName: `LEDGER ${model.name}`,
    beforeHook: async () => {
      sim = new Zemu(model.path)
      await sim.start({
        ...DEFAULT_OPTIONS,
        model: model.name,
        custom: `-s "${MNEMONIC}"`,
      })
      return { sim }
    },
    afterHook: async () => {
      await sim.close()
    },
    beforeEachHook: async () => {
      await sim.toggleExpertMode()

      const transport = sim.getTransport()
      return new WalletAdapterLedger({
        transport: {
          create: async () => transport,
          isSupported: async () => true,
        },
        network: 'mainnet',
        signatureType: 'SECP256K1',
        index: 0,
      })
    },
    afterEachHook: async () => {
      if (wallet) {
        await wallet.disconnect()
      }
      wallet = undefined
    },
  })

  describe('Ledger wallet adapter tests', function () {
    this.timeout(10_000)
    it.skip('should disconnect when transport is closed', async () => {
      const deferred = pDefer()
      sim = new Zemu(model.path)
      await sim.start({
        ...DEFAULT_OPTIONS,
        model: model.name,
        custom: `-s "${MNEMONIC}"`,
      })
      const transport = sim.getTransport()
      const wallet = new WalletAdapterLedger({
        transport: {
          create: async () => transport,
          isSupported: async () => true,
        },
        network: 'mainnet',
        signatureType: 'SECP256K1',
        index: 0,
      })

      wallet.on(
        'disconnect',
        () => {
          console.log('HELLOOOO')
          assert.strictEqual(wallet.connected, false)
          assert.strictEqual(wallet.connecting, false)
          assert.strictEqual(wallet.account, undefined)
          deferred.resolve()
        },
        { once: true }
      )
      await wallet.connect()

      // await sim.waitUntilScreenIsNot(sim.getMainMenuSnapshot())
      await sim.navigate('./test', `adapter_disconnect-${model.name}`, [5])
      // await sim.clickBoth()
      await sim.snapshot('test.png')

      transport.on('disconnect', () => {
        console.log('Disconnect')
      })
      await transport.close()
      await sim.close()
      console.log('snapshot')
      await deferred.promise
    })
  })
}
