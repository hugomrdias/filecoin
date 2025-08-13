import { type Config, readContracts } from '@wagmi/core'
import { type Address, isAddressEqual } from 'viem'
import { getChain } from './chains.js'
import {
  readPdpVerifierGetNextRootId,
  readWarmStorageGetClientProofSets,
  readWarmStorageRailToProofSet,
} from './gen.js'

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
