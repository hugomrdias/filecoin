import {
  calculate as calculatePieceCID,
  type PieceCID,
} from '@filoz/synapse-sdk/piece'
import { request } from 'iso-web/http'
import { CID } from 'multiformats/cid'
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
import { getChain } from '../chains.js'
import { createPieceUrl } from '../utils.js'

// EIP-712 Type definitions
const EIP712_TYPES = {
  MetadataEntry: [
    { name: 'key', type: 'string' },
    { name: 'value', type: 'string' },
  ],
  CreateDataSet: [
    { name: 'clientDataSetId', type: 'uint256' },
    { name: 'payee', type: 'address' },
    { name: 'metadata', type: 'MetadataEntry[]' },
  ],
  Cid: [{ name: 'data', type: 'bytes' }],
  PieceMetadata: [
    { name: 'pieceIndex', type: 'uint256' },
    { name: 'metadata', type: 'MetadataEntry[]' },
  ],
  AddPieces: [
    { name: 'clientDataSetId', type: 'uint256' },
    { name: 'firstAdded', type: 'uint256' },
    { name: 'pieceData', type: 'Cid[]' },
    { name: 'pieceMetadata', type: 'PieceMetadata[]' },
  ],
  SchedulePieceRemovals: [
    { name: 'clientDataSetId', type: 'uint256' },
    { name: 'pieceIds', type: 'uint256[]' },
  ],
  DeleteDataSet: [{ name: 'clientDataSetId', type: 'uint256' }],
}

export type MetadataEntry = {
  key: string
  value: string
}

export type UploadPieceOptions = {
  endpoint: string
  data: Uint8Array | ArrayBuffer
}

export async function uploadPiece(
  options: UploadPieceOptions
): Promise<{ pieceCid: PieceCID; size: number }> {
  const { data, endpoint } = options
  const uint8Data = data instanceof ArrayBuffer ? new Uint8Array(data) : data

  const pieceCid = calculatePieceCID(uint8Data)
  const size = uint8Data.length
  const requestBody = {
    pieceCid: pieceCid.toString(),
  }
  const createResponse = await fetch(new URL(`pdp/piece`, endpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
  if (createResponse.status === 200) {
    // Piece already exists on server
    return {
      pieceCid,
      size,
    }
  }
  if (createResponse.status !== 201) {
    const errorText = await createResponse.text()
    throw new Error(
      `Failed to create upload session: ${createResponse.status} ${createResponse.statusText} - ${errorText}`
    )
  }

  // Extract upload ID from Location header
  const location = createResponse.headers.get('Location') ?? ''
  const uploadUuid = location.split('/').pop()
  if (uploadUuid == null) {
    throw new Error(`Invalid Location header format: ${location}`)
  }
  const uploadResponse = await fetch(
    new URL(`pdp/piece/upload/${uploadUuid}`, endpoint),
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': uint8Data.length.toString(),
        // No Authorization header needed
      },
      body: uint8Data as BufferSource,
    }
  )
  if (uploadResponse.status !== 204) {
    const errorText = await uploadResponse.text()
    throw new Error(
      `Failed to upload piece: ${uploadResponse.status} ${uploadResponse.statusText} - ${errorText}`
    )
  }

  return {
    pieceCid,
    size,
  }
}

export type FindPieceOptions = {
  endpoint: string
  pieceCid: PieceCID
}

export async function findPiece(options: FindPieceOptions): Promise<PieceCID> {
  const { pieceCid, endpoint } = options
  const params = new URLSearchParams({ pieceCid: pieceCid.toString() })

  const response = await request.json.get<{ pieceCid: string }>(
    new URL(`pdp/piece?${params.toString()}`, endpoint),
    {
      onResponse(response) {
        if (!response.ok) {
          throw new Error(`Piece not found: ${pieceCid.toString()}`)
        }
      },
      retry: {
        retries: Infinity,
        factor: 1,
      },
      timeout: 180000,
    }
  )

  if (response.error) {
    throw response.error
  }
  const data = response.result
  return CID.parse(data.pieceCid) as PieceCID
}

