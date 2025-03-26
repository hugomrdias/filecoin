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

```ts
new RPC(options: Options, fetchOptions?: RequestOptions): RPC
```

Defined in: [packages/iso-filecoin/src/rpc.js:134](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L134)

TODO: remove fetch from Options and use fetch from RequestOptions
TODO: either remove token or merge this.headers with fetchOptions.headers

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`Options`](/api/iso-filecoin/types/interfaces/options/) |
| `fetchOptions`? | [`RequestOptions`](/api/iso-filecoin/rpc/interfaces/requestoptions/) |

#### Returns

`RPC`

## Methods

### balance()

```ts
balance(address: string, fetchOptions?: RequestOptions): Promise<MaybeResult<string, 
  | RequestErrors
  | RpcError
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:231](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L231)

WalletBalance returns the balance of the given address at the current head of the chain.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `address` | `string` |
| `fetchOptions`? | [`RequestOptions`](/api/iso-filecoin/rpc/interfaces/requestoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`MaybeResult`](/api/iso-filecoin/types/type-aliases/mayberesult/)\<`string`, 
  \| [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/)
  \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/)
  \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

#### See

https://lotus.filecoin.io/reference/lotus/wallet/#walletbalance

***

### call()

```ts
call<R>(rpcOptions: RpcOptions, fetchOptions?: RequestOptions): Promise<MaybeResult<R, 
  | RequestErrors
| JsonRpcError>>
```

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
| `fetchOptions`? | [`RequestOptions`](/api/iso-filecoin/rpc/interfaces/requestoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`MaybeResult`](/api/iso-filecoin/types/type-aliases/mayberesult/)\<`R`, 
  \| [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/)
  \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

***

### chainHead()

```ts
chainHead(fetchOptions?: RequestOptions): Promise<MaybeResult<TipSet, 
  | RequestErrors
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:471](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L471)

The current head of the chain.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fetchOptions`? | [`RequestOptions`](/api/iso-filecoin/rpc/interfaces/requestoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`MaybeResult`](/api/iso-filecoin/types/type-aliases/mayberesult/)\<[`TipSet`](/api/iso-filecoin/types/interfaces/tipset/), 
  \| [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/)
  \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

#### See

https://github.com/filecoin-project/filecoin-docs/blob/main/reference/json-rpc/chain.md#chainhead

***

### filecoinAddressToEthAddress()

```ts
filecoinAddressToEthAddress(params: FilecoinAddressToEthAddressParams, fetchOptions?: RequestOptions): Promise<MaybeResult<string, 
  | RequestErrors
  | RpcError
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:340](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L340)

Converts any Filecoin address to an EthAddress.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`FilecoinAddressToEthAddressParams`](/api/iso-filecoin/types/interfaces/filecoinaddresstoethaddressparams/) |
| `fetchOptions`? | [`RequestOptions`](/api/iso-filecoin/rpc/interfaces/requestoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`MaybeResult`](/api/iso-filecoin/types/type-aliases/mayberesult/)\<`string`, 
  \| [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/)
  \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/)
  \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

#### See

https://github.com/filecoin-project/lotus/blob/471819bf1ef8a4d5c7c0476a38ce9f5e23c59bfc/api/api_full.go#L743-L768

***

### gasEstimate()

```ts
gasEstimate(params: GasEstimateParams, fetchOptions?: RequestOptions): Promise<MaybeResult<LotusMessage, 
  | RequestErrors
  | RpcError
  | JsonRpcError
| ValidationRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:186](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L186)

GasEstimateMessageGas estimates gas values for unset message gas fields

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`GasEstimateParams`](/api/iso-filecoin/types/interfaces/gasestimateparams/) |
| `fetchOptions`? | [`RequestOptions`](/api/iso-filecoin/rpc/interfaces/requestoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`MaybeResult`](/api/iso-filecoin/types/type-aliases/mayberesult/)\<[`LotusMessage`](/api/iso-filecoin/types/interfaces/lotusmessage/), 
  \| [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/)
  \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/)
  \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)
  \| [`ValidationRpcError`](/api/iso-filecoin/rpc/classes/validationrpcerror/)\>\>

#### See

https://lotus.filecoin.io/reference/lotus/gas/#gasestimatemessagegas

***

### getIDAddress()

```ts
getIDAddress(params: {
  address: string;
  safety: Safety;
 }, fetchOptions?: RequestOptions): Promise<MaybeResult<string, 
  | RequestErrors
  | RpcError
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:552](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L552)

Get the ID address for an address with different safety guarantees

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | \{ `address`: `string`; `safety`: [`Safety`](/api/iso-filecoin/types/type-aliases/safety/); \} |
| `params.address` | `string` |
| `params.safety`? | [`Safety`](/api/iso-filecoin/types/type-aliases/safety/) |
| `fetchOptions`? | [`RequestOptions`](/api/iso-filecoin/rpc/interfaces/requestoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`MaybeResult`](/api/iso-filecoin/types/type-aliases/mayberesult/)\<`string`, 
  \| [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/)
  \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/)
  \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

