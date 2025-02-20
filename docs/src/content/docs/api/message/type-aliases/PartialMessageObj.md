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

Defined in: [packages/iso-filecoin/src/types.ts:23](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L23)
