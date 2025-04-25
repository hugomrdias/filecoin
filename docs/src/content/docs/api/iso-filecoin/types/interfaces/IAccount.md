---
editUrl: false
next: true
prev: true
title: "IAccount"
---

Defined in: [packages/iso-filecoin/src/types.ts:56](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L56)

Account interface

## Properties

### address

> **address**: [`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/)

Defined in: [packages/iso-filecoin/src/types.ts:58](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L58)

***

### path?

> `optional` **path**: `string`

Defined in: [packages/iso-filecoin/src/types.ts:63](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L63)

Derivation path - only for HD wallets

***

### privateKey?

> `optional` **privateKey**: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

Defined in: [packages/iso-filecoin/src/types.ts:67](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L67)

Private key - only for RAW and HD wallets

***

### publicKey

> **publicKey**: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Defined in: [packages/iso-filecoin/src/types.ts:59](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L59)

***

### type

> **type**: `"SECP256K1"` \| `"BLS"`

Defined in: [packages/iso-filecoin/src/types.ts:57](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L57)
