---
editUrl: false
next: true
prev: true
title: "GasEstimateParams"
---

Defined in: [packages/iso-filecoin/src/types.ts:350](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L350)

## Properties

### maxFee?

> `optional` **maxFee**: `string`

Defined in: [packages/iso-filecoin/src/types.ts:362](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L362)

Max fee to pay for gas (attoFIL/gas units)

#### Default

```ts
'0'
```

***

### msg

> **msg**: `object`

Defined in: [packages/iso-filecoin/src/types.ts:356](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L356)

Message to estimate gas for

#### from

> **from**: `string`

#### gasFeeCap?

> `optional` **gasFeeCap**: `string`

#### gasLimit?

> `optional` **gasLimit**: `number`

#### gasPremium?

> `optional` **gasPremium**: `string`

#### method?

> `optional` **method**: `number`

#### nonce?

> `optional` **nonce**: `number`

#### params?

> `optional` **params**: `string`

Params encoded as base64pad

#### to

> **to**: `string`

#### value

> **value**: `string`

Value in attoFIL

#### version?

> `optional` **version**: `0`

#### See

https://lotus.filecoin.io/reference/lotus/gas/#gasestimatemessagegas
