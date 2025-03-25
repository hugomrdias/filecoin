import { Avatar, Box, Card, Flex, Heading, Select } from '@radix-ui/themes'
import { useAccount, useChangeNetwork } from 'iso-filecoin-react'
import * as Chains from 'iso-filecoin/chains'
import { useSwitchChain } from 'wagmi'
import { CardFevm } from './components/card-fevm.jsx'
import { CardFil } from './components/card-fil.jsx'
import { CardInfo } from './components/card-info.jsx'
/**
 * App component.
 */
export default function App() {
  const changeNetwork = useChangeNetwork()
  const { network } = useAccount()
  const { switchChain } = useSwitchChain()

  return (
    <main className="App">
      <Box maxWidth="880px" mx="auto" mt="6" px="6">
        <Card>
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src="/filecoin-logo.svg"
              radius="full"
              fallback="T"
            />
            <Box>
              <Heading as="h1" size="5">
                Filsnap{' '}
              </Heading>
            </Box>
            <Flex flexGrow="1" justify="end">
              <Select.Root
                size="2"
                value={network}
                disabled={changeNetwork.isPending}
                onValueChange={async (value) => {
                  const network =
                    /** @type {import('iso-filecoin/types').Network} */ (value)
                  await changeNetwork.mutateAsync(network)
                  switchChain({
                    chainId: Chains[network].id,
                  })
                }}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="mainnet">Mainnet</Select.Item>
                  <Select.Item value="testnet">Testnet</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>
          </Flex>
        </Card>
      </Box>
      <Flex
        gap="4"
        mx="auto"
        mt="6"
        px="6"
        maxWidth="880px"
        wrap={{ initial: 'wrap', xs: 'nowrap' }}
        direction="row"
      >
        <CardFil />
        <CardFevm />
      </Flex>

      <Box maxWidth="880px" mx="auto" mt="6" px="6">
        <CardInfo />
      </Box>
    </main>
  )
}
