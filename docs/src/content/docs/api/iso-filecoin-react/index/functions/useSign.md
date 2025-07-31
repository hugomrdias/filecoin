---
editUrl: false
next: true
prev: true
title: "useSign"
---

> **useSign**(): `UseMutationResult`\<[`Signature`](/api/iso-filecoin/signature/classes/signature/), [`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error), [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>, `unknown`\>

Defined in: [packages/iso-filecoin-react/src/wallet-provider.js:657](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/wallet-provider.js#L657)

Hook to sign a message

## Returns

`UseMutationResult`\<[`Signature`](/api/iso-filecoin/signature/classes/signature/), [`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error), [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>, `unknown`\>

## Example

```tsx twoslash

import { useSign } from 'iso-filecoin-react'
