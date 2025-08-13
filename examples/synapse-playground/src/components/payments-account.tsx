import { erc20 } from 'iso-filecoin-synapse'
import { useReadUsdfcBalanceOf } from 'iso-filecoin-synapse/gen'
import { useForm } from 'react-hook-form'
import { formatEther, parseEther } from 'viem'
import { useAccount } from 'wagmi'
import { z } from 'zod'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useBalancePayments } from '@/hooks/use-payments'
import { formatBalance } from '@/lib/utils'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

export function PaymentsAccount() {
  const { address } = useAccount()
  const { data: paymentsBalance } = useBalancePayments(address)
  const { data: erc20Balance } = erc20.useBalance({ address })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payments Account</CardTitle>
        <CardDescription>Manage your payments account</CardDescription>
        <CardAction>
          <Button variant="secondary">Get USDFC</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-2">
          <span className="text-sm text-muted-foreground">USDFC Balance</span>
          <span className="text-sm font-bold">
            {formatBalance(erc20Balance)}
          </span>
        </div>
        <div className="flex flex-row gap-2">
          <span className="text-sm text-muted-foreground">USDFC Allowance</span>
          <span className="text-sm font-bold">
            {formatBalance({
              value: erc20Balance?.allowance ?? 0n,
              decimals: 18,
            })}
          </span>
        </div>
        <div className="flex flex-row gap-2">
          <span className="text-sm text-muted-foreground">
            Payments Balance:
          </span>
          <span className="text-sm font-bold">
            {formatBalance({
              value: paymentsBalance?.availableFunds ?? 0n,
              decimals: 18,
            })}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <AllowanceDialog />
      </CardFooter>
    </Card>
  )
}

const formSchema = z.object({
  amount: z.string().min(1),
})
export function AllowanceDialog() {
  const { address } = useAccount()
  const { data: erc20Balance } = erc20.useBalance({ address })

  // @ts-expect-error - TODO: fix this
  const { data: balanceOf } = useReadUsdfcBalanceOf({
    args: [address!],
  })
  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '1',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    // const amount = parseEther(values.amount)
    // console.log(amount)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          Allowance
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Approve Allowance</DialogTitle>
              <DialogDescription>
                Approve the allowance for the Payments contract to spend your
                USDFC tokens.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Amount of USDFC to approve.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                  rules={{
                    required: 'Amount is required',
                    validate: (value) => {
                      if (parseEther(value) > (erc20Balance?.value ?? 0n)) {
                        return `Amount must be less than ${formatEther(erc20Balance?.value ?? 0n)} USDFC`
                      }
                      return true
                    },
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Approve</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
