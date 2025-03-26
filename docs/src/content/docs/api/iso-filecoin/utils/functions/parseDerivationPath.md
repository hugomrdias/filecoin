---
editUrl: false
next: true
prev: true
title: "parseDerivationPath"
---

```ts
function parseDerivationPath(path: string): DerivationPathComponents
```

Defined in: [packages/iso-filecoin/src/utils.js:167](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/utils.js#L167)

Parse a derivation path into its components

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The derivation path to parse |

## Returns

[`DerivationPathComponents`](/api/iso-filecoin/types/interfaces/derivationpathcomponents/)

An object containing the derivation path components

## See

https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#path-levels

## Example

```ts twoslash
import { parseDerivationPath } from 'iso-filecoin/utils'

const components = parseDerivationPath("m/44'/461'/0'/0/0")
// {
//   purpose: 44,
//   coinType: 461,
//   account: 0,
//   change: 0,
//   addressIndex: 0
// }
```
