---
editUrl: false
next: true
prev: true
title: "WalletAdapterLedger"
---

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:28](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L28)

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
  | LedgerFilecoin
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:77](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L77)

##### Returns

  \| `undefined`
  \| [`LedgerFilecoin`](/api/iso-filecoin/ledger/classes/ledgerfilecoin/)

***

### connected

#### Get Signature

```ts
get connected(): boolean
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:73](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L73)

##### Returns

`boolean`

***

### connecting

#### Get Signature

```ts
get connecting(): boolean
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:69](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L69)

##### Returns

`boolean`

***

### support

#### Get Signature

```ts
get support(): "NotChecked" | "Detected" | "NotDetected" | "NotSupported"
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:81](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L81)

##### Returns

`"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

## Constructors

### Constructor

```ts
new WalletAdapterLedger(config: WalletLedgerConfig): WalletAdapterLedger
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:58](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L58)

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
   options?: boolean | AddEventListenerOptions): void
```

Defined in: node\_modules/.pnpm/iso-web@1.1.0/node\_modules/iso-web/dist/src/event-target/index.d.ts:29

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

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:151](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L151)

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

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:85](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L85)

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

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:103](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L103)

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
deriveAccount(index: number): Promise<IAccount>
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:179](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L179)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `index` | `number` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`IAccount`](/api/iso-filecoin-wallets/ledger/interfaces/iaccount/)\>

***

### disconnect()

```ts
disconnect(): Promise<void>
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:134](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L134)

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

Defined in: node\_modules/.pnpm/iso-web@1.1.0/node\_modules/iso-web/dist/src/event-target/index.d.ts:20

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

Defined in: node\_modules/.pnpm/iso-web@1.1.0/node\_modules/iso-web/dist/src/event-target/index.d.ts:21

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

Defined in: node\_modules/.pnpm/iso-web@1.1.0/node\_modules/iso-web/dist/src/event-target/index.d.ts:55

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

Defined in: node\_modules/.pnpm/iso-web@1.1.0/node\_modules/iso-web/dist/src/event-target/index.d.ts:38

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

Defined in: node\_modules/.pnpm/iso-web@1.1.0/node\_modules/iso-web/dist/src/event-target/index.d.ts:46

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

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:198](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L198)

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
}): Promise<Signature>
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:224](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L224)

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

### account

```ts
account: 
  | undefined
  | IAccount = undefined;
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:35](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L35)

***

### icon

```ts
icon: string = 'data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20147%20128%22%20fill%3D%22white%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%222em%22%3E%3Cpath%20d%3D%22M0%2091.655V128h55.293v-8.06H8.056V91.655zm138.944%200v28.285H91.707v8.058H147V91.655zm-83.57-55.31v55.308h36.333v-7.269H63.43V36.345zM0%200v36.345h8.056V8.058h47.237V0zm91.707%200v8.058h47.237v28.287H147V0z%22%2F%3E%3C%2Fsvg%3E';
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:31](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L31)

***

### name

```ts
name: string = 'Ledger';
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:29](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L29)

***

### network

```ts
network: Network;
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:64](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L64)

***

### signatureType

```ts
signatureType: "SECP256K1" | "BLS";
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:65](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L65)

***

### url

```ts
url: string = 'https://ledger.com';
```

Defined in: [packages/iso-filecoin-wallets/src/ledger.js:30](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/ledger.js#L30)
