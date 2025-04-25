---
editUrl: false
next: true
prev: true
title: "getCache"
---

> **getCache**(`cache`): `KV`

Defined in: [packages/iso-filecoin/src/utils.js:280](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/utils.js#L280)

Get cache instance from cache config

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `cache` | [`Cache`](/api/iso-filecoin/types/type-aliases/cache/) | Cache config |

## Returns

`KV`

## Example

```js
import { getCache } from 'iso-filecoin'
import { MemoryDriver } from 'iso-kv/drivers/memory.js'

// use default memory driver
const cache = getCache(true)

// use custom driver
const customCache = getCache(new MemoryDriver())
```
