---
editUrl: false
next: true
prev: true
title: "AddressId"
---

Defined in: [packages/iso-filecoin/src/address.js:444](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L444)

ID Address f0..

Protocol 0 addresses are simple IDs. All actors have a numeric ID even if they don’t have public keys. The payload of an ID address is base10 encoded. IDs are not hashed and do not have a checksum.

## See

https://spec.filecoin.io/appendix/address/#section-appendix.address.protocol-0-ids

## Implements

## Extends

- `Address`

## Constructors

### Constructor

```ts
new AddressId(payload: Uint8Array<ArrayBufferLike>, network: Network): AddressId
```

Defined in: [packages/iso-filecoin/src/address.js:450](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L450)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `payload` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `network` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |

#### Returns

`AddressId`

#### Overrides

```ts
Address.constructor
```

## Methods

### checksum()

```ts
checksum(): Uint8Array<ArrayBufferLike>
```

Defined in: [packages/iso-filecoin/src/address.js:337](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L337)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

#### Inherited from

```ts
Address.checksum
```

***

### to0x()

```ts
to0x(options: AddressRpcOptions): Promise<string>
```

Defined in: [packages/iso-filecoin/src/address.js:571](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L571)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`AddressRpcOptions`](/api/iso-filecoin/types/interfaces/addressrpcoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

#### Overrides

```ts
Address.to0x
```

***

### toBytes()

```ts
toBytes(): Uint8Array<ArrayBuffer>
```

Defined in: [packages/iso-filecoin/src/address.js:329](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L329)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)\>

#### Inherited from

```ts
Address.toBytes
```

***

### toContractDestination()

```ts
toContractDestination(): `0x${string}`
```

Defined in: [packages/iso-filecoin/src/address.js:333](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L333)

#### Returns

`` `0x${string}` ``

#### Inherited from

```ts
Address.toContractDestination
```

***

### toIdAddress()

```ts
toIdAddress(options: AddressRpcSafetyOptions): Promise<AddressId>
```

Defined in: [packages/iso-filecoin/src/address.js:348](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L348)

Convert to ID address

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`AddressRpcSafetyOptions`](/api/iso-filecoin/types/interfaces/addressrpcsafetyoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`AddressId`\>

#### Inherited from

```ts
Address.toIdAddress
```

***

### toIdMaskAddress()

```ts
toIdMaskAddress(): string
```

Defined in: [packages/iso-filecoin/src/address.js:524](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L524)

Convert address to ID masked 0x address

To convert to an eth address you probably should use [to0x](/api/iso-filecoin/address/classes/addressid/#to0x)

#### Returns

`string`

***

### toRobust()

```ts
toRobust(options: AddressRpcOptions): Promise<IAddress>
```

Defined in: [packages/iso-filecoin/src/address.js:541](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L541)

Get robust address from public key address

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`AddressRpcOptions`](/api/iso-filecoin/types/interfaces/addressrpcoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/)\>

***

### toString()

```ts
toString(): string
```

Defined in: [packages/iso-filecoin/src/address.js:532](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L532)

#### Returns

`string`

#### Overrides

```ts
Address.toString
```

***

### fromBytes()

```ts
static fromBytes(bytes: Uint8Array<ArrayBufferLike>, network: Network): AddressId
```

Defined in: [packages/iso-filecoin/src/address.js:487](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L487)

Create address from bytes

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `bytes` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `network` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |

#### Returns

`AddressId`

***

### fromIdMaskAddress()

```ts
static fromIdMaskAddress(address: string, network: Network): AddressId
```

Defined in: [packages/iso-filecoin/src/address.js:500](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L500)

Create ID address from ID masked 0x address

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `address` | `string` |
| `network` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |

#### Returns

`AddressId`

***

### fromString()

```ts
static fromString(address: string): AddressId
```

Defined in: [packages/iso-filecoin/src/address.js:461](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L461)

Create address from string

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `address` | `string` |

#### Returns

`AddressId`

## Properties

### \[symbol\]

```ts
[symbol]: boolean = true;
```

Defined in: [packages/iso-filecoin/src/address.js:308](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L308)

#### Inherited from

```ts
Address.[symbol]
```

***

### id

```ts
id: bigint;
```

Defined in: [packages/iso-filecoin/src/address.js:453](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L453)

***

### network

```ts
network: Network;
```

Defined in: [packages/iso-filecoin/src/address.js:317](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L317)

#### Inherited from

```ts
Address.network
```

***

### networkPrefix

```ts
networkPrefix: "f" | "t";
```

Defined in: [packages/iso-filecoin/src/address.js:318](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L318)

#### Inherited from

```ts
Address.networkPrefix
```

***

### payload

```ts
payload: Uint8Array<ArrayBufferLike>;
```

Defined in: [packages/iso-filecoin/src/address.js:316](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L316)

#### Inherited from

```ts
Address.payload
```

***

### protocol

```ts
protocol: 0;
```

Defined in: [packages/iso-filecoin/src/address.js:452](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L452)

#### Inherited from

```ts
Address.protocol
```
