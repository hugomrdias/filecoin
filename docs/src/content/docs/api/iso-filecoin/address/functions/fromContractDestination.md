---
editUrl: false
next: true
prev: true
title: "fromContractDestination"
---

> **fromContractDestination**(`address`, `network`): [`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/)

Defined in: [packages/iso-filecoin/src/address.js:294](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L294)

Create an `Address` instance from a 0x-prefixed hex string address returned by `Address.toContractDestination()`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | `` `0x${string}` `` | The 0x-prefixed hex string address. |
| `network` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) | The network the address is on. |

## Returns

[`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/)
