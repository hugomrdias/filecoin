---
editUrl: false
next: true
prev: true
title: "WalletConfig"
---

Defined in: [packages/iso-filecoin/src/adapters/types.ts:21](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/types.ts#L21)

## Extended by

- [`WalletHDConfig`](/api/adapters/hd/interfaces/wallethdconfig/)
- [`WalletLedgerConfig`](/api/adapters/ledger/interfaces/walletledgerconfig/)

## Properties

### network?

```ts
optional network: Network;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:26](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/types.ts#L26)

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

Defined in: [packages/iso-filecoin/src/adapters/types.ts:31](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/types.ts#L31)

Signature type

#### Default

```ts
SECP256K1
```
