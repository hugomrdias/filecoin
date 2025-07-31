---
editUrl: false
next: true
prev: true
title: "WalletAdapterLedger"
---

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:30](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L30)

Ledger wallet implementation

## Implements

- [WalletAdapter](/api/iso-filecoin-wallets/local/interfaces/walletadapter/)

## Extends

- `TypedEventTarget`

## Accessors

### app

#### Get Signature

> **get** **app**(): `undefined` \| [`LedgerFilecoin`](/api/iso-filecoin/ledger/classes/ledgerfilecoin/)

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:81](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L81)

##### Returns

`undefined` \| [`LedgerFilecoin`](/api/iso-filecoin/ledger/classes/ledgerfilecoin/)

***

### connected

#### Get Signature

> **get** **connected**(): `boolean`

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:77](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L77)

Whether the wallet is currently connected

##### Returns

`boolean`

***

### connecting

#### Get Signature

> **get** **connecting**(): `boolean`

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:73](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L73)

Whether the wallet is in the process of connecting

##### Returns

`boolean`

***

### support

#### Get Signature

> **get** **support**(): `"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:85](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L85)

Wallet support status (NotChecked, Detected, NotDetected, NotSupported)

##### Returns

`"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

## Constructors

### Constructor

> **new WalletAdapterLedger**(`config`): `WalletAdapterLedger`

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:62](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L62)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`WalletLedgerConfig`](/api/iso-filecoin-wallets/types/interfaces/walletledgerconfig/) |

#### Returns

`WalletAdapterLedger`

#### Overrides

`TypedEventTarget.constructor`

## Methods

### changeNetwork()

> **changeNetwork**(`network`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `account`: [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/); `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \}\>

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:155](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L155)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `network` | [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `account`: [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/); `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \}\>

***

### checkSupport()

> **checkSupport**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:89](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L89)

Check if this wallet adapter is supported in the current environment

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### connect()

> **connect**(`params?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `account`: [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/); `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \}\>

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:107](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L107)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params?` | \{ `network?`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \} |
| `params.network?` | [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `account`: [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/); `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \}\>

***

### deriveAccount()

> **deriveAccount**(`index`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/)\>

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:183](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L183)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `index` | `number` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/)\>

***

### disconnect()

> **disconnect**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:138](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L138)

Disconnect from the wallet

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### personalSign()

> **personalSign**(`data`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:229](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L229)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

***

### sign()

> **sign**(`data`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:202](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L202)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

***

### signMessage()

> **signMessage**(`message`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:255](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L255)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | \{ `from`: `string`; `gasFeeCap`: `string`; `gasLimit`: `number`; `gasPremium`: `string`; `method`: `number`; `nonce`: `number`; `params`: `string`; `to`: `string`; `value`: `string`; `version`: `0`; \} |
| `message.from` | `string` |
| `message.gasFeeCap` | `string` |
| `message.gasLimit` | `number` |
| `message.gasPremium` | `string` |
| `message.method` | `number` |
| `message.nonce` | `number` |
| `message.params` | `string` |
| `message.to` | `string` |
| `message.value` | `string` |
| `message.version` | `0` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

## Properties

### \[symbol\]

> **\[symbol\]**: `boolean` = `true`

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:32](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L32)

***

### account

> **account**: `undefined` \| [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/) = `undefined`

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:39](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L39)

***

### id

> **id**: `string` = `'ledger'`

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:34](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L34)

Wallet adapter identifier (e.g. 'filsnap', 'ledger', 'hd', 'raw')

***

### name

> **name**: `string` = `'Ledger'`

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:35](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L35)

Human readable wallet name

***

### network

> **network**: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/)

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:68](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L68)

***

### signatureType

> **signatureType**: `"SECP256K1"` \| `"BLS"`

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:69](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L69)

***

### uid

> **uid**: `string`

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:33](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L33)

Unique identifier for this wallet instance

***

### url

> **url**: `string` = `'https://ledger.com'`

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:36](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L36)

Wallet homepage URL
