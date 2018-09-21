import idioCore from '../../src'
import middlewareConstructor from './api'


(async () => {
  // 1. Start a 3rd party API server.
  const API = await startAPI()
  console.log('Started an API server at %s', API)

  // 2. Start a proxy server to the API.
  // const { url } = await idioCore({
  //   api: {
  //     use: true,
  //     middlewareConstructor,
  //     API:
  //   },
  // })
  // console.log(url)
})()
