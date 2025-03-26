---
editUrl: false
next: true
prev: true
title: "WalletAdapterHd"
---

Defined in: [packages/iso-filecoin-wallets/src/hd.js:33](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L33)

HD wallet implementation

## Implements

## Extends

- `TypedEventTarget`

## Accessors

### connected

#### Get Signature

```ts
get connected(): boolean
```

Defined in: [packages/iso-filecoin-wallets/src/hd.js:99](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L99)

##### Returns

`boolean`

***

### connecting

#### Get Signature

```ts
get connecting(): boolean
```

Defined in: [packages/iso-filecoin-wallets/src/hd.js:95](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L95)

##### Returns

`boolean`

***

### support

#### Get Signature

```ts
get support(): "NotChecked" | "Detected" | "NotDetected" | "NotSupported"
```

Defined in: [packages/iso-filecoin-wallets/src/hd.js:103](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L103)

##### Returns

`"NotChecked"` \| `"Detected"` \| `"NotDetected"` \| `"NotSupported"`

## Constructors

### Constructor

```ts
new WalletAdapterHd(config: WalletHDConfig): WalletAdapterHd
```

Defined in: [packages/iso-filecoin-wallets/src/hd.js:60](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L60)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`WalletHDConfig`](/api/iso-filecoin-wallets/hd/interfaces/wallethdconfig/) |

#### Returns

`WalletAdapterHd`

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

Defined in: [packages/iso-filecoin-wallets/src/hd.js:165](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L165)

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

Defined in: [packages/iso-filecoin-wallets/src/hd.js:108](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L108)

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

Defined in: [packages/iso-filecoin-wallets/src/hd.js:126](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L126)

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

Defined in: [packages/iso-filecoin-wallets/src/hd.js:193](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L193)

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

Defined in: [packages/iso-filecoin-wallets/src/hd.js:155](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L155)

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

### setup()

```ts
setup(config: WalletHDMnemonicConfig & {
  index: number;
 }): void
```

Defined in: [packages/iso-filecoin-wallets/src/hd.js:117](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L117)

Setup the wallet from a mnemonic

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`WalletHDMnemonicConfig`](/api/iso-filecoin-wallets/hd/interfaces/wallethdmnemonicconfig/) & \{ `index`: `number`; \} |

#### Returns

`void`

***

### sign()

```ts
sign(data: Uint8Array<ArrayBufferLike>): Promise<Signature>
```

Defined in: [packages/iso-filecoin-wallets/src/hd.js:214](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L214)

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

Defined in: [packages/iso-filecoin-wallets/src/hd.js:230](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L230)

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

### fromMnemonic()

```ts
static fromMnemonic(config: WalletHDMnemonicConfig): WalletAdapterHd
```

Defined in: [packages/iso-filecoin-wallets/src/hd.js:84](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L84)

HD wallet from mnemonic

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`WalletHDMnemonicConfig`](/api/iso-filecoin-wallets/hd/interfaces/wallethdmnemonicconfig/) |

#### Returns

`WalletAdapterHd`

***

### is()

```ts
static is(value: WalletAdapter): value is WalletAdapterHd
```

Defined in: [packages/iso-filecoin-wallets/src/hd.js:74](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L74)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`WalletAdapter`](/api/iso-filecoin-wallets/filsnap/interfaces/walletadapter/) |

#### Returns

`value is WalletAdapterHd`

## Properties

### \[symbol\]

```ts
[symbol]: boolean = true;
```

Defined in: [packages/iso-filecoin-wallets/src/hd.js:35](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L35)

***

### account

```ts
account: 
  | undefined
  | IAccount = undefined;
```

Defined in: [packages/iso-filecoin-wallets/src/hd.js:42](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L42)

***

### icon

```ts
icon: string = 'data:image/svg+xml,%3Csvg%20width%3D%2234%22%20height%3D%2234%22%20viewBox%3D%22-5%200%2034%2034%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M23.555%2025.1A11.979%2011.979%200%200%201%200%2021.857a7.9%207.9%200%200%201%20.485-2.924C1.643%2011.595%208.785%2011.063%204.8%200c0%200%206.65%201.727%208%2012.143%200%200%204.919-.163%201.6-7.286A21.31%2021.31%200%200%201%2024%2020c.027%201.71-.122%203.42-.445%205.1%22%20fill%3D%22%23FF6E6E%22%2F%3E%3Cpath%20d%3D%22M19%2026.5a7.5%207.5%200%200%201-14.975.484L4%2027s-.075-3.272%200-4c.684-6.611%202.6-9.563%205-14%20.067-2.639-1.115%207.273%205%2010a8.19%208.19%200%200%201%205%207.5%22%20fill%3D%22%230C0058%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E';
```

Defined in: [packages/iso-filecoin-wallets/src/hd.js:38](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L38)

***

### name

```ts
name: string = 'HD Burner Wallet';
```

Defined in: [packages/iso-filecoin-wallets/src/hd.js:36](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L36)

***

### network

```ts
network: Network;
```

Defined in: [packages/iso-filecoin-wallets/src/hd.js:66](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L66)

***

### signatureType

```ts
signatureType: "SECP256K1" | "BLS";
```

Defined in: [packages/iso-filecoin-wallets/src/hd.js:67](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L67)

***

### url

```ts
url: string = 'https://filecoin.io';
```

Defined in: [packages/iso-filecoin-wallets/src/hd.js:37](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/hd.js#L37)
