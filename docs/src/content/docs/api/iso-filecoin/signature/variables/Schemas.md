---
editUrl: false
next: true
prev: true
title: "Schemas"
---

> `const` **Schemas**: `object`

Defined in: [packages/iso-filecoin/src/signature.js:22](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/signature.js#L22)

## Type declaration

### lotusSignature

> **lotusSignature**: `ZodObject`\<\{ `Data`: `ZodString`; `Type`: `ZodUnion`\<\[`ZodLiteral`\<`1`\>, `ZodLiteral`\<`2`\>\]\>; \}, `$strip`\>

### signature

> **signature**: `ZodObject`\<\{ `data`: `ZodPipe`\<`ZodType`\<`BufferSource`, `any`, `$ZodTypeInternals`\<`BufferSource`, `any`\>\>, `ZodTransform`\<[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>, `BufferSource`\>\>; `type`: `ZodEnum`\<\{ `BLS`: `"BLS"`; `SECP256K1`: `"SECP256K1"`; \}\>; \}, `$strip`\>
