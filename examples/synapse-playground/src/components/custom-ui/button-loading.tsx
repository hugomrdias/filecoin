import { Loader2 } from 'lucide-react'
import type * as React from 'react'
import { Button } from '@/components/ui/button'

function ButtonLoading({
  loading = false,
  children,
  ...props
}: React.ComponentProps<typeof Button> & {
  loading?: boolean
}) {
  return (
    <Button disabled={loading} {...props}>
      {loading ? <Loader2 className="animate-spin" /> : children}
    </Button>
  )
}

export { ButtonLoading }
