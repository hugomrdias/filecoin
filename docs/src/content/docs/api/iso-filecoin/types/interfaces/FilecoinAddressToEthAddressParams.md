---
editUrl: false
next: true
prev: true
title: "FilecoinAddressToEthAddressParams"
---

Defined in: [packages/iso-filecoin/src/types.ts:391](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L391)

## Properties

### address

> **address**: `string`

Defined in: [packages/iso-filecoin/src/types.ts:395](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L395)

The Filecoin address to convert.

***

### blockNumber?

> `optional` **blockNumber**: `"pending"` \| `"latest"` \| `"finalized"` \| `"safe"` \| `"0x${string}"`

Defined in: [packages/iso-filecoin/src/types.ts:401](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L401)

The block number or state for the conversion.
Defaults to "finalized" for maximum safety.
Possible values: "pending", "latest", "finalized", "safe", or a specific block number represented as hex.
