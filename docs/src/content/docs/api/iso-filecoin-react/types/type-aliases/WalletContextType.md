---
editUrl: false
next: true
prev: true
title: "WalletContextType"
---

```ts
type WalletContextType = {
  account:   | IAccount
     | undefined;
  adapter:   | WalletAdapter
     | undefined;
  adapters: WalletAdapter[];
  error:   | Error
     | undefined;
  loading: boolean;
  network: Network;
  reconnecting: boolean;
  rpcs: Record<Network, RPC>;
  setAccount: (value: React.SetStateAction<
     | IAccount
     | undefined>) => void;
  setAdapter: (value: React.SetStateAction<
     | WalletAdapter
     | undefined>) => void;
  setNetwork: (value: React.SetStateAction<Network>) => void;
};
```

Defined in: [packages/iso-filecoin-react/src/types.ts:27](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L27)

Wallet context type

## Properties

### account

```ts
account: 
  | IAccount
  | undefined;
```

Defined in: [packages/iso-filecoin-react/src/types.ts:35](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L35)

Currently connected account

***

### adapter

```ts
adapter: 
  | WalletAdapter
  | undefined;
```

Defined in: [packages/iso-filecoin-react/src/types.ts:33](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L33)

Currently selected wallet adapter

***

### adapters

```ts
adapters: WalletAdapter[];
```

Defined in: [packages/iso-filecoin-react/src/types.ts:31](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L31)

List of available wallet adapters

***

### error

```ts
error: 
  | Error
  | undefined;
```

Defined in: [packages/iso-filecoin-react/src/types.ts:45](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L45)

Last error that occurred on the selected adapter

***

### loading

```ts
loading: boolean;
```

Defined in: [packages/iso-filecoin-react/src/types.ts:39](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L39)

Provider is checking adapters support

***

### network

```ts
network: Network;
```

Defined in: [packages/iso-filecoin-react/src/types.ts:29](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L29)

Current network (mainnet or testnet)

***

### reconnecting

```ts
reconnecting: boolean;
```

Defined in: [packages/iso-filecoin-react/src/types.ts:43](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L43)

Provider is reconnecting to the last selected adapter

***

### rpcs

```ts
rpcs: Record<Network, RPC>;
```

Defined in: [packages/iso-filecoin-react/src/types.ts:47](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L47)

RPC clients for each network

***

### setAccount()

```ts
setAccount: (value: React.SetStateAction<
  | IAccount
  | undefined>) => void;
```

Defined in: [packages/iso-filecoin-react/src/types.ts:49](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L49)

Set the current account

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `React.SetStateAction`\< \| [`IAccount`](/api/iso-filecoin-react/types/interfaces/iaccount/) \| `undefined`\> |

#### Returns

`void`

***

### setAdapter()

```ts
setAdapter: (value: React.SetStateAction<
  | WalletAdapter
  | undefined>) => void;
```

Defined in: [packages/iso-filecoin-react/src/types.ts:53](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L53)

Set the current wallet adapter

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `React.SetStateAction`\< \| [`WalletAdapter`](/api/iso-filecoin-react/types/interfaces/walletadapter/) \| `undefined`\> |

#### Returns

`void`

***

### setNetwork()

```ts
setNetwork: (value: React.SetStateAction<Network>) => void;
```

Defined in: [packages/iso-filecoin-react/src/types.ts:51](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L51)

Set the current network

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `React.SetStateAction`\<[`Network`](/api/iso-filecoin-react/types/type-aliases/network/)\> |

#### Returns

`void`
