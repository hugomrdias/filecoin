---
editUrl: false
next: true
prev: true
title: "EthereumChain"
---

```ts
type EthereumChain = {
  blockExplorerUrls: string[];
  chainId: string;
  chainName: string;
  iconUrls: string[];
  nativeCurrency: {
     decimals: number;
     name: string;
     symbol: string;
    };
  rpcUrls: string[];
};
```

Defined in: [packages/iso-filecoin/src/types.ts:173](https://github.com/hugomrdias/filecoin/blob/785c3411e0df74cabd3b2718e9d4a52c466ba914/packages/iso-filecoin/src/types.ts#L173)

Ethereum chain type (Metamask)

## Type declaration

### blockExplorerUrls?

```ts
optional blockExplorerUrls: string[];
```

### chainId

```ts
chainId: string;
```

A 0x-prefixed hexadecimal string

### chainName

```ts
chainName: string;
```

The chain name.

### iconUrls?

```ts
optional iconUrls: string[];
```

### nativeCurrency?

```ts
optional nativeCurrency: {
  decimals: number;
  name: string;
  symbol: string;
};
```

Native currency for the chain.

#### nativeCurrency.decimals

```ts
decimals: number;
```

#### nativeCurrency.name

```ts
name: string;
```

#### nativeCurrency.symbol

```ts
symbol: string;
```

### rpcUrls

```ts
rpcUrls: string[];
```
