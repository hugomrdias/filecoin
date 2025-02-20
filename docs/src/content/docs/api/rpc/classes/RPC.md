---
editUrl: false
next: true
prev: true
title: "RPC"
---

Defined in: [packages/iso-filecoin/src/rpc.js:125](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L125)

RPC

## Constructors

### new RPC()

```ts
new RPC(options: Options, fetchOptions?: RequestOptions): RPC
```

Defined in: [packages/iso-filecoin/src/rpc.js:130](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L130)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`Options`](/api/rpc/interfaces/options/) |  |
| `fetchOptions`? | `RequestOptions` |  |

#### Returns

[`RPC`](/api/rpc/classes/rpc/)

## Methods

### balance()

```ts
balance(address: string, fetchOptions?: RequestOptions): Promise<MaybeResult<string, 
  | RequestErrors
  | RpcError
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:227](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L227)

WalletBalance returns the balance of the given address at the current head of the chain.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | `string` |  |
| `fetchOptions`? | `RequestOptions` |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`string`, 
  \| [`RequestErrors`](/api/rpc/type-aliases/requesterrors/)
  \| [`RpcError`](/api/rpc/classes/rpcerror/)
  \| [`JsonRpcError`](/api/rpc/classes/jsonrpcerror/)\>\>

#### See

https://lotus.filecoin.io/reference/lotus/wallet/#walletbalance

***

### call()

```ts
call<R>(rpcOptions: RpcOptions, fetchOptions?: RequestOptions): Promise<MaybeResult<R, 
  | RequestErrors
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:588](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L588)

Generic method to call any method on the lotus rpc api.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `R` |  |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rpcOptions` | [`RpcOptions`](/api/rpc/interfaces/rpcoptions/) |  |
| `fetchOptions`? | `RequestOptions` |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`R`, 
  \| [`RequestErrors`](/api/rpc/type-aliases/requesterrors/)
  \| [`JsonRpcError`](/api/rpc/classes/jsonrpcerror/)\>\>

***

### chainHead()

```ts
chainHead(fetchOptions?: RequestOptions): Promise<MaybeResult<TipSet, 
  | RequestErrors
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:469](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L469)

The current head of the chain.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fetchOptions`? | `RequestOptions` |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`TipSet`](/api/rpc/interfaces/tipset/), 
  \| [`RequestErrors`](/api/rpc/type-aliases/requesterrors/)
  \| [`JsonRpcError`](/api/rpc/classes/jsonrpcerror/)\>\>

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

Defined in: [packages/iso-filecoin/src/rpc.js:336](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L336)

Converts any Filecoin address to an EthAddress.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`FilecoinAddressToEthAddressParams`](/api/rpc/interfaces/filecoinaddresstoethaddressparams/) |  |
| `fetchOptions`? | `RequestOptions` |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`string`, 
  \| [`RequestErrors`](/api/rpc/type-aliases/requesterrors/)
  \| [`RpcError`](/api/rpc/classes/rpcerror/)
  \| [`JsonRpcError`](/api/rpc/classes/jsonrpcerror/)\>\>

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

Defined in: [packages/iso-filecoin/src/rpc.js:182](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L182)

GasEstimateMessageGas estimates gas values for unset message gas fields

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`GasEstimateParams`](/api/rpc/interfaces/gasestimateparams/) |  |
| `fetchOptions`? | `RequestOptions` |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`LotusMessage`](/api/rpc/interfaces/lotusmessage/), 
  \| [`RequestErrors`](/api/rpc/type-aliases/requesterrors/)
  \| [`RpcError`](/api/rpc/classes/rpcerror/)
  \| [`JsonRpcError`](/api/rpc/classes/jsonrpcerror/)
  \| [`ValidationRpcError`](/api/rpc/classes/validationrpcerror/)\>\>

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

Defined in: [packages/iso-filecoin/src/rpc.js:550](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L550)

Get the ID address for an address with different safety guarantees

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | \{ `address`: `string`; `safety`: [`Safety`](/api/address/type-aliases/safety/); \} |  |
| `params.address` | `string` | - |
| `params.safety`? | [`Safety`](/api/address/type-aliases/safety/) | - |
| `fetchOptions`? | `RequestOptions` |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`string`, 
  \| [`RequestErrors`](/api/rpc/type-aliases/requesterrors/)
  \| [`RpcError`](/api/rpc/classes/rpcerror/)
  \| [`JsonRpcError`](/api/rpc/classes/jsonrpcerror/)\>\>

***

### getTipSetByHeight()

```ts
getTipSetByHeight(params: ChainGetTipSetByHeightParams, fetchOptions?: RequestOptions): Promise<MaybeResult<TipSet, 
  | RequestErrors
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:489](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L489)

