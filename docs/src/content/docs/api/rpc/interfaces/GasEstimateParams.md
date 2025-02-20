---
editUrl: false
next: true
prev: true
title: "GasEstimateParams"
---

Defined in: [packages/iso-filecoin/src/types.ts:344](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L344)

## Properties

### maxFee?

```ts
optional maxFee: string;
```

Defined in: [packages/iso-filecoin/src/types.ts:356](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L356)

Max fee to pay for gas (attoFIL/gas units)

#### Default

```ts
'0'
```

***

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

Defined in: [packages/iso-filecoin/src/types.ts:350](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L350)

Message to estimate gas for

#### from

```ts
from: string;
```

#### gasFeeCap?

```ts
optional gasFeeCap: string;
```

#### gasLimit?

```ts
optional gasLimit: number;
```

#### gasPremium?

```ts
optional gasPremium: string;
```

#### method?

```ts
optional method: number;
```

#### nonce?

```ts
optional nonce: number;
```

#### params?

```ts
optional params: string;
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

#### version?

```ts
optional version: 0;
```

#### See

https://lotus.filecoin.io/reference/lotus/gas/#gasestimatemessagegas
