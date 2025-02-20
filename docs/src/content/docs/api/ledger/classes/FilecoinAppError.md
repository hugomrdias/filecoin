---
editUrl: false
next: true
prev: true
title: "FilecoinAppError"
---

Defined in: [packages/iso-filecoin/src/ledger.js:149](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L149)

Filecoin app error

## Extends

- [`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)

## Constructors

### new FilecoinAppError()

```ts
new FilecoinAppError(statusCode: number, data?: string): FilecoinAppError
```

Defined in: [packages/iso-filecoin/src/ledger.js:158](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L158)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `statusCode` | `number` | The error status code coming from a Transport implementation |
| `data`? | `string` | The error message coming from a instruction call |

#### Returns

[`FilecoinAppError`](/api/ledger/classes/filecoinapperror/)

#### Overrides

```ts
Error.constructor
```

## Properties

### name

```ts
name: string = 'FilecoinAppError';
```

Defined in: [packages/iso-filecoin/src/ledger.js:150](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L150)

#### Overrides

```ts
Error.name
```

***

### statusCode

```ts
statusCode: number;
```

Defined in: [packages/iso-filecoin/src/ledger.js:152](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L152)
