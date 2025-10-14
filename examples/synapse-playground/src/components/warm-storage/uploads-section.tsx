import { warmStorage } from 'iso-filecoin-synapse'
import { useEffect, useState } from 'react'
import { ErrorAlert, HashAlert } from '../custom-ui/alerts'
import { ButtonLoading } from '../custom-ui/button-loading'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Skeleton } from '../ui/skeleton'

export function UploadsSection({
  dataSets,
  providers,
}: {
  dataSets?: warmStorage.DataSetWithPieces[]
  providers?: warmStorage.UseProvidersResult
}) {
  const [hash, setHash] = useState<string | null>(null)
  const [dataSet, setDataSet] = useState<string | undefined>(undefined)

  const providerWithDataSets = providers?.map((provider) => ({
    ...provider,
    dataSets: dataSets?.filter((d) => d.providerId === provider.providerId),
  }))

  useEffect(() => {
    if (!dataSet && dataSets && dataSets.length > 0) {
      setDataSet(dataSets[0].pdpDatasetId.toString())
    }
  }, [dataSets])

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
      console.log('🚀 ~ onSubmit ~ fileInput.files:', fileInput.files)

      // upload({
      //   files: Array.from(fileInput.files),
      //   dataSetId,
      //   sessionKey: sessionKey,
      // })
      upload({ files: Array.from(fileInput.files), dataSetId })
    }
  }

  return dataSet ? (
    <form onSubmit={onSubmit}>
      <div className="leading-none font-semibold">Upload File</div>
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
            {providerWithDataSets?.map((provider) => (
              <SelectGroup key={provider.providerId}>
                <SelectLabel>{provider.name}</SelectLabel>
                {provider.dataSets?.map((dataSet) => (
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
          multiple
          onChange={() => {
            uploadReset()
          }}
          type="file"
        />
        <ButtonLoading disabled={!dataSet} loading={isUploading} type="submit">
          Upload
        </ButtonLoading>

        <ErrorAlert error={uploadError} />
        <HashAlert hash={hash} />
      </div>
    </form>
  ) : (
    <Skeleton className="w-full h-50" />
  )
}