Get tipset at the specified epoch (height). If there are no blocks at the specified epoch, a tipset at an earlier epoch will be returned.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`ChainGetTipSetByHeightParams`](/api/rpc/interfaces/chaingettipsetbyheightparams/) |  |
| `fetchOptions`? | `RequestOptions` |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`TipSet`](/api/rpc/interfaces/tipset/), 
  \| [`RequestErrors`](/api/rpc/type-aliases/requesterrors/)
  \| [`JsonRpcError`](/api/rpc/classes/jsonrpcerror/)\>\>

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

Defined in: [packages/iso-filecoin/src/rpc.js:511](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L511)

Looks back from latest height for a tipset

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `lookback` | `number` | Chain epoch to look back to |
| `fetchOptions`? | `RequestOptions` |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`TipSet`](/api/rpc/interfaces/tipset/), 
  \| [`RequestErrors`](/api/rpc/type-aliases/requesterrors/)
  \| [`RpcError`](/api/rpc/classes/rpcerror/)
  \| [`JsonRpcError`](/api/rpc/classes/jsonrpcerror/)\>\>

***

### networkName()

```ts
networkName(fetchOptions?: RequestOptions): Promise<MaybeResult<Network, 
  | RequestErrors
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:167](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L167)

NetworkName returns the name of the network the node is synced to.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fetchOptions`? | `RequestOptions` |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`Network`](/api/adapters/filsnap/type-aliases/network/), 
  \| [`RequestErrors`](/api/rpc/type-aliases/requesterrors/)
  \| [`JsonRpcError`](/api/rpc/classes/jsonrpcerror/)\>\>

***

### nonce()

```ts
nonce(address: string, fetchOptions?: RequestOptions): Promise<MaybeResult<number, 
  | RequestErrors
  | RpcError
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:245](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L245)

MpoolGetNonce gets next nonce for the specified sender. Note that this method may not be atomic. Use MpoolPushMessage instead.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `address` | `string` |  |
| `fetchOptions`? | `RequestOptions` |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`number`, 
  \| [`RequestErrors`](/api/rpc/type-aliases/requesterrors/)
  \| [`RpcError`](/api/rpc/classes/rpcerror/)
  \| [`JsonRpcError`](/api/rpc/classes/jsonrpcerror/)\>\>

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

Defined in: [packages/iso-filecoin/src/rpc.js:264](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L264)

MpoolPush pushes a signed message to mempool.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`PushMessageParams`](/api/rpc/interfaces/pushmessageparams/) |  |
| `fetchOptions`? | `RequestOptions` |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`CID`](/api/rpc/type-aliases/cid/), 
  \| [`RequestErrors`](/api/rpc/type-aliases/requesterrors/)
  \| [`RpcError`](/api/rpc/classes/rpcerror/)
  \| [`JsonRpcError`](/api/rpc/classes/jsonrpcerror/)
  \| [`ValidationRpcError`](/api/rpc/classes/validationrpcerror/)\>\>

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

Defined in: [packages/iso-filecoin/src/rpc.js:361](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L361)

Public key address of the given ID address.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`StateAccountKeyParams`](/api/rpc/interfaces/stateaccountkeyparams/) |  |
| `fetchOptions`? | `RequestOptions` |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`string`, 
  \| [`RequestErrors`](/api/rpc/type-aliases/requesterrors/)
  \| [`RpcError`](/api/rpc/classes/rpcerror/)
  \| [`JsonRpcError`](/api/rpc/classes/jsonrpcerror/)\>\>

#### See

https://github.com/filecoin-project/lotus/blob/master/documentation/en/api-v0-methods.md#StateAccountKey

***

### stateLookupID()

```ts
stateLookupID(params: StateAccountKeyParams, fetchOptions?: RequestOptions): Promise<MaybeResult<string, 
  | RequestErrors
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:437](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L437)

