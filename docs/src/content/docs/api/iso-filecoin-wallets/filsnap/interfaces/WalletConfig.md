---
editUrl: false
next: true
prev: true
title: "WalletConfig"
---

Defined in: [packages/iso-filecoin-wallets/src/types.ts:26](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L26)

## Extended by

- [`WalletLedgerConfig`](/api/iso-filecoin-wallets/ledger/interfaces/walletledgerconfig/)
- [`WalletHDConfig`](/api/iso-filecoin-wallets/hd/interfaces/wallethdconfig/)

## Properties

### name?

```ts
optional name: string;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:41](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L41)

Wallet name

***

### network?

```ts
optional network: Network;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:31](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L31)

Network

#### Default

```ts
mainnet
```

***

### signatureType?

```ts
optional signatureType: "SECP256K1" | "BLS";
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:36](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L36)

Signature type

#### Default

```ts
SECP256K1
```
