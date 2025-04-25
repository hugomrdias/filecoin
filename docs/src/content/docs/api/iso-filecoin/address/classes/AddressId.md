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

> **new AddressId**(`payload`, `network`): `AddressId`

Defined in: [packages/iso-filecoin/src/address.js:450](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L450)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `payload` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `network` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |

#### Returns

`AddressId`

#### Overrides

`Address.constructor`

## Methods

### checksum()

> **checksum**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

Defined in: [packages/iso-filecoin/src/address.js:337](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L337)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

#### Inherited from

`Address.checksum`

***

### to0x()

> **to0x**(`options`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

Defined in: [packages/iso-filecoin/src/address.js:571](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L571)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`AddressRpcOptions`](/api/iso-filecoin/types/interfaces/addressrpcoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

#### Overrides

`Address.to0x`

***

### toBytes()

> **toBytes**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)\>

Defined in: [packages/iso-filecoin/src/address.js:329](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L329)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)\>

#### Inherited from

`Address.toBytes`

***

### toContractDestination()

> **toContractDestination**(): `` `0x${string}` ``

Defined in: [packages/iso-filecoin/src/address.js:333](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L333)

#### Returns

`` `0x${string}` ``

#### Inherited from

`Address.toContractDestination`

***

### toIdAddress()

> **toIdAddress**(`options`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`AddressId`\>

Defined in: [packages/iso-filecoin/src/address.js:348](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L348)

Convert to ID address

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`AddressRpcSafetyOptions`](/api/iso-filecoin/types/interfaces/addressrpcsafetyoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`AddressId`\>

#### Inherited from

`Address.toIdAddress`

***

### toIdMaskAddress()

> **toIdMaskAddress**(): `string`

Defined in: [packages/iso-filecoin/src/address.js:524](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L524)

Convert address to ID masked 0x address

To convert to an eth address you probably should use [to0x](/api/iso-filecoin/address/classes/addressid/#to0x)

#### Returns

`string`

***

### toRobust()

> **toRobust**(`options`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/)\>

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

> **toString**(): `string`

Defined in: [packages/iso-filecoin/src/address.js:532](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L532)

#### Returns

`string`

#### Overrides

`Address.toString`

***

### fromBytes()

> `static` **fromBytes**(`bytes`, `network`): `AddressId`

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

> `static` **fromIdMaskAddress**(`address`, `network`): `AddressId`

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

> `static` **fromString**(`address`): `AddressId`

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

> **\[symbol\]**: `boolean` = `true`

Defined in: [packages/iso-filecoin/src/address.js:308](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L308)

#### Inherited from

`Address.[symbol]`

***

### id

> **id**: `bigint`

Defined in: [packages/iso-filecoin/src/address.js:453](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L453)

***

### network

> **network**: [`Network`](/api/iso-filecoin/types/type-aliases/network/)

Defined in: [packages/iso-filecoin/src/address.js:317](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L317)

#### Inherited from

`Address.network`

***

### networkPrefix

> **networkPrefix**: `"f"` \| `"t"`

Defined in: [packages/iso-filecoin/src/address.js:318](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L318)

#### Inherited from

`Address.networkPrefix`

***

### payload

> **payload**: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

Defined in: [packages/iso-filecoin/src/address.js:316](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L316)

#### Inherited from

`Address.payload`

***

### protocol

> **protocol**: `0`

Defined in: [packages/iso-filecoin/src/address.js:452](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L452)

#### Inherited from

`Address.protocol`
