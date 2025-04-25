---
editUrl: false
next: true
prev: true
title: "IAccount"
---

Defined in: packages/iso-filecoin/dist/src/types.d.ts:30

Account interface

## Properties

### address

> **address**: [`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/)

Defined in: packages/iso-filecoin/dist/src/types.d.ts:32

***

### path?

> `optional` **path**: `string`

Defined in: packages/iso-filecoin/dist/src/types.d.ts:37

Derivation path - only for HD wallets

***

### privateKey?

> `optional` **privateKey**: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

Defined in: packages/iso-filecoin/dist/src/types.d.ts:41

Private key - only for RAW and HD wallets

***

### publicKey

> **publicKey**: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Defined in: packages/iso-filecoin/dist/src/types.d.ts:33

***

### type

> **type**: `"SECP256K1"` \| `"BLS"`

Defined in: packages/iso-filecoin/dist/src/types.d.ts:31
