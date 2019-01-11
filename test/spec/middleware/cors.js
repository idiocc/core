import { equal } from 'assert'
import { aqt } from 'rqt'
import Context from '../../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: [Context, { origin: 'http://test.page' }],
  async 'returns CORS headers with a function'({ start }, { origin }) {
    const { url } = await start({
      cors: {
        origin() {
          return origin
        },
        use: true,
      },
    })
    const { headers: {
      'access-control-allow-origin': actual,
    } } = await aqt(url, {
      headers: {
        Origin: origin,
      },
    })
    equal(actual, origin)
  },
  async 'returns CORS headers with a string'({ start }, { origin }) {
    const { url } = await start({
      cors: {
        origin,
        use: true,
      },
    })
    const { headers: {
      'access-control-allow-origin': actual,
    } } = await aqt(url, {
      headers: {
        Origin: origin,
      },
    })
    equal(actual, origin)
  },
  async 'returns CORS headers with an array'({ start }, { origin }) {
    const { url } = await start({
      cors: {
        origin: [origin, 'http://test.com'],
        use: true,
      },
    })
    const { headers: {
      'access-control-allow-origin': actual,
    } } = await aqt(url, {
      headers: {
        Origin: origin,
      },
    })
    equal(actual, origin)
  },
}

export default T