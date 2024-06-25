import assert from 'assert'
import { base16, base64pad } from 'iso-base/rfc4648'
import {
  AddressDelegated,
  AddressId,
  from,
  fromBytes,
  fromContractDestination,
  fromEthAddress,
  fromPublicKey,
  fromString,
  isAddress,
  isEthAddress,
  isIdMaskAddress,
  toEthAddress,
} from '../src/address.js'

const secp = [
  [
    'f17uoq6tp427uzv7fztkbsnn64iwotfrristwpryy',
    '01fd1d0f4dfcd7e99afcb99a8326b7dc459d32c628',
  ],
  [
    'f1xcbgdhkgkwht3hrrnui3jdopeejsoatkzmoltqy',
    '01b882619d46558f3d9e316d11b48dcf211327026a',
  ],
  [
    'f1xtwapqc6nh4si2hcwpr3656iotzmlwumogqbuaa',
    '01bcec07c05e69f92468e2b3e3bf77c874f2c5da8c',
  ],
  [
    'f1wbxhu3ypkuo6eyp6hjx6davuelxaxrvwb2kuwva',
    '01b06e7a6f0f551de261fe3a6fe182b422ee0bc6b6',
  ],
  [
    'f12fiakbhe2gwd5cnmrenekasyn6v5tnaxaqizq6a',
    '01d1500504e4d1ac3e89ac891a4502586fabd9b417',
  ],
]

const actor = [
  [
    'f24vg6ut43yw2h2jqydgbg2xq7x6f4kub3bg6as6i',
    '02e54dea4f9bc5b47d261819826d5e1fbf8bc5503b',
  ],
  [
    'f25nml2cfbljvn4goqtclhifepvfnicv6g7mfmmvq',
    '02eb58bd08a15a6ade19d0989674148fa95a8157c6',
  ],
  [
    'f2nuqrg7vuysaue2pistjjnt3fadsdzvyuatqtfei',
    '026d21137eb4c4814269e894d296cf6500e43cd714',
  ],
  [
    'f24dd4ox4c2vpf5vk5wkadgyyn6qtuvgcpxxon64a',
    '02e0c7c75f82d55e5ed55db28033630df4274a984f',
  ],
  [
    'f2gfvuyh7v2sx3patm5k23wdzmhyhtmqctasbr23y',
    '02316b4c1ff5d4afb7826ceab5bb0f2c3e0f364053',
  ],
]

const bls = [
  [
    'f3vvmn62lofvhjd2ugzca6sof2j2ubwok6cj4xxbfzz4yuxfkgobpihhd2thlanmsh3w2ptld2gqkn2jvlss4a',
    '03ad58df696e2d4e91ea86c881e938ba4ea81b395e12797b84b9cf314b9546705e839c7a99d606b247ddb4f9ac7a3414dd',
  ],
  [
    'f3wmuu6crofhqmm3v4enos73okk2l366ck6yc4owxwbdtkmpk42ohkqxfitcpa57pjdcftql4tojda2poeruwa',
    '03b3294f0a2e29e0c66ebc235d2fedca5697bf784af605c75af608e6a63d5cd38ea85ca8989e0efde9188b382f9372460d',
  ],
  [
    'f3s2q2hzhkpiknjgmf4zq3ejab2rh62qbndueslmsdzervrhapxr7dftie4kpnpdiv2n6tvkr743ndhrsw6d3a',
    '0396a1a3e4ea7a14d49985e661b22401d44fed402d1d0925b243c923589c0fbc7e32cd04e29ed78d15d37d3aaa3fe6da33',
  ],
]

const delegated = [
  [
    'f410feot7hrogmplrcupubsdbbqarkdewmb4vkwc5qqq',
    '040a23a7f3c5c663d71151f40c8610c01150c9660795',
  ],
  [
    'f410fek3n2tlnqghc5phd2lqatisj7d57j2lf5hgcs2q',
    '040a22b6dd4d6d818e2ebce3d2e009a249f8fbf4e965',
  ],
  [
    'f410firjm446mw5tqabmlxjp4sxwshdhrff7adk4srea',
    '040a4452ce73ccb76700058bba5fc95ed238cf1297e0',
  ],
]

