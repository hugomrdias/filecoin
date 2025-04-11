---
editUrl: false
next: true
prev: true
title: "useSendMessage"
---

```ts
function useSendMessage(): UseMutationResult<CID, Error, {
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
}, unknown>;
```

Defined in: [packages/iso-filecoin-react/src/wallet-provider.js:609](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/wallet-provider.js#L609)

## Returns

`UseMutationResult`\<[`CID`](/api/iso-filecoin/types/type-aliases/cid/), [`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error), \{
  `from`: `string`;
  `gasFeeCap`: `string`;
  `gasLimit`: `number`;
  `gasPremium`: `string`;
  `method`: `number`;
  `nonce`: `number`;
  `params`: `string`;
  `to`: `string`;
  `value`: `string`;
  `version`: `0`;
\}, `unknown`\>
