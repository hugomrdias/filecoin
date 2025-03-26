---
editUrl: false
next: true
prev: true
title: "Message"
---

Defined in: [packages/iso-filecoin/src/message.js:59](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L59)

Filecoin Message class

## Constructors

### Constructor

```ts
new Message(msg: {
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
 }): Message
```

Defined in: [packages/iso-filecoin/src/message.js:70](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L70)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `msg` | \{ `from`: `string`; `gasFeeCap`: `string`; `gasLimit`: `number`; `gasPremium`: `string`; `method`: `number`; `nonce`: `number`; `params`: `string`; `to`: `string`; `value`: `string`; `version`: `0`; \} | - |
| `msg.from` | `string` | - |
| `msg.gasFeeCap`? | `string` | - |
| `msg.gasLimit`? | `number` | - |
| `msg.gasPremium`? | `string` | - |
| `msg.method`? | `number` | - |
| `msg.nonce`? | `number` | - |
| `msg.params`? | `string` | Params encoded as base64pad |
| `msg.to` | `string` | - |
| `msg.value` | `string` | Value in attoFIL |
| `msg.version`? | `0` | - |

#### Returns

`Message`

## Methods

### cidBytes()

```ts
cidBytes(): Uint8Array<ArrayBufferLike>
```

Defined in: [packages/iso-filecoin/src/message.js:200](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L200)

CID bytes of the filecoin message

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

***

### prepare()

```ts
prepare(rpc: RPC): Promise<Message>
```

Defined in: [packages/iso-filecoin/src/message.js:130](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L130)

Prepare message for signing with nonce and gas estimation

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `rpc` | [`RPC`](/api/iso-filecoin/rpc/classes/rpc/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`Message`\>

***

### serialize()

```ts
serialize(): Uint8Array<ArrayBufferLike>
```

Defined in: [packages/iso-filecoin/src/message.js:175](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L175)

Serialize message using dag-cbor

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

***

### toLotus()

```ts
toLotus(): {
  From: string;
  GasFeeCap: string;
  GasLimit: number;
  GasPremium: string;
  Method: number;
  Nonce: number;
  Params: string;
  To: string;
  Value: string;
  Version: 0;
}
```

Defined in: [packages/iso-filecoin/src/message.js:87](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L87)

Convert message to Lotus message

#### Returns

```ts
{
  From: string;
  GasFeeCap: string;
  GasLimit: number;
  GasPremium: string;
  Method: number;
  Nonce: number;
  Params: string;
  To: string;
  Value: string;
  Version: 0;
}
```

##### From

```ts
From: string;
```

##### GasFeeCap

```ts
GasFeeCap: string;
```

##### GasLimit

```ts
GasLimit: number;
```

##### GasPremium

```ts
GasPremium: string;
```

##### Method

```ts
Method: number;
```

##### Nonce

```ts
Nonce: number;
```

##### Params

```ts
Params: string;
```

##### To

```ts
To: string;
```

##### Value

```ts
Value: string;
```

##### Version

```ts
Version: 0;
```

***

### fromLotus()

```ts
static fromLotus(json: LotusMessage): Message
```

Defined in: [packages/iso-filecoin/src/message.js:107](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L107)

Create message from Lotus message

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `json` | [`LotusMessage`](/api/iso-filecoin/types/interfaces/lotusmessage/) |

#### Returns

`Message`

## Properties

### from

```ts
from: string;
```

Defined in: [packages/iso-filecoin/src/message.js:74](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L74)

***

### gasFeeCap

```ts
gasFeeCap: string;
```

Defined in: [packages/iso-filecoin/src/message.js:78](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L78)

***

### gasLimit

```ts
gasLimit: number;
```

Defined in: [packages/iso-filecoin/src/message.js:77](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L77)

***

### gasPremium

```ts
gasPremium: string;
```

Defined in: [packages/iso-filecoin/src/message.js:79](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L79)

***

### method

```ts
method: number;
```

Defined in: [packages/iso-filecoin/src/message.js:80](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L80)

***

### nonce

```ts
nonce: number;
```

Defined in: [packages/iso-filecoin/src/message.js:75](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L75)

***

### params

```ts
params: string;
```

Defined in: [packages/iso-filecoin/src/message.js:81](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L81)

***

### to

```ts
to: string;
```

Defined in: [packages/iso-filecoin/src/message.js:73](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L73)

***

### value

```ts
value: string;
```

Defined in: [packages/iso-filecoin/src/message.js:76](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L76)

***

### version

```ts
version: 0;
```

Defined in: [packages/iso-filecoin/src/message.js:72](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L72)
