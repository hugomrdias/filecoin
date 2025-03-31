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

```ts
new ValidationRpcError(cause: ZodError<any>): ValidationRpcError
```

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

### captureStackTrace()

```ts
static captureStackTrace(targetObject: object, constructorOpt?: Function): void
```

Defined in: node\_modules/.pnpm/@types+node@22.13.14/node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `targetObject` | `object` |
| `constructorOpt`? | [`Function`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function) |

#### Returns

`void`

#### Inherited from

[`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/).[`captureStackTrace`](/api/iso-filecoin/rpc/classes/rpcerror/#capturestacktrace)

***

### is()

```ts
static is(value: unknown): value is ValidationRpcError
```

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

```ts
[symbol]: boolean = true;
```

Defined in: [packages/iso-filecoin/src/rpc.js:43](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L43)

#### Inherited from

[`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/).[`[symbol]`](/api/iso-filecoin/rpc/classes/rpcerror/#symbol)

***

### cause

```ts
cause: ZodError<any>;
```

Defined in: [packages/iso-filecoin/src/rpc.js:100](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L100)

#### Overrides

[`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/).[`cause`](/api/iso-filecoin/rpc/classes/rpcerror/#cause)

***

### message

```ts
message: string;
```

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

[`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/).[`message`](/api/iso-filecoin/rpc/classes/rpcerror/#message)

***

### name

```ts
name: string = 'ValidationRpcError';
```

Defined in: [packages/iso-filecoin/src/rpc.js:97](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L97)

#### Overrides

[`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/).[`name`](/api/iso-filecoin/rpc/classes/rpcerror/#name)

***

### stack?

```ts
optional stack: string;
```

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

[`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/).[`stack`](/api/iso-filecoin/rpc/classes/rpcerror/#stack)

***

### prepareStackTrace()?

```ts
static optional prepareStackTrace: (err: Error, stackTraces: CallSite[]) => any;
```

Defined in: node\_modules/.pnpm/@types+node@22.13.14/node\_modules/@types/node/globals.d.ts:143

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

[`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/).[`prepareStackTrace`](/api/iso-filecoin/rpc/classes/rpcerror/#preparestacktrace)

***

### stackTraceLimit

```ts
static stackTraceLimit: number;
```

Defined in: node\_modules/.pnpm/@types+node@22.13.14/node\_modules/@types/node/globals.d.ts:145

#### Inherited from

[`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/).[`stackTraceLimit`](/api/iso-filecoin/rpc/classes/rpcerror/#stacktracelimit)
