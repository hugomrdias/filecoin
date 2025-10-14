import {
  AdapterBlueprint,
  CoreHelperUtil,
  StorageUtil,
} from '@reown/appkit-controllers'
import { RPC } from 'iso-filecoin/rpc'
import { Token } from 'iso-filecoin/token'

/**
 * @import { AppKit, AppKitOptions, CaipNetwork } from '@reown/appkit'
 * @import { ChainNamespace } from '@reown/appkit-common'
 * @import { AccountNetwork, WalletAdapter } from 'iso-filecoin-wallets/types'
 * @import { ConnectorType, Provider } from '@reown/appkit-controllers'
 */

/**
 * @description Filecoin namespace
 */
export const filNamespace = /** @type {ChainNamespace} */ ('fil')

/**
 * TODO:
 * - auth provider for SIWX
 *
 * @description Filecoin adapter for AppKit
 * @extends {AdapterBlueprint<FilecoinConnector>}
 */
export class FilecoinAppKitAdapter extends AdapterBlueprint {
  /**
   * @type {WalletAdapter | undefined}
   */
  #adapter

  /**
   * @type {WalletAdapter[]}
   */
  adapters

  /**
   * @param {{ adapters: WalletAdapter[] }} params
   */
  constructor(params) {
    super({
      namespace: filNamespace,
      adapterType: 'filecoin',
    })
    this.adapters = params.adapters
  }

  /**
   * @param {AdapterBlueprint.Params} params
   */
  construct(params) {
    super.construct({
      namespace: filNamespace,
      networks: params.networks?.filter(
        (n) => n.chainNamespace === filNamespace
      ),
      projectId: params.projectId,
    })
    this.caipNetworks = params.networks?.filter(
      (n) => n.chainNamespace === filNamespace
    )
  }

