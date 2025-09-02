import {
  type StorageCreationCallbacks,
  Synapse,
  type UploadCallbacks,
  type UploadResult,
} from '@filoz/synapse-sdk'
import { asCommP } from '@filoz/synapse-sdk/commp'
import {
  type MutateOptions,
  skipToken,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { waitForTransactionReceipt } from '@wagmi/core'
import { request } from 'iso-web/http'
import { toHex } from 'multiformats/bytes'
import type { Address } from 'viem'

import {
  type UseReadContractParameters,
  useAccount,
  useChainId,
  useConfig,
} from 'wagmi'
import * as payments from '../actions/payments.js'
import * as actions from '../actions/warm-storage.js'
import { getChain } from '../chains.js'
import {
  readWarmStorageGetAllApprovedProviders,
  readWarmStorageGetProviderIdByAddress,
  readWarmStorageGetServicePrice,
} from '../gen.js'
import { useEthersSigner } from '../utils.js'

type AllowanceProps = {
  address?: Address
  /**
   * The address of the ERC20 token to query.
   * If not provided, the USDFC token address will be used.
   * @default chain.contracts.usdfc.address
   */
  token?: Address
  withCDN?: boolean
  sizeInBytes: bigint
  lockupDays: bigint
  /**
   * The query options.
   */
  query?: Omit<UseReadContractParameters['query'], 'enabled' | 'scopeKey'>
}

export type AllowanceResult = ReturnType<
  typeof actions.calculateAllowanceNeeded
>

/**
 * Get the allowance of the payments contract including the lockup and rate.
 *
 * @param props - The props for the allowance.
 * @param props.address - The address of the account to get the balance for.
 * @param props.token - The address of the ERC20 token to query.
 * @param props.watch - Whether to watch blocks.
 * @param props.query - The query options.
 * @returns The balance of the payments contract.
 */
export function useAllowance(props?: AllowanceProps) {
  const config = useConfig()
  const chainId = useChainId({ config })
  const chain = getChain(chainId)
  const token = props?.token ?? chain.contracts.usdfc.address
  // const scopeKey = `synapse-payments-balance-${token}-${props?.address}`
  const address = props?.address

  return useQuery({
    queryKey: [
      'useAllowance',
      address,
      props?.sizeInBytes.toString(),
      props?.lockupDays.toString(),
      props?.withCDN,
      props?.token,
    ],
    staleTime: 0,
    queryFn: address
      ? async () => {
          const allowance = await payments.operatorApproval({
            config,
            address,
            token,
          })

          const prices = await readWarmStorageGetServicePrice(config, {})

          const costs = actions.calculateStorageCosts(props.sizeInBytes, prices)

          return actions.calculateAllowanceNeeded(
            props.withCDN ? costs.withCDN : costs.withoutCDN,
            props.lockupDays,
            allowance
          )
        }
      : skipToken,
  })
}

type DataSetsProps = {
  address?: Address
  withCDN?: boolean
  /**
   * The query options.
   */
  query?: Omit<UseReadContractParameters['query'], 'enabled' | 'scopeKey'>
}

export type DataSetsResult = Awaited<
  ReturnType<typeof actions.getClientProofSetsWithDetails>
>

/**
 * Get the allowance of the payments contract including the lockup and rate.
 *
 * @param props - The props for the allowance.
 * @param props.address - The address of the account to get the balance for.
 * @param props.token - The address of the ERC20 token to query.
 * @param props.watch - Whether to watch blocks.
 * @param props.query - The query options.
 * @returns The balance of the payments contract.
 */
export function useDataSets(props?: DataSetsProps) {
  const config = useConfig()
  const address = props?.address

  return useQuery({
    queryKey: ['useDataSets', address, props?.withCDN],
    queryFn: address
      ? async () => {
          const dataSets = await actions.getClientProofSetsWithDetails({
            config,
            address,
          })

          const filtered = dataSets.filter(
            (dataSet) => dataSet.withCDN === props?.withCDN
          )

          const mostUtilizedDataset = filtered.reduce((max, dataset) => {
            return dataset.currentRootCount > max.currentRootCount
              ? dataset
              : max
          }, filtered[0])

          let providerId: bigint | undefined
          if (mostUtilizedDataset) {
            providerId = await readWarmStorageGetProviderIdByAddress(config, {
              args: [mostUtilizedDataset.payee],
            })
          }

          return {
            providerId,
            mostUtilizedDataset,
            filtered,
          }
        }
      : skipToken,
  })
}

type StorageUploadProps =
  | {
      withCDN?: boolean
      providerId?: bigint
      onRootAdded?: (txHash: `0x${string}`) => void
      onRootConfirmed?: (
        data: Awaited<ReturnType<typeof actions.getRootAdditionStatus>>
      ) => void
      /**
       * The mutation options.
       */
      mutation?: Omit<
        MutateOptions<unknown, Error, { file: File }>,
        'mutationFn'
      >
      creationCallbacks?: StorageCreationCallbacks
      uploadCallbacks?: UploadCallbacks
    }
  | undefined

/**
 * Deposit ERC20 tokens into the payments contract.
 *
 * @param props - The props for the deposit.
 * @param props.from - The address of the account to deposit from.
 * @param props.token - The address of the ERC20 token to deposit.
 * @param props.mutation - The mutation options.
 * @param props.onHash - The callback to call when the hash is available.
 * @returns The deposit mutation.
 */
export function useStorageUpload(props?: StorageUploadProps) {
  const signer = useEthersSigner()
  const config = useConfig()
  const account = useAccount()
  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      if (!signer) {
        throw new Error('No signer found')
      }
      if (!account.address) {
        throw new Error('No account found')
      }

      const synapse = await Synapse.create({
        signer,
        disableNonceManager: false,
        withCDN: props?.withCDN,
      })

      const storage = await synapse.createStorage({
        providerId: props?.providerId ? Number(props?.providerId) : undefined,
        withCDN: props?.withCDN,
        callbacks: {
          ...props?.creationCallbacks,
        },
      })
      const arrayBuffer = await file.arrayBuffer()
      const upload = await storage.upload(arrayBuffer, {
        ...props?.uploadCallbacks,
      })

      const _upload = upload as UploadResult & {
        proofSetId: number
        pdpUrl: string
      }

      const rootsInfo = await actions.getAddRootsInfo(
        config,
        BigInt(_upload.proofSetId)
      )

      const addRoots = await actions.addRoots({
        config,
        account: account.address,
        proofSetId: BigInt(_upload.proofSetId),
        clientDataSetId: rootsInfo.clientDataSetId,
        nextRootId: rootsInfo.nextRootId,
        rootDataArray: [
          {
            cid: _upload.commp,
            rawSize: _upload.size,
          },
        ],
        pdpUrl: _upload.pdpUrl,
      })
      props?.onRootAdded?.(addRoots.txHash)

      if (addRoots.txHash) {
        await waitForTransactionReceipt(config, {
          hash: addRoots.txHash,
        })

        const status = await actions.getRootAdditionStatus(
          _upload.proofSetId,
          addRoots.txHash,
          _upload.pdpUrl
        )
        props?.onRootConfirmed?.(status)
      }

      return upload
    },
    ...props?.mutation,
  })
}

