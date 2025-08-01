---
editUrl: false
next: true
prev: true
title: "LedgerFilecoin"
---

Defined in: [packages/iso-filecoin/src/ledger.js:268](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L268)

Ledger Filecoin app client

## Constructors

### Constructor

> **new LedgerFilecoin**(`transport`): `LedgerFilecoin`

Defined in: [packages/iso-filecoin/src/ledger.js:273](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L273)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `transport` | `Transport` | Ledger transport |

#### Returns

`LedgerFilecoin`

## Methods

### close()

> **close**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

Defined in: [packages/iso-filecoin/src/ledger.js:421](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L421)

Close the transport

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### getAddress()

> **getAddress**(`path`, `showOnDevice?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAccount`](/api/iso-filecoin/types/interfaces/iaccount/)\>

Defined in: [packages/iso-filecoin/src/ledger.js:323](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L323)

Get the secp256k1 address for a given derivation path

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `path` | `string` | `undefined` | Derivation path |
| `showOnDevice?` | `boolean` | `false` | Whether to show the address on the device |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAccount`](/api/iso-filecoin/types/interfaces/iaccount/)\>

#### See

https://github.com/LedgerHQ/app-filecoin/blob/develop/docs/APDUSPEC.md#ins_get_addr_secp256k1

***

### getVersion()

> **getVersion**(): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

Defined in: [packages/iso-filecoin/src/ledger.js:297](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L297)

Get the version of the Filecoin app

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

#### See

https://github.com/LedgerHQ/app-filecoin/blob/develop/docs/APDUSPEC.md#get_version

#### Example

```ts twoslash
import { LedgerFilecoin } from 'iso-filecoin/ledger'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'

const transport = await TransportWebUSB.create()
const ledger = new LedgerFilecoin(transport)
const version = await ledger.getVersion()
// => '1.0.0'
```

***

### personalSign()

> **personalSign**(`path`, `message`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>\>

Defined in: [packages/iso-filecoin/src/ledger.js:409](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L409)

Sign a message using FRC-102

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Derivation path |
| `message` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> | Message to sign |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>\>

***

### sign()

> **sign**(`path`, `message`, `type?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>\>

Defined in: [packages/iso-filecoin/src/ledger.js:358](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L358)

Sign a message

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `path` | `string` | `undefined` | Derivation path |
| `message` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> | `undefined` | Message to sign in bytes |
| `type?` | `"SECP256K1"` \| `"DATA_CAP"` \| `"CLIENT_DEAL"` \| `"RAW_BYTES"` \| `"PERSONAL_MESSAGE"` | `'SECP256K1'` | Signature type |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>\>

***

### signRaw()

> **signRaw**(`path`, `message`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>\>

Defined in: [packages/iso-filecoin/src/ledger.js:395](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L395)

Sign raw bytes using prefixed message similar to EIP-191

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Derivation path |
| `message` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> | Message to sign |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>\>

## Properties

### transport

> **transport**: `Transport`

Defined in: [packages/iso-filecoin/src/ledger.js:274](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L274)
