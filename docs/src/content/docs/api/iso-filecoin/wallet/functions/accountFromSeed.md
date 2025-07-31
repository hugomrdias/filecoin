---
editUrl: false
next: true
prev: true
title: "accountFromSeed"
---

> **accountFromSeed**(`seed`, `type`, `path`, `network?`): `object`

Defined in: [packages/iso-filecoin/src/wallet.js:81](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/wallet.js#L81)

Get HD account from seed

## Parameters

| Parameter | Type |
| ------ | ------ |
| `seed` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `type` | `"SECP256K1"` \| `"BLS"` |
| `path` | `string` |
| `network?` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |

## Returns

### address

> **address**: [`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/)

### path

> **path**: `string`

Derivation path - only for HD wallets

### privateKey

> **privateKey**: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Private key - only for RAW and HD wallets

### publicKey

> **publicKey**: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

### type

> **type**: `"SECP256K1"` \| `"BLS"`
