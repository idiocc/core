import { resolve } from 'path'
import core from '../src'

(async () => {
  const { url } = await core({
    logger: {
      use: true,
      config: {
        transporter(str, args) {
          console.log(str)
          console.log(args)
        },
      },
    },
    static: {
      use: true,
      root: resolve(__dirname, 'static'),
    },
    bodyparser: {
      config: {

      }
    },
  })
  console.log(url)
})()