Retrieves the ID address of the given address for a tipset.
If you dont have a specific tipset in mind, better to use [getIDAddress](../../../../../../../api/rpc/classes/rpc/#getidaddress).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`StateAccountKeyParams`](/api/rpc/interfaces/stateaccountkeyparams/) |  |
| `fetchOptions`? | `RequestOptions` |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`string`, 
  \| [`RequestErrors`](/api/rpc/type-aliases/requesterrors/)
  \| [`JsonRpcError`](/api/rpc/classes/jsonrpcerror/)\>\>

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

Defined in: [packages/iso-filecoin/src/rpc.js:398](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L398)

Public key address of the given non-account ID address.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`StateAccountKeyParams`](/api/rpc/interfaces/stateaccountkeyparams/) |  |
| `fetchOptions`? | `RequestOptions` |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<`string`, 
  \| [`RequestErrors`](/api/rpc/type-aliases/requesterrors/)
  \| [`RpcError`](/api/rpc/classes/rpcerror/)
  \| [`JsonRpcError`](/api/rpc/classes/jsonrpcerror/)\>\>

#### See

https://github.com/filecoin-project/lotus/blob/master/documentation/en/api-v0-methods.md#StateLookupRobustAddress

***

### version()

```ts
version(fetchOptions?: RequestOptions): Promise<MaybeResult<VersionResponse, 
  | RequestErrors
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:155](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L155)

Version returns the version of the Filecoin node.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fetchOptions`? | `RequestOptions` |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`VersionResponse`](/api/rpc/type-aliases/versionresponse/), 
  \| [`RequestErrors`](/api/rpc/type-aliases/requesterrors/)
  \| [`JsonRpcError`](/api/rpc/classes/jsonrpcerror/)\>\>

***

### waitMsg()

```ts
waitMsg(params: waitMsgParams, fetchOptions?: RequestOptions): Promise<MaybeResult<CID, 
  | RequestErrors
| JsonRpcError>>
```

Defined in: [packages/iso-filecoin/src/rpc.js:313](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L313)

StateWaitMsg looks back in the chain for a message. If not found, it blocks until the message arrives on chain, and gets to the indicated confidence depth.

Timeout is increased to 60s instead of the default 5s.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`waitMsgParams`](/api/rpc/interfaces/waitmsgparams/) |  |
| `fetchOptions`? | `RequestOptions` |  |

#### Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`MaybeResult`\<[`CID`](/api/rpc/type-aliases/cid/), 
  \| [`RequestErrors`](/api/rpc/type-aliases/requesterrors/)
  \| [`JsonRpcError`](/api/rpc/classes/jsonrpcerror/)\>\>

#### See

https://lotus.filecoin.io/reference/lotus/state/#statewaitmsg

## Properties

### api

```ts
api: URL;
```

Defined in: [packages/iso-filecoin/src/rpc.js:140](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L140)

***

### fetch()

```ts
fetch: (input: URL | RequestInfo, init?: RequestInit) => Promise<Response>(input: 
  | string
  | URL
| Request, init?: RequestInit) => Promise<Response>;
```

Defined in: [packages/iso-filecoin/src/rpc.js:139](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L139)

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

Defined in: [packages/iso-filecoin/src/rpc.js:147](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L147)

***

### headers

```ts
headers: {
  Authorization: string;
  Content-Type: string;
};
```

Defined in: [packages/iso-filecoin/src/rpc.js:142](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L142)

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

Defined in: [packages/iso-filecoin/src/rpc.js:141](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/rpc.js#L141)
