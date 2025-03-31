---
editUrl: false
next: true
prev: true
title: "WalletHDConfig"
---

Defined in: [packages/iso-filecoin-wallets/src/types.ts:43](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L43)

## Extends

- [`WalletConfig`](/api/iso-filecoin-wallets/filsnap/interfaces/walletconfig/)

## Properties

### index?

```ts
optional index: number;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:48](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L48)

Derivation path address index

#### Default

```ts
0
```

***

### name?

```ts
optional name: string;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:41](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L41)

Wallet name

#### Inherited from

[`WalletConfig`](/api/iso-filecoin-wallets/filsnap/interfaces/walletconfig/).[`name`](/api/iso-filecoin-wallets/filsnap/interfaces/walletconfig/#name)

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

#### Inherited from

[`WalletConfig`](/api/iso-filecoin-wallets/filsnap/interfaces/walletconfig/).[`network`](/api/iso-filecoin-wallets/filsnap/interfaces/walletconfig/#network)

***

### seed?

```ts
optional seed: Uint8Array<ArrayBufferLike>;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:49](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L49)

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

#### Inherited from

[`WalletConfig`](/api/iso-filecoin-wallets/filsnap/interfaces/walletconfig/).[`signatureType`](/api/iso-filecoin-wallets/filsnap/interfaces/walletconfig/#signaturetype)
