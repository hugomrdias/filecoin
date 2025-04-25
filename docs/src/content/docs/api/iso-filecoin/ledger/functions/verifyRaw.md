---
editUrl: false
next: true
prev: true
title: "verifyRaw"
---

> **verifyRaw**(`signature`, `data`, `publicKey`): `boolean`

Defined in: [packages/iso-filecoin/src/ledger.js:251](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L251)

Verify raw signature

## Parameters

| Parameter | Type |
| ------ | ------ |
| `signature` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `publicKey` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |

## Returns

`boolean`

## Example

```ts twoslash
import { verifyRaw } from 'iso-filecoin/ledger'

const signature = new Uint8Array([1, 2, 3])
const data = new Uint8Array([4, 5, 6])
const publicKey = new Uint8Array([7, 8, 9])
const isValid = verifyRaw(signature, data, publicKey)
// => true
```
