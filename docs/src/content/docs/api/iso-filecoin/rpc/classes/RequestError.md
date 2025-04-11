---
editUrl: false
next: true
prev: true
title: "RequestError"
---

Defined in: node\_modules/.pnpm/iso-web@1.1.1/node\_modules/iso-web/dist/src/http.d.ts:170

## Extends

- [`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)

## Extended by

- [`AbortError`](/api/iso-filecoin/rpc/classes/aborterror/)
- [`HttpError`](/api/iso-filecoin/rpc/classes/httperror/)
- [`JsonError`](/api/iso-filecoin/rpc/classes/jsonerror/)
- [`NetworkError`](/api/iso-filecoin/rpc/classes/networkerror/)
- [`RetryError`](/api/iso-filecoin/rpc/classes/retryerror/)
- [`TimeoutError`](/api/iso-filecoin/rpc/classes/timeouterror/)

## Constructors

### Constructor

```ts
new RequestError(message: string, options?: ErrorOptions): RequestError;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.1/node\_modules/iso-web/dist/src/http.d.ts:183

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |
| `options?` | `ErrorOptions` |

#### Returns

`RequestError`

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

***

### is()

```ts
static is(value: unknown): value is RequestError;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.1/node\_modules/iso-web/dist/src/http.d.ts:177

Check if a value is a RequestError

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `unknown` |

#### Returns

`value is RequestError`

## Properties

### \[symbol\]

```ts
[symbol]: boolean;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.1/node\_modules/iso-web/dist/src/http.d.ts:187

***

### cause

```ts
cause: unknown;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.1/node\_modules/iso-web/dist/src/http.d.ts:185

#### Overrides

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
name: string;
```

Defined in: node\_modules/.pnpm/typescript@5.8.3/node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

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
