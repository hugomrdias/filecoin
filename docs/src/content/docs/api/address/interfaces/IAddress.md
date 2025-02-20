---
editUrl: false
next: true
prev: true
title: "IAddress"
---

Defined in: [packages/iso-filecoin/src/types.ts:90](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L90)

Address interface

## Properties

### checksum()

```ts
checksum: () => Uint8Array;
```

Defined in: [packages/iso-filecoin/src/types.ts:97](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L97)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

***

### id?

```ts
optional id: bigint;
```

Defined in: [packages/iso-filecoin/src/types.ts:96](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L96)

***

### namespace?

```ts
optional namespace: number;
```

Defined in: [packages/iso-filecoin/src/types.ts:95](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L95)

***

### network

```ts
network: Network;
```

Defined in: [packages/iso-filecoin/src/types.ts:93](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L93)

***

### networkPrefix

```ts
networkPrefix: NetworkPrefix;
```

Defined in: [packages/iso-filecoin/src/types.ts:94](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L94)

***

### payload

```ts
payload: Uint8Array;
```

Defined in: [packages/iso-filecoin/src/types.ts:92](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L92)

***

### protocol

```ts
protocol: ProtocolIndicatorCode;
```

Defined in: [packages/iso-filecoin/src/types.ts:91](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L91)

***

### to0x()

```ts
to0x: (options: AddressRpcOptions) => Promise<string>;
```

Defined in: [packages/iso-filecoin/src/types.ts:110](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L110)

Converts any address to a 0x address, either id masked address or eth address depending on the address type.
Delegated addresses convert to eth address and f1, f2, f3 convert to id masked address
and f0 depends on the underline address type

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`AddressRpcOptions`](/api/address/interfaces/addressrpcoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`string`\>

***

### toBytes()

```ts
toBytes: () => Uint8Array;
```

Defined in: [packages/iso-filecoin/src/types.ts:100](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L100)

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

***

### toContractDestination()

```ts
toContractDestination: () => `0x${string}`;
```

Defined in: [packages/iso-filecoin/src/types.ts:98](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L98)

#### Returns

`` `0x${string}` ``

***

### toIdAddress()

```ts
toIdAddress: (options: AddressRpcOptions) => Promise<AddressId>;
```

Defined in: [packages/iso-filecoin/src/types.ts:104](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L104)

Convert to ID address

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`AddressRpcOptions`](/api/address/interfaces/addressrpcoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AddressId`](/api/address/classes/addressid/)\>

***

### toString()

```ts
toString: () => string;
```

Defined in: [packages/iso-filecoin/src/types.ts:99](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L99)

#### Returns

`string`
