---
editUrl: false
next: true
prev: true
title: "getNetworkPrefix"
---

```ts
function getNetworkPrefix(network: Network): "f" | "t"
```

Defined in: [packages/iso-filecoin/src/utils.js:40](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/utils.js#L40)

Get network prefix from network

## Parameters

| Parameter | Type |
| ------ | ------ |
| `network` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |

## Returns

`"f"` \| `"t"`

## Example

```ts twoslash
import { getNetworkPrefix } from 'iso-filecoin/utils'

const prefix = getNetworkPrefix('mainnet')
// => 'f'
