---
editUrl: false
next: true
prev: true
title: "WalletAdapterLedger"
---

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:31](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L31)

Ledger wallet implementation

## Implements

## Extends

- `TypedEventTarget`

## Accessors

### app

#### Get Signature

```ts
get app(): 
  | undefined
  | LedgerFilecoin;
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:82](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L82)

##### Returns

  \| `undefined`
  \| [`LedgerFilecoin`](/api/iso-filecoin/ledger/classes/ledgerfilecoin/)

***

### connected

#### Get Signature

```ts
get connected(): boolean;
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:78](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L78)

Whether the wallet is currently connected

##### Returns

`boolean`

***

### connecting

#### Get Signature

```ts
get connecting(): boolean;
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:74](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L74)

Whether the wallet is in the process of connecting

##### Returns

`boolean`

***

### support

#### Get Signature

```ts
get support(): "NotChecked" | "Detected" | "NotDetected" | "NotSupported";
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:86](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L86)

Wallet support status (NotChecked, Detected, NotDetected, NotSupported)

##### Returns

`"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

## Constructors

### Constructor

```ts
new WalletAdapterLedger(config: WalletLedgerConfig): WalletAdapterLedger;
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:63](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L63)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`WalletLedgerConfig`](/api/iso-filecoin-wallets/ledger/interfaces/walletledgerconfig/) |

#### Returns

`WalletAdapterLedger`

#### Overrides

```ts
TypedEventTarget.constructor
```

## Methods

### addEventListener()

```ts
addEventListener<T>(
   type: T, 
   callback: 
  | null
  | TypedEventListenerOrEventListenerObject<WalletEvents, T>, 
   options?: boolean | AddEventListenerOptions): void;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.1/node\_modules/iso-web/dist/src/event-target/index.d.ts:29

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* \| `"accountChanged"` \| `"networkChanged"` \| `"disconnect"` \| `"connect"` \| `"error"` \| `"stateChanged"` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `T` |
| `callback` | \| `null` \| `TypedEventListenerOrEventListenerObject`\<[`WalletEvents`](/api/iso-filecoin-wallets/filsnap/type-aliases/walletevents/), `T`\> |
| `options?` | `boolean` \| `AddEventListenerOptions` |

#### Returns

`void`

#### Inherit Doc

#### Inherited from

```ts
TypedEventTarget.addEventListener
```

***

### changeNetwork()

```ts
changeNetwork(network: Network): Promise<{
  account: IAccount;
  network: Network;
}>;
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:156](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L156)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `network` | [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{
  `account`: [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/);
  `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/);
\}\>

***

### checkSupport()

```ts
checkSupport(): Promise<void>;
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:90](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L90)

Check if this wallet adapter is supported in the current environment

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### connect()

```ts
connect(params?: {
  network: Network;
}): Promise<{
  account: IAccount;
  network: Network;
}>;
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:108](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L108)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params?` | \{ `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \} |
| `params.network?` | [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{
  `account`: [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/);
  `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/);
\}\>

***

### deriveAccount()

```ts
deriveAccount(index: number): Promise<IAccount>;
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:184](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L184)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `index` | `number` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/)\>

***

### disconnect()

```ts
disconnect(): Promise<void>;
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:139](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L139)

Disconnect from the wallet

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### dispatchEvent()

```ts
dispatchEvent(event: Event): boolean;
```

