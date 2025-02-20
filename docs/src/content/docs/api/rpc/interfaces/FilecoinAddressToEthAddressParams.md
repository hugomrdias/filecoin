---
editUrl: false
next: true
prev: true
title: "FilecoinAddressToEthAddressParams"
---

Defined in: [packages/iso-filecoin/src/types.ts:385](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L385)

## Properties

### address

```ts
address: string;
```

Defined in: [packages/iso-filecoin/src/types.ts:389](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L389)

The Filecoin address to convert.

***

### blockNumber?

```ts
optional blockNumber: "pending" | "latest" | "finalized" | "safe" | "0x${string}";
```

Defined in: [packages/iso-filecoin/src/types.ts:395](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L395)

The block number or state for the conversion.
Defaults to "finalized" for maximum safety.
Possible values: "pending", "latest", "finalized", "safe", or a specific block number represented as hex.
