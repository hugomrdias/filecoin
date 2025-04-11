---
editUrl: false
next: true
prev: true
title: "WalletAdapter"
---

Defined in: [packages/iso-filecoin-wallets/src/types.ts:76](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L76)

Wallet adapter interface

## Extends

- `TypedEventTarget`\<[`WalletEvents`](/api/iso-filecoin-wallets/filsnap/type-aliases/walletevents/)\>

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
sign(data: Uint8Array): Promise<Signature>;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:153](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L153)

Sign raw bytes

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | raw bytes to sign |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

## Properties

### account

```ts
readonly account: 
  | undefined
  | IAccount;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:120](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L120)

Currently active account, if connected

***

### changeNetwork()

```ts
changeNetwork: (network: Network) => Promise<AccountNetwork>;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:146](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L146)

Change the network and derive a new account

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `network` | [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/) | The network to change to |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AccountNetwork`](/api/iso-filecoin-wallets/types/interfaces/accountnetwork/)\>

***

### checkSupport()

```ts
checkSupport: () => Promise<void>;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:125](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L125)

Check if this wallet adapter is supported in the current environment

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### connect()

```ts
connect: (params: {
  network: Network;
}) => Promise<AccountNetwork>;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:130](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L130)

Connect to the wallet

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | \{ `network`: [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/); \} | Connect params |
| `params.network?` | [`Network`](/api/iso-filecoin-wallets/filsnap/type-aliases/network/) | - |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`AccountNetwork`](/api/iso-filecoin-wallets/types/interfaces/accountnetwork/)\>

***

### connected

```ts
readonly connected: boolean;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:115](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L115)

Whether the wallet is currently connected

***

### connecting

```ts
readonly connecting: boolean;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:110](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L110)

Whether the wallet is in the process of connecting

***

### deriveAccount()

```ts
deriveAccount: (index: number) => Promise<IAccount>;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:140](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L140)

Derive a new account at the given index

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `index` | `number` | The derivation path index |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/)\>

***

### disconnect()

```ts
disconnect: () => Promise<void>;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:134](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L134)

Disconnect from the wallet

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\>

***

### id

```ts
readonly id: string;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:85](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L85)

Wallet adapter identifier (e.g. 'filsnap', 'ledger', 'hd', 'raw')

***

### name

```ts
name: string;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:90](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L90)

Human readable wallet name

***

### network

```ts
readonly network: Network;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:100](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L100)

Current network (mainnet or testnet)

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

Defined in: [packages/iso-filecoin-wallets/src/types.ts:160](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L160)

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
| `message.params` | `string` | - |
| `message.to` | `string` | - |
| `message.value` | `string` | - |
| `message.version` | `0` | - |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Signature`](/api/iso-filecoin/signature/classes/signature/)\>

***

### support

```ts
readonly support: "NotChecked" | "Detected" | "NotDetected" | "NotSupported";
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:105](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L105)

Wallet support status (NotChecked, Detected, NotDetected, NotSupported)

***

### uid

```ts
readonly uid: string;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:80](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L80)

Unique identifier for this wallet instance

***

### url

```ts
url: string;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:95](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L95)

Wallet homepage URL
