import type { CommP } from '@filoz/synapse-sdk'
import { asCommP, toPieceSize } from '@filoz/synapse-sdk/commp'
import { type Config, readContracts, signTypedData } from '@wagmi/core'
import { request } from 'iso-web/http'
import { type Address, encodeAbiParameters, isAddressEqual, toHex } from 'viem'
import { multicall } from 'viem/actions'
import { z } from 'zod/v4'
import { getChain } from '../chains.js'
import { SIZE_CONSTANTS, TIME_CONSTANTS } from '../constants.js'
import {
  readPdpVerifierGetNextRootId,
  readWarmStorageGetClientProofSets,
  type readWarmStorageGetServicePrice,
  readWarmStorageRailToProofSet,
} from '../gen.js'
import type { OperatorApprovalResult } from './payments.js'
/**
 * Get the proof sets for an address
 *
 * @param config - The wagmi config
 * @param address - The address of the client
 * @returns The proof sets for the address
 */
export async function getClientProofSets({
  config,
  address,
}: {
  config: Config
  address: Address
}) {
  const proofsSets = await readWarmStorageGetClientProofSets(config, {
    args: [address],
  })

  return proofsSets.filter(
    (data) =>
      data.payer !== '0x0000000000000000000000000000000000000000' &&
      Number(data.railId) !== 0
  )
}

/**
 * Get enhanced proof set information including chain details
 *
 * @param config - The wagmi config
 * @param address - The address of the client
 * @param onlyManaged - If true, only return proof sets managed by this Pandora contract (default: false)
 * @returns Array of proof set information with additional chain data and clear ID separation
 */
