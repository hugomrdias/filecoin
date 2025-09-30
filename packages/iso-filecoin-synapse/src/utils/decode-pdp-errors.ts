import type { AbiError } from 'abitype'
import { AbiErrorSignatureNotFoundError, decodeErrorResult } from 'viem'
import { filecoinWarmStorageServiceAbi, paymentsAbi } from '../gen.js'

export function decodePDPError(error: string) {
  const regex = /error=\[(.*?)]/
  const match = error.match(regex)
  if (match?.[1]) {
    const extractedContent = match[1]
    try {
      const value = decodeErrorResult({
        abi: filecoinWarmStorageServiceAbi,
        data: extractedContent as `0x${string}`,
      })

      return `Warm Storage Error: ${formatPDPError(value)}`
    } catch (error) {
      if (error instanceof AbiErrorSignatureNotFoundError) {
        const value = decodeErrorResult({
          abi: paymentsAbi,
          data: extractedContent as `0x${string}`,
        })

        return `Payments Error: ${formatPDPError(value)}`
      }
      return `Unable to decode error: ${error}`
    }
  } else {
    return `Curio PDP Error: ${error}`
  }
}

/**
 * Format the PDP error for display, stringifies the error and adds the inputs and args
 *
 * @param error - The PDP error to format
 */
function formatPDPError(error: {
  abiItem: AbiError
  args: readonly unknown[] | undefined
  errorName: string
}) {
  const data = JSON.stringify(
    { inputs: error.abiItem.inputs, args: error.args },
    (_key, value) => {
      if (typeof value === 'bigint') {
        return value.toString()
      }
      return value
    },
    2
  )
  return `${error.errorName}\n${data}`
}
