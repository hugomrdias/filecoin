---
editUrl: false
next: true
prev: true
title: "Block"
---

Defined in: [packages/iso-filecoin/src/types.ts:253](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L253)

## Properties

### BeaconEntries

```ts
BeaconEntries: {
  Data: string;
  Round: number;
 }[];
```

Defined in: [packages/iso-filecoin/src/types.ts:258](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L258)

#### Data

```ts
Data: string;
```

#### Round

```ts
Round: number;
```

***

### BlockSig

```ts
BlockSig: {
  Data: string;
  Type: 2;
};
```

Defined in: [packages/iso-filecoin/src/types.ts:262](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L262)

#### Data

```ts
Data: string;
```

#### Type

```ts
Type: 2;
```

***

### BLSAggregate

```ts
BLSAggregate: {
  Data: string;
  Type: 2;
};
```

Defined in: [packages/iso-filecoin/src/types.ts:254](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L254)

#### Data

```ts
Data: string;
```

#### Type

```ts
Type: 2;
```

***

### ElectionProof

```ts
ElectionProof: {
  VRFProof: string;
  WinCount: number;
};
```

Defined in: [packages/iso-filecoin/src/types.ts:266](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L266)

#### VRFProof

```ts
VRFProof: string;
```

#### WinCount

```ts
WinCount: number;
```

***

### ForkSignaling

```ts
ForkSignaling: number;
```

Defined in: [packages/iso-filecoin/src/types.ts:270](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L270)

***

### Height

```ts
Height: number;
```

Defined in: [packages/iso-filecoin/src/types.ts:271](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L271)

***

### Messages

```ts
Messages: CID;
```

Defined in: [packages/iso-filecoin/src/types.ts:272](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L272)

***

### Miner

```ts
Miner: string;
```

Defined in: [packages/iso-filecoin/src/types.ts:276](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L276)

The miner address of the block.

***

### ParentBaseFee

```ts
ParentBaseFee: string;
```

Defined in: [packages/iso-filecoin/src/types.ts:277](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L277)

***

### ParentMessageReceipts

```ts
ParentMessageReceipts: CID;
```

Defined in: [packages/iso-filecoin/src/types.ts:278](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L278)

***

### Parents

```ts
Parents: CID[];
```

Defined in: [packages/iso-filecoin/src/types.ts:284](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L284)

***

### ParentStateRoot

```ts
ParentStateRoot: CID;
```

Defined in: [packages/iso-filecoin/src/types.ts:279](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L279)

***

### ParentWeight

```ts
ParentWeight: string;
```

Defined in: [packages/iso-filecoin/src/types.ts:283](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L283)

BitInt as a string

***

### Ticket

```ts
Ticket: {
  VRFProof: string;
};
```

Defined in: [packages/iso-filecoin/src/types.ts:285](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L285)

#### VRFProof

```ts
VRFProof: string;
```

***

### Timestamp

```ts
Timestamp: number;
```

Defined in: [packages/iso-filecoin/src/types.ts:288](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L288)

***

### WinPoStProof

```ts
WinPoStProof: {
  PoStProof: number;
  ProofBytes: string;
 }[];
```

Defined in: [packages/iso-filecoin/src/types.ts:289](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L289)

#### PoStProof

```ts
PoStProof: number;
```

#### ProofBytes

```ts
ProofBytes: string;
```
