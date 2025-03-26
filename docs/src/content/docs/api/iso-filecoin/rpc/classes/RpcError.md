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

```ts
new RpcError(message: string, options?: ErrorOptions): RpcError
```

Defined in: [packages/iso-filecoin/src/rpc.js:55](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L55)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |
| `options`? | `ErrorOptions` |

#### Returns

`RpcError`

#### Overrides

```ts
Error.constructor
```

## Methods

### captureStackTrace()

```ts
static captureStackTrace(targetObject: object, constructorOpt?: Function): void
```

Defined in: node\_modules/.pnpm/@types+node@22.13.13/node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `targetObject` | `object` |
| `constructorOpt`? | [`Function`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) |

#### Returns

`void`

#### Inherited from

```ts
Error.captureStackTrace
```

***

### is()

```ts
static is(value: unknown): value is RpcError
```

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

### message

```ts
message: string;
```

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

```ts
Error.message
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

***

### stack?

```ts
optional stack: string;
```

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

```ts
Error.stack
```

***

### prepareStackTrace()?

```ts
static optional prepareStackTrace: (err: Error, stackTraces: CallSite[]) => any;
```

Defined in: node\_modules/.pnpm/@types+node@22.13.13/node\_modules/@types/node/globals.d.ts:143

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

Defined in: node\_modules/.pnpm/@types+node@22.13.13/node\_modules/@types/node/globals.d.ts:145

#### Inherited from

```ts
Error.stackTraceLimit
```
