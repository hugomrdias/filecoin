import {
  type MutateOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { readContract, waitForTransactionReceipt } from 'viem/actions'
import { useAccount, useChainId, useConfig } from 'wagmi'
import { getConnectorClient } from 'wagmi/actions'
import { pdp } from '../../actions/index.js'
import { getChain } from '../../chains.js'

export interface UseUploadProps {
  /**
   * The callback to call when the hash is available.
   */
  onHash?: (hash: string) => void
  mutation?: Omit<
    MutateOptions<unknown, Error, UseUploadVariables>,
    'mutationFn'
  >
}

export interface UseUploadVariables {
  file: File
  dataSetId: bigint
}
export function useUpload(props: UseUploadProps) {
  const config = useConfig()
  const chainId = useChainId({ config })
  const chain = getChain(chainId)
  const account = useAccount({ config })
  const queryClient = useQueryClient()
  return useMutation({
    ...props?.mutation,
    mutationFn: async ({ file, dataSetId }: UseUploadVariables) => {
      const connectorClient = await getConnectorClient(config, {
        account: account.address,
        chainId,
      })

      const arrayBuffer = await file.arrayBuffer()

      const dataSet = await readContract(config.getClient(), {
        address: chain.contracts.storageView.address,
        abi: chain.contracts.storageView.abi,
        functionName: 'getDataSet',
        args: [dataSetId],
      })
      const provider = await readContract(config.getClient(), {
        address: chain.contracts.serviceProviderRegistry.address,
        abi: chain.contracts.serviceProviderRegistry.abi,
        functionName: 'getPDPService',
        args: [dataSet.providerId],
      })

      const upload = await pdp.uploadPiece({
        data: arrayBuffer,
        endpoint: provider[0].serviceURL,
      })

      await pdp.findPiece({
        pieceCid: upload.pieceCid,
        endpoint: provider[0].serviceURL,
      })

      const nextPieceId = await readContract(config.getClient(), {
        address: chain.contracts.pdp.address,
        abi: chain.contracts.pdp.abi,
        functionName: 'getNextPieceId',
        args: [dataSetId],
      })
      const addPieces = await pdp.addPieces(connectorClient, {
        dataSetId: dataSetId,
        clientDataSetId: dataSet.clientDataSetId,
        nextPieceId: nextPieceId,
        pieceCids: [upload.pieceCid],
        endpoint: provider[0].serviceURL,
      })

      // TODO: pull the status url from the addPieces response

      console.log('Waiting for transaction receipt...', {
        hash: addPieces.txHash,
      })
      props?.onHash?.(addPieces.txHash)
      const receipt = await waitForTransactionReceipt(config.getClient(), {
        hash: addPieces.txHash,
      })
      console.log('Transaction receipt received', {
        receipt,
      })

      queryClient.invalidateQueries({
        queryKey: ['synapse-warm-storage-data-sets', account.address],
      })
      queryClient.invalidateQueries({
        queryKey: ['synapse-warm-storage-providers'],
      })
      return upload
    },
  })
}
