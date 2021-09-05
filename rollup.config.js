import { defineConfig } from 'rollup'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'

import { version } from './package.json'

const libName = 'copy-image-clipboard'
const license = 'Licensed MIT @ Luan Eduardo da Costa'
const licenseBanner = `/* ${libName} ${version} - ${license} */`

export default defineConfig({
  input: 'src/index.ts',
  plugins: [typescript({ module: 'ESNext' }), cleanup({ comments: 'none' })],
  output: [
    {
      format: 'esm',
      file: 'dist/index.js',
    },
    {
      format: 'cjs',
      file: 'dist/index.common.js',
    },
    {
      format: 'iife',
      file: 'dist/index.browser.js',
      name: 'CopyImageClipboard',
      banner: licenseBanner,
      plugins: [terser({ format: { comments: new RegExp(libName, 'g') } })],
    },
  ],
})
