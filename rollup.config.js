import { terser } from 'rollup-plugin-terser'
import { version } from './package.json'

const banner = `/*!
 * Tictac v${version}
 * https://github.com/keenwon/Tictac
 */
`

module.exports = [
  {
    input: './src/tictac.js',
    output: {
      file: './dist/tictac.umd.js',
      banner,
      name: 'tictac',
      format: 'umd'
    }
  },
  {
    input: './src/tictac.js',
    plugins: [
      terser({
        output: {
          comments: /^!/
        }
      })
    ],
    output: {
      file: './dist/tictac.umd.min.js',
      banner,
      name: 'tictac',
      format: 'umd'
    }
  }
]
