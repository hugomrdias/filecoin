import { Plus } from 'lucide-react'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { Button } from './ui/button'
import { WarmStorageService } from './warm-storage-service'

export function Services() {
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Services</CardTitle>
        <CardDescription>Manage your services</CardDescription>
        <CardAction>
          <Button className="size-8" size="icon" variant="secondary">
            <Plus />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Accordion
          className="w-full"
          collapsible
          defaultValue="item-1"
          type="single"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="items-center">
              <div className="flex flex-col">
                <p className=" font-bold">Warm Storage</p>
                <p className="text-xs text-muted-foreground">
                  Store your data on the Filecoin network.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <WarmStorageService />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Stratus Cloud</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Stratus Cloud is a service that allows you to store your data on
                the Filecoin network.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  )
}