***

### getTipSetByHeight()

```ts
getTipSetByHeight(params: ChainGetTipSetByHeightParams, fetchOptions?: RequestOptions): Promise<MaybeResult<TipSet, 
  | RequestErrors
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:491](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L491)

Get tipset at the specified epoch (height). If there are no blocks at the specified epoch, a tipset at an earlier epoch will be returned.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`ChainGetTipSetByHeightParams`](/api/iso-filecoin/types/interfaces/chaingettipsetbyheightparams/) |
| `fetchOptions`? | [`RequestOptions`](/api/iso-filecoin/rpc/interfaces/requestoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`MaybeResult`](/api/iso-filecoin/types/type-aliases/mayberesult/)\<[`TipSet`](/api/iso-filecoin/types/interfaces/tipset/), 
  \| [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/)
  \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

#### See

https://github.com/filecoin-project/filecoin-docs/blob/main/reference/json-rpc/chain.md#chaingettipsetbyheight

***

### lookBackTipSet()

```ts
lookBackTipSet(lookback: number, fetchOptions?: RequestOptions): Promise<MaybeResult<TipSet, 
  | RequestErrors
  | RpcError
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:513](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L513)

Looks back from latest height for a tipset

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `lookback` | `number` | Chain epoch to look back to |
| `fetchOptions`? | [`RequestOptions`](/api/iso-filecoin/rpc/interfaces/requestoptions/) | - |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`MaybeResult`](/api/iso-filecoin/types/type-aliases/mayberesult/)\<[`TipSet`](/api/iso-filecoin/types/interfaces/tipset/), 
  \| [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/)
  \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/)
  \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

***

### networkName()

```ts
networkName(fetchOptions?: RequestOptions): Promise<MaybeResult<Network, 
  | RequestErrors
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:171](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L171)

NetworkName returns the name of the network the node is synced to.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fetchOptions`? | [`RequestOptions`](/api/iso-filecoin/rpc/interfaces/requestoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`MaybeResult`](/api/iso-filecoin/types/type-aliases/mayberesult/)\<[`Network`](/api/iso-filecoin/types/type-aliases/network/), 
  \| [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/)
  \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

***

### nonce()

```ts
nonce(address: string, fetchOptions?: RequestOptions): Promise<MaybeResult<number, 
  | RequestErrors
  | RpcError
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:249](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L249)

MpoolGetNonce gets next nonce for the specified sender. Note that this method may not be atomic. Use MpoolPushMessage instead.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `address` | `string` |
| `fetchOptions`? | [`RequestOptions`](/api/iso-filecoin/rpc/interfaces/requestoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`MaybeResult`](/api/iso-filecoin/types/type-aliases/mayberesult/)\<`number`, 
  \| [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/)
  \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/)
  \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

#### See

https://lotus.filecoin.io/reference/lotus/mpool/#mpoolgetnonce

***

### pushMessage()

```ts
pushMessage(params: PushMessageParams, fetchOptions?: RequestOptions): Promise<MaybeResult<CID, 
  | RequestErrors
  | RpcError
  | JsonRpcError
| ValidationRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:268](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L268)

MpoolPush pushes a signed message to mempool.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`PushMessageParams`](/api/iso-filecoin/types/interfaces/pushmessageparams/) |
| `fetchOptions`? | [`RequestOptions`](/api/iso-filecoin/rpc/interfaces/requestoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`MaybeResult`](/api/iso-filecoin/types/type-aliases/mayberesult/)\<[`CID`](/api/iso-filecoin/types/type-aliases/cid/), 
  \| [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/)
  \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/)
  \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)
  \| [`ValidationRpcError`](/api/iso-filecoin/rpc/classes/validationrpcerror/)\>\>

#### See

https://lotus.filecoin.io/reference/lotus/mpool/#mpoolpush

***

### stateAccountKey()

```ts
stateAccountKey(params: StateAccountKeyParams, fetchOptions?: RequestOptions): Promise<MaybeResult<string, 
  | RequestErrors
  | RpcError
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:365](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L365)

Public key address of the given ID address.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`StateAccountKeyParams`](/api/iso-filecoin/types/interfaces/stateaccountkeyparams/) |
| `fetchOptions`? | [`RequestOptions`](/api/iso-filecoin/rpc/interfaces/requestoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`MaybeResult`](/api/iso-filecoin/types/type-aliases/mayberesult/)\<`string`, 
  \| [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/)
  \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/)
  \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

#### See

https://github.com/filecoin-project/lotus/blob/master/documentation/en/api-v0-methods.md#StateAccountKey

***

### stateLookupID()

```ts
stateLookupID(params: StateAccountKeyParams, fetchOptions?: RequestOptions): Promise<MaybeResult<string, 
  | RequestErrors
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:440](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L440)

