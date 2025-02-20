---
editUrl: false
next: true
prev: true
title: "ValidationRpcError"
---

Defined in: [packages/iso-filecoin/src/rpc.js:96](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L96)

## Extends

- [`RpcError`](/api/rpc/classes/rpcerror/)

## Constructors

### new ValidationRpcError()

```ts
new ValidationRpcError(cause: ZodError<any>): ValidationRpcError
```

Defined in: [packages/iso-filecoin/src/rpc.js:106](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L106)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `cause` | `ZodError`\<`any`\> |  |

#### Returns

[`ValidationRpcError`](/api/rpc/classes/validationrpcerror/)

#### Overrides

[`RpcError`](/api/rpc/classes/rpcerror/).[`constructor`](/api/rpc/classes/rpcerror/#constructors)

## Methods

### is()

```ts
static is(value: unknown): value is ValidationRpcError
```

Defined in: [packages/iso-filecoin/src/rpc.js:117](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L117)

Check if a value is a ValidationRpcError

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `unknown` |  |

#### Returns

`value is ValidationRpcError`

#### Overrides

[`RpcError`](/api/rpc/classes/rpcerror/).[`is`](/api/rpc/classes/rpcerror/#is)

## Properties

### \[symbol\]

```ts
[symbol]: boolean = true;
```

Defined in: [packages/iso-filecoin/src/rpc.js:43](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L43)

#### Inherited from

[`RpcError`](/api/rpc/classes/rpcerror/).[`[symbol]`](/api/rpc/classes/rpcerror/#symbol)

***

### cause

```ts
cause: ZodError<any>;
```

Defined in: [packages/iso-filecoin/src/rpc.js:100](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L100)

#### Overrides

[`RpcError`](/api/rpc/classes/rpcerror/).[`cause`](/api/rpc/classes/rpcerror/#cause)

***

### name

```ts
name: string = 'ValidationRpcError';
```

Defined in: [packages/iso-filecoin/src/rpc.js:97](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L97)

#### Overrides

[`RpcError`](/api/rpc/classes/rpcerror/).[`name`](/api/rpc/classes/rpcerror/#name)
