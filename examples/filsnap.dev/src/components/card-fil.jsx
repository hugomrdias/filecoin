import { ExitIcon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Card,
  DataList,
  DropdownMenu,
  Flex,
  Heading,
  IconButton,
  Skeleton,
  Text,
  Tooltip,
} from '@radix-ui/themes'
import {
  useAccount,
  useAddresses,
  useBalance,
  useDisconnect,
} from 'iso-filecoin-react'
import { useState } from 'react'
import { AddressItem, balanceInUSD, usePrice } from './common.jsx'
import { DialogChangeAccount } from './dialog-change-account.jsx'
import { DialogConnect } from './dialog-connect.jsx'
import { DialogReceive } from './dialog-receive.jsx'
import { DialogSend } from './dialog-send.jsx'
import { DialogSign } from './dialog-sign.jsx'
import * as Icons from './icons'
export function CardFil() {
  const disconnect = useDisconnect()
  const { account, adapter } = useAccount()

  return (
    <Box width={{ initial: '100%', xs: '50%' }}>
      <Card>
        {account && (
          <Tooltip content="Disconnect Wallet">
            <IconButton
              aria-label="Close"
              className="TopCornerButton"
              color="red"
              onClick={() => disconnect.mutate()}
              radius="full"
              variant="soft"
            >
              <ExitIcon />
            </IconButton>
          </Tooltip>
        )}
        <Flex direction="column" gap="1" p="1">
          <Flex align="center" gap="2">
            <Icons.TokenFilecoin />
            <Heading size="3">Filecoin Wallet</Heading>
          </Flex>
          <Text color="gray" size="1">
            {account
              ? `Connected to ${adapter?.name}`
              : 'Connect your wallet to start using the Filecoin.'}
          </Text>
          <Flex justify="center" mb="4" mt="6">
            {account ? <Account /> : <DialogConnect />}
          </Flex>
        </Flex>
      </Card>
    </Box>
  )
}

function Account() {
  const balance = useBalance()
  const disconnect = useDisconnect()
  const { state, chain, adapter, address } = useAccount()
  const { address0x, addressId } = useAddresses({
    address,
  })
  const { data: price } = usePrice()
  const [isSignOpen, setIsSignOpen] = useState(false)
  const [isChangeAccountOpen, setIsChangeAccountOpen] = useState(false)

  return (
    <Flex direction="column" gap="6">
      <Flex gap="6" justify="center">
        <Skeleton loading={state === 'reconnecting'}>
          <Flex direction="column" gap="1">
            <Heading color="gray" size="1">
              BALANCE
            </Heading>
            <Heading size="4">
              {balance.data?.value?.toFIL().toFormat({ decimalPlaces: 1 }) ??
                '...'}{' '}
              {balance.data?.symbol}
            </Heading>
            <Text color="gray" size="2">
              {balanceInUSD(balance.data?.value.toBigInt() ?? 0n, price)}
            </Text>
          </Flex>
        </Skeleton>
        <Skeleton loading={state === 'reconnecting'}>
          <Flex direction="column" gap="2">
            <Heading color="gray" size="1">
              ADDRESSES
            </Heading>
            <DataList.Root size="1">
              <AddressItem address={address} type="fil" />
              <AddressItem address={address0x.data?.toString()} type="eth" />
              <AddressItem address={addressId.data?.toString()} type="id" />
            </DataList.Root>
          </Flex>
        </Skeleton>
      </Flex>
      <Flex direction="row" gap="3" justify="center">
        <DialogSend
          balance={Number(
            balance.data?.value?.toFIL().toFormat({ decimalPlaces: 1 }) ?? 0
          )}
          disabled={state === 'reconnecting'}
        />
        <DialogReceive
          address={address}
          disabled={state === 'reconnecting'}
          otherAddress={address0x.data?.toString()}
        />
        <DialogSign isOpen={isSignOpen} setIsOpen={setIsSignOpen} />
        <DialogChangeAccount
          isOpen={isChangeAccountOpen}
          setIsOpen={setIsChangeAccountOpen}
        />
        <DropdownMenu.Root>
          <DropdownMenu.Trigger disabled={state === 'reconnecting'}>
            <Button size="3" variant="soft">
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item onClick={() => setIsSignOpen(true)}>
              Sign
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => setIsChangeAccountOpen(true)}>
              Change Account
            </DropdownMenu.Item>
            {adapter?.id === 'filsnap' && (
              <DropdownMenu.Item
                // @ts-expect-error
                onClick={() => adapter.filsnap.exportPrivateKey()}
              >
                Export Private Key
              </DropdownMenu.Item>
            )}
            <DropdownMenu.Item asChild>
              <a
                href={`${chain.blockExplorers?.default?.url}/address/${address}`}
                rel="noreferrer"
                target="_blank"
              >
                Explorer
              </a>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item color="red" onClick={() => disconnect.mutate()}>
              Disconnect
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Flex>
  )
}
