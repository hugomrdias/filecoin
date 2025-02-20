---
editUrl: false
next: true
prev: true
title: "parseDerivationPath"
---

```ts
function parseDerivationPath(path: string): DerivationPathComponents
```

Defined in: [packages/iso-filecoin/src/utils.js:84](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/utils.js#L84)

Parse a derivation path into its components

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The derivation path to parse |

## Returns

[`DerivationPathComponents`](/api/utils/interfaces/derivationpathcomponents/)

An object containing the derivation path components

## See

https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#path-levels
