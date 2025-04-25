---
editUrl: false
next: true
prev: true
title: "useConnect"
---

> **useConnect**(): `UseMutationResult`\<[`AccountNetwork`](/api/iso-filecoin-react/types/interfaces/accountnetwork/), [`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error), \{ `adapter`: [`WalletAdapter`](/api/iso-filecoin-react/index/interfaces/walletadapter/); \}, `void`\> & [`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)\<[`FilecoinContextType`](/api/iso-filecoin-react/types/type-aliases/filecoincontexttype/), `"adapter"` \| `"adapters"` \| `"loading"`\>

Defined in: [packages/iso-filecoin-react/src/wallet-provider.js:426](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/wallet-provider.js#L426)

Hook to connect a wallet adapter

## Returns

`UseMutationResult`\<[`AccountNetwork`](/api/iso-filecoin-react/types/interfaces/accountnetwork/), [`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error), \{ `adapter`: [`WalletAdapter`](/api/iso-filecoin-react/index/interfaces/walletadapter/); \}, `void`\> & [`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)\<[`FilecoinContextType`](/api/iso-filecoin-react/types/type-aliases/filecoincontexttype/), `"adapter"` \| `"adapters"` \| `"loading"`\>

Connection mutation and state

## Example

```tsx twoslash

import { useConnect } from 'iso-filecoin-react'

function App() {
  const { adapters, error, mutate: connect, isPending } = useConnect()

  return (
    <div>
      {adapters.map(adapter => (
        <button
          key={adapter.name}
          onClick={() => connect({ adapter })}
          disabled={isPending}
        >
          Connect {adapter.name}
        </button>
      ))}
      {error && <div>Error: {error.message}</div>}
    </div>
  )
}
```
