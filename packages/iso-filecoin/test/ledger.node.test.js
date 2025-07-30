import _Zemu, { isTouchDevice } from '@zondax/zemu'
import assert from 'assert'
import { base64pad } from 'iso-base/rfc4648'
import { utf8 } from 'iso-base/utf8'
import { concat } from 'iso-base/utils'
import { EIP191_PREFIX, LedgerFilecoin, verifyRaw } from '../src/ledger.js'
import { Message } from '../src/message.js'
import { Signature } from '../src/signature.js'
import { lotusCid } from '../src/utils.js'
import * as Wallet from '../src/wallet.js'
import { DEFAULT_OPTIONS, models } from './setup.js'

// @ts-ignore
const Zemu = /** @type {typeof _Zemu} */ (
  // @ts-ignore
  _Zemu.default
)

const account = Wallet.accountFromMnemonic(
  'already turtle birth enroll since owner keep patch skirt drift any dinner',
  'SECP256K1',
  "m/44'/1'/0'/0/0"
)

const FILECOIN_APP_VERSION = '2.2.0'

describe('ledger', function () {
  this.timeout(20000)
  this.retries(3)

  for (const model of models) {
    it(`should get version from ${model.name}`, async () => {
      const sim = new Zemu(model.path)

      try {
        await sim.start({ ...DEFAULT_OPTIONS, model: model.name })
        const app = new LedgerFilecoin(sim.getTransport())
        const version = await app.getVersion()

        assert.strictEqual(FILECOIN_APP_VERSION, version)
      } finally {
        await sim.close()
      }
    })
  }

  for (const model of models) {
    it(`should get address from ${model.name}`, async () => {
      const sim = new Zemu(model.path)

      try {
        await sim.start({ ...DEFAULT_OPTIONS, model: model.name })
        const app = new LedgerFilecoin(sim.getTransport())
        const { address, publicKey } = await app.getAddress(account.path, false)

        assert.strictEqual(account.address.toString(), address.toString())
        assert.deepStrictEqual(account.publicKey, publicKey)
      } finally {
        await sim.close()
      }
    })
  }

  for (const model of models) {
    it(`should get address and show in device from ${model.name}`, async () => {
      const sim = new Zemu(model.path)

      try {
        await sim.start({
          ...DEFAULT_OPTIONS,
          model: model.name,
          approveKeyword: isTouchDevice(model.name) ? 'Confirm' : '',
          approveAction: 19,
        })
        const app = new LedgerFilecoin(sim.getTransport())
        const addressRequest = app.getAddress(account.path, true)

        await sim.waitUntilScreenIsNot(sim.getMainMenuSnapshot())
        await sim.compareSnapshotsAndApprove(
          './test',
          `show_address-${model.name}`
        )

        const { address } = await addressRequest
        assert.strictEqual(account.address.toString(), address.toString())
      } finally {
        await sim.close()
      }
    })
  }

  for (const model of models) {
    it(`should sign tx from ${model.name}`, async () => {
      const sim = new Zemu(model.path)

      try {
        await sim.start({ ...DEFAULT_OPTIONS, model: model.name })
        const app = new LedgerFilecoin(sim.getTransport())
        const message = new Message({
          from: account.address.toString(),
          to: 't1sfizuhpgjqyl4yjydlebncvecf3q2cmeeathzwi',
          value: '1',
          params: base64pad.encode('hello world'),
        })

        const sig = Wallet.signMessage(account.privateKey, 'SECP256K1', message)
        const ledgerSigRequest = app.sign(account.path, message.serialize())
        await sim.waitUntilScreenIsNot(sim.getMainMenuSnapshot())
        await sim.compareSnapshotsAndApprove('./test', `sign_tx-${model.name}`)

        const ledgerSig = await ledgerSigRequest

        assert.deepStrictEqual(sig.data, ledgerSig)
      } finally {
        await sim.close()
      }
    })
  }

  for (const model of models) {
    it(`should sign raw bytes from ${model.name}`, async () => {
      const sim = new Zemu(model.path)

      try {
        await sim.start({ ...DEFAULT_OPTIONS, model: model.name })
        await sim.toggleBlindSigning()

        const app = new LedgerFilecoin(sim.getTransport())

        const data = Buffer.from('ab11c', 'hex')
        const prefixed = concat([utf8.decode(EIP191_PREFIX), data])
        const cid = lotusCid(prefixed)

        const sig = Wallet.sign(account.privateKey, 'SECP256K1', cid)

        const rawSigRequest = app.signRaw(account.path, data)

        await sim.waitUntilScreenIsNot(sim.getMainMenuSnapshot())
        await sim.compareSnapshotsAndApprove(
          './test',
          `sign_raw-${model.name}`,
          true,
          0,
          1500,
          true
        )

        const ledgerSig = await rawSigRequest

        assert.deepStrictEqual(sig.data, ledgerSig)
        assert.ok(verifyRaw(ledgerSig, data, account.publicKey))
      } finally {
        await sim.close()
      }
    })
  }

  for (const model of models) {
    it.skip(`should personal sign raw bytes from ${model.name}`, async () => {
      const sim = new Zemu(model.path)

      try {
        await sim.start({ ...DEFAULT_OPTIONS, model: model.name })
        // await sim.toggleBlindSigning()

        const app = new LedgerFilecoin(sim.getTransport())

        const data = utf8.decode('hello world')
        const sig = Wallet.personalSign(account.privateKey, 'SECP256K1', data)

        const rawSigRequest = app.personalSign(account.path, data)

        await sim.waitUntilScreenIsNot(sim.getMainMenuSnapshot())
        await sim.compareSnapshotsAndApprove(
          './test',
          `personal_sign_raw-${model.name}`,
          true,
          0,
          1500,
          false
        )

        const ledgerSig = await rawSigRequest

        assert.deepStrictEqual(sig.data, ledgerSig)
        assert.ok(
          Wallet.personalVerify(
            new Signature({
              type: 'SECP256K1',
              data: ledgerSig,
            }),
            data,
            account.publicKey
          )
        )
      } finally {
        await sim.close()
      }
    })
  }
})
