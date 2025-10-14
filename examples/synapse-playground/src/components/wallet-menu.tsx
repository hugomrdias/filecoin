import { erc20, formatBalance, useWatchUsdfc } from 'iso-filecoin-synapse'
import { ArrowUpRight, Copy, Wallet } from 'lucide-react'
import { useAccount, useBalance, useDisconnect } from 'wagmi'
import * as Icons from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCopyToClipboard } from '@/hooks/use-clipboard'
import { truncateMiddle } from '@/lib/utils'

export function WalletMenu() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const [_, copyToClipboard] = useCopyToClipboard()
  const { data: balance } = useBalance({
    address,
  })

  const { mutate: watchAsset } = useWatchUsdfc()
  const { data: erc20Balance } = erc20.useBalance({ address })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="default" variant="outline">
          {formatBalance({
            value: balance?.value,
            digits: 1,
          })}
          <Icons.Filecoin />
          {formatBalance({
            value: erc20Balance?.value,
            digits: 1,
          })}
          <Icons.Usdfc />
          <Wallet />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Wallet</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => copyToClipboard(address ?? '')}>
            {truncateMiddle(address ?? '', 7, 5)}
            <DropdownMenuShortcut>
              <Copy />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {formatBalance(balance)} {balance?.symbol}
            <DropdownMenuShortcut>
              <Icons.Filecoin />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {formatBalance(erc20Balance)} {erc20Balance?.symbol}
            <DropdownMenuShortcut>
              <Icons.Usdfc />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Tools</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              watchAsset()
            }}
          >
            Add USDFC Token
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a
              href="https://forest-explorer.chainsafe.dev/faucet/calibnet_usdfc"
              rel="noopener noreferrer"
              target="_blank"
            >
              Get USDFC
            </a>
            <DropdownMenuShortcut>
              <ArrowUpRight />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a
              href="https://faucet.calibnet.chainsafe-fil.io/funds.html"
              rel="noopener noreferrer"
              target="_blank"
            >
              Get Filecoin
            </a>
            <DropdownMenuShortcut>
              <ArrowUpRight />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => disconnect()}>
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
