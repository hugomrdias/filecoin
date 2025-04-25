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

- [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)
- [`ValidationRpcError`](/api/iso-filecoin/rpc/classes/validationrpcerror/)

## Constructors

### Constructor

> **new RpcError**(`message`, `options?`): `RpcError`

Defined in: [packages/iso-filecoin/src/rpc.js:55](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L55)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |
| `options?` | `ErrorOptions` |

#### Returns

`RpcError`

#### Overrides

`Error.constructor`

## Methods

### is()

> `static` **is**(`value`): `value is RpcError`

Defined in: [packages/iso-filecoin/src/rpc.js:66](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L66)

Check if a value is a RequestError

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `unknown` |

#### Returns

`value is RpcError`

## Properties

### \[symbol\]

> **\[symbol\]**: `boolean` = `true`

Defined in: [packages/iso-filecoin/src/rpc.js:43](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L43)

***

### cause

> **cause**: `unknown`

Defined in: [packages/iso-filecoin/src/rpc.js:48](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L48)

#### Overrides

`Error.cause`

***

### name

> **name**: `string` = `'RpcError'`

Defined in: [packages/iso-filecoin/src/rpc.js:45](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L45)

#### Overrides

`Error.name`
