import type { Hex } from 'ox/Hex'
import {
  type Chain,
  type Client,
  createTransport,
  createWalletClient,
  http,
  type Transport,
  type TransportConfig,
  type WalletClient,
} from 'viem'
import {
  type Account,
  generatePrivateKey,
  privateKeyToAccount,
} from 'viem/accounts'
import type { SessionKeyPermissions } from '../actions/eip712.js'
import { isExpired, login } from '../actions/session-key.js'

export interface Secp256k1SessionKeyProps {
  privateKey: Hex
  expiresAt: number | undefined
  permissions: SessionKeyPermissions[]
}

export interface Secp256k1SessionKeyCreateOptions {
  privateKey?: Hex
  /**
   * The expiration time of the session key in seconds.
   * @default Date.now() / 1000 + 1 hour
   */
  expiresAt?: number
  permissions?: SessionKeyPermissions[]
}

export class Secp256k1Key {
  private privateKey: Hex
  permissions: SessionKeyPermissions[]
  expiresAt: number | undefined
  type: 'secp256k1'
  account: Account

  constructor(props: Secp256k1SessionKeyProps) {
    this.privateKey = props.privateKey
    this.expiresAt = props.expiresAt
    this.type = 'secp256k1'
    this.permissions = props.permissions
    this.account = privateKeyToAccount(this.privateKey)
  }

  static create(options?: Secp256k1SessionKeyCreateOptions) {
    const key = options?.privateKey ?? generatePrivateKey()
    return new Secp256k1Key({
      privateKey: key,
      expiresAt: options?.expiresAt,
      permissions: options?.permissions ?? [
        'CreateDataSet',
        'AddPieces',
        'SchedulePieceRemovals',
        'DeleteDataSet',
      ],
    })
  }

  async login(client: Client<Transport, Chain, Account>) {
    const hash = await login(client, {
      sessionAddress: this.account.address,
      permissions: this.permissions,
      expiresAt: this.expiresAt ? BigInt(this.expiresAt) : undefined,
    })
    return hash
  }

  isExpired(
    client: Client<Transport, Chain, Account>,
    permission: SessionKeyPermissions
  ) {
    if (!this.permissions.includes(permission)) {
      throw new Error(
        `Permission ${permission} not included in the session key`
      )
    }
    return isExpired(client, {
      address: client.account.address,
      sessionAddress: this.account.address,
      permission: permission,
    })
  }

  client(
    chain: Chain,
    transportConfig?: TransportConfig
  ): WalletClient<Transport, Chain, Account> {
    return createWalletClient({
      chain,
      transport: transportConfig
        ? () => createTransport(transportConfig)
        : http(),
      account: this.account,
    })
  }
}

export interface SessionKey {
  login: (client: Client<Transport, Chain, Account>) => Promise<Hex>
  isExpired: (
    client: Client<Transport, Chain, Account>,
    permission: SessionKeyPermissions
  ) => Promise<boolean>
  client: (
    chain: Chain,
    transportConfig?: TransportConfig
  ) => WalletClient<Transport, Chain, Account>
}
