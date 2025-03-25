import { CopyIcon, Cross2Icon } from '@radix-ui/react-icons'
import { Button, Code, Dialog, Flex, IconButton } from '@radix-ui/themes'
import { Cuer } from 'cuer'
import { onCopy } from './common.jsx'
import * as Icons from './icons'

import { useState } from 'react'

/**
 * @param {Object} DialogReceiveProps
 * @param {boolean} DialogReceiveProps.disabled
 * @param {string} [DialogReceiveProps.address]
 */
export function DialogReceive({ disabled = false, address }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
      }}
    >
      <Dialog.Trigger disabled={disabled}>
        <Button variant="soft" onClick={() => setIsOpen(true)} size="3">
          <Icons.QrCode width={20} height={20} /> Receive
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="350px" onEscapeKeyDown={() => setIsOpen(false)}>
        <Dialog.Title>Receive ⨎</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Scan the QR code to receive FIL.
        </Dialog.Description>

        <Flex direction="column" gap="6" justify="center" align="center">
          <Cuer
            arena={
              address?.startsWith('0x') ? (
                <Icons.TokenEthereum />
              ) : (
                <Icons.TokenFilecoin />
              )
            }
            value={address ?? ''}
          />
          <Flex align="center" gap="2" justify="center">
            <Code variant="soft" style={{ maxWidth: '300px' }}>
              {address}
            </Code>
            <IconButton
              size="1"
              aria-label="Copy value"
              color="gray"
              variant="ghost"
            >
              <CopyIcon onClick={() => onCopy(address)} />
            </IconButton>
          </Flex>
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
