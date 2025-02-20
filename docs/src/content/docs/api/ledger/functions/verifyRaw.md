---
editUrl: false
next: true
prev: true
title: "verifyRaw"
---

```ts
function verifyRaw(
   signature: Uint8Array<ArrayBufferLike>, 
   data: Uint8Array<ArrayBufferLike>, 
   publicKey: Uint8Array<ArrayBufferLike>): boolean
```

Defined in: [packages/iso-filecoin/src/ledger.js:241](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/ledger.js#L241)

Verify raw signature

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `signature` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |  |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |  |
| `publicKey` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |  |

## Returns

`boolean`
