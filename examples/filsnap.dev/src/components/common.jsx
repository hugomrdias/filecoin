import { CrossCircledIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import {
  Callout,
  Code,
  DataList,
  Flex,
  IconButton,
  Link,
} from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'iso-filecoin-react'
import { Token } from 'iso-filecoin/token'
import { shortAddress } from '../common.js'
import * as Icons from './icons.jsx'

/**
 * Displays an error message in a styled box
 *
 * @param {object} param0
 * @param {string} [param0.msg] - Error message to display
 */
export function ErrorBox({ msg }) {
  return (
    <Callout.Root color="red" size="1">
      <Callout.Icon>
        <CrossCircledIcon />
      </Callout.Icon>
      <Callout.Text>{msg}</Callout.Text>
    </Callout.Root>
  )
}

/**
 * Displays an info message in a styled box
 *
 * @param {object} param0
 * @param {React.ReactNode} param0.children - Info message to display
 */
export function InfoBox({ children }) {
  return (
    <Callout.Root color="blue" size="1" mt="4">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  )
}

/**
 * Displays a link to the explorer for a given hash
 *
 * @param {Object} param0
 * @param {string} param0.hash - Hash to display
 */
export function ExplorerLink({ hash }) {
  const { chain } = useAccount()
  return (
    <Link
      href={`${chain.blockExplorers?.default?.url}/tx/${hash}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {hash}
    </Link>
  )
}

/**
 * Copies an address to the clipboard
 *
 * @param {string} [address] - Address to copy
 */
export function onCopy(address = '') {
  navigator.clipboard.writeText(address)
}

/**
 * Converts a balance in attoFIL to USD
 *
 * @param {bigint} balance - Balance in attoFIL
 * @param {number} [price] - Price of Filecoin in USD
 * @returns {string} Balance in USD
 */
export function balanceInUSD(balance, price = 0) {
  const balanceFIL = Number(
    Token.fromAttoFIL(balance ?? 0n)
      .toFIL()
      .toFormat({ decimalPlaces: 1 })
  )

  return Number(balanceFIL * price).toFixed(2)
}

/**
 * @param {Object} AddressItemProps
 * @param {string | undefined} AddressItemProps.address
 * @param {'fil' | 'eth' | 'id'} AddressItemProps.type
 */
export function AddressItem({ address, type }) {
  const Icon =
    type === 'fil'
      ? Icons.TokenFilecoin
      : type === 'eth'
        ? Icons.TokenEthereum
        : Icons.TokenId
  return (
    <DataList.Item>
      <DataList.Label minWidth="16px">
        <Icon width={16} height={16} />
      </DataList.Label>
      <DataList.Value>
        <Flex align="center" gap="2">
          <Code variant="soft">{shortAddress(address)}</Code>
          <IconButton
            size="1"
            aria-label="Copy value"
            color="gray"
            variant="ghost"
            onClick={() => onCopy(address ?? '...')}
          >
            <Icons.CopyIcon width={16} height={16} />
          </IconButton>
        </Flex>
      </DataList.Value>
    </DataList.Item>
  )
}

export function usePrice() {
  return useQuery({
    queryKey: ['filecoin-price1'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=filecoin&vs_currencies=usd'
      )
      const json = await response.json()

      return json.filecoin.usd
    },
    staleTime: 5 * 60 * 1000,
  })
}
