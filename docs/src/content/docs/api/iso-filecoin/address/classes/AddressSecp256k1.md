---
editUrl: false
next: true
prev: true
title: "AddressSecp256k1"
---

Defined in: [packages/iso-filecoin/src/address.js:601](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L601)

Secp256k1 address f1..

## See

https://spec.filecoin.io/appendix/address/#section-appendix.address.protocol-1-libsecpk1-elliptic-curve-public-keys

## Implements

## Extends

- `Address`

## Constructors

### Constructor

```ts
new AddressSecp256k1(payload: Uint8Array<ArrayBufferLike>, network: Network): AddressSecp256k1;
```

Defined in: [packages/iso-filecoin/src/address.js:607](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L607)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `payload` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `network` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |

#### Returns

`AddressSecp256k1`

#### Overrides

```ts
Address.constructor
```

## Methods

### checksum()

```ts
checksum(): Uint8Array<ArrayBufferLike>;
```

Defined in: [packages/iso-filecoin/src/address.js:337](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L337)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

#### Inherited from

```ts
Address.checksum
```

***

### to0x()

```ts
to0x(options: AddressRpcSafetyOptions): Promise<string>;
```

Defined in: [packages/iso-filecoin/src/address.js:399](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L399)

Converts any address to a 0x address, either id masked address or eth address depending on the address type.
Delegated addresses convert to eth address and f1, f2, f3 convert to id masked address
and f0 depends on the underline address type

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`AddressRpcSafetyOptions`](/api/iso-filecoin/types/interfaces/addressrpcsafetyoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

#### Inherited from

```ts
Address.to0x
```

***

### toBytes()

```ts
toBytes(): Uint8Array<ArrayBuffer>;
```

Defined in: [packages/iso-filecoin/src/address.js:329](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L329)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)\>

#### Inherited from

```ts
Address.toBytes
```

***

### toContractDestination()

```ts
toContractDestination(): `0x${string}`;
```

Defined in: [packages/iso-filecoin/src/address.js:333](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L333)

#### Returns

`` `0x${string}` ``

#### Inherited from

```ts
Address.toContractDestination
```

***

### toIdAddress()

```ts
toIdAddress(options: AddressRpcSafetyOptions): Promise<AddressId>;
```

Defined in: [packages/iso-filecoin/src/address.js:348](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L348)

Convert to ID address

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`AddressRpcSafetyOptions`](/api/iso-filecoin/types/interfaces/addressrpcsafetyoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AddressId`](/api/iso-filecoin/address/classes/addressid/)\>

#### Inherited from

```ts
Address.toIdAddress
```

***

### toString()

```ts
toString(): string;
```

Defined in: [packages/iso-filecoin/src/address.js:323](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L323)

#### Returns

`string`

#### Inherited from

```ts
Address.toString
```

***

### fromBytes()

```ts
static fromBytes(bytes: Uint8Array<ArrayBufferLike>, network: Network): AddressSecp256k1;
```

Defined in: [packages/iso-filecoin/src/address.js:651](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L651)

Create address from bytes

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `bytes` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `network` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |

#### Returns

`AddressSecp256k1`

***

### fromPublicKey()

```ts
static fromPublicKey(publicKey: Uint8Array<ArrayBufferLike>, network: Network): AddressSecp256k1;
```

Defined in: [packages/iso-filecoin/src/address.js:662](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L662)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `publicKey` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `network` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |

#### Returns

`AddressSecp256k1`

***

### fromString()

```ts
static fromString(address: string): AddressSecp256k1;
```

Defined in: [packages/iso-filecoin/src/address.js:621](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L621)

Create address from string

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `address` | `string` |

#### Returns

`AddressSecp256k1`

## Properties

### \[symbol\]

```ts
[symbol]: boolean = true;
```

Defined in: [packages/iso-filecoin/src/address.js:308](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L308)

#### Inherited from

```ts
Address.[symbol]
```

***

### network

```ts
network: Network;
```

Defined in: [packages/iso-filecoin/src/address.js:317](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L317)

#### Inherited from

```ts
Address.network
```

***

### networkPrefix

```ts
networkPrefix: "f" | "t";
```

Defined in: [packages/iso-filecoin/src/address.js:318](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L318)

#### Inherited from

```ts
Address.networkPrefix
```

***

### payload

```ts
payload: Uint8Array<ArrayBufferLike>;
```

Defined in: [packages/iso-filecoin/src/address.js:316](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L316)

#### Inherited from

```ts
Address.payload
```

***

### protocol

```ts
protocol: 1;
```

Defined in: [packages/iso-filecoin/src/address.js:609](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L609)

#### Inherited from

```ts
Address.protocol
```
