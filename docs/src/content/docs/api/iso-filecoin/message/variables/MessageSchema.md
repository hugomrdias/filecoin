---
editUrl: false
next: true
prev: true
title: "MessageSchema"
---

```ts
const MessageSchema: ZodObject<{
  from: ZodString;
  gasFeeCap: ZodDefault<ZodString>;
  gasLimit: ZodDefault<ZodNumber>;
  gasPremium: ZodDefault<ZodString>;
  method: ZodDefault<ZodNumber>;
  nonce: ZodDefault<ZodNumber>;
  params: ZodDefault<ZodString>;
  to: ZodString;
  value: ZodEffects<ZodString, string, string>;
  version: ZodDefault<ZodLiteral<0>>;
}, "strip", ZodTypeAny, {
  from: string;
  gasFeeCap: string;
  gasLimit: number;
  gasPremium: string;
  method: number;
  nonce: number;
  params: string;
  to: string;
  value: string;
  version: 0;
}, {
  from: string;
  gasFeeCap: string;
  gasLimit: number;
  gasPremium: string;
  method: number;
  nonce: number;
  params: string;
  to: string;
  value: string;
  version: 0;
}>;
```

Defined in: [packages/iso-filecoin/src/message.js:17](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L17)

Message validation schema
