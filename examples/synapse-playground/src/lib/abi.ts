import { parseAbi } from 'viem'

/**
 * USDFC ERC20 ABI
 *
 * @see https://github.com/Secured-Finance/stablecoin-contracts/blob/develop/deployments/ABIs/ERC20.js
 */
export const usdfc = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address',
      },
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
] as const

/**
 * Payments contract ABI - based on fws-payments contract
 */
export const payments = parseAbi([
  'function deposit(address token, address to, uint256 amount)',
  'function withdraw(address token, uint256 amount)',
  'function accounts(address token, address owner) view returns (uint256 funds, uint256 lockupCurrent, uint256 lockupRate, uint256 lockupLastSettledAt)',
  'function setOperatorApproval(address token, address operator, bool approved, uint256 rateAllowance, uint256 lockupAllowance)',
  'function operatorApprovals(address token, address client, address operator) view returns (bool isApproved, uint256 rateAllowance, uint256 rateUsed, uint256 lockupAllowance, uint256 lockupUsed)',
])

/**
 * Pandora ABI - includes both PDP functions and service provider management
 */
export const pandora = parseAbi([
  // Write functions
  'function registerServiceProvider(string pdpUrl, string pieceRetrievalUrl) external',
  'function approveServiceProvider(address provider) external',
  'function rejectServiceProvider(address provider) external',
  'function removeServiceProvider(uint256 providerId) external',
  'function addServiceProvider(address provider, string pdpUrl, string pieceRetrievalUrl) external',

  // Read functions
  'function isProviderApproved(address provider) external view returns (bool)',
  'function getProviderIdByAddress(address provider) external view returns (uint256)',
  'function getApprovedProvider(uint256 providerId) external view returns ((address owner, string pdpUrl, string pieceRetrievalUrl, uint256 registeredAt, uint256 approvedAt))',
  'function pendingProviders(address provider) external view returns (string pdpUrl, string pieceRetrievalUrl, uint256 registeredAt)',
  'function approvedProviders(uint256 providerId) external view returns (address owner, string pdpUrl, string pieceRetrievalUrl, uint256 registeredAt, uint256 approvedAt)',
  'function nextServiceProviderId() external view returns (uint256)',
  'function owner() external view returns (address)',
  'function getServicePrice() external view returns ((uint256 pricePerTiBPerMonthNoCDN, uint256 pricePerTiBPerMonthWithCDN, address tokenAddress, uint256 epochsPerMonth) pricing)',

  // Public mappings that are automatically exposed
  'function approvedProvidersMap(address) external view returns (bool)',
  'function providerToId(address) external view returns (uint256)',
  'function getAllApprovedProviders() external view returns ((address owner, string pdpUrl, string pieceRetrievalUrl, uint256 registeredAt, uint256 approvedAt)[])',

  // Proof set functions
  'function getClientProofSets(address client) external view returns ((uint256 railId, address payer, address payee, uint256 commissionBps, string metadata, string[] rootMetadata, uint256 clientDataSetId, bool withCDN)[])',

  // Client dataset ID counter
  'function clientDataSetIDs(address client) external view returns (uint256)',

  // Mapping from rail ID to PDPVerifier proof set ID
  'function railToProofSet(uint256 railId) external view returns (uint256 proofSetId)',

  // Get proof set info by ID
  'function getProofSet(uint256 id) public view returns ((uint256 railId, address payer, address payee, uint256 commissionBps, string metadata, string[] rootMetadata, uint256 clientDataSetId, bool withCDN) info)',

  // Proving period and timing functions
  'function getMaxProvingPeriod() external view returns (uint64)',
  'function challengeWindow() external view returns (uint256)',
  'function maxProvingPeriod() external view returns (uint64)',
  'function challengeWindowSize() external view returns (uint256)',
])

/**
 * PDPVerifier contract ABI - core PDP verification functions
 */
export const pdp = parseAbi([
  'function getNextRootId(uint256 setId) public view returns (uint256)',
  'function proofSetLive(uint256 setId) public view returns (bool)',
  'function getProofSetLeafCount(uint256 setId) public view returns (uint256)',
  'function getProofSetOwner(uint256 setId) public view returns (address, address)',
  'function getProofSetListener(uint256 setId) public view returns (address)',
  'event ProofSetCreated(uint256 indexed setId, address indexed owner)',
])
