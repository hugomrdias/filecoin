---
editUrl: false
next: true
prev: true
title: "getNetwork"
---

```ts
function getNetwork(networkPrefix: NetworkPrefix): Network;
```

Defined in: [packages/iso-filecoin/src/utils.js:56](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/utils.js#L56)

Get network from prefix

## Parameters

| Parameter | Type |
| ------ | ------ |
| `networkPrefix` | [`NetworkPrefix`](/api/iso-filecoin/utils/type-aliases/networkprefix/) |

## Returns

[`Network`](/api/iso-filecoin/types/type-aliases/network/)

## Example

```ts twoslash
import { getNetwork } from 'iso-filecoin/utils'

const network = getNetwork('f')
// => 'mainnet'
