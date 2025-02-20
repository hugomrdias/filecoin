---
editUrl: false
next: true
prev: true
title: "Options"
---

Defined in: [packages/iso-filecoin/src/types.ts:225](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L225)

## Properties

### api

```ts
api: string | URL;
```

Defined in: [packages/iso-filecoin/src/types.ts:227](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L227)

***

### fetch()?

```ts
optional fetch: (input: URL | RequestInfo, init?: RequestInit) => Promise<Response>(input: 
  | string
  | URL
| Request, init?: RequestInit) => Promise<Response>;
```

Defined in: [packages/iso-filecoin/src/types.ts:229](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L229)

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

### network?

```ts
optional network: Network;
```

Defined in: [packages/iso-filecoin/src/types.ts:228](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L228)

***

### token?

```ts
optional token: string;
```

Defined in: [packages/iso-filecoin/src/types.ts:226](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L226)
