import assert from 'assert'
import { utf8 } from 'iso-base/utf8'
import pDefer from 'p-defer'
import { Message } from '../../src/message.js'

export const PRIVATE_KEY = 'Un+VV/HZZ1YtfC1i4LULcvko0dV7F6CbQmnhSuUJRPU='
export const MNEMONIC =
  'raw include ecology social turtle still perfect trip dance food welcome aunt patient very toss very program estate diet portion city camera loop guess'

/**
 * @typedef {Object} WalletFixtures
 * @property {string} address0 - Address 0
 * @property {string} address1 - Address 1
 * @property {string} sig - Signature hex
 * @property {string} sigMessage - Signature hex
 */

/**
 * @typedef {Object} WalletFixturesNetworks
 * @property {WalletFixtures} mainnet
 * @property {WalletFixtures} testnet
 */

/**
 * @type {Record<string, WalletFixturesNetworks>}
 */
export const fixtures = {
  Local: {
    mainnet: {
      address0: 'f1nzc6j2th7dhgg3mgcr3525arsx4zm5linh5bsli',
      address1: '',
      sig: '0136cdb1e893441945dde58a4b857c79833ee6f46872abfeca228516e752726e8c54fc8d64a7cab21d9e15371723ccf656df0234dbbce66e277c87df57959fc83501',
      sigMessage:
        '01e77594aed1f0fb1574c38bfeace2fddb18bdbbe22628d8e1d3f12e5d889da1e65ade19dc58f320a2db370687da7875409776ac45dd780bb92cc7f8caa290814a01',
    },
    testnet: {
      address0: 't1nzc6j2th7dhgg3mgcr3525arsx4zm5linh5bsli',
      address1: '',
      sig: '0136cdb1e893441945dde58a4b857c79833ee6f46872abfeca228516e752726e8c54fc8d64a7cab21d9e15371723ccf656df0234dbbce66e277c87df57959fc83501',
      sigMessage:
        '01e77594aed1f0fb1574c38bfeace2fddb18bdbbe22628d8e1d3f12e5d889da1e65ade19dc58f320a2db370687da7875409776ac45dd780bb92cc7f8caa290814a01',
    },
  },
  HD: {
    mainnet: {
      address0: 'f17levgrkmq7jeloew44ixqokvl4qdozvmacidp7i',
      address1: 'f1wkozgbb4o5foj2kratibzmdxmf5w2h3t7vmddey',
      sig: '01f1e5508a2b41a6641eb0cce07a9154856b8ceabcd7757c27eae275cfccdacdbe1e7ac007b59000761fc8dad1ffc7c57a30b67d98612e6808718d294c4002865b01',
      sigMessage:
        '01983967215a079a6224eddee19dba727726ba9ff81ff3387174bfe904f60bdccb2189579e5334b8c8127421e161fc28b903b0e7972ea0d8c2ac962120785bb35701',
    },
    testnet: {
      address0: 't1xciji452owqgqmyuphjbv3ubfkhpsvvxrcnfgpq',
      address1: 't17upukr6cmmrqetufujmjags7ksum77yheeqgraq',
      sig: '01b582ab0293f6426561fff732ea145c8fd5e241b390f5cd7bcd42a98a04956c4b33f606e6ac723c3c201e2bcc2d6e2634dc45f6f10c24be843bb2d75f9aa4981900',
      sigMessage:
        '01bddf08762c8aa21c542ee701d222e196ab23d71eaaa286d71d1ca947a008dd99742310fb458e7b6e2fa6dd84d7d7453ffa492db9d20156c43f23f920c5ca04aa00',
    },
  },
  Ledger: {
    mainnet: {
      address0: 'f17levgrkmq7jeloew44ixqokvl4qdozvmacidp7i',
      address1: 'f1wkozgbb4o5foj2kratibzmdxmf5w2h3t7vmddey',
      // ledger sign raw is different from HD
      sig: '014e1d0a18fe3c52f9b25600f847b781abfbf8819c222bb3facaf6cf1ecf6f3e8a116305b95b1a81bb070213b9f34dcbebc12906da5a32a1e8a221e22353b6948501',
      sigMessage:
        '01983967215a079a6224eddee19dba727726ba9ff81ff3387174bfe904f60bdccb2189579e5334b8c8127421e161fc28b903b0e7972ea0d8c2ac962120785bb35701',
    },
    testnet: {
      address0: 't1xciji452owqgqmyuphjbv3ubfkhpsvvxrcnfgpq',
      address1: 't17upukr6cmmrqetufujmjags7ksum77yheeqgraq',
      sig: '0x',
      sigMessage:
        '01bddf08762c8aa21c542ee701d222e196ab23d71eaaa286d71d1ca947a008dd99742310fb458e7b6e2fa6dd84d7d7453ffa492db9d20156c43f23f920c5ca04aa00',
    },
  },
}

/**
 * Base tests for wallet adapters
 *
 * @param {Object} options - Options
 * @param {string} options.walletName - Wallet name
 * @param {(() => any) } [options.afterHook] - After hook
 * @param {(() => any) } [options.beforeHook] - Before hook
 * @param {()=> Promise<void>} options.afterEachHook - After each hook
 * @param {()=> Promise<import('../../src/types.js').WalletAdapter>} options.beforeEachHook - Before each hook
 */
