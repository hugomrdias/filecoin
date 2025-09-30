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
import * as Address from 'iso-filecoin/address'
import { Token } from 'iso-filecoin/token'
import { useAccount as useAccountFil, useAddresses } from 'iso-filecoin-react'
import { useState } from 'react'
import { useAccount, useBalance, useDisconnect } from 'wagmi'
import { AddressItem, balanceInUSD, usePrice } from './common.jsx'
import { DialogConnectFEVM } from './dialog-connect-fevm.jsx'
import { DialogForward } from './dialog-forward.jsx'
import { DialogReceive } from './dialog-receive.jsx'
import { DialogSignEVM } from './dialog-sign-evm.jsx'
import * as Icons from './icons.jsx'
export function CardFevm() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <Box width={{ initial: '100%', xs: '50%' }}>
      <Card>
        {address && (
          <Tooltip content="Disconnect Wallet">
            <IconButton
              aria-label="Close"
              className="TopCornerButton"
              color="red"
              onClick={() => disconnect()}
              radius="full"
              variant="soft"
            >
              <ExitIcon />
            </IconButton>
          </Tooltip>
        )}
        <Flex direction="column" gap="1" p="1">
          <Flex align="center" gap="2">
            <Icons.TokenEthereum />
            <Heading size="3">FEVM Wallet</Heading>
          </Flex>
          <Text color="gray" size="1">
            {address
              ? 'Connected to MetaMask'
              : 'Connect your wallet to start using the Filecoin EVM.'}
          </Text>
          <Flex justify="center" mb="4" mt="6">
            {address ? <Account /> : <DialogConnectFEVM />}
          </Flex>
        </Flex>
      </Card>
    </Box>
  )
}

function Account() {
  const { network, state, chain } = useAccountFil()
  const { disconnect } = useDisconnect()
  const { address } = useAccount()
  const { data } = useBalance({ address })
  // @ts-expect-error
  const { addressId } = useAddresses({ address })
  const { data: price } = usePrice()
  const [isSignOpen, setIsSignOpen] = useState(false)

  return (
    <Flex direction="column" gap="6">
      <Flex gap="6" justify="center">
        <Skeleton loading={!data}>
          <Flex direction="column" gap="1">
            <Heading color="gray" size="1">
              BALANCE
            </Heading>
            <Heading size="4">
              {Token.fromAttoFIL(data?.value ?? 0n)
                .toFIL()
                .toFormat({ decimalPlaces: 1 })}{' '}
              {data?.symbol}
            </Heading>
            <Text color="gray" size="2">
              {balanceInUSD(data?.value ?? 0n, price)}
            </Text>
          </Flex>
        </Skeleton>
        <Skeleton loading={!address}>
          <Flex direction="column" gap="2">
            <Heading color="gray" size="1">
              ADDRESSES
            </Heading>
            <DataList.Root size="1">
              <AddressItem address={address} type="eth" />
              <AddressItem
                address={Address.fromEthAddress(
                  /** @type {string} */ (address),
                  network
                ).toString()}
                type="fil"
              />
              <AddressItem address={addressId.data?.toString()} type="id" />
            </DataList.Root>
          </Flex>
        </Skeleton>
      </Flex>
      <Flex direction="row" gap="3" justify="center">
        <DialogForward
          balance={
            Number(
              Token.fromAttoFIL(data?.value ?? 0n)
                .toFIL()
                .toFormat({ decimalPlaces: 1 })
            ) ?? 0
          }
          disabled={state === 'reconnecting'}
        />
        <DialogReceive
          address={address}
          disabled={state === 'reconnecting'}
          otherAddress={addressId.data?.toString()}
        />
        <DialogSignEVM isOpen={isSignOpen} setIsOpen={setIsSignOpen} />
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
            <DropdownMenu.Item color="red" onClick={() => disconnect()}>
              Disconnect
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Flex>
  )
}
