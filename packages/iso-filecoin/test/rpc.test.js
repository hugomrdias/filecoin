import assert from 'assert'
import { ZodError } from 'zod'
import { Address } from '../src/index.js'
import { Message } from '../src/message.js'
import { RPC, ValidationRpcError } from '../src/rpc.js'
import * as Wallet from '../src/wallet.js'

const API = 'https://api.calibration.node.glif.io'

describe('lotus rpc', function () {
  this.retries(3)
  this.timeout(10_000)
  it('version', async () => {
    const rpc = new RPC({ api: API })

    const version = await rpc.version()

    if (version.error) {
      return assert.fail(version.error.message)
    }

    assert(version.result.Version)
    assert(version.result.APIVersion)
    assert(version.result.BlockDelay)
  })

  it('networkName', async () => {
    const rpc = new RPC({ api: API })

    const version = await rpc.networkName()
    if (version.error) {
      return assert.fail(version.error.message)
    }

    assert.equal(version.result, 'calibrationnet')
  })

  it('chainHead', async () => {
    const rpc = new RPC({ api: API })

    const head = await rpc.chainHead()
    if (head.error) {
      return assert.fail(head.error.message)
    }

    assert.ok(head.result)
  })

  it('getTipSetByHeight', async () => {
    const rpc = new RPC({ api: API })

    const head = await rpc.chainHead()
    if (head.error) {
      return assert.fail(head.error.message)
    }

    const tipSet = await rpc.getTipSetByHeight({
      height: head.result.Height,
      tipSetKey: head.result.Cids,
    })

    if (tipSet.error) {
      return assert.fail(tipSet.error.message)
    }

    assert.ok(tipSet.result)
  })

  it('getTipSet', async () => {
    const rpc = new RPC({ api: API })

    const head = await rpc.lookBackTipSet(30)

    if (head.error) {
      return assert.fail(head.error.message)
    }

    assert.ok(head.result)
  })

  it('nonce', async () => {
    const rpc = new RPC({ api: API, network: 'testnet' })

    const version = await rpc.nonce('t1pc2apytmdas3sn5ylwhfa32jfpx7ez7ykieelna')
    if (version.error) {
      return assert.fail(version.error.message)
    }

    assert.ok(Number.isInteger(version.result))
  })

  it('gas estimate', async () => {
    const rpc = new RPC({ api: API, network: 'testnet' })

    const nonce = await rpc.nonce('t1pc2apytmdas3sn5ylwhfa32jfpx7ez7ykieelna')
    if (nonce.error) {
      return assert.fail(nonce.error.message)
    }

    const msg = new Message({
      from: 't1pc2apytmdas3sn5ylwhfa32jfpx7ez7ykieelna',
      to: 't1sfizuhpgjqyl4yjydlebncvecf3q2cmeeathzwi',
      nonce: nonce.result,
      value: '100000000000000000',
    })

    const estimate = await rpc.gasEstimate({ msg })
    if (estimate.error) {
      return assert.fail(estimate.error.message)
    }

    assert.equal(Message.fromLotus(estimate.result).value, msg.value)
  })

  it('gas estimate to delegated address', async () => {
    const rpc = new RPC({ api: API, network: 'testnet' })

    const nonce = await rpc.nonce('t1pc2apytmdas3sn5ylwhfa32jfpx7ez7ykieelna')
    if (nonce.error) {
      return assert.fail(nonce.error.message)
    }

    const msg = new Message({
      from: 't1pc2apytmdas3sn5ylwhfa32jfpx7ez7ykieelna',
      to: 't410fpzfl2y5hzayuzqunhcbqgrzdkpmij4uswh5uumi',
      nonce: nonce.result,
      value: '100000000000000000',
    })

    const estimate = await rpc.gasEstimate({ msg })
    if (estimate.error) {
      return assert.fail(estimate.error.message)
    }

    assert.equal(Message.fromLotus(estimate.result).value, msg.value)
  })

  it('gas estimate to 0x address', async () => {
    const rpc = new RPC({ api: API, network: 'testnet' })

    const nonce = await rpc.nonce('t1pc2apytmdas3sn5ylwhfa32jfpx7ez7ykieelna')
    if (nonce.error) {
      return assert.fail(nonce.error.message)
    }

    const msg = new Message({
      from: 't1pc2apytmdas3sn5ylwhfa32jfpx7ez7ykieelna',
      to: Address.from(
        '0x7e4ABd63A7C8314Cc28D388303472353D884f292',
        'testnet'
      ).toString(),
      nonce: nonce.result,
      value: '100000000000000000',
    })

    const estimate = await rpc.gasEstimate({ msg })
    if (estimate.error) {
      return assert.fail(estimate.error.message)
    }

    assert.equal(Message.fromLotus(estimate.result).value, msg.value)
  })

  it('balance', async () => {
    const rpc = new RPC({ api: API, network: 'testnet' })

    const balance = await rpc.balance(
      't1jzly7yqqff5fignjddktuo2con2pjoz5yajemli'
    )
    if (balance.error) {
      return assert.fail(balance.error.message)
    }

    assert.ok(typeof balance.result === 'string')
  })

  it('balance from delegated address', async () => {
    const rpc = new RPC({ api: API, network: 'testnet' })

    const balance = await rpc.balance(
      't410fpzfl2y5hzayuzqunhcbqgrzdkpmij4uswh5uumi'
    )
    if (balance.error) {
      return assert.fail(balance.error.message)
    }

    assert.ok(typeof balance.result === 'string')
    assert.ok(BigInt(balance.result) > 0n)
  })

  it('balance from 0x address', async () => {
    const rpc = new RPC({ api: API, network: 'testnet' })

    const balance = await rpc.balance(
      Address.from(
        '0x7e4ABd63A7C8314Cc28D388303472353D884f292',
        'testnet'
      ).toString()
    )
    if (balance.error) {
      return assert.fail(balance.error.message)
    }

    assert.ok(typeof balance.result === 'string')
    assert.ok(BigInt(balance.result) > 0n)
  })

  it('send message', async () => {
    const rpc = new RPC({ api: API, network: 'testnet' })
    const account = Wallet.accountFromMnemonic(
      'already turtle birth enroll since owner keep patch skirt drift any dinner',
      'SECP256K1',
      "m/44'/1'/0'/0/0",
      'testnet'
    )
    const message = await new Message({
      to: 't1sfizuhpgjqyl4yjydlebncvecf3q2cmeeathzwi',
      from: account.address.toString(),
      value: '1',
    }).prepare(rpc)

    const balance = await rpc.pushMessage({
      msg: message,
      signature: {
        type: 'SECP256K1',
        data: Wallet.signMessage(account.privateKey, 'SECP256K1', message).data,
      },
    })
    if (balance.error) {
      return assert.fail(balance.error.message)
    }

    assert.ok(typeof balance.result['/'] === 'string')
  })

  it('send message to 0x', async () => {
    const rpc = new RPC({ api: API, network: 'testnet' })
    const account = Wallet.accountFromMnemonic(
      'already turtle birth enroll since owner keep patch skirt drift any dinner',
      'SECP256K1',
      "m/44'/1'/0'/0/0",
      'testnet'
    )
    const message = await new Message({
      to: Address.from(
        '0x7e4ABd63A7C8314Cc28D388303472353D884f292',
        'testnet'
      ).toString(),
      from: account.address.toString(),
      value: '1',
    }).prepare(rpc)

    const balance = await rpc.pushMessage({
      msg: message,
      signature: {
        type: 'SECP256K1',
        data: Wallet.signMessage(account.privateKey, 'SECP256K1', message).data,
      },
    })
    if (balance.error) {
      return assert.fail(balance.error.message)
    }

    assert.ok(typeof balance.result['/'] === 'string')
  })

  it('stateLookupID from f1 unsafe', async () => {
    const rpc = new RPC({ api: API, network: 'testnet' })

    const balance = await rpc.stateLookupID({
      address: 't1jzly7yqqff5fignjddktuo2con2pjoz5yajemli',
    })
    if (balance.error) {
      return assert.fail(balance.error.message)
    }

    assert.strictEqual(balance.result, 't023576')
  })

  it('getIDAddress from f1 safe ', async () => {
    const rpc = new RPC({ api: API, network: 'testnet' })

    const balance = await rpc.getIDAddress({
      address: 't1jzly7yqqff5fignjddktuo2con2pjoz5yajemli',
    })
    if (balance.error) {
      return assert.fail(balance.error.message)
    }

    assert.strictEqual(balance.result, 't023576')
  })

  it('should fail getIDAddress from new account', async () => {
    const rpc = new RPC({ api: API, network: 'testnet' })
    const account = Wallet.create('SECP256K1', 'testnet')

    const balance = await rpc.getIDAddress({
      address: account.address.toString(),
      safety: 'latest',
    })
    if (balance.result) {
      return assert.fail('should fail to get id address from new account')
    }

    return assert.equal(balance.error?.message, 'actor not found')
  })

  it('get ID from f1 safe', async () => {
    const rpc = new RPC({ api: API, network: 'testnet' })

    const balance = await rpc.filecoinAddressToEthAddress({
      address: 't1jzly7yqqff5fignjddktuo2con2pjoz5yajemli',
    })
    if (balance.error) {
      return assert.fail(balance.error.message)
    }

    assert.strictEqual(
      Address.fromEthAddress(balance.result, 'testnet').toString(),
      't023576'
    )
  })

  it('get f4 from ID', async () => {
    const rpc = new RPC({ api: API, network: 'testnet' })

    const idAddress = await rpc.stateLookupID({
      address: 't410fpzfl2y5hzayuzqunhcbqgrzdkpmij4uswh5uumi',
    })
    if (idAddress.error) {
      return assert.fail(idAddress.error.message)
    }

    assert.strictEqual(idAddress.result, 't025575')

    const fAddress = await rpc.stateAccountKey({
      address: idAddress.result,
    })
    if (fAddress.error) {
      return assert.fail(fAddress.error.message)
    }
    assert.strictEqual(
      fAddress.result,
      't410fpzfl2y5hzayuzqunhcbqgrzdkpmij4uswh5uumi'
    )
  })
})

