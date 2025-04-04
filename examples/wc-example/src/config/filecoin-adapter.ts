import type { AppKit, AppKitOptions, Connector } from '@reown/appkit'
import type { CaipNetwork, ChainNamespace } from '@reown/appkit-common'
import {
  type ConnectorType,
  CoreHelperUtil,
  type Provider,
  type RequestArguments,
  StorageUtil,
} from '@reown/appkit-controllers'
import { AdapterBlueprint } from '@reown/appkit/adapters'
import { WalletAdapterFilsnap } from 'iso-filecoin-wallets/filsnap'
import type { WalletAdapter } from 'iso-filecoin-wallets/types'
import { RPC } from 'iso-filecoin/rpc'
import { Token } from 'iso-filecoin/token'

const filNamespace = 'fil' as ChainNamespace

/**
 * TODO:
 * - support all wallet adapters as input and init in syncConnectors
 * - sync all events from the adapters and emit here
 * - auth provider for SIWX
 * - check https://docs.reown.com/appkit/react/core/hooks#ethereum%2Fsolana-library to expose Wallet Adapter to iso-filecoin-react
 *
 * @description Filecoin adapter for AppKit
 */
export class FilecoinAdapter extends AdapterBlueprint<FilecoinConnector> {
  private adapter: WalletAdapter | undefined
  constructor(params: AdapterBlueprint.Params = {}) {
    console.log('🚀 ~ FilecoinAdapter ~ constructor ~ params:', params)

    super({
      namespace: filNamespace,
      networks: params.networks?.filter(
        (n) => n.chainNamespace === filNamespace
      ),
      projectId: params.projectId,
    })
  }

  public override construct(params: AdapterBlueprint.Params): void {
    super.construct({
      namespace: filNamespace,
      networks: params.networks?.filter(
        (n) => n.chainNamespace === filNamespace
      ),
      projectId: params.projectId,
    })
    console.log('CONSTRUCT FIL', params)
  }

  private getFilConnector(id: string) {
    return this.connectors.find((c) => c.id === id)
  }

  getAccounts(
    params: AdapterBlueprint.GetAccountsParams
  ): Promise<AdapterBlueprint.GetAccountsResult> {
    console.log('GET ACCOUNTS', params)
    const connector = this.getFilConnector(params.id)
    if (!connector || !connector.adapter.account) {
      return Promise.resolve({
        accounts: [],
      })
    }

    const acc = connector.adapter.account

    const account = CoreHelperUtil.createAccount(
      filNamespace,
      acc.address.toString(),
      'eoa',
      undefined,
      acc.path
    )
    return Promise.resolve({
      accounts: [account],
    })
  }

  override syncConnectors(
    options?: AppKitOptions,
    appKit?: AppKit
  ): void | Promise<void> {
    const chainId = appKit?.getCaipNetwork(this.namespace)?.id
    const network = chainId === 'f' ? 'mainnet' : 'testnet'
    console.log('SYNC CONNECTORS FIL', network, chainId)
    this.addConnector(
      new FilecoinConnector(
        new WalletAdapterFilsnap({
          network,
        })
      )
    )
  }

  public async connect(
    params: AdapterBlueprint.ConnectParams
  ): Promise<AdapterBlueprint.ConnectResult> {
    console.log('CONNECT FIL', params, this.connectors, this.caipNetworks)
    const connector = this.getFilConnector(params.id)
    if (!connector) {
      throw new Error(`No connector for id: ${params.id}`)
    }

    const address = await connector.adapter.connect({
      network: params.chainId === 'f' ? 'mainnet' : 'testnet',
    })

    this.adapter = connector.adapter
    return {
      id: connector.id,
      type: connector.type,
      chainId: params.chainId ?? 'f',
      address: address.account.address.toString(),
      provider: connector.provider,
    }
  }

  public syncConnection(
    params: AdapterBlueprint.SyncConnectionParams
  ): Promise<AdapterBlueprint.ConnectResult> {
    console.log('SYNC CONNECTION', params)
    return this.connect({
      ...params,
      type: '',
    })
  }

