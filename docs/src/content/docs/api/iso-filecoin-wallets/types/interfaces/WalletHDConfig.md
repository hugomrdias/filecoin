---
editUrl: false
next: true
prev: true
title: "WalletHDConfig"
---

Defined in: [packages/iso-filecoin-wallets/src/types.ts:43](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L43)

## Extends

- [`WalletConfig`](/api/iso-filecoin-wallets/types/interfaces/walletconfig/)

## Properties

### index?

> `optional` **index**: `number`

Defined in: [packages/iso-filecoin-wallets/src/types.ts:48](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L48)

Derivation path address index

#### Default

```ts
0
```

***

### name?

> `optional` **name**: `string`

Defined in: [packages/iso-filecoin-wallets/src/types.ts:41](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L41)

Wallet name

#### Inherited from

[`WalletConfig`](/api/iso-filecoin-wallets/types/interfaces/walletconfig/).[`name`](/api/iso-filecoin-wallets/types/interfaces/walletconfig/#name)

***

### network?

> `optional` **network**: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/)

Defined in: [packages/iso-filecoin-wallets/src/types.ts:31](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L31)

Network

#### Default

```ts
mainnet
```

#### Inherited from

[`WalletConfig`](/api/iso-filecoin-wallets/types/interfaces/walletconfig/).[`network`](/api/iso-filecoin-wallets/types/interfaces/walletconfig/#network)

***

### seed?

> `optional` **seed**: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

Defined in: [packages/iso-filecoin-wallets/src/types.ts:49](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L49)

***

### signatureType?

> `optional` **signatureType**: `"SECP256K1"` \| `"BLS"`

Defined in: [packages/iso-filecoin-wallets/src/types.ts:36](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L36)

Signature type

#### Default

```ts
SECP256K1
```

#### Inherited from

[`WalletConfig`](/api/iso-filecoin-wallets/types/interfaces/walletconfig/).[`signatureType`](/api/iso-filecoin-wallets/types/interfaces/walletconfig/#signaturetype)
