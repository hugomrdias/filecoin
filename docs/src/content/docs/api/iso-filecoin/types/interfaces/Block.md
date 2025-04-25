---
editUrl: false
next: true
prev: true
title: "Block"
---

Defined in: [packages/iso-filecoin/src/types.ts:259](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L259)

## Properties

### BeaconEntries

> **BeaconEntries**: `object`[]

Defined in: [packages/iso-filecoin/src/types.ts:264](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L264)

#### Data

> **Data**: `string`

#### Round

> **Round**: `number`

***

### BlockSig

> **BlockSig**: `object`

Defined in: [packages/iso-filecoin/src/types.ts:268](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L268)

#### Data

> **Data**: `string`

#### Type

> **Type**: `2`

***

### BLSAggregate

> **BLSAggregate**: `object`

Defined in: [packages/iso-filecoin/src/types.ts:260](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L260)

#### Data

> **Data**: `string`

#### Type

> **Type**: `2`

***

### ElectionProof

> **ElectionProof**: `object`

Defined in: [packages/iso-filecoin/src/types.ts:272](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L272)

#### VRFProof

> **VRFProof**: `string`

#### WinCount

> **WinCount**: `number`

***

### ForkSignaling

> **ForkSignaling**: `number`

Defined in: [packages/iso-filecoin/src/types.ts:276](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L276)

***

### Height

> **Height**: `number`

Defined in: [packages/iso-filecoin/src/types.ts:277](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L277)

***

### Messages

> **Messages**: [`CID`](/api/iso-filecoin/types/type-aliases/cid/)

Defined in: [packages/iso-filecoin/src/types.ts:278](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L278)

***

### Miner

> **Miner**: `string`

Defined in: [packages/iso-filecoin/src/types.ts:282](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L282)

The miner address of the block.

***

### ParentBaseFee

> **ParentBaseFee**: `string`

Defined in: [packages/iso-filecoin/src/types.ts:283](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L283)

***

### ParentMessageReceipts

> **ParentMessageReceipts**: [`CID`](/api/iso-filecoin/types/type-aliases/cid/)

Defined in: [packages/iso-filecoin/src/types.ts:284](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L284)

***

### Parents

> **Parents**: [`CID`](/api/iso-filecoin/types/type-aliases/cid/)[]

Defined in: [packages/iso-filecoin/src/types.ts:290](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L290)

***

### ParentStateRoot

> **ParentStateRoot**: [`CID`](/api/iso-filecoin/types/type-aliases/cid/)

Defined in: [packages/iso-filecoin/src/types.ts:285](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L285)

***

### ParentWeight

> **ParentWeight**: `string`

Defined in: [packages/iso-filecoin/src/types.ts:289](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L289)

BitInt as a string

***

### Ticket

> **Ticket**: `object`

Defined in: [packages/iso-filecoin/src/types.ts:291](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L291)

#### VRFProof

> **VRFProof**: `string`

***

### Timestamp

> **Timestamp**: `number`

Defined in: [packages/iso-filecoin/src/types.ts:294](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L294)

***

### WinPoStProof

> **WinPoStProof**: `object`[]

Defined in: [packages/iso-filecoin/src/types.ts:295](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/types.ts#L295)

#### PoStProof

> **PoStProof**: `number`

#### ProofBytes

> **ProofBytes**: `string`
