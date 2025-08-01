---
editUrl: false
next: true
prev: true
title: "sign"
---

> **sign**(`privateKey`, `type`, `data`): [`Signature`](/api/iso-filecoin/signature/classes/signature/)

Defined in: [packages/iso-filecoin/src/wallet.js:239](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/wallet.js#L239)

Sign arbitary bytes similar to `lotus wallet sign`

Lotus BLS private key is little endian so you need to reverse the byte order. Use `lotusBlsPrivateKeyToBytes` to convert.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `privateKey` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `type` | `"SECP256K1"` \| `"BLS"` |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |

## Returns

[`Signature`](/api/iso-filecoin/signature/classes/signature/)
