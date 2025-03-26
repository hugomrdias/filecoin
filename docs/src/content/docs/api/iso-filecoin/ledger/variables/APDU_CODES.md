---
editUrl: false
next: true
prev: true
title: "APDU_CODES"
---

```ts
const APDU_CODES: {
  APP_NOT_OPEN: number;
  BAD_KEY_HANDLE: number;
  BUSY: number;
  CLA_NOT_SUPPORTED: number;
  COMMAND_NOT_ALLOWED: number;
  CONDITIONS_NOT_SATISFIED: number;
  DATA_INVALID: number;
  EMPTY_BUFFER: number;
  EXECUTION_ERROR: number;
  INS_NOT_SUPPORTED: number;
  INVALIDP1P2: number;
  OK: number;
  OUTPUT_BUFFER_TOO_SMALL: number;
  SIGN_VERIFY_ERROR: number;
  UNKNOWN: number;
  WRONG_LENGTH: number;
};
```

Defined in: [packages/iso-filecoin/src/ledger.js:48](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L48)

APDU codes

## Type declaration

### APP\_NOT\_OPEN

```ts
APP_NOT_OPEN: number = 0x6e01;
```

### BAD\_KEY\_HANDLE

```ts
BAD_KEY_HANDLE: number = 0x6a80;
```

Ledger name is INCORRECT_DATA

#### See

https://github.com/LedgerHQ/ledger-live/blob/d376d5f165ac2b322f7eb3fceb6106c41e04191b/libs/ledgerjs/packages/errors/src/index.ts#L268

### BUSY

```ts
BUSY: number = 0x9001;
```

### CLA\_NOT\_SUPPORTED

```ts
CLA_NOT_SUPPORTED: number = 0x6e00;
```

### COMMAND\_NOT\_ALLOWED

```ts
COMMAND_NOT_ALLOWED: number = 0x6986;
```

### CONDITIONS\_NOT\_SATISFIED

```ts
CONDITIONS_NOT_SATISFIED: number = 0x6985;
```

ledger supports

#### See

https://github.com/LedgerHQ/ledger-live/blob/d376d5f165ac2b322f7eb3fceb6106c41e04191b/libs/ledgerjs/packages/errors/src/index.ts#L258

### DATA\_INVALID

```ts
DATA_INVALID: number = 0x6984;
```

### EMPTY\_BUFFER

```ts
EMPTY_BUFFER: number = 0x6982;
```

Ledger name is SECURITY_STATUS_NOT_SATISFIED

#### See

https://github.com/LedgerHQ/ledger-live/blob/d376d5f165ac2b322f7eb3fceb6106c41e04191b/libs/ledgerjs/packages/errors/src/index.ts#L286

### EXECUTION\_ERROR

```ts
EXECUTION_ERROR: number = 0x6400;
```

### INS\_NOT\_SUPPORTED

```ts
INS_NOT_SUPPORTED: number = 0x6d00;
```

### INVALIDP1P2

```ts
INVALIDP1P2: number = 0x6b00;
```

ledger supports

#### See

https://github.com/LedgerHQ/ledger-live/blob/d376d5f165ac2b322f7eb3fceb6106c41e04191b/libs/ledgerjs/packages/errors/src/index.ts#L270

### OK

```ts
OK: number = 0x9000;
```

### OUTPUT\_BUFFER\_TOO\_SMALL

```ts
OUTPUT_BUFFER_TOO_SMALL: number = 0x6983;
```

### SIGN\_VERIFY\_ERROR

```ts
SIGN_VERIFY_ERROR: number = 0x6f01;
```

### UNKNOWN

```ts
UNKNOWN: number = 0x6f00;
```

### WRONG\_LENGTH

```ts
WRONG_LENGTH: number = 0x6700;
```

## See

https://github.com/tendermint/ledger-validator-app/blob/master/deps/ledger-zxlib/include/apdu_codes.h