  async disconnect(params?: AdapterBlueprint.DisconnectParams): Promise<void> {
    if (this.adapter) {
      await this.adapter.disconnect()
      this.adapter = undefined
    }
  }

  async switchNetwork(
    params: AdapterBlueprint.SwitchNetworkParams
  ): Promise<void> {
    // await super.switchNetwork(params)
    console.log('🚀 ~ FilecoinAdapter ~ switchNetwork ~ params:', params)
    if (!this.adapter) {
      throw new Error('Not connected')
    }

    try {
      const { account } = await this.adapter.changeNetwork(
        params.caipNetwork.id === 'f' ? 'mainnet' : 'testnet'
      )
      const address = account.address.toString()

      this.emit('accountChanged', { address, chainId: params.caipNetwork.id })
    } catch (e) {
      console.error('Could not switch network', e)
    }
  }

  async getBalance(
    params: AdapterBlueprint.GetBalanceParams
  ): Promise<AdapterBlueprint.GetBalanceResult> {
    console.log('BALANCE', params)

    if (!params.caipNetwork) {
      throw new Error('No caipNetwork')
    }
    if (!params.address) {
      return {
        balance: '0.00',
        symbol: 'FIL',
      }
    }
    const caipAddress = `${params.caipNetwork.caipNetworkId}:${params.address}`

    const cachedBalance =
      StorageUtil.getNativeBalanceCacheForCaipAddress(caipAddress)

    if (cachedBalance) {
      return { balance: cachedBalance.balance, symbol: cachedBalance.symbol }
    }

    const rpc = new RPC({
      api: params.caipNetwork?.rpcUrls?.default?.http?.[0],
      network: params.chainId === 'f' ? 'mainnet' : 'testnet',
    })

    const balance = await rpc.balance(params.address)

    if (balance.error) {
      throw new Error(balance.error.message)
    }

    const formattedBalance = Token.fromAttoFIL(balance.result)
      .toFIL()
      .toFormat({
        decimalPlaces: 1,
      })
    StorageUtil.updateNativeBalanceCache({
      caipAddress,
      balance: formattedBalance,
      symbol: params.caipNetwork.nativeCurrency.symbol,
      timestamp: Date.now(),
    })

    return {
      balance: formattedBalance,
      symbol: params.caipNetwork.nativeCurrency.symbol,
    }
  }

  signMessage(
    params: AdapterBlueprint.SignMessageParams
  ): Promise<AdapterBlueprint.SignMessageResult> {
    console.log('SIGN MESSAGE', params)
    return Promise.resolve({
      signature: '0x',
    })
  }

  estimateGas(
    params: AdapterBlueprint.EstimateGasTransactionArgs
  ): Promise<AdapterBlueprint.EstimateGasTransactionResult> {
    console.log('ESTIMATE GAS', params)
    return Promise.resolve({
      gas: 0n,
    })
  }

  sendTransaction(
    params: AdapterBlueprint.SendTransactionParams
  ): Promise<AdapterBlueprint.SendTransactionResult> {
    console.log('SEND TRANSACTION', params)
    return Promise.resolve({
      hash: '0x',
    })
  }

  parseUnits(
    params: AdapterBlueprint.ParseUnitsParams
  ): AdapterBlueprint.ParseUnitsResult {
    console.log('PARSE UNITS', params)
    return 0n
  }

  formatUnits(
    params: AdapterBlueprint.FormatUnitsParams
  ): AdapterBlueprint.FormatUnitsResult {
    console.log('FORMAT UNITS', params)
    return '0'
  }

  getProfile() {
    return Promise.resolve({
      profileName: undefined,
      profileImage: undefined,
    })
  }
  getCapabilities() {
    return Promise.resolve({})
  }
  grantPermissions() {
    return Promise.resolve({})
  }
  revokePermissions() {
    return Promise.resolve('0x' as `0x${string}`)
  }
  walletGetAssets() {
    return Promise.resolve({})
  }
  getEnsAddress(params: AdapterBlueprint.GetEnsAddressParams) {
    return Promise.resolve({ address: params.name })
  }
  writeContract() {
    return Promise.resolve({
      hash: '',
    })
  }
  setUniversalProvider() {
    console.log('SET UNIVERSAL PROVIDER')
    return
  }
  getWalletConnectProvider(
    params: AdapterBlueprint.GetWalletConnectProviderParams
  ) {
    console.log('GET WALLET CONNECT PROVIDER', params)
    return params.provider
  }
}

