---
editUrl: false
next: true
prev: true
title: "Schemas"
---

```ts
const Schemas: {
  lotusPrivateKey: ZodObject<{
     PrivateKey: ZodString;
     Type: ZodUnion<[ZodLiteral<"bls">, ZodLiteral<"secp256k1">]>;
    }, "strip", ZodTypeAny, {
     PrivateKey: string;
     Type: "bls" | "secp256k1";
    }, {
     PrivateKey: string;
     Type: "bls" | "secp256k1";
    }>;
};
```

Defined in: [packages/iso-filecoin/src/wallet.js:23](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/wallet.js#L23)

Schemas

## Type declaration

### lotusPrivateKey

```ts
lotusPrivateKey: ZodObject<{
  PrivateKey: ZodString;
  Type: ZodUnion<[ZodLiteral<"bls">, ZodLiteral<"secp256k1">]>;
 }, "strip", ZodTypeAny, {
  PrivateKey: string;
  Type: "bls" | "secp256k1";
 }, {
  PrivateKey: string;
  Type: "bls" | "secp256k1";
}>;
```
