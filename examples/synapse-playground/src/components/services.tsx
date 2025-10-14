import { payments } from 'iso-filecoin-synapse'
import { useAccount } from 'wagmi'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from './ui/skeleton'
import { StorageApproveButton } from './warm-storage/storage-approve-button'
import { StorageMenu } from './warm-storage/storage-menu'
import { WarmStorageService } from './warm-storage-service'

export function Services() {
  const { address } = useAccount()
  const { data, isLoading } = payments.useOperatorApprovals({
    address,
  })
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Storage</CardTitle>
        <CardDescription>Manage your storage service</CardDescription>
        <CardAction>
          <StorageMenu />
        </CardAction>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="w-full h-20" />
        ) : data?.isApproved ? (
          <WarmStorageService />
        ) : (
          <StorageApproveButton />
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  )
}
