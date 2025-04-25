---
editUrl: false
next: true
prev: true
title: "JsonRpcResponse"
---

> **JsonRpcResponse** = \{ `error?`: `undefined`; `id`: `number` \| `string` \| `null`; `jsonrpc`: `"2.0"`; `result`: `JsonValue`; \} \| \{ `error`: [`JsonRpcError`](/api/iso-filecoin/types/interfaces/jsonrpcerror/); `id`: `number` \| `string` \| `null`; `jsonrpc`: `"2.0"`; `result?`: `undefined`; \}

Defined in: [packages/iso-filecoin/src/types.ts:216](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L216)