Defined in: node\_modules/.pnpm/typescript@5.8.3/node\_modules/typescript/lib/lib.dom.d.ts:8882

Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/dispatchEvent)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | [`Event`](https://developer.mozilla.org/docs/Web/API/Event) |

#### Returns

`boolean`

#### Inherited from

```ts
TypedEventTarget.dispatchEvent
```

***

### dispatchTypedEvent()

```ts
dispatchTypedEvent<T>(_type: T, event: WalletEvents[T]): boolean;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.1/node\_modules/iso-web/dist/src/event-target/index.d.ts:20

Dispatches a synthetic event to target and returns true if either
event's cancelable attribute value is false or its preventDefault() method
was not invoked, and false otherwise.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* keyof [`WalletEvents`](/api/iso-filecoin-wallets/filsnap/type-aliases/walletevents/) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_type` | `T` |
| `event` | [`WalletEvents`](/api/iso-filecoin-wallets/filsnap/type-aliases/walletevents/)\[`T`\] |

#### Returns

`boolean`

#### Inherited from

```ts
TypedEventTarget.dispatchTypedEvent
```

***

### emit()

```ts
emit<T>(...args: WalletEvents[T]["detail"] extends IsAny<WalletEvents[T]["detail"]> ? [T, unknown] : [T, WalletEvents[T]["detail"]]): boolean;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.1/node\_modules/iso-web/dist/src/event-target/index.d.ts:21

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* keyof [`WalletEvents`](/api/iso-filecoin-wallets/filsnap/type-aliases/walletevents/) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`args` | [`WalletEvents`](/api/iso-filecoin-wallets/filsnap/type-aliases/walletevents/)\[`T`\]\[`"detail"`\] *extends* `IsAny`\<[`WalletEvents`](/api/iso-filecoin-wallets/filsnap/type-aliases/walletevents/)\[`T`\]\[`"detail"`\]\> ? \[`T`, `unknown`\] : \[`T`, [`WalletEvents`](/api/iso-filecoin-wallets/filsnap/type-aliases/walletevents/)\[`T`\]\[`"detail"`\]\] |

#### Returns

`boolean`

#### Inherited from

```ts
TypedEventTarget.emit
```

***

### off()

```ts
off<T>(
   type: T, 
   callback: 
  | null
  | TypedEventListenerOrEventListenerObject<WalletEvents, T>, 
   options?: boolean | EventListenerOptions): void;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.1/node\_modules/iso-web/dist/src/event-target/index.d.ts:55

Alias for [TypedEventTarget.removeEventListener](/api/iso-filecoin-react/index/interfaces/walletadapter/#removeeventlistener)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* \| `"accountChanged"` \| `"networkChanged"` \| `"disconnect"` \| `"connect"` \| `"error"` \| `"stateChanged"` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `T` |
| `callback` | \| `null` \| `TypedEventListenerOrEventListenerObject`\<[`WalletEvents`](/api/iso-filecoin-wallets/filsnap/type-aliases/walletevents/), `T`\> |
| `options?` | `boolean` \| `EventListenerOptions` |

#### Returns

`void`

#### Inherited from

```ts
TypedEventTarget.off
```

***

### on()

```ts
on<T>(
   type: T, 
   callback: 
  | null
  | TypedEventListenerOrEventListenerObject<WalletEvents, T>, 
   options?: boolean | AddEventListenerOptions): void;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.1/node\_modules/iso-web/dist/src/event-target/index.d.ts:38

Alias for [TypedEventTarget.addEventListener](/api/iso-filecoin-react/index/interfaces/walletadapter/#addeventlistener)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* \| `"accountChanged"` \| `"networkChanged"` \| `"disconnect"` \| `"connect"` \| `"error"` \| `"stateChanged"` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `T` |
| `callback` | \| `null` \| `TypedEventListenerOrEventListenerObject`\<[`WalletEvents`](/api/iso-filecoin-wallets/filsnap/type-aliases/walletevents/), `T`\> |
| `options?` | `boolean` \| `AddEventListenerOptions` |

#### Returns

`void`

#### Inherited from

```ts
TypedEventTarget.on
```

***

### removeEventListener()

```ts
removeEventListener<T>(
   type: T, 
   callback: 
  | null
  | TypedEventListenerOrEventListenerObject<WalletEvents, T>, 
   options?: boolean | EventListenerOptions): void;
```

Defined in: node\_modules/.pnpm/iso-web@1.1.1/node\_modules/iso-web/dist/src/event-target/index.d.ts:46

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* \| `"accountChanged"` \| `"networkChanged"` \| `"disconnect"` \| `"connect"` \| `"error"` \| `"stateChanged"` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `T` |
| `callback` | \| `null` \| `TypedEventListenerOrEventListenerObject`\<[`WalletEvents`](/api/iso-filecoin-wallets/filsnap/type-aliases/walletevents/), `T`\> |
| `options?` | `boolean` \| `EventListenerOptions` |

#### Returns

`void`

#### Inherit Doc

#### Inherited from

```ts
TypedEventTarget.removeEventListener
```

***

### sign()

```ts
sign(data: Uint8Array<ArrayBufferLike>): Promise<Signature>;
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:203](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L203)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

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
}): Promise<Signature>;
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:229](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L229)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | \{ `from`: `string`; `gasFeeCap`: `string`; `gasLimit`: `number`; `gasPremium`: `string`; `method`: `number`; `nonce`: `number`; `params`: `string`; `to`: `string`; `value`: `string`; `version`: `0`; \} |
| `message.from` | `string` |
| `message.gasFeeCap` | `string` |
| `message.gasLimit` | `number` |
| `message.gasPremium` | `string` |
| `message.method` | `number` |
| `message.nonce` | `number` |
| `message.params` | `string` |
| `message.to` | `string` |
| `message.value` | `string` |
| `message.version` | `0` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

## Properties

### \[symbol\]

```ts
[symbol]: boolean = true;
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:33](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L33)

***

### account

```ts
account: 
  | undefined
  | IAccount = undefined;
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:40](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L40)

***

### id

```ts
id: string = 'ledger';
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:35](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L35)

Wallet adapter identifier (e.g. 'filsnap', 'ledger', 'hd', 'raw')

***

### name

```ts
name: string = 'Ledger';
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:36](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L36)

Human readable wallet name

***

### network

```ts
network: Network;
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:69](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L69)

***

### signatureType

```ts
signatureType: "SECP256K1" | "BLS";
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:70](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L70)

***

### uid

```ts
uid: string;
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:34](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L34)

Unique identifier for this wallet instance

***

### url

```ts
url: string = 'https://ledger.com';
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:37](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L37)

Wallet homepage URL
