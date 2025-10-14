import type { PieceCID } from '@filoz/synapse-sdk/piece'
import {
  type Account,
  type Address,
  type Chain,
  type Client,
  encodeAbiParameters,
  type Transport,
  toHex,
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
    types: EIP712_TYPES,
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

export type SignAddPiecesOptions = {
  clientDataSetId: bigint
  nextPieceId: bigint
  pieces: { pieceCid: PieceCID; metadata: MetadataEntry[] }[]
}

/**
 * Sign and abi encode the add pieces message
 *
 * @param client
 * @param options
 */
export async function signAddPieces(
  client: Client<Transport, Chain, Account>,
  options: SignAddPiecesOptions
) {
  const chain = getChain(client.chain.id)
  const signature = await signTypedData(client, {
    account: client.account,
    domain: getTypedDataDomain({ chain }),
    types: EIP712_TYPES,
    primaryType: 'AddPieces',
    message: {
      clientDataSetId: options.clientDataSetId,
      firstAdded: options.nextPieceId,
      pieceData: options.pieces.map((piece) => {
        return {
          data: toHex(piece.pieceCid.bytes),
        }
      }),
      pieceMetadata: options.pieces.map((piece, index) => ({
        pieceIndex: index,
        metadata: piece.metadata,
      })),
    },
  })

  const metadataKV = Array.from(
    options.pieces,
    (piece) => piece.metadata
  ) as MetadataEntry[][]

  const keys = metadataKV.map((item) => item.map((item) => item.key))
  const values = metadataKV.map((item) => item.map((item) => item.value))

  const extraData = encodeAbiParameters(
    [{ type: 'bytes' }, { type: 'string[][]' }, { type: 'string[][]' }],
    [signature, keys, values]
  )
  return extraData
}
