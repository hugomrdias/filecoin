---
editUrl: false
next: true
prev: true
title: "JsonRpcResponse"
---

```ts
type JsonRpcResponse = 
  | {
  error: undefined;
  id: number | string | null;
  jsonrpc: "2.0";
  result: JsonValue;
 }
  | {
  error: JsonRpcError;
  id: number | string | null;
  jsonrpc: "2.0";
  result: undefined;
};
```

Defined in: [packages/iso-filecoin/src/types.ts:215](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L215)
