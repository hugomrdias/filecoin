---
editUrl: false
next: true
prev: true
title: "Address"
---

Defined in: [packages/iso-filecoin/src/address.js:306](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L306)

Generic address class

## Implements

## Extended by

- [`AddressId`](/api/address/classes/addressid/)
- [`AddressSecp256k1`](/api/address/classes/addresssecp256k1/)
- [`AddressActor`](/api/address/classes/addressactor/)
- [`AddressBLS`](/api/address/classes/addressbls/)
- [`AddressDelegated`](/api/address/classes/addressdelegated/)

## Constructors

### new Address()

```ts
new Address(payload: Uint8Array<ArrayBufferLike>, network: Network): Address
```

Defined in: [packages/iso-filecoin/src/address.js:315](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L315)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `payload` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |  |
| `network` | [`Network`](/api/adapters/filsnap/type-aliases/network/) |  |

#### Returns

[`Address`](/api/address/classes/address/)

## Methods

### checksum()

```ts
checksum(): Uint8Array<ArrayBufferLike>
```

Defined in: [packages/iso-filecoin/src/address.js:337](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L337)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

***

### to0x()

```ts
to0x(options: AddressRpcSafetyOptions): Promise<string>
```

Defined in: [packages/iso-filecoin/src/address.js:399](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L399)

Converts any address to a 0x address, either id masked address or eth address depending on the address type.
Delegated addresses convert to eth address and f1, f2, f3 convert to id masked address
and f0 depends on the underline address type

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`AddressRpcSafetyOptions`](/api/address/interfaces/addressrpcsafetyoptions/) |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

***

### toBytes()

```ts
toBytes(): Uint8Array<ArrayBuffer>
```

Defined in: [packages/iso-filecoin/src/address.js:329](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L329)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)\>

***

### toContractDestination()

```ts
toContractDestination(): `0x${string}`
```

Defined in: [packages/iso-filecoin/src/address.js:333](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L333)

#### Returns

`` `0x${string}` ``

***

### toIdAddress()

```ts
toIdAddress(options: AddressRpcSafetyOptions): Promise<AddressId>
```

Defined in: [packages/iso-filecoin/src/address.js:348](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L348)

Convert to ID address

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`AddressRpcSafetyOptions`](/api/address/interfaces/addressrpcsafetyoptions/) |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AddressId`](/api/address/classes/addressid/)\>

***

### toString()

```ts
toString(): string
```

Defined in: [packages/iso-filecoin/src/address.js:323](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L323)

#### Returns

`string`

## Properties

### \[symbol\]

```ts
[symbol]: boolean = true;
```

Defined in: [packages/iso-filecoin/src/address.js:308](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L308)

***

### network

```ts
network: Network;
```

Defined in: [packages/iso-filecoin/src/address.js:317](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L317)

***

### networkPrefix

```ts
networkPrefix: "f" | "t";
```

Defined in: [packages/iso-filecoin/src/address.js:318](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L318)

***

### payload

```ts
payload: Uint8Array<ArrayBufferLike>;
```

Defined in: [packages/iso-filecoin/src/address.js:316](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L316)

***

### protocol

```ts
protocol: ProtocolIndicatorCode;
```

Defined in: [packages/iso-filecoin/src/address.js:320](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/address.js#L320)
