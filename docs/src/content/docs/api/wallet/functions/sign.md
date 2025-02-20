---
editUrl: false
next: true
prev: true
title: "sign"
---

```ts
function sign(
   privateKey: Uint8Array<ArrayBufferLike>, 
   type: "SECP256K1" | "BLS", 
   data: Uint8Array<ArrayBufferLike>): Signature
```

Defined in: [packages/iso-filecoin/src/wallet.js:232](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/wallet.js#L232)

Sign arbitary bytes similar to `lotus wallet sign`

Lotus BLS private key is little endian so you need to reverse the byte order. Use `lotusBlsPrivateKeyToBytes` to convert.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `privateKey` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |  |
| `type` | `"SECP256K1"` \| `"BLS"` |  |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |  |

## Returns

[`Signature`](/api/signature/classes/signature/)
