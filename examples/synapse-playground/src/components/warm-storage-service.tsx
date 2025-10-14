import { warmStorage } from 'iso-filecoin-synapse'
import { useAccount } from 'wagmi'
import { Separator } from './ui/separator'
import { Skeleton } from './ui/skeleton'
import { DataSetsSection } from './warm-storage/data-sets-section'
import { UploadsSection } from './warm-storage/uploads-section'

export function WarmStorageService() {
  const { address } = useAccount()
  const { data: providers } = warmStorage.useProviders()

  const { data: dataSets } = warmStorage.useDataSets({
    address,
  })

  return (
    <>
      {dataSets && providers ? (
        <>
          {dataSets?.length > 0 && (
            <>
              <UploadsSection dataSets={dataSets} providers={providers} />
              <Separator className="my-4" />
            </>
          )}
          <DataSetsSection dataSets={dataSets} providers={providers} />
        </>
      ) : (
        <Skeleton className="w-full h-20" />
      )}
    </>
  )
}
