import {
  type Account,
  type Address,
  type Chain,
  type Client,
  encodeAbiParameters,
  type Transport,
} from 'viem'
import { signTypedData } from 'viem/actions'
import { getChain } from '../../chains.js'
import { EIP712_TYPES } from '../../constants.js'
import type { Chain as FilecoinChain } from '../../types.js'

export type MetadataEntry = {
  key: string
  value: string
}

interface GetTypedDataDomainOptions {
  /**
   * The chain id to use.
   */
  chain: FilecoinChain
  /**
   * The verifying contract to use. If not provided, the default is the FilecoinWarmStorageService contract address.
   */
  verifyingContract?: Address
}

export function getTypedDataDomain(options: GetTypedDataDomainOptions) {
  return {
    name: 'FilecoinWarmStorageService',
    version: '1',
    chainId: options.chain.id,
    verifyingContract:
      options.verifyingContract ?? options.chain.contracts.storage.address,
  }
}

export type signDataSetOptions = {
  clientDataSetId: bigint
  payee: Address
  metadata: MetadataEntry[]
}

/**
 * Sign and abi encode the create data set message
 */
export async function signCreateDataSet(
  client: Client<Transport, Chain, Account>,
  options: signDataSetOptions
) {
  const chain = getChain(client.chain.id)
  const signature = await signTypedData(client, {
    account: client.account,
    domain: getTypedDataDomain({ chain }),
    types: {
      MetadataEntry: EIP712_TYPES.MetadataEntry,
      CreateDataSet: EIP712_TYPES.CreateDataSet,
    },
    primaryType: 'CreateDataSet',
    message: {
      clientDataSetId: options.clientDataSetId,
      payee: options.payee,
      metadata: options.metadata,
    },
  })

  const keys = options.metadata.map((item) => item.key)
  const values = options.metadata.map((item) => item.value)

  const extraData = encodeAbiParameters(
    [
      { type: 'address' },
      { type: 'string[]' },
      { type: 'string[]' },
      { type: 'bytes' },
    ],
    [client.account.address, keys, values, signature]
  )

  return extraData
}
