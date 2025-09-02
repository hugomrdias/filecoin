import { useQueryClient } from '@tanstack/react-query'
import { useList } from '@uidotdev/usehooks'
import {
  DATA_SET_CREATION_FEE,
  formatBalance,
  formatFraction,
  payments,
  SIZE_CONSTANTS,
  warmStorage,
} from 'iso-filecoin-synapse'
import { getChain } from 'iso-filecoin-synapse/chains'
import {
  useReadPaymentsOperatorApprovals,
  useReadWarmStorageGetServicePrice,
} from 'iso-filecoin-synapse/gen'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { type Address, parseEther } from 'viem'
import { useAccount, useChainId } from 'wagmi'
import { z } from 'zod/v4'
import * as Icons from '@/components/icons'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { truncateMiddle } from '@/lib/utils'
import { ErrorAlert, HashAlert, SuccessAlert } from './custom-ui/alerts'
import { ButtonLoading } from './custom-ui/button-loading'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
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
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { Switch } from './ui/switch'

export function WarmStorageService() {
  const { address } = useAccount()
  const chainId = useChainId()
  const chain = getChain(chainId)

  const { data: operatorApprovals } = useReadPaymentsOperatorApprovals({
    query: {
      enabled: !!address,
    },
    args: [
      chain.contracts.usdfc.address,
      address!,
      chain.contracts.pandora.address,
    ],
  })
  const operator = {
    isApproved: operatorApprovals?.[0],
    rateAllowance: operatorApprovals?.[1],
    lockupAllowance: operatorApprovals?.[2],
    rateUsed: operatorApprovals?.[3],
    lockupUsed: operatorApprovals?.[4],
  }

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle className="font-normal">
          {operator.isApproved ? (
            <>
              <div className="flex flex-row gap-2 items-center">
                <span className="text-sm text-muted-foreground">Lockup:</span>
                <span className="text-sm font-bold">
                  {formatFraction({
                    value: operator.lockupUsed ?? 0n,
                  })}{' '}
                  /{' '}
                  {formatFraction({
                    value: operator.lockupAllowance ?? 0n,
                  })}
                </span>

                <Icons.Usdfc className="w-4 h-4" />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <span className="text-sm text-muted-foreground">Rate:</span>
                <span className="text-sm font-bold">
                  {formatFraction({
                    value: operator.rateUsed ?? 0n,
                  })}{' '}
                  /{' '}
                  {formatFraction({
                    value: operator.rateAllowance ?? 0n,
                  })}
                </span>
                <Icons.Usdfc className="w-4 h-4" />
              </div>
            </>
          ) : (
            <div>Not approved</div>
          )}
        </CardTitle>
        <CardAction>
          <OperatorApprovalDialog />
        </CardAction>
      </CardHeader>
      <CardContent>
        <FileUpload />
        <Separator className="my-4" />
        <DataSetsDownload />
      </CardContent>
      {/* <CardFooter className="flex-col gap-2">
        <OperatorApprovalDialog />
        <DepositDialog />
        <WithdrawDialog />
      </CardFooter> */}
    </Card>
  )
}

