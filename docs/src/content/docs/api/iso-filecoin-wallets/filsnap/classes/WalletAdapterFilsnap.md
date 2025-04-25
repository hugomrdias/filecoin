---
editUrl: false
next: true
prev: true
title: "WalletAdapterFilsnap"
---

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:28](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L28)

Filsnap wallet implementation

## Implements

- [WalletAdapter](/api/iso-filecoin-wallets/local/interfaces/walletadapter/)

## Extends

- `TypedEventTarget`

## Accessors

### connected

#### Get Signature

> **get** **connected**(): `boolean`

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:148](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L148)

Whether the wallet is currently connected

##### Returns

`boolean`

***

### connecting

#### Get Signature

> **get** **connecting**(): `boolean`

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:144](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L144)

Whether the wallet is in the process of connecting

##### Returns

`boolean`

***

### support

#### Get Signature

> **get** **support**(): `"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:152](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L152)

Wallet support status (NotChecked, Detected, NotDetected, NotSupported)

##### Returns

`"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

## Constructors

### Constructor

> **new WalletAdapterFilsnap**(`config`): `WalletAdapterFilsnap`

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:64](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L64)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`WalletConfig`](/api/iso-filecoin-wallets/types/interfaces/walletconfig/) & `object` |

#### Returns

`WalletAdapterFilsnap`

#### Overrides

`TypedEventTarget.constructor`

## Methods

### changeNetwork()

> **changeNetwork**(`network`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `account`: \{ `address`: [`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/); `path`: `string`; `privateKey?`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>; `publicKey`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array); `type`: `"SECP256K1"` \| `"BLS"`; \}; `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \}\>

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:159](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L159)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `network` | [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `account`: \{ `address`: [`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/); `path`: `string`; `privateKey?`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>; `publicKey`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array); `type`: `"SECP256K1"` \| `"BLS"`; \}; `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \}\>

***

### checkSupport()

> **checkSupport**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:264](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L264)

Check if this wallet adapter is supported in the current environment

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### connect()

> **connect**(`params?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `account`: \{ `address`: [`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/); `path`: `string`; `privateKey?`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>; `publicKey`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array); `type`: `"SECP256K1"` \| `"BLS"`; \}; `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \}\>

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:86](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L86)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params?` | \{ `network?`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \} |
| `params.network?` | [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `account`: \{ `address`: [`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/); `path`: `string`; `privateKey?`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>; `publicKey`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array); `type`: `"SECP256K1"` \| `"BLS"`; \}; `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \}\>

***

### deriveAccount()

> **deriveAccount**(`_index`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `address`: [`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/); `path`: `string`; `privateKey?`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>; `publicKey`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array); `type`: `"SECP256K1"` \| `"BLS"`; \}\>

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:199](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L199)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_index` | `number` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `address`: [`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/); `path`: `string`; `privateKey?`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>; `publicKey`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array); `type`: `"SECP256K1"` \| `"BLS"`; \}\>

***

### disconnect()

> **disconnect**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:276](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L276)

Disconnect from the wallet

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### sign()

> **sign**(`data`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:228](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L228)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> | Data to sign |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

***

### signMessage()

> **signMessage**(`message`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:246](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L246)

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

### is()

> `static` **is**(`value`): `value is WalletAdapterFilsnap`

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:79](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L79)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`WalletAdapter`](/api/iso-filecoin-wallets/local/interfaces/walletadapter/) |

#### Returns

`value is WalletAdapterFilsnap`

## Properties

### \[symbol\]

> **\[symbol\]**: `boolean` = `true`

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:30](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L30)

***

### account

> **account**: `undefined` \| \{ `address`: [`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/); `path`: `string`; `privateKey?`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>; `publicKey`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array); `type`: `"SECP256K1"` \| `"BLS"`; \} = `undefined`

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:37](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L37)

#### Type declaration

`undefined`

\{ `address`: [`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/); `path`: `string`; `privateKey?`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>; `publicKey`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array); `type`: `"SECP256K1"` \| `"BLS"`; \}

#### address

> **address**: [`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/)

#### path

> **path**: `string`

Derivation path - only for HD wallets

#### privateKey?

> `optional` **privateKey**: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

Private key - only for RAW and HD wallets

#### publicKey

> **publicKey**: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

#### type

> **type**: `"SECP256K1"` \| `"BLS"`

***

### filsnap

> **filsnap**: `undefined` \| `FilsnapAdapter`

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:43](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L43)

***

### id

> **id**: `string` = `'filsnap'`

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:32](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L32)

Wallet adapter identifier (e.g. 'filsnap', 'ledger', 'hd', 'raw')

***

### name

> **name**: `string` = `'Filsnap'`

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:33](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L33)

Human readable wallet name

***

### network

> **network**: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/)

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:70](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L70)

***

### signatureType

> **signatureType**: `"SECP256K1"` \| `"BLS"`

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:71](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L71)

***

### syncWithProvider

> **syncWithProvider**: `boolean`

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:72](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L72)

***

### uid

> **uid**: `string`

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:31](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L31)

Unique identifier for this wallet instance

***

### url

> **url**: `string` = `'https://snaps.metamask.io/snap/npm/filsnap/'`

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:34](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L34)

Wallet homepage URL

***

### version

> **version**: `undefined` \| `string`

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:69](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L69)
