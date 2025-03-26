---
editUrl: false
next: true
prev: true
title: "WalletAdapterFilsnap"
---

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:26](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L26)

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

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:142](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L142)

##### Returns

`boolean`

***

### connecting

#### Get Signature

```ts
get connecting(): boolean
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:138](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L138)

##### Returns

`boolean`

***

### support

#### Get Signature

```ts
get support(): "NotChecked" | "Detected" | "NotDetected" | "NotSupported"
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:146](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L146)

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

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:62](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L62)

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

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:153](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L153)

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

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:255](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L255)

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

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:82](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L82)

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

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:190](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L190)

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

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:267](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L267)

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

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:219](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L219)

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

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:237](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L237)

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

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:75](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L75)

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

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:28](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L28)

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

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:35](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L35)

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

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:41](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L41)

***

### icon

```ts
icon: string = 'data:image/svg+xml,%3Csvg%20viewBox%3D%2229%2034%20260%20240%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%222em%22%3E%3Cstyle%3E.st1%2C.st6%7Bfill%3A%23e4761b%3Bstroke%3A%23e4761b%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%7D.st6%7Bfill%3A%23f6851b%3Bstroke%3A%23f6851b%7D%3C%2Fstyle%3E%3Cpath%20style%3D%22fill%3A%23e2761b%3Bstroke%3A%23e2761b%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%22%20d%3D%22m274.1%2035.5-99.5%2073.9L193%2065.8z%22%2F%3E%3Cpath%20class%3D%22st1%22%20d%3D%22m44.4%2035.5%2098.7%2074.6-17.5-44.3zm193.9%20171.3-26.5%2040.6%2056.7%2015.6%2016.3-55.3zm-204.4.9L50.1%20263l56.7-15.6-26.5-40.6z%22%2F%3E%3Cpath%20class%3D%22st1%22%20d%3D%22m103.6%20138.2-15.8%2023.9%2056.3%202.5-2-60.5zm111.3%200-39-34.8-1.3%2061.2%2056.2-2.5zM106.8%20247.4l33.8-16.5-29.2-22.8zm71.1-16.5%2033.9%2016.5-4.7-39.3z%22%2F%3E%3Cpath%20d%3D%22m211.8%20247.4-33.9-16.5%202.7%2022.1-.3%209.3zm-105%200%2031.5%2014.9-.2-9.3%202.5-22.1z%22%20style%3D%22stroke-linecap%3Around%3Bstroke-linejoin%3Around%3Bfill%3A%23d7c1b3%3Bstroke%3A%23d7c1b3%22%2F%3E%3Cpath%20d%3D%22m138.8%20193.5-28.2-8.3%2019.9-9.1zm40.9%200%208.3-17.4%2020%209.1z%22%20style%3D%22stroke-linecap%3Around%3Bstroke-linejoin%3Around%3Bfill%3A%23233447%3Bstroke%3A%23233447%22%2F%3E%3Cpath%20d%3D%22m106.8%20247.4%204.8-40.6-31.3.9zM207%20206.8l4.8%2040.6%2026.5-39.7zm23.8-44.7-56.2%202.5%205.2%2028.9%208.3-17.4%2020%209.1zm-120.2%2023.1%2020-9.1%208.2%2017.4%205.3-28.9-56.3-2.5z%22%20style%3D%22stroke-linecap%3Around%3Bstroke-linejoin%3Around%3Bfill%3A%23cd6116%3Bstroke%3A%23cd6116%22%2F%3E%3Cpath%20d%3D%22m87.8%20162.1%2023.6%2046-.8-22.9zm120.3%2023.1-1%2022.9%2023.7-46zm-64-20.6-5.3%2028.9%206.6%2034.1%201.5-44.9zm30.5%200-2.7%2018%201.2%2045%206.7-34.1z%22%20style%3D%22stroke-linecap%3Around%3Bstroke-linejoin%3Around%3Bfill%3A%23e4751f%3Bstroke%3A%23e4751f%22%2F%3E%3Cpath%20class%3D%22st6%22%20d%3D%22m179.8%20193.5-6.7%2034.1%204.8%203.3%2029.2-22.8%201-22.9zm-69.2-8.3.8%2022.9%2029.2%2022.8%204.8-3.3-6.6-34.1z%22%2F%3E%3Cpath%20style%3D%22fill%3A%23c0ad9e%3Bstroke%3A%23c0ad9e%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%22%20d%3D%22m180.3%20262.3.3-9.3-2.5-2.2h-37.7l-2.3%202.2.2%209.3-31.5-14.9%2011%209%2022.3%2015.5h38.3l22.4-15.5%2011-9z%22%2F%3E%3Cpath%20style%3D%22fill%3A%23161616%3Bstroke%3A%23161616%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%22%20d%3D%22m177.9%20230.9-4.8-3.3h-27.7l-4.8%203.3-2.5%2022.1%202.3-2.2h37.7l2.5%202.2z%22%2F%3E%3Cpath%20d%3D%22m278.3%20114.2%208.5-40.8-12.7-37.9-96.2%2071.4%2037%2031.3%2052.3%2015.3%2011.6-13.5-5-3.6%208-7.3-6.2-4.8%208-6.1zM31.8%2073.4l8.5%2040.8-5.4%204%208%206.1-6.1%204.8%208%207.3-5%203.6%2011.5%2013.5%2052.3-15.3%2037-31.3-96.2-71.4z%22%20style%3D%22stroke-linecap%3Around%3Bstroke-linejoin%3Around%3Bfill%3A%23763d16%3Bstroke%3A%23763d16%22%2F%3E%3Cpath%20class%3D%22st6%22%20d%3D%22m267.2%20153.5-52.3-15.3%2015.9%2023.9-23.7%2046%2031.2-.4h46.5zm-163.6-15.3-52.3%2015.3-17.4%2054.2h46.4l31.1.4-23.6-46zm71%2026.4%203.3-57.7%2015.2-41.1h-67.5l15%2041.1%203.5%2057.7%201.2%2018.2.1%2044.8h27.7l.2-44.8z%22%2F%3E%3C%2Fsvg%3E';
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:31](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L31)

***

### name

```ts
name: string = 'Filsnap';
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:29](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L29)

***

### network

```ts
network: Network;
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:67](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L67)

***

### signatureType

```ts
signatureType: "SECP256K1" | "BLS";
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:68](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L68)

***

### url

```ts
url: string = 'https://snaps.metamask.io/snap/npm/filsnap/';
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:30](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L30)

***

### version

```ts
version: string;
```

Defined in: [packages/iso-filecoin-wallets/src/filsnap.js:66](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/filsnap.js#L66)
