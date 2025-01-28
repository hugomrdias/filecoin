import assert from 'assert'
import _Zemu from '@zondax/zemu'
import { base64pad } from 'iso-base/rfc4648'
import { WalletHd } from '../src/wallets/hd.js'
import { WalletLedger } from '../src/wallets/ledger.js'
import { WalletLocal } from '../src/wallets/local.js'
import { DEFAULT_OPTIONS, models } from './setup.js'
// @ts-ignore

const Zemu = /** @type {typeof _Zemu} */ (
  // @ts-ignore
  _Zemu.default
)

const fixtures = {
  RAW: {
    privateKey: base64pad.decode(
      'Un+VV/HZZ1YtfC1i4LULcvko0dV7F6CbQmnhSuUJRPU='
    ),
    mainnetAddress: 'f1nzc6j2th7dhgg3mgcr3525arsx4zm5linh5bsli',
    testnetAddress: 't1nzc6j2th7dhgg3mgcr3525arsx4zm5linh5bsli',
  },
  HD: {
    mnemonic:
      'raw include ecology social turtle still perfect trip dance food welcome aunt patient very toss very program estate diet portion city camera loop guess',
    mainnetAddress: 'f17levgrkmq7jeloew44ixqokvl4qdozvmacidp7i',
    testnetAddress: 't1xciji452owqgqmyuphjbv3ubfkhpsvvxrcnfgpq',
  },
  FILSNAP: {
    mainnetAddress: 'f17levgrkmq7jeloew44ixqokvl4qdozvmacidp7i',
    testnetAddress: 't1xciji452owqgqmyuphjbv3ubfkhpsvvxrcnfgpq',
  },
  LEDGER: {
    mainnetAddress: 'f17levgrkmq7jeloew44ixqokvl4qdozvmacidp7i',
    testnetAddress: 't1xciji452owqgqmyuphjbv3ubfkhpsvvxrcnfgpq',
  },
}

/**
 * @param {string} walletName
 * @param {import('../src/types.js').IWallet} wallet
 * @param {(() => any) | undefined} [afterHook]
 * @param {(() => any) | undefined} [beforeHook]
 */
export function connectorTests(walletName, wallet, afterHook, beforeHook) {
  describe(`base tests for ${walletName}`, () => {
    after(async () => {
      if (afterHook) {
        await afterHook()
      }
    })

    before(async () => {
      if (beforeHook) {
        wallet = await beforeHook()
      }
    })

    it('should fail to get account ', () => {
      assert.throws(() => wallet.account(), {
        message: 'Client is not connected',
      })
    })

    it('should connect and return account ', async () => {
      const account = await wallet.connect()

      assert.strictEqual(account.type, 'SECP256K1')
      assert.strictEqual(
        account.address.toString(),
        fixtures[wallet.type].mainnetAddress
      )
    })

    it('should connect and trigger event ', (done) => {
      /**
       *
       * @param {import('../src/types.js').WalletEvents['connect']} e
       */
      function onConnect(e) {
        assert.strictEqual(e.detail.type, 'SECP256K1')
        assert.strictEqual(
          e.detail.address.toString(),
          fixtures[wallet.type].mainnetAddress
        )

        wallet.removeEventListener('connect', onConnect)
        done()
      }
      wallet.addEventListener('connect', onConnect)
      wallet.connect()
    })

    it('should change network', async () => {
      let account = await wallet.connect()
      account = await wallet.changeNetwork('testnet')
      assert.strictEqual(account.type, 'SECP256K1')
      assert.strictEqual(
        account.address.toString(),
        fixtures[wallet.type].testnetAddress
      )
    })
  })
}

connectorTests(
  'RAW',
  new WalletLocal({
    network: 'mainnet',
    signatureType: 'SECP256K1',
    privateKey: fixtures.RAW.privateKey,
  })
)

connectorTests(
  'HD',
  WalletHd.fromMnemonic({
    network: 'mainnet',
    signatureType: 'SECP256K1',
    mnemonic: fixtures.HD.mnemonic,
    index: 0,
  })
)

for (const model of models) {
  /** @type {_Zemu} */
  let sim
  connectorTests(
    `LEDGER ${model.name}`,
    undefined,
    () => sim.close(),
    async () => {
      sim = new Zemu(model.path)
      await sim.start({
        ...DEFAULT_OPTIONS,
        model: model.name,
        custom: `-s "${fixtures.HD.mnemonic}"`,
      })
      return new WalletLedger({
        transport: sim.getTransport(),
        network: 'mainnet',
        signatureType: 'SECP256K1',
        index: 0,
      })
    }
  )
}
