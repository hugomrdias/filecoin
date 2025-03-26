---
editUrl: false
next: true
prev: true
title: "Compute"
---

```ts
type Compute<type> = { [key in keyof type]: type[key] } & unknown;
```

Defined in: [packages/iso-filecoin-react/src/types.ts:10](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L10)

Combines members of an intersection into a readable type.

## Type Parameters

| Type Parameter |
| ------ |
| `type` |
