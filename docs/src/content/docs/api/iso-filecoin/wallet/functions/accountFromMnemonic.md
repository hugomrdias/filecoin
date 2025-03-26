---
editUrl: false
next: true
prev: true
title: "accountFromMnemonic"
---

```ts
function accountFromMnemonic(
   mnemonic: string, 
   type: "SECP256K1" | "BLS", 
   path: string, 
   password?: string, 
   network?: Network): {
  address: IAddress;
  path: string;
  privateKey: Uint8Array;
  publicKey: Uint8Array;
  type: "SECP256K1" | "BLS";
}
```

Defined in: [packages/iso-filecoin/src/wallet.js:60](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/wallet.js#L60)

Get HD account from mnemonic

## Parameters

| Parameter | Type |
| ------ | ------ |
| `mnemonic` | `string` |
| `type` | `"SECP256K1"` \| `"BLS"` |
| `path` | `string` |
| `password`? | `string` |
| `network`? | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |

## Returns

```ts
{
  address: IAddress;
  path: string;
  privateKey: Uint8Array;
  publicKey: Uint8Array;
  type: "SECP256K1" | "BLS";
}
```

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