const formSchema = z.object({
  lockup: z.string().min(1),
  rate: z.string().min(1),
})
export function OperatorApprovalDialog() {
  const { address } = useAccount()
  const { data: servicePrice } = useReadWarmStorageGetServicePrice()
  const [hash, setHash] = useState<string | null>(null)
  const [withCDN, setWithCDN] = useState(false)
  const [size, setSize] = useState(10n)
  const [duration, setDuration] = useState(10n)

  const { data: allowance } = warmStorage.useAllowance({
    address,
    sizeInBytes: size * SIZE_CONSTANTS.GiB,
    lockupDays: duration,
    withCDN,
  })

  const {
    mutate: revokeOperator,
    isPending: isRevoking,
    isSuccess: isRevoked,
    error: revokeError,
    reset: revokeReset,
  } = payments.useRevokeOperator({
    onHash: (hash) => {
      setHash(hash)
      reset()
    },
    mutation: {
      onSettled: () => {
        setHash(null)
      },
    },
  })

  const {
    mutate: approveOperator,
    isPending,
    isSuccess,
    error,
    reset,
  } = payments.useApproveOperator({
    onHash: (hash) => {
      setHash(hash)
      revokeReset()
    },
    mutation: {
      onSettled: () => {
        setHash(null)
      },
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    values: {
      lockup: formatFraction({
        value: allowance?.depositAmountNeeded ?? 0n,
        digits: 18,
      }),
      rate: formatFraction({
        value: allowance?.rateAllowanceNeeded ?? 0n,
        digits: 18,
      }),
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const lockup = parseEther(values.lockup)
    const rate = parseEther(values.rate)

    approveOperator({ lockup, rate })
  }

  return (
    <Dialog
      onOpenChange={() => {
        reset()
        revokeReset()
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full" variant="default">
          Allowance
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Manage Allowance</DialogTitle>
              <DialogDescription>
                Manage the allowance for the Payments contract to spend your
                USDFC tokens.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={withCDN}
                  id="with-cdn"
                  onCheckedChange={setWithCDN}
                />
                <Label htmlFor="with-cdn">With CDN</Label>
              </div>
              <p className="text-muted-foreground text-lg">Price</p>
              <div className="flex flex-row gap-2 items-center">
                <span className="text-sm text-muted-foreground">
                  TiB per Month:
                </span>
                <span className="text-sm font-bold">
                  {formatBalance({
                    value: withCDN
                      ? (servicePrice?.pricePerTiBPerMonthWithCDN ?? 0n)
                      : (servicePrice?.pricePerTiBPerMonthNoCDN ?? 0n),
                  })}
                </span>
                <Icons.Usdfc className="w-4 h-4" />
              </div>
              <p className="text-muted-foreground text-lg">Estimate</p>
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  onChange={(e) => setSize(BigInt(e.target.value))}
                  placeholder="Size"
                  type="number"
                  value={size.toString()}
                />
                <p className="text-muted-foreground text-sm">
                  Enter the size of the data you want to store in GiB.
                </p>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  onChange={(e) => setDuration(BigInt(e.target.value))}
                  placeholder="Duration"
                  type="number"
                  value={duration.toString()}
                />
                <p className="text-muted-foreground text-sm">
                  Enter how long you want to store the data in days.
                </p>
              </div>
              <DataUsageTable data={allowance} />

              <Separator />
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="lockup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lockup</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Amount of USDFC to lockup.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                  rules={{
                    required: 'Amount is required',
                    validate: (value) => {
                      const amount = parseEther(value)
                      if (amount < 0n) {
                        return 'Amount must be greater than 0'
                      }
                      return true
                    },
                  }}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rate</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Rate amount.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                  rules={{
                    required: 'Amount is required',
                    validate: (value) => {
                      const amount = parseEther(value)
                      if (amount < 0n) {
                        return 'Amount must be greater than 0'
                      }
                      return true
                    },
                  }}
                />
              </div>
              <HashAlert hash={hash} />
              <ErrorAlert error={error || revokeError} />
              <SuccessAlert
                message="Operator approval updated"
                show={isSuccess}
              />
              <SuccessAlert
                message="Operator approval revoked"
                show={isRevoked}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <ButtonLoading
                className="w-24"
                loading={isRevoking}
                onClick={() => {
                  revokeOperator()
                }}
                type="button"
                variant="destructive"
              >
                Revoke
              </ButtonLoading>
              <ButtonLoading className="w-24" loading={isPending} type="submit">
                Update
              </ButtonLoading>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export function DataUsageTable({
  data,
}: {
  data?: warmStorage.AllowanceResult
}) {
  return (
    <div className="my-4 w-full overflow-y-auto text-sm text-muted-foreground">
      <table className="w-full">
        {/* <thead>
          <tr className="even:bg-muted m-0 border-t p-0">
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              Data Usage
            </th>
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              Amount
            </th>
          </tr>
        </thead> */}
        <tbody>
          <tr className="even:bg-muted m-0 border-t p-0">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Cost per Day
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {formatFraction({
                value: data?.costs.perDay ?? 0n,
              })}
            </td>
          </tr>
          <tr className="even:bg-muted m-0 border-t p-0">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Cost per Month
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {formatFraction({
                value: data?.costs.perMonth ?? 0n,
              })}
            </td>
          </tr>
          <tr className="even:bg-muted m-0 border-t p-0">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Cost per Epoch
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {formatFraction({
                value: data?.costs.perEpoch ?? 0n,
              })}
            </td>
          </tr>
          <tr className="even:bg-muted m-0 border-t p-0">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Current Rate
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {formatFraction({
                value: data?.currentRateAllowance ?? 0n,
              })}
            </td>
          </tr>
          <tr className="even:bg-muted m-0 border-t p-0">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Current Lockup
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {formatFraction({
                value: data?.currentLockupAllowance ?? 0n,
              })}
            </td>
          </tr>
          <tr className="even:bg-muted m-0 border-t p-0">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Current Rate Used
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {formatFraction({
                value: data?.currentRateUsed ?? 0n,
              })}
            </td>
          </tr>
          <tr className="even:bg-muted m-0 border-t p-0">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Current Lockup Used
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {formatFraction({
                value: data?.currentLockupUsed ?? 0n,
              })}
            </td>
          </tr>
          <tr className="even:bg-muted m-0 border-t p-0">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Total Lockup Needed
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {formatFraction({
                value: data?.lockupAllowanceNeeded ?? 0n,
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export function FileUpload() {
  const queryClient = useQueryClient()
  const { address } = useAccount()
  const [messages, { push, clear }] = useList<{
    message: string
    date: Date
    id: string
  }>()
  const [withCDN, setWithCDN] = useState(false)
  const [size, setSize] = useState(0n)
  const { data: dataSets } = warmStorage.useDataSets({
    address,
    withCDN,
  })

  const { data: allowance, isPending } = warmStorage.useAllowance({
    address,
    sizeInBytes: size,
    lockupDays: 30n,
    withCDN,
  })

  const {
    mutate: upload,
    isPending: isUploading,
    error: uploadError,
    reset: uploadReset,
  } = warmStorage.useStorageUpload({
    withCDN,
    providerId: dataSets?.providerId,
    mutation: {
      onError() {
        clear()
      },
    },
    onRootAdded(txHash) {
      push({
        message: `Waiting for confirmation: ${txHash}`,
        date: new Date(),
        id: crypto.randomUUID(),
      })
    },
    onRootConfirmed(status) {
      queryClient.invalidateQueries({
        queryKey: ['useDataSetsDownload', address],
      })
      push({
        message: `Upload confirmed`,
        date: new Date(),
        id: crypto.randomUUID(),
      })
    },
    creationCallbacks: {
      onProviderSelected(provider) {
        push({
          message: `Uploading to ${truncateMiddle(provider.owner, 4, 4)} ${provider.pdpUrl}`,
          date: new Date(),
          id: crypto.randomUUID(),
        })
      },
    },
    uploadCallbacks: {
      onUploadComplete(commp) {
        push({
          message: `Upload complete: ${commp.toString()}`,
          date: new Date(),
          id: crypto.randomUUID(),
        })
      },
    },
  })

  const needsCreationFee = dataSets?.filtered.length === 0
  const costPerMonth = needsCreationFee
    ? (allowance?.costs.perMonth ?? 0n) + DATA_SET_CREATION_FEE
    : (allowance?.costs.perMonth ?? 0n)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const fileInput = e.currentTarget.elements.namedItem(
      'file'
    ) as HTMLInputElement

    if (fileInput.files) {
      const file = fileInput.files[0]
      clear()
      upload({ file })
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="file">Upload</Label>
        <Input
          id="file"
          onChange={(e) => {
            clear()
            uploadReset()
            const fileInput = e.currentTarget as HTMLInputElement
            if (fileInput.files) {
              const file = fileInput.files[0]
              setSize(BigInt(file.size))
            }
          }}
          type="file"
        />
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={withCDN}
            id="with-cdn"
            onCheckedChange={(checked) => setWithCDN(checked as boolean)}
          />
          <Label htmlFor="with-cdn">With CDN</Label>
        </div>
        <ButtonLoading
          disabled={!allowance?.sufficient}
          loading={isPending || isUploading}
          type="submit"
        >
          Upload
        </ButtonLoading>
        <p className="text-muted-foreground text-sm">
          Estimated cost per month {needsCreationFee ? 'with creation fee' : ''}
          : {formatFraction({ value: costPerMonth })}
        </p>

        <ErrorAlert error={uploadError} />
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div key={message.id}>
              <small className="text-xs leading-none font-medium">
                {message.message}
              </small>
              <p className="text-muted-foreground text-xs">
                {message.date.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </form>
  )
}

export function DataSetsDownload() {
  const { address } = useAccount()
  const { data: dataSets } = warmStorage.useDataSetsDownload({
    address,
  })
  return (
    <div>
      <p>Data Sets</p>
      <div className="flex flex-col gap-2">
        {dataSets?.data.map((dataSet) => (
          <div className="" key={dataSet.dataSet.payee}>
            <div className="text-sm py-2" key={dataSet.dataSet.payee}>
              # {dataSet.details.id}{' '}
              <span className="text-muted-foreground text-xs">
                {new URL(dataSet.pdpUrl ?? '').hostname}{' '}
                {dataSet.dataSet.withCDN ? 'CDN' : ''}
              </span>
            </div>
            {dataSet.details.roots.map((root) => (
              <div
                className="text-sm px-4 py-2 my-2 border-accent border rounded-md bg-accent"
                key={root.rootId}
              >
                <p>File #{root.rootId}</p>
                <p className="text-muted-foreground text-xs">{root.rootCid}</p>
                <a href={root.pieceUrl} rel="noreferrer" target="_blank">
                  Download
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
