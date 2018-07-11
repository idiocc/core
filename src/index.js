import startApp from './lib/start-app'

/**
 * Start the server.
 * @param {Config} config A configuration object.
 * @param {number} [config.port=5000] Port on which to start the server.
 * @param {number} [config.host=0.0.0.0] The host on which to listen.
 * @param {MiddlewareConfig} [config.middleware] Middleware configuration for the idio core server.
 */
export default async function idioCore(config = {}) {
  const res = await startApp(config)
  const { url, app, router, middleware, connect } = res

  return { url, app, connect, router, middleware }
}

/**
 * @typedef {Object} Config
 * @property {number} [port=5000] Port on which to start the server.
 * @property {number} [host=0.0.0.0] The host on which to listen.
 * @property {MiddlewareConfig} [middleware] Middleware configuration for the idio core server.

 * @typedef ISignature
 * @property {boolean} use
 * @property {Object} config
 * @property {Object} [rest]

 * @typedef {Object} Static
 * @property {boolean} [use=false] Use this middleware for every request.
 * @property {string|string[]} root Root or multiple roots from which to serve files.
 * @property {string} [mount] Path from which to serve files. Defaults to `/`.
 * @property {number} [maxage=0] How long to cache file for. Defaults to no caching.
 * @property {object} [config] koa-static configuration.
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
