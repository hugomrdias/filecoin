---
editUrl: false
next: true
prev: true
title: "Chain"
---

Defined in: [packages/iso-filecoin/src/types.ts:144](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L144)

## Properties

### blockExplorers?

```ts
optional blockExplorers: {
[key: string]: ChainBlockExplorer;
  default: ChainBlockExplorer;
};
```

Defined in: [packages/iso-filecoin/src/types.ts:157](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L157)

#### Index Signature

```ts
[key: string]: ChainBlockExplorer
```

#### default

```ts
default: ChainBlockExplorer;
```

***

### caipNetworkId

```ts
caipNetworkId: `${string}:${string}`;
```

Defined in: [packages/iso-filecoin/src/types.ts:168](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L168)

CAIP-2 ID

***

### chainId

```ts
chainId: string;
```

Defined in: [packages/iso-filecoin/src/types.ts:172](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L172)

Chain ID 0x prefixed hex string

***

### chainNamespace

```ts
chainNamespace: string;
```

Defined in: [packages/iso-filecoin/src/types.ts:164](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L164)

***

### contracts?

```ts
optional contracts: {
[key: string]: ChainContract;
};
```

Defined in: [packages/iso-filecoin/src/types.ts:161](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L161)

#### Index Signature

```ts
[key: string]: ChainContract
```

***

### iconUrls?

```ts
optional iconUrls: string[];
```

Defined in: [packages/iso-filecoin/src/types.ts:173](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L173)

***

### id

```ts
id: string | number;
```

Defined in: [packages/iso-filecoin/src/types.ts:145](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L145)

***

### name

```ts
name: string;
```

Defined in: [packages/iso-filecoin/src/types.ts:146](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L146)

***

### nativeCurrency

```ts
nativeCurrency: {
  decimals: number;
  name: string;
  symbol: string;
};
```

Defined in: [packages/iso-filecoin/src/types.ts:148](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L148)

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
[key: string]: ChainRpcUrls;
  default: ChainRpcUrls;
};
```

Defined in: [packages/iso-filecoin/src/types.ts:153](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L153)

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

Defined in: [packages/iso-filecoin/src/types.ts:147](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L147)
