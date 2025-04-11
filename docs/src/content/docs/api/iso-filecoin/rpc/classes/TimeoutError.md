---
editUrl: false
next: true
prev: true
title: "TimeoutError"
---

Defined in: node\_modules/.pnpm/iso-web@1.1.1/node\_modules/iso-web/dist/src/http.d.ts:209

## Extends

- [`RequestError`](/api/iso-filecoin/rpc/classes/requesterror/)

## Constructors

### Constructor

```ts
new TimeoutError(timeout: number, options?: ErrorOptions): TimeoutError;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.1/node\_modules/iso-web/dist/src/http.d.ts:215

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `timeout` | `number` |
| `options?` | `ErrorOptions` |

#### Returns

`TimeoutError`

#### Overrides

[`RequestError`](/api/iso-filecoin/rpc/classes/requesterror/).[`constructor`](/api/iso-filecoin/rpc/classes/requesterror/#constructor)

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

[`RequestError`](/api/iso-filecoin/rpc/classes/requesterror/).[`captureStackTrace`](/api/iso-filecoin/rpc/classes/requesterror/#capturestacktrace)

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

#### Inherited from

[`RequestError`](/api/iso-filecoin/rpc/classes/requesterror/).[`is`](/api/iso-filecoin/rpc/classes/requesterror/#is)

## Properties

### \[symbol\]

```ts
[symbol]: boolean;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.1/node\_modules/iso-web/dist/src/http.d.ts:187

#### Inherited from

[`RequestError`](/api/iso-filecoin/rpc/classes/requesterror/).[`[symbol]`](/api/iso-filecoin/rpc/classes/requesterror/#symbol)

***

### cause

```ts
cause: unknown;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.1/node\_modules/iso-web/dist/src/http.d.ts:185

#### Inherited from

[`RequestError`](/api/iso-filecoin/rpc/classes/requesterror/).[`cause`](/api/iso-filecoin/rpc/classes/requesterror/#cause)

***

### message

```ts
message: string;
```

Defined in: node\_modules/.pnpm/typescript@5.8.3/node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

[`RequestError`](/api/iso-filecoin/rpc/classes/requesterror/).[`message`](/api/iso-filecoin/rpc/classes/requesterror/#message)

***

### name

```ts
name: string;
```

Defined in: node\_modules/.pnpm/typescript@5.8.3/node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

[`RequestError`](/api/iso-filecoin/rpc/classes/requesterror/).[`name`](/api/iso-filecoin/rpc/classes/requesterror/#name)

***

### stack?

```ts
optional stack: string;
```

Defined in: node\_modules/.pnpm/typescript@5.8.3/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

[`RequestError`](/api/iso-filecoin/rpc/classes/requesterror/).[`stack`](/api/iso-filecoin/rpc/classes/requesterror/#stack)

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

[`RequestError`](/api/iso-filecoin/rpc/classes/requesterror/).[`prepareStackTrace`](/api/iso-filecoin/rpc/classes/requesterror/#preparestacktrace)

***

### stackTraceLimit

```ts
static stackTraceLimit: number;
```

Defined in: node\_modules/.pnpm/@types+node@22.14.0/node\_modules/@types/node/globals.d.ts:145

#### Inherited from

[`RequestError`](/api/iso-filecoin/rpc/classes/requesterror/).[`stackTraceLimit`](/api/iso-filecoin/rpc/classes/requesterror/#stacktracelimit)
