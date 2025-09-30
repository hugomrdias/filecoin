import {
  skipToken,
  type UseQueryOptions,
  useQuery,
} from '@tanstack/react-query'
import type { Address } from 'viem'
import { useChainId, useConfig } from 'wagmi'
import { pdp } from '../../actions/index.js'
import type { Piece } from '../../actions/pdp.js'
import {
  type DataSet,
  getDataSets,
  readProviders,
} from '../../actions/warm-storage/index.js'

export interface UseDataSetsProps {
  address?: Address
  query?: Omit<
    UseQueryOptions<DataSet & { pieces: Piece[] }[]>,
    'queryKey' | 'queryFn'
  >
}
export function useDataSets(props: UseDataSetsProps) {
  const config = useConfig()
  const chainId = useChainId()
  const address = props.address
  return useQuery({
    queryKey: ['synapse-warm-storage-data-sets', address],
    queryFn: address
      ? async () => {
          const dataSets = await getDataSets(config.getClient(), { address })
          const providers = await readProviders(config.getClient())

          const dataSetsWithPieces = await Promise.all(
            dataSets.map(async (dataSet) => {
              if (dataSet.nextPieceId === 0n) {
                return {
                  ...dataSet,
                  pieces: [],
                }
              }
              const pieces = await pdp.getPiecesForDataSet({
                pdpUrl:
                  providers.find((p) => p.providerId === dataSet.providerId)
                    ?.pdp.serviceURL || '',
                dataSetId: dataSet.pdpDatasetId,
                chainId: chainId,
                address: address,
                cdn: dataSet.cdn,
              })
              return {
                ...dataSet,
                pieces,
              }
            })
          )
          return dataSetsWithPieces
        }
      : skipToken,
  })
}
