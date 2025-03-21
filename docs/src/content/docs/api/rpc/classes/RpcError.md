---
editUrl: false
next: true
prev: true
title: "RpcError"
---

Defined in: [packages/iso-filecoin/src/rpc.js:41](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L41)

## Extends

- [`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)

## Extended by

- [`JsonRpcError`](/api/rpc/classes/jsonrpcerror/)
- [`ValidationRpcError`](/api/rpc/classes/validationrpcerror/)

## Constructors

### new RpcError()

```ts
new RpcError(message: string, options?: ErrorOptions): RpcError
```

Defined in: [packages/iso-filecoin/src/rpc.js:55](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L55)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message` | `string` |  |
| `options`? | `ErrorOptions` |  |

#### Returns

[`RpcError`](/api/rpc/classes/rpcerror/)

#### Overrides

```ts
Error.constructor
```

## Methods

### is()

```ts
static is(value: unknown): value is RpcError
```

Defined in: [packages/iso-filecoin/src/rpc.js:66](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L66)

Check if a value is a RequestError

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `unknown` |  |

#### Returns

`value is RpcError`

## Properties

### \[symbol\]

```ts
[symbol]: boolean = true;
```

Defined in: [packages/iso-filecoin/src/rpc.js:43](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L43)

***

### cause

```ts
cause: unknown;
```

Defined in: [packages/iso-filecoin/src/rpc.js:48](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L48)

#### Overrides

```ts
Error.cause
```

***

### name

```ts
name: string = 'RpcError';
```

Defined in: [packages/iso-filecoin/src/rpc.js:45](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L45)

#### Overrides

```ts
Error.name
```
