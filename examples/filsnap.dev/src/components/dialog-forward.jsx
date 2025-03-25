import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes'

import * as Address from 'iso-filecoin/address'
import { filForwarderMetadata } from 'iso-filecoin/contracts/filforwarder.js'
import { Token } from 'iso-filecoin/token'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useWriteContract } from 'wagmi'
import { ErrorBox, ExplorerLink, InfoBox } from './common.jsx'
import * as Icons from './icons.jsx'
/**
 * @typedef {Object} Inputs
 * @property {string} recipient
 * @property {number} amount
 */

/**
 * Dialog for forwarding FIL
 *
 * @param {Object} DialogForwardProps
 * @param {boolean} DialogForwardProps.disabled
 * @param {number} DialogForwardProps.balance
 */
export function DialogForward({ disabled = false, balance }) {
  const [isOpen, setIsOpen] = useState(false)

  const {
    data,
    isPending,
    writeContract,
    error,
    reset: resetWriteContract,
  } = useWriteContract()

  const {
    register,
    handleSubmit,
    formState: { errors },
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
  const onSubmit = (data) => {
    const { recipient, amount } = data

    writeContract({
      address: filForwarderMetadata.contractAddress,
      abi: filForwarderMetadata.abi,
      functionName: 'forward',
      value: Token.fromFIL(amount).toBigInt(),
      args: [Address.from(recipient).toContractDestination()],
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
          resetWriteContract()
        }
      }}
    >
      <Dialog.Trigger disabled={disabled}>
        <Button variant="soft" size="3" disabled={disabled}>
          <Icons.Forward width={20} height={20} />
          Forward
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="350px" onEscapeKeyDown={() => setIsOpen(false)}>
        <Dialog.Title>Forward ⨎</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Forward FIL to a native Filecoin address.
        </Dialog.Description>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <label htmlFor="recipient">
              <Text as="div" size="2" mb="1" weight="bold">
                Recipient
              </Text>
              <TextField.Root
                size="3"
                data-1p-ignore
                autoComplete="off"
                placeholder="f0, f1, f2, f3 or 0x address"
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
          </Flex>

          {data && (
            <InfoBox>
              <strong>Transaction ID:</strong> <ExplorerLink hash={data} />
            </InfoBox>
          )}

          <Flex gap="3" mt="4" justify="end">
            <Button title="Send FIL" type="submit" loading={isPending}>
              Forward
            </Button>
          </Flex>
        </form>
        {error && <ErrorBox msg={error.message} />}
        <Dialog.Close>
          <button type="button" className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}
