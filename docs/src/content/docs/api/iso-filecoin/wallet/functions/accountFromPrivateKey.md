---
editUrl: false
next: true
prev: true
title: "accountFromPrivateKey"
---

> **accountFromPrivateKey**(`privateKey`, `type`, `network`, `path?`): `object`

Defined in: [packages/iso-filecoin/src/wallet.js:115](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/wallet.js#L115)

Get account from private key

Lotus BLS private key is little endian so you need to reverse the byte order. Use `lotusBlsPrivateKeyToBytes` to convert.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `privateKey` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `type` | `"SECP256K1"` \| `"BLS"` |
| `network` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |
| `path?` | `string` |

## Returns

### address

> **address**: [`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/)

### path?

> `optional` **path**: `string`

Derivation path - only for HD wallets

### privateKey

> **privateKey**: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Private key - only for RAW and HD wallets

### publicKey

> **publicKey**: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

### type

> **type**: `"SECP256K1"` \| `"BLS"`
