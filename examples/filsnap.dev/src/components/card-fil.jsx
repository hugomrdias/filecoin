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
              color="red"
              variant="soft"
              radius="full"
              aria-label="Close"
              className="TopCornerButton"
              onClick={() => disconnect.mutate()}
            >
              <ExitIcon />
            </IconButton>
          </Tooltip>
        )}
        <Flex gap="1" p="1" direction="column">
          <Flex gap="2" align="center">
            <Icons.TokenFilecoin />
            <Heading size="3">Filecoin Wallet</Heading>
          </Flex>
          <Text color="gray" size="1">
            {account
              ? `Connected to ${adapter?.name}`
              : 'Connect your wallet to start using the Filecoin.'}
          </Text>
          <Flex mt="6" mb="4" justify="center">
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
  const { account, state, chain, adapter } = useAccount()
  const { address0x, addressId } = useAddresses()
  const { data: price } = usePrice()
  const [isSignOpen, setIsSignOpen] = useState(false)

  return (
    <Flex direction="column" gap="6">
      <Flex gap="6" justify="center">
        <Skeleton loading={state === 'reconnecting'}>
          <Flex gap="1" direction="column">
            <Heading size="1" color="gray">
              BALANCE
            </Heading>
            <Heading size="4">
              {balance.data?.value?.toFIL().toFormat({ decimalPlaces: 1 }) ??
                '...'}{' '}
              {balance.data?.symbol}
            </Heading>
            <Text size="2" color="gray">
              {balanceInUSD(balance.data?.value.toBigInt() ?? 0n, price)} USD
            </Text>
          </Flex>
        </Skeleton>
        <Skeleton loading={state === 'reconnecting'}>
          <Flex gap="2" direction="column">
            <Heading size="1" color="gray">
              ADDRESSES
            </Heading>
            <DataList.Root size="1">
              <AddressItem address={account?.address.toString()} type="fil" />
              <AddressItem address={address0x.data?.toString()} type="eth" />
              <AddressItem address={addressId.data?.toString()} type="id" />
            </DataList.Root>
          </Flex>
        </Skeleton>
      </Flex>
      <Flex direction="row" gap="3" justify="center">
        <DialogSend
          disabled={state === 'reconnecting'}
          balance={Number(
            balance.data?.value?.toFIL().toFormat({ decimalPlaces: 1 }) ?? 0
          )}
        />
        <DialogReceive
          disabled={state === 'reconnecting'}
          address={account?.address.toString()}
        />
        <DialogSign isOpen={isSignOpen} setIsOpen={setIsSignOpen} />
        <DropdownMenu.Root>
          <DropdownMenu.Trigger disabled={state === 'reconnecting'}>
            <Button variant="soft" size="3">
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item onClick={() => setIsSignOpen(true)}>
              Sign
            </DropdownMenu.Item>
            {adapter?.id === 'filsnap' && (
              <DropdownMenu.Item
                // @ts-ignore
                onClick={() => adapter.filsnap.exportPrivateKey()}
              >
                Export Private Key
              </DropdownMenu.Item>
            )}
            <DropdownMenu.Item asChild>
              <a
                href={`${chain.blockExplorers?.default?.url}/address/${account?.address.toString()}`}
                target="_blank"
                rel="noreferrer"
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
