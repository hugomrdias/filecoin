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

```ts
new LedgerFilecoin(transport: Transport): LedgerFilecoin;
```

Defined in: [packages/iso-filecoin/src/ledger.js:273](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L273)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `transport` | `Transport` | Ledger transport |

#### Returns

`LedgerFilecoin`

## Methods

### close()

```ts
close(): Promise<void>;
```

Defined in: [packages/iso-filecoin/src/ledger.js:406](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L406)

Close the transport

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### getAddress()

```ts
getAddress(path: string, showOnDevice?: boolean): Promise<IAccount>;
```

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

```ts
getVersion(): Promise<string>;
```

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

### sign()

```ts
sign(
   path: string, 
   message: Uint8Array<ArrayBufferLike>, 
type?: "SECP256K1" | "DATA_CAP" | "CLIENT_DEAL" | "RAW_BYTES"): Promise<Uint8Array<ArrayBufferLike>>;
```

Defined in: [packages/iso-filecoin/src/ledger.js:358](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L358)

Sign a message

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `path` | `string` | `undefined` | Derivation path |
| `message` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> | `undefined` | Message to sign in bytes |
| `type?` | `"SECP256K1"` \| `"DATA_CAP"` \| `"CLIENT_DEAL"` \| `"RAW_BYTES"` | `'SECP256K1'` | Signature type |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>\>

***

### signRaw()

```ts
signRaw(path: string, message: Uint8Array<ArrayBufferLike>): Promise<Uint8Array<ArrayBufferLike>>;
```

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

```ts
transport: Transport;
```

Defined in: [packages/iso-filecoin/src/ledger.js:274](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L274)
