---
editUrl: false
next: true
prev: true
title: "WalletEvents"
---

```ts
type WalletEvents = {
  accountChanged: CustomEvent<IAccount>;
  connect: CustomEvent<IAccount>;
  disconnect: CustomEvent;
  error: CustomEvent<Error>;
  networkChanged: CustomEvent<{
     account: IAccount;
     network: Network;
    }>;
  stateChanged: CustomEvent<WalletSupportType>;
};
```

Defined in: [packages/iso-filecoin/src/adapters/types.ts:12](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/adapters/types.ts#L12)

## Type declaration

### accountChanged

```ts
accountChanged: CustomEvent<IAccount>;
```

### connect

```ts
connect: CustomEvent<IAccount>;
```

### disconnect

```ts
disconnect: CustomEvent;
```

### error

```ts
error: CustomEvent<Error>;
```

### networkChanged

```ts
networkChanged: CustomEvent<{
  account: IAccount;
  network: Network;
}>;
```

### stateChanged

```ts
stateChanged: CustomEvent<WalletSupportType>;
```
