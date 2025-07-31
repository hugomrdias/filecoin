---
editUrl: false
next: true
prev: true
title: "useAccount"
---

> **useAccount**(): `object`

Defined in: [packages/iso-filecoin-react/src/wallet-provider.js:349](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/wallet-provider.js#L349)

Hook to access the current account and its state

## Returns

Account state

### account

> **account**: `undefined` \| [`IAccount`](/api/iso-filecoin-react/types/interfaces/iaccount/)

Currently connected account

### adapter

> **adapter**: `undefined` \| [`WalletAdapter`](/api/iso-filecoin-react/index/interfaces/walletadapter/)

Currently selected wallet adapter

### address

> **address**: `string`

Current address

### chain

> **chain**: [`Chain`](/api/iso-filecoin-react/index/interfaces/chain/)

Current chain

### network

> **network**: [`Network`](/api/iso-filecoin-react/types/type-aliases/network/)

Current network (mainnet or testnet)

### state

> **state**: [`ConnectionState`](/api/iso-filecoin-react/types/type-aliases/connectionstate/)

Current connection state

## Example

```tsx twoslash
import { useAccount } from 'iso-filecoin-react'

function App() {
  const { account, adapter, network, chain, state } = useAccount()

  return <div>Current address: {account?.address.toString()}</div>
}
```
