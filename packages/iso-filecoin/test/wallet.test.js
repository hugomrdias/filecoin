import assert from 'assert'
import { base64pad, hex } from 'iso-base/rfc4648'
import { Message } from '../src/message.js'
import { RPC } from '../src/rpc.js'
import { Signature } from '../src/signature.js'
import * as Wallet from '../src/wallet.js'

const mnemonic =
  'raw include ecology social turtle still perfect trip dance food welcome aunt patient very toss very program estate diet portion city camera loop guess'

describe('wallet', () => {
  it('should generate 24 word mnemonic', () => {
    assert.strictEqual(Wallet.generateMnemonic().split(' ').length, 24)
  })

  it('should generate seed from mnemonic', () => {
    const seed = Wallet.mnemonicToSeed(Wallet.generateMnemonic())
    assert.strictEqual(toString.call(seed).slice(8, -1), 'Uint8Array')
  })

  it('should generate create account from mnemonic', () => {
    const account = Wallet.accountFromMnemonic(
      mnemonic,
      'SECP256K1',
      "m/44'/461'/0'/0/0"
    )

    assert.strictEqual(
      account.address.toString(),
      'f17levgrkmq7jeloew44ixqokvl4qdozvmacidp7i'
    )
  })

  it('should generate create account from seed', () => {
    const seed = Wallet.mnemonicToSeed(mnemonic)
    const account = Wallet.accountFromSeed(
      seed,
      'SECP256K1',
      "m/44'/461'/0'/0/0"
    )

    assert.strictEqual(
      account.address.toString(),
      'f17levgrkmq7jeloew44ixqokvl4qdozvmacidp7i'
    )
  })

  it('should generate create account from mnemonic metamask', () => {
    const seed = Wallet.mnemonicToSeed(
      'already turtle birth enroll since owner keep patch skirt drift any dinner'
    )
    const account = Wallet.accountFromSeed(
      seed,
      'SECP256K1',
      "m/44'/461'/0'/0/0"
    )

    assert.strictEqual(
      account.address.toString(),
      'f1jbnosztqwadgh4smvsnojdvwjgqxsmtzy5n5imi'
    )
  })

  it('should generate account from little endian lotus private key', () => {
    const accountBls = Wallet.accountFromPrivateKey(
      base64pad
        .decode('LeQGu4KtIHGw1+XC54BnL6QGvCM3+aESKUQYrydwTlY=')
        .reverse(),
      'BLS',
      'mainnet'
    )

    assert.strictEqual(
      accountBls.address.toString(),
      'f3uwh4pjnqr6f2xljil55isug7nkmijouu6nf3n7z6xjk4fibqsp3mbotipdii6eufmskkqnmp2j65m2o25qnq'
    )
  })

  it('should sign bytes with bls', () => {
    const accountBls = Wallet.accountFromPrivateKey(
      Wallet.lotusBlsPrivateKeyToBytes(
        'LeQGu4KtIHGw1+XC54BnL6QGvCM3+aESKUQYrydwTlY='
      ),
      'BLS',
      'mainnet'
    )

    const signature = Wallet.sign(
      accountBls.privateKey,
      'BLS',
      hex.decode('68656c6c6f')
    )

    const lotusSig = Signature.fromLotusHex(
      '02b509cf25efa1035691a06ab40db59830e4e271dc144b6add2dc812365afc637e5f0710424d4d697a3cf9c6ea30c681ac077bd8ac0f3cf149336df246428644db722ec8d13a04c1dd4512ebd1c42723eafa14382f9dd77387c3f5c5f1d7ff0775'
    )

    assert.deepStrictEqual(signature.data, lotusSig.data)

    assert.ok(
      Wallet.verify(lotusSig, hex.decode('68656c6c6f'), accountBls.pubKey)
    )
  })

  it('should sign/verify bytes with secp', () => {
    const accountSecp = Wallet.accountFromPrivateKey(
      base64pad.decode('LzjsZEXCy6tDWAxcFiu76IRQwHkohWvsVK1T+2Q5NfY='),
      'SECP256K1',
      'mainnet'
    )

    const signature = Wallet.sign(
      accountSecp.privateKey,
      'SECP256K1',
      hex.decode('68656c6c6f')
    )

    const lotusSig = Signature.fromLotusHex(
      '015322ea74a2985bb1a91be635bad133b4505b566b7aed97276ece9a26bab344340e0b602cf68ca9259766d81ad9d4bfe15a0d5efa2398cab1c18b1f160dd8682600'
    )

    assert.deepStrictEqual(signature.data, lotusSig.data)

    assert.ok(
      Wallet.verify(lotusSig, hex.decode('68656c6c6f'), accountSecp.pubKey)
    )
  })

  it('should sign message with bls', async function () {
    this.timeout(10_000)
    const type = 'BLS'
    const API = 'https://api.calibration.node.glif.io'
    const account = Wallet.accountFromPrivateKey(
      base64pad
        .decode('LeQGu4KtIHGw1+XC54BnL6QGvCM3+aESKUQYrydwTlY=')
        .reverse(),
      type,
      'testnet'
    )

    const account2 = Wallet.accountFromMnemonic(
      mnemonic,
      type,
      "m/44'/1'/0'/0/0"
    )

    const rpc = new RPC({ api: API, network: 'testnet' })

    const message = await new Message({
      from: account.address.toString(),
      to: account2.address.toString(),
      value: '1',
    }).prepare(rpc)

    const balance = await rpc.pushMessage({
      msg: message,
      signature: Wallet.signMessage(account.privateKey, type, message),
    })
    if (balance.error) {
      return assert.fail(balance.error.message)
    }
    assert.ok(typeof balance.result['/'] === 'string')
  })

  it('should sign', () => {
    const account = Wallet.accountFromPrivateKey(
      base64pad.decode('tI1wF8uJseC1QdNj3CbpBAVC8G9/pfgtSYt4yXlJ+UY='),
      'SECP256K1',
      'mainnet'
    )

    assert.deepEqual(
      base64pad.encode(account.pubKey),
      'BLW+ZCazhsVWEuuwxt5DEcSyXnmpJGxFBizYf/pSiBKlXz9qgW9d4yN0Vm6WJ+D5G9c7WxWAO+mBL3RpjVEYR6E='
    )
    assert.deepEqual(
      account.address.toString(),
      'f17dyptywvmnldq2fsm6j226txnltf4aiwsi3vlka'
    )

    const message = Message.fromLotus({
      Version: 0,
      To: 'f1ypi542zmmgaltijzw4byonei5c267ev5iif2liy',
      From: 'f17dyptywvmnldq2fsm6j226txnltf4aiwsi3vlka',
      Value: '87316',
      Params: '',
      GasFeeCap: '42908',
      GasPremium: '28871',
      GasLimit: 20_982,
      Nonce: 20_101,
      Method: 65_360,
    })

    assert.deepEqual(
      hex.encode(message.serialize()),
      '8a005501c3d1de6b2c6180b9a139b703873488e8b5ef92bd5501f8f0f9e2d563563868b26793ad7a776ae65e0116194e8544000155141951f64300a79c430070c719ff5040'
    )

    const sig = Wallet.signMessage(account.privateKey, 'SECP256K1', message)

    assert.deepEqual(
      base64pad.encode(sig.data),
      'jzg+/H2mHXezbUBAtQAYbj3MrwVn92mXFRw6FX2NRK1+Zfha2vSP23GVEkJHHXxyAd+IggjzG2L440fIJbdfSgA='
    )
  })
})
