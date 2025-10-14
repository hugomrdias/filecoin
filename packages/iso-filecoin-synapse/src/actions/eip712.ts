import { TypedData } from 'ox'
import { keccak256, stringToHex } from 'viem'

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
}

export type SessionKeyPermissions =
  | 'CreateDataSet'
  | 'AddPieces'
  | 'SchedulePieceRemovals'
  | 'DeleteDataSet'

function typeHash(type: TypedData.encodeType.Value) {
  return keccak256(stringToHex(TypedData.encodeType(type)))
}
export const SESSION_KEY_PERMISSIONS: Record<
  SessionKeyPermissions,
  `0x${string}`
> = {
  CreateDataSet: typeHash({
    types: EIP712_TYPES,
    primaryType: 'CreateDataSet',
  }),
  AddPieces: typeHash({
    types: EIP712_TYPES,
    primaryType: 'AddPieces',
  }),
  SchedulePieceRemovals: typeHash({
    types: EIP712_TYPES,
    primaryType: 'SchedulePieceRemovals',
  }),
  DeleteDataSet: typeHash({
    types: EIP712_TYPES,
    primaryType: 'DeleteDataSet',
  }),
}
