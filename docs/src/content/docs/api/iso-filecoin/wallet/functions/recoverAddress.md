---
editUrl: false
next: true
prev: true
title: "recoverAddress"
---

> **recoverAddress**(`signature`, `data`, `network`): [`AddressSecp256k1`](/api/iso-filecoin/address/classes/addresssecp256k1/) \| [`AddressBLS`](/api/iso-filecoin/address/classes/addressbls/)

Defined in: [packages/iso-filecoin/src/wallet.js:366](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/wallet.js#L366)

## Parameters

| Parameter | Type |
| ------ | ------ |
| `signature` | [`Signature`](/api/iso-filecoin/signature/classes/signature/) |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `network` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |

## Returns

[`AddressSecp256k1`](/api/iso-filecoin/address/classes/addresssecp256k1/) \| [`AddressBLS`](/api/iso-filecoin/address/classes/addressbls/)
