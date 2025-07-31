---
editUrl: false
next: true
prev: true
title: "personalSign"
---

> **personalSign**(`privateKey`, `type`, `data`): [`Signature`](/api/iso-filecoin/signature/classes/signature/)

Defined in: [packages/iso-filecoin/src/wallet.js:282](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/wallet.js#L282)

Personal sign using FRC-102

## Parameters

| Parameter | Type |
| ------ | ------ |
| `privateKey` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `type` | `"SECP256K1"` \| `"BLS"` |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |

## Returns

[`Signature`](/api/iso-filecoin/signature/classes/signature/)

## See

https://github.com/filecoin-project/FIPs/blob/master/FRCs/frc-0102.md
