import { warmStorage } from 'iso-filecoin-synapse'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorAlert, HashAlert, SuccessAlert } from '../custom-ui/alerts'
import { ButtonLoading } from '../custom-ui/button-loading'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Separator } from '../ui/separator'
import { Switch } from '../ui/switch'

export function CreateDataSetDialog() {
  const [hash, setHash] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const { data: providers } = warmStorage.useProviders()
  const {
    data: createDataSetData,
    mutate: createDataSet,
    isPending,
    isSuccess,
    error,
    reset,
  } = warmStorage.useCreateDataSet({
    onHash: (hash) => {
      setHash(hash)
    },
    mutation: {
      onSuccess: () => {
        setOpen(false)
      },
      onSettled: () => {
        setHash(null)
      },
    },
  })

  const form = useForm<{
    provider: string
    cdn: boolean
  }>({
    values: {
      provider: providers?.[2]?.providerId.toString() ?? '',
      cdn: false,
    },
  })

  function onSubmit(values: { provider: string; cdn: boolean }) {
    const provider = providers?.find(
      (p) => p.providerId.toString() === values.provider
    )
    createDataSet({ provider: provider!, cdn: values.cdn })
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        setOpen(open)
        reset()
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button className="" variant="secondary">
          Create Data Set
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create Data Set</DialogTitle>
              <DialogDescription>
                Create a new data set to store your data.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-6">
              <FormField
                control={form.control}
                name="provider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provider</FormLabel>
                    <Select
                      defaultValue={field.value}
                      name="provider"
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select a provider" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {providers?.map((provider) => (
                          <SelectItem
                            key={provider.providerId}
                            value={provider.providerId.toString()}
                          >
                            # {provider.providerId} {provider.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Provider where the data set will be stored.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cdn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CDN</FormLabel>
                    <Switch
                      checked={field.value}
                      id="cdn"
                      onCheckedChange={field.onChange}
                    />
                    <FormDescription>
                      Enable CDN for the data set.{' '}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <HashAlert hash={hash} />
              <ErrorAlert error={error} />
              <SuccessAlert
                message={`Data set created: ${createDataSetData?.dataSetCreated ? createDataSetData.dataSetId : ''}`}
                show={isSuccess}
              />
              <Separator />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <ButtonLoading
                  className="sm:w-24 w-full"
                  loading={isPending}
                  type="submit"
                >
                  Create
                </ButtonLoading>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
