---
editUrl: false
next: true
prev: true
title: "PartialMessageObj"
---

```ts
type PartialMessageObj = SetOptional<MessageObj, 
  | "version"
  | "nonce"
  | "gasLimit"
  | "gasFeeCap"
  | "gasPremium"
  | "method"
| "params">;
```

Defined in: [packages/iso-filecoin/src/types.ts:23](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L23)
