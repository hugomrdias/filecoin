---
editUrl: false
next: true
prev: true
title: "fromContractDestination"
---

```ts
function fromContractDestination(address: `0x${string}`, network: Network): IAddress
```

Defined in: [packages/iso-filecoin/src/address.js:294](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L294)

Create an `Address` instance from a 0x-prefixed hex string address returned by `Address.toContractDestination()`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | `` `0x${string}` `` | The 0x-prefixed hex string address. |
| `network` | [`Network`](/api/adapters/filsnap/type-aliases/network/) | The network the address is on. |

## Returns

[`IAddress`](/api/address/interfaces/iaddress/)
