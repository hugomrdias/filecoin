---
editUrl: false
next: true
prev: true
title: "IAccount"
---

Defined in: packages/iso-filecoin/dist/src/types.d.ts:30

Account interface

## Properties

### address

```ts
address: IAddress;
```

Defined in: packages/iso-filecoin/dist/src/types.d.ts:32

***

### path?

```ts
optional path: string;
```

Defined in: packages/iso-filecoin/dist/src/types.d.ts:37

Derivation path - only for HD wallets

***

### privateKey?

```ts
optional privateKey: Uint8Array<ArrayBufferLike>;
```

Defined in: packages/iso-filecoin/dist/src/types.d.ts:41

Private key - only for RAW and HD wallets

***

### publicKey

```ts
publicKey: Uint8Array;
```

Defined in: packages/iso-filecoin/dist/src/types.d.ts:33

***

### type

```ts
type: "SECP256K1" | "BLS";
```

Defined in: packages/iso-filecoin/dist/src/types.d.ts:31