class FilecoinConnector implements Connector {
  readonly adapter: WalletAdapter
  chain: ChainNamespace
  id: string
  type: ConnectorType
  name: string
  imageUrl: string
  chains: CaipNetwork[]
  provider: Provider
  constructor(adapter: WalletAdapter) {
    this.id = adapter.id
    this.type = 'INJECTED'
    this.name = adapter.name
    this.adapter = adapter
    this.chain = 'fil' as ChainNamespace
    this.imageUrl = connectorImages[adapter.id]
    this.chains = []
    this.provider = {
      connect: () => {
        console.log('CONNECT Provider')
        return Promise.resolve('')
      },
      disconnect: () => Promise.resolve(),
      request<T>(args: RequestArguments): Promise<T> {
        console.log('REQUEST Provider', args)
        return Promise.resolve('' as T)
      },
      on: () => Promise.resolve(),
      removeListener: () => Promise.resolve(),
      emit: () => Promise.resolve(),
    }
  }
}

export const connectorImages: Record<string, string> = {
  filsnap:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxnIGNsaXAtcGF0aD0idXJsKCNiKSI+PHBhdGggZD0ibTMyLjE0NCAzMC4wOC01Ljc5NS0xLjU5LTQuMzcxIDIuNDA4LTMuMDUtLjAwMi00LjM3My0yLjQwNS01Ljc5MyAxLjU5TDcgMjQuNmwxLjc2Mi02LjA4M0w3IDEzLjM3NCA4Ljc2MiA3bDkuMDUyIDQuOTgzaDUuMjc4TDMyLjE0NCA3bDEuNzYyIDYuMzc0LTEuNzYyIDUuMTQzIDEuNzYyIDYuMDgzeiIgZmlsbD0iI0ZGNUMxNiIvPjxwYXRoIGQ9Im04Ljc2MyA3IDkuMDUzIDQuOTg2LS4zNiAzLjQyMnptNS43OTQgMTcuNjAyIDMuOTgzIDIuNzk1LTMuOTgzIDEuMDk0em0zLjY2NC00LjYyMi0uNzY1LTQuNTctNC45IDMuMTA4LS4wMDMtLjAwMXYuMDAybC4wMTUgMy4yIDEuOTg3LTEuNzM4ek0zMi4xNDQgN2wtOS4wNTIgNC45ODYuMzU5IDMuNDIyem0tNS43OTMgMTcuNjAyLTMuOTgzIDIuNzk1IDMuOTgzIDEuMDk0em0yLjAwMi02LjA4M3YtLjAwMnpsLTQuOS0zLjEwNy0uNzY2IDQuNTdoMy42NjRsMS45ODggMS43Mzd6IiBmaWxsPSIjRkY1QzE2Ii8+PHBhdGggZD0ibTE0LjU1NSAyOC40OS01Ljc5MyAxLjU5TDcgMjQuNjAyaDcuNTU1em0zLjY2NS04LjUxIDEuMTA3IDYuNjA2LTEuNTM0LTMuNjczLTUuMjI3LTEuMTk1IDEuOTg4LTEuNzM5em04LjEzMSA4LjUxIDUuNzkzIDEuNTkgMS43NjItNS40NzhoLTcuNTU1em0tMy42NjQtOC41MS0xLjEwNyA2LjYwNiAxLjUzNC0zLjY3MyA1LjIyNy0xLjE5NS0xLjk5LTEuNzM5eiIgZmlsbD0iI0UzNDgwNyIvPjxwYXRoIGQ9Im03IDI0LjYgMS43NjItNi4wODNoMy43OWwuMDE0IDMuMiA1LjIyNyAxLjE5NCAxLjUzNCAzLjY3NC0uNzg5LjgwOS0zLjk4My0yLjc5Nkg3em0yNi45MDYgMC0xLjc2Mi02LjA4M2gtMy43OWwtLjAxMyAzLjItNS4yMjcgMS4xOTQtMS41MzQgMy42NzQuNzg4LjgwOSAzLjk4My0yLjc5Nmg3LjU1NXpNMjMuMDkyIDExLjk4M2gtNS4yNzhsLS4zNTggMy40MjIgMS44NyAxMS4xNzZoMi4yNTRsMS44NzItMTEuMTc2eiIgZmlsbD0iI0ZGOEQ1RCIvPjxwYXRoIGQ9Ik04Ljc2MiA3IDcgMTMuMzc0bDEuNzYyIDUuMTQzaDMuNzlsNC45MDItMy4xMDl6bTguMzYzIDE0LjMwNmgtMS43MTdsLS45MzUuODQ1IDMuMzIxLjc1OHpNMzIuMTQ1IDdsMS43NjEgNi4zNzQtMS43NjIgNS4xNDNoLTMuNzlsLTQuOTAyLTMuMTA5em0tOC4zNiAxNC4zMDZoMS43MTlsLjkzNC44NDUtMy4zMjUuNzZ6bS0xLjgwOCA3LjQxMS4zOTEtMS4zMi0uNzg4LS44MWgtMi4yNTVsLS43ODguODEuMzkxIDEuMzIiIGZpbGw9IiM2NjE4MDAiLz48cGF0aCBkPSJNMjEuOTc3IDI4LjcxN1YzMC45aC0zLjA0OXYtMi4xODJ6IiBmaWxsPSIjQzBDNENEIi8+PHBhdGggZD0ibTE0LjU1NyAyOC40ODggNC4zNzQgMi40MXYtMi4xODJsLS4zOTItMS4zMnptMTEuNzk0IDAtNC4zNzQgMi40MXYtMi4xODJsLjM5MS0xLjMyeiIgZmlsbD0iI0U3RUJGNiIvPjwvZz48ZyBjbGlwLXBhdGg9InVybCgjYykiPjxtYXNrIGlkPSJkIiBzdHlsZT0ibWFzay10eXBlOmx1bWluYW5jZSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMjUiIHk9IjI1IiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjUgMjVoMTB2MTBIMjV6IiBmaWxsPSIjZmZmIi8+PC9tYXNrPjxnIG1hc2s9InVybCgjZCkiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzAgMzVjLTIuNzUgMC01LTIuMjUtNS01LjAyNS4wMjUtMi43NSAyLjI1LTUgNS4wMjUtNC45NzVBNS4wMiA1LjAyIDAgMCAxIDM1IDMwLjA1IDUuMDA0IDUuMDA0IDAgMCAxIDMwIDM1IiBmaWxsPSIjMDA5MEZGIi8+PC9nPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJtMzAuNDc1IDI5LjQtLjE1LjggMS40MjUuMi0uMS4zNzUtMS40LS4yYy0uMS4zMjUtLjE1LjY3NS0uMjc1Ljk3NS0uMTI1LjM1LS4yNS43LS40IDEuMDI1LS4yLjQyNS0uNTUuNzI1LTEuMDI1LjgtLjI3NS4wNS0uNTc1LjAyNS0uOC0uMTUtLjA3NS0uMDUtLjE1LS4xNS0uMTUtLjIyNSAwLS4xLjA1LS4yMjUuMTI1LS4yNzUuMDUtLjAyNS4xNzUgMCAuMjUuMDI1LjA3NS4wNzUuMTUuMTc1LjIuMjc1LjE1LjIuMzUuMjI1LjU1LjA3NS4yMjUtLjIuMzUtLjQ3NS40MjUtLjc1LjE1LS42LjMtMS4xNzUuNDI1LTEuNzc1di0uMWwtMS4zMjUtLjIuMDUtLjM3NSAxLjM3NS4yLjE3NS0uNzc1LTEuNDI1LS4yMjUuMDUtLjQgMS40NzUuMmMuMDUtLjE1LjA3NS0uMjc1LjEyNS0uNC4xMjUtLjQ1LjI1LS45LjU1LTEuM3MuNjUtLjY1IDEuMTc1LS42MjVjLjIyNSAwIC40NS4wNzUuNi4yNS4wMjUuMDI1LjA3NS4wNzUuMDc1LjEyNSAwIC4xIDAgLjIyNS0uMDc1LjMtLjEuMDc1LS4yMjUuMDUtLjMyNS0uMDUtLjA3NS0uMDc1LS4xMjUtLjE1LS4yLS4yMjUtLjE1LS4yLS4zNzUtLjIyNS0uNTUtLjA1LS4xMjUuMTI1LS4yNS4zLS4zMjUuNDc1LS4xNzUuNTI1LS4zIDEuMDc1LS40NzUgMS42MjVsMS4zNzUuMi0uMS4zNzV6IiBmaWxsPSIjZmZmIi8+PC9nPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImEiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDBoNDB2NDBIMHoiLz48L2NsaXBQYXRoPjxjbGlwUGF0aCBpZD0iYiI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTcgN2gyN3YyNEg3eiIvPjwvY2xpcFBhdGg+PGNsaXBQYXRoIGlkPSJjIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjUgMjVoMTB2MTBIMjV6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+',
}

