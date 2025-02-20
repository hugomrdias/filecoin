---
editUrl: false
next: true
prev: true
title: "isAddress"
---

```ts
function isAddress(val: any): val is IAddress
```

Defined in: [packages/iso-filecoin/src/address.js:58](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L58)

Asserts that the given value is an [IAddress](../../../../../../../api/address/interfaces/iaddress) instance.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `val` | `any` |  |

## Returns

`val is IAddress`

## Example

```ts twoslash
import { isAddress, fromString } from 'iso-filecoin/address'

const address = isAddress(fromString('f1...')) // true
// @log: ↓ false
const notAddress = isAddress('f1...') // falseeeeeee
```
