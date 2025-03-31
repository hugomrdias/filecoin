---
editUrl: false
next: true
prev: true
title: "WalletAdapterRaw"
---

Defined in: [packages/iso-filecoin-wallets/src/local.js:46](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L46)

Raw wallet implementation

@implements{WalletAdapter}

## Extends

- `TypedEventTarget`

## Accessors

### connected

#### Get Signature

```ts
get connected(): boolean
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:124](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L124)

Whether the wallet is currently connected

##### Returns

`boolean`

***

### connecting

#### Get Signature

```ts
get connecting(): boolean
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:120](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L120)

Whether the wallet is in the process of connecting

##### Returns

`boolean`

***

### support

#### Get Signature

```ts
get support(): "NotChecked" | "Detected" | "NotDetected" | "NotSupported"
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:127](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L127)

Wallet support status (NotChecked, Detected, NotDetected, NotSupported)

##### Returns

`"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

## Constructors

### Constructor

```ts
new WalletAdapterRaw(config: WalletConfig & {
  privateKey: Uint8Array;
 }): WalletAdapterRaw
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:67](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L67)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`WalletConfig`](/api/iso-filecoin-wallets/filsnap/interfaces/walletconfig/) & \{ `privateKey`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array); \} |

#### Returns

`WalletAdapterRaw`

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
   options?: boolean | AddEventListenerOptions): void
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
| `options`? | `boolean` \| `AddEventListenerOptions` |

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
}>
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:147](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L147)

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
checkSupport(): Promise<void>
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:132](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L132)

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
}>
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:96](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L96)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params`? | \{ `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \} |
| `params.network`? | [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{
  `account`: [`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/);
  `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/);
 \}\>

***

### deriveAccount()

```ts
deriveAccount(_index: number): Promise<IAccount>
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:170](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L170)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_index` | `number` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/)\>

***

### disconnect()

```ts
disconnect(): Promise<void>
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:137](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L137)

Disconnect from the wallet

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### dispatchEvent()

```ts
dispatchEvent(event: Event): boolean
```

Defined in: node\_modules/.pnpm/typescript@5.8.2/node\_modules/typescript/lib/lib.dom.d.ts:8882

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
dispatchTypedEvent<T>(_type: T, event: WalletEvents[T]): boolean
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
emit<T>(...args: WalletEvents[T]["detail"] extends IsAny<WalletEvents[T]["detail"]> ? [T, unknown] : [T, WalletEvents[T]["detail"]]): boolean
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
   options?: boolean | EventListenerOptions): void
```

Defined in: node\_modules/.pnpm/iso-web@1.1.1/node\_modules/iso-web/dist/src/event-target/index.d.ts:55

Alias for [TypedEventTarget.removeEventListener](/api/iso-filecoin-react/types/interfaces/walletadapter/#removeeventlistener)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* \| `"accountChanged"` \| `"networkChanged"` \| `"disconnect"` \| `"connect"` \| `"error"` \| `"stateChanged"` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `T` |
| `callback` | \| `null` \| `TypedEventListenerOrEventListenerObject`\<[`WalletEvents`](/api/iso-filecoin-wallets/filsnap/type-aliases/walletevents/), `T`\> |
| `options`? | `boolean` \| `EventListenerOptions` |

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
   options?: boolean | AddEventListenerOptions): void
```

Defined in: node\_modules/.pnpm/iso-web@1.1.1/node\_modules/iso-web/dist/src/event-target/index.d.ts:38

Alias for [TypedEventTarget.addEventListener](/api/iso-filecoin-react/types/interfaces/walletadapter/#addeventlistener)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* \| `"accountChanged"` \| `"networkChanged"` \| `"disconnect"` \| `"connect"` \| `"error"` \| `"stateChanged"` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `T` |
| `callback` | \| `null` \| `TypedEventListenerOrEventListenerObject`\<[`WalletEvents`](/api/iso-filecoin-wallets/filsnap/type-aliases/walletevents/), `T`\> |
| `options`? | `boolean` \| `AddEventListenerOptions` |

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
   options?: boolean | EventListenerOptions): void
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
| `options`? | `boolean` \| `EventListenerOptions` |

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
sign(data: Uint8Array<ArrayBufferLike>): Promise<Signature>
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:181](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L181)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> | Data to sign |

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
}): Promise<Signature>
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:193](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L193)

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
| `message.params` | `string` | - |
| `message.to` | `string` | - |
| `message.value` | `string` | - |
| `message.version` | `0` | - |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

***

### create()

```ts
static create(): WalletAdapterRaw
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:83](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L83)

#### Returns

`WalletAdapterRaw`

## Properties

### \[symbol\]

```ts
[symbol]: boolean = true;
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:48](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L48)

***

### account

```ts
account: 
  | undefined
  | IAccount = undefined;
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:55](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L55)

***

### id

```ts
id: string = 'raw';
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:50](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L50)

Wallet adapter identifier (e.g. 'filsnap', 'ledger', 'hd', 'raw')

***

### name

```ts
name: string = 'Raw (Unsafe)';
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:51](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L51)

Human readable wallet name

***

### network

```ts
network: Network;
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:70](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L70)

***

### privateKey

```ts
privateKey: Uint8Array<ArrayBufferLike>;
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:72](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L72)

***

### signatureType

```ts
signatureType: "SECP256K1" | "BLS";
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:71](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L71)

***

### uid

```ts
uid: string;
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:49](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L49)

Unique identifier for this wallet instance

***

### url

```ts
url: string = 'https://filecoin.io';
```

Defined in: [packages/iso-filecoin-wallets/src/local.js:52](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/local.js#L52)

Wallet homepage URL
