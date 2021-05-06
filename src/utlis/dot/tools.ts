import type { Registry } from '@polkadot/types/types'
import { formatBalance } from '@polkadot/util'
import { Balance } from '@polkadot/types/interfaces/runtime'

function getFormat (registry: Registry, formatIndex = 0): [number, string] {
  const decimals = registry.chainDecimals
  const tokens = registry.chainTokens
  return [
    formatIndex < decimals.length
      ? decimals[formatIndex]
      : decimals[0],
    formatIndex < tokens.length
      ? tokens[formatIndex]
      : tokens[1]
  ]
}

export const getFormatBalance = (value: Balance): [string, string] => {
  const [decimals, token] = getFormat(value.registry)
  const balance = formatBalance(value, { decimals, forceUnit: '-', withSi: false })
  return [balance, token]
}
