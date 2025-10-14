import {
  skipToken,
  type UseQueryOptions,
  useQuery,
} from '@tanstack/react-query'
import type { Address } from 'viem'
import { readContract } from 'viem/actions'
import { useChainId, useConfig } from 'wagmi'
import { pdp } from '../../actions/index.js'
import type { Piece } from '../../actions/pdp.js'
import {
  type DataSet,
  getDataSets,
  readProviders,
} from '../../actions/warm-storage/index.js'
import { getChain } from '../../chains.js'
import {
  type MetadataObject,
  metadataArrayToObject,
} from '../../utils/metadata.ts'
import { useProviders } from './use-providers.js'

export interface DataSetWithPieces extends DataSet {
  pieces: (Piece & { metadata: MetadataObject })[]
}
export type UseDataSetsResult = DataSetWithPieces[]
export interface UseDataSetsProps {
  address?: Address
  query?: Omit<UseQueryOptions<UseDataSetsResult>, 'queryKey' | 'queryFn'>
}

export function useDataSets(props: UseDataSetsProps) {
  const config = useConfig()
  const chainId = useChainId()
  const address = props.address
  const { data: providersPrefected } = useProviders()
  const chain = getChain(chainId)
  return useQuery({
    queryKey: ['synapse-warm-storage-data-sets', address],
    queryFn: address
      ? async () => {
          const providers =
            providersPrefected ?? (await readProviders(config.getClient()))

          const dataSets = await getDataSets(config.getClient(), { address })
          const dataSetsWithPieces = await Promise.all(
            dataSets.map(async (dataSet) => {
              const pieces = await pdp.getPiecesForDataSet({
                pdpUrl:
                  providers.find((p) => p.providerId === dataSet.providerId)
                    ?.pdp.serviceURL || '',
                dataSetId: dataSet.pdpDatasetId,
                chainId: chainId,
                address: address,
                cdn: dataSet.cdn,
              })

              const piecesWithMetadata = await Promise.all(
                pieces.map(async (piece) => {
                  const metadata = await readContract(config.getClient(), {
                    address: chain.contracts.storageView.address,
                    abi: chain.contracts.storageView.abi,
                    functionName: 'getAllPieceMetadata',
                    args: [dataSet.pdpDatasetId, BigInt(piece.pieceId)],
                  })
                  return {
                    ...piece,
                    metadata: metadataArrayToObject(metadata),
                  }
                })
              )

              return {
                ...dataSet,
                pieces: piecesWithMetadata,
              }
            })
          )
          return dataSetsWithPieces
        }
      : skipToken,
  })
}
