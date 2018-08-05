import startApp from './lib/start-app'

/**
 * Start the server.
 * @param {Middle} [middleware]
 * @param {Config} [config]
 */
async function idioCore(middleware = {}, config = {}) {
  const res = await startApp(middleware, config)
  const { url, app, router, middleware: mw } = res

  return { url, app, router, middleware: mw }
}

/* documentary types/middleware.xml */

/* documentary types/config.xml */

export default idioCore