describe('lotus rpc errors', () => {
  it('timeout', async () => {
    const rpc = new RPC({ api: API }, { timeout: 100 })
    const version = await rpc.version()

    assert.ok(version.error)
    assert.ok(version.error.message.includes('Request timed out after 100ms'))
  })

  it('timeout on method', async () => {
    const rpc = new RPC({ api: API }, { timeout: 100 })
    const version = await rpc.version({ timeout: 10 })

    assert.ok(version.error)
    assert.ok(version.error.message.includes('Request timed out after 10ms'))
  })

  it('timeout default', async () => {
    const rpc = new RPC({ api: API })
    const version = await rpc.version()

    assert.ok(version.result)
  })

  it('aborted', async () => {
    const rpc = new RPC({ api: API }, { signal: AbortSignal.abort() })
    const version = await rpc.version()
    assert.ok(version.error)
    assert.ok(version.error.message.includes('Request aborted'))
  })

  it('abort', async () => {
    const controller = new AbortController()
    const rpc = new RPC({ api: API })
    const version = rpc.version({ signal: controller.signal })
    controller.abort()

    const rsp = await version
    assert.ok(rsp.error)

    assert.ok(rsp.error.message.includes('Request aborted'))
  })

  it('validate network error', async () => {
    const rpc = new RPC({ api: API, network: 'mainnet' })
    const nonce = await rpc.balance('t1pc2apytmdas3sn5ylwhfa32jfpx7ez7ykieelna')

    if (nonce.error) {
      assert.equal(
        nonce.error.message,
        'Address t1pc2apytmdas3sn5ylwhfa32jfpx7ez7ykieelna does not belong to mainnet'
      )
    } else {
      assert.fail('should fail')
    }
  })

  it('zod validation error', async () => {
    const rpc = new RPC({ api: API, network: 'testnet' })

    const nonce = await rpc.nonce('t1pc2apytmdas3sn5ylwhfa32jfpx7ez7ykieelna')
    if (nonce.error) {
      return assert.fail(nonce.error.message)
    }

    const msg = {
      from: 't1pc2apytmdas3sn5ylwhfa32jfpx7ez7ykieelna',
      to: 't1sfizuhpgjqyl4yjydlebncvecf3q2cmeeathzwi',
      nonce: nonce.result,
      value: 111,
    }

    // @ts-expect-error - testing zod validation
    const estimate = await rpc.gasEstimate({ msg })

    if (estimate.error) {
      assert.ok(estimate.error instanceof ValidationRpcError)
      assert.ok(estimate.error.cause instanceof ZodError)
      assert.match(estimate.error.message, /Invalid input: expected string/)
      return
    }
    assert.fail('should fail')
  })
})
