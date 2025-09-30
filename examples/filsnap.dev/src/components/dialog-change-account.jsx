import { Cross2Icon } from '@radix-ui/react-icons'
import {
  Button,
  Code,
  Dialog,
  Flex,
  IconButton,
  Text,
  TextField,
} from '@radix-ui/themes'
import { useDeriveAccount } from 'iso-filecoin-react'
import { useForm } from 'react-hook-form'
import { ErrorBox, InfoBox, onCopy } from './common.jsx'
import * as Icons from './icons.jsx'

/**
 * @typedef {Object} Inputs
 * @property {number} account
 */

/**s
 * Dialog for signing a message
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.setIsOpen
 */
export function DialogChangeAccount({ isOpen, setIsOpen }) {
  const {
    mutate: deriveAccount,
    isPending,
    error,
    reset: resetSign,
    data,
  } = useDeriveAccount()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = /** @type {import('react-hook-form').UseFormReturn<Inputs>} */ (
    useForm({
      defaultValues: {
        account: 0,
      },
    })
  )

  /** @type {import('react-hook-form').SubmitHandler<Inputs>} */
  const onSubmit = (data) => {
    deriveAccount(data.account)

    reset()
    return
  }

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) {
          reset()
        }
      }}
      open={isOpen}
    >
      <Dialog.Content maxWidth="350px" onEscapeKeyDown={() => setIsOpen(false)}>
        <Dialog.Title>Change Account</Dialog.Title>
        <Dialog.Description mb="4" size="2">
          Change to a different account in your wallet.
        </Dialog.Description>

        <form onFocus={() => resetSign()} onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <label htmlFor="recipient">
              <Text as="div" mb="1" size="2" weight="bold">
                Account
              </Text>
              <TextField.Root
                autoComplete="off"
                data-1p-ignore
                placeholder="0"
                size="3"
                {...register('account', {
                  required: 'Account is required',
                  valueAsNumber: true,
                  validate: (value) => {
                    if (Number.isNaN(value) || value < 0) {
                      return 'Account must be a number and equal or greater than 0'
                    }

                    return true
                  },
                })}
              />
            </label>
            {errors.account && <ErrorBox msg={errors.account.message} />}
            {error && <ErrorBox msg={error.message} />}
          </Flex>

          <Flex gap="3" justify="end" mt="4">
            <Button loading={isPending} title="Change account" type="submit">
              Change account
            </Button>
          </Flex>
        </form>
        {data && (
          <InfoBox>
            <strong>New active account:</strong>{' '}
            <Code variant="soft">{data.address.toString()}</Code>
            <IconButton
              aria-label="Copy value"
              color="gray"
              onClick={() => onCopy(data.address.toString())}
              size="1"
              variant="ghost"
            >
              <Icons.CopyIcon height={16} width={16} />
            </IconButton>
          </InfoBox>
        )}

        <Dialog.Close>
          <button aria-label="Close" className="IconButton" type="button">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}
