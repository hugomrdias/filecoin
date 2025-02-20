---
editUrl: false
next: true
prev: true
title: "lotusBlsPrivateKeyToBytes"
---

```ts
function lotusBlsPrivateKeyToBytes(priv: string): Uint8Array<ArrayBufferLike>
```

Defined in: [packages/iso-filecoin/src/wallet.js:302](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/wallet.js#L302)

Lotus BLS base64 private key to bytes
Lotus BLS private key is little endian so you need to reverse the byte order.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `priv` | `string` |  |

## Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>
