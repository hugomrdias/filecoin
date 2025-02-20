---
editUrl: false
next: true
prev: true
title: "WalletAdapterLocal"
---

Defined in: [packages/iso-filecoin/src/adapters/local.js:43](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L43)

Local wallet implementation

@implements{WalletAdapter}

## Extends

- `TypedEventTarget`

## Accessors

### connected

#### Get Signature

```ts
get connected(): boolean
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:106](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L106)

##### Returns

`boolean`

***

### connecting

#### Get Signature

```ts
get connecting(): boolean
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:102](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L102)

##### Returns

`boolean`

***

### support

#### Get Signature

```ts
get support(): "NotChecked" | "Detected" | "NotDetected" | "NotSupported"
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:109](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L109)

##### Returns

`"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

## Constructors

### new WalletAdapterLocal()

```ts
new WalletAdapterLocal(config: WalletConfig & {
  privateKey: Uint8Array;
 }): WalletAdapterLocal
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:62](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L62)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`WalletConfig`](/api/adapters/filsnap/interfaces/walletconfig/) & \{ `privateKey`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array); \} |  |

#### Returns

[`WalletAdapterLocal`](/api/adapters/local/classes/walletadapterlocal/)

#### Overrides

```ts
TypedEventTarget.constructor
```

## Methods

### changeNetwork()

```ts
changeNetwork(network: Network): Promise<{
  account: undefined | IAccount;
  network: Network;
}>
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:128](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L128)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `network` | [`Network`](/api/adapters/filsnap/type-aliases/network/) |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{
  `account`: `undefined` \| [`IAccount`](/api/adapters/filsnap/interfaces/iaccount/);
  `network`: [`Network`](/api/adapters/filsnap/type-aliases/network/);
 \}\>

***

### checkSupport()

```ts
checkSupport(): Promise<void>
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:114](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L114)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### connect()

```ts
connect(): Promise<void>
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:87](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L87)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### deriveAccount()

```ts
deriveAccount(_index: number): Promise<IAccount>
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:151](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L151)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_index` | `number` |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAccount`](/api/adapters/filsnap/interfaces/iaccount/)\>

***

### disconnect()

```ts
disconnect(): Promise<void>
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:119](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L119)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### sign()

```ts
sign(data: Uint8Array<ArrayBufferLike>): Promise<Signature>
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:162](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L162)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> | Data to sign |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/signature/classes/signature/)\>

***

### signMessage()

```ts
signMessage(message: {
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
}): Promise<Signature>
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:174](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L174)

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

### create()

```ts
static create(): WalletAdapterLocal
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:78](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L78)

#### Returns

[`WalletAdapterLocal`](/api/adapters/local/classes/walletadapterlocal/)

## Properties

### account

```ts
account: undefined | IAccount = undefined;
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:50](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L50)

***

### icon

```ts
icon: string = 'data:image/svg+xml,%3Csvg%20width%3D%2234%22%20height%3D%2234%22%20viewBox%3D%22-5%200%2034%2034%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M23.555%2025.1A11.979%2011.979%200%200%201%200%2021.857a7.9%207.9%200%200%201%20.485-2.924C1.643%2011.595%208.785%2011.063%204.8%200c0%200%206.65%201.727%208%2012.143%200%200%204.919-.163%201.6-7.286A21.31%2021.31%200%200%201%2024%2020c.027%201.71-.122%203.42-.445%205.1%22%20fill%3D%22%23FF6E6E%22%2F%3E%3Cpath%20d%3D%22M19%2026.5a7.5%207.5%200%200%201-14.975.484L4%2027s-.075-3.272%200-4c.684-6.611%202.6-9.563%205-14%20.067-2.639-1.115%207.273%205%2010a8.19%208.19%200%200%201%205%207.5%22%20fill%3D%22%230C0058%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E';
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:46](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L46)

***

### name

```ts
name: string = 'Local';
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:44](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L44)

***

### network

```ts
network: Network;
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:65](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L65)

***

### privateKey

```ts
privateKey: Uint8Array<ArrayBufferLike>;
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:67](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L67)

***

### signatureType

```ts
signatureType: "SECP256K1" | "BLS";
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:66](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L66)

***

### url

```ts
url: string = 'https://filecoin.io';
```

Defined in: [packages/iso-filecoin/src/adapters/local.js:45](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/local.js#L45)
