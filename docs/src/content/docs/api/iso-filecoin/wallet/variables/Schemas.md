---
editUrl: false
next: true
prev: true
title: "Schemas"
---

> `const` **Schemas**: `object`

Defined in: [packages/iso-filecoin/src/wallet.js:23](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/wallet.js#L23)

Schemas

## Type declaration

### lotusPrivateKey

> **lotusPrivateKey**: `ZodObject`\<\{ `PrivateKey`: `ZodString`; `Type`: `ZodUnion`\<\[`ZodLiteral`\<`"bls"`\>, `ZodLiteral`\<`"secp256k1"`\>\]\>; \}, `"strip"`, `ZodTypeAny`, \{ `PrivateKey`: `string`; `Type`: `"bls"` \| `"secp256k1"`; \}, \{ `PrivateKey`: `string`; `Type`: `"bls"` \| `"secp256k1"`; \}\>
