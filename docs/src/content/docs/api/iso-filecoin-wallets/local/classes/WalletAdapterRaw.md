---
editUrl: false
next: true
prev: true
title: "WalletAdapterRaw"
---

Defined in: [packages/iso-filecoin-wallets/src/local.js:43](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L43)

Raw wallet implementation

## Implements

- [WalletAdapter](/api/iso-filecoin-wallets/local/interfaces/walletadapter/)

## Extends

- `TypedEventTarget`

## Accessors

### connected

#### Get Signature

> **get** **connected**(): `boolean`

Defined in: [packages/iso-filecoin-wallets/src/local.js:121](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L121)

Whether the wallet is currently connected

##### Returns

`boolean`

***

### connecting

#### Get Signature

> **get** **connecting**(): `boolean`

Defined in: [packages/iso-filecoin-wallets/src/local.js:117](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L117)

Whether the wallet is in the process of connecting

##### Returns

`boolean`

***

### support

#### Get Signature

> **get** **support**(): `"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

Defined in: [packages/iso-filecoin-wallets/src/local.js:124](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L124)

Wallet support status (NotChecked, Detected, NotDetected, NotSupported)

##### Returns

`"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

## Constructors

### Constructor

> **new WalletAdapterRaw**(`config`): `WalletAdapterRaw`

Defined in: [packages/iso-filecoin-wallets/src/local.js:64](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L64)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`WalletConfig`](/api/iso-filecoin-wallets/types/interfaces/walletconfig/) & `object` |

#### Returns

`WalletAdapterRaw`

#### Overrides

`TypedEventTarget.constructor`

## Methods

### changeNetwork()

> **changeNetwork**(`network`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `account`: [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/); `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \}\>

Defined in: [packages/iso-filecoin-wallets/src/local.js:144](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L144)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `network` | [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `account`: [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/); `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \}\>

***

### checkSupport()

> **checkSupport**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [packages/iso-filecoin-wallets/src/local.js:129](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L129)

Check if this wallet adapter is supported in the current environment

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### connect()

> **connect**(`params?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `account`: [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/); `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \}\>

Defined in: [packages/iso-filecoin-wallets/src/local.js:93](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L93)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params?` | \{ `network?`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \} |
| `params.network?` | [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `account`: [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/); `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \}\>

***

### deriveAccount()

> **deriveAccount**(`_index`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/)\>

Defined in: [packages/iso-filecoin-wallets/src/local.js:167](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L167)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_index` | `number` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/)\>

***

### disconnect()

> **disconnect**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [packages/iso-filecoin-wallets/src/local.js:134](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L134)

Disconnect from the wallet

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### sign()

> **sign**(`data`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

Defined in: [packages/iso-filecoin-wallets/src/local.js:178](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L178)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> | Data to sign |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

***

### signMessage()

> **signMessage**(`message`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

Defined in: [packages/iso-filecoin-wallets/src/local.js:190](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L190)

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

### create()

> `static` **create**(): `WalletAdapterRaw`

Defined in: [packages/iso-filecoin-wallets/src/local.js:80](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L80)

#### Returns

`WalletAdapterRaw`

## Properties

### \[symbol\]

> **\[symbol\]**: `boolean` = `true`

Defined in: [packages/iso-filecoin-wallets/src/local.js:45](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L45)

***

### account

> **account**: `undefined` \| [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/) = `undefined`

Defined in: [packages/iso-filecoin-wallets/src/local.js:52](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L52)

***

### id

> **id**: `string` = `'raw'`

Defined in: [packages/iso-filecoin-wallets/src/local.js:47](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L47)

Wallet adapter identifier (e.g. 'filsnap', 'ledger', 'hd', 'raw')

***

### name

> **name**: `string` = `'Raw (Unsafe)'`

Defined in: [packages/iso-filecoin-wallets/src/local.js:48](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L48)

Human readable wallet name

***

### network

> **network**: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/)

Defined in: [packages/iso-filecoin-wallets/src/local.js:67](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L67)

***

### privateKey

> **privateKey**: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

Defined in: [packages/iso-filecoin-wallets/src/local.js:69](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L69)

***

### signatureType

> **signatureType**: `"SECP256K1"` \| `"BLS"`

Defined in: [packages/iso-filecoin-wallets/src/local.js:68](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L68)

***

### uid

> **uid**: `string`

Defined in: [packages/iso-filecoin-wallets/src/local.js:46](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L46)

Unique identifier for this wallet instance

***

### url

> **url**: `string` = `'https://filecoin.io'`

Defined in: [packages/iso-filecoin-wallets/src/local.js:49](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L49)

Wallet homepage URL
