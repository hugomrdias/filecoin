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

Defined in: [packages/iso-filecoin/src/types.ts:179](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L179)

Ethereum chain type (Metamask)

## Properties

### blockExplorerUrls?

```ts
optional blockExplorerUrls: string[];
```

Defined in: [packages/iso-filecoin/src/types.ts:193](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L193)

***

### chainId

```ts
chainId: string;
```

Defined in: [packages/iso-filecoin/src/types.ts:181](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L181)

A 0x-prefixed hexadecimal string

***

### chainName

```ts
chainName: string;
```

Defined in: [packages/iso-filecoin/src/types.ts:183](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L183)

The chain name.

***

### iconUrls?

```ts
optional iconUrls: string[];
```

Defined in: [packages/iso-filecoin/src/types.ts:194](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L194)

***

### nativeCurrency?

```ts
optional nativeCurrency: {
  decimals: number;
  name: string;
  symbol: string;
};
```

Defined in: [packages/iso-filecoin/src/types.ts:185](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L185)

Native currency for the chain.

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
rpcUrls: string[];
```

Defined in: [packages/iso-filecoin/src/types.ts:192](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L192)
