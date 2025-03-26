---
editUrl: false
next: true
prev: true
title: "getNetworkFromPath"
---

```ts
function getNetworkFromPath(path: string): Network
```

Defined in: [packages/iso-filecoin/src/utils.js:72](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/utils.js#L72)

Returns the third position from derivation path

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | path to parse |

## Returns

[`Network`](/api/iso-filecoin/types/type-aliases/network/)

## Example

```ts twoslash
import { getNetworkFromPath } from 'iso-filecoin/utils'

const network = getNetworkFromPath("m/44'/461'/0'/0/0")
// => 'testnet'
