import { request } from 'iso-web/http'
import type { Account, Chain, Client, Hex, Transport } from 'viem'
import { readContract } from 'viem/actions'
import { getChain } from '../../chains.js'
import { pdp } from '../index.ts'

export type UploadOptions = {
  dataSetId: bigint
  data: File[]
}

export async function upload(
  client: Client<Transport, Chain, Account>,
  options: UploadOptions
) {
  const chain = getChain(client.chain.id)

  const dataSet = await readContract(client, {
    address: chain.contracts.storageView.address,
    abi: chain.contracts.storageView.abi,
    functionName: 'getDataSet',
    args: [options.dataSetId],
  })

  const provider = await readContract(client, {
    address: chain.contracts.serviceProviderRegistry.address,
    abi: chain.contracts.serviceProviderRegistry.abi,
    functionName: 'getPDPService',
    args: [dataSet.providerId],
  })

  const uploadResponses = await Promise.all(
    options.data.map(async (data) => {
      const upload = await pdp.uploadPiece({
        data: await data.arrayBuffer(),
        endpoint: provider[0].serviceURL,
      })

      await pdp.findPiece({
        pieceCid: upload.pieceCid,
        endpoint: provider[0].serviceURL,
      })

      return {
        pieceCid: upload.pieceCid,
        metadata: { name: data.name, type: data.type },
      }
    })
  )

  const nextPieceId = await readContract(client, {
    address: chain.contracts.pdp.address,
    abi: chain.contracts.pdp.abi,
    functionName: 'getNextPieceId',
    args: [options.dataSetId],
  })

  const addPieces = await pdp.addPieces(client, {
    dataSetId: options.dataSetId,
    clientDataSetId: dataSet.clientDataSetId,
    nextPieceId: nextPieceId,
    pieces: uploadResponses,
    endpoint: provider[0].serviceURL,
  })

  return addPieces
}

export type AddPiecesResponse =
  | {
      addMessageOk: null
      dataSetId: number
      pieceCount: number
      piecesAdded: boolean
      txHash: Hex
      txStatus: 'pending' | 'confirmed' | 'rejected'
    }
  | {
      addMessageOk: true
      confirmedPieceIds: number[]
      dataSetId: number
      pieceCount: number
      piecesAdded: boolean
      txHash: Hex
      txStatus: 'pending' | 'confirmed' | 'rejected'
    }

export type WaitForUploadOptions = {
  statusUrl: string
}
export async function waitForUpload(options: WaitForUploadOptions) {
  const response = await request.json.get<AddPiecesResponse>(
    options.statusUrl,
    {
      async onResponse(response) {
        if (response.ok) {
          const data: AddPiecesResponse = await response.clone().json()

          if (data.piecesAdded) {
            return response
          }
          throw new Error('Not added yet')
        }
      },
      retry: {
        shouldRetry: (ctx) => ctx.error.message === 'Not added yet',
        retries: Infinity,
        factor: 1,
        minTimeout: 4000,
      },
      timeout: 1000 * 60 * 5,
    }
  )
  if (response.error) {
    if ('response' in response.error) {
      const msg = await response.error.response.text()
      throw new Error(`Failed to wait for upload - ${msg}`)
    }
    throw response.error
  }
  return response.result
}
