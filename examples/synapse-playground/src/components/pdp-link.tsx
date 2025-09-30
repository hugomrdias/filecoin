import { useConfig } from 'wagmi'

/**
 * Displays a link to the explorer for a given hash
 */
export function PDPLink({ id }: { id: string }) {
  const config = useConfig()
  const chain = config.state.chainId === 314 ? 'mainnet' : 'calibration'
  const explorerUrl = `https://pdp.vxb.ai/${chain}/proofsets/${id}`
  return (
    <a
      className="hover:underline wrap-anywhere text-gray-400"
      href={explorerUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      #{id}
    </a>
  )
}
