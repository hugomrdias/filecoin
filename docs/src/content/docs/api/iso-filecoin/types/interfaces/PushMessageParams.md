---
editUrl: false
next: true
prev: true
title: "PushMessageParams"
---

Defined in: [packages/iso-filecoin/src/types.ts:365](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L365)

## Properties

### msg

> **msg**: `object`

Defined in: [packages/iso-filecoin/src/types.ts:366](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L366)

#### from

> **from**: `string`

#### gasFeeCap

> **gasFeeCap**: `string`

#### gasLimit

> **gasLimit**: `number`

#### gasPremium

> **gasPremium**: `string`

#### method

> **method**: `number`

#### nonce

> **nonce**: `number`

#### params

> **params**: `string`

Params encoded as base64pad

#### to

> **to**: `string`

#### value

> **value**: `string`

Value in attoFIL

#### version

> **version**: `0`

***

### signature

> **signature**: `object`

Defined in: [packages/iso-filecoin/src/types.ts:367](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L367)

#### data

> **data**: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> = `zBuf`

#### type

> **type**: `"SECP256K1"` \| `"BLS"`
