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

> **lotusSignature**: `ZodObject`\<\{ `Data`: `ZodString`; `Type`: `ZodUnion`\<\[`ZodLiteral`\<`1`\>, `ZodLiteral`\<`2`\>\]\>; \}, `"strip"`, `ZodTypeAny`, \{ `Data`: `string`; `Type`: `1` \| `2`; \}, \{ `Data`: `string`; `Type`: `1` \| `2`; \}\>

### signature

> **signature**: `ZodObject`\<\{ `data`: `ZodEffects`\<`ZodType`\<`BufferSource`, `ZodTypeDef`, `BufferSource`\>, [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>, `BufferSource`\>; `type`: `ZodEnum`\<\[`"SECP256K1"`, `"BLS"`\]\>; \}, `"strip"`, `ZodTypeAny`, \{ `data`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>; `type`: `"SECP256K1"` \| `"BLS"`; \}, \{ `data`: `BufferSource`; `type`: `"SECP256K1"` \| `"BLS"`; \}\>
