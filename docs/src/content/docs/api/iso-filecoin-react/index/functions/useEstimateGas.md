---
editUrl: false
next: true
prev: true
title: "useEstimateGas"
---

```ts
function useEstimateGas(options: {
  maxFee: bigint;
  to: string;
  value: bigint;
}): UseQueryResult<{
  gas: bigint;
  symbol: string;
  total: bigint;
}, Error>;
```

Defined in: [packages/iso-filecoin-react/src/wallet-provider.js:574](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/wallet-provider.js#L574)

Estimate the gas for a message

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `maxFee`: `bigint`; `to`: `string`; `value`: `bigint`; \} | - |
| `options.maxFee?` | `bigint` | Max fee to pay for gas (attoFIL/gas units). Defaults to 0n. |
| `options.to` | `string` | Address to send the message to |
| `options.value` | `bigint` | Value to send with the message |

## Returns

`UseQueryResult`\<\{
  `gas`: `bigint`;
  `symbol`: `string`;
  `total`: `bigint`;
\}, [`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)\>
