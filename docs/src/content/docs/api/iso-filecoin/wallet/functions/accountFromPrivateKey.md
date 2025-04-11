---
editUrl: false
next: true
prev: true
title: "accountFromPrivateKey"
---

```ts
function accountFromPrivateKey(
   privateKey: Uint8Array<ArrayBufferLike>, 
   type: "SECP256K1" | "BLS", 
   network: Network, 
   path?: string): {
  address: IAddress;
  path: string;
  privateKey: Uint8Array;
  publicKey: Uint8Array;
  type: "SECP256K1" | "BLS";
};
```

Defined in: [packages/iso-filecoin/src/wallet.js:108](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/wallet.js#L108)

Get account from private key

Lotus BLS private key is little endian so you need to reverse the byte order. Use `lotusBlsPrivateKeyToBytes` to convert.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `privateKey` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `type` | `"SECP256K1"` \| `"BLS"` |
| `network` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |
| `path?` | `string` |

## Returns

### address

```ts
address: IAddress;
```

### path?

```ts
optional path: string;
```

Derivation path - only for HD wallets

### privateKey

```ts
privateKey: Uint8Array;
```

Private key - only for RAW and HD wallets

### publicKey

```ts
publicKey: Uint8Array;
```

### type

```ts
type: "SECP256K1" | "BLS";
```
