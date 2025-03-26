---
editUrl: false
next: true
prev: true
title: "pathFromNetwork"
---

```ts
function pathFromNetwork(network: Network, index?: number): string
```

Defined in: [packages/iso-filecoin/src/utils.js:114](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/utils.js#L114)

Derivation path from chain

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `network` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) | `undefined` | - |
| `index`? | `number` | `0` | Account index (default 0) |

## Returns

`string`

## Example

```ts twoslash
import { pathFromNetwork } from 'iso-filecoin/utils'

const path = pathFromNetwork('mainnet')
// => 'm/44'/461'/0'/0/0'