export async function getClientProofSetsWithDetails({
  config,
  address,
  onlyManaged = false,
}: {
  config: Config
  address: Address
  onlyManaged?: boolean
}) {
  const chainId = config.state.chainId
  const chain = getChain(chainId)
  const proofsSets = await getClientProofSets({ config, address })
  const proofsPromises = proofsSets.map(async (proofSet) => {
    // Get the actual PDPVerifier proof set ID from the rail ID
    try {
      const pdpVerifierProofSetId = await readWarmStorageRailToProofSet(
        config,
        {
          args: [proofSet.railId],
        }
      )

      if (pdpVerifierProofSetId === 0n) {
        // If railToProofSet returns 0, this rail doesn't exist in this Pandora contract
        return onlyManaged
          ? null // Will be filtered out
          : {
              ...proofSet,
              pdpVerifierProofSetId: 0,
              nextRootId: 0,
              currentRootCount: 0,
              isLive: false,
              isManaged: false,
            }
      }

      const [isLive, listenerResult] = await readContracts(config, {
        allowFailure: false,
        contracts: [
          {
            address: chain.contracts.pdp.address,
            abi: chain.contracts.pdp.abi,
            functionName: 'proofSetLive',
            args: [pdpVerifierProofSetId],
          },
          {
            address: chain.contracts.pdp.address,
            abi: chain.contracts.pdp.abi,
            functionName: 'getProofSetListener',
            args: [pdpVerifierProofSetId],
          },
        ],
      })

      const isManaged =
        listenerResult &&
        isAddressEqual(listenerResult, chain.contracts.pandora.address)

      if (onlyManaged && !isManaged) {
        // Skip unmanaged proof sets if onlyManaged is true
        return null // Will be filtered out
      }

      // Get next root ID only if the proof set is live

      const nextRootId = isLive
        ? await readPdpVerifierGetNextRootId(config, {
            args: [pdpVerifierProofSetId],
          })
        : 0n

      return {
        ...proofSet,
        pdpVerifierProofSetId,
        nextRootId,
        currentRootCount: nextRootId,
        isLive,
        isManaged,
      }
    } catch (error) {
      // Re-throw the error to let the caller handle it
      throw new Error(
        `Failed to get details for proof set with rail ID ${proofSet.railId}: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  })

  const proofsWithDetails = await Promise.all(proofsPromises)

  return proofsWithDetails.filter((proof) => proof !== null)
}

/**
 * Calculate the costs for a storage operation
 */
export function calculateStorageCosts(
  sizeInBytes: bigint,
  prices: Awaited<ReturnType<typeof readWarmStorageGetServicePrice>>
) {
  const {
    pricePerTiBPerMonthNoCDN,
    pricePerTiBPerMonthWithCDN,
    epochsPerMonth,
  } = prices
  // Calculate price per byte per epoch
  const pricePerEpochNoCDN =
    (pricePerTiBPerMonthNoCDN * sizeInBytes) /
    (SIZE_CONSTANTS.TiB * epochsPerMonth)
  const pricePerEpochWithCDN =
    (pricePerTiBPerMonthWithCDN * sizeInBytes) /
    (SIZE_CONSTANTS.TiB * epochsPerMonth)

  return {
    withCDN: {
      perEpoch: pricePerEpochWithCDN,
      perDay: pricePerEpochWithCDN * TIME_CONSTANTS.EPOCHS_PER_DAY,
      perMonth: pricePerEpochWithCDN * epochsPerMonth,
    },
    withoutCDN: {
      perEpoch: pricePerEpochNoCDN,
      perDay: pricePerEpochNoCDN * TIME_CONSTANTS.EPOCHS_PER_DAY,
      perMonth: pricePerEpochNoCDN * epochsPerMonth,
    },
  }
}

/**
 * Calculate the allowance needed for a storage operation
 * TODO check if it needs creation fee with getClientProofSetsWithDetails
 */
export function calculateAllowanceNeeded(
  costs: {
    perEpoch: bigint
    perDay: bigint
    perMonth: bigint
  },
  lockupDays: bigint,
  approval: OperatorApprovalResult
) {
  const ratePerEpoch = costs.perEpoch

  // Calculate lockup period based on provided days (default: 10)
  const lockupInEpoch =
    (lockupDays ?? TIME_CONSTANTS.DEFAULT_LOCKUP_DAYS) *
    TIME_CONSTANTS.EPOCHS_PER_DAY
  const lockupNeeded = ratePerEpoch * lockupInEpoch

  // Calculate required allowances (current usage + new requirement)
  const totalRateNeeded = approval.rateUsed + ratePerEpoch
  const totalLockupNeeded = approval.lockupUsed + lockupNeeded

  const sufficient =
    approval.rateAllowance >= totalRateNeeded &&
    approval.lockupAllowance >= totalLockupNeeded

  return {
    depositAmountNeeded: lockupNeeded,
    rateAllowanceNeeded: totalRateNeeded,
    lockupAllowanceNeeded: totalLockupNeeded,
    currentRateAllowance: approval.rateAllowance,
    currentLockupAllowance: approval.lockupAllowance,
    currentRateUsed: approval.rateUsed,
    currentLockupUsed: approval.lockupUsed,
    sufficient,
    costs,
  }
}

/**
 * Get the add roots info for a proof set
 *
 * @param config - The wagmi config
 * @param proofSetId - The proof set ID
 * @returns The add roots info
 */
export async function getAddRootsInfo(config: Config, proofSetId: bigint) {
  const chainId = config.state.chainId
  const chain = getChain(chainId)

  const [isLive, nextRootId, listener, proofSet] = await multicall(
    config.getClient(),
    {
      allowFailure: false,
      contracts: [
        {
          address: chain.contracts.pdp.address,
          abi: chain.contracts.pdp.abi,
          functionName: 'proofSetLive',
          args: [proofSetId],
        },
        {
          address: chain.contracts.pdp.address,
          abi: chain.contracts.pdp.abi,
          functionName: 'getNextRootId',
          args: [proofSetId],
        },
        {
          address: chain.contracts.pdp.address,
          abi: chain.contracts.pdp.abi,
          functionName: 'getProofSetListener',
          args: [proofSetId],
        },
        {
          address: chain.contracts.pandora.address,
          abi: chain.contracts.pandora.abi,
          functionName: 'getProofSet',
          args: [proofSetId],
        },
      ],
    }
  )

  if (!isLive) {
    throw new Error('Proof set is not live')
  }

  if (!isAddressEqual(listener, chain.contracts.pandora.address)) {
    throw new Error('Proof set is not managed by this Pandora contract')
  }

  return {
    nextRootId,
    clientDataSetId: proofSet.clientDataSetId,
    currentRootCount: nextRootId,
  }
}

/**
 * Root data for adding to proof sets
 */
export interface RootData {
  /** The CommP CID */
  cid: CommP
  /** The raw (unpadded) size of the original data in bytes */
  rawSize: number
}

// EIP-712 Type definitions
const EIP712_TYPES = {
  CreateProofSet: [
    { name: 'clientDataSetId', type: 'uint256' },
    { name: 'withCDN', type: 'bool' },
    { name: 'payee', type: 'address' },
  ],
  Cid: [{ name: 'data', type: 'bytes' }],
  RootData: [
    { name: 'root', type: 'Cid' },
    { name: 'rawSize', type: 'uint256' },
  ],
  AddRoots: [
    { name: 'clientDataSetId', type: 'uint256' },
    { name: 'firstAdded', type: 'uint256' },
    { name: 'rootData', type: 'RootData[]' },
  ],
  ScheduleRemovals: [
    { name: 'clientDataSetId', type: 'uint256' },
    { name: 'rootIds', type: 'uint256[]' },
  ],
  DeleteProofSet: [{ name: 'clientDataSetId', type: 'uint256' }],
}

/**
 * Add roots to a proof set
 *
 * @param config - The wagmi config
 * @param proofSetId - The proof set ID
 * @param clientDataSetId - The client data set ID
 * @param nextRootId - The next root ID
 * @param rootDataArray - The root data array
 */
export async function addRoots({
  config,
  account,
  pdpUrl,
  proofSetId,
  clientDataSetId,
  nextRootId,
  rootDataArray,
}: {
  config: Config
  account: Address
  pdpUrl: string
  proofSetId: bigint
  clientDataSetId: bigint
  nextRootId: bigint
  rootDataArray: RootData[]
}) {
  const chainId = config.state.chainId
  const chain = getChain(chainId)

  if (rootDataArray.length === 0) {
    throw new Error('At least one root must be provided')
  }

  const formattedRootData = []

  // Validate all CommPs
  for (const rootData of rootDataArray) {
    const commP = asCommP(rootData.cid)
    if (commP == null) {
      throw new Error(`Invalid CommP: ${String(rootData.cid)}`)
    }
    formattedRootData.push({
      root: {
        data: toHex(commP.bytes),
      },
      rawSize: BigInt(toPieceSize(rootData.rawSize)),
    })
  }

  const signature = await signTypedData(config, {
    account,
    domain: {
      name: 'PandoraService',
      version: '1',
      chainId,
      verifyingContract: chain.contracts.pandora.address,
    },
    primaryType: 'AddRoots',
    message: {
      clientDataSetId: clientDataSetId,
      firstAdded: nextRootId,
      rootData: formattedRootData,
    },
    types: {
      AddRoots: EIP712_TYPES.AddRoots,
      RootData: EIP712_TYPES.RootData,
      Cid: EIP712_TYPES.Cid,
    },
  })

  const extraData = encodeAbiParameters(
    [{ type: 'bytes' }, { type: 'string' }],
    [signature, '']
  )

  // Prepare request body matching the Curio handler expectation
  // Each root has itself as its only subroot (internal implementation detail)
  const requestBody = {
    roots: rootDataArray.map((rootData) => {
      // Convert to string for JSON serialization
      const cidString = rootData.cid.toString()
      return {
        rootCid: cidString,
        subroots: [
          {
            subrootCid: cidString, // Root is its own subroot
          },
        ],
      }
    }),
    extraData,
  }

  // Make the POST request to add roots to the proof set
  const response = await fetch(`${pdpUrl}/pdp/proof-sets/${proofSetId}/roots`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })

  if (response.status !== 201) {
    const errorText = await response.text()
    throw new Error(
      `Failed to add roots to proof set: ${response.status} ${response.statusText} - ${errorText}`
    )
  }

  // Check for Location header (backward compatible with old servers)
  const location = response.headers.get('Location')
  let txHash: string | undefined
  let statusUrl: string | undefined

  if (location != null) {
    // Expected format: /pdp/proof-sets/{proofSetId}/roots/added/{txHash}
    const locationMatch = location.match(/\/roots\/added\/([0-9a-fA-Fx]+)$/)
    if (locationMatch != null) {
      txHash = locationMatch[1]
      // Ensure txHash has 0x prefix
      if (!txHash.startsWith('0x')) {
        txHash = '0x' + txHash
      }
      statusUrl = `${pdpUrl}${location}`
    }
  }

  return {
    txHash: txHash as `0x${string}`,
    statusUrl,
  }
}

const RootAdditionStatusResponse = z.object({
  txHash: z.string(),
  txStatus: z.string(),
  proofSetId: z.number(),
  rootCount: z.number(),
  addMessageOk: z.boolean().nullable(),
  confirmedRootIds: z.array(z.number()).optional(),
})

export async function getRootAdditionStatus(
  proofSetId: number,
  txHash: string,
  url: string
) {
  const response = await request.json.get(
    `${url}/pdp/proof-sets/${proofSetId}/roots/added/${txHash}`,
    {
      retry: {
        retries: 3,
      },
    }
  )
  if (response.error) {
    throw response.error
  }

  const result = RootAdditionStatusResponse.parse(response.result)
  return result
}
