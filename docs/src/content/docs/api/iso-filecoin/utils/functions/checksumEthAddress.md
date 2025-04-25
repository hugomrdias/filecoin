---
editUrl: false
next: true
prev: true
title: "checksumEthAddress"
---

> **checksumEthAddress**(`address`): `string`

Defined in: [packages/iso-filecoin/src/utils.js:243](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/utils.js#L243)

Checksum ethereum address

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | `string` | Ethereum address |

## Returns

`string`

Checksummed ethereum address

## Example

```ts twoslash
import { checksumEthAddress } from 'iso-filecoin/utils'

const address = '0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359'
const checksummed = checksumEthAddress(address)
// => '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359'
```
