---
editUrl: false
next: true
prev: true
title: "RPC"
---

Defined in: [packages/iso-filecoin/src/rpc.js:125](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L125)

RPC

## Constructors

### Constructor

> **new RPC**(`options`, `fetchOptions?`): `RPC`

Defined in: [packages/iso-filecoin/src/rpc.js:134](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L134)

TODO: remove fetch from Options and use fetch from RequestOptions
TODO: either remove token or merge this.headers with fetchOptions.headers

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`Options`](/api/iso-filecoin/types/interfaces/options/) |
| `fetchOptions?` | `RequestOptions` |

#### Returns

`RPC`

## Methods

### balance()

> **balance**(`address`, `fetchOptions?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`string`, [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

Defined in: [packages/iso-filecoin/src/rpc.js:231](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L231)

WalletBalance returns the balance of the given address at the current head of the chain.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `address` | `string` |
| `fetchOptions?` | `RequestOptions` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`string`, [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

#### See

https://lotus.filecoin.io/reference/lotus/wallet/#walletbalance

***

### call()

> **call**\<`R`\>(`rpcOptions`, `fetchOptions?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`R`, [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

Defined in: [packages/iso-filecoin/src/rpc.js:590](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L590)

Generic method to call any method on the lotus rpc api.

#### Type Parameters

| Type Parameter |
| ------ |
| `R` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `rpcOptions` | [`RpcOptions`](/api/iso-filecoin/types/interfaces/rpcoptions/) |
| `fetchOptions?` | `RequestOptions` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`R`, [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

***

### chainHead()

> **chainHead**(`fetchOptions?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`TipSet`](/api/iso-filecoin/types/interfaces/tipset/), [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

Defined in: [packages/iso-filecoin/src/rpc.js:471](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L471)

The current head of the chain.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fetchOptions?` | `RequestOptions` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`TipSet`](/api/iso-filecoin/types/interfaces/tipset/), [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

#### See

https://github.com/filecoin-project/filecoin-docs/blob/main/reference/json-rpc/chain.md#chainhead

***

### filecoinAddressToEthAddress()

> **filecoinAddressToEthAddress**(`params`, `fetchOptions?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`string`, [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

Defined in: [packages/iso-filecoin/src/rpc.js:340](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L340)

Converts any Filecoin address to an EthAddress.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`FilecoinAddressToEthAddressParams`](/api/iso-filecoin/types/interfaces/filecoinaddresstoethaddressparams/) |
| `fetchOptions?` | `RequestOptions` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`string`, [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

#### See

https://github.com/filecoin-project/lotus/blob/471819bf1ef8a4d5c7c0476a38ce9f5e23c59bfc/api/api_full.go#L743-L768

***

### gasEstimate()

> **gasEstimate**(`params`, `fetchOptions?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`LotusMessage`](/api/iso-filecoin/types/interfaces/lotusmessage/), [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/) \| [`ValidationRpcError`](/api/iso-filecoin/rpc/classes/validationrpcerror/)\>\>

Defined in: [packages/iso-filecoin/src/rpc.js:186](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L186)

GasEstimateMessageGas estimates gas values for unset message gas fields

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`GasEstimateParams`](/api/iso-filecoin/types/interfaces/gasestimateparams/) |
| `fetchOptions?` | `RequestOptions` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`LotusMessage`](/api/iso-filecoin/types/interfaces/lotusmessage/), [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/) \| [`ValidationRpcError`](/api/iso-filecoin/rpc/classes/validationrpcerror/)\>\>

#### See

https://lotus.filecoin.io/reference/lotus/gas/#gasestimatemessagegas

***

### getIDAddress()

> **getIDAddress**(`params`, `fetchOptions?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`string`, [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

Defined in: [packages/iso-filecoin/src/rpc.js:552](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L552)

Get the ID address for an address with different safety guarantees

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | \{ `address`: `string`; `safety?`: [`Safety`](/api/iso-filecoin/types/type-aliases/safety/); \} |
| `params.address` | `string` |
| `params.safety?` | [`Safety`](/api/iso-filecoin/types/type-aliases/safety/) |
| `fetchOptions?` | `RequestOptions` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`string`, [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

***

### getTipSetByHeight()

> **getTipSetByHeight**(`params`, `fetchOptions?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`TipSet`](/api/iso-filecoin/types/interfaces/tipset/), [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

Defined in: [packages/iso-filecoin/src/rpc.js:491](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L491)

Get tipset at the specified epoch (height). If there are no blocks at the specified epoch, a tipset at an earlier epoch will be returned.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`ChainGetTipSetByHeightParams`](/api/iso-filecoin/types/interfaces/chaingettipsetbyheightparams/) |
| `fetchOptions?` | `RequestOptions` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`TipSet`](/api/iso-filecoin/types/interfaces/tipset/), [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

#### See

https://github.com/filecoin-project/filecoin-docs/blob/main/reference/json-rpc/chain.md#chaingettipsetbyheight

***

### lookBackTipSet()

> **lookBackTipSet**(`lookback`, `fetchOptions?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`TipSet`](/api/iso-filecoin/types/interfaces/tipset/), [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

Defined in: [packages/iso-filecoin/src/rpc.js:513](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L513)

Looks back from latest height for a tipset

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `lookback` | `number` | Chain epoch to look back to |
| `fetchOptions?` | `RequestOptions` | - |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`TipSet`](/api/iso-filecoin/types/interfaces/tipset/), [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

***

### networkName()

> **networkName**(`fetchOptions?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`Network`](/api/iso-filecoin/types/type-aliases/network/), [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

Defined in: [packages/iso-filecoin/src/rpc.js:171](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L171)

NetworkName returns the name of the network the node is synced to.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fetchOptions?` | `RequestOptions` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`Network`](/api/iso-filecoin/types/type-aliases/network/), [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

***

### nonce()

> **nonce**(`address`, `fetchOptions?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`number`, [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

Defined in: [packages/iso-filecoin/src/rpc.js:249](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L249)

MpoolGetNonce gets next nonce for the specified sender. Note that this method may not be atomic. Use MpoolPushMessage instead.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `address` | `string` |
| `fetchOptions?` | `RequestOptions` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`number`, [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

#### See

https://lotus.filecoin.io/reference/lotus/mpool/#mpoolgetnonce

***

### pushMessage()

> **pushMessage**(`params`, `fetchOptions?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`CID`](/api/iso-filecoin/types/type-aliases/cid/), [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/) \| [`ValidationRpcError`](/api/iso-filecoin/rpc/classes/validationrpcerror/)\>\>

Defined in: [packages/iso-filecoin/src/rpc.js:268](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L268)

MpoolPush pushes a signed message to mempool.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`PushMessageParams`](/api/iso-filecoin/types/interfaces/pushmessageparams/) |
| `fetchOptions?` | `RequestOptions` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`CID`](/api/iso-filecoin/types/type-aliases/cid/), [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/) \| [`ValidationRpcError`](/api/iso-filecoin/rpc/classes/validationrpcerror/)\>\>

#### See

https://lotus.filecoin.io/reference/lotus/mpool/#mpoolpush

***

### stateAccountKey()

> **stateAccountKey**(`params`, `fetchOptions?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`string`, [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

Defined in: [packages/iso-filecoin/src/rpc.js:365](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L365)

Public key address of the given ID address.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`StateAccountKeyParams`](/api/iso-filecoin/types/interfaces/stateaccountkeyparams/) |
| `fetchOptions?` | `RequestOptions` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`string`, [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

#### See

https://github.com/filecoin-project/lotus/blob/master/documentation/en/api-v0-methods.md#StateAccountKey

***

### stateLookupID()

> **stateLookupID**(`params`, `fetchOptions?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`string`, [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

Defined in: [packages/iso-filecoin/src/rpc.js:440](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L440)

Retrieves the ID address of the given address for a tipset.
If you dont have a specific tipset in mind, better to use [getIDAddress](/api/iso-filecoin/rpc/classes/rpc/#getidaddress).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`StateAccountKeyParams`](/api/iso-filecoin/types/interfaces/stateaccountkeyparams/) |
| `fetchOptions?` | `RequestOptions` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`string`, [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

#### See

https://github.com/filecoin-project/lotus/blob/master/documentation/en/api-v0-methods.md#statelookupid

***

### stateLookupRobustAddress()

> **stateLookupRobustAddress**(`params`, `fetchOptions?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`string`, [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

Defined in: [packages/iso-filecoin/src/rpc.js:402](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L402)

Public key address of the given non-account ID address.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`StateAccountKeyParams`](/api/iso-filecoin/types/interfaces/stateaccountkeyparams/) |
| `fetchOptions?` | `RequestOptions` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`string`, [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

#### See

https://github.com/filecoin-project/lotus/blob/master/documentation/en/api-v0-methods.md#StateLookupRobustAddress

***

### version()

> **version**(`fetchOptions?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`VersionResponse`](/api/iso-filecoin/types/type-aliases/versionresponse/), [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

Defined in: [packages/iso-filecoin/src/rpc.js:159](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L159)

Version returns the version of the Filecoin node.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fetchOptions?` | `RequestOptions` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`VersionResponse`](/api/iso-filecoin/types/type-aliases/versionresponse/), [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

***

### waitMsg()

> **waitMsg**(`params`, `fetchOptions?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`CID`](/api/iso-filecoin/types/type-aliases/cid/), [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

Defined in: [packages/iso-filecoin/src/rpc.js:317](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L317)

StateWaitMsg looks back in the chain for a message. If not found, it blocks until the message arrives on chain, and gets to the indicated confidence depth.

Timeout is increased to 60s instead of the default 5s.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`waitMsgParams`](/api/iso-filecoin/types/interfaces/waitmsgparams/) |
| `fetchOptions?` | `RequestOptions` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`CID`](/api/iso-filecoin/types/type-aliases/cid/), [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/) \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

#### See

https://lotus.filecoin.io/reference/lotus/state/#statewaitmsg

## Properties

### api

> **api**: [`URL`](https://developer.mozilla.org/docs/Web/API/URL)

Defined in: [packages/iso-filecoin/src/rpc.js:144](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L144)

***

### fetch()

> **fetch**: \{(`input`, `init?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Response`](https://developer.mozilla.org/docs/Web/API/Response)\>; (`input`, `init?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Response`](https://developer.mozilla.org/docs/Web/API/Response)\>; \}

Defined in: [packages/iso-filecoin/src/rpc.js:143](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L143)

#### Call Signature

> (`input`, `init?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Response`](https://developer.mozilla.org/docs/Web/API/Response)\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`URL`](https://developer.mozilla.org/docs/Web/API/URL) \| `RequestInfo` |
| `init?` | `RequestInit` |

##### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Response`](https://developer.mozilla.org/docs/Web/API/Response)\>

#### Call Signature

> (`input`, `init?`): [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Response`](https://developer.mozilla.org/docs/Web/API/Response)\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `string` \| [`URL`](https://developer.mozilla.org/docs/Web/API/URL) \| [`Request`](https://developer.mozilla.org/docs/Web/API/Request) |
| `init?` | `RequestInit` |

##### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Response`](https://developer.mozilla.org/docs/Web/API/Response)\>

***

### fetchOptions

> **fetchOptions**: `RequestOptions`

Defined in: [packages/iso-filecoin/src/rpc.js:151](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L151)

***

### headers

> **headers**: `object`

Defined in: [packages/iso-filecoin/src/rpc.js:146](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L146)

#### Authorization?

> `optional` **Authorization**: `string`

#### Content-Type

> **Content-Type**: `string` = `'application/json'`

***

### network

> **network**: [`Network`](/api/iso-filecoin/types/type-aliases/network/)

Defined in: [packages/iso-filecoin/src/rpc.js:145](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L145)
