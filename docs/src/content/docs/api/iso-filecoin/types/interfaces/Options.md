---
editUrl: false
next: true
prev: true
title: "Options"
---

Defined in: [packages/iso-filecoin/src/types.ts:231](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L231)

## Properties

### api

> **api**: `string` \| [`URL`](https://developer.mozilla.org/docs/Web/API/URL)

Defined in: [packages/iso-filecoin/src/types.ts:233](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L233)

***

### fetch()?

> `optional` **fetch**: \{(`input`, `init?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Response`](https://developer.mozilla.org/docs/Web/API/Response)\>; (`input`, `init?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Response`](https://developer.mozilla.org/docs/Web/API/Response)\>; \}

Defined in: [packages/iso-filecoin/src/types.ts:235](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L235)

#### Call Signature

> (`input`, `init?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Response`](https://developer.mozilla.org/docs/Web/API/Response)\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`URL`](https://developer.mozilla.org/docs/Web/API/URL) \| `RequestInfo` |
| `init?` | `RequestInit` |

##### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Response`](https://developer.mozilla.org/docs/Web/API/Response)\>

#### Call Signature

> (`input`, `init?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Response`](https://developer.mozilla.org/docs/Web/API/Response)\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `string` \| [`URL`](https://developer.mozilla.org/docs/Web/API/URL) \| [`Request`](https://developer.mozilla.org/docs/Web/API/Request) |
| `init?` | `RequestInit` |

##### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Response`](https://developer.mozilla.org/docs/Web/API/Response)\>

***

### network?

> `optional` **network**: [`Network`](/api/iso-filecoin/types/type-aliases/network/)

Defined in: [packages/iso-filecoin/src/types.ts:234](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L234)

***

### token?

> `optional` **token**: `string`

Defined in: [packages/iso-filecoin/src/types.ts:232](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L232)
