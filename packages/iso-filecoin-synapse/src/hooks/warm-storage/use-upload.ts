import {
  type MutateOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { waitForTransactionReceipt } from 'viem/actions'
import { useAccount, useChainId, useConfig } from 'wagmi'
import { getConnectorClient } from 'wagmi/actions'
import { upload, waitForUpload } from '../../actions/warm-storage/upload.ts'
import { getChain } from '../../chains.js'
import type { SessionKey } from '../../session-keys/secp256k1.js'

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
  files: File[]
  dataSetId: bigint
  sessionKey?: SessionKey
}
export function useUpload(props: UseUploadProps) {
  const config = useConfig()
  const chainId = useChainId({ config })
  const chain = getChain(chainId)
  const account = useAccount({ config })
  const queryClient = useQueryClient()
  const client = config.getClient()

  return useMutation({
    ...props?.mutation,
    mutationFn: async ({
      files,
      dataSetId,
      sessionKey,
    }: UseUploadVariables) => {
      let connectorClient = await getConnectorClient(config, {
        account: account.address,
        chainId,
      })
      if (
        sessionKey &&
        (await sessionKey.isExpired(connectorClient, 'AddPieces'))
      ) {
        const hash = await sessionKey.login(connectorClient)
        console.log('🚀 ~ Registering session key:', hash)
        const receipt1 = await waitForTransactionReceipt(client, {
          hash: hash,
        })
        console.log('🚀 ~ Registration transaction receipt:', receipt1)
        connectorClient = sessionKey.client(chain, client.transport)
      }

      const pieces = await upload(connectorClient, {
        dataSetId,
        data: files,
      })

      console.log('Waiting for transaction receipt...', {
        hash: pieces.txHash,
      })
      props?.onHash?.(pieces.txHash)
      const receipt = await waitForUpload({ statusUrl: pieces.statusUrl })
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
