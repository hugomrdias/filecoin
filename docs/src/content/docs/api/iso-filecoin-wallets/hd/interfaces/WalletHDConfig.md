---
editUrl: false
next: true
prev: true
title: "WalletHDConfig"
---

Defined in: [packages/iso-filecoin-wallets/src/types.ts:38](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L38)

## Extends

- [`WalletConfig`](/api/iso-filecoin-wallets/filsnap/interfaces/walletconfig/)

## Properties

### index?

```ts
optional index: number;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:43](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L43)

Derivation path address index

#### Default

```ts
0
```

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

Defined in: [packages/iso-filecoin-wallets/src/types.ts:44](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L44)

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
