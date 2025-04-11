---
editUrl: false
next: true
prev: true
title: "useAddresses"
---

```ts
function useAddresses(options: {
  address: string;
}): {
  address0x: UseQueryResult<undefined | string, Error>;
  addressId: UseQueryResult<undefined | AddressId, Error>;
};
```

Defined in: [packages/iso-filecoin-react/src/wallet-provider.js:524](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin-react/src/wallet-provider.js#L524)

Resolve addresses from the network
TODO: use cache

## Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | \{ `address`: `string`; \} |
| `options.address` | `string` |

## Returns

```ts
{
  address0x: UseQueryResult<undefined | string, Error>;
  addressId: UseQueryResult<undefined | AddressId, Error>;
}
```

### address0x

```ts
address0x: UseQueryResult<undefined | string, Error>;
```

### addressId

```ts
addressId: UseQueryResult<undefined | AddressId, Error>;
```
