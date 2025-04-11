---
editUrl: false
next: true
prev: true
title: "accountFromSeed"
---

```ts
function accountFromSeed(
   seed: Uint8Array<ArrayBufferLike>, 
   type: "SECP256K1" | "BLS", 
   path: string, 
   network?: Network): {
  address: IAddress;
  path: string;
  privateKey: Uint8Array;
  publicKey: Uint8Array;
  type: "SECP256K1" | "BLS";
};
```

Defined in: [packages/iso-filecoin/src/wallet.js:74](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/wallet.js#L74)

Get HD account from seed

## Parameters

| Parameter | Type |
| ------ | ------ |
| `seed` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `type` | `"SECP256K1"` \| `"BLS"` |
| `path` | `string` |
| `network?` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |

## Returns

### address

```ts
address: IAddress;
```

### path

```ts
path: string;
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
