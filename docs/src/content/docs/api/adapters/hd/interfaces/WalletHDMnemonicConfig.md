---
editUrl: false
next: true
prev: true
title: "WalletHDMnemonicConfig"
---

Defined in: [packages/iso-filecoin/src/adapters/types.ts:41](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L41)

## Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`WalletHDConfig`](/api/adapters/hd/interfaces/wallethdconfig/), `"seed"`\>

## Properties

### index?

```ts
optional index: number;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:38](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L38)

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

Defined in: [packages/iso-filecoin/src/adapters/types.ts:42](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L42)

***

### network?

```ts
optional network: Network;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:26](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L26)

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

Defined in: [packages/iso-filecoin/src/adapters/types.ts:43](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L43)

***

### signatureType?

```ts
optional signatureType: "SECP256K1" | "BLS";
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:31](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L31)

Signature type

#### Default

```ts
SECP256K1
```

#### Inherited from

```ts
Omit.signatureType
```
