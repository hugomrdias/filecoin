---
editUrl: false
next: true
prev: true
title: "signMessage"
---

> **signMessage**(`privateKey`, `type`, `message`): [`Signature`](/api/iso-filecoin/signature/classes/signature/)

Defined in: [packages/iso-filecoin/src/wallet.js:224](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/wallet.js#L224)

Sign filecoin message

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `privateKey` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> | - |
| `type` | `"SECP256K1"` \| `"BLS"` | - |
| `message` | \{ `from`: `string`; `gasFeeCap`: `string`; `gasLimit`: `number`; `gasPremium`: `string`; `method`: `number`; `nonce`: `number`; `params`: `string`; `to`: `string`; `value`: `string`; `version`: `0`; \} | - |
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

## Returns

[`Signature`](/api/iso-filecoin/signature/classes/signature/)
