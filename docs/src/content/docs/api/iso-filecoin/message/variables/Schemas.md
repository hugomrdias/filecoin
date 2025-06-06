---
editUrl: false
next: true
prev: true
title: "Schemas"
---

> `const` **Schemas**: `object`

Defined in: [packages/iso-filecoin/src/message.js:51](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L51)

## Type declaration

### message

> **message**: `ZodObject`\<\{ `from`: `ZodString`; `gasFeeCap`: `ZodDefault`\<`ZodString`\>; `gasLimit`: `ZodDefault`\<`ZodNumber`\>; `gasPremium`: `ZodDefault`\<`ZodString`\>; `method`: `ZodDefault`\<`ZodNumber`\>; `nonce`: `ZodDefault`\<`ZodNumber`\>; `params`: `ZodDefault`\<`ZodString`\>; `to`: `ZodString`; `value`: `ZodEffects`\<`ZodString`, `string`, `string`\>; `version`: `ZodDefault`\<`ZodLiteral`\<`0`\>\>; \}, `"strip"`, `ZodTypeAny`, \{ `from`: `string`; `gasFeeCap`: `string`; `gasLimit`: `number`; `gasPremium`: `string`; `method`: `number`; `nonce`: `number`; `params`: `string`; `to`: `string`; `value`: `string`; `version`: `0`; \}, \{ `from`: `string`; `gasFeeCap?`: `string`; `gasLimit?`: `number`; `gasPremium?`: `string`; `method?`: `number`; `nonce?`: `number`; `params?`: `string`; `to`: `string`; `value`: `string`; `version?`: `0`; \}\> = `MessageSchema`

### messagePartial

> **messagePartial**: `ZodObject`\<\{ `from`: `ZodString`; `gasFeeCap`: `ZodOptional`\<`ZodDefault`\<`ZodString`\>\>; `gasLimit`: `ZodOptional`\<`ZodDefault`\<`ZodNumber`\>\>; `gasPremium`: `ZodOptional`\<`ZodDefault`\<`ZodString`\>\>; `method`: `ZodOptional`\<`ZodDefault`\<`ZodNumber`\>\>; `nonce`: `ZodOptional`\<`ZodDefault`\<`ZodNumber`\>\>; `params`: `ZodOptional`\<`ZodDefault`\<`ZodString`\>\>; `to`: `ZodString`; `value`: `ZodEffects`\<`ZodString`, `string`, `string`\>; `version`: `ZodOptional`\<`ZodDefault`\<`ZodLiteral`\<`0`\>\>\>; \}, `"strip"`, `ZodTypeAny`, \{ `from`: `string`; `gasFeeCap?`: `string`; `gasLimit?`: `number`; `gasPremium?`: `string`; `method?`: `number`; `nonce?`: `number`; `params?`: `string`; `to`: `string`; `value`: `string`; `version?`: `0`; \}, \{ `from`: `string`; `gasFeeCap?`: `string`; `gasLimit?`: `number`; `gasPremium?`: `string`; `method?`: `number`; `nonce?`: `number`; `params?`: `string`; `to`: `string`; `value`: `string`; `version?`: `0`; \}\> = `MessageSchemaPartial`
