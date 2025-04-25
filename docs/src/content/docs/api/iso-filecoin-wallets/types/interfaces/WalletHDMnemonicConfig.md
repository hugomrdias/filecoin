---
editUrl: false
next: true
prev: true
title: "WalletHDMnemonicConfig"
---

Defined in: [packages/iso-filecoin-wallets/src/types.ts:51](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L51)

## Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`WalletHDConfig`](/api/iso-filecoin-wallets/types/interfaces/wallethdconfig/), `"seed"`\>

## Properties

### index?

> `optional` **index**: `number`

Defined in: [packages/iso-filecoin-wallets/src/types.ts:48](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L48)

Derivation path address index

#### Default

```ts
0
```

#### Inherited from

`Omit.index`

***

### mnemonic

> **mnemonic**: `string`

Defined in: [packages/iso-filecoin-wallets/src/types.ts:52](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L52)

***

### name?

> `optional` **name**: `string`

Defined in: [packages/iso-filecoin-wallets/src/types.ts:41](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L41)

Wallet name

#### Inherited from

`Omit.name`

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

`Omit.network`

***

### password?

> `optional` **password**: `string`

Defined in: [packages/iso-filecoin-wallets/src/types.ts:53](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L53)

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

`Omit.signatureType`
