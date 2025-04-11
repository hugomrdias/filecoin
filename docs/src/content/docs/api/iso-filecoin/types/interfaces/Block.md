---
editUrl: false
next: true
prev: true
title: "Block"
---

Defined in: [packages/iso-filecoin/src/types.ts:259](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L259)

## Properties

### BeaconEntries

```ts
BeaconEntries: {
  Data: string;
  Round: number;
}[];
```

Defined in: [packages/iso-filecoin/src/types.ts:264](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L264)

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

Defined in: [packages/iso-filecoin/src/types.ts:268](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L268)

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

Defined in: [packages/iso-filecoin/src/types.ts:260](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L260)

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

Defined in: [packages/iso-filecoin/src/types.ts:272](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L272)

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

Defined in: [packages/iso-filecoin/src/types.ts:276](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L276)

***

### Height

```ts
Height: number;
```

Defined in: [packages/iso-filecoin/src/types.ts:277](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L277)

***

### Messages

```ts
Messages: CID;
```

Defined in: [packages/iso-filecoin/src/types.ts:278](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L278)

***

### Miner

```ts
Miner: string;
```

Defined in: [packages/iso-filecoin/src/types.ts:282](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L282)

The miner address of the block.

***

### ParentBaseFee

```ts
ParentBaseFee: string;
```

Defined in: [packages/iso-filecoin/src/types.ts:283](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L283)

***

### ParentMessageReceipts

```ts
ParentMessageReceipts: CID;
```

Defined in: [packages/iso-filecoin/src/types.ts:284](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L284)

***

### Parents

```ts
Parents: CID[];
```

Defined in: [packages/iso-filecoin/src/types.ts:290](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L290)

***

### ParentStateRoot

```ts
ParentStateRoot: CID;
```

Defined in: [packages/iso-filecoin/src/types.ts:285](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L285)

***

### ParentWeight

```ts
ParentWeight: string;
```

Defined in: [packages/iso-filecoin/src/types.ts:289](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L289)

BitInt as a string

***

### Ticket

```ts
Ticket: {
  VRFProof: string;
};
```

Defined in: [packages/iso-filecoin/src/types.ts:291](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L291)

#### VRFProof

```ts
VRFProof: string;
```

***

### Timestamp

```ts
Timestamp: number;
```

Defined in: [packages/iso-filecoin/src/types.ts:294](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L294)

***

### WinPoStProof

```ts
WinPoStProof: {
  PoStProof: number;
  ProofBytes: string;
}[];
```

Defined in: [packages/iso-filecoin/src/types.ts:295](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L295)

#### PoStProof

```ts
PoStProof: number;
```

#### ProofBytes

```ts
ProofBytes: string;
```
