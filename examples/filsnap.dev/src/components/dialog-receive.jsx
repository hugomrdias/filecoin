import { CopyIcon, Cross2Icon } from '@radix-ui/react-icons'
import {
  Button,
  Code,
  Dialog,
  Flex,
  IconButton,
  Switch,
  Text,
} from '@radix-ui/themes'
import { Cuer } from 'cuer'
import { useState } from 'react'
import { onCopy } from './common.jsx'
import * as Icons from './icons'

/**
 * @param {Object} DialogReceiveProps
 * @param {boolean} DialogReceiveProps.disabled
 * @param {string} [DialogReceiveProps.address]
 * @param {string} [DialogReceiveProps.otherAddress]
 */
export function DialogReceive({ disabled = false, address, otherAddress }) {
  const [isOpen, setIsOpen] = useState(false)
  const [is0x, setIs0x] = useState(address?.startsWith('0x'))

  let addressToShow = address
  if (address?.startsWith('0x')) {
    addressToShow = is0x ? address : otherAddress
  } else {
    addressToShow = is0x ? otherAddress : address
  }

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        setIsOpen(open)
      }}
      open={isOpen}
    >
      <Dialog.Trigger disabled={disabled}>
        <Button onClick={() => setIsOpen(true)} size="3" variant="soft">
          <Icons.QrCode height={20} width={20} /> Receive
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="350px" onEscapeKeyDown={() => setIsOpen(false)}>
        <Dialog.Title>Receive ⨎</Dialog.Title>
        <Dialog.Description mb="4" size="2">
          Scan the QR code to receive FIL.
        </Dialog.Description>
        <Text as="label" size="2">
          <Flex gap="2" my="4">
            <Switch checked={is0x} onCheckedChange={setIs0x} size="1" />
            Show 0x address
          </Flex>
        </Text>
        <Flex align="center" direction="column" gap="6" justify="center">
          <Cuer
            arena={
              addressToShow?.startsWith('0x') ? (
                <Icons.TokenEthereum />
              ) : (
                <Icons.TokenFilecoin />
              )
            }
            value={addressToShow ?? ''}
          />
          <Flex align="center" gap="2" justify="center">
            <Code
              style={{ maxWidth: '300px', padding: '0.5rem' }}
              variant="soft"
            >
              {addressToShow}
            </Code>
            <IconButton
              aria-label="Copy value"
              color="gray"
              size="1"
              variant="ghost"
            >
              <CopyIcon onClick={() => onCopy(addressToShow)} />
            </IconButton>
          </Flex>
        </Flex>
        <Dialog.Close>
          <button aria-label="Close" className="IconButton" type="button">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}
