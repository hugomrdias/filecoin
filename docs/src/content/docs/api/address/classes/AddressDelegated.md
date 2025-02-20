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

- [`Address`](/api/address/classes/address/)

## Constructors

### new AddressDelegated()

```ts
new AddressDelegated(
   namespace: number, 
   payload: Uint8Array<ArrayBufferLike>, 
   network: Network): AddressDelegated
```

Defined in: [packages/iso-filecoin/src/address.js:836](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L836)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `namespace` | `number` |  |
| `payload` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |  |
| `network` | [`Network`](/api/adapters/filsnap/type-aliases/network/) |  |

#### Returns

[`AddressDelegated`](/api/address/classes/addressdelegated/)

#### Overrides

[`Address`](/api/address/classes/address/).[`constructor`](/api/address/classes/address/#constructors)

## Methods

### checksum()

```ts
checksum(): Uint8Array<ArrayBufferLike>
```

Defined in: [packages/iso-filecoin/src/address.js:337](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L337)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

#### Inherited from

[`Address`](/api/address/classes/address/).[`checksum`](/api/address/classes/address/#checksum)

***

### to0x()

```ts
to0x(_rpc: AddressRpcOptions): Promise<string>
```

Defined in: [packages/iso-filecoin/src/address.js:940](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L940)

Convert address to ethereum address

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_rpc` | [`AddressRpcOptions`](/api/address/interfaces/addressrpcoptions/) |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

#### Overrides

[`Address`](/api/address/classes/address/).[`to0x`](/api/address/classes/address/#to0x)

***

### toBytes()

```ts
toBytes(): Uint8Array<ArrayBuffer>
```

Defined in: [packages/iso-filecoin/src/address.js:965](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L965)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)\>

#### Overrides

[`Address`](/api/address/classes/address/).[`toBytes`](/api/address/classes/address/#tobytes)

***

### toContractDestination()

```ts
toContractDestination(): `0x${string}`
```

Defined in: [packages/iso-filecoin/src/address.js:333](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L333)

#### Returns

`` `0x${string}` ``

#### Inherited from

[`Address`](/api/address/classes/address/).[`toContractDestination`](/api/address/classes/address/#tocontractdestination)

***

### toEthAddress()

```ts
toEthAddress(): string
```

Defined in: [packages/iso-filecoin/src/address.js:949](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L949)

Converts to 0x eth address, it's similar to [to0x](../../../../../../../api/address/classes/addressdelegated/#to0x) but sync
because f4s dont need to check the chain to get the address

#### Returns

`string`

***

### toIdAddress()

```ts
toIdAddress(options: AddressRpcSafetyOptions): Promise<AddressId>
```

Defined in: [packages/iso-filecoin/src/address.js:348](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L348)

Convert to ID address

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`AddressRpcSafetyOptions`](/api/address/interfaces/addressrpcsafetyoptions/) |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AddressId`](/api/address/classes/addressid/)\>

#### Inherited from

[`Address`](/api/address/classes/address/).[`toIdAddress`](/api/address/classes/address/#toidaddress)

***

### toString()

```ts
toString(): string
```

Defined in: [packages/iso-filecoin/src/address.js:959](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L959)

#### Returns

`string`

#### Overrides

[`Address`](/api/address/classes/address/).[`toString`](/api/address/classes/address/#tostring)

***

### fromBytes()

```ts
static fromBytes(bytes: Uint8Array<ArrayBufferLike>, network: Network): AddressDelegated
```

Defined in: [packages/iso-filecoin/src/address.js:895](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L895)

Create address from bytes

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `bytes` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |  |
| `network` | [`Network`](/api/adapters/filsnap/type-aliases/network/) |  |

#### Returns

[`AddressDelegated`](/api/address/classes/addressdelegated/)

***

### fromEthAddress()

```ts
static fromEthAddress(address: string, network: Network): AddressDelegated
```

Defined in: [packages/iso-filecoin/src/address.js:915](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L915)

Create delegated address from ethereum address

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | `string` |  |
| `network` | [`Network`](/api/adapters/filsnap/type-aliases/network/) |  |

#### Returns

[`AddressDelegated`](/api/address/classes/addressdelegated/)

***

### fromString()

```ts
static fromString(address: string): AddressDelegated
```

Defined in: [packages/iso-filecoin/src/address.js:858](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L858)

Create address from string

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | `string` |  |

#### Returns

[`AddressDelegated`](/api/address/classes/addressdelegated/)

## Properties

### \[symbol\]

```ts
[symbol]: boolean = true;
```

Defined in: [packages/iso-filecoin/src/address.js:308](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L308)

#### Inherited from

[`Address`](/api/address/classes/address/).[`[symbol]`](/api/address/classes/address/#symbol)

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

[`Address`](/api/address/classes/address/).[`network`](/api/address/classes/address/#network-1)

***

### networkPrefix

```ts
networkPrefix: "f" | "t";
```

Defined in: [packages/iso-filecoin/src/address.js:318](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L318)

#### Inherited from

[`Address`](/api/address/classes/address/).[`networkPrefix`](/api/address/classes/address/#networkprefix)

***

### payload

```ts
payload: Uint8Array<ArrayBufferLike>;
```

Defined in: [packages/iso-filecoin/src/address.js:316](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L316)

#### Inherited from

[`Address`](/api/address/classes/address/).[`payload`](/api/address/classes/address/#payload-1)

***

### protocol

```ts
protocol: 4;
```

Defined in: [packages/iso-filecoin/src/address.js:838](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/address.js#L838)

#### Inherited from

[`Address`](/api/address/classes/address/).[`protocol`](/api/address/classes/address/#protocol)
