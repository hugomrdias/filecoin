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

> **message**: `ZodObject`\<\{ `from`: `ZodString`; `gasFeeCap`: `ZodDefault`\<`ZodString`\>; `gasLimit`: `ZodDefault`\<`ZodInt`\>; `gasPremium`: `ZodDefault`\<`ZodString`\>; `method`: `ZodDefault`\<`ZodInt`\>; `nonce`: `ZodDefault`\<`ZodInt`\>; `params`: `ZodDefault`\<`ZodBase64`\>; `to`: `ZodString`; `value`: `ZodString`; `version`: `ZodDefault`\<`ZodLiteral`\<`0`\>\>; \}, `$strip`\> = `MessageSchema`

### messagePartial

> **messagePartial**: `ZodObject`\<\{ `from`: `ZodString`; `gasFeeCap`: `ZodOptional`\<`ZodDefault`\<`ZodString`\>\>; `gasLimit`: `ZodOptional`\<`ZodDefault`\<`ZodInt`\>\>; `gasPremium`: `ZodOptional`\<`ZodDefault`\<`ZodString`\>\>; `method`: `ZodOptional`\<`ZodDefault`\<`ZodInt`\>\>; `nonce`: `ZodOptional`\<`ZodDefault`\<`ZodInt`\>\>; `params`: `ZodOptional`\<`ZodDefault`\<`ZodBase64`\>\>; `to`: `ZodString`; `value`: `ZodString`; `version`: `ZodOptional`\<`ZodDefault`\<`ZodLiteral`\<`0`\>\>\>; \}, `$strip`\> = `MessageSchemaPartial`
