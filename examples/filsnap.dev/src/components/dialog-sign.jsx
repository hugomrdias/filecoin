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
import { utf8 } from 'iso-base/utf8'
import { useAccount, useSign } from 'iso-filecoin-react'
import { useForm } from 'react-hook-form'
import { ErrorBox, InfoBox, onCopy } from './common.jsx'
import * as Icons from './icons.jsx'
/**
 * @typedef {Object} Inputs
 * @property {string} message
 */

/**s
 * Dialog for signing a message
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.setIsOpen
 */
export function DialogSign({ isOpen, setIsOpen }) {
  const { adapter } = useAccount()
  const { mutate: sign, isPending, error, reset: resetSign, data } = useSign()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = /** @type {import('react-hook-form').UseFormReturn<Inputs>} */ (
    useForm({
      defaultValues: {
        message: '',
      },
    })
  )

  /** @type {import('react-hook-form').SubmitHandler<Inputs>} */
  const onSubmit = (data) => {
    console.log('🚀 ~ onSubmit ~ data:', data)

    sign(utf8.decode(data.message))

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
        <Dialog.Title>Sign</Dialog.Title>
        <Dialog.Description mb="4" size="2">
          Sign a message.
        </Dialog.Description>

        <form onFocus={() => resetSign()} onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <label htmlFor="recipient">
              <Text as="div" mb="1" size="2" weight="bold">
                Message
              </Text>
              <TextField.Root
                autoComplete="off"
                data-1p-ignore
                placeholder="Hello world"
                size="3"
                {...register('message', {
                  required: 'Message is required',
                })}
              />
            </label>
            {errors.message && <ErrorBox msg={errors.message.message} />}
            {error && <ErrorBox msg={error.message} />}
          </Flex>
          {adapter?.id === 'ledger' && (
            <InfoBox>
              Enable "Bling sign" in your Ledger device to sign messages.
            </InfoBox>
          )}

          <Flex gap="3" justify="end" mt="4">
            <Button loading={isPending} title="Sign message" type="submit">
              Sign
            </Button>
          </Flex>
        </form>
        {data && (
          <InfoBox>
            <strong>Signature:</strong>{' '}
            <Code variant="soft">{data.toLotusHex()}</Code>
            <IconButton
              aria-label="Copy value"
              color="gray"
              onClick={() => onCopy(data.toLotusHex())}
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
