---
editUrl: false
next: true
prev: true
title: "IAddress"
---

Defined in: [packages/iso-filecoin/src/types.ts:95](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L95)

Address interface

## Properties

### checksum()

> **checksum**: () => [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Defined in: [packages/iso-filecoin/src/types.ts:102](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L102)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

***

### id?

> `optional` **id**: `bigint`

Defined in: [packages/iso-filecoin/src/types.ts:101](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L101)

***

### namespace?

> `optional` **namespace**: `number`

Defined in: [packages/iso-filecoin/src/types.ts:100](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L100)

***

### network

> **network**: [`Network`](/api/iso-filecoin/types/type-aliases/network/)

Defined in: [packages/iso-filecoin/src/types.ts:98](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L98)

***

### networkPrefix

> **networkPrefix**: [`NetworkPrefix`](/api/iso-filecoin/utils/type-aliases/networkprefix/)

Defined in: [packages/iso-filecoin/src/types.ts:99](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L99)

***

### payload

> **payload**: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Defined in: [packages/iso-filecoin/src/types.ts:97](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L97)

***

### protocol

> **protocol**: [`ProtocolIndicatorCode`](/api/iso-filecoin/types/type-aliases/protocolindicatorcode/)

Defined in: [packages/iso-filecoin/src/types.ts:96](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L96)

***

### to0x()

> **to0x**: (`options`) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

Defined in: [packages/iso-filecoin/src/types.ts:115](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L115)

Converts any address to a 0x address, either id masked address or eth address depending on the address type.
Delegated addresses convert to eth address and f1, f2, f3 convert to id masked address
and f0 depends on the underline address type

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`AddressRpcOptions`](/api/iso-filecoin/types/interfaces/addressrpcoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

***

### toBytes()

> **toBytes**: () => [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Defined in: [packages/iso-filecoin/src/types.ts:105](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L105)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

***

### toContractDestination()

> **toContractDestination**: () => `` `0x${string}` ``

Defined in: [packages/iso-filecoin/src/types.ts:103](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L103)

#### Returns

`` `0x${string}` ``

***

### toIdAddress()

> **toIdAddress**: (`options`) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AddressId`](/api/iso-filecoin/address/classes/addressid/)\>

Defined in: [packages/iso-filecoin/src/types.ts:109](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L109)

Convert to ID address

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`AddressRpcOptions`](/api/iso-filecoin/types/interfaces/addressrpcoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AddressId`](/api/iso-filecoin/address/classes/addressid/)\>

***

### toString()

> **toString**: () => `string`

Defined in: [packages/iso-filecoin/src/types.ts:104](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L104)

#### Returns

`string`
