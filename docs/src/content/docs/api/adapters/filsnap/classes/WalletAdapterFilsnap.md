---
editUrl: false
next: true
prev: true
title: "WalletAdapterFilsnap"
---

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:53](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L53)

Local wallet implementation

## Implements

## Extends

- `TypedEventTarget`

## Accessors

### connected

#### Get Signature

```ts
get connected(): boolean
```

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:174](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L174)

##### Returns

`boolean`

***

### connecting

#### Get Signature

```ts
get connecting(): boolean
```

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:170](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L170)

##### Returns

`boolean`

***

### support

#### Get Signature

```ts
get support(): "NotChecked" | "Detected" | "NotDetected" | "NotSupported"
```

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:178](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L178)

##### Returns

`"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

## Constructors

### new WalletAdapterFilsnap()

```ts
new WalletAdapterFilsnap(config: WalletConfig & {
  index: number;
  version: string;
 }): WalletAdapterFilsnap
```

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:89](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L89)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`WalletConfig`](/api/adapters/filsnap/interfaces/walletconfig/) & \{ `index`: `number`; `version`: `string`; \} |  |

#### Returns

[`WalletAdapterFilsnap`](/api/adapters/filsnap/classes/walletadapterfilsnap/)

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

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:196](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L196)

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

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:106](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L106)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### connect()

```ts
connect(): Promise<void>
```

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:118](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L118)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### deriveAccount()

```ts
deriveAccount(_index: number): Promise<IAccount>
```

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:232](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L232)

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

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:182](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L182)

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### sign()

```ts
sign(data: Uint8Array<ArrayBufferLike>): Promise<Signature>
```

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:263](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L263)

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

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:284](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L284)

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

### is()

```ts
static is(value: WalletAdapter): value is WalletAdapterFilsnap
```

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:102](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L102)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | [`WalletAdapter`](/api/adapters/filsnap/interfaces/walletadapter/) |  |

#### Returns

`value is WalletAdapterFilsnap`

## Properties

### \[symbol\]

```ts
[symbol]: boolean = true;
```

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:55](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L55)

***

### account

```ts
account: undefined | IAccount = undefined;
```

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:62](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L62)

***

### filsnap

```ts
filsnap: undefined | FilsnapAdapter;
```

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:68](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L68)

***

### icon

```ts
icon: string = 'data:image/svg+xml,%3Csvg%20viewBox%3D%2229%2034%20260%20240%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%222em%22%3E%3Cstyle%3E.st1%2C.st6%7Bfill%3A%23e4761b%3Bstroke%3A%23e4761b%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%7D.st6%7Bfill%3A%23f6851b%3Bstroke%3A%23f6851b%7D%3C%2Fstyle%3E%3Cpath%20style%3D%22fill%3A%23e2761b%3Bstroke%3A%23e2761b%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%22%20d%3D%22m274.1%2035.5-99.5%2073.9L193%2065.8z%22%2F%3E%3Cpath%20class%3D%22st1%22%20d%3D%22m44.4%2035.5%2098.7%2074.6-17.5-44.3zm193.9%20171.3-26.5%2040.6%2056.7%2015.6%2016.3-55.3zm-204.4.9L50.1%20263l56.7-15.6-26.5-40.6z%22%2F%3E%3Cpath%20class%3D%22st1%22%20d%3D%22m103.6%20138.2-15.8%2023.9%2056.3%202.5-2-60.5zm111.3%200-39-34.8-1.3%2061.2%2056.2-2.5zM106.8%20247.4l33.8-16.5-29.2-22.8zm71.1-16.5%2033.9%2016.5-4.7-39.3z%22%2F%3E%3Cpath%20d%3D%22m211.8%20247.4-33.9-16.5%202.7%2022.1-.3%209.3zm-105%200%2031.5%2014.9-.2-9.3%202.5-22.1z%22%20style%3D%22stroke-linecap%3Around%3Bstroke-linejoin%3Around%3Bfill%3A%23d7c1b3%3Bstroke%3A%23d7c1b3%22%2F%3E%3Cpath%20d%3D%22m138.8%20193.5-28.2-8.3%2019.9-9.1zm40.9%200%208.3-17.4%2020%209.1z%22%20style%3D%22stroke-linecap%3Around%3Bstroke-linejoin%3Around%3Bfill%3A%23233447%3Bstroke%3A%23233447%22%2F%3E%3Cpath%20d%3D%22m106.8%20247.4%204.8-40.6-31.3.9zM207%20206.8l4.8%2040.6%2026.5-39.7zm23.8-44.7-56.2%202.5%205.2%2028.9%208.3-17.4%2020%209.1zm-120.2%2023.1%2020-9.1%208.2%2017.4%205.3-28.9-56.3-2.5z%22%20style%3D%22stroke-linecap%3Around%3Bstroke-linejoin%3Around%3Bfill%3A%23cd6116%3Bstroke%3A%23cd6116%22%2F%3E%3Cpath%20d%3D%22m87.8%20162.1%2023.6%2046-.8-22.9zm120.3%2023.1-1%2022.9%2023.7-46zm-64-20.6-5.3%2028.9%206.6%2034.1%201.5-44.9zm30.5%200-2.7%2018%201.2%2045%206.7-34.1z%22%20style%3D%22stroke-linecap%3Around%3Bstroke-linejoin%3Around%3Bfill%3A%23e4751f%3Bstroke%3A%23e4751f%22%2F%3E%3Cpath%20class%3D%22st6%22%20d%3D%22m179.8%20193.5-6.7%2034.1%204.8%203.3%2029.2-22.8%201-22.9zm-69.2-8.3.8%2022.9%2029.2%2022.8%204.8-3.3-6.6-34.1z%22%2F%3E%3Cpath%20style%3D%22fill%3A%23c0ad9e%3Bstroke%3A%23c0ad9e%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%22%20d%3D%22m180.3%20262.3.3-9.3-2.5-2.2h-37.7l-2.3%202.2.2%209.3-31.5-14.9%2011%209%2022.3%2015.5h38.3l22.4-15.5%2011-9z%22%2F%3E%3Cpath%20style%3D%22fill%3A%23161616%3Bstroke%3A%23161616%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%22%20d%3D%22m177.9%20230.9-4.8-3.3h-27.7l-4.8%203.3-2.5%2022.1%202.3-2.2h37.7l2.5%202.2z%22%2F%3E%3Cpath%20d%3D%22m278.3%20114.2%208.5-40.8-12.7-37.9-96.2%2071.4%2037%2031.3%2052.3%2015.3%2011.6-13.5-5-3.6%208-7.3-6.2-4.8%208-6.1zM31.8%2073.4l8.5%2040.8-5.4%204%208%206.1-6.1%204.8%208%207.3-5%203.6%2011.5%2013.5%2052.3-15.3%2037-31.3-96.2-71.4z%22%20style%3D%22stroke-linecap%3Around%3Bstroke-linejoin%3Around%3Bfill%3A%23763d16%3Bstroke%3A%23763d16%22%2F%3E%3Cpath%20class%3D%22st6%22%20d%3D%22m267.2%20153.5-52.3-15.3%2015.9%2023.9-23.7%2046%2031.2-.4h46.5zm-163.6-15.3-52.3%2015.3-17.4%2054.2h46.4l31.1.4-23.6-46zm71%2026.4%203.3-57.7%2015.2-41.1h-67.5l15%2041.1%203.5%2057.7%201.2%2018.2.1%2044.8h27.7l.2-44.8z%22%2F%3E%3C%2Fsvg%3E';
```

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:58](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L58)

***

### name

```ts
name: string = 'Filsnap';
```

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:56](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L56)

***

### network

```ts
network: Network;
```

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:94](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L94)

***

### signatureType

```ts
signatureType: "SECP256K1" | "BLS";
```

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:95](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L95)

***

### url

```ts
url: string = 'https://snaps.metamask.io/snap/npm/filsnap/';
```

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:57](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L57)

***

### version

```ts
version: string;
```

Defined in: [packages/iso-filecoin/src/adapters/filsnap.js:93](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/filsnap.js#L93)