const id = [
  ['f00', '0000'],
  ['f0150', '009601'],
  ['f01024', '008008'],
  ['f01729', '00c10d'],
  ['f018446744073709551615', '00ffffffffffffffffff01'],
]

describe('address', () => {
  for (const [address, expected] of id) {
    it(`id vectors ${address} fromString`, () => {
      const a = fromString(address)
      assert.ok(isAddress(a))
      assert.equal(a.protocol, 0)
      assert.strictEqual(base16.encode(a.toBytes()).toLowerCase(), expected)
    })

    it(`id vectors ${address} fromBytes`, () => {
      const a = fromBytes(base16.decode(expected.toUpperCase()), 'mainnet')

      assert.strictEqual(a.toString(), address)
    })

    it(`id vectors ${address} from`, () => {
      const a = from(base16.decode(expected.toUpperCase()), 'mainnet')
      assert.strictEqual(a.toString(), address)
      assert.ok(isAddress(a))

      const b = from(address)
      assert.equal(a.protocol, 0)
      assert.strictEqual(base16.encode(b.toBytes()).toLowerCase(), expected)
    })
  }

  for (const [address, expected] of bls) {
    it(`bls vectors ${address} fromString`, () => {
      const a = fromString(address)
      assert.ok(isAddress(a))
      assert.equal(a.protocol, 3)
      assert.strictEqual(base16.encode(a.toBytes()).toLowerCase(), expected)
    })

    it(`bls vectors ${address} fromBytes`, () => {
      const a = fromBytes(base16.decode(expected.toUpperCase()), 'mainnet')

      assert.strictEqual(a.toString(), address)
    })

    it(`bls vectors ${address} from`, () => {
      const a = from(base16.decode(expected.toUpperCase()), 'mainnet')
      assert.strictEqual(a.toString(), address)
      assert.ok(isAddress(a))

      const b = from(address)
      assert.equal(a.protocol, 3)
      assert.strictEqual(base16.encode(b.toBytes()).toLowerCase(), expected)
    })
  }

  for (const [address, expected] of actor) {
    it(`actor vectors ${address} fromString`, () => {
      const a = fromString(address)
      assert.ok(isAddress(a))
      assert.equal(a.protocol, 2)
      assert.strictEqual(base16.encode(a.toBytes()).toLowerCase(), expected)
    })

    it(`actor vectors ${address} fromBytes`, () => {
      const a = fromBytes(base16.decode(expected.toUpperCase()), 'mainnet')

      assert.strictEqual(a.toString(), address)
    })

    it(`actor vectors ${address} from`, () => {
      const a = from(base16.decode(expected.toUpperCase()), 'mainnet')
      assert.strictEqual(a.toString(), address)
      assert.ok(isAddress(a))

      const b = from(address)
      assert.equal(a.protocol, 2)
      assert.strictEqual(base16.encode(b.toBytes()).toLowerCase(), expected)
    })
  }

  for (const [address, expected] of secp) {
    it(`sepc256k1 vectors ${address} fromString`, () => {
      const a = fromString(address)
      assert.ok(isAddress(a))
      assert.equal(a.protocol, 1)
      assert.strictEqual(base16.encode(a.toBytes()).toLowerCase(), expected)
    })

    it(`sepc256k1 vectors ${address} fromBytes`, () => {
      const a = fromBytes(base16.decode(expected.toUpperCase()), 'mainnet')

      assert.strictEqual(a.toString(), address)
    })

    it(`sepc256k1 vectors ${address} from`, () => {
      const a = from(base16.decode(expected.toUpperCase()), 'mainnet')
      assert.strictEqual(a.toString(), address)
      assert.ok(isAddress(a))

      const b = from(address)
      assert.equal(a.protocol, 1)
      assert.strictEqual(base16.encode(b.toBytes()).toLowerCase(), expected)
    })
  }

  it('from public key', () => {
    const a = fromPublicKey(
      base64pad.decode(
        'BIgvf8Me7SAb7jpWOH2B5PwmhiaCz1R5BZKraZ2heQuFPk3DACNkUwP3ffqTYcE7Y1SjZeqrF8J0uraaYQjBtSs='
      ),
      'mainnet',
      'SECP256K1'
    )

    assert.strictEqual(
      a.toString(),
      'f1eyo4qsoe7kjpehccfhhxlvd6wfo6mbi3ikfiheq'
    )
  })

  for (const [address, expected] of delegated) {
    it(`delegated vectors ${address}`, () => {
      const a = fromString(address)

      assert.ok(isAddress(a))
      assert.equal(a.protocol, 4)
      assert.strictEqual(base16.encode(a.toBytes()).toLowerCase(), expected)
    })

    it(`delegated vectors ${address} fromBytes`, () => {
      const a = fromBytes(base16.decode(expected.toUpperCase()), 'mainnet')

      assert.strictEqual(a.toString(), address)
    })
  }

  it('should convert from f1 address to contract destination and back on testnet', () => {
    const t1 = fromString('t1wbxhu3ypkuo6eyp6hjx6davuelxaxrvwb2kuwva')
    const contractDestination = t1.toContractDestination()
    const t1FromContractDestination = fromContractDestination(
      contractDestination,
      'testnet'
    )

    assert.strictEqual(t1.toString(), t1FromContractDestination.toString())
  })

  it('should convert from f1 address to contract destination and back', () => {
    const f1 = fromString('f1wbxhu3ypkuo6eyp6hjx6davuelxaxrvwb2kuwva')
    const contractDestination = f1.toContractDestination()
    const f1FromContractDestination = fromContractDestination(
      contractDestination,
      'mainnet'
    )

    assert.strictEqual(f1.toString(), f1FromContractDestination.toString())
  })
})

