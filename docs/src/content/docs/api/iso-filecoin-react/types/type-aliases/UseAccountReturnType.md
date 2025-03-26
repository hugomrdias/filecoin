---
editUrl: false
next: true
prev: true
title: "UseAccountReturnType"
---

```ts
type UseAccountReturnType = Compute<Pick<WalletContextType, "account" | "adapter" | "network"> & {
  chain: Chain;
  state: ConnectionState;
}>;
```

Defined in: [packages/iso-filecoin-react/src/types.ts:68](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L68)

Use account return type
