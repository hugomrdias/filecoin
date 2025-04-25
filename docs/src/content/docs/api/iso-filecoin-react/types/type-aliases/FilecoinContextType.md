---
editUrl: false
next: true
prev: true
title: "FilecoinContextType"
---

> **FilecoinContextType** = `object`

Defined in: [packages/iso-filecoin-react/src/types.ts:31](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L31)

Wallet context type

## Properties

### account

> **account**: [`IAccount`](/api/iso-filecoin-react/types/interfaces/iaccount/) \| `undefined`

Defined in: [packages/iso-filecoin-react/src/types.ts:39](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L39)

Currently connected account

***

### adapter

> **adapter**: [`WalletAdapter`](/api/iso-filecoin-react/index/interfaces/walletadapter/) \| `undefined`

Defined in: [packages/iso-filecoin-react/src/types.ts:37](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L37)

Currently selected wallet adapter

***

### adapters

> **adapters**: [`WalletAdapter`](/api/iso-filecoin-react/index/interfaces/walletadapter/)[]

Defined in: [packages/iso-filecoin-react/src/types.ts:35](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L35)

List of available wallet adapters

***

### error

> **error**: [`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error) \| `undefined`

Defined in: [packages/iso-filecoin-react/src/types.ts:49](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L49)

Last error that occurred on the selected adapter

***

### loading

> **loading**: `boolean`

Defined in: [packages/iso-filecoin-react/src/types.ts:43](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L43)

Provider is checking adapters support

***

### network

> **network**: [`Network`](/api/iso-filecoin-react/types/type-aliases/network/)

Defined in: [packages/iso-filecoin-react/src/types.ts:33](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L33)

Current network (mainnet or testnet)

***

### reconnecting

> **reconnecting**: `boolean`

Defined in: [packages/iso-filecoin-react/src/types.ts:47](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L47)

Provider is reconnecting to the last selected adapter

***

### rpcs

> **rpcs**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<[`Network`](/api/iso-filecoin-react/types/type-aliases/network/), [`RPC`](/api/iso-filecoin/rpc/classes/rpc/)\>

Defined in: [packages/iso-filecoin-react/src/types.ts:51](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L51)

RPC clients for each network

***

### setAccount()

> **setAccount**: (`value`) => `void`

Defined in: [packages/iso-filecoin-react/src/types.ts:53](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L53)

Set the current account

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `React.SetStateAction`\<[`IAccount`](/api/iso-filecoin-react/types/interfaces/iaccount/) \| `undefined`\> |

#### Returns

`void`

***

### setAdapter()

> **setAdapter**: (`value`) => `void`

Defined in: [packages/iso-filecoin-react/src/types.ts:57](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L57)

Set the current wallet adapter

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `React.SetStateAction`\<[`WalletAdapter`](/api/iso-filecoin-react/index/interfaces/walletadapter/) \| `undefined`\> |

#### Returns

`void`

***

### setNetwork()

> **setNetwork**: (`value`) => `void`

Defined in: [packages/iso-filecoin-react/src/types.ts:55](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/types.ts#L55)

Set the current network

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `React.SetStateAction`\<[`Network`](/api/iso-filecoin-react/types/type-aliases/network/)\> |

#### Returns

`void`
