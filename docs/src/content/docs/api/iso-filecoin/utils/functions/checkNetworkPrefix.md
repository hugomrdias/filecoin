---
editUrl: false
next: true
prev: true
title: "checkNetworkPrefix"
---

```ts
function checkNetworkPrefix(prefix: string): prefix is NetworkPrefix
```

Defined in: [packages/iso-filecoin/src/utils.js:141](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/utils.js#L141)

Checks if the prefix is a valid network prefix

## Parameters

| Parameter | Type |
| ------ | ------ |
| `prefix` | `string` |

## Returns

`prefix is NetworkPrefix`

## Example

```ts twoslash
import { checkNetworkPrefix } from 'iso-filecoin/utils'

checkNetworkPrefix('f') // true
checkNetworkPrefix('t') // true
checkNetworkPrefix('x') // false
```
