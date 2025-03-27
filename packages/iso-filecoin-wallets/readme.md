# iso-filecoin-wallets

[![npm (scoped)](https://img.shields.io/npm/v/iso-filecoin-wallets.svg)](https://www.npmjs.com/package/iso-filecoin-wallets)
[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/fission-codes/filecoin/iso-filecoin-wallets.yml)](https://github.com/fission-codes/filecoin/actions/workflows/iso-filecoin-wallets.yml)

Wallet adapters for filsnap, ledger, HD, Raw and more.

## Install

```bash
pnpm install iso-filecoin-wallets iso-filecoin filsnap-adapter
```

## Usage

```js
import { WalletAdapterHd } from 'iso-filecoin-wallets/hd'

const adapter = new WalletAdapterHd({
    mnemonic: 'raw include ecology social turtle still perfect trip dance food welcome aunt patient very toss very program estate diet portion city camera loop guess'

})

adapter.connect({network: 'mainnet'})

const address = adapter.account.address.toString() 
// 'f17levgrkmq7jeloew44ixqokvl4qdozvmacidp7i'

const {network, account} = adapter.changeNetwork({network: 'testnet'})
console.log(account.address.toString())
// t1xciji452owqgqmyuphjbv3ubfkhpsvvxrcnfgpq

await wallet.disconnect()
```

## Docs

Check [docs website](https://filecoin.hugomrdias.dev)

## Contributing

Read contributing guidelines [here](../../.github/CONTRIBUTING.md).

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/hugomrdias/filecoin)

## License

[MIT](../../license) © [Hugo Dias](http://hugodias.me)
