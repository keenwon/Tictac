import path from 'path'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import { version } from './package.json'

const banner = `/*!
 * Tictac v${version}
 * https://github.com/keenwon/Tictac
 */
`

const typescriptPlugin = typescript({
  cacheRoot: path.join(__dirname, 'node_modules/.rts2_cache')
})

module.exports = [
  {
    input: './src/tictac.ts',
    plugins: [typescriptPlugin],
    output: {
      file: './dist/tictac.js',
      banner,
      name: 'tictac',
      format: 'umd'
    }
  },
  {
    input: './src/tictac.ts',
    plugins: [
      typescriptPlugin,
      terser({
        output: {
          comments: /^!/
        }
      })
    ],
    output: {
      file: './dist/tictac.min.js',
      banner,
      name: 'tictac',
      format: 'umd'
    }
  }
]
