---
editUrl: false
next: true
prev: true
title: "WalletLedgerConfig"
---

Defined in: [packages/iso-filecoin/src/adapters/types.ts:46](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/types.ts#L46)

## Extends

- [`WalletConfig`](/api/adapters/filsnap/interfaces/walletconfig/)

## Properties

### index?

```ts
optional index: number;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:51](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/types.ts#L51)

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

***

### transport

```ts
transport: {
  create: () => Promise<Transport>;
  isSupported: () => Promise<boolean>;
};
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:52](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/types.ts#L52)

#### create()

```ts
create: () => Promise<Transport>;
```

##### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`Transport`\>

#### isSupported()

```ts
isSupported: () => Promise<boolean>;
```

##### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`boolean`\>
