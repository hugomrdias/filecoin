import { TIME_CONSTANTS } from '@filoz/synapse-sdk'
import { erc20Abi } from 'viem'

export { SIZE_CONSTANTS, TIME_CONSTANTS } from '@filoz/synapse-sdk'
export const DATA_SET_CREATION_FEE = BigInt(0.1 * 10 ** 18)
export const LOCKUP_PERIOD = 10n * TIME_CONSTANTS.EPOCHS_PER_DAY

// EIP-712 Type definitions
export const EIP712_TYPES = {
  MetadataEntry: [
    { name: 'key', type: 'string' },
    { name: 'value', type: 'string' },
  ],
  CreateDataSet: [
    { name: 'clientDataSetId', type: 'uint256' },
    { name: 'payee', type: 'address' },
    { name: 'metadata', type: 'MetadataEntry[]' },
  ],
  Cid: [{ name: 'data', type: 'bytes' }],
  PieceMetadata: [
    { name: 'pieceIndex', type: 'uint256' },
    { name: 'metadata', type: 'MetadataEntry[]' },
  ],
  AddPieces: [
    { name: 'clientDataSetId', type: 'uint256' },
    { name: 'firstAdded', type: 'uint256' },
    { name: 'pieceData', type: 'Cid[]' },
    { name: 'pieceMetadata', type: 'PieceMetadata[]' },
  ],
  SchedulePieceRemovals: [
    { name: 'clientDataSetId', type: 'uint256' },
    { name: 'pieceIds', type: 'uint256[]' },
  ],
  DeleteDataSet: [{ name: 'clientDataSetId', type: 'uint256' }],

  /**
   * ERC-2612: Permit Extension for EIP-20 Signed Approvals
   * @see https://eips.ethereum.org/EIPS/eip-2612
   */
  Permit: [
    { name: 'owner', type: 'address' },
    { name: 'spender', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
  ],
}

/**
 * ERC20 ABI with Permit extension
 * @see https://eips.ethereum.org/EIPS/eip-2612
 */
export const ERC20_WITH_PERMIT_ABI = [
  ...erc20Abi,
  ...[
    {
      type: 'function',
      stateMutability: 'view',
      name: 'nonces',
      inputs: [{ name: 'owner', type: 'address' }],
      outputs: [{ name: '', type: 'uint256' }],
    },
    {
      type: 'function',
      stateMutability: 'view',
      name: 'version',
      inputs: [],
      outputs: [{ name: '', type: 'string' }],
    },
  ],
] as const
