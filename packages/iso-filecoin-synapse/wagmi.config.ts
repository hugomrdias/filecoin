import { defineConfig } from '@wagmi/cli'
import { actions, react } from '@wagmi/cli/plugins'
import { type Address, erc20Abi } from 'viem'
import { pandora, payments, pdp } from './src/abi.js'

const config = defineConfig(() => {
  const contracts = [
    {
      name: 'USDFC',
      abi: erc20Abi,
      address: {
        314: '0x80B98d3aa09ffff255c3ba4A241111Ff1262F045' as Address,
        314159: '0xb3042734b608a1B16e9e86B374A3f3e389B4cDf0' as Address,
      },
    },
    {
      name: 'Payments',
      abi: payments,
      address: {
        314: '0x0000000000000000000000000000000000000000' as Address,
        314159: '0x0E690D3e60B0576D01352AB03b258115eb84A047' as Address,
      },
    },
    {
      name: 'WarmStorage',
      abi: pandora,
      address: {
        314: '0x0000000000000000000000000000000000000000' as Address,
        314159: '0xf49ba5eaCdFD5EE3744efEdf413791935FE4D4c5' as Address,
      },
    },
    {
      name: 'PDPVerifier',
      abi: pdp,
      address: {
        314: '0x0000000000000000000000000000000000000000' as Address,
        314159: '0x5A23b7df87f59A291C26A2A1d684AD03Ce9B68DC' as Address,
      },
    },
  ]

  // const removeAbis = fetch({
  //   contracts: [
  //     {
  //       name: 'WarmStorage',
  //       address: {
  //         314: '0x0000000000000000000000000000000000000000' as Address,
  //         314159: '0xf49ba5eaCdFD5EE3744efEdf413791935FE4D4c5' as Address,
  //       },
  //     },
  //     {
  //       name: 'PDPVerifier',
  //       address: {
  //         314: '0x0000000000000000000000000000000000000000' as Address,
  //         314159: '0x5A23b7df87f59A291C26A2A1d684AD03Ce9B68DC' as Address,
  //       },
  //     },
  //   ],
  //   request(contract) {
  //     switch (contract.name) {
  //       case 'WarmStorage':
  //         return {
  //           url: 'https://raw.githubusercontent.com/pali101/filecoin-services/refs/heads/chore/abi-generation-ci/subgraph/abis/FilecoinWarmStorageService.json',
  //         }
  //       case 'PDPVerifier':
  //         return {
  //           url: 'https://raw.githubusercontent.com/pali101/filecoin-services/refs/heads/chore/abi-generation-ci/subgraph/abis/PDPVerifier.json',
  //         }
  //       default:
  //         throw new Error(`Unknown contract: ${contract.name}`)
  //     }
  //   },
  // })

  return [
    {
      out: 'src/gen.ts',
      contracts,
      plugins: [react(), actions()],
    },
  ]
})

export default config
