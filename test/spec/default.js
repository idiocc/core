import { equal, throws, ok } from '@zoroaster/assert'
import rqt from 'rqt'
import Context from '../context'
import idioCore from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof idioCore, 'function')
  },
  async 'throws an error when a server already started'({ start }) {
    const port = 5555
    const config = { port }
    await start({}, config)
    await throws({
      fn: start,
      args: [{}, config],
      code: 'EADDRINUSE',
      stack(s) {
        ok(/at startApp/.test(s))
      },
    })
  },
  async 'can add middleware automatically'({ start }) {
    const body = 'test'
    const { url } = await start({
      /** @type {import('@goa/koa').Middleware} */
      async test(ctx, next) {
        ctx.body = body
        await next()
      },
    })
    const res = await rqt(url)
    equal(res, body)
  },
  async 'returns the server'({ start }) {
    const { server, url } = await start()
    const p = new Promise((r) => {
      server.on('upgrade', (req, socket) => {
        r(r)
        socket.end('HTTP/1.1 200\nok')
      })
    })
    await rqt(url, {
      headers: {
        Connection: 'Upgrade',
        Upgrade: 'websocket',
      },
    }).catch(() => {})
    await p
  },
}

export default T
