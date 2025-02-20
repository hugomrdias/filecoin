---
editUrl: false
next: true
prev: true
title: "FormatOptions"
---

```ts
type FormatOptions = BigNumber.Format & {
  decimalPlaces: number;
  roundingMode: BigNumber.RoundingMode;
};
```

Defined in: [packages/iso-filecoin/src/types.ts:404](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L404)

## Type declaration

### decimalPlaces?

```ts
optional decimalPlaces: number;
```

#### Default

```ts
18
```

#### See

https://mikemcl.github.io/bignumber.js/#decimal-places

### roundingMode?

```ts
optional roundingMode: BigNumber.RoundingMode;
```

#### Default

```ts
BigNumber.ROUND_HALF_DOWN
```

#### See

https://mikemcl.github.io/bignumber.js/#constructor-properties
