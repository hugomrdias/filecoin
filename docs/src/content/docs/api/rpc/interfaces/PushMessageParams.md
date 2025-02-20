---
editUrl: false
next: true
prev: true
title: "PushMessageParams"
---

Defined in: [packages/iso-filecoin/src/types.ts:359](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L359)

## Properties

### msg

```ts
msg: {
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

Defined in: [packages/iso-filecoin/src/types.ts:360](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L360)

#### from

```ts
from: string;
```

#### gasFeeCap

```ts
gasFeeCap: string;
```

#### gasLimit

```ts
gasLimit: number;
```

#### gasPremium

```ts
gasPremium: string;
```

#### method

```ts
method: number;
```

#### nonce

```ts
nonce: number;
```

#### params

```ts
params: string;
```

Params encoded as base64pad

#### to

```ts
to: string;
```

#### value

```ts
value: string;
```

Value in attoFIL

#### version

```ts
version: 0;
```

***

### signature

```ts
signature: {
  data: Uint8Array<ArrayBufferLike>;
  type: "SECP256K1" | "BLS";
};
```

Defined in: [packages/iso-filecoin/src/types.ts:361](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L361)

#### data

```ts
data: Uint8Array<ArrayBufferLike> = zBuf;
```

#### type

```ts
type: "SECP256K1" | "BLS";
```
