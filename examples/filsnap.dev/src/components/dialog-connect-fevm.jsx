import { Cross2Icon, InfoCircledIcon, Link2Icon } from '@radix-ui/react-icons'
import {
  Avatar,
  Box,
  Button,
  Callout,
  Card,
  Dialog,
  Flex,
  Skeleton,
  Text,
} from '@radix-ui/themes'
import { useAccount } from 'iso-filecoin-react'
import { useEffect, useState } from 'react'
import { useConnect } from 'wagmi'

export function DialogConnectFEVM() {
  const { chain } = useAccount()
  const { connectors, connect, isSuccess, error, reset, isPending } =
    useConnect()

  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false)
    }
  }, [isSuccess])

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) {
          reset()
        }
      }}
    >
      <Dialog.Trigger>
        <Button
          onClick={() => setIsOpen(true)}
          loading={isPending}
          variant="soft"
        >
          <Link2Icon /> Connect FEVM
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px" onEscapeKeyDown={() => setIsOpen(false)}>
        <Dialog.Title>Connect a FEVM wallet</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Choose your preferred wallet.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          {connectors.map((connector) => (
            <Skeleton loading={isPending} key={connector.name}>
              <Box key={connector.name}>
                <Card asChild autoFocus>
                  {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
                  <a
                    href="#"
                    onClick={() =>
                      connect({
                        connector,
                        chainId: chain?.id,
                      })
                    }
                  >
                    <Flex gap="3" align="center">
                      <Avatar
                        fallback="M"
                        src={connector.icon}
                        style={{ objectFit: 'contain' }}
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold">
                          {connector.name}
                        </Text>
                        <Text as="div" color="gray" size="2">
                          Start building your next project in minutes
                        </Text>
                      </Box>
                    </Flex>
                  </a>
                </Card>
              </Box>
            </Skeleton>
          ))}

          {error && (
            <Callout.Root color="red">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>{error.message}</Callout.Text>
            </Callout.Root>
          )}
        </Flex>
        <Dialog.Close>
          <button type="button" className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}