export const chainImages = {
  314: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxtYXNrIGlkPSJiIiBzdHlsZT0ibWFzay10eXBlOmx1bWluYW5jZSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0iI2ZmZiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2IpIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIwIDQwQzkgNDAgMCAzMSAwIDE5LjkuMSA4LjkgOS0uMSAyMC4xIDAgMzEuMS4xIDQwIDkgNDAgMjAuMiAzOS45IDMxLjEgMzEgNDAgMjAgNDAiIGZpbGw9IiMwMDkwRkYiLz48L2c+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0yMS45IDE3LjYtLjYgMy4yIDUuNy44LS40IDEuNS01LjYtLjhjLS40IDEuMy0uNiAyLjctMS4xIDMuOS0uNSAxLjQtMSAyLjgtMS42IDQuMS0uOCAxLjctMi4yIDIuOS00LjEgMy4yLTEuMS4yLTIuMy4xLTMuMi0uNi0uMy0uMi0uNi0uNi0uNi0uOSAwLS40LjItLjkuNS0xLjEuMi0uMS43IDAgMSAuMS4zLjMuNi43LjggMS4xLjYuOCAxLjQuOSAyLjIuMy45LS44IDEuNC0xLjkgMS43LTMgLjYtMi40IDEuMi00LjcgMS43LTcuMXYtLjRsLTUuMy0uOC4yLTEuNSA1LjUuOC43LTMuMS01LjctLjkuMi0xLjYgNS45LjhjLjItLjYuMy0xLjEuNS0xLjYuNS0xLjggMS0zLjYgMi4yLTUuMnMyLjYtMi42IDQuNy0yLjVjLjkgMCAxLjguMyAyLjQgMSAuMS4xLjMuMy4zLjUgMCAuNCAwIC45LS4zIDEuMi0uNC4zLS45LjItMS4zLS4yLS4zLS4zLS41LS42LS44LS45LS42LS44LTEuNS0uOS0yLjItLjItLjUuNS0xIDEuMi0xLjMgMS45LS43IDIuMS0xLjIgNC4zLTEuOSA2LjVsNS41LjgtLjQgMS41eiIgZmlsbD0iI2ZmZiIvPjxnIGNsaXAtcGF0aD0idXJsKCNjKSI+PHBhdGggZD0iTTMwIDI3LjA2OFYyM2wtMyA1LjYwMnoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzAgMzAuNTk5di0zLjUzMmwtMyAxLjUzNXptMC0zLjUzMiAyLjk5OCAxLjUzNUwzMCAyM3oiIGZpbGw9IiNEOERDRjIiLz48cGF0aCBkPSJNMjkuOTk5IDI3LjA2OHYzLjUzbDMtMS45OTZ6IiBmaWxsPSIjOUNBM0U2Ii8+PHBhdGggZD0ibTMwIDMxLjIzOC0zLTEuOTk0IDMgNC43NTh6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0ibTMzIDI5LjI0NC0zLjAwMSAxLjk5NHYyLjc2NHoiIGZpbGw9IiNEOERDRjIiLz48L2c+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0iYSI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGg0MHY0MEgweiIvPjwvY2xpcFBhdGg+PGNsaXBQYXRoIGlkPSJjIj48cmVjdCB4PSIyNyIgeT0iMjMiIHdpZHRoPSI2IiBoZWlnaHQ9IjExIiByeD0iMyIgZmlsbD0iI2ZmZiIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg==',
  314_159:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxtYXNrIGlkPSJiIiBzdHlsZT0ibWFzay10eXBlOmx1bWluYW5jZSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0iI2ZmZiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2IpIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIwIDQwQzkgNDAgMCAzMSAwIDE5LjkuMSA4LjkgOS0uMSAyMC4xIDAgMzEuMS4xIDQwIDkgNDAgMjAuMiAzOS45IDMxLjEgMzEgNDAgMjAgNDAiIGZpbGw9IiMwMDNBNjYiLz48L2c+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0yMS45IDE3LjYtLjYgMy4yIDUuNy44LS40IDEuNS01LjYtLjhjLS40IDEuMy0uNiAyLjctMS4xIDMuOS0uNSAxLjQtMSAyLjgtMS42IDQuMS0uOCAxLjctMi4yIDIuOS00LjEgMy4yLTEuMS4yLTIuMy4xLTMuMi0uNi0uMy0uMi0uNi0uNi0uNi0uOSAwLS40LjItLjkuNS0xLjEuMi0uMS43IDAgMSAuMS4zLjMuNi43LjggMS4xLjYuOCAxLjQuOSAyLjIuMy45LS44IDEuNC0xLjkgMS43LTMgLjYtMi40IDEuMi00LjcgMS43LTcuMXYtLjRsLTUuMy0uOC4yLTEuNSA1LjUuOC43LTMuMS01LjctLjkuMi0xLjYgNS45LjhjLjItLjYuMy0xLjEuNS0xLjYuNS0xLjggMS0zLjYgMi4yLTUuMnMyLjYtMi42IDQuNy0yLjVjLjkgMCAxLjguMyAyLjQgMSAuMS4xLjMuMy4zLjUgMCAuNCAwIC45LS4zIDEuMi0uNC4zLS45LjItMS4zLS4yLS4zLS4zLS41LS42LS44LS45LS42LS44LTEuNS0uOS0yLjItLjItLjUuNS0xIDEuMi0xLjMgMS45LS43IDIuMS0xLjIgNC4zLTEuOSA2LjVsNS41LjgtLjQgMS41eiIgZmlsbD0iI2ZmZiIvPjxnIGNsaXAtcGF0aD0idXJsKCNjKSI+PHBhdGggZD0iTTMwIDI3LjA2OFYyM2wtMyA1LjYwMnoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzAgMzAuNTk5di0zLjUzMmwtMyAxLjUzNXptMC0zLjUzMiAyLjk5OCAxLjUzNUwzMCAyM3oiIGZpbGw9IiNEOERDRjIiLz48cGF0aCBkPSJNMjkuOTk5IDI3LjA2OHYzLjUzbDMtMS45OTZ6IiBmaWxsPSIjOUNBM0U2Ii8+PHBhdGggZD0ibTMwIDMxLjIzOC0zLTEuOTk0IDMgNC43NTh6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0ibTMzIDI5LjI0NC0zLjAwMSAxLjk5NHYyLjc2NHoiIGZpbGw9IiNEOERDRjIiLz48L2c+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0iYSI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGg0MHY0MEgweiIvPjwvY2xpcFBhdGg+PGNsaXBQYXRoIGlkPSJjIj48cmVjdCB4PSIyNyIgeT0iMjMiIHdpZHRoPSI2IiBoZWlnaHQ9IjExIiByeD0iMyIgZmlsbD0iI2ZmZiIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg==',
  f: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxtYXNrIGlkPSJiIiBzdHlsZT0ibWFzay10eXBlOmx1bWluYW5jZSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0iI2ZmZiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2IpIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIwIDQwQzkgNDAgMCAzMSAwIDE5LjkuMSA4LjkgOS0uMSAyMC4xIDAgMzEuMS4xIDQwIDkgNDAgMjAuMiAzOS45IDMxLjEgMzEgNDAgMjAgNDAiIGZpbGw9IiMwMDkwRkYiLz48L2c+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0yMS45IDE3LjYtLjYgMy4yIDUuNy44LS40IDEuNS01LjYtLjhjLS40IDEuMy0uNiAyLjctMS4xIDMuOS0uNSAxLjQtMSAyLjgtMS42IDQuMS0uOCAxLjctMi4yIDIuOS00LjEgMy4yLTEuMS4yLTIuMy4xLTMuMi0uNi0uMy0uMi0uNi0uNi0uNi0uOSAwLS40LjItLjkuNS0xLjEuMi0uMS43IDAgMSAuMS4zLjMuNi43LjggMS4xLjYuOCAxLjQuOSAyLjIuMy45LS44IDEuNC0xLjkgMS43LTMgLjYtMi40IDEuMi00LjcgMS43LTcuMXYtLjRsLTUuMy0uOC4yLTEuNSA1LjUuOC43LTMuMS01LjctLjkuMi0xLjYgNS45LjhjLjItLjYuMy0xLjEuNS0xLjYuNS0xLjggMS0zLjYgMi4yLTUuMnMyLjYtMi42IDQuNy0yLjVjLjkgMCAxLjguMyAyLjQgMSAuMS4xLjMuMy4zLjUgMCAuNCAwIC45LS4zIDEuMi0uNC4zLS45LjItMS4zLS4yLS4zLS4zLS41LS42LS44LS45LS42LS44LTEuNS0uOS0yLjItLjItLjUuNS0xIDEuMi0xLjMgMS45LS43IDIuMS0xLjIgNC4zLTEuOSA2LjVsNS41LjgtLjQgMS41eiIgZmlsbD0iI2ZmZiIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImEiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDBoNDB2NDBIMHoiLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4=',
  t: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxtYXNrIGlkPSJiIiBzdHlsZT0ibWFzay10eXBlOmx1bWluYW5jZSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0iI2ZmZiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2IpIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIwIDQwQzkgNDAgMCAzMSAwIDE5LjkuMSA4LjkgOS0uMSAyMC4xIDAgMzEuMS4xIDQwIDkgNDAgMjAuMiAzOS45IDMxLjEgMzEgNDAgMjAgNDAiIGZpbGw9IiMwMDNBNjYiLz48L2c+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0yMS45IDE3LjYtLjYgMy4yIDUuNy44LS40IDEuNS01LjYtLjhjLS40IDEuMy0uNiAyLjctMS4xIDMuOS0uNSAxLjQtMSAyLjgtMS42IDQuMS0uOCAxLjctMi4yIDIuOS00LjEgMy4yLTEuMS4yLTIuMy4xLTMuMi0uNi0uMy0uMi0uNi0uNi0uNi0uOSAwLS40LjItLjkuNS0xLjEuMi0uMS43IDAgMSAuMS4zLjMuNi43LjggMS4xLjYuOCAxLjQuOSAyLjIuMy45LS44IDEuNC0xLjkgMS43LTMgLjYtMi40IDEuMi00LjcgMS43LTcuMXYtLjRsLTUuMy0uOC4yLTEuNSA1LjUuOC43LTMuMS01LjctLjkuMi0xLjYgNS45LjhjLjItLjYuMy0xLjEuNS0xLjYuNS0xLjggMS0zLjYgMi4yLTUuMnMyLjYtMi42IDQuNy0yLjVjLjkgMCAxLjguMyAyLjQgMSAuMS4xLjMuMy4zLjUgMCAuNCAwIC45LS4zIDEuMi0uNC4zLS45LjItMS4zLS4yLS4zLS4zLS41LS42LS44LS45LS42LS44LTEuNS0uOS0yLjItLjItLjUuNS0xIDEuMi0xLjMgMS45LS43IDIuMS0xLjIgNC4zLTEuOSA2LjVsNS41LjgtLjQgMS41eiIgZmlsbD0iI2ZmZiIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImEiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDBoNDB2NDBIMHoiLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4=',
}
