---
editUrl: false
next: true
prev: true
title: "LedgerFilecoin"
---

Defined in: [packages/iso-filecoin/src/ledger.js:258](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L258)

Ledger Filecoin app client

## Constructors

### new LedgerFilecoin()

```ts
new LedgerFilecoin(transport: Transport): LedgerFilecoin
```

Defined in: [packages/iso-filecoin/src/ledger.js:263](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L263)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `transport` | `Transport` | Ledger transport |

#### Returns

[`LedgerFilecoin`](/api/ledger/classes/ledgerfilecoin/)

## Methods

### close()

```ts
close(): Promise<void>
```

Defined in: [packages/iso-filecoin/src/ledger.js:387](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L387)

Close the transport

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### getAddress()

```ts
getAddress(path: string, showOnDevice?: boolean): Promise<IAccount>
```

Defined in: [packages/iso-filecoin/src/ledger.js:304](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L304)

Get the secp256k1 address for a given derivation path

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `path` | `string` | `undefined` | Derivation path |
| `showOnDevice`? | `boolean` | `false` | Whether to show the address on the device |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAccount`](/api/adapters/filsnap/interfaces/iaccount/)\>

#### See

https://github.com/LedgerHQ/app-filecoin/blob/develop/docs/APDUSPEC.md#ins_get_addr_secp256k1

***

### getVersion()

```ts
getVersion(): Promise<string>
```

Defined in: [packages/iso-filecoin/src/ledger.js:278](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L278)

Get the version of the Filecoin app

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

#### See

https://github.com/LedgerHQ/app-filecoin/blob/develop/docs/APDUSPEC.md#get_version

***

### sign()

```ts
sign(
   path: string, 
   message: Uint8Array<ArrayBufferLike>, 
type?: "SECP256K1" | "DATA_CAP" | "CLIENT_DEAL" | "RAW_BYTES"): Promise<Uint8Array<ArrayBufferLike>>
```

Defined in: [packages/iso-filecoin/src/ledger.js:339](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L339)

Sign a message

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `path` | `string` | `undefined` | Derivation path |
| `message` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> | `undefined` | Message to sign in bytes |
| `type`? | `"SECP256K1"` \| `"DATA_CAP"` \| `"CLIENT_DEAL"` \| `"RAW_BYTES"` | `'SECP256K1'` | Signature type |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>\>

***

### signRaw()

```ts
signRaw(path: string, message: Uint8Array<ArrayBufferLike>): Promise<Uint8Array<ArrayBufferLike>>
```

Defined in: [packages/iso-filecoin/src/ledger.js:376](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L376)

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

Defined in: [packages/iso-filecoin/src/ledger.js:264](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L264)
