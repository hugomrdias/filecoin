---
editUrl: false
next: true
prev: true
title: "WalletHDConfig"
---

Defined in: [packages/iso-filecoin/src/adapters/types.ts:33](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/types.ts#L33)

## Extends

- [`WalletConfig`](/api/adapters/filsnap/interfaces/walletconfig/)

## Properties

### index?

```ts
optional index: number;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:38](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/types.ts#L38)

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

Defined in: [packages/iso-filecoin/src/adapters/types.ts:26](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/types.ts#L26)

Network

#### Default

```ts
mainnet
```

#### Inherited from

[`WalletConfig`](/api/adapters/filsnap/interfaces/walletconfig/).[`network`](/api/adapters/filsnap/interfaces/walletconfig/#network)

***

### seed

```ts
seed: Uint8Array;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:39](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/types.ts#L39)

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

#### Inherited from

[`WalletConfig`](/api/adapters/filsnap/interfaces/walletconfig/).[`signatureType`](/api/adapters/filsnap/interfaces/walletconfig/#signaturetype)
