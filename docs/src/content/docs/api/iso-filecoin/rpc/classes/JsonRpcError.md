---
editUrl: false
next: true
prev: true
title: "JsonRpcError"
---

Defined in: [packages/iso-filecoin/src/rpc.js:71](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L71)

## Extends

- [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/)

## Constructors

### Constructor

> **new JsonRpcError**(`cause`): `JsonRpcError`

Defined in: [packages/iso-filecoin/src/rpc.js:81](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L81)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `cause` | [`JsonRpcError`](/api/iso-filecoin/types/interfaces/jsonrpcerror/) |

#### Returns

`JsonRpcError`

#### Overrides

[`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/).[`constructor`](/api/iso-filecoin/rpc/classes/rpcerror/#constructor)

## Methods

### is()

> `static` **is**(`value`): `value is JsonRpcError`

Defined in: [packages/iso-filecoin/src/rpc.js:91](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L91)

Check if a value is a JsonRpcError

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `unknown` |

#### Returns

`value is JsonRpcError`

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

> **cause**: [`JsonRpcError`](/api/iso-filecoin/types/interfaces/jsonrpcerror/)

Defined in: [packages/iso-filecoin/src/rpc.js:75](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L75)

#### Overrides

[`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/).[`cause`](/api/iso-filecoin/rpc/classes/rpcerror/#cause)

***

### name

> **name**: `string` = `'JsonRpcError'`

Defined in: [packages/iso-filecoin/src/rpc.js:72](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L72)

#### Overrides

[`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/).[`name`](/api/iso-filecoin/rpc/classes/rpcerror/#name)
