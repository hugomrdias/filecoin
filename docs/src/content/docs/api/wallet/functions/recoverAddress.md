---
editUrl: false
next: true
prev: true
title: "recoverAddress"
---

```ts
function recoverAddress(
   signature: Signature, 
   data: Uint8Array<ArrayBufferLike>, 
   network: Network): 
  | AddressSecp256k1
  | AddressBLS
```

Defined in: [packages/iso-filecoin/src/wallet.js:331](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/wallet.js#L331)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `signature` | [`Signature`](/api/signature/classes/signature/) |  |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |  |
| `network` | [`Network`](/api/adapters/filsnap/type-aliases/network/) |  |

## Returns

  \| [`AddressSecp256k1`](/api/address/classes/addresssecp256k1/)
  \| [`AddressBLS`](/api/address/classes/addressbls/)
