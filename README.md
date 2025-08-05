# ⨎ Filecoin Javascript Packages

This monorepo contains javascript packages to interact with the Filecoin blockchain.

## Packages

- [iso-filecoin](https://github.com/hugomrdias/filecoin/tree/main/packages/iso-filecoin) - Filecoin Javascript Standard Library. Used by the [filsnap.dev](https://filsnap.dev), [Metamask Filecoin Wallet](https://github.com/filecoin-project/filsnap) and [Ledger Live Filecoin app](https://www.ledger.com/coin/wallet/filecoin).
- [iso-filecoin-react](https://github.com/hugomrdias/filecoin/tree/main/packages/iso-filecoin-react) - React hooks and context for Filecoin wallets.
- [iso-filecoin-wallets](https://github.com/hugomrdias/filecoin/tree/main/packages/iso-filecoin-wallets) - Filecoin Wallet Adapters.

## Docs

Check [docs website](https://filecoin.hugomrdias.dev)

## Examples

- [`ledger`](https://github.com/hugomrdias/filecoin/tree/main/examples/ledger) - React + Vite example using all the packages. 
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/hugomrdias/filecoin/tree/main/examples/ledger?title=Filecoin%20Ledger%20Example&file=src/main.jsx&hideExplorer=1&theme=dark)
- [`synapse-script`](https://github.com/hugomrdias/filecoin/tree/main/examples/synapse-script) - React + Vite example using all the packages. 
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/hugomrdias/filecoin/tree/main/examples/synapse-script?title=Synapse%20Script%20Tag&hideExplorer=1&theme=dark)

To clone it locally:

```bash
npx tiged hugomrdias/filecoin/examples/ledger filecoin-ledger
cd filecoin-ledger
pnpm install
pnpm dev
```

You can try any of the examples by replacing `ledger` with the name of the example you want to try.

## Contributing

Read contributing guidelines [here](.github/CONTRIBUTING.md).

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/hugomrdias/filecoin)

## License

[MIT](./license) © [Hugo Dias](http://hugodias.me)