---
editUrl: false
next: true
prev: true
title: "MessageObj"
---

```ts
type MessageObj = {
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
};
```

Defined in: [packages/iso-filecoin/src/types.ts:22](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L22)

Message validation schema

## Type declaration

### from

```ts
from: string;
```

### gasFeeCap

```ts
gasFeeCap: string;
```

### gasLimit

```ts
gasLimit: number;
```

### gasPremium

```ts
gasPremium: string;
```

### method

```ts
method: number;
```

### nonce

```ts
nonce: number;
```

### params

```ts
params: string;
```

Params encoded as base64pad

### to

```ts
to: string;
```

### value

```ts
value: string;
```

Value in attoFIL

### version

```ts
version: 0;
```
