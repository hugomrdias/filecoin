---
editUrl: false
next: true
prev: true
title: "WalletAdapterFilsnap"
---

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:27](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L27)

Filsnap wallet implementation

## Implements

## Extends

- `TypedEventTarget`

## Accessors

### connected

#### Get Signature

```ts
get connected(): boolean
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:144](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L144)

Whether the wallet is currently connected

##### Returns

`boolean`

***

### connecting

#### Get Signature

```ts
get connecting(): boolean
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:140](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L140)

Whether the wallet is in the process of connecting

##### Returns

`boolean`

***

### support

#### Get Signature

```ts
get support(): "NotChecked" | "Detected" | "NotDetected" | "NotSupported"
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:148](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L148)

Wallet support status (NotChecked, Detected, NotDetected, NotSupported)

##### Returns

`"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

## Constructors

### Constructor

```ts
new WalletAdapterFilsnap(config: WalletConfig & {
  index: number;
  version: string;
 }): WalletAdapterFilsnap
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:63](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L63)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`WalletConfig`](/api/iso-filecoin-wallets/filsnap/interfaces/walletconfig/) & \{ `index`: `number`; `version`: `string`; \} |

#### Returns

`WalletAdapterFilsnap`

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
  account: {
     address: IAddress;
     path: string;
     privateKey: Uint8Array<ArrayBufferLike>;
     publicKey: Uint8Array;
     type: "SECP256K1" | "BLS";
    };
  network: Network;
}>
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:155](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L155)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `network` | [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{
  `account`: \{
     `address`: [`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/);
     `path`: `string`;
     `privateKey`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>;
     `publicKey`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array);
     `type`: `"SECP256K1"` \| `"BLS"`;
    \};
  `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/);
 \}\>

***

### checkSupport()

```ts
checkSupport(): Promise<void>
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:257](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L257)

Check if this wallet adapter is supported in the current environment

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### connect()

```ts
connect(params?: {
  network: Network;
 }): Promise<{
  account: {
     address: IAddress;
     path: string;
     privateKey: Uint8Array<ArrayBufferLike>;
     publicKey: Uint8Array;
     type: "SECP256K1" | "BLS";
    };
  network: Network;
}>
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:84](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L84)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params`? | \{ `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \} |
| `params.network`? | [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{
  `account`: \{
     `address`: [`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/);
     `path`: `string`;
     `privateKey`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>;
     `publicKey`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array);
     `type`: `"SECP256K1"` \| `"BLS"`;
    \};
  `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/);
 \}\>

***

### deriveAccount()

```ts
deriveAccount(_index: number): Promise<{
  address: IAddress;
  path: string;
  privateKey: Uint8Array<ArrayBufferLike>;
  publicKey: Uint8Array;
  type: "SECP256K1" | "BLS";
}>
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:192](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L192)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_index` | `number` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<\{
  `address`: [`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/);
  `path`: `string`;
  `privateKey`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>;
  `publicKey`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array);
  `type`: `"SECP256K1"` \| `"BLS"`;
 \}\>

***

### disconnect()

```ts
disconnect(): Promise<void>
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:269](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L269)

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

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:221](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L221)

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

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:239](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L239)

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

### is()

```ts
static is(value: WalletAdapter): value is WalletAdapterFilsnap
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:77](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L77)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`WalletAdapter`](/api/iso-filecoin-wallets/filsnap/interfaces/walletadapter/) |

#### Returns

`value is WalletAdapterFilsnap`

## Properties

### \[symbol\]

```ts
[symbol]: boolean = true;
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:29](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L29)

***

### account

```ts
account: 
  | undefined
  | {
  address: IAddress;
  path: string;
  privateKey: Uint8Array<ArrayBufferLike>;
  publicKey: Uint8Array;
  type: "SECP256K1" | "BLS";
 } = undefined;
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:36](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L36)

#### Type declaration

`undefined`

\{
  `address`: [`IAddress`](/api/iso-filecoin/address/interfaces/iaddress/);
  `path`: `string`;
  `privateKey`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>;
  `publicKey`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array);
  `type`: `"SECP256K1"` \| `"BLS"`;
 \}

#### address

```ts
address: IAddress;
```

#### path

```ts
path: string;
```

Derivation path - only for HD wallets

#### privateKey?

```ts
optional privateKey: Uint8Array<ArrayBufferLike>;
```

Private key - only for RAW and HD wallets

#### publicKey

```ts
publicKey: Uint8Array;
```

#### type

```ts
type: "SECP256K1" | "BLS";
```

***

### filsnap

```ts
filsnap: undefined | FilsnapAdapter;
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:42](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L42)

***

### id

```ts
id: string = 'filsnap';
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:31](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L31)

Wallet adapter identifier (e.g. 'filsnap', 'ledger', 'hd', 'raw')

***

### name

```ts
name: string = 'Filsnap';
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:32](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L32)

Human readable wallet name

***

### network

```ts
network: Network;
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:69](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L69)

***

### signatureType

```ts
signatureType: "SECP256K1" | "BLS";
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:70](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L70)

***

### uid

```ts
uid: string;
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:30](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L30)

Unique identifier for this wallet instance

***

### url

```ts
url: string = 'https://snaps.metamask.io/snap/npm/filsnap/';
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:33](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L33)

Wallet homepage URL

***

### version

```ts
version: string;
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:68](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L68)
