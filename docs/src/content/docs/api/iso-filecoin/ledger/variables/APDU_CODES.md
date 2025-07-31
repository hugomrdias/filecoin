---
editUrl: false
next: true
prev: true
title: "APDU_CODES"
---

> `const` **APDU\_CODES**: `object`

Defined in: [packages/iso-filecoin/src/ledger.js:47](https://github.com/hugomrdias/filecoin/blob/main/packages/iso-filecoin/src/ledger.js#L47)

APDU codes

## Type declaration

### APP\_NOT\_OPEN

> **APP\_NOT\_OPEN**: `number` = `0x6e01`

### BAD\_KEY\_HANDLE

> **BAD\_KEY\_HANDLE**: `number` = `0x6a80`

Ledger name is INCORRECT_DATA

#### See

https://github.com/LedgerHQ/ledger-live/blob/d376d5f165ac2b322f7eb3fceb6106c41e04191b/libs/ledgerjs/packages/errors/src/index.ts#L268

### BUSY

> **BUSY**: `number` = `0x9001`

### CLA\_NOT\_SUPPORTED

> **CLA\_NOT\_SUPPORTED**: `number` = `0x6e00`

### COMMAND\_NOT\_ALLOWED

> **COMMAND\_NOT\_ALLOWED**: `number` = `0x6986`

### CONDITIONS\_NOT\_SATISFIED

> **CONDITIONS\_NOT\_SATISFIED**: `number` = `0x6985`

ledger supports

#### See

https://github.com/LedgerHQ/ledger-live/blob/d376d5f165ac2b322f7eb3fceb6106c41e04191b/libs/ledgerjs/packages/errors/src/index.ts#L258

### DATA\_INVALID

> **DATA\_INVALID**: `number` = `0x6984`

### EMPTY\_BUFFER

> **EMPTY\_BUFFER**: `number` = `0x6982`

Ledger name is SECURITY_STATUS_NOT_SATISFIED

#### See

https://github.com/LedgerHQ/ledger-live/blob/d376d5f165ac2b322f7eb3fceb6106c41e04191b/libs/ledgerjs/packages/errors/src/index.ts#L286

### EXECUTION\_ERROR

> **EXECUTION\_ERROR**: `number` = `0x6400`

### INS\_NOT\_SUPPORTED

> **INS\_NOT\_SUPPORTED**: `number` = `0x6d00`

### INVALIDP1P2

> **INVALIDP1P2**: `number` = `0x6b00`

ledger supports

#### See

https://github.com/LedgerHQ/ledger-live/blob/d376d5f165ac2b322f7eb3fceb6106c41e04191b/libs/ledgerjs/packages/errors/src/index.ts#L270

### OK

> **OK**: `number` = `0x9000`

### OUTPUT\_BUFFER\_TOO\_SMALL

> **OUTPUT\_BUFFER\_TOO\_SMALL**: `number` = `0x6983`

### SIGN\_VERIFY\_ERROR

> **SIGN\_VERIFY\_ERROR**: `number` = `0x6f01`

### UNKNOWN

> **UNKNOWN**: `number` = `0x6f00`

### WRONG\_LENGTH

> **WRONG\_LENGTH**: `number` = `0x6700`

## See

https://github.com/tendermint/ledger-validator-app/blob/master/deps/ledger-zxlib/include/apdu_codes.h