type DataSetsDownloadProps = {
  address?: Address
  /**
   * The query options.
   */
  query?: Omit<UseReadContractParameters['query'], 'enabled' | 'scopeKey'>
}

export type DataSetsDownloadResult = Awaited<
  ReturnType<typeof actions.getClientProofSetsWithDetails>
>

/**
 * Get the allowance of the payments contract including the lockup and rate.
 *
 * @param props - The props for the allowance.
 * @param props.address - The address of the account to get the balance for.
 * @param props.token - The address of the ERC20 token to query.
 * @param props.watch - Whether to watch blocks.
 * @param props.query - The query options.
 * @returns The balance of the payments contract.
 */
export function useDataSetsDownload(props?: DataSetsDownloadProps) {
  const config = useConfig()
  const address = props?.address
  const chainId = useChainId({ config })

  return useQuery({
    queryKey: ['useDataSetsDownload', address],
    queryFn: address
      ? async () => {
          const dataSets = await actions.getClientProofSetsWithDetails({
            config,
            address,
          })
          const providers = await readWarmStorageGetAllApprovedProviders(
            config,
            {}
          )

          const providerUrlMap = new Map(
            providers.map((provider) => [provider.owner, provider.pdpUrl])
          )

          const data = await Promise.all(
            dataSets.map(async (dataSet) => {
              const pdpUrl = providerUrlMap.get(dataSet.payee)
              const endpoint = new URL(
                `pdp/proof-sets/${dataSet.pdpVerifierProofSetId}`,
                pdpUrl
              )
              const dataSetDetails = await request.json<{
                id: number
                nextChallengeEpoch: number
                roots: {
                  rootCid: string
                  rootId: number
                  subrootCid: string
                  subrootOffset: number
                }[]
              }>(endpoint.toString())
              if (dataSetDetails.error) {
                throw dataSetDetails.error
              }

              const provider = providers.find((p) => p.owner === dataSet.payee)
              if (!provider) {
                throw new Error('Provider not found')
              }

              const rootsWithUrl = await Promise.all(
                dataSetDetails.result.roots.map(async (root) => {
                  const pieceUrl = await findPieceUrl(
                    root.rootCid,
                    dataSet.withCDN,
                    address,
                    chainId,
                    provider
                  )
                  return {
                    ...root,
                    pieceUrl,
                  }
                })
              )

              return {
                provider,
                dataSet,
                pdpUrl,
                details: {
                  ...dataSetDetails.result,
                  roots: rootsWithUrl,
                },
              }
            })
          )

          return {
            dataSets,
            data,
          }
        }
      : skipToken,
  })
}

