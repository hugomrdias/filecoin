---
editUrl: false
next: true
prev: true
title: "lotusBlsPrivateKeyToBytes"
---

```ts
function lotusBlsPrivateKeyToBytes(priv: string): Uint8Array<ArrayBufferLike>
```

Defined in: [packages/iso-filecoin/src/wallet.js:302](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/wallet.js#L302)

Lotus BLS base64 private key to bytes
Lotus BLS private key is little endian so you need to reverse the byte order.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `priv` | `string` |

## Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>
