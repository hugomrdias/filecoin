---
editUrl: false
next: true
prev: true
title: "MaybeResult"
---

```ts
type MaybeResult<ResultType, ErrorType> = 
  | {
  error: ErrorType;
  result: undefined;
 }
  | {
  error: undefined;
  result: ResultType;
};
```

Defined in: node\_modules/.pnpm/iso-web@1.1.1/node\_modules/iso-web/dist/src/types.d.ts:30

Generic result with error

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `ResultType` | `unknown` |
| `ErrorType` | [`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error) |
