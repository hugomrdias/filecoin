---
editUrl: false
next: true
prev: true
title: "create"
---

```ts
function create(type: "SECP256K1" | "BLS", network: Network): {
  address: IAddress;
  path: string;
  privateKey: Uint8Array;
  publicKey: Uint8Array;
  type: "SECP256K1" | "BLS";
}
```

Defined in: [packages/iso-filecoin/src/wallet.js:156](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/wallet.js#L156)

Create account

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | `"SECP256K1"` \| `"BLS"` |  |
| `network` | [`Network`](/api/adapters/filsnap/type-aliases/network/) |  |

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
