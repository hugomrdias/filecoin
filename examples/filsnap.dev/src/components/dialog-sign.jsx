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
import { useSign } from 'iso-filecoin-react'
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
    sign(utf8.decode(data.message))

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
      <Dialog.Content maxWidth="350px" onEscapeKeyDown={() => setIsOpen(false)}>
        <Dialog.Title>Sign</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Sign a message.
        </Dialog.Description>

        <form onSubmit={handleSubmit(onSubmit)} onFocus={() => resetSign()}>
          <Flex direction="column" gap="3">
            <label htmlFor="recipient">
              <Text as="div" size="2" mb="1" weight="bold">
                Message
              </Text>
              <TextField.Root
                size="3"
                data-1p-ignore
                autoComplete="off"
                placeholder="Hello world"
                {...register('message', {
                  required: 'Message is required',
                })}
              />
            </label>
            {errors.message && <ErrorBox msg={errors.message.message} />}
            {error && <ErrorBox msg={error.message} />}
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Button title="Sign message" type="submit" loading={isPending}>
              Sign
            </Button>
          </Flex>
        </form>
        {data && (
          <InfoBox>
            <strong>Signature:</strong>{' '}
            <Code variant="soft">{data.toLotusHex()}</Code>
            <IconButton
              size="1"
              aria-label="Copy value"
              color="gray"
              variant="ghost"
              onClick={() => onCopy(data.toLotusHex())}
            >
              <Icons.CopyIcon width={16} height={16} />
            </IconButton>
          </InfoBox>
        )}
        <Dialog.Close>
          <button type="button" className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}