Retrieves the ID address of the given address for a tipset.
If you dont have a specific tipset in mind, better to use [getIDAddress](/api/iso-filecoin/rpc/classes/rpc/#getidaddress).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`StateAccountKeyParams`](/api/iso-filecoin/types/interfaces/stateaccountkeyparams/) |
| `fetchOptions`? | [`RequestOptions`](/api/iso-filecoin/rpc/interfaces/requestoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`MaybeResult`](/api/iso-filecoin/types/type-aliases/mayberesult/)\<`string`, 
  \| [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/)
  \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

#### See

https://github.com/filecoin-project/lotus/blob/master/documentation/en/api-v0-methods.md#statelookupid

***

### stateLookupRobustAddress()

```ts
stateLookupRobustAddress(params: StateAccountKeyParams, fetchOptions?: RequestOptions): Promise<MaybeResult<string, 
  | RequestErrors
  | RpcError
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:402](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L402)

Public key address of the given non-account ID address.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`StateAccountKeyParams`](/api/iso-filecoin/types/interfaces/stateaccountkeyparams/) |
| `fetchOptions`? | [`RequestOptions`](/api/iso-filecoin/rpc/interfaces/requestoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`MaybeResult`](/api/iso-filecoin/types/type-aliases/mayberesult/)\<`string`, 
  \| [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/)
  \| [`RpcError`](/api/iso-filecoin/rpc/classes/rpcerror/)
  \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

#### See

https://github.com/filecoin-project/lotus/blob/master/documentation/en/api-v0-methods.md#StateLookupRobustAddress

***

### version()

```ts
version(fetchOptions?: RequestOptions): Promise<MaybeResult<VersionResponse, 
  | RequestErrors
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:159](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L159)

Version returns the version of the Filecoin node.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fetchOptions`? | [`RequestOptions`](/api/iso-filecoin/rpc/interfaces/requestoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`MaybeResult`](/api/iso-filecoin/types/type-aliases/mayberesult/)\<[`VersionResponse`](/api/iso-filecoin/types/type-aliases/versionresponse/), 
  \| [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/)
  \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

***

### waitMsg()

```ts
waitMsg(params: waitMsgParams, fetchOptions?: RequestOptions): Promise<MaybeResult<CID, 
  | RequestErrors
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:317](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L317)

StateWaitMsg looks back in the chain for a message. If not found, it blocks until the message arrives on chain, and gets to the indicated confidence depth.

Timeout is increased to 60s instead of the default 5s.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`waitMsgParams`](/api/iso-filecoin/types/interfaces/waitmsgparams/) |
| `fetchOptions`? | [`RequestOptions`](/api/iso-filecoin/rpc/interfaces/requestoptions/) |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`MaybeResult`](/api/iso-filecoin/types/type-aliases/mayberesult/)\<[`CID`](/api/iso-filecoin/types/type-aliases/cid/), 
  \| [`RequestErrors`](/api/iso-filecoin/rpc/type-aliases/requesterrors/)
  \| [`JsonRpcError`](/api/iso-filecoin/rpc/classes/jsonrpcerror/)\>\>

#### See

https://lotus.filecoin.io/reference/lotus/state/#statewaitmsg

## Properties

### api

```ts
api: URL;
```

Defined in: [packages/iso-filecoin/src/rpc.js:144](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L144)

***

### fetch()

```ts
fetch: (input: URL | RequestInfo, init?: RequestInit) => Promise<Response>(input: 
  | string
  | URL
| Request, init?: RequestInit) => Promise<Response>;
```

Defined in: [packages/iso-filecoin/src/rpc.js:143](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L143)

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`URL`](https://developer.mozilla.org/docs/Web/API/URL) \| `RequestInfo` |
| `init`? | `RequestInit` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Response`](https://developer.mozilla.org/docs/Web/API/Response)\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | \| `string` \| [`URL`](https://developer.mozilla.org/docs/Web/API/URL) \| [`Request`](https://developer.mozilla.org/docs/Web/API/Request) |
| `init`? | `RequestInit` |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`Response`](https://developer.mozilla.org/docs/Web/API/Response)\>

***

### fetchOptions

```ts
fetchOptions: RequestOptions;
```

Defined in: [packages/iso-filecoin/src/rpc.js:151](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L151)

***

### headers

```ts
headers: {
  Authorization: string;
  Content-Type: string;
};
```

Defined in: [packages/iso-filecoin/src/rpc.js:146](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L146)

#### Authorization?

```ts
optional Authorization: string;
```

#### Content-Type

```ts
Content-Type: string = 'application/json';
```

***

### network

```ts
network: Network;
```

Defined in: [packages/iso-filecoin/src/rpc.js:145](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L145)