describe('address ethereum', () => {
  it('is eth address', () => {
    assert.ok(isEthAddress('0xb959b6fF9ED21CfD15EEC2BEC15d1C5b87df7F42'))
    assert.ok(isEthAddress('0xa0cf798816d4b9b9866b5330eea46a18382f251e'))
    assert.ok(isEthAddress('0x52963EF50e27e06D72D59fcB4F3c2a687BE3cfEf'))
    // Id addresses
    assert.ok(isEthAddress('0xff00000000000000000000000000000000000001'))
    assert.ok(isEthAddress('0xff00000000000000000000000000000000000064'))
    assert.ok(isEthAddress('0xff000000000000000000000000000000000013e0'))

    assert.ok(isEthAddress('x') === false)
    assert.ok(isEthAddress('0xa') === false)
    // invalid checksum
    assert.ok(
      isEthAddress('0xa5cc3c03994db5b0d9a5eEdD10Cabab0813678ac') === false
    )
    assert.ok(
      isEthAddress('0xa5cc3c03994db5b0d9a5eEdD10Cabab0813678az') === false
    )
    assert.ok(
      isEthAddress('0xa5cc3c03994db5b0d9a5eEdD10Cabab0813678aff') === false
    )
    assert.ok(
      isEthAddress('a5cc3c03994db5b0d9a5eEdD10Cabab0813678ac') === false
    )
    assert.ok(
      isEthAddress('0x8Ba1f109551bD432803012645Ac136ddd64DBa72') === false
    )
    // icap
    assert.ok(isEthAddress('XE65GB6LDNXYOFTX0NSV3FUWKOWIXAMJK36') === false)
  })

  it('is ID mask eth address', () => {
    assert.ok(isIdMaskAddress('0xff00000000000000000000000000000000000001'))
    assert.ok(isIdMaskAddress('0xff00000000000000000000000000000000000064'))
    assert.ok(isIdMaskAddress('0xff000000000000000000000000000000000013e0'))

    assert.ok(
      isIdMaskAddress('0x52963EF50e27e06D72D59fcB4F3c2a687BE3cfEf') === false
    )
  })

  it('should convert eth to f4 address', () => {
    const f4 = fromEthAddress(
      '0xd388ab098ed3e84c0d808776440b48f685198498',
      'testnet'
    )

    assert.strictEqual(
      f4.toString(),
      't410f2oekwcmo2pueydmaq53eic2i62crtbeyuzx2gmy'
    )
    assert.equal(f4.protocol, 4)
    assert.ok(f4 instanceof AddressDelegated)
  })

  it('should convert from eth  to f0 address', () => {
    const address = '0xff000000000000000000000000000000000013e0'
    const id = fromEthAddress(address, 'mainnet')

    assert.ok(id instanceof AddressId)
    assert.ok(id.id === 5088n)

    assert.ok(
      fromEthAddress('0xff00000000000000000000000000000000000001', 'testnet')
        .id === 1n
    )

    assert.ok(
      fromEthAddress('0xff00000000000000000000000000000000000064', 'testnet')
        .id === 100n
    )
  })

  it('should convert from eth address with "from" ', () => {
    const f4 = from('0xd388ab098ed3e84c0d808776440b48f685198498', 'testnet')

    assert.strictEqual(
      f4.toString(),
      't410f2oekwcmo2pueydmaq53eic2i62crtbeyuzx2gmy'
    )
  })

  it('should convert from f0 to eth address', () => {
    assert.strictEqual(
      AddressId.fromString('f01').toEthAddress(),
      '0xff00000000000000000000000000000000000001'
    )
    assert.strictEqual(
      AddressId.fromString('f0100').toEthAddress(),
      '0xff00000000000000000000000000000000000064'
    )
    assert.strictEqual(
      AddressId.fromString('f05088').toEthAddress(),
      '0xff000000000000000000000000000000000013e0'
    )

    assert.strictEqual(
      AddressId.fromString('f01024').toEthAddress(),
      '0xfF00000000000000000000000000000000000400'
    )

    assert.strictEqual(
      toEthAddress(fromString('f01024')),
      '0xfF00000000000000000000000000000000000400'
    )
  })

  it('should convert from f4 to eth address', () => {
    assert.equal(
      AddressDelegated.fromString(
        'f410f2oekwcmo2pueydmaq53eic2i62crtbeyuzx2gmy'
      ).toEthAddress(),
      '0xd388aB098ed3E84c0D808776440B48F685198498'
    )

    assert.equal(
      AddressDelegated.fromString(
        't410fkkld55ioe7qg24wvt7fu6pbknb56ht7pt4zamxa'
      ).toEthAddress(),
      '0x52963EF50e27e06D72D59fcB4F3c2a687BE3cfEf'
    )

    assert.equal(
      toEthAddress(fromString('t410fkkld55ioe7qg24wvt7fu6pbknb56ht7pt4zamxa')),
      '0x52963EF50e27e06D72D59fcB4F3c2a687BE3cfEf'
    )
  })

  it('should fail to convert f411 to eth address', () => {
    assert.throws(
      () => {
        AddressDelegated.fromString(
          'f411fkkld55ioe7qg24wvt7fu6pbknb56ht7pt4zamxa'
        ).toEthAddress()
      },
      {
        message:
          'Invalid namespace: 11. Only Ethereum Address Manager (EAM) is supported.',
      }
    )
  })

  it('should fail convert from f1 to eth address', () => {
    const f1 = fromString('f1wbxhu3ypkuo6eyp6hjx6davuelxaxrvwb2kuwva')

    assert.throws(() => toEthAddress(f1), {
      message:
        'Invalid protocol indicator: 1. Only Delegated ad ID Addresses are supported.',
    })
  })
})
