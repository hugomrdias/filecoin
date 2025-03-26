---
editUrl: false
next: true
prev: true
title: "WalletHDMnemonicConfig"
---

Defined in: [packages/iso-filecoin-wallets/src/types.ts:46](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L46)

## Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`WalletHDConfig`](/api/iso-filecoin-wallets/hd/interfaces/wallethdconfig/), `"seed"`\>

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

#### Inherited from

```ts
Omit.index
```

***

### mnemonic

```ts
mnemonic: string;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:47](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L47)

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

```ts
Omit.network
```

***

### password?

```ts
optional password: string;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:48](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L48)

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

```ts
Omit.signatureType
```
