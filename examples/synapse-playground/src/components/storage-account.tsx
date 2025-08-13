import { useState } from 'react'
import { useAccount } from 'wagmi'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useBalanceUsdfc } from '@/hooks/use-balance-usdfc'
import { usePandoraAllowance, usePayment } from '@/hooks/use-pandora-prices'
import { useBalancePayments } from '@/hooks/use-payments'
import { SIZE_CONSTANTS } from '@/lib/constants'
import { formatBalance } from '@/lib/utils'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'

export function StorageAccount() {
  const { address } = useAccount()
  const [size, setSize] = useState(10n)
  const [lockupDays, setLockupDays] = useState(30n)
  const [withCDN, setWithCDN] = useState(false)
  const { data: usdfcBalance } = useBalanceUsdfc({ address })
  const { data: paymentsBalance } = useBalancePayments(address)
  const { data: pandoraAllowance } = usePandoraAllowance({
    client: address,
    lockupDays,
    withCDN,
    sizeInBytes: size * SIZE_CONSTANTS.GiB,
  })

  const { mutate: deposit } = usePayment()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Storage Account</CardTitle>
        <CardDescription>Manage your storage account</CardDescription>
        <CardAction>
          <Button variant="secondary">Get USDFC</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-2">
          <span className="text-sm text-muted-foreground">USDFC Balance</span>
          <span className="text-sm font-bold">
            {formatBalance(usdfcBalance)}
          </span>
        </div>
        <div className="flex flex-row gap-2">
          <span className="text-sm text-muted-foreground">
            Payments Balance
          </span>
          <span className="text-sm font-bold">
            {formatBalance({
              value: paymentsBalance?.availableFunds ?? 0n,
              decimals: 18,
            })}
          </span>
        </div>
        <div className="grid w-full max-w-sm items-center gap-3 pt-4">
          <p>Estimate Cost</p>
          <Label htmlFor="size">Size (GiB)</Label>
          <Input
            id="size"
            onChange={(e) => setSize(BigInt(e.target.value))}
            placeholder="Size"
            type="number"
            value={Number(size)}
          />
          <Label htmlFor="lockupDays">Lockup (Days)</Label>
          <Input
            id="lockupDays"
            onChange={(e) => setLockupDays(BigInt(e.target.value))}
            placeholder="Lockup Days"
            type="number"
            value={Number(lockupDays)}
          />
          <Label htmlFor="withCDN">With CDN</Label>
          <Switch checked={withCDN} id="withCDN" onCheckedChange={setWithCDN} />

          <Button
            onClick={() =>
              deposit({
                address: address!,
                rateAllowanceNeeded:
                  pandoraAllowance?.rateAllowanceNeeded ?? 0n,
                lockupAllowanceNeeded:
                  pandoraAllowance?.lockupAllowanceNeeded ?? 0n,
                depositAmountNeeded:
                  pandoraAllowance?.depositAmountNeeded ?? 0n,
              })
            }
          >
            Deposit{' '}
            {formatBalance({
              value: pandoraAllowance?.depositAmountNeeded ?? 0n,
              decimals: 18,
            })}{' '}
            USDFC
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
