---
editUrl: false
next: true
prev: true
title: "isAddress"
---

```ts
function isAddress(val: any): val is IAddress;
```

Defined in: [packages/iso-filecoin/src/address.js:58](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L58)

Asserts that the given value is an [IAddress](/api/iso-filecoin/address/interfaces/iaddress/) instance.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `val` | `any` |

## Returns

`val is IAddress`

## Example

```ts twoslash
import { isAddress, fromString } from 'iso-filecoin/address'

const address = isAddress(fromString('f1...')) // true

const notAddress = isAddress('f1...') // falseeeeeee
```
