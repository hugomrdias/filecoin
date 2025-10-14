import {
  calculate as calculatePieceCID,
  type PieceCID,
} from '@filoz/synapse-sdk/piece'
import { HttpError, request } from 'iso-web/http'
import { CID } from 'multiformats/cid'
import type { Account, Address, Chain, Client, Transport } from 'viem'
import { decodePDPError } from '../utils/decode-pdp-errors.js'
import {
  type MetadataObject,
  pieceMetadataObjectToEntry,
} from '../utils/metadata.ts'
import { createPieceUrl } from '../utils.js'
import { signAddPieces } from './warm-storage/signatures.ts'

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
    if (response.error instanceof HttpError) {
      throw new Error(decodePDPError(await response.error.response.text()))
    }
    throw response.error
  }
  const data = response.result
  return CID.parse(data.pieceCid) as PieceCID
}

export type AddPiecesOptions = {
  endpoint: string
  dataSetId: bigint
  clientDataSetId: bigint
  nextPieceId: bigint
  pieces: { pieceCid: PieceCID; metadata: MetadataObject }[]
}

export async function addPieces(
  client: Client<Transport, Chain, Account>,
  options: AddPiecesOptions
) {
  const { endpoint, dataSetId, pieces } = options
  const response = await fetch(
    new URL(`pdp/data-sets/${dataSetId}/pieces`, endpoint),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pieces: pieces.map((piece) => ({
          pieceCid: piece.pieceCid.toString(),
          subPieces: [{ subPieceCid: piece.pieceCid.toString() }],
        })),
        extraData: await signAddPieces(client, {
          clientDataSetId: options.clientDataSetId,
          nextPieceId: options.nextPieceId,
          pieces: pieces.map((piece) => ({
            pieceCid: piece.pieceCid,
            metadata: pieceMetadataObjectToEntry(piece.metadata),
          })),
        }),
      }),
    }
  )
  if (response.status !== 201) {
    const errorText = await response.text()
    throw new Error(
      `Failed to add pieces to data set: ${dataSetId}\n${decodePDPError(errorText)}`
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
  pieceUrl: string
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
