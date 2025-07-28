# iso-filecoin

[![npm (scoped)](https://img.shields.io/npm/v/iso-filecoin.svg)](https://www.npmjs.com/package/iso-filecoin)
[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/fission-codes/filecoin/iso-filecoin.yml)](https://github.com/fission-codes/filecoin/actions/workflows/iso-filecoin.yml)

Filecoin Javascript Standard Library. Used by the [Metamask Filecoin Wallet](https://github.com/filecoin-project/filsnap) and [Ledger Live Filecoin app](https://www.ledger.com/coin/wallet/filecoin).

## Install

```bash
pnpm install iso-filecoin
```

## Usage

```js
import { Token } from 'iso-filecoin/token'
import * as Wallet  from 'iso-filecoin/wallet'

Token.fromFIL(1).toPicoFIL().toString() // '1000000000000'

const mnemonic = Wallet.generateMnemonic()
const seed = Wallet.mnemonicToSeed(mnemonic)
const account = Wallet.accountFromSeed(
    seed,
    'SECP256K1',
    "m/44'/461'/0'/0/0"
)
const account = Wallet.accountFromMnemonic(
    mnemonic,
    'SECP256K1',
    "m/44'/461'/0'/0/0"
)

const address = account.address.toString() 
//  'f17levgrkmq7jeloew44ixqokvl4qdozvmacidp7i'
```

## Docs

Check [docs website](https://filecoin.hugomrdias.dev)

## Contributing

Read contributing [guidelines](../../.github/CONTRIBUTING.md).

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/hugomrdias/filecoin)

## License

[MIT](../../license) © [Hugo Dias](http://hugodias.me)
