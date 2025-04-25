---
editUrl: false
next: true
prev: true
title: "JsonRpcRequest"
---

Defined in: [packages/iso-filecoin/src/types.ts:206](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L206)

## Properties

### id?

> `optional` **id**: `null` \| `string` \| `number`

Defined in: [packages/iso-filecoin/src/types.ts:208](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L208)

***

### jsonrpc

> **jsonrpc**: `"2.0"`

Defined in: [packages/iso-filecoin/src/types.ts:207](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L207)

***

### method

> **method**: `string`

Defined in: [packages/iso-filecoin/src/types.ts:212](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L212)

A String containing the name of the method to be invoked. Method names that begin with the word rpc followed by a period character (U+002E or ASCII 46) are reserved for rpc-internal methods and extensions and MUST NOT be used for anything else.

***

### params?

> `optional` **params**: `JsonValue`

Defined in: [packages/iso-filecoin/src/types.ts:213](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L213)
