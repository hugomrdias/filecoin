---
editUrl: false
next: true
prev: true
title: "WalletAdapterRaw"
---

Defined in: [packages/iso-filecoin-wallets/src/local.js:50](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L50)

Raw wallet implementation

## Implements

- [WalletAdapter](/api/iso-filecoin-wallets/local/interfaces/walletadapter/)

## Extends

- `TypedEventTarget`

## Accessors

### connected

#### Get Signature

> **get** **connected**(): `boolean`

Defined in: [packages/iso-filecoin-wallets/src/local.js:127](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L127)

Whether the wallet is currently connected

##### Returns

`boolean`

***

### connecting

#### Get Signature

> **get** **connecting**(): `boolean`

Defined in: [packages/iso-filecoin-wallets/src/local.js:123](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L123)

Whether the wallet is in the process of connecting

##### Returns

`boolean`

***

### support

#### Get Signature

> **get** **support**(): `"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

Defined in: [packages/iso-filecoin-wallets/src/local.js:130](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L130)

Wallet support status (NotChecked, Detected, NotDetected, NotSupported)

##### Returns

`"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

## Constructors

### Constructor

> **new WalletAdapterRaw**(`config`): `WalletAdapterRaw`

Defined in: [packages/iso-filecoin-wallets/src/local.js:71](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L71)

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

Defined in: [packages/iso-filecoin-wallets/src/local.js:147](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L147)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `network` | [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `account`: [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/); `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \}\>

***

### checkSupport()

> **checkSupport**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [packages/iso-filecoin-wallets/src/local.js:134](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L134)

Check if this wallet adapter is supported in the current environment

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### connect()

> **connect**(`params?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `account`: [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/); `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \}\>

Defined in: [packages/iso-filecoin-wallets/src/local.js:99](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L99)

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

Defined in: [packages/iso-filecoin-wallets/src/local.js:169](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L169)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_index` | `number` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/)\>

***

### disconnect()

> **disconnect**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [packages/iso-filecoin-wallets/src/local.js:138](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L138)

Disconnect from the wallet

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### personalSign()

> **personalSign**(`data`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

Defined in: [packages/iso-filecoin-wallets/src/local.js:189](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L189)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

***

### ~~sign()~~

> **sign**(`data`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

Defined in: [packages/iso-filecoin-wallets/src/local.js:178](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L178)

Sign raw bytes

:::caution[Deprecated]
Use [personalSign](/api/iso-filecoin-wallets/local/interfaces/walletadapter/#personalsign) instead
:::

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | raw bytes to sign |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

***

### signMessage()

> **signMessage**(`message`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

Defined in: [packages/iso-filecoin-wallets/src/local.js:200](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L200)

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

Defined in: [packages/iso-filecoin-wallets/src/local.js:87](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L87)

#### Returns

`WalletAdapterRaw`

## Properties

### \[symbol\]

> **\[symbol\]**: `boolean` = `true`

Defined in: [packages/iso-filecoin-wallets/src/local.js:52](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L52)

***

### account

> **account**: `undefined` \| [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/) = `undefined`

Defined in: [packages/iso-filecoin-wallets/src/local.js:59](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L59)

***

### id

> **id**: `string` = `'raw'`

Defined in: [packages/iso-filecoin-wallets/src/local.js:54](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L54)

Wallet adapter identifier (e.g. 'filsnap', 'ledger', 'hd', 'raw')

***

### name

> **name**: `string` = `'Raw (Unsafe)'`

Defined in: [packages/iso-filecoin-wallets/src/local.js:55](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L55)

Human readable wallet name

***

### network

> **network**: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/)

Defined in: [packages/iso-filecoin-wallets/src/local.js:74](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L74)

***

### privateKey

> **privateKey**: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

Defined in: [packages/iso-filecoin-wallets/src/local.js:76](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L76)

***

### signatureType

> **signatureType**: `"SECP256K1"` \| `"BLS"`

Defined in: [packages/iso-filecoin-wallets/src/local.js:75](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L75)

***

### uid

> **uid**: `string`

Defined in: [packages/iso-filecoin-wallets/src/local.js:53](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L53)

Unique identifier for this wallet instance

***

### url

> **url**: `string` = `'https://filecoin.io'`

Defined in: [packages/iso-filecoin-wallets/src/local.js:56](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L56)

Wallet homepage URL