  /**
   * @param {string} id
   */
  #getFilConnector(id) {
    return this.connectors.find((c) => c.id === id)
  }

  /**
   * Get accounts
   *
   * @param {AdapterBlueprint.GetAccountsParams} params
   * @returns {Promise<AdapterBlueprint.GetAccountsResult>}
   */
  getAccounts(params) {
    const connector = this.#getFilConnector(params.id)
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

  /**
   * Sync connectors
   *
   * @returns {void | Promise<void>}
   */
  syncConnectors() {
    for (const adapter of this.adapters) {
      this.addConnector(new FilecoinConnector(adapter))
    }
  }

  /**
   * Sync connections
   *
   * @param {AdapterBlueprint.SyncConnectionsParams} _params
   * @returns {void | Promise<void>}
   */
  syncConnections(_params) {
    return Promise.resolve()
  }

  /**
   * Connect
   *
   * @param {AdapterBlueprint.ConnectParams} params
   * @returns {Promise<AdapterBlueprint.ConnectResult>}
   */
  async connect(params) {
    const connector = this.#getFilConnector(params.id)
    if (!connector) {
      throw new Error(`No connector for id: ${params.id}`)
    }

    const { account } = await connector.adapter.connect({
      network: params.chainId === 'f' ? 'mainnet' : 'testnet',
    })

    this.#adapter = connector.adapter
    this.#listenToAdapter(connector.adapter)
    return {
      id: connector.id,
      type: connector.type,
      chainId: params.chainId ?? 'f',
      address: account.address.toString(),
      provider: connector.provider,
    }
  }

  /**
   * Listen to adapter
   *
   * @param {WalletAdapter} adapter
   */
  #listenToAdapter(adapter) {
    const handleConnect = (/** @type {CustomEvent<AccountNetwork>} */ evt) => {
      this.emit('accountChanged', {
        address: evt.detail.account.address.toString(),
        chainId: evt.detail.network === 'mainnet' ? 'f' : 't',
      })
    }

    const handleAccountChanged = (
      /** @type {CustomEvent<import('iso-filecoin/types').IAccount>} */ evt
    ) => {
      this.emit('accountChanged', {
        address: evt.detail.address.toString(),
      })
    }

    const handleDisconnect = () => {
      // remove event listener
      adapter.off('connect', handleConnect)
      adapter.off('disconnect', handleDisconnect)
      adapter.off('accountChanged', handleAccountChanged)
      adapter.off('networkChanged', handleConnect)
      this.emit('disconnect')
    }
    adapter.on('connect', handleConnect)
    adapter.on('accountChanged', handleAccountChanged)
    adapter.on('networkChanged', handleConnect)
    adapter.on('disconnect', handleDisconnect)
  }

  /**
   * Sync connection
   *
   * @param {AdapterBlueprint.SyncConnectionParams} params
   * @returns {Promise<AdapterBlueprint.ConnectResult>}
   */
  syncConnection(params) {
    return this.connect({
      ...params,
      type: '',
    })
  }

  /**
   * Disconnect
   *
   * @param {AdapterBlueprint.DisconnectParams} _params
   * @returns {Promise<AdapterBlueprint.DisconnectResult>}
   */
  async disconnect(_params) {
    if (this.#adapter) {
      await this.#adapter.disconnect()
      this.#adapter = undefined
    }

    return {
      connections: [],
    }
  }

  /**
   * Switch network
   *
   * @param {AdapterBlueprint.SwitchNetworkParams} params
   * @returns {Promise<void>}
   */
  async switchNetwork(params) {
    if (!this.#adapter) {
      throw new Error('Not connected')
    }

    await this.#adapter.changeNetwork(
      params.caipNetwork.id === 'f' ? 'mainnet' : 'testnet'
    )
  }

  /**
   * Get balance
   *
   * @param {AdapterBlueprint.GetBalanceParams} params
   * @returns {Promise<AdapterBlueprint.GetBalanceResult>}
   */
  async getBalance(params) {
    if (!this.#adapter || !params.caipNetwork || !params.address) {
      return {
        balance: '0.00',
        symbol: 'FIL',
      }
    }

    // Switch network if needed
    const network = params.caipNetwork.id === 'f' ? 'mainnet' : 'testnet'
    let address = params.address
    if (network !== this.#adapter.network) {
      const { account } = await this.#adapter.changeNetwork(network)
      address = account.address.toString()
    }

    // Check cache
    const caipAddress = `${params.caipNetwork.caipNetworkId}:${address}`
    const cachedBalance =
      StorageUtil.getNativeBalanceCacheForCaipAddress(caipAddress)

    if (cachedBalance) {
      return { balance: cachedBalance.balance, symbol: cachedBalance.symbol }
    }

    // Get balance from RPC
    const rpc = new RPC({
      api: params.caipNetwork?.rpcUrls?.default?.http?.[0],
      network: network,
    })

    const balance = await rpc.balance(address)

    if (balance.error) {
      throw new Error(balance.error.message)
    }

    // Format balance
    const formattedBalance = Token.fromAttoFIL(balance.result)
      .toFIL()
      .toFormat({
        decimalPlaces: 1,
      })

    // Update cache
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

  /**
   * Sign message
   *
   * @param {AdapterBlueprint.SignMessageParams} _params
   * @returns {Promise<AdapterBlueprint.SignMessageResult>}
   */
  signMessage(_params) {
    return Promise.resolve({
      signature: '0x',
    })
  }

  /**
   * Estimate gas
   *
   * @param {AdapterBlueprint.EstimateGasTransactionArgs} _params
   * @returns {Promise<AdapterBlueprint.EstimateGasTransactionResult>}
   */
  estimateGas(_params) {
    return Promise.resolve({
      gas: 0n,
    })
  }

  /**
   * Send transaction
   *
   * @param {AdapterBlueprint.SendTransactionParams} _params
   * @returns {Promise<AdapterBlueprint.SendTransactionResult>}
   */
  sendTransaction(_params) {
    return Promise.resolve({
      hash: '0x',
    })
  }

  /**
   * Parse units
   *
   * @param {AdapterBlueprint.ParseUnitsParams} _params
   * @returns {AdapterBlueprint.ParseUnitsResult}
   */
  parseUnits(_params) {
    return 0n
  }

  /**
   * Format units
   *
   * @param {AdapterBlueprint.FormatUnitsParams} _params
   * @returns {AdapterBlueprint.FormatUnitsResult}
   */
  formatUnits(_params) {
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
    return Promise.resolve(/** @type {`0x${string}`} */ ('0x'))
  }
  walletGetAssets() {
    return Promise.resolve({})
  }

  /**
   * Write contract
   *
   * @returns {Promise<AdapterBlueprint.WriteContractResult>}
   */
  writeContract() {
    return Promise.resolve({
      hash: '',
    })
  }

  setUniversalProvider() {
    return Promise.resolve()
  }
  /**
   * @param {{ provider: any; }} params
   */
  getWalletConnectProvider(params) {
    return params.provider
  }
}

