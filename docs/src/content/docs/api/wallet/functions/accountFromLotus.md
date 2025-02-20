---
editUrl: false
next: true
prev: true
title: "accountFromLotus"
---

```ts
function accountFromLotus(lotusHex: string, network: Network): IAccount
```

Defined in: [packages/iso-filecoin/src/wallet.js:131](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/wallet.js#L131)

Get account from lotus private key export

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `lotusHex` | `string` | Lotus hex encoded private key .ie `hex({"Type":"bls","PrivateKey":"base64pad(private-key)"})` |
| `network` | [`Network`](/api/adapters/filsnap/type-aliases/network/) | Network |

## Returns

[`IAccount`](/api/adapters/filsnap/interfaces/iaccount/)
