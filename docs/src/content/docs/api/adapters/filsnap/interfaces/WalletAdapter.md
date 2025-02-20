---
editUrl: false
next: true
prev: true
title: "WalletAdapter"
---

Defined in: [packages/iso-filecoin/src/adapters/types.ts:61](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L61)

Wallet adapter interface

## Extends

- `TypedEventTarget`\<[`WalletEvents`](/api/adapters/filsnap/type-aliases/walletevents/)\>

## Methods

### sign()

```ts
sign(data: Uint8Array): Promise<Signature>
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:83](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L83)

Sign raw bytes

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | raw bytes to sign |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/signature/classes/signature/)\>

## Properties

### account

```ts
account: undefined | IAccount;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:69](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L69)

***

### changeNetwork()

```ts
changeNetwork: (network: Network) => Promise<{
  account: IAccount;
  network: Network;
}>;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:74](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L74)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `network` | [`Network`](/api/adapters/filsnap/type-aliases/network/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{
  `account`: [`IAccount`](/api/adapters/filsnap/interfaces/iaccount/);
  `network`: [`Network`](/api/adapters/filsnap/type-aliases/network/);
 \}\>

***

### checkSupport()

```ts
checkSupport: () => Promise<void>;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:70](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L70)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### connect()

```ts
connect: () => Promise<void>;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:71](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L71)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### connected

```ts
readonly connected: boolean;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:68](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L68)

***

### connecting

```ts
readonly connecting: boolean;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:67](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L67)

***

### deriveAccount()

```ts
deriveAccount: (index: number) => Promise<IAccount>;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:73](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L73)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `index` | `number` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAccount`](/api/adapters/filsnap/interfaces/iaccount/)\>

***

### disconnect()

```ts
disconnect: () => Promise<void>;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:72](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L72)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### icon

```ts
icon: string;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:64](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L64)

***

### name

```ts
name: string;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:62](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L62)

***

### network

```ts
network: Network;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:65](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L65)

***

### signMessage()

```ts
signMessage: (message: {
  from: string;
  gasFeeCap: string;
  gasLimit: number;
  gasPremium: string;
  method: number;
  nonce: number;
  params: string;
  to: string;
  value: string;
  version: 0;
}) => Promise<Signature>;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:90](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L90)

Sign filecoin message

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
| `message.params` | `string` | Params encoded as base64pad |
| `message.to` | `string` | - |
| `message.value` | `string` | Value in attoFIL |
| `message.version` | `0` | - |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/signature/classes/signature/)\>

***

### support

```ts
readonly support: "NotChecked" | "Detected" | "NotDetected" | "NotSupported";
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:66](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L66)

***

### url

```ts
url: string;
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:63](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L63)
