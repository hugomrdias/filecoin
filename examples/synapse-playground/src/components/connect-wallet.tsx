import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { WalletOptions } from './wallet-options'

export function ConnectWallet() {
  const [open, setOpen] = useState(false)
  const { isConnected } = useAccount()

  useEffect(() => {
    if (isConnected) {
      setOpen(false)
    }
  }, [isConnected])

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>Connect Wallet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Connect your wallet to get started
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <WalletOptions />
        </div>
      </DialogContent>
    </Dialog>
  )
}
