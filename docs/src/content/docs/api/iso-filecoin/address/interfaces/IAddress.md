---
editUrl: false
next: true
prev: true
title: "IAddress"
---

Defined in: [packages/iso-filecoin/src/types.ts:95](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L95)

Address interface

## Properties

### checksum()

```ts
checksum: () => Uint8Array;
```

Defined in: [packages/iso-filecoin/src/types.ts:102](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L102)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

***

### id?

```ts
optional id: bigint;
```

Defined in: [packages/iso-filecoin/src/types.ts:101](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L101)

***

### namespace?

```ts
optional namespace: number;
```

Defined in: [packages/iso-filecoin/src/types.ts:100](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L100)

***

### network

```ts
network: Network;
```

Defined in: [packages/iso-filecoin/src/types.ts:98](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L98)

***

### networkPrefix

```ts
networkPrefix: NetworkPrefix;
```

Defined in: [packages/iso-filecoin/src/types.ts:99](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L99)

***

### payload

```ts
payload: Uint8Array;
```

Defined in: [packages/iso-filecoin/src/types.ts:97](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L97)

***

### protocol

```ts
protocol: ProtocolIndicatorCode;
```

Defined in: [packages/iso-filecoin/src/types.ts:96](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L96)

***

### to0x()

```ts
to0x: (options: AddressRpcOptions) => Promise<string>;
```

Defined in: [packages/iso-filecoin/src/types.ts:115](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L115)

Converts any address to a 0x address, either id masked address or eth address depending on the address type.
Delegated addresses convert to eth address and f1, f2, f3 convert to id masked address
and f0 depends on the underline address type

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`AddressRpcOptions`](/api/iso-filecoin/types/interfaces/addressrpcoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

***

### toBytes()

```ts
toBytes: () => Uint8Array;
```

Defined in: [packages/iso-filecoin/src/types.ts:105](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L105)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

***

### toContractDestination()

```ts
toContractDestination: () => `0x${string}`;
```

Defined in: [packages/iso-filecoin/src/types.ts:103](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L103)

#### Returns

`` `0x${string}` ``

***

### toIdAddress()

```ts
toIdAddress: (options: AddressRpcOptions) => Promise<AddressId>;
```

Defined in: [packages/iso-filecoin/src/types.ts:109](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L109)

Convert to ID address

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`AddressRpcOptions`](/api/iso-filecoin/types/interfaces/addressrpcoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AddressId`](/api/iso-filecoin/address/classes/addressid/)\>

***

### toString()

```ts
toString: () => string;
```

Defined in: [packages/iso-filecoin/src/types.ts:104](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L104)

#### Returns

`string`
