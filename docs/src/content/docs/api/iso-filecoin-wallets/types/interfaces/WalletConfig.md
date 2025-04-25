---
editUrl: false
next: true
prev: true
title: "WalletConfig"
---

Defined in: [packages/iso-filecoin-wallets/src/types.ts:26](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L26)

## Extended by

- [`WalletHDConfig`](/api/iso-filecoin-wallets/types/interfaces/wallethdconfig/)
- [`WalletLedgerConfig`](/api/iso-filecoin-wallets/types/interfaces/walletledgerconfig/)

## Properties

### name?

> `optional` **name**: `string`

Defined in: [packages/iso-filecoin-wallets/src/types.ts:41](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L41)

Wallet name

***

### network?

> `optional` **network**: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/)

Defined in: [packages/iso-filecoin-wallets/src/types.ts:31](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L31)

Network

#### Default

```ts
mainnet
```

***

### signatureType?

> `optional` **signatureType**: `"SECP256K1"` \| `"BLS"`

Defined in: [packages/iso-filecoin-wallets/src/types.ts:36](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L36)

Signature type

#### Default

```ts
SECP256K1
```
