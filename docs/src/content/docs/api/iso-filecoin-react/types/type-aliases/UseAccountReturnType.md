---
editUrl: false
next: true
prev: true
title: "UseAccountReturnType"
---

```ts
type UseAccountReturnType = Compute<Pick<FilecoinContextType, "account" | "adapter" | "network"> & {
  address: string;
  chain: Chain;
  state: ConnectionState;
}>;
```

Defined in: [packages/iso-filecoin-react/src/types.ts:72](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L72)

Use account return type
