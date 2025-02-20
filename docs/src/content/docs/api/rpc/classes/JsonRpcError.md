---
editUrl: false
next: true
prev: true
title: "JsonRpcError"
---

Defined in: [packages/iso-filecoin/src/rpc.js:71](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/rpc.js#L71)

## Extends

- [`RpcError`](/api/rpc/classes/rpcerror/)

## Constructors

### new JsonRpcError()

```ts
new JsonRpcError(cause: JsonRpcError): JsonRpcError
```

Defined in: [packages/iso-filecoin/src/rpc.js:81](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/rpc.js#L81)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `cause` | [`JsonRpcError`](/api/rpc/interfaces/jsonrpcerror/) |  |

#### Returns

[`JsonRpcError`](/api/rpc/classes/jsonrpcerror/)

#### Overrides

[`RpcError`](/api/rpc/classes/rpcerror/).[`constructor`](/api/rpc/classes/rpcerror/#constructors)

## Methods

### is()

```ts
static is(value: unknown): value is JsonRpcError
```

Defined in: [packages/iso-filecoin/src/rpc.js:91](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/rpc.js#L91)

Check if a value is a JsonRpcError

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `unknown` |  |

#### Returns

`value is JsonRpcError`

#### Overrides

[`RpcError`](/api/rpc/classes/rpcerror/).[`is`](/api/rpc/classes/rpcerror/#is)

## Properties

### \[symbol\]

```ts
[symbol]: boolean = true;
```

Defined in: [packages/iso-filecoin/src/rpc.js:43](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/rpc.js#L43)

#### Inherited from

[`RpcError`](/api/rpc/classes/rpcerror/).[`[symbol]`](/api/rpc/classes/rpcerror/#symbol)

***

### cause

```ts
cause: JsonRpcError;
```

Defined in: [packages/iso-filecoin/src/rpc.js:75](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/rpc.js#L75)

#### Overrides

[`RpcError`](/api/rpc/classes/rpcerror/).[`cause`](/api/rpc/classes/rpcerror/#cause)

***

### name

```ts
name: string = 'JsonRpcError';
```

Defined in: [packages/iso-filecoin/src/rpc.js:72](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/rpc.js#L72)

#### Overrides

[`RpcError`](/api/rpc/classes/rpcerror/).[`name`](/api/rpc/classes/rpcerror/#name)
