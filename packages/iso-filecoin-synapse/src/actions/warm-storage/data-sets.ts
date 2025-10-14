import type { AbiParametersToPrimitiveTypes, ExtractAbiFunction } from 'abitype'
import { HttpError, request } from 'iso-web/http'
import {
  type Account,
  type Address,
  type Chain,
  type Client,
  isAddressEqual,
  type Transport,
} from 'viem'
import { multicall, readContract } from 'viem/actions'
import { getChain } from '../../chains.js'
import type { filecoinWarmStorageServiceStateViewAbi } from '../../gen.js'
import { decodePDPError } from '../../utils/decode-pdp-errors.js'
import {
  datasetMetadataObjectToEntry,
  type MetadataObject,
  metadataArrayToObject,
} from '../../utils/metadata.ts'
import type { PDPProvider } from './providers.js'
import { signCreateDataSet } from './signatures.js'

/**
 * ABI function to get the client data sets
 */
export type getClientDataSetsType = ExtractAbiFunction<
  typeof filecoinWarmStorageServiceStateViewAbi,
  'getClientDataSets'
>

/**
 * ABI Client data set
 */
export type ClientDataSet = AbiParametersToPrimitiveTypes<
  getClientDataSetsType['outputs']
>[0][0]

/**
 * Data set type
 */
export interface DataSet extends ClientDataSet {
  pdpDatasetId: bigint
  live: boolean
  managed: boolean
  cdn: boolean
  metadata: MetadataObject
}

export interface GetDataSetsOptions {
  address: Address
}

/**
 * Get all data sets for a client
 *
 * @param client
 * @param options
 */
export async function getDataSets(
  client: Client<Transport, Chain>,
  options: GetDataSetsOptions
): Promise<DataSet[]> {
  const chain = getChain(client.chain.id)
  const address = options.address
  const data = await readContract(client, {
    address: chain.contracts.storageView.address,
    abi: chain.contracts.storageView.abi,
    functionName: 'getClientDataSets',
    args: [address],
  })

  const promises = data.map(async (dataSet) => {
    const pdpDatasetId = await readContract(client, {
      address: chain.contracts.storageView.address,
      abi: chain.contracts.storageView.abi,
      functionName: 'railToDataSet',
      args: [dataSet.pdpRailId],
    })

    // const metadata = await getDataSetMetadata(client, pdpDatasetId)

    const [live, listener, metadata] = await multicall(client, {
      allowFailure: false,
      contracts: [
        {
          abi: chain.contracts.pdp.abi,
          address: chain.contracts.pdp.address,
          functionName: 'dataSetLive',
          args: [pdpDatasetId],
        },
        {
          abi: chain.contracts.pdp.abi,
          address: chain.contracts.pdp.address,
          functionName: 'getDataSetListener',
          args: [pdpDatasetId],
        },
        {
          address: chain.contracts.storageView.address,
          abi: chain.contracts.storageView.abi,
          functionName: 'getAllDataSetMetadata',
          args: [pdpDatasetId],
        },
      ],
    })

    return {
      ...dataSet,
      pdpDatasetId,
      live,
      managed: isAddressEqual(listener, chain.contracts.storage.address),
      cdn: dataSet.cdnRailId !== 0n,
      metadata: metadataArrayToObject(metadata),
    }
  })
  const proofs = await Promise.all(promises)

  return proofs
}

/**
 * Get the metadata for a data set
 *
 * @param client
 * @param dataSetId
 * @returns
 */
export async function getDataSetMetadata(
  client: Client<Transport, Chain>,
  dataSetId: bigint
) {
  const chain = getChain(client.chain.id)
  const metadata = await readContract(client, {
    address: chain.contracts.storageView.address,
    abi: chain.contracts.storageView.abi,
    functionName: 'getAllDataSetMetadata',
    args: [dataSetId],
  })
  return metadataArrayToObject(metadata)
}

export type CreateDataSetOptions = {
  /**
   * PDP Provider
   */
  provider: PDPProvider
  cdn: boolean
  publicClient?: Client<Transport, Chain>
  metadata?: MetadataObject
}

export async function createDataSet(
  client: Client<Transport, Chain, Account>,
  options: CreateDataSetOptions
) {
  const chain = getChain(client.chain.id)
  const endpoint = options.provider.pdp.serviceURL

  // Get the next client data set id
  const nextClientDataSetId = await readContract(client, {
    address: chain.contracts.storageView.address,
    abi: chain.contracts.storageView.abi,
    functionName: 'clientDataSetIDs',
    args: [client.account.address],
  })

  // Sign and encode the create data set message
  const extraData = await signCreateDataSet(client, {
    clientDataSetId: nextClientDataSetId,
    payee: options.provider.payee,
    metadata: datasetMetadataObjectToEntry(options.metadata, {
      cdn: options.cdn,
    }),
  })

  // Send the create data set message to the PDP
  const response = await request.post(new URL(`pdp/data-sets`, endpoint), {
    body: JSON.stringify({
      recordKeeper: chain.contracts.storage.address,
      extraData,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 180000,
  })

  if (response.error) {
    if (response.error instanceof HttpError) {
      throw new Error(decodePDPError(await response.error.response.text()))
    }
    throw response.error
  }
  const location = response.result.headers.get('Location') ?? ''
  const hash = location.split('/').pop()
  if (!hash) {
    throw new Error(`Invalid Location header format: ${location}`)
  }

  return {
    hash: hash as `0x${string}`,
    statusUrl: new URL(location, endpoint).toString(),
  }
}

export type WaitForDataSetCreatedOptions = {
  statusUrl: string
}
export type DataSetCreatedResponse =
  | {
      createMessageHash: `0x${string}`
      dataSetCreated: false
      service: string
      txStatus: 'pending' | 'confirmed' | 'rejected'
      ok: boolean
    }
  | {
      createMessageHash: `0x${string}`
      dataSetCreated: true
      service: string
      txStatus: 'pending' | 'confirmed' | 'rejected'
      ok: boolean
      dataSetId: number
    }

export async function waitForDataSetCreated(
  options: WaitForDataSetCreatedOptions
) {
  const response = await request.json.get<DataSetCreatedResponse>(
    options.statusUrl,
    {
      async onResponse(response) {
        if (response.ok) {
          const data: DataSetCreatedResponse = await response.clone().json()
          if (data.dataSetCreated) {
            return response
          }
          throw new Error('Not created yet')
        }
      },
      retry: {
        shouldRetry: (ctx) => ctx.error.message === 'Not created yet',
        retries: Infinity,
        factor: 1,
        minTimeout: 4000,
      },

      timeout: 180000,
    }
  )
  if (response.error) {
    if ('response' in response.error) {
      const msg = await response.error.response.text()
      throw new Error(`Failed to wait for data set created - ${msg}`)
    }
    throw response.error
  }

  return response.result
}
