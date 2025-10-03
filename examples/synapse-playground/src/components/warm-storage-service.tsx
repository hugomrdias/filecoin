import {
  DATA_SET_CREATION_FEE,
  formatBalance,
  formatFraction,
  payments,
  SIZE_CONSTANTS,
  warmStorage,
} from 'iso-filecoin-synapse'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { parseEther } from 'viem'
import { useAccount } from 'wagmi'
import { z } from 'zod/v4'
import * as Icons from '@/components/icons'
import { Card, CardContent } from '@/components/ui/card'
import { ErrorAlert, HashAlert, SuccessAlert } from './custom-ui/alerts'
import { ButtonLoading } from './custom-ui/button-loading'
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
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Separator } from './ui/separator'
import { Skeleton } from './ui/skeleton'
import { Switch } from './ui/switch'
import { DataSetsSection } from './warm-storage/data-sets-section'

export function WarmStorageService() {
  const { address } = useAccount()

  const { data: operator } = payments.useOperatorApprovals({
    address,
  })

  const { data: dataSets } = warmStorage.useDataSets({
    address,
  })

  return (
    <Card className="my-4">
      {/* <CardHeader>
        <CardTitle className="font-normal">
          {operator ? (
            <OperatorApprovals operator={operator} />
          ) : (
            <Skeleton className="w-full h-6" />
          )}
        </CardTitle>
        <CardAction>{operator && <OperatorApprovalDialog />}</CardAction>
      </CardHeader> */}
      <CardContent>
        {operator?.isApproved && dataSets && dataSets?.length > 0 && (
          <FileUpload />
        )}
        {operator?.isApproved ? (
          <>
            <Separator className="my-4" />
            <DataSetsSection />
          </>
        ) : (
          'Not approved'
        )}
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
  const [hash, setHash] = useState<string | null>(null)
  const [withCDN, setWithCDN] = useState(false)
  const [size, setSize] = useState(10n)

  const { address } = useAccount()
  const { data: operator } = payments.useOperatorApprovals({
    address,
  })
  const { data: servicePrice } = warmStorage.useServicePrice()
  const { data: estimateLockup } = warmStorage.useEstimateLockup({
    sizeInBytes: size * SIZE_CONSTANTS.GiB,
    withCDN,
  })

  // Revoke Operator Mutation
  // const {
  //   mutate: revokeOperator,
  //   isPending: isRevoking,
  //   isSuccess: isRevoked,
  //   error: revokeError,
  //   reset: revokeReset,
  // } = payments.useRevokeOperator({
  //   onHash: (hash) => {
  //     setHash(hash)
  //     reset()
  //   },
  //   mutation: {
  //     onSettled: () => {
  //       setHash(null)
  //     },
  //   },
  // })

  // Approve Operator Mutation
  const {
    mutate: approveOperator,
    isPending,
    isSuccess,
    error,
    reset,
  } = payments.useApproveOperator({
    onHash: (hash) => {
      setHash(hash)
      // revokeReset()
    },
    mutation: {
      onSettled: () => {
        setHash(null)
      },
    },
  })

  // Approve Operator Form
  const form = useForm<z.infer<typeof formSchema>>({
    values: {
      lockup: formatFraction({
        value: estimateLockup?.lockup,
      }),
      rate: formatFraction({
        value: estimateLockup?.rate,
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
        // revokeReset()
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full" variant="default">
          Lockup
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-3/4 overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Manage Lockup</DialogTitle>
              <DialogDescription>
                Manage the lockup Warm Storage can set for your account.
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
                      ? servicePrice?.pricePerTiBPerMonthWithCDN
                      : servicePrice?.pricePerTiBPerMonthNoCDN,
                  })}
                </span>
                <Icons.Usdfc className="w-4 h-4" />
              </div>
              <p className="text-muted-foreground text-lg">Lockup Estimate</p>
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
              </div>
              <DataUsageTable data={estimateLockup} />

              <Separator />
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
                      Amount of USDFC to lockup. Add 0.1 USDFC for each data set
                      you want to create.
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
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rate</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Rate limit per day.</FormDescription>
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
              <HashAlert hash={hash} />
              <ErrorAlert error={error} />
              <SuccessAlert
                message="Operator approval updated"
                show={isSuccess}
              />
              {/* <SuccessAlert
                message="Operator approval revoked"
                show={isRevoked}
              /> */}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              {/* <ButtonLoading
                className="w-24"
                loading={isRevoking}
                onClick={() => {
                  revokeOperator()
                }}
                type="button"
                variant="destructive"
              >
                Revoke
              </ButtonLoading> */}
              <ButtonLoading
                className="sm:w-24 w-full"
                loading={isPending}
                type="submit"
              >
                {operator?.isApproved ? 'Update' : 'Approve'}
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
  data?: warmStorage.UseEstimateLockupResult
}) {
  const { address } = useAccount()
  const { data: operator } = payments.useOperatorApprovals({
    address,
  })
  return (
    <div className="my-4 w-full overflow-y-auto text-sm text-muted-foreground">
      <table className="w-full">
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
                value: operator?.rateAllowance ?? 0n,
              })}
            </td>
          </tr>
          <tr className="even:bg-muted m-0 border-t p-0">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Current Lockup
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {formatFraction({
                value: operator?.lockupAllowance ?? 0n,
              })}
            </td>
          </tr>
          <tr className="even:bg-muted m-0 border-t p-0">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Current Rate Used
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {formatFraction({
                value: operator?.rateUsed ?? 0n,
              })}
            </td>
          </tr>
          <tr className="even:bg-muted m-0 border-t p-0">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Current Lockup Used
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {formatFraction({
                value: operator?.lockupUsed ?? 0n,
              })}
            </td>
          </tr>
          <tr className="even:bg-muted m-0 border-t p-0">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Total Lockup Needed
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {formatFraction({
                value: data?.lockup ?? 0n,
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export function FileUpload() {
  const { address } = useAccount()
  const [hash, setHash] = useState<string | null>(null)
  const [size, setSize] = useState(0n)
  const [dataSet, setDataSet] = useState<string | undefined>(undefined)

  const { data: providers } = warmStorage.useProvidersWithDataSets({
    address,
  })
  const dataSets = providers?.flatMap((provider) => provider.dataSets) ?? []
  useEffect(() => {
    if (!dataSet && dataSets.length > 0) {
      setDataSet(dataSets[0].pdpDatasetId.toString())
    }
  }, [dataSets])

  const { data: allowance, isPending } = warmStorage.useEstimateLockup({
    sizeInBytes: size,
    withCDN:
      dataSets.find((d) => d.pdpDatasetId.toString() === dataSet)?.cdn ?? false,
  })

  const {
    mutate: upload,
    isPending: isUploading,
    error: uploadError,
    reset: uploadReset,
  } = warmStorage.useUpload({
    onHash: (hash) => {
      setHash(hash)
    },
    mutation: {
      onSettled: () => {
        setHash(null)
      },
    },
  })

  const needsCreationFee = dataSets?.length === 0
  const costPerMonth = needsCreationFee
    ? (allowance?.costs.perMonth ?? 0n) + DATA_SET_CREATION_FEE
    : (allowance?.costs.perMonth ?? 0n)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const fileInput = e.currentTarget.elements.namedItem(
      'file'
    ) as HTMLInputElement

    const dataSetInput = e.currentTarget.elements.namedItem(
      'data-set'
    ) as HTMLSelectElement

    const dataSetId = BigInt(dataSetInput.value)

    if (fileInput.files && dataSetId) {
      const file = fileInput.files[0]
      upload({ file, dataSetId })
    }
  }

  return dataSet ? (
    <form onSubmit={onSubmit}>
      <h3 className="text-lg font-bold">Upload File</h3>
      <div className="grid w-full max-w-sm items-center gap-3 my-4">
        <Label htmlFor="data-set">Data Set</Label>
        <Select
          name="data-set"
          onValueChange={(value) => {
            setDataSet(value)
          }}
          value={dataSet}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a data set" />
          </SelectTrigger>
          <SelectContent>
            {providers?.map((provider) => (
              <SelectGroup key={provider.providerId}>
                <SelectLabel>{provider.name}</SelectLabel>
                {provider.dataSets.map((dataSet) => (
                  <SelectItem
                    key={dataSet.clientDataSetId}
                    value={dataSet.pdpDatasetId.toString()}
                  >
                    # {dataSet.pdpDatasetId} {dataSet.cdn ? 'CDN' : ''}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
        <Label htmlFor="file">File to Upload</Label>
        <Input
          id="file"
          onChange={(e) => {
            uploadReset()
            const fileInput = e.currentTarget as HTMLInputElement
            if (fileInput.files) {
              const file = fileInput.files[0]
              setSize(BigInt(file.size))
            }
          }}
          type="file"
        />
        <ButtonLoading
          // disabled={!allowance?.sufficient}
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
        <HashAlert hash={hash} />
      </div>
    </form>
  ) : (
    <Skeleton className="w-full h-50" />
  )
}

export function OperatorApprovals({
  operator,
}: {
  operator: payments.OperatorApprovalsResult
}) {
  return (
    <>
      {operator.isApproved ? (
        <>
          <p className="text-muted-foreground text-sm">
            Website:{' '}
            <a
              className="text-gray-400 hover:underline"
              href="https://filecoin.services/warmstorage "
              rel="noopener noreferrer"
              target="_blank"
            >
              filecoin.services/warmstorage
            </a>
          </p>
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
    </>
  )
}
