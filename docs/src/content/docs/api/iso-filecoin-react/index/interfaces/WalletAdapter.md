---
editUrl: false
next: true
prev: true
title: "WalletAdapter"
---

Defined in: packages/iso-filecoin-wallets/dist/src/types.d.ts:63

Wallet adapter interface

## Extends

- `TypedEventTarget`\<[`WalletEvents`](/api/iso-filecoin-wallets/types/type-aliases/walletevents/)\>

## Methods

### sign()

> **sign**(`data`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

Defined in: packages/iso-filecoin-wallets/dist/src/types.d.ts:130

Sign raw bytes

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | raw bytes to sign |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

## Properties

### account

> `readonly` **account**: `undefined` \| [`IAccount`](/api/iso-filecoin-react/types/interfaces/iaccount/)

Defined in: packages/iso-filecoin-wallets/dist/src/types.d.ts:99

Currently active account, if connected

***

### changeNetwork()

> **changeNetwork**: (`network`) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AccountNetwork`](/api/iso-filecoin-react/types/interfaces/accountnetwork/)\>

Defined in: packages/iso-filecoin-wallets/dist/src/types.d.ts:124

Change the network and derive a new account

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `network` | [`Network`](/api/iso-filecoin-react/types/type-aliases/network/) | The network to change to |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AccountNetwork`](/api/iso-filecoin-react/types/interfaces/accountnetwork/)\>

***

### checkSupport()

> **checkSupport**: () => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: packages/iso-filecoin-wallets/dist/src/types.d.ts:103

Check if this wallet adapter is supported in the current environment

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### connect()

> **connect**: (`params`) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AccountNetwork`](/api/iso-filecoin-react/types/interfaces/accountnetwork/)\>

Defined in: packages/iso-filecoin-wallets/dist/src/types.d.ts:108

Connect to the wallet

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | \{ `network?`: [`Network`](/api/iso-filecoin-react/types/type-aliases/network/); \} | Connect params |
| `params.network?` | [`Network`](/api/iso-filecoin-react/types/type-aliases/network/) | - |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AccountNetwork`](/api/iso-filecoin-react/types/interfaces/accountnetwork/)\>

***

### connected

> `readonly` **connected**: `boolean`

Defined in: packages/iso-filecoin-wallets/dist/src/types.d.ts:95

Whether the wallet is currently connected

***

### connecting

> `readonly` **connecting**: `boolean`

Defined in: packages/iso-filecoin-wallets/dist/src/types.d.ts:91

Whether the wallet is in the process of connecting

***

### deriveAccount()

> **deriveAccount**: (`index`) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAccount`](/api/iso-filecoin-react/types/interfaces/iaccount/)\>

Defined in: packages/iso-filecoin-wallets/dist/src/types.d.ts:119

Derive a new account at the given index

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `index` | `number` | The derivation path index |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAccount`](/api/iso-filecoin-react/types/interfaces/iaccount/)\>

***

### disconnect()

> **disconnect**: () => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: packages/iso-filecoin-wallets/dist/src/types.d.ts:114

Disconnect from the wallet

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### id

> `readonly` **id**: `string`

Defined in: packages/iso-filecoin-wallets/dist/src/types.d.ts:71

Wallet adapter identifier (e.g. 'filsnap', 'ledger', 'hd', 'raw')

***

### name

> **name**: `string`

Defined in: packages/iso-filecoin-wallets/dist/src/types.d.ts:75

Human readable wallet name

***

### network

> `readonly` **network**: [`Network`](/api/iso-filecoin-react/types/type-aliases/network/)

Defined in: packages/iso-filecoin-wallets/dist/src/types.d.ts:83

Current network (mainnet or testnet)

***

### signMessage()

> **signMessage**: (`message`) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

Defined in: packages/iso-filecoin-wallets/dist/src/types.d.ts:136

Sign filecoin message

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message` | \{ `from`: `string`; `gasFeeCap`: `string`; `gasLimit`: `number`; `gasPremium`: `string`; `method`: `number`; `nonce`: `number`; `params`: `string`; `to`: `string`; `value`: `string`; `version`: `0`; \} | Filecoin message to sign |
| `message.from` | `string` | - |
| `message.gasFeeCap` | `string` | - |
| `message.gasLimit` | `number` | - |
| `message.gasPremium` | `string` | - |
| `message.method` | `number` | - |
| `message.nonce` | `number` | - |
| `message.params` | `string` | - |
| `message.to` | `string` | - |
| `message.value` | `string` | - |
| `message.version` | `0` | - |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

***

### support

> `readonly` **support**: `"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

Defined in: packages/iso-filecoin-wallets/dist/src/types.d.ts:87

Wallet support status (NotChecked, Detected, NotDetected, NotSupported)

***

### uid

> `readonly` **uid**: `string`

Defined in: packages/iso-filecoin-wallets/dist/src/types.d.ts:67

Unique identifier for this wallet instance

***

### url

> **url**: `string`

Defined in: packages/iso-filecoin-wallets/dist/src/types.d.ts:79

Wallet homepage URL
