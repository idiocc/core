import { equal } from 'zoroaster/assert'
import rqt from 'rqt'
import { gunzipSync } from 'zlib'
import Context from '../../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'uses compression'({ start, readFixture, assignRoute }) {
    const body = await readFixture()
    const { app, url, router } = await start({
      compress: { use: true },
    })
    const fullUrl = assignRoute(app, url, router, '/dracula.txt', body)
    const res = await rqt(fullUrl, {
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
      },
      binary: true,
    })
    const actual = gunzipSync(res).toString()
    equal(actual, body)
  },
  async 'passes threshold to the constructor'({ start, readFixture, assignRoute }) {
    const body = await readFixture()
    const { app, url, router } = await start({
      compress: { use: true, config: { threshold: body.length + 1 } },
    })
    const fullUrl = assignRoute(app, url, router, '/dracula.txt', body)
    const actual = await rqt(fullUrl, {
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
      },
    })
    equal(actual, body)
  },
}

export default T