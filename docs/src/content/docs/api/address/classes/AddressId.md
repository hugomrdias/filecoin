---
editUrl: false
next: true
prev: true
title: "AddressId"
---

Defined in: [packages/iso-filecoin/src/address.js:444](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L444)

ID Address f0..

Protocol 0 addresses are simple IDs. All actors have a numeric ID even if they don’t have public keys. The payload of an ID address is base10 encoded. IDs are not hashed and do not have a checksum.

## See

https://spec.filecoin.io/appendix/address/#section-appendix.address.protocol-0-ids

## Implements

## Extends

- [`Address`](/api/address/classes/address/)

## Constructors

### new AddressId()

```ts
new AddressId(payload: Uint8Array<ArrayBufferLike>, network: Network): AddressId
```

Defined in: [packages/iso-filecoin/src/address.js:450](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L450)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `payload` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |  |
| `network` | [`Network`](/api/adapters/filsnap/type-aliases/network/) |  |

#### Returns

[`AddressId`](/api/address/classes/addressid/)

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
to0x(options: AddressRpcOptions): Promise<string>
```

Defined in: [packages/iso-filecoin/src/address.js:571](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L571)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`AddressRpcOptions`](/api/address/interfaces/addressrpcoptions/) |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

#### Overrides

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

### toIdMaskAddress()

```ts
toIdMaskAddress(): string
```

Defined in: [packages/iso-filecoin/src/address.js:524](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L524)

Convert address to ID masked 0x address

To convert to an eth address you problably should use [to0x](../../../../../../../api/address/classes/addressid/#to0x)

#### Returns

`string`

***

### toRobust()

```ts
toRobust(options: AddressRpcOptions): Promise<IAddress>
```

Defined in: [packages/iso-filecoin/src/address.js:541](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L541)

Get robust address from public key address

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`AddressRpcOptions`](/api/address/interfaces/addressrpcoptions/) |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAddress`](/api/address/interfaces/iaddress/)\>

***

### toString()

```ts
toString(): string
```

Defined in: [packages/iso-filecoin/src/address.js:532](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L532)

#### Returns

`string`

#### Overrides

[`Address`](/api/address/classes/address/).[`toString`](/api/address/classes/address/#tostring)

***

### fromBytes()

```ts
static fromBytes(bytes: Uint8Array<ArrayBufferLike>, network: Network): AddressId
```

Defined in: [packages/iso-filecoin/src/address.js:487](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L487)

Create address from bytes

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `bytes` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |  |
| `network` | [`Network`](/api/adapters/filsnap/type-aliases/network/) |  |

#### Returns

[`AddressId`](/api/address/classes/addressid/)

***

### fromEthAddress()

```ts
static fromEthAddress(address: string, network: Network): AddressId
```

Defined in: [packages/iso-filecoin/src/address.js:500](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L500)

Create ID address from ID masked 0x address

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | `string` |  |
| `network` | [`Network`](/api/adapters/filsnap/type-aliases/network/) |  |

#### Returns

[`AddressId`](/api/address/classes/addressid/)

***

### fromString()

```ts
static fromString(address: string): AddressId
```

Defined in: [packages/iso-filecoin/src/address.js:461](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L461)

Create address from string

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | `string` |  |

#### Returns

[`AddressId`](/api/address/classes/addressid/)

## Properties

### \[symbol\]

```ts
[symbol]: boolean = true;
```

Defined in: [packages/iso-filecoin/src/address.js:308](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L308)

#### Inherited from

[`Address`](/api/address/classes/address/).[`[symbol]`](/api/address/classes/address/#symbol)

***

### id

```ts
id: bigint;
```

Defined in: [packages/iso-filecoin/src/address.js:453](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L453)

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
protocol: 0;
```

Defined in: [packages/iso-filecoin/src/address.js:452](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L452)

#### Inherited from

[`Address`](/api/address/classes/address/).[`protocol`](/api/address/classes/address/#protocol)
