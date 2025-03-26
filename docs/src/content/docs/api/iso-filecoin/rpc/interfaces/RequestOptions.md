---
editUrl: false
next: true
prev: true
title: "RequestOptions"
---

Defined in: node\_modules/.pnpm/iso-web@1.1.0/node\_modules/iso-web/dist/src/types.d.ts:4

## Properties

### body?

```ts
optional body: null | BodyInit;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.0/node\_modules/iso-web/dist/src/types.d.ts:7

***

### fetch()?

```ts
optional fetch: (input: URL | RequestInfo, init?: RequestInit) => Promise<Response>(input: 
  | string
  | URL
| Request, init?: RequestInit) => Promise<Response>;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.0/node\_modules/iso-web/dist/src/types.d.ts:5

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`URL`](https://developer.mozilla.org/docs/Web/API/URL) \| `RequestInfo` |
| `init`? | `RequestInit` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Response`](https://developer.mozilla.org/docs/Web/API/Response)\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | \| `string` \| [`URL`](https://developer.mozilla.org/docs/Web/API/URL) \| [`Request`](https://developer.mozilla.org/docs/Web/API/Request) |
| `init`? | `RequestInit` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Response`](https://developer.mozilla.org/docs/Web/API/Response)\>

***

### headers?

```ts
optional headers: HeadersInit;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.0/node\_modules/iso-web/dist/src/types.d.ts:9

***

### json?

```ts
optional json: Jsonifiable;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.0/node\_modules/iso-web/dist/src/types.d.ts:14

***

### keepalive?

```ts
optional keepalive: boolean;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.0/node\_modules/iso-web/dist/src/types.d.ts:11

***

### method?

```ts
optional method: string;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.0/node\_modules/iso-web/dist/src/types.d.ts:8

***

### redirect?

```ts
optional redirect: RequestRedirect;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.0/node\_modules/iso-web/dist/src/types.d.ts:6

***

### retry?

```ts
optional retry: Options;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.0/node\_modules/iso-web/dist/src/types.d.ts:13

***

### signal?

```ts
optional signal: AbortSignal;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.0/node\_modules/iso-web/dist/src/types.d.ts:10

***

### timeout?

```ts
optional timeout: number;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.0/node\_modules/iso-web/dist/src/types.d.ts:12
