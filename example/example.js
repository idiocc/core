/* yarn example */
import { resolve } from 'path'
import core from '../src'

(async () => {
  const { url } = await core({
    port: 8080,
    middleware: {
      static: {
        use: true,
        root: resolve(__dirname, 'static'),
        mount: '/static',
      },
    },
  })
  console.log('File available at: %s/static/test.txt', url)
})()
