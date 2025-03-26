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

Defined in: [packages/iso-filecoin/src/types.ts:409](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L409)

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
