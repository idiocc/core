import startApp from './src/lib/start-app'

/**
 * Start the server.
 * @param {MiddlewareConfig} [middleware] Middleware configuration for the `idio` `core` server.
 */
async function idioCore(middleware = {}) {
  const res = await startApp(middleware)
  const { url, app, router, middleware: mw } = res

  return { url, app, router, middleware: mw }
}

/**
 * @typedef {Object} SessionOptions
 * @prop {string[]} keys A set of keys to be installed in app.keys.
 * @prop {boolean} [use] Use this middleware for every request.
 *
 * @typedef {Object} MiddlewareConfig
 * @prop {SessionOptions} [session] session options.
 */

export default idioCore
