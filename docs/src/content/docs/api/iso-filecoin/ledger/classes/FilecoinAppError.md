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

### Constructor

```ts
new FilecoinAppError(statusCode: number, data?: string): FilecoinAppError;
```

Defined in: [packages/iso-filecoin/src/ledger.js:158](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L158)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `statusCode` | `number` | The error status code coming from a Transport implementation |
| `data?` | `string` | The error message coming from a instruction call |

#### Returns

`FilecoinAppError`

#### Overrides

```ts
Error.constructor
```

## Methods

### captureStackTrace()

```ts
static captureStackTrace(targetObject: object, constructorOpt?: Function): void;
```

Defined in: node\_modules/.pnpm/@types+node@22.14.0/node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `targetObject` | `object` |
| `constructorOpt?` | [`Function`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) |

#### Returns

`void`

#### Inherited from

```ts
Error.captureStackTrace
```

## Properties

### cause?

```ts
optional cause: unknown;
```

Defined in: node\_modules/.pnpm/typescript@5.8.3/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

#### Inherited from

```ts
Error.cause
```

***

### message

```ts
message: string;
```

Defined in: node\_modules/.pnpm/typescript@5.8.3/node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

```ts
Error.message
```

***

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

### stack?

```ts
optional stack: string;
```

Defined in: node\_modules/.pnpm/typescript@5.8.3/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

```ts
Error.stack
```

***

### statusCode

```ts
statusCode: number;
```

Defined in: [packages/iso-filecoin/src/ledger.js:152](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L152)

***

### prepareStackTrace()?

```ts
static optional prepareStackTrace: (err: Error, stackTraces: CallSite[]) => any;
```

Defined in: node\_modules/.pnpm/@types+node@22.14.0/node\_modules/@types/node/globals.d.ts:143

Optional override for formatting stack traces

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `err` | [`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error) |
| `stackTraces` | `CallSite`[] |

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

```ts
Error.prepareStackTrace
```

***

### stackTraceLimit

```ts
static stackTraceLimit: number;
```

Defined in: node\_modules/.pnpm/@types+node@22.14.0/node\_modules/@types/node/globals.d.ts:145

#### Inherited from

```ts
Error.stackTraceLimit
```
