---
editUrl: false
next: true
prev: true
title: "WalletAdapterHd"
---

Defined in: [packages/iso-filecoin-wallets/src/hd.js:33](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L33)

HD wallet implementation

## Implements

- [WalletAdapter](/api/iso-filecoin-wallets/local/interfaces/walletadapter/)

## Extends

- `TypedEventTarget`

## Accessors

### connected

#### Get Signature

> **get** **connected**(): `boolean`

Defined in: [packages/iso-filecoin-wallets/src/hd.js:99](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L99)

Whether the wallet is currently connected

##### Returns

`boolean`

***

### connecting

#### Get Signature

> **get** **connecting**(): `boolean`

Defined in: [packages/iso-filecoin-wallets/src/hd.js:95](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L95)

Whether the wallet is in the process of connecting

##### Returns

`boolean`

***

### support

#### Get Signature

> **get** **support**(): `"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

Defined in: [packages/iso-filecoin-wallets/src/hd.js:103](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L103)

Wallet support status (NotChecked, Detected, NotDetected, NotSupported)

##### Returns

`"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

## Constructors

### Constructor

> **new WalletAdapterHd**(`config`): `WalletAdapterHd`

Defined in: [packages/iso-filecoin-wallets/src/hd.js:59](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L59)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`WalletHDConfig`](/api/iso-filecoin-wallets/types/interfaces/wallethdconfig/) |

#### Returns

`WalletAdapterHd`

#### Overrides

`TypedEventTarget.constructor`

## Methods

### changeNetwork()

> **changeNetwork**(`network`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `account`: [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/); `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \}\>

Defined in: [packages/iso-filecoin-wallets/src/hd.js:160](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L160)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `network` | [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `account`: [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/); `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \}\>

***

### checkSupport()

> **checkSupport**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [packages/iso-filecoin-wallets/src/hd.js:107](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L107)

Check if this wallet adapter is supported in the current environment

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### connect()

> **connect**(`params?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{ `account`: [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/); `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \}\>

Defined in: [packages/iso-filecoin-wallets/src/hd.js:124](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L124)

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

Defined in: [packages/iso-filecoin-wallets/src/hd.js:187](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L187)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `index` | `number` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/)\>

***

### disconnect()

> **disconnect**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [packages/iso-filecoin-wallets/src/hd.js:152](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L152)

Disconnect from the wallet

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### personalSign()

> **personalSign**(`data`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

Defined in: [packages/iso-filecoin-wallets/src/hd.js:222](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L222)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

***

### setup()

> **setup**(`config`): `void`

Defined in: [packages/iso-filecoin-wallets/src/hd.js:116](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L116)

Setup the wallet from a mnemonic

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`WalletHDMnemonicConfig`](/api/iso-filecoin-wallets/types/interfaces/wallethdmnemonicconfig/) & `object` |

#### Returns

`void`

***

### sign()

> **sign**(`data`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

Defined in: [packages/iso-filecoin-wallets/src/hd.js:207](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L207)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> | Data to sign |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

***

### signMessage()

> **signMessage**(`message`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

Defined in: [packages/iso-filecoin-wallets/src/hd.js:237](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L237)

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

### fromMnemonic()

> `static` **fromMnemonic**(`config`): `WalletAdapterHd`

Defined in: [packages/iso-filecoin-wallets/src/hd.js:84](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L84)

HD wallet from mnemonic

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`WalletHDMnemonicConfig`](/api/iso-filecoin-wallets/types/interfaces/wallethdmnemonicconfig/) |

#### Returns

`WalletAdapterHd`

***

### is()

> `static` **is**(`value`): `value is WalletAdapterHd`

Defined in: [packages/iso-filecoin-wallets/src/hd.js:74](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L74)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`WalletAdapter`](/api/iso-filecoin-wallets/local/interfaces/walletadapter/) |

#### Returns

`value is WalletAdapterHd`

## Properties

### \[symbol\]

> **\[symbol\]**: `boolean` = `true`

Defined in: [packages/iso-filecoin-wallets/src/hd.js:35](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L35)

***

### account

> **account**: `undefined` \| [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/) = `undefined`

Defined in: [packages/iso-filecoin-wallets/src/hd.js:41](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L41)

***

### id

> **id**: `string` = `'hd'`

Defined in: [packages/iso-filecoin-wallets/src/hd.js:37](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L37)

Wallet adapter identifier (e.g. 'filsnap', 'ledger', 'hd', 'raw')

***

### name

> **name**: `string` = `'Burner Wallet'`

Defined in: [packages/iso-filecoin-wallets/src/hd.js:38](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L38)

Human readable wallet name

***

### network

> **network**: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/)

Defined in: [packages/iso-filecoin-wallets/src/hd.js:66](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L66)

***

### signatureType

> **signatureType**: `"SECP256K1"` \| `"BLS"`

Defined in: [packages/iso-filecoin-wallets/src/hd.js:67](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L67)

***

### uid

> **uid**: `string`

Defined in: [packages/iso-filecoin-wallets/src/hd.js:36](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L36)

Unique identifier for this wallet instance

***

### url

> **url**: `string` = `'https://filecoin.io'`

Defined in: [packages/iso-filecoin-wallets/src/hd.js:39](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L39)

Wallet homepage URL
