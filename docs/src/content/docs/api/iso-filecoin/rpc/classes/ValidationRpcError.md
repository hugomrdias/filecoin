---
editUrl: false
next: true
prev: true
title: "ValidationRpcError"
---

Defined in: [packages/iso-filecoin/src/rpc.js:96](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L96)

## Extends

- [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/)

## Constructors

### Constructor

> **new ValidationRpcError**(`cause`): `ValidationRpcError`

Defined in: [packages/iso-filecoin/src/rpc.js:106](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L106)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `cause` | `ZodError`\<`any`\> |

#### Returns

`ValidationRpcError`

#### Overrides

[`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/).[`constructor`](/api/iso-filecoin/rpc/classes/rpcerror/#constructor)

## Methods

### is()

> `static` **is**(`value`): `value is ValidationRpcError`

Defined in: [packages/iso-filecoin/src/rpc.js:117](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L117)

Check if a value is a ValidationRpcError

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `unknown` |

#### Returns

`value is ValidationRpcError`

#### Overrides

[`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/).[`is`](/api/iso-filecoin/rpc/classes/rpcerror/#is)

## Properties

### \[symbol\]

> **\[symbol\]**: `boolean` = `true`

Defined in: [packages/iso-filecoin/src/rpc.js:43](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L43)

#### Inherited from

[`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/).[`[symbol]`](/api/iso-filecoin/rpc/classes/rpcerror/#symbol)

***

### cause

> **cause**: `ZodError`\<`any`\>

Defined in: [packages/iso-filecoin/src/rpc.js:100](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L100)

#### Overrides

[`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/).[`cause`](/api/iso-filecoin/rpc/classes/rpcerror/#cause)

***

### name

> **name**: `string` = `'ValidationRpcError'`

Defined in: [packages/iso-filecoin/src/rpc.js:97](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L97)

#### Overrides

[`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/).[`name`](/api/iso-filecoin/rpc/classes/rpcerror/#name)
