import { join } from 'path'
import { debuglog } from 'util'
import Catchment from 'catchment'
import { createReadStream } from 'fs'
import startApp from '../../src/lib/start-app'

const LOG = debuglog('@idio/core')

const FIXTURE = 'test/fixture'

const read = async (...path) => {
  const p = join(...path)
  const rs = createReadStream(p)
  const { promise } = new Catchment({ rs })
  /** @type {string} */
  const res = await promise
  return res
}

/**
 * A testing context for the package.
 */
export default class Context {
  /**
   * Start the server on a random port by default. The server will be destroyed automatically by the end of a test.
   * @param {import('../../src').MiddlewareConfig} [middleware] Middleware configuration.
   * @param {import('../../src').Config} [config] configuration object
   */
  async start(middleware = {}, config = {}) {
    const res = await startApp(middleware, {
      port: 0,
      ...config,
    })
    const { app } = res
    this.app = app
    return res
  }
  async _destroy() {
    if (this.app) await this.app.destroy()
  }
  get SNAPSHOT_DIR() {
    return join(__dirname, '../snapshot')
  }
  get staticDir() {
    return join(FIXTURE, 'static')
  }
  get staticDir2() {
    return join(FIXTURE, 'static2')
  }
  async readStaticFixture() {
    const dracula = await read(this.staticDir, 'chapter2.txt')
    return dracula
  }
  async readStaticFixture2() {
    const dracula = await read(this.staticDir2, 'chapter3.txt')
    return dracula
  }
  async readFixture() {
    const dracula = await read(FIXTURE, 'chapter1.txt')
    return dracula
  }

  /**
   * Assign a route.
   * @param {import('koa').Application} app Koa application.
   * @param {string} url Server URL as returned by `startApp`, e.g., `http://localhost:5555`.
   * @param {import('koa-router')} router Instance of a router.
   * @param {string} path Path which should respond to requests, e.g., `/test`.
   * @param {string} body Response body.
   * @returns {string} Full path of the route, including the host, e.g., `http://localhost:5555/test`
   */
  assignRoute(app, url, router, path, body) {
    router.get('test', path, async (ctx) => {
      ctx.body = body
    })
    app.use(router.routes())
    return `${url}${path}`
  }
}
