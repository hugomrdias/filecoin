---
editUrl: false
next: true
prev: true
title: "FilecoinAppKitAdapter"
---

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:25](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L25)

TODO:
- auth provider for SIWX

## Description

Filecoin adapter for AppKit

## Extends

- `AdapterBlueprint`

## Constructors

### Constructor

> **new FilecoinAppKitAdapter**(`params`): `FilecoinAppKitAdapter`

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:39](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L39)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | \{ `adapters`: [`WalletAdapter`](/api/iso-filecoin-wallets/local/interfaces/walletadapter/)[]; \} |
| `params.adapters` | [`WalletAdapter`](/api/iso-filecoin-wallets/local/interfaces/walletadapter/)[] |

#### Returns

`FilecoinAppKitAdapter`

#### Overrides

`AdapterBlueprint.constructor`

## Methods

### connect()

> **connect**(`params`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`ConnectResult`\>

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:127](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L127)

Connect

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | `ConnectParams` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`ConnectResult`\>

#### Overrides

`AdapterBlueprint.connect`

***

### construct()

> **construct**(`params`): `void`

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:50](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L50)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | `Params` |

#### Returns

`void`

#### Overrides

`AdapterBlueprint.construct`

***

### disconnect()

> **disconnect**(`_params`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`DisconnectResult`\>

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:202](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L202)

Disconnect

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_params` | `DisconnectParams` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`DisconnectResult`\>

#### Overrides

`AdapterBlueprint.disconnect`

***

### estimateGas()

> **estimateGas**(`_params`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`EstimateGasTransactionResult`\>

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:311](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L311)

Estimate gas

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_params` | `EstimateGasTransactionArgs` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`EstimateGasTransactionResult`\>

#### Overrides

`AdapterBlueprint.estimateGas`

***

### formatUnits()

> **formatUnits**(`_params`): `string`

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:345](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L345)

Format units

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_params` | `FormatUnitsParams` |

#### Returns

`string`

#### Overrides

`AdapterBlueprint.formatUnits`

***

### getAccounts()

> **getAccounts**(`params`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`GetAccountsResult`\>

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:76](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L76)

Get accounts

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | `GetAccountsParams` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`GetAccountsResult`\>

#### Overrides

`AdapterBlueprint.getAccounts`

***

### getBalance()

> **getBalance**(`params`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`GetBalanceResult`\>

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:235](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L235)

Get balance

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | `GetBalanceParams` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`GetBalanceResult`\>

#### Overrides

`AdapterBlueprint.getBalance`

***

### getCapabilities()

> **getCapabilities**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ \}\>

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:355](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L355)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ \}\>

#### Overrides

`AdapterBlueprint.getCapabilities`

***

### getProfile()

> **getProfile**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `profileImage`: `undefined`; `profileName`: `undefined`; \}\>

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:349](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L349)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `profileImage`: `undefined`; `profileName`: `undefined`; \}\>

***

### getWalletConnectProvider()

> **getWalletConnectProvider**(`params`): `any`

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:385](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L385)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | \{ `provider`: `any`; \} |
| `params.provider` | `any` |

#### Returns

`any`

#### Overrides

`AdapterBlueprint.getWalletConnectProvider`

***

### grantPermissions()

> **grantPermissions**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ \}\>

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:358](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L358)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ \}\>

#### Overrides

`AdapterBlueprint.grantPermissions`

***

### parseUnits()

> **parseUnits**(`_params`): `bigint`

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:335](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L335)

Parse units

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_params` | `ParseUnitsParams` |

#### Returns

`bigint`

#### Overrides

`AdapterBlueprint.parseUnits`

***

### revokePermissions()

> **revokePermissions**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`` `0x${string}` ``\>

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:361](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L361)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`` `0x${string}` ``\>

#### Overrides

`AdapterBlueprint.revokePermissions`

***

### sendTransaction()

> **sendTransaction**(`_params`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`SendTransactionResult`\>

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:323](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L323)

Send transaction

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_params` | `SendTransactionParams` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`SendTransactionResult`\>

#### Overrides

`AdapterBlueprint.sendTransaction`

***

### setUniversalProvider()

> **setUniversalProvider**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:379](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L379)

Sets the universal provider for WalletConnect.

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

#### Overrides

`AdapterBlueprint.setUniversalProvider`

***

### signMessage()

> **signMessage**(`_params`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`SignMessageResult`\>

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:299](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L299)

Sign message

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_params` | `SignMessageParams` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`SignMessageResult`\>

#### Overrides

`AdapterBlueprint.signMessage`

***

### switchNetwork()

> **switchNetwork**(`params`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:219](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L219)

Switch network

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | `SwitchNetworkParams` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

#### Overrides

`AdapterBlueprint.switchNetwork`

***

### syncConnection()

> **syncConnection**(`params`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`ConnectResult`\>

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:189](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L189)

Sync connection

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | `SyncConnectionParams` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`ConnectResult`\>

#### Overrides

`AdapterBlueprint.syncConnection`

***

### syncConnections()

> **syncConnections**(`_params`): `void` \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:117](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L117)

Sync connections

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_params` | `SyncConnectionsParams` |

#### Returns

`void` \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

#### Overrides

`AdapterBlueprint.syncConnections`

***

### syncConnectors()

> **syncConnectors**(`_options`, `_appKit`): `void` \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:105](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L105)

Sync connectors

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_options` | `AppKitOptions` |
| `_appKit` | `AppKit` |

#### Returns

`void` \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

#### Overrides

`AdapterBlueprint.syncConnectors`

***

### walletGetAssets()

> **walletGetAssets**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ \}\>

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:364](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L364)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ \}\>

#### Overrides

`AdapterBlueprint.walletGetAssets`

***

### writeContract()

> **writeContract**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`WriteContractResult`\>

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:373](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L373)

Write contract

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`WriteContractResult`\>

#### Overrides

`AdapterBlueprint.writeContract`

## Properties

### adapters

> **adapters**: [`WalletAdapter`](/api/iso-filecoin-wallets/local/interfaces/walletadapter/)[]

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:34](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L34)

***

### caipNetworks

> **caipNetworks**: `undefined` \| `CaipNetwork`[]

Defined in: [packages/iso-filecoin-wallets/src/appkit.js:58](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/appkit.js#L58)
