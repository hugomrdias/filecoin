---
editUrl: false
next: true
prev: true
title: "Chain"
---

Defined in: packages/iso-filecoin/dist/src/types.d.ts:108

## Properties

### blockExplorers?

```ts
optional blockExplorers: {
[key: string]: ChainBlockExplorer;
  default: ChainBlockExplorer;
};
```

Defined in: packages/iso-filecoin/dist/src/types.d.ts:121

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

Defined in: packages/iso-filecoin/dist/src/types.d.ts:132

CAIP-2 ID

***

### chainId

```ts
chainId: string;
```

Defined in: packages/iso-filecoin/dist/src/types.d.ts:136

Chain ID 0x prefixed hex string

***

### chainNamespace

```ts
chainNamespace: string;
```

Defined in: packages/iso-filecoin/dist/src/types.d.ts:128

***

### contracts?

```ts
optional contracts: {
[key: string]: ChainContract;
};
```

Defined in: packages/iso-filecoin/dist/src/types.d.ts:125

#### Index Signature

```ts
[key: string]: ChainContract
```

***

### iconUrls?

```ts
optional iconUrls: string[];
```

Defined in: packages/iso-filecoin/dist/src/types.d.ts:137

***

### id

```ts
id: string | number;
```

Defined in: packages/iso-filecoin/dist/src/types.d.ts:109

***

### name

```ts
name: string;
```

Defined in: packages/iso-filecoin/dist/src/types.d.ts:110

***

### nativeCurrency

```ts
nativeCurrency: {
  decimals: number;
  name: string;
  symbol: string;
};
```

Defined in: packages/iso-filecoin/dist/src/types.d.ts:112

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

Defined in: packages/iso-filecoin/dist/src/types.d.ts:117

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

Defined in: packages/iso-filecoin/dist/src/types.d.ts:111
