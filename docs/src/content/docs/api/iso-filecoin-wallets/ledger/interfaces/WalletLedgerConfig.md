---
editUrl: false
next: true
prev: true
title: "WalletLedgerConfig"
---

Defined in: [packages/iso-filecoin-wallets/src/types.ts:51](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L51)

## Extends

- [`WalletConfig`](/api/iso-filecoin-wallets/filsnap/interfaces/walletconfig/)

## Properties

### index?

```ts
optional index: number;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:56](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L56)

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

***

### transport

```ts
transport: {
  create: () => Promise<Transport>;
  isSupported: () => Promise<boolean>;
};
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:57](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L57)

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
