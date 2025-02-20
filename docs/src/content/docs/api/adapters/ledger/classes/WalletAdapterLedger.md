---
editUrl: false
next: true
prev: true
title: "WalletAdapterLedger"
---

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:27](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L27)

Ledger wallet implementation

## Implements

## Extends

- `TypedEventTarget`

## Accessors

### app

#### Get Signature

```ts
get app(): undefined | LedgerFilecoin
```

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:76](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L76)

##### Returns

`undefined` \| [`LedgerFilecoin`](/api/ledger/classes/ledgerfilecoin/)

***

### connected

#### Get Signature

```ts
get connected(): boolean
```

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:72](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L72)

##### Returns

`boolean`

***

### connecting

#### Get Signature

```ts
get connecting(): boolean
```

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:68](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L68)

##### Returns

`boolean`

***

### support

#### Get Signature

```ts
get support(): "NotChecked" | "Detected" | "NotDetected" | "NotSupported"
```

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:80](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L80)

##### Returns

`"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

## Constructors

### new WalletAdapterLedger()

```ts
new WalletAdapterLedger(config: WalletLedgerConfig): WalletAdapterLedger
```

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:57](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L57)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`WalletLedgerConfig`](/api/adapters/ledger/interfaces/walletledgerconfig/) |  |

#### Returns

[`WalletAdapterLedger`](/api/adapters/ledger/classes/walletadapterledger/)

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

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:142](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L142)

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

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:84](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L84)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### connect()

```ts
connect(): Promise<void>
```

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:99](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L99)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### deriveAccount()

```ts
deriveAccount(index: number): Promise<IAccount>
```

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:167](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L167)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `index` | `number` |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAccount`](/api/adapters/filsnap/interfaces/iaccount/)\>

***

### disconnect()

```ts
disconnect(): Promise<void>
```

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:125](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L125)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### sign()

```ts
sign(data: Uint8Array<ArrayBufferLike>): Promise<Signature>
```

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:187](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L187)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |  |

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

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:213](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L213)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message` | \{ `from`: `string`; `gasFeeCap`: `string`; `gasLimit`: `number`; `gasPremium`: `string`; `method`: `number`; `nonce`: `number`; `params`: `string`; `to`: `string`; `value`: `string`; `version`: `0`; \} |  |
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

## Properties

### account

```ts
account: undefined | IAccount = undefined;
```

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:34](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L34)

***

### icon

```ts
icon: string = 'data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20147%20128%22%20fill%3D%22white%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%222em%22%3E%3Cpath%20d%3D%22M0%2091.655V128h55.293v-8.06H8.056V91.655zm138.944%200v28.285H91.707v8.058H147V91.655zm-83.57-55.31v55.308h36.333v-7.269H63.43V36.345zM0%200v36.345h8.056V8.058h47.237V0zm91.707%200v8.058h47.237v28.287H147V0z%22%2F%3E%3C%2Fsvg%3E';
```

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:30](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L30)

***

### name

```ts
name: string = 'Ledger';
```

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:28](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L28)

***

### network

```ts
network: Network;
```

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:63](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L63)

***

### signatureType

```ts
signatureType: "SECP256K1" | "BLS";
```

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:64](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L64)

***

### url

```ts
url: string = 'https://ledger.com';
```

Defined in: [packages/iso-filecoin/src/adapters/ledger.js:29](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/adapters/ledger.js#L29)