class FilecoinConnector {
  /**
   * @type {WalletAdapter}
   */
  adapter
  /**
   * @type {ChainNamespace}
   */
  chain
  /**
   * @type {string}
   */
  id
  /**
   * @type {ConnectorType}
   */
  type
  /**
   * @type {string}
   */
  name
  /**
   * @type {string}
   */
  imageUrl
  /**
   * @type {CaipNetwork[]}
   */
  chains

  /** @type {Provider} */
  provider

  /**
   *
   * @param {WalletAdapter} adapter
   */
  constructor(adapter) {
    this.id = adapter.id
    this.type = 'INJECTED'
    this.name = adapter.name
    this.adapter = adapter
    this.chain = /** @type {ChainNamespace} */ ('fil')
    this.imageUrl = connectorImages[adapter.id]
    this.chains = []
    // @ts-expect-error todo: fix
    this.provider = adapter
  }
}

/**
 * Appkit connector images
 *
 * @type {Record<string, string>}
 */
export const connectorImages = {
  filsnap:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxnIGNsaXAtcGF0aD0idXJsKCNiKSI+PHBhdGggZD0ibTMyLjE0NCAzMC4wOC01Ljc5NS0xLjU5LTQuMzcxIDIuNDA4LTMuMDUtLjAwMi00LjM3My0yLjQwNS01Ljc5MyAxLjU5TDcgMjQuNmwxLjc2Mi02LjA4M0w3IDEzLjM3NCA4Ljc2MiA3bDkuMDUyIDQuOTgzaDUuMjc4TDMyLjE0NCA3bDEuNzYyIDYuMzc0LTEuNzYyIDUuMTQzIDEuNzYyIDYuMDgzeiIgZmlsbD0iI0ZGNUMxNiIvPjxwYXRoIGQ9Im04Ljc2MyA3IDkuMDUzIDQuOTg2LS4zNiAzLjQyMnptNS43OTQgMTcuNjAyIDMuOTgzIDIuNzk1LTMuOTgzIDEuMDk0em0zLjY2NC00LjYyMi0uNzY1LTQuNTctNC45IDMuMTA4LS4wMDMtLjAwMXYuMDAybC4wMTUgMy4yIDEuOTg3LTEuNzM4ek0zMi4xNDQgN2wtOS4wNTIgNC45ODYuMzU5IDMuNDIyem0tNS43OTMgMTcuNjAyLTMuOTgzIDIuNzk1IDMuOTgzIDEuMDk0em0yLjAwMi02LjA4M3YtLjAwMnpsLTQuOS0zLjEwNy0uNzY2IDQuNTdoMy42NjRsMS45ODggMS43Mzd6IiBmaWxsPSIjRkY1QzE2Ii8+PHBhdGggZD0ibTE0LjU1NSAyOC40OS01Ljc5MyAxLjU5TDcgMjQuNjAyaDcuNTU1em0zLjY2NS04LjUxIDEuMTA3IDYuNjA2LTEuNTM0LTMuNjczLTUuMjI3LTEuMTk1IDEuOTg4LTEuNzM5em04LjEzMSA4LjUxIDUuNzkzIDEuNTkgMS43NjItNS40NzhoLTcuNTU1em0tMy42NjQtOC41MS0xLjEwNyA2LjYwNiAxLjUzNC0zLjY3MyA1LjIyNy0xLjE5NS0xLjk5LTEuNzM5eiIgZmlsbD0iI0UzNDgwNyIvPjxwYXRoIGQ9Im03IDI0LjYgMS43NjItNi4wODNoMy43OWwuMDE0IDMuMiA1LjIyNyAxLjE5NCAxLjUzNCAzLjY3NC0uNzg5LjgwOS0zLjk4My0yLjc5Nkg3em0yNi45MDYgMC0xLjc2Mi02LjA4M2gtMy43OWwtLjAxMyAzLjItNS4yMjcgMS4xOTQtMS41MzQgMy42NzQuNzg4LjgwOSAzLjk4My0yLjc5Nmg3LjU1NXpNMjMuMDkyIDExLjk4M2gtNS4yNzhsLS4zNTggMy40MjIgMS44NyAxMS4xNzZoMi4yNTRsMS44NzItMTEuMTc2eiIgZmlsbD0iI0ZGOEQ1RCIvPjxwYXRoIGQ9Ik04Ljc2MiA3IDcgMTMuMzc0bDEuNzYyIDUuMTQzaDMuNzlsNC45MDItMy4xMDl6bTguMzYzIDE0LjMwNmgtMS43MTdsLS45MzUuODQ1IDMuMzIxLjc1OHpNMzIuMTQ1IDdsMS43NjEgNi4zNzQtMS43NjIgNS4xNDNoLTMuNzlsLTQuOTAyLTMuMTA5em0tOC4zNiAxNC4zMDZoMS43MTlsLjkzNC44NDUtMy4zMjUuNzZ6bS0xLjgwOCA3LjQxMS4zOTEtMS4zMi0uNzg4LS44MWgtMi4yNTVsLS43ODguODEuMzkxIDEuMzIiIGZpbGw9IiM2NjE4MDAiLz48cGF0aCBkPSJNMjEuOTc3IDI4LjcxN1YzMC45aC0zLjA0OXYtMi4xODJ6IiBmaWxsPSIjQzBDNENEIi8+PHBhdGggZD0ibTE0LjU1NyAyOC40ODggNC4zNzQgMi40MXYtMi4xODJsLS4zOTItMS4zMnptMTEuNzk0IDAtNC4zNzQgMi40MXYtMi4xODJsLjM5MS0xLjMyeiIgZmlsbD0iI0U3RUJGNiIvPjwvZz48ZyBjbGlwLXBhdGg9InVybCgjYykiPjxtYXNrIGlkPSJkIiBzdHlsZT0ibWFzay10eXBlOmx1bWluYW5jZSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMjUiIHk9IjI1IiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjUgMjVoMTB2MTBIMjV6IiBmaWxsPSIjZmZmIi8+PC9tYXNrPjxnIG1hc2s9InVybCgjZCkiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzAgMzVjLTIuNzUgMC01LTIuMjUtNS01LjAyNS4wMjUtMi43NSAyLjI1LTUgNS4wMjUtNC45NzVBNS4wMiA1LjAyIDAgMCAxIDM1IDMwLjA1IDUuMDA0IDUuMDA0IDAgMCAxIDMwIDM1IiBmaWxsPSIjMDA5MEZGIi8+PC9nPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJtMzAuNDc1IDI5LjQtLjE1LjggMS40MjUuMi0uMS4zNzUtMS40LS4yYy0uMS4zMjUtLjE1LjY3NS0uMjc1Ljk3NS0uMTI1LjM1LS4yNS43LS40IDEuMDI1LS4yLjQyNS0uNTUuNzI1LTEuMDI1LjgtLjI3NS4wNS0uNTc1LjAyNS0uOC0uMTUtLjA3NS0uMDUtLjE1LS4xNS0uMTUtLjIyNSAwLS4xLjA1LS4yMjUuMTI1LS4yNzUuMDUtLjAyNS4xNzUgMCAuMjUuMDI1LjA3NS4wNzUuMTUuMTc1LjIuMjc1LjE1LjIuMzUuMjI1LjU1LjA3NS4yMjUtLjIuMzUtLjQ3NS40MjUtLjc1LjE1LS42LjMtMS4xNzUuNDI1LTEuNzc1di0uMWwtMS4zMjUtLjIuMDUtLjM3NSAxLjM3NS4yLjE3NS0uNzc1LTEuNDI1LS4yMjUuMDUtLjQgMS40NzUuMmMuMDUtLjE1LjA3NS0uMjc1LjEyNS0uNC4xMjUtLjQ1LjI1LS45LjU1LTEuM3MuNjUtLjY1IDEuMTc1LS42MjVjLjIyNSAwIC40NS4wNzUuNi4yNS4wMjUuMDI1LjA3NS4wNzUuMDc1LjEyNSAwIC4xIDAgLjIyNS0uMDc1LjMtLjEuMDc1LS4yMjUuMDUtLjMyNS0uMDUtLjA3NS0uMDc1LS4xMjUtLjE1LS4yLS4yMjUtLjE1LS4yLS4zNzUtLjIyNS0uNTUtLjA1LS4xMjUuMTI1LS4yNS4zLS4zMjUuNDc1LS4xNzUuNTI1LS4zIDEuMDc1LS40NzUgMS42MjVsMS4zNzUuMi0uMS4zNzV6IiBmaWxsPSIjZmZmIi8+PC9nPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImEiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDBoNDB2NDBIMHoiLz48L2NsaXBQYXRoPjxjbGlwUGF0aCBpZD0iYiI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTcgN2gyN3YyNEg3eiIvPjwvY2xpcFBhdGg+PGNsaXBQYXRoIGlkPSJjIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjUgMjVoMTB2MTBIMjV6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+',
  ledger:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxwYXRoIGQ9Ik04IDIzLjk2djUuOTMyaDkuMDI3di0xLjMxNUg5LjMxNVYyMy45NnptMjIuNjg1IDB2NC42MTdoLTcuNzEydjEuMzE1SDMyVjIzLjk2ek0xNy4wNCAxNC45MzJ2OS4wMjhoNS45MzJ2LTEuMTg3aC00LjYxN3YtNy44NHpNOCA5djUuOTMyaDEuMzE1di00LjYxN2g3LjcxMlY5em0xNC45NzMgMHYxLjMxNWg3LjcxMnY0LjYxN0gzMlY5eiIgZmlsbD0iIzAwMCIvPjxnIGNsaXAtcGF0aD0idXJsKCNiKSI+PG1hc2sgaWQ9ImMiIHN0eWxlPSJtYXNrLXR5cGU6bHVtaW5hbmNlIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIyNSIgeT0iMjUiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNSAyNWgxMHYxMEgyNXoiIGZpbGw9IiNmZmYiLz48L21hc2s+PGcgbWFzaz0idXJsKCNjKSI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMCAzNWMtMi43NSAwLTUtMi4yNS01LTUuMDI1LjAyNS0yLjc1IDIuMjUtNSA1LjAyNS00Ljk3NUE1LjAyIDUuMDIgMCAwIDEgMzUgMzAuMDUgNS4wMDQgNS4wMDQgMCAwIDEgMzAgMzUiIGZpbGw9IiMwMDkwRkYiLz48L2c+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0zMC40NzUgMjkuNC0uMTUuOCAxLjQyNS4yLS4xLjM3NS0xLjQtLjJjLS4xLjMyNS0uMTUuNjc1LS4yNzUuOTc1LS4xMjUuMzUtLjI1LjctLjQgMS4wMjUtLjIuNDI1LS41NS43MjUtMS4wMjUuOC0uMjc1LjA1LS41NzUuMDI1LS44LS4xNS0uMDc1LS4wNS0uMTUtLjE1LS4xNS0uMjI1IDAtLjEuMDUtLjIyNS4xMjUtLjI3NS4wNS0uMDI1LjE3NSAwIC4yNS4wMjUuMDc1LjA3NS4xNS4xNzUuMi4yNzUuMTUuMi4zNS4yMjUuNTUuMDc1LjIyNS0uMi4zNS0uNDc1LjQyNS0uNzUuMTUtLjYuMy0xLjE3NS40MjUtMS43NzV2LS4xbC0xLjMyNS0uMi4wNS0uMzc1IDEuMzc1LjIuMTc1LS43NzUtMS40MjUtLjIyNS4wNS0uNCAxLjQ3NS4yYy4wNS0uMTUuMDc1LS4yNzUuMTI1LS40LjEyNS0uNDUuMjUtLjkuNTUtMS4zcy42NS0uNjUgMS4xNzUtLjYyNWMuMjI1IDAgLjQ1LjA3NS42LjI1LjAyNS4wMjUuMDc1LjA3NS4wNzUuMTI1IDAgLjEgMCAuMjI1LS4wNzUuMy0uMS4wNzUtLjIyNS4wNS0uMzI1LS4wNS0uMDc1LS4wNzUtLjEyNS0uMTUtLjItLjIyNS0uMTUtLjItLjM3NS0uMjI1LS41NS0uMDUtLjEyNS4xMjUtLjI1LjMtLjMyNS40NzUtLjE3NS41MjUtLjMgMS4wNzUtLjQ3NSAxLjYyNWwxLjM3NS4yLS4xLjM3NXoiIGZpbGw9IiNmZmYiLz48L2c+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0iYSI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGg0MHY0MEgweiIvPjwvY2xpcFBhdGg+PGNsaXBQYXRoIGlkPSJiIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjUgMjVoMTB2MTBIMjV6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+',
}