export type SignAddPiecesOptions = {
  clientDataSetId: bigint
  nextPieceId: bigint
  pieceCids: PieceCID[]
}

export async function signAddPieces(
  client: Client<Transport, Chain, Account>,
  options: SignAddPiecesOptions
) {
  const chain = getChain(client.chain.id)
  const signature = await signTypedData(client, {
    account: client.account,
    domain: {
      name: 'FilecoinWarmStorageService',
      version: '1',
      chainId: client.chain.id,
      verifyingContract: chain.contracts.storage.address,
    },
    types: {
      AddPieces: EIP712_TYPES.AddPieces,
      Cid: EIP712_TYPES.Cid,
      PieceMetadata: EIP712_TYPES.PieceMetadata,
      MetadataEntry: EIP712_TYPES.MetadataEntry,
    },
    primaryType: 'AddPieces',
    message: {
      clientDataSetId: options.clientDataSetId,
      firstAdded: options.nextPieceId,
      pieceData: options.pieceCids.map((pieceCid) => {
        return {
          data: toHex(pieceCid.bytes),
        }
      }),
      pieceMetadata: options.pieceCids.map((_pieceCid, index) => ({
        pieceIndex: index,
        metadata: [],
      })),
    },
  })

  const me = [[]] as MetadataEntry[][]

  const keys = me.map((item) => item.map((item) => item.key))
  const values = me.map((item) => item.map((item) => item.value))

  const extraData = encodeAbiParameters(
    [{ type: 'bytes' }, { type: 'string[][]' }, { type: 'string[][]' }],
    [signature, keys, values]
  )
  return extraData
}

export type AddPiecesOptions = {
  endpoint: string
  dataSetId: bigint
  clientDataSetId: bigint
  nextPieceId: bigint
  pieceCids: PieceCID[]
}

export async function addPieces(
  client: Client<Transport, Chain, Account>,
  options: AddPiecesOptions
) {
  const { endpoint, dataSetId, pieceCids } = options
  const response = await fetch(
    new URL(`pdp/data-sets/${dataSetId}/pieces`, endpoint),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pieces: pieceCids.map((pieceCid) => ({
          pieceCid: pieceCid.toString(),
          subPieces: [{ subPieceCid: pieceCid.toString() }],
        })),
        extraData: await signAddPieces(client, options),
      }),
    }
  )
  if (response.status !== 201) {
    const errorText = await response.text()
    throw new Error(
      `Failed to add pieces to data set: ${dataSetId} ${errorText}`
    )
  }
  const location = response.headers.get('Location') ?? ''
  const txHash = location.split('/').pop()
  if (!txHash) {
    throw new Error(`Invalid Location header format: ${location}`)
  }
  const data = await response.text()
  return {
    message: data,
    txHash: txHash as `0x${string}`,
    statusUrl: new URL(location, endpoint).toString(),
  }
}

export type GetPiecesOptions = {
  pdpUrl: string
  dataSetId: bigint
  chainId: number
  address: Address
  cdn: boolean
}

export interface PDPDataSetResponse {
  id: number
  nextChallengeEpoch: number
  pieces: Piece[]
}

export interface Piece {
  pieceCid: string
  pieceId: number
  subPiecesCid: string
  subPiecesOffset: number
}
export async function getPiecesForDataSet(options: GetPiecesOptions) {
  const { pdpUrl: endpoint, dataSetId } = options

  const data = await request.json.get<PDPDataSetResponse>(
    new URL(`pdp/data-sets/${dataSetId}`, endpoint)
  )

  if (data.error) {
    return []
  }

  const pieces = data.result.pieces.map((piece) => ({
    pieceCid: piece.pieceCid,
    pieceId: piece.pieceId,
    pieceUrl: createPieceUrl(
      piece.pieceCid,
      options.cdn,
      options.address,
      options.chainId,
      endpoint
    ),
  }))

  return pieces
}
