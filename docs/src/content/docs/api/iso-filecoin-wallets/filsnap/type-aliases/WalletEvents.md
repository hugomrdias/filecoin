---
editUrl: false
next: true
prev: true
title: "WalletEvents"
---

```ts
type WalletEvents = {
  accountChanged: CustomEvent<IAccount>;
  connect: CustomEvent<AccountNetwork>;
  disconnect: CustomEvent;
  error: CustomEvent<Error>;
  networkChanged: CustomEvent<AccountNetwork>;
  stateChanged: CustomEvent<WalletSupportType>;
};
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:17](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L17)

## Properties

### accountChanged

```ts
accountChanged: CustomEvent<IAccount>;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:18](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L18)

***

### connect

```ts
connect: CustomEvent<AccountNetwork>;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:21](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L21)

***

### disconnect

```ts
disconnect: CustomEvent;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:20](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L20)

***

### error

```ts
error: CustomEvent<Error>;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:22](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L22)

***

### networkChanged

```ts
networkChanged: CustomEvent<AccountNetwork>;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:19](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L19)

***

### stateChanged

```ts
stateChanged: CustomEvent<WalletSupportType>;
```

Defined in: [packages/iso-filecoin-wallets/src/types.ts:23](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-wallets/src/types.ts#L23)
