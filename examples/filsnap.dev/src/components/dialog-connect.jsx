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
  TextField,
} from '@radix-ui/themes'
import * as bip39 from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'
import clsx from 'clsx'
import { useConnect } from 'iso-filecoin-react'
import { WalletAdapterHd } from 'iso-filecoin-wallets'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Icons from './icons.jsx'
/**
 *
 * @param {import('iso-filecoin-wallets/types').WalletAdapter} adapter
 * @returns
 */
function descriptionFromAdapter(adapter) {
  switch (adapter.id) {
    case 'ledger':
      return 'Connect your Ledger device'
    case 'filsnap':
      if (adapter.support === 'NotDetected') {
        return 'Install MetaMask Extension and refresh the page'
      }
      return 'Connect to MetaMask Filecoin Wallet'
    case 'hd':
      return 'Connect to an in-browser burner wallet'
    default:
      return 'Connect your wallet'
  }
}

/**
 * @param {{ id: any; }} adapter
 */
function iconFromAdapter(adapter) {
  switch (adapter.id) {
    case 'filsnap':
      return <Icons.MetaMask width={40} height={40} />
    case 'ledger':
      return <Icons.Ledger width={40} height={40} />
    case 'hd':
      return <Icons.Burner width={40} height={40} />
    default:
      return <Icons.Wallet width={40} height={40} />
  }
}

export function DialogConnect() {
  const {
    error,
    adapters,
    mutate: connect,
    isSuccess,
    isPending,
    loading,
    reset,
  } = useConnect()

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
        <Button onClick={() => setIsOpen(true)} loading={loading}>
          <Link2Icon /> Connect
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px" onEscapeKeyDown={() => setIsOpen(false)}>
        <Dialog.Title>Connect a wallet</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Choose your preferred Filecoin wallet.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          {adapters.map((adapter) => (
            <AdapterItem
              key={adapter.uid}
              adapter={adapter}
              loading={loading}
              isPending={isPending}
              connect={connect}
            />
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

/**
 * Adapter item component
 *
 * @param {object} param0
 * @param {import('iso-filecoin-wallets/types').WalletAdapter} param0.adapter
 * @param {boolean} param0.loading
 * @param {boolean} param0.isPending
 * @param {(props: {adapter: import('iso-filecoin-wallets/types').WalletAdapter}) => void} param0.connect
 * @returns
 */
export function AdapterItem({ adapter, loading, isPending, connect }) {
  const [isHdBurnerOpen, setIsHdBurnerOpen] = useState(false)
  return (
    <Skeleton loading={loading || isPending}>
      <DialogHdBurner
        isOpen={isHdBurnerOpen}
        setIsOpen={setIsHdBurnerOpen}
        adapter={
          /** @type {import('iso-filecoin-wallets').WalletAdapterHd} */ (
            adapter
          )
        }
      />
      <Box>
        <Card
          asChild
          className={clsx({
            'WalletOption--disabled': adapter.support === 'NotDetected',
          })}
        >
          {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
          <a
            href="#"
            onClick={() => {
              if (WalletAdapterHd.is(adapter)) {
                setIsHdBurnerOpen(true)
              } else {
                connect({ adapter })
              }
            }}
          >
            <Flex gap="3" align="center">
              <Avatar
                fallback={adapter.id.slice(0, 2)}
                style={{ objectFit: 'contain' }}
                asChild
              >
                {iconFromAdapter(adapter)}
              </Avatar>
              <Box>
                <Text as="div" size="2" weight="bold">
                  {adapter.name}
                </Text>
                <Text as="div" color="gray" size="2">
                  {descriptionFromAdapter(adapter)}
                </Text>
              </Box>
            </Flex>
          </a>
        </Card>
      </Box>
    </Skeleton>
  )
}

/**
 * @typedef {Object} Inputs
 * @property {string} mnemonic
 * @property {string} password
 * @property {number} index
 */

/**
 * Dialog for HD Burner wallet
 *
 * @param {object} param0
 * @param {boolean} param0.isOpen
 * @param {import('iso-filecoin-wallets').WalletAdapterHd} param0.adapter
 * @param {(isOpen: boolean) => void} param0.setIsOpen
 * @returns
 */
export function DialogHdBurner({ isOpen, adapter, setIsOpen }) {
  const { error, mutate: connect } = useConnect()
  const {
    register,
    handleSubmit,
    formState: { errors },

    setValue,
    reset,
  } = /** @type {import('react-hook-form').UseFormReturn<Inputs>} */ (useForm())

  /** @type {import('react-hook-form').SubmitHandler<Inputs>} */
  const onSubmit = (data) => {
    adapter.setup({
      mnemonic: data.mnemonic,
      password: data.password,
      index: Number.isInteger(data.index) ? data.index : 0,
    })
    connect({
      adapter,
    })
    reset()
    return
  }

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
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Connect a burner wallet</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Enter the mnemonic of your hierarchical deterministic wallet burner
          wallet.
        </Dialog.Description>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <label htmlFor="Mnemonic">
              <Text as="div" size="2" mb="1" weight="bold">
                Mnemonic
              </Text>
              <TextField.Root
                size="3"
                data-1p-ignore
                autoComplete="off"
                placeholder="already turtle birth enroll since owner keep patch skirt drift any dinner"
                {...register('mnemonic', {
                  required: 'Mnemonic is required',
                  validate: (value) => {
                    return bip39.validateMnemonic(value, wordlist)
                      ? true
                      : 'Invalid mnemonic'
                  },
                })}
              />
            </label>
            {errors.mnemonic && (
              <Callout.Root color="red" size="1">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>{errors.mnemonic.message}</Callout.Text>
              </Callout.Root>
            )}
            <label htmlFor="Password">
              <Text as="div" size="2" mb="1" weight="bold">
                Password (optional)
              </Text>
              <TextField.Root
                size="3"
                data-1p-ignore
                autoComplete="off"
                placeholder="Enter your password"
                {...register('password')}
              />
            </label>
            <label htmlFor="Password">
              <Text as="div" size="2" mb="1" weight="bold">
                Address Index
              </Text>
              <TextField.Root
                type="number"
                size="3"
                defaultValue="0"
                placeholder="0"
                {...register('index')}
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Button
              title="Generate Burner Wallet"
              variant="soft"
              color="gray"
              type="button"
              onClick={() => {
                setValue('mnemonic', bip39.generateMnemonic(wordlist), {
                  shouldValidate: true,
                })
              }}
            >
              Generate
            </Button>
            <Button
              title="Import Burner Wallet"
              // disabled={!isValid}
              type="submit"
            >
              Import
            </Button>
          </Flex>
        </form>
        <Dialog.Close>
          <button type="button" className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
        {error && (
          <Callout.Root color="red" mt="4" size="1">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>{error.message}</Callout.Text>
          </Callout.Root>
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}
