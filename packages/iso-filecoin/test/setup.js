import { URL } from 'node:url'
import path from 'path'
import _Zemu, { DEFAULT_START_OPTIONS } from '@zondax/zemu'

// Will contain trailing slash
const __dirname = new URL('.', import.meta.url).pathname

// @ts-ignore
const Zemu = /** @type {typeof _Zemu} */ (
  // @ts-ignore
  _Zemu.default
)

export const SNAPSHOTS_PATH = path.join(__dirname, 'snapshots')

export const SEED =
  'already turtle birth enroll since owner keep patch skirt drift any dinner'
export const PATH = "m/44'/461'/0/0/0"
export const PATH_TESTNET = "m/44'/1'/0/0/0"

const APP_PATH_S = path.join(__dirname, 'output/app_s.elf')
const APP_PATH_X = path.join(__dirname, 'output/app_x.elf')
const APP_PATH_SP = path.join(__dirname, 'output/app_s2.elf')
const APP_PATH_ST = path.join(__dirname, 'output/app_stax.elf')
const APP_PATH_FL = path.join(__dirname, 'output/app_flex.elf')
/**
 * @type {import('@zondax/zemu').IDeviceModel[]}
 */
export const models = [
  { name: 'nanos', prefix: 'S', path: APP_PATH_S },
  { name: 'nanox', prefix: 'X', path: APP_PATH_X },
  { name: 'nanosp', prefix: 'SP', path: APP_PATH_SP },
  { name: 'stax', prefix: 'ST', path: APP_PATH_ST },
  { name: 'flex', prefix: 'FL', path: APP_PATH_FL },
]

export const DEFAULT_OPTIONS = {
  ...DEFAULT_START_OPTIONS,
  logging: false,
  custom: `-s "${SEED}"`,
  X11: false,
}

export async function mochaGlobalSetup() {
  await Zemu.checkAndPullImage()
}

export function mochaGlobalTeardown() {
  Zemu.stopAllEmuContainers()
}
