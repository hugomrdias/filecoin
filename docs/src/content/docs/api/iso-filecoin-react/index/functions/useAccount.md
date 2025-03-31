---
editUrl: false
next: true
prev: true
title: "useAccount"
---

```ts
function useAccount(): {
  account:   | undefined
     | IAccount;
  adapter:   | undefined
     | WalletAdapter;
  address: string;
  chain: Chain;
  network: Network;
  state: ConnectionState;
}
```

Defined in: [packages/iso-filecoin-react/src/wallet-provider.js:335](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/wallet-provider.js#L335)

Hook to access the current account and its state

## Returns

```ts
{
  account:   | undefined
     | IAccount;
  adapter:   | undefined
     | WalletAdapter;
  address: string;
  chain: Chain;
  network: Network;
  state: ConnectionState;
}
```

Account state

### account

```ts
account: 
  | undefined
  | IAccount;
```

Currently connected account

### adapter

```ts
adapter: 
  | undefined
  | WalletAdapter;
```

Currently selected wallet adapter

### address

```ts
address: string;
```

Current address

### chain

```ts
chain: Chain;
```

Current chain

### network

```ts
network: Network;
```

Current network (mainnet or testnet)

### state

```ts
state: ConnectionState;
```

Current connection state

## Example

```tsx twoslash
// @allowUmdGlobalAccess
import { useAccount } from 'iso-filecoin-react'

function App() {
  const { account, adapter, network, chain, state } = useAccount()

  return <div>Current address: {account?.address.toString()}</div>
}
```
