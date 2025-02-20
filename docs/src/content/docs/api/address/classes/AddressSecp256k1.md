---
editUrl: false
next: true
prev: true
title: "AddressSecp256k1"
---

Defined in: [packages/iso-filecoin/src/address.js:601](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L601)

Secp256k1 address f1..

## See

https://spec.filecoin.io/appendix/address/#section-appendix.address.protocol-1-libsecpk1-elliptic-curve-public-keys

## Implements

## Extends

- [`Address`](/api/address/classes/address/)

## Constructors

### new AddressSecp256k1()

```ts
new AddressSecp256k1(payload: Uint8Array<ArrayBufferLike>, network: Network): AddressSecp256k1
```

Defined in: [packages/iso-filecoin/src/address.js:607](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L607)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `payload` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |  |
| `network` | [`Network`](/api/adapters/filsnap/type-aliases/network/) |  |

#### Returns

[`AddressSecp256k1`](/api/address/classes/addresssecp256k1/)

#### Overrides

[`Address`](/api/address/classes/address/).[`constructor`](/api/address/classes/address/#constructors)

## Methods

### checksum()

```ts
checksum(): Uint8Array<ArrayBufferLike>
```

Defined in: [packages/iso-filecoin/src/address.js:337](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L337)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

#### Inherited from

[`Address`](/api/address/classes/address/).[`checksum`](/api/address/classes/address/#checksum)

***

### to0x()

```ts
to0x(options: AddressRpcSafetyOptions): Promise<string>
```

Defined in: [packages/iso-filecoin/src/address.js:399](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L399)

Converts any address to a 0x address, either id masked address or eth address depending on the address type.
Delegated addresses convert to eth address and f1, f2, f3 convert to id masked address
and f0 depends on the underline address type

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`AddressRpcSafetyOptions`](/api/address/interfaces/addressrpcsafetyoptions/) |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

#### Inherited from

[`Address`](/api/address/classes/address/).[`to0x`](/api/address/classes/address/#to0x)

***

### toBytes()

```ts
toBytes(): Uint8Array<ArrayBuffer>
```

Defined in: [packages/iso-filecoin/src/address.js:329](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L329)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)\>

#### Inherited from

[`Address`](/api/address/classes/address/).[`toBytes`](/api/address/classes/address/#tobytes)

***

### toContractDestination()

```ts
toContractDestination(): `0x${string}`
```

Defined in: [packages/iso-filecoin/src/address.js:333](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L333)

#### Returns

`` `0x${string}` ``

#### Inherited from

[`Address`](/api/address/classes/address/).[`toContractDestination`](/api/address/classes/address/#tocontractdestination)

***

### toIdAddress()

```ts
toIdAddress(options: AddressRpcSafetyOptions): Promise<AddressId>
```

Defined in: [packages/iso-filecoin/src/address.js:348](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L348)

Convert to ID address

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`AddressRpcSafetyOptions`](/api/address/interfaces/addressrpcsafetyoptions/) |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AddressId`](/api/address/classes/addressid/)\>

#### Inherited from

[`Address`](/api/address/classes/address/).[`toIdAddress`](/api/address/classes/address/#toidaddress)

***

### toString()

```ts
toString(): string
```

Defined in: [packages/iso-filecoin/src/address.js:323](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L323)

#### Returns

`string`

#### Inherited from

[`Address`](/api/address/classes/address/).[`toString`](/api/address/classes/address/#tostring)

***

### fromBytes()

```ts
static fromBytes(bytes: Uint8Array<ArrayBufferLike>, network: Network): AddressSecp256k1
```

Defined in: [packages/iso-filecoin/src/address.js:651](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L651)

Create address from bytes

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `bytes` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |  |
| `network` | [`Network`](/api/adapters/filsnap/type-aliases/network/) |  |

#### Returns

[`AddressSecp256k1`](/api/address/classes/addresssecp256k1/)

***

### fromPublicKey()

```ts
static fromPublicKey(publicKey: Uint8Array<ArrayBufferLike>, network: Network): AddressSecp256k1
```

Defined in: [packages/iso-filecoin/src/address.js:662](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L662)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `publicKey` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |  |
| `network` | [`Network`](/api/adapters/filsnap/type-aliases/network/) |  |

#### Returns

[`AddressSecp256k1`](/api/address/classes/addresssecp256k1/)

***

### fromString()

```ts
static fromString(address: string): AddressSecp256k1
```

Defined in: [packages/iso-filecoin/src/address.js:621](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L621)

Create address from string

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | `string` |  |

#### Returns

[`AddressSecp256k1`](/api/address/classes/addresssecp256k1/)

## Properties

### \[symbol\]

```ts
[symbol]: boolean = true;
```

Defined in: [packages/iso-filecoin/src/address.js:308](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L308)

#### Inherited from

[`Address`](/api/address/classes/address/).[`[symbol]`](/api/address/classes/address/#symbol)

***

### network

```ts
network: Network;
```

Defined in: [packages/iso-filecoin/src/address.js:317](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L317)

#### Inherited from

[`Address`](/api/address/classes/address/).[`network`](/api/address/classes/address/#network-1)

***

### networkPrefix

```ts
networkPrefix: "f" | "t";
```

Defined in: [packages/iso-filecoin/src/address.js:318](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L318)

#### Inherited from

[`Address`](/api/address/classes/address/).[`networkPrefix`](/api/address/classes/address/#networkprefix)

***

### payload

```ts
payload: Uint8Array<ArrayBufferLike>;
```

Defined in: [packages/iso-filecoin/src/address.js:316](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L316)

#### Inherited from

[`Address`](/api/address/classes/address/).[`payload`](/api/address/classes/address/#payload-1)

***

### protocol

```ts
protocol: 1;
```

Defined in: [packages/iso-filecoin/src/address.js:609](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L609)

#### Inherited from

[`Address`](/api/address/classes/address/).[`protocol`](/api/address/classes/address/#protocol)
