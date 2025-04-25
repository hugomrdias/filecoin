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

> **new Message**(`msg`): `Message`

Defined in: [packages/iso-filecoin/src/message.js:70](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L70)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `msg` | \{ `from`: `string`; `gasFeeCap?`: `string`; `gasLimit?`: `number`; `gasPremium?`: `string`; `method?`: `number`; `nonce?`: `number`; `params?`: `string`; `to`: `string`; `value`: `string`; `version?`: `0`; \} | - |
| `msg.from` | `string` | - |
| `msg.gasFeeCap?` | `string` | - |
| `msg.gasLimit?` | `number` | - |
| `msg.gasPremium?` | `string` | - |
| `msg.method?` | `number` | - |
| `msg.nonce?` | `number` | - |
| `msg.params?` | `string` | Params encoded as base64pad |
| `msg.to` | `string` | - |
| `msg.value` | `string` | Value in attoFIL |
| `msg.version?` | `0` | - |

#### Returns

`Message`

## Methods

### cidBytes()

> **cidBytes**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

Defined in: [packages/iso-filecoin/src/message.js:200](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L200)

CID bytes of the filecoin message

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

***

### prepare()

> **prepare**(`rpc`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`Message`\>

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

> **serialize**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

Defined in: [packages/iso-filecoin/src/message.js:175](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L175)

Serialize message using dag-cbor

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\>

***

### toLotus()

> **toLotus**(): `object`

Defined in: [packages/iso-filecoin/src/message.js:87](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L87)

Convert message to Lotus message

#### Returns

`object`

##### From

> **From**: `string`

##### GasFeeCap

> **GasFeeCap**: `string`

##### GasLimit

> **GasLimit**: `number`

##### GasPremium

> **GasPremium**: `string`

##### Method

> **Method**: `number`

##### Nonce

> **Nonce**: `number`

##### Params

> **Params**: `string`

##### To

> **To**: `string`

##### Value

> **Value**: `string`

##### Version

> **Version**: `0`

***

### fromLotus()

> `static` **fromLotus**(`json`): `Message`

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

> **from**: `string`

Defined in: [packages/iso-filecoin/src/message.js:74](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L74)

***

### gasFeeCap

> **gasFeeCap**: `string`

Defined in: [packages/iso-filecoin/src/message.js:78](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L78)

***

### gasLimit

> **gasLimit**: `number`

Defined in: [packages/iso-filecoin/src/message.js:77](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L77)

***

### gasPremium

> **gasPremium**: `string`

Defined in: [packages/iso-filecoin/src/message.js:79](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L79)

***

### method

> **method**: `number`

Defined in: [packages/iso-filecoin/src/message.js:80](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L80)

***

### nonce

> **nonce**: `number`

Defined in: [packages/iso-filecoin/src/message.js:75](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L75)

***

### params

> **params**: `string`

Defined in: [packages/iso-filecoin/src/message.js:81](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L81)

***

### to

> **to**: `string`

Defined in: [packages/iso-filecoin/src/message.js:73](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L73)

***

### value

> **value**: `string`

Defined in: [packages/iso-filecoin/src/message.js:76](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L76)

***

### version

> **version**: `0`

Defined in: [packages/iso-filecoin/src/message.js:72](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/message.js#L72)