/**
 * Appkit chain images
 *
 * @type {Record<string, string>}
 */
export const chainImages = {
  314: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxtYXNrIGlkPSJiIiBzdHlsZT0ibWFzay10eXBlOmx1bWluYW5jZSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0iI2ZmZiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2IpIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIwIDQwQzkgNDAgMCAzMSAwIDE5LjkuMSA4LjkgOS0uMSAyMC4xIDAgMzEuMS4xIDQwIDkgNDAgMjAuMiAzOS45IDMxLjEgMzEgNDAgMjAgNDAiIGZpbGw9IiMwMDkwRkYiLz48L2c+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0yMS45IDE3LjYtLjYgMy4yIDUuNy44LS40IDEuNS01LjYtLjhjLS40IDEuMy0uNiAyLjctMS4xIDMuOS0uNSAxLjQtMSAyLjgtMS42IDQuMS0uOCAxLjctMi4yIDIuOS00LjEgMy4yLTEuMS4yLTIuMy4xLTMuMi0uNi0uMy0uMi0uNi0uNi0uNi0uOSAwLS40LjItLjkuNS0xLjEuMi0uMS43IDAgMSAuMS4zLjMuNi43LjggMS4xLjYuOCAxLjQuOSAyLjIuMy45LS44IDEuNC0xLjkgMS43LTMgLjYtMi40IDEuMi00LjcgMS43LTcuMXYtLjRsLTUuMy0uOC4yLTEuNSA1LjUuOC43LTMuMS01LjctLjkuMi0xLjYgNS45LjhjLjItLjYuMy0xLjEuNS0xLjYuNS0xLjggMS0zLjYgMi4yLTUuMnMyLjYtMi42IDQuNy0yLjVjLjkgMCAxLjguMyAyLjQgMSAuMS4xLjMuMy4zLjUgMCAuNCAwIC45LS4zIDEuMi0uNC4zLS45LjItMS4zLS4yLS4zLS4zLS41LS42LS44LS45LS42LS44LTEuNS0uOS0yLjItLjItLjUuNS0xIDEuMi0xLjMgMS45LS43IDIuMS0xLjIgNC4zLTEuOSA2LjVsNS41LjgtLjQgMS41eiIgZmlsbD0iI2ZmZiIvPjxnIGNsaXAtcGF0aD0idXJsKCNjKSI+PHBhdGggZD0iTTMwIDI3LjA2OFYyM2wtMyA1LjYwMnoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzAgMzAuNTk5di0zLjUzMmwtMyAxLjUzNXptMC0zLjUzMiAyLjk5OCAxLjUzNUwzMCAyM3oiIGZpbGw9IiNEOERDRjIiLz48cGF0aCBkPSJNMjkuOTk5IDI3LjA2OHYzLjUzbDMtMS45OTZ6IiBmaWxsPSIjOUNBM0U2Ii8+PHBhdGggZD0ibTMwIDMxLjIzOC0zLTEuOTk0IDMgNC43NTh6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0ibTMzIDI5LjI0NC0zLjAwMSAxLjk5NHYyLjc2NHoiIGZpbGw9IiNEOERDRjIiLz48L2c+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0iYSI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGg0MHY0MEgweiIvPjwvY2xpcFBhdGg+PGNsaXBQYXRoIGlkPSJjIj48cmVjdCB4PSIyNyIgeT0iMjMiIHdpZHRoPSI2IiBoZWlnaHQ9IjExIiByeD0iMyIgZmlsbD0iI2ZmZiIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg==',
  314_159:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxtYXNrIGlkPSJiIiBzdHlsZT0ibWFzay10eXBlOmx1bWluYW5jZSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0iI2ZmZiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2IpIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIwIDQwQzkgNDAgMCAzMSAwIDE5LjkuMSA4LjkgOS0uMSAyMC4xIDAgMzEuMS4xIDQwIDkgNDAgMjAuMiAzOS45IDMxLjEgMzEgNDAgMjAgNDAiIGZpbGw9IiMwMDNBNjYiLz48L2c+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0yMS45IDE3LjYtLjYgMy4yIDUuNy44LS40IDEuNS01LjYtLjhjLS40IDEuMy0uNiAyLjctMS4xIDMuOS0uNSAxLjQtMSAyLjgtMS42IDQuMS0uOCAxLjctMi4yIDIuOS00LjEgMy4yLTEuMS4yLTIuMy4xLTMuMi0uNi0uMy0uMi0uNi0uNi0uNi0uOSAwLS40LjItLjkuNS0xLjEuMi0uMS43IDAgMSAuMS4zLjMuNi43LjggMS4xLjYuOCAxLjQuOSAyLjIuMy45LS44IDEuNC0xLjkgMS43LTMgLjYtMi40IDEuMi00LjcgMS43LTcuMXYtLjRsLTUuMy0uOC4yLTEuNSA1LjUuOC43LTMuMS01LjctLjkuMi0xLjYgNS45LjhjLjItLjYuMy0xLjEuNS0xLjYuNS0xLjggMS0zLjYgMi4yLTUuMnMyLjYtMi42IDQuNy0yLjVjLjkgMCAxLjguMyAyLjQgMSAuMS4xLjMuMy4zLjUgMCAuNCAwIC45LS4zIDEuMi0uNC4zLS45LjItMS4zLS4yLS4zLS4zLS41LS42LS44LS45LS42LS44LTEuNS0uOS0yLjItLjItLjUuNS0xIDEuMi0xLjMgMS45LS43IDIuMS0xLjIgNC4zLTEuOSA2LjVsNS41LjgtLjQgMS41eiIgZmlsbD0iI2ZmZiIvPjxnIGNsaXAtcGF0aD0idXJsKCNjKSI+PHBhdGggZD0iTTMwIDI3LjA2OFYyM2wtMyA1LjYwMnoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzAgMzAuNTk5di0zLjUzMmwtMyAxLjUzNXptMC0zLjUzMiAyLjk5OCAxLjUzNUwzMCAyM3oiIGZpbGw9IiNEOERDRjIiLz48cGF0aCBkPSJNMjkuOTk5IDI3LjA2OHYzLjUzbDMtMS45OTZ6IiBmaWxsPSIjOUNBM0U2Ii8+PHBhdGggZD0ibTMwIDMxLjIzOC0zLTEuOTk0IDMgNC43NTh6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0ibTMzIDI5LjI0NC0zLjAwMSAxLjk5NHYyLjc2NHoiIGZpbGw9IiNEOERDRjIiLz48L2c+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0iYSI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGg0MHY0MEgweiIvPjwvY2xpcFBhdGg+PGNsaXBQYXRoIGlkPSJjIj48cmVjdCB4PSIyNyIgeT0iMjMiIHdpZHRoPSI2IiBoZWlnaHQ9IjExIiByeD0iMyIgZmlsbD0iI2ZmZiIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg==',
  f: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxtYXNrIGlkPSJiIiBzdHlsZT0ibWFzay10eXBlOmx1bWluYW5jZSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0iI2ZmZiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2IpIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIwIDQwQzkgNDAgMCAzMSAwIDE5LjkuMSA4LjkgOS0uMSAyMC4xIDAgMzEuMS4xIDQwIDkgNDAgMjAuMiAzOS45IDMxLjEgMzEgNDAgMjAgNDAiIGZpbGw9IiMwMDkwRkYiLz48L2c+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0yMS45IDE3LjYtLjYgMy4yIDUuNy44LS40IDEuNS01LjYtLjhjLS40IDEuMy0uNiAyLjctMS4xIDMuOS0uNSAxLjQtMSAyLjgtMS42IDQuMS0uOCAxLjctMi4yIDIuOS00LjEgMy4yLTEuMS4yLTIuMy4xLTMuMi0uNi0uMy0uMi0uNi0uNi0uNi0uOSAwLS40LjItLjkuNS0xLjEuMi0uMS43IDAgMSAuMS4zLjMuNi43LjggMS4xLjYuOCAxLjQuOSAyLjIuMy45LS44IDEuNC0xLjkgMS43LTMgLjYtMi40IDEuMi00LjcgMS43LTcuMXYtLjRsLTUuMy0uOC4yLTEuNSA1LjUuOC43LTMuMS01LjctLjkuMi0xLjYgNS45LjhjLjItLjYuMy0xLjEuNS0xLjYuNS0xLjggMS0zLjYgMi4yLTUuMnMyLjYtMi42IDQuNy0yLjVjLjkgMCAxLjguMyAyLjQgMSAuMS4xLjMuMy4zLjUgMCAuNCAwIC45LS4zIDEuMi0uNC4zLS45LjItMS4zLS4yLS4zLS4zLS41LS42LS44LS45LS42LS44LTEuNS0uOS0yLjItLjItLjUuNS0xIDEuMi0xLjMgMS45LS43IDIuMS0xLjIgNC4zLTEuOSA2LjVsNS41LjgtLjQgMS41eiIgZmlsbD0iI2ZmZiIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImEiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDBoNDB2NDBIMHoiLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4=',
  t: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxtYXNrIGlkPSJiIiBzdHlsZT0ibWFzay10eXBlOmx1bWluYW5jZSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0iI2ZmZiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2IpIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIwIDQwQzkgNDAgMCAzMSAwIDE5LjkuMSA4LjkgOS0uMSAyMC4xIDAgMzEuMS4xIDQwIDkgNDAgMjAuMiAzOS45IDMxLjEgMzEgNDAgMjAgNDAiIGZpbGw9IiMwMDNBNjYiLz48L2c+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0yMS45IDE3LjYtLjYgMy4yIDUuNy44LS40IDEuNS01LjYtLjhjLS40IDEuMy0uNiAyLjctMS4xIDMuOS0uNSAxLjQtMSAyLjgtMS42IDQuMS0uOCAxLjctMi4yIDIuOS00LjEgMy4yLTEuMS4yLTIuMy4xLTMuMi0uNi0uMy0uMi0uNi0uNi0uNi0uOSAwLS40LjItLjkuNS0xLjEuMi0uMS43IDAgMSAuMS4zLjMuNi43LjggMS4xLjYuOCAxLjQuOSAyLjIuMy45LS44IDEuNC0xLjkgMS43LTMgLjYtMi40IDEuMi00LjcgMS43LTcuMXYtLjRsLTUuMy0uOC4yLTEuNSA1LjUuOC43LTMuMS01LjctLjkuMi0xLjYgNS45LjhjLjItLjYuMy0xLjEuNS0xLjYuNS0xLjggMS0zLjYgMi4yLTUuMnMyLjYtMi42IDQuNy0yLjVjLjkgMCAxLjguMyAyLjQgMSAuMS4xLjMuMy4zLjUgMCAuNCAwIC45LS4zIDEuMi0uNC4zLS45LjItMS4zLS4yLS4zLS4zLS41LS42LS44LS45LS42LS44LTEuNS0uOS0yLjItLjItLjUuNS0xIDEuMi0xLjMgMS45LS43IDIuMS0xLjIgNC4zLTEuOSA2LjVsNS41LjgtLjQgMS41eiIgZmlsbD0iI2ZmZiIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImEiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDBoNDB2NDBIMHoiLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4=',
}
