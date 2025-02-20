---
editUrl: false
next: true
prev: true
title: "IAccount"
---

Defined in: [packages/iso-filecoin/src/types.ts:52](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L52)

Account interface

## Properties

### address

```ts
address: IAddress;
```

Defined in: [packages/iso-filecoin/src/types.ts:54](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L54)

***

### path?

```ts
optional path: string;
```

Defined in: [packages/iso-filecoin/src/types.ts:59](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L59)

Derivation path - only for HD wallets

***

### privateKey?

```ts
optional privateKey: Uint8Array<ArrayBufferLike>;
```

Defined in: [packages/iso-filecoin/src/types.ts:63](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L63)

Private key - only for RAW and HD wallets

***

### publicKey

```ts
publicKey: Uint8Array;
```

Defined in: [packages/iso-filecoin/src/types.ts:55](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L55)

***

### type

```ts
type: "SECP256K1" | "BLS";
```

Defined in: [packages/iso-filecoin/src/types.ts:53](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L53)
