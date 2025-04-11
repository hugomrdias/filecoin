---
editUrl: false
next: true
prev: true
title: "AddressDelegated"
---

Defined in: [packages/iso-filecoin/src/address.js:830](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L830)

Delegated address f4..

## See

https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0048.md

## Implements

## Extends

- `Address`

## Constructors

### Constructor

```ts
new AddressDelegated(
   namespace: number, 
   payload: Uint8Array<ArrayBufferLike>, 
   network: Network): AddressDelegated;
```

Defined in: [packages/iso-filecoin/src/address.js:836](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L836)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespace` | `number` |
| `payload` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `network` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |

#### Returns

`AddressDelegated`

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
to0x(_rpc: AddressRpcOptions): Promise<string>;
```

Defined in: [packages/iso-filecoin/src/address.js:940](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L940)

Convert address to ethereum address

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_rpc` | [`AddressRpcOptions`](/api/iso-filecoin/types/interfaces/addressrpcoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

#### Overrides

```ts
Address.to0x
```

***

### toBytes()

```ts
toBytes(): Uint8Array<ArrayBuffer>;
```

Defined in: [packages/iso-filecoin/src/address.js:965](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L965)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)\>

#### Overrides

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

### toEthAddress()

```ts
toEthAddress(): string;
```

Defined in: [packages/iso-filecoin/src/address.js:949](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L949)

Converts to 0x eth address, it's similar to [to0x](/api/iso-filecoin/address/classes/addressdelegated/#to0x) but sync
because f4s dont need to check the chain to get the address

#### Returns

`string`

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

Defined in: [packages/iso-filecoin/src/address.js:959](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L959)

#### Returns

`string`

#### Overrides

```ts
Address.toString
```

***

### fromBytes()

```ts
static fromBytes(bytes: Uint8Array<ArrayBufferLike>, network: Network): AddressDelegated;
```

Defined in: [packages/iso-filecoin/src/address.js:895](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L895)

Create address from bytes

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `bytes` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |
| `network` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |

#### Returns

`AddressDelegated`

***

### fromEthAddress()

```ts
static fromEthAddress(address: string, network: Network): AddressDelegated;
```

Defined in: [packages/iso-filecoin/src/address.js:915](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L915)

Create delegated address from ethereum address

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `address` | `string` |
| `network` | [`Network`](/api/iso-filecoin/types/type-aliases/network/) |

#### Returns

`AddressDelegated`

***

### fromString()

```ts
static fromString(address: string): AddressDelegated;
```

Defined in: [packages/iso-filecoin/src/address.js:858](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L858)

Create address from string

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `address` | `string` |

#### Returns

`AddressDelegated`

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

### namespace

```ts
namespace: number;
```

Defined in: [packages/iso-filecoin/src/address.js:839](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L839)

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
protocol: 4;
```

Defined in: [packages/iso-filecoin/src/address.js:838](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L838)

#### Inherited from

```ts
Address.protocol
```