type Provider = {
  owner: `0x${string}`
  pdpUrl: string
  pieceRetrievalUrl: string
  registeredAt: bigint
  approvedAt: bigint
}
type DownloadProps =
  | {
      address?: Address
      /**
       * The mutation options.
       */
      mutation?: Omit<
        MutateOptions<
          unknown,
          Error,
          { cid: string; cdn: boolean; provider?: Provider }
        >,
        'mutationFn'
      >
    }
  | undefined

/**
 * Download a file from the warm storage.
 *
 * @param props - The props for the deposit.
 * @param props.mutation - The mutation options.
 * @returns The download mutation.
 */
export function useDownload(props?: DownloadProps) {
  const config = useConfig()
  const chainId = useChainId({ config })
  const chain = getChain(chainId)
  return useMutation({
    mutationFn: async ({
      cid,
      cdn,
      provider,
    }: {
      cid: string
      cdn: boolean
      provider?: Provider
    }) => {
      if (!provider) {
        throw new Error('Provider is required')
      }
      if (cdn) {
        const endpoint =
          chain.id === 314
            ? `https://${props?.address}.filcdn.io`
            : `https://${props?.address}.calibration.filcdn.io`

        const url = new URL(`/${cid}`, endpoint)
        // const rsp = await request.get(url.toString())

        return url.toString()
      } else {
        if (!props?.address) {
          throw new Error('Address is required')
        }
        const rsp = await request.get(createFindPieceUrl(cid, provider.pdpUrl))
        if (rsp.error) {
          throw rsp.error
        }
        // console.log(rsp.result, createPieceUrl(cid, provider.pieceRetrievalUrl))
        return createPieceUrl(cid, provider.pieceRetrievalUrl)
      }
    },
    ...props?.mutation,
  })
}

async function findPieceUrl(
  cid: string,
  cdn: boolean,
  address: Address,
  chainId: number,
  provider: Provider
) {
  if (cdn) {
    const endpoint =
      chainId === 314
        ? `https://${address}.filcdn.io`
        : `https://${address}.calibration.filcdn.io`

    const url = new URL(`/${cid}`, endpoint)
    // const rsp = await request.get(url.toString())

    return url.toString()
  } else {
    const rsp = await request.get(createFindPieceUrl(cid, provider.pdpUrl))
    if (rsp.error) {
      throw rsp.error
    }
    // console.log(rsp.result, createPieceUrl(cid, provider.pieceRetrievalUrl))
    return createPieceUrl(cid, provider.pieceRetrievalUrl)
  }
}

function createFindPieceUrl(cid: string, pdpUrl: string) {
  const commp = asCommP(cid)
  if (!commp) {
    throw new Error('Invalid CID')
  }
  const hash = toHex(commp.multihash.digest)
  const endpoint = pdpUrl
  const params = new URLSearchParams({
    name: 'sha2-256-trunc254-padded',
    hash,
    size: '0',
  })
  const url = `${endpoint}/pdp/piece?${params.toString()}`
  return url
}

function createPieceUrl(cid: string, pdpUrl: string) {
  const endpoint = pdpUrl
  const url = `${endpoint}/piece/${cid}`
  return url
}
