require.resolve = (...args) => {
  debugger
  const [mod] = args
  if (mod == 'react') return __dirname
  return require.resolve(...args)
}
/* start example */
import { join, dirname } from 'path'
import idioCore from '../src'

const STATIC = join(__dirname, 'static')
const REACT = join(dirname(require.resolve('react')), 'umd')

const DAY = 1000 * 60 * 60 * 24

const Static = async () => {
  const { url } = await idioCore({
    static: {
      use: true,
      root: [STATIC, REACT],
      mount: '/scripts',
      maxage: process.env.NODE_ENV == 'production' ? 10 * DAY : 0,
    },
  }, { port: 5004 })
  return url
}
/* end example */

;(async () => {
  const url = await Static()
  console.log('Static server started on %s', url)
  process.exit()
})()