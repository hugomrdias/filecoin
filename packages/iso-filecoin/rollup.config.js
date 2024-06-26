import path from 'node:path'
import { fileURLToPath } from 'node:url'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { glob } from 'glob'

/** @type {import('rollup').RollupOptions} */
const config = {
  input: Object.fromEntries(
    glob
      .sync('src/**/*.js')
      .map((file) => [
        file.slice(0, file.length - path.extname(file).length),
        fileURLToPath(new URL(file, import.meta.url)),
      ])
  ),
  plugins: [nodeResolve(), commonjs()],
  output: {
    preserveModules: true,
    format: 'cjs',
    dir: 'dist/cjs',
    entryFileNames: '[name].cjs',
  },
}

export default config
