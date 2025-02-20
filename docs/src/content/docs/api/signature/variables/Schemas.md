---
editUrl: false
next: true
prev: true
title: "Schemas"
---

```ts
const Schemas: {
  lotusSignature: ZodObject<{
     Data: ZodString;
     Type: ZodUnion<[ZodLiteral<1>, ZodLiteral<2>]>;
    }, "strip", ZodTypeAny, {
     Data: string;
     Type: 1 | 2;
    }, {
     Data: string;
     Type: 1 | 2;
    }>;
  signature: ZodObject<{
     data: ZodEffects<ZodType<BufferSource, ZodTypeDef, BufferSource>, Uint8Array<ArrayBufferLike>, BufferSource>;
     type: ZodEnum<["SECP256K1", "BLS"]>;
    }, "strip", ZodTypeAny, {
     data: Uint8Array<ArrayBufferLike>;
     type: "SECP256K1" | "BLS";
    }, {
     data: BufferSource;
     type: "SECP256K1" | "BLS";
    }>;
};
```

Defined in: [packages/iso-filecoin/src/signature.js:22](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/signature.js#L22)

## Type declaration

### lotusSignature

```ts
lotusSignature: ZodObject<{
  Data: ZodString;
  Type: ZodUnion<[ZodLiteral<1>, ZodLiteral<2>]>;
 }, "strip", ZodTypeAny, {
  Data: string;
  Type: 1 | 2;
 }, {
  Data: string;
  Type: 1 | 2;
}>;
```

### signature

```ts
signature: ZodObject<{
  data: ZodEffects<ZodType<BufferSource, ZodTypeDef, BufferSource>, Uint8Array<ArrayBufferLike>, BufferSource>;
  type: ZodEnum<["SECP256K1", "BLS"]>;
 }, "strip", ZodTypeAny, {
  data: Uint8Array<ArrayBufferLike>;
  type: "SECP256K1" | "BLS";
 }, {
  data: BufferSource;
  type: "SECP256K1" | "BLS";
}>;
```
