---
editUrl: false
next: true
prev: true
title: "getPublicKey"
---

> **getPublicKey**(`privateKey`, `network`, `type`): [`IAccount`](/api/iso-filecoin/types/interfaces/iaccount/)

Defined in: [packages/iso-filecoin/src/wallet.js:188](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/wallet.js#L188)

Get public key from private key

## Parameters

| Parameter | Type |
| ------ | ------ |
| `privateKey` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `network` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |
| `type` | `"SECP256K1"` \| `"BLS"` |

## Returns

[`IAccount`](/api/iso-filecoin/types/interfaces/iaccount/)
