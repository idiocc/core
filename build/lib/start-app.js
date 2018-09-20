const { debuglog } = require('util');
let enableDestroy = require('server-destroy'); if (enableDestroy && enableDestroy.__esModule) enableDestroy = enableDestroy.default;
let Router = require('koa-router'); if (Router && Router.__esModule) Router = Router.default;
let erotic = require('erotic'); if (erotic && erotic.__esModule) erotic = erotic.default;
let createApp = require('./create-app'); if (createApp && createApp.__esModule) createApp = createApp.default;

const LOG = debuglog('idio')

const DEFAULT_PORT = 5000
const DEFAULT_HOST = '0.0.0.0'

async function destroy(server) {
  await new Promise((resolve) => {
    server.on('close', resolve)
    server.destroy()
  })
  LOG('destroyed the server')
}

/**
 * @param {import('koa').Application} app
 * @param {number} [port]
 * @param {string} [hostname='0.0.0.0']
 */
function listen(app, port, hostname = '0.0.0.0') {
  const cb = erotic(true)
  return new Promise((r, j) => {
    const ec = (err) => {
      const e = cb(err)
      j(e)
    }
    const server = app.listen(port, hostname, () => {
      r(server)
      app.removeListener('error', ec)
    }).once('error', ec)
  })
}

/**
 * Start the server.
 * @param {import('..').MiddlewareConfig} [middleware]
 * @param {import('..').Config} [config] configuration object
 */
async function startApp(middleware, config) {
  const {
    port = DEFAULT_PORT,
    host = DEFAULT_HOST,
  } = config

  // close all connections when running nodemon
  process.once('SIGUSR2', async () => {
    await app.destroy()
    process.kill(process.pid, 'SIGUSR2')
  })

  const appMeta = await createApp(middleware, config)
  const { app } = appMeta

  const server = await listen(app, port, host)

  enableDestroy(server)
  app.destroy = async () => {
    await destroy(server)
  }
  const { port: p } = server.address()

  const url = `http://localhost:${p}`

  const router = new Router()

  return { ...appMeta, router, url }
}

module.exports=startApp
//# sourceMappingURL=start-app.js.map