---
editUrl: false
next: true
prev: true
title: "lotusCid"
---

> **lotusCid**(`data`): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)\>

Defined in: [packages/iso-filecoin/src/utils.js:310](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/utils.js#L310)

Create a Lotus CID from a BufferSource

## Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |

## Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)\>

## Example

```js
import { lotusCid } from 'iso-filecoin/utils'

const data = new Uint8Array([1, 2, 3])
const cid = lotusCid(data)
```
