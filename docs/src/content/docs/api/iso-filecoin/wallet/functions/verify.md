---
editUrl: false
next: true
prev: true
title: "verify"
---

```ts
function verify(
   signature: Signature, 
   data: Uint8Array<ArrayBufferLike>, 
   publicKey: Uint8Array<ArrayBufferLike>): boolean
```

Defined in: [packages/iso-filecoin/src/wallet.js:273](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/wallet.js#L273)

Verify signatures

## Parameters

| Parameter | Type |
| ------ | ------ |
| `signature` | [`Signature`](/api/iso-filecoin/signature/classes/signature/) |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `publicKey` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |

## Returns

`boolean`
