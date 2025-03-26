---
editUrl: false
next: true
prev: true
title: "useAdapter"
---

```ts
function useAdapter(): Pick<WalletContextType, "reconnecting" | "adapter" | "network" | "loading" | "error">
```

Defined in: [packages/iso-filecoin-react/src/wallet-provider.js:308](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/wallet-provider.js#L308)

Hook to access the current wallet adapter and its state

## Returns

[`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)\<[`WalletContextType`](/api/iso-filecoin-react/types/type-aliases/walletcontexttype/), `"reconnecting"` \| `"adapter"` \| `"network"` \| `"loading"` \| `"error"`\>

Wallet adapter state

## Example

```tsx twoslash
// @allowUmdGlobalAccess

import { useAdapter } from 'iso-filecoin-react'

function App() {
  const { adapter, error, loading } = useAdapter()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>Current adapter: {adapter?.name}</div>
}
```
