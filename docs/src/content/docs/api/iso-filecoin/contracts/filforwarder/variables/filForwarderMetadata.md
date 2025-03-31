---
editUrl: false
next: true
prev: true
title: "filForwarderMetadata"
---

```ts
const filForwarderMetadata: {
  abi: (
     | {
     inputs: {
        internalType: string;
        name: string;
        type: string;
       }[];
     name: string;
     outputs: undefined;
     stateMutability: undefined;
     type: string;
    }
     | {
     inputs: {
        internalType: string;
        name: string;
        type: string;
       }[];
     name: string;
     outputs: never[];
     stateMutability: string;
     type: string;
    })[];
  chainIds: {
     filecoinCalibrationTestnet: string;
     filecoinMainnet: string;
    };
  contractAddress: `0x${string}`;
};
```

Defined in: [packages/iso-filecoin/src/contracts/filforwarder.js:93](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/contracts/filforwarder.js#L93)

## Type declaration

### abi

```ts
abi: (
  | {
  inputs: {
     internalType: string;
     name: string;
     type: string;
    }[];
  name: string;
  outputs: undefined;
  stateMutability: undefined;
  type: string;
 }
  | {
  inputs: {
     internalType: string;
     name: string;
     type: string;
    }[];
  name: string;
  outputs: never[];
  stateMutability: string;
  type: string;
 })[];
```

### chainIds

```ts
chainIds: {
  filecoinCalibrationTestnet: string;
  filecoinMainnet: string;
};
```

#### chainIds.filecoinCalibrationTestnet

```ts
chainIds.filecoinCalibrationTestnet: string = 'eip155:314159';
```

#### chainIds.filecoinMainnet

```ts
chainIds.filecoinMainnet: string = 'eip155:314';
```

### contractAddress

```ts
contractAddress: `0x${string}`;
```
