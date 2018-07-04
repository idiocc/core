"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = idioCore;

var _startApp = _interopRequireDefault(require("./lib/start-app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { debuglog } from 'util'
// const LOG = debuglog('@idio/core')

/**
 * Start the server.
 * @param {Config} config A configuration object.
 * @param {string} [config.databaseURL='mongodb://localhost:27017'] Address on which to connect to the database.
 * @param {number} [config.port=5000] Port on which to start the server.
 * @param {number} [config.host=0.0.0.0] The host on which to listen.
 * @param {MiddlewareConfig} [config.middleware] Middleware configuration for the idio core server.
 * @param {boolean} [config.autoConnect=true] Whether to automatically connect to the database.
 * @param {RoutesConfig} [config.routesConfig] A configuration object for the router.
 */
async function idioCore(config = {}) {
  const res = await (0, _startApp.default)(config);
  const {
    url,
    app,
    router,
    middleware,
    connect
  } = res;
  return {
    url,
    app,
    connect,
    router,
    middleware
  };
}
/**
 * @typedef {Object.<string, (route: function) => (string|function)[]>} MiddlewareMap
 *
 * @typedef {Object.<string, string[]>} AliasMap
 *
 * @typedef {Object} Config
 * @property {string} [databaseURL='mongodb://localhost:27017'] Address on which to connect to the database.
 * @property {number} [port=5000] Port on which to start the server.
 * @property {number} [host=0.0.0.0] The host on which to listen.
 * @property {MiddlewareConfig} [middleware] Middleware configuration for the idio core server.
 * @property {boolean} [autoConnect=true] Whether to automatically connect to the database.

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
//# sourceMappingURL=index.js.map