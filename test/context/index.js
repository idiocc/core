import { resolve } from 'path'
import { debuglog } from 'util'
import Catchment from 'catchment'
import startApp from '../../src/lib/start-app'
import { createReadStream } from 'fs'

const LOG = debuglog('@idio/core')

const FIXTURE = resolve(__dirname, '../fixture')

const read = async (...path) => {
  const p = resolve(...path)
  const rs = createReadStream(p)
  const { promise } = new Catchment({ rs })
  const res = await promise
  return res
}

/**
 * A testing context for the package.
 */
export default class Context {
  async _init() {
    // LOG('init context')
  }
  /**
   * Example method.
   */
  example() {
    return 'OK'
  }
  async start(config = {}) {
    const res = await startApp({
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
  /**
   * Path to the fixture file.
   */
  get FIXTURE() {
    return resolve(FIXTURE, 'test.txt')
  }
  get SNAPSHOT_DIR() {
    return resolve(__dirname, '../snapshot')
  }
  get staticDir() {
    return resolve(FIXTURE, 'static')
  }
  get staticDir2() {
    return resolve(FIXTURE, 'static2')
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

  assignRoute(app, url, router, path, body) {
    router.get('test', path, async (ctx) => {
      ctx.body = body
    })
    app.use(router.routes())
    return `${url}${path}`
  }
}
