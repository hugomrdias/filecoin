---
editUrl: false
next: true
prev: true
title: "JsonRpcRequest"
---

Defined in: [packages/iso-filecoin/src/types.ts:205](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L205)

## Properties

### id?

```ts
optional id: null | string | number;
```

Defined in: [packages/iso-filecoin/src/types.ts:207](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L207)

***

### jsonrpc

```ts
jsonrpc: "2.0";
```

Defined in: [packages/iso-filecoin/src/types.ts:206](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L206)

***

### method

```ts
method: string;
```

Defined in: [packages/iso-filecoin/src/types.ts:211](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L211)

A String containing the name of the method to be invoked. Method names that begin with the word rpc followed by a period character (U+002E or ASCII 46) are reserved for rpc-internal methods and extensions and MUST NOT be used for anything else.

***

### params?

```ts
optional params: JsonValue;
```

Defined in: [packages/iso-filecoin/src/types.ts:212](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L212)
