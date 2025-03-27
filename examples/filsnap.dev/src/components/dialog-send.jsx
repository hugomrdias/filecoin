import { Cross2Icon, InfoCircledIcon } from '@radix-ui/react-icons'
import {
  Button,
  Callout,
  Dialog,
  Flex,
  Text,
  TextField,
} from '@radix-ui/themes'
import { useEstimateGas, useSendMessage } from 'iso-filecoin-react'
import * as Address from 'iso-filecoin/address'
import { Token } from 'iso-filecoin/token'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorBox, ExplorerLink, InfoBox } from './common.jsx'
import * as Icons from './icons.jsx'
/**
 * @typedef {Object} Inputs
 * @property {string} recipient
 * @property {number} amount
 */

/**s
 * Dialog for sending FIL
 *
 * @param {Object} DialogSendProps
 * @param {boolean} DialogSendProps.disabled
 * @param {number} DialogSendProps.balance
 */
export function DialogSend({ disabled = false, balance }) {
  const [isOpen, setIsOpen] = useState(false)
  const {
    error,
    mutateAsync: sendMessage,
    isPending,
    reset: resetSendMessage,
    data,
  } = useSendMessage()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    reset,
    setValue,
  } = /** @type {import('react-hook-form').UseFormReturn<Inputs>} */ (
    useForm({
      defaultValues: {
        recipient: '',
        amount: 0,
      },
    })
  )

  /** @type {import('react-hook-form').SubmitHandler<Inputs>} */
  const onSubmit = async (data) => {
    await sendMessage({
      to: data.recipient,
      value: Token.fromFIL(data.amount).toAttoFIL().toString(),
    })

    return
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) {
          reset()
          resetSendMessage()
        }
      }}
    >
      <Dialog.Trigger disabled={disabled}>
        <Button variant="soft" size="3" disabled={disabled}>
          <Icons.Send width={20} height={20} />
          Send
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="350px" onEscapeKeyDown={() => setIsOpen(false)}>
        <Dialog.Title>Send ⨎</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Send FIL to an address.
        </Dialog.Description>

        <form
          onSubmit={handleSubmit(onSubmit)}
          onFocus={() => resetSendMessage()}
        >
          <Flex direction="column" gap="3">
            <label htmlFor="recipient">
              <Text as="div" size="2" mb="1" weight="bold">
                Recipient
              </Text>
              <TextField.Root
                size="3"
                data-1p-ignore
                autoComplete="off"
                placeholder="f0, f1, f2, f3, f4 or 0x address"
                {...register('recipient', {
                  required: 'Recipient is required',
                  validate: (value) => {
                    try {
                      Address.from(value)
                      return true
                    } catch {
                      return 'Invalid recipient address'
                    }
                  },
                })}
              />
            </label>
            {errors.recipient && <ErrorBox msg={errors.recipient.message} />}
            <label htmlFor="Password">
              <Text as="div" size="2" mb="1" weight="bold">
                Amount
              </Text>
              <TextField.Root
                size="3"
                data-1p-ignore
                autoComplete="off"
                placeholder="FIL"
                {...register('amount', {
                  valueAsNumber: true,
                  required: 'Amount is required',
                  validate: (value) => {
                    if (Number.isNaN(value)) {
                      return 'Amount must be a number'
                    }

                    if (value <= 0) {
                      return 'Amount must be greater than 0'
                    }

                    if (value > balance) {
                      return 'Amount is bigger than account balance'
                    }

                    return true
                  },
                })}
              >
                <TextField.Slot side="right">
                  <Button
                    size="1"
                    variant="ghost"
                    onClick={() => {
                      setValue('amount', balance, {
                        shouldDirty: true,
                        shouldValidate: true,
                        shouldTouch: true,
                      })
                    }}
                  >
                    Max
                  </Button>
                </TextField.Slot>
              </TextField.Root>
            </label>
            {errors.amount && <ErrorBox msg={errors.amount.message} />}
            {error && <ErrorBox msg={error.message} />}
          </Flex>
          {isValid && !data && (
            <Estimation
              to={getValues('recipient')}
              value={Token.fromFIL(getValues('amount')).toBigInt()}
            />
          )}

          {data && (
            <InfoBox>
              <strong>Transaction ID:</strong> <ExplorerLink hash={data['/']} />
            </InfoBox>
          )}

          <Flex gap="3" mt="4" justify="end">
            <Button title="Send FIL" type="submit" loading={isPending}>
              Send
            </Button>
          </Flex>
        </form>
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
 * Estimation of the gas for a message
 * @param {Object} props
 * @param {string} props.to
 * @param {bigint} props.value
 * @param {bigint} [props.maxFee]
 */
function Estimation({ to, value, maxFee }) {
  const { data } = useEstimateGas({ to, value, maxFee })

  return (
    <Callout.Root variant="surface" mt="4">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>
        {data == null ? (
          'Estimating...'
        ) : (
          <>
            Gas (estimate): {Token.fromAttoFIL(data.gas).toFIL().toFormat()}{' '}
            {data.symbol} <br />
            <br />
            Total (amount + gas):{' '}
            {Token.fromAttoFIL(data.total).toFIL().toFormat()} {data.symbol}
          </>
        )}
      </Callout.Text>
    </Callout.Root>
  )
}
