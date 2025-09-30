import { warmStorage } from 'iso-filecoin-synapse'

import { useAccount } from 'wagmi'
import { PDPLink } from '../pdp-link'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { CreateDataSetDialog } from './create-data-set'

export function DataSetsSection() {
  const account = useAccount()
  const { data: providers } = warmStorage.useProviders()

  const { data: dataSets } = warmStorage.useDataSets({
    address: account.address,
  })

  const providerWithDataSets = providers?.filter((p) =>
    dataSets?.some((d) => d.providerId === p.providerId)
  )

  return providers ? (
    <div>
      <div className="flex flex-row gap-2 items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="leading-none font-semibold">Data Sets</div>
          <div className="text-muted-foreground text-sm">
            Manage your data sets.
          </div>
        </div>
        <CreateDataSetDialog />
      </div>

      <div className="flex flex-col gap-2 mt-6">
        {providerWithDataSets?.map((provider) => (
          <div className="flex flex-col gap-4" key={provider.providerId}>
            <h4 className="text-lg font-bold">{provider.name}</h4>
            {dataSets
              ?.filter((dataSet) => dataSet.providerId === provider.providerId)
              .map((dataSet) => (
                <div
                  className="flex flex-col gap-2"
                  key={dataSet.clientDataSetId}
                >
                  <p>
                    <PDPLink id={dataSet.pdpDatasetId.toString()} />{' '}
                    {dataSet.cdn ? 'with CDN' : ''} ({dataSet.nextPieceId}{' '}
                    pieces)
                  </p>
                  {dataSet.pieces.map((piece) => (
                    <div
                      className="flex flex-row gap-2 justify-between items-center rounded-md py-2 px-4 bg-muted"
                      key={piece.pieceId}
                    >
                      <p className="text-xs break-all">{piece.pieceCid}</p>
                      <Button
                        onClick={() => {
                          window.open(piece.pieceUrl, '_blank')
                        }}
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Skeleton className="w-full h-20" />
  )
}
