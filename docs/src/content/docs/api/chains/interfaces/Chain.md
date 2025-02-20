---
editUrl: false
next: true
prev: true
title: "Chain"
---

Defined in: [packages/iso-filecoin/src/types.ts:139](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L139)

## Properties

### blockExplorers?

```ts
optional blockExplorers: {
[key: string]: ChainBlockExplorer;   default: ChainBlockExplorer;
};
```

Defined in: [packages/iso-filecoin/src/types.ts:152](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L152)

#### Index Signature

```ts
[key: string]: ChainBlockExplorer
```

#### default

```ts
default: ChainBlockExplorer;
```

***

### caipId

```ts
caipId: `${string}:${string}`;
```

Defined in: [packages/iso-filecoin/src/types.ts:162](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L162)

CAIP-2 chain ID

***

### chainId

```ts
chainId: string;
```

Defined in: [packages/iso-filecoin/src/types.ts:166](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L166)

Chain ID 0x prefixed hex string

***

### contracts?

```ts
optional contracts: {};
```

Defined in: [packages/iso-filecoin/src/types.ts:156](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L156)

#### Index Signature

```ts
[key: string]: ChainContract
```

***

### iconUrls?

```ts
optional iconUrls: string[];
```

Defined in: [packages/iso-filecoin/src/types.ts:167](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L167)

***

### id

```ts
id: number;
```

Defined in: [packages/iso-filecoin/src/types.ts:140](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L140)

***

### name

```ts
name: string;
```

Defined in: [packages/iso-filecoin/src/types.ts:141](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L141)

***

### nativeCurrency

```ts
nativeCurrency: {
  decimals: number;
  name: string;
  symbol: string;
};
```

Defined in: [packages/iso-filecoin/src/types.ts:143](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L143)

#### decimals

```ts
decimals: number;
```

#### name

```ts
name: string;
```

#### symbol

```ts
symbol: string;
```

***

### rpcUrls

```ts
rpcUrls: {
[key: string]: ChainRpcUrls;   default: ChainRpcUrls;
};
```

Defined in: [packages/iso-filecoin/src/types.ts:148](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L148)

#### Index Signature

```ts
[key: string]: ChainRpcUrls
```

#### default

```ts
default: ChainRpcUrls;
```

***

### testnet?

```ts
optional testnet: boolean;
```

Defined in: [packages/iso-filecoin/src/types.ts:142](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L142)
