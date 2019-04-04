/* start example */
import idioCore from '../src'

const Server = async () => {
  const { url } = await idioCore({
    logger: {
      use: true,
    },
    static: {
      use: true,
      root: 'example/static',
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
}
/* end example */

(async () => {
  await Server()
  process.exit()
})()
