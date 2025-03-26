---
editUrl: false
next: true
prev: true
title: "fromPublicKey"
---

```ts
function fromPublicKey(
   bytes: Uint8Array<ArrayBufferLike>, 
   network: Network, 
   type: "SECP256K1" | "BLS"): 
  | AddressSecp256k1
  | AddressBLS
```

Defined in: [packages/iso-filecoin/src/address.js:272](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L272)

Create address from public key bytes
Only for f1 SECP256K1 and f3 BLS

## Parameters

| Parameter | Type |
| ------ | ------ |
| `bytes` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `network` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |
| `type` | `"SECP256K1"` \| `"BLS"` |

## Returns

  \| [`AddressSecp256k1`](/api/iso-filecoin/address/classes/addresssecp256k1/)
  \| [`AddressBLS`](/api/iso-filecoin/address/classes/addressbls/)

IAddress
