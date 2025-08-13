# iso-filecoin-synapse

[![NPM Version](https://img.shields.io/npm/v/iso-filecoin-synapse.svg)](https://www.npmjs.com/package/iso-filecoin-synapse)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Adapter](https://github.com/filecoin-project/filsnap/actions/workflows/iso-filecoin-synapse.yml/badge.svg)](https://github.com/filecoin-project/filsnap/actions/workflows/iso-filecoin-synapse.yml)

React hooks for Filecoin.

## Installation

```bash
pnpm install iso-filecoin-synapse
```

## Usage

```js
import { WalletProvider } from 'iso-filecoin-synapse'

const wallets = []

function Main() {
  return (
    <WalletProvider wallets={wallets}>
      <App />
    </WalletProvider>
  )
}
```

```js
import { useFilsnap } from 'filsnap-adapter-react'

function App() {
  const { isLoading, hasSnaps, isConnected, connect, account, error } =
    useFilsnap()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isConnected) {
    return <button onClick={() => connect()}>Connect to Filecoin Snap</button>
  }

  return <div>Connected to {account.address}</div>
}
```

Check out the [demo](../../examples/demo) for a working example and the [API](https://filecoin-project.github.io/filsnap/modules/filsnap_adapter_synapse.html) for more details.

## Docs

Check the [docs website](https://hugomrdias.github.io/filecoin)

## Contributing

Read contributing guidelines [here](../../.github/CONTRIBUTING.md).

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/hugomrdias/filecoin)

## License

[MIT](../../license) © [Hugo Dias](http://hugodias.me)