export function connectorTests({
  walletName,
  afterHook,
  beforeHook,
  afterEachHook,
  beforeEachHook,
}) {
  describe(`Wallet Adapter ${walletName}`, () => {
    /** @type {import('@zondax/zemu').default} */
    let sim
    /** @type {import('../../src/types.js').WalletAdapter} */
    let wallet
    beforeEach(async () => {
      if (beforeEachHook) {
        wallet = await beforeEachHook()
      }
    })
    afterEach(async () => {
      if (afterEachHook) {
        await afterEachHook()
      }
    })
    after(async () => {
      if (afterHook) {
        await afterHook()
      }
    })

    before(async () => {
      if (beforeHook) {
        const r = await beforeHook()
        sim = r.sim
      }
    })

    it('should fail to get account ', () => {
      assert.equal(wallet.account, undefined, 'Account should be undefined')
    })

    it('should connect and return account ', async () => {
      await wallet.connect()
      const account = wallet.account

      assert.strictEqual(account?.type, 'SECP256K1')
      assert.strictEqual(
        account.address.toString(),
        fixtures[wallet.name][`${wallet.network}`].address0
      )
    })

    it('should connect and trigger event ', async () => {
      const deferred = pDefer()
      /**
       *
       * @param {CustomEvent<import('../../src/types.js').IAccount>} e
       */
      function onConnect(e) {
        assert.strictEqual(wallet.connected, true)
        assert.strictEqual(wallet.connecting, true)
        assert.strictEqual(e.detail.type, 'SECP256K1')
        assert.strictEqual(
          e.detail.address.toString(),
          fixtures[wallet.name][`${wallet.network}`].address0
        )
        deferred.resolve()
      }
      wallet.addEventListener('connect', onConnect, { once: true })
      await wallet.connect()
      assert.strictEqual(
        wallet.connecting,
        false,
        'Connecting should be false after connect'
      )
      assert.strictEqual(wallet.connected, true, 'Connected should be true')
      await deferred.promise
    })

    it('should disconnect and trigger event ', async () => {
      const deferred = pDefer()
      wallet.on(
        'disconnect',
        () => {
          assert.strictEqual(wallet.connected, false)
          assert.strictEqual(wallet.connecting, false)
          assert.strictEqual(wallet.account, undefined)
          deferred.resolve()
        },
        { once: true }
      )
      await wallet.connect()
      await wallet.disconnect()
      assert.strictEqual(wallet.connected, false)
      assert.strictEqual(wallet.connecting, false)
      assert.strictEqual(wallet.account, undefined)
      await deferred.promise
    })

    it('should change network disconnected', async () => {
      assert.strictEqual(wallet.connected, false)
      assert.strictEqual(wallet.connecting, false)
      assert.strictEqual(wallet.account, undefined)

      const network = wallet.network === 'mainnet' ? 'testnet' : 'mainnet'

      await wallet.changeNetwork(network)
      assert.strictEqual(wallet.network, network)
      assert.strictEqual(wallet.connected, false)
    })

    it('should change network connect', async () => {
      const deferred = pDefer()
      assert.strictEqual(wallet.connected, false)
      await wallet.connect()
      assert.strictEqual(wallet.connected, true)
      const network = wallet.network === 'mainnet' ? 'testnet' : 'mainnet'

      function onNetworkChanged(
        /** @type {CustomEvent<{ network: string }>} */ event
      ) {
        assert.strictEqual(network, event.detail.network)
        deferred.resolve()
      }
      wallet.addEventListener('networkChanged', onNetworkChanged, {
        once: true,
      })
      await wallet.changeNetwork(network)
      assert.strictEqual(wallet.network, network)
      assert.strictEqual(
        wallet.account?.address.toString(),
        fixtures[wallet.name][`${network}`].address0
      )
      await deferred.promise
    })
    it('should derive account', async () => {
      await wallet.connect()
      assert.strictEqual(wallet.connected, true)

      if (wallet.name === 'Local') {
        await assert.rejects(wallet.deriveAccount(1), {
          message: 'Local wallet is not a HD wallet',
        })
      } else {
        const deferred = pDefer()
        wallet.on(
          'accountChanged',
          (
            /** @type {CustomEvent<import('../../src/types.js').IAccount>} */ e
          ) => {
            assert.strictEqual(e.detail.type, 'SECP256K1')
            assert.strictEqual(
              e.detail.address.toString(),
              fixtures[wallet.name][`${wallet.network}`].address1
            )
            deferred.resolve()
          },
          { once: true }
        )
        await wallet.deriveAccount(1)

        assert.strictEqual(
          wallet.account?.address.toString(),
          fixtures[wallet.name][`${wallet.network}`].address1
        )
        await deferred.promise
      }
    })

    it('should sign', async function () {
      this.timeout(10_000)
      await wallet.connect()
      assert.strictEqual(wallet.connected, true)

      const sigPromise = wallet.sign(utf8.decode('hello world'))
      if (sim) {
        await sim.waitUntilScreenIsNot(sim.getMainMenuSnapshot())
        await sim.compareSnapshotsAndApprove(
          './test',
          `adapter_sign_raw-${walletName}`
        )
      }
      const sig = await sigPromise
      assert.strictEqual(
        sig.toLotusHex(),
        fixtures[wallet.name][`${wallet.network}`].sig
      )
    })
    it('should sign message', async function () {
      this.timeout(10_000)
      await wallet.connect()
      assert.ok(wallet.account)
      const message = new Message({
        from: wallet.account.address.toString(),
        to: 't1sfizuhpgjqyl4yjydlebncvecf3q2cmeeathzwi',
        value: '1',
        // params: base64pad.encode('hello world'),
      })

      const sigPromise = wallet.signMessage(message)
      if (sim) {
        await sim.waitUntilScreenIsNot(sim.getMainMenuSnapshot())
        await sim.compareSnapshotsAndApprove(
          './test',
          `adapter_sign_message-${walletName}`
        )
      }
      const sig = await sigPromise

      assert.strictEqual(
        sig.toLotusHex(),
        fixtures[wallet.name][`${wallet.network}`].sigMessage
      )
    })
  })
}
