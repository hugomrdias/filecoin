---
editUrl: false
next: true
prev: true
title: "Signature"
---

Defined in: [packages/iso-filecoin/src/signature.js:43](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/signature.js#L43)

Signature Class

## Accessors

### code

#### Get Signature

> **get** **code**(): `1` \| `2`

Defined in: [packages/iso-filecoin/src/signature.js:54](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/signature.js#L54)

##### Returns

`1` \| `2`

## Constructors

### Constructor

> **new Signature**(`sig`): `Signature`

Defined in: [packages/iso-filecoin/src/signature.js:48](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/signature.js#L48)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `sig` | \{ `data`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>; `type`: `"SECP256K1"` \| `"BLS"`; \} |
| `sig.data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `sig.type` | `"SECP256K1"` \| `"BLS"` |

#### Returns

`Signature`

## Methods

### toLotus()

> **toLotus**(): `object`

Defined in: [packages/iso-filecoin/src/signature.js:75](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/signature.js#L75)

Encodes the signature as a JSON object in the Lotus RPC format.

#### Returns

`object`

##### Data

> **Data**: `string`

##### Type

> **Type**: `1` \| `2`

***

### toLotusHex()

> **toLotusHex**(): `string`

Defined in: [packages/iso-filecoin/src/signature.js:125](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/signature.js#L125)

Encodes the signature as a Lotus-style hex encoded string

Lotus adds 0x01 or 0x02 to the signature depending on the type.

#### Returns

`string`

Hex encoded signature

***

### fromLotus()

> `static` **fromLotus**(`json`): `Signature`

Defined in: [packages/iso-filecoin/src/signature.js:62](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/signature.js#L62)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `json` | \{ `Data`: `string`; `Type`: `1` \| `2`; \} |
| `json.Data` | `string` |
| `json.Type` | `1` \| `2` |

#### Returns

`Signature`

***

### fromLotusHex()

> `static` **fromLotusHex**(`str`): `Signature`

Defined in: [packages/iso-filecoin/src/signature.js:89](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/signature.js#L89)

Signature from Lotus-style hex encoded string

Lotus adds 0x01 or 0x02 to the signature depending on the type.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `str` | `string` | Hex encoded signature |

#### Returns

`Signature`

## Properties

### data

> **data**: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

Defined in: [packages/iso-filecoin/src/signature.js:51](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/signature.js#L51)

***

### type

> **type**: `"SECP256K1"` \| `"BLS"`

Defined in: [packages/iso-filecoin/src/signature.js:50](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/signature.js#L50)
