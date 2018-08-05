/* yarn example/ */
import { resolve } from 'path'
import core from '../src'

(async () => {
  const { url } = await core({
    logger: {
      use: true,
    },
    static: {
      use: true,
      root: resolve(__dirname, 'static'),
      mount: '/static',
    },
    compress: {
      use: true,
      config: {
        threshold: 1024,
      },
    },
  }, {
    port: 8080,
  })
  console.log('File available at: %s/static/test.txt', url)
})()
