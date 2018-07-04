import { debuglog } from 'util'
import enableDestroy from 'server-destroy'
import Router from 'koa-router'
import erotic from 'erotic'
import createApp from './create-app'
// import { AppReturn, Config } from '../types' // eslint-disable-line no-unused-vars

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
 * @param {Koa} app
 * @param {number} [port]
 * @param {string} [hostname]
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
 * @param {Config} [config] configuration object
 * @returns {AppReturn} An object with variables
 */
export default async function startApp(config = {}) {
  const {
    port = DEFAULT_PORT,
    host = DEFAULT_HOST,
  } = config

  // close all connections when running nodemon
  process.once('SIGUSR2', async () => {
    await app.destroy()
    process.kill(process.pid, 'SIGUSR2')
  })

  const appMeta = await createApp(config)
  const { app } = appMeta

  const server = await listen(app, port, host)

  enableDestroy(server)
  app.destroy = async () => {
    await destroy(server)
  }
  const { port: p } = server.address()

  const url = `http://localhost:${p}`

  const router = Router()

  return { ...appMeta, router, url }
}

/**
 * @typedef {Object} App
 * @property {function} destroy Kill the server and disconnect from the database
 *
 * @typedef {Object} AppReturn
 * @property {App} app
 * @property {string} url
 * @property {object} middleware
 * @property {Router} router
 * @property {function} [connect]

 * @typedef {Object} Config
 * @property {number} [port=5000]
 * @property {number} [host=0.0.0.0]
 * @property {MiddlewareConfig} [middleware]
 *
 * @typedef ISignature
 * @property {boolean} use
 * @property {Object} config
 * @property {Object} [rest]
 *
 * @typedef {Object} MiddlewareConfig
 * @property {ISignature} [session]
 * @property {ISignature} [multer]
 * @property {ISignature} [csrf]
 * @property {ISignature} [compress]
 * @property {ISignature} [bodyparser]
 * @property {ISignature} [checkauth]
 * @property {ISignature} [logger]
 * @property {Static} [static]
 */