let startApp = require('./lib/start-app'); if (startApp && startApp.__esModule) startApp = startApp.default;

/**
 * Start the server.
 * @param {MiddlewareConfig} [middlewareConfig] Middleware configuration for the `idio` `core` server.
 * @param {SessionOptions} [middlewareConfig.session] `session` options.
 * @param {MulterOptions} [middlewareConfig.multer] `multer` options.
 * @param {CSRFOptions} [middlewareConfig.csrf] `csrf` options.
 * @param {BodyparserOptions} [middlewareConfig.bodyparser] `bodyparser` options.
 * @param {CompressOptions} [middlewareConfig.compress] `compress` options.
 * @param {CheckauthOptions} [middlewareConfig.checkauth] `checkauth` options.
 * @param {LoggerOptions} [middlewareConfig.logger] `logger` options.
 * @param {StaticOptions} [middlewareConfig.static] `static` options.
 * @param {Config} [config] Server configuration object.
 * @param {number} [config.port=5000] The port on which to start the server. Default `5000`.
 * @param {string} [config.host="0.0.0.0"] The host on which to listen. Default `0.0.0.0`.
 * @return {Promise.<{ url: string, app: import('koa'), router: import('koa-router'), middleware: Object.<string, import('koa').Middleware> }>}
 * @example
 *
 * // start a server, and serve files from the "static" directory.
 * await idioCore({
 *  static: {
 *    use: true,
 *    root: 'static',
 *    config: {
 *      hidden: true,
 *    },
 *  },
 * })
 */
async function idioCore(middlewareConfig = {}, config = {}) {
  const res = await startApp(middlewareConfig, config)
  const { url, app, router, middleware } = res

  return { url, app, router, middleware }
}

/* documentary types/options/bodyparser.xml */
/**
 * @typedef {Object} BodyparserOptions
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {BodyparserConfig} [config] `koa-bodyparser` configuration.
 */

/* documentary types/config/bodyparser.xml */
/**
 * @typedef {import('koa').Context} Context
 *
 * @typedef {Object} BodyparserConfig
 * @prop {string[]} [enableTypes="['json', 'form']"] Parser will only parse when request type hits enableTypes. Default `['json', 'form']`.
 * @prop {string} [encode="utf-8"] Requested encoding. Default `utf-8`.
 * @prop {string} [formLimit="56kb"] Limit of the urlencoded body. If the body ends up being larger than this limit a 413 error code is returned. Default `56kb`.
 * @prop {string} [jsonLimit="1mb"] Limit of the json body. Default `1mb`.
 * @prop {boolean} [strict=true] When set to true, JSON parser will only accept arrays and objects. Default `true`.
 * @prop {(ctx: Context) => boolean} [detectJSON="null"] Custom json request detect function. Default `null`.
 * @prop {{json: string[], form: string[], text: string[]}} [extendTypes] Support extend types.
 * @prop {(err: Error, ctx: Context) => void} [onerror] Support custom error handle.
 */

/* documentary types/options/checkauth.xml */
/**
 * @typedef {Object} CheckauthOptions
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 */

/**
 * @typedef {Object} CheckauthOptions
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 */

/* documentary types/options/compress.xml */
/**
 * @typedef {Object} CompressOptions
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {CompressConfig} [config] `koa-compress` configuration.
 */

/* documentary types/config/compress.xml */
/**
 * @typedef {Object} CompressConfig
 * @prop {(content_type: string) => boolean} [filter] An optional function that checks the response content type to decide whether to compress. By default, it uses `compressible`.
 * @prop {number} [threshold=1024] Minimum response size in bytes to compress. Default `1024`.
 * @prop {number} [flush] Default: `zlib.constants.Z_NO_FLUSH`.
 * @prop {number} [finishFlush] Default: `zlib.constants.Z_FINISH`.
 * @prop {number} [chunkSize] Default: `16*1024`.
 * @prop {number} [windowBits] Support extend types.
 * @prop {number} [level] Compression only.
 * @prop {number} [memLevel] Compression only.
 * @prop {number} [strategy] Compression only.
 * @prop {*} [dictionary] Deflate/inflate only, empty dictionary by default.
 */

/* documentary types/options/csrf.xml */
/**
 * @typedef {Object} CSRFOptions
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {CSRFConfig} [config] `koa-csrf` configuration.
 */

/* documentary types/config/csrf.xml */
/**
 * @typedef {Object} CSRFConfig
 * @prop {string} [invalidSessionSecretMessage]
 * @prop {number} [invalidSessionSecretStatusCode]
 * @prop {string} [invalidTokenMessage]
 * @prop {number} [invalidTokenStatusCode]
 * @prop {string[]} [excludedMethods]
 * @prop {boolean} [disableQuery]
 */

/* documentary types/options/logger.xml */
/**
 * @typedef {Object} LoggerOptions
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {LoggerConfig} [config] `koa-logger` configuration.
 */

/* documentary types/config/logger.xml */
/**
 * @typedef {Object} LoggerConfig
 * @prop {(str: string, args: [string, string, string, string, string, string, string]) => void} [transporter] Param `str` is output string with ANSI Color, and you can get pure text with other modules like `strip-ansi`. Param `args` is a array by `[format, method, url, status, time, length]`.
 */

/* documentary types/options/multer.xml */
/**
 * @typedef {Object} MulterOptions
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {MulterConfig} [config] `koa-multer` configuration.
 */

/* documentary types/config/multer.xml */
/**
 * @typedef {import('http').IncomingMessage} IncomingMessage
 * @typedef {import('fs').Stats} Stats
 * @typedef {import('koa-multer').StorageEngine} StorageEngine
 * @typedef {import('koa-multer').File} File
 *
 * @typedef {Object} Limits [An object](https://github.com/expressjs/multer#limits) specifying the size limits.
 * @prop {number} [fieldNameSize=100] Max field name size in bytes. Default `100`.
 * @prop {number} [fieldSize=1024] Max field value size in bytes. Default `1024`.
 * @prop {number} [fields=Infinity] Max number of non-file fields. Default `Infinity`.
 * @prop {number} [fileSize=Infinity] For multipart forms, the max file size in bytes. Default `Infinity`.
 * @prop {number} [files=Infinity] For multipart forms, the max number of file fields. Default `Infinity`.
 * @prop {number} [parts=Infinity] For multipart forms, the max number of parts (fields + files). Default `Infinity`.
 * @prop {number} [headerPairs=2000] For multipart forms, the max number of header key=> value pairs to parse. Default `2000`.
 *
 * @typedef {Object} MulterConfig
 * @prop {string} [dest] Where to store the files.
 * @prop {StorageEngine} [storage] Where to store the files.
 * @prop {(req: IncomingMessage, file: File, callback: (error: Error | null, acceptFile: boolean)) => void} [fileFilter] [Function](https://github.com/expressjs/multer#filefilter) to control which files are accepted.
 * @prop {Limits} [limits] Limits of the uploaded data.
 * @prop {boolean} [preservePath=false] Keep the full path of files instead of just the base name. Default `false`.
 */

/* documentary types/options/session.xml */
/**
 * @typedef {Object} SessionOptions
 * @prop {string[]} keys A set of keys to be installed in `app.keys`.
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {SessionConfig} [config] `koa-session` configuration.
 */

/* documentary types/config/session.xml */
/**
 * @typedef {Object} SessionConfig Configuration passed to `koa-session`.
 * @prop {string} [key="koa:sess"] Cookie key. Default `koa:sess`.
 * @prop {number|'session'} [maxAge=86400000] maxAge in ms with default of 1 day. `session` will result in a cookie that expires when session/browser is closed. Warning: If a session cookie is stolen, this cookie will never expire. Default `86400000`.
 * @prop {boolean} [overwrite=true] Can overwrite or not. Default `true`.
 * @prop {boolean} [httpOnly=true] httpOnly or not. Default `true`.
 * @prop {boolean} [signed=true] Signed or not. Default `true`.
 * @prop {boolean} [rolling=false] Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. Default `false`.
 * @prop {boolean} [renew=false] Renew session when session is nearly expired, so we can always keep user logged in. Default `false`.
 */

/* documentary types/options/static.xml */
/**
 * @typedef {Object} StaticOptions
 * @prop {string|string[]} root Root or multiple roots from which to serve files.
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {string} [mount="/"] Path from which to serve files. Default `/`.
 * @prop {number} [maxage=0] How long to cache file for. Default `0`.
 * @prop {StaticConfig} [config] `koa-static` configuration.
 */

/* documentary types/config/static.xml */
/**
 * @typedef {import('http').ServerResponse} ServerResponse
 *
 * @typedef {(res: ServerResponse, path: string, stats: Stats) => any} SetHeaders
 *
 * @typedef {Object} StaticConfig
 * @prop {number} [maxage=0] Browser cache max-age in milliseconds. Default `0`.
 * @prop {boolean} [hidden=false] Allow transfer of hidden files. Default `false`.
 * @prop {string} [index="index.html"] Default file name. Default `index.html`.
 * @prop {boolean} [defer=false] If `true`, serves after return next(), allowing any downstream middleware to respond first. Default `false`.
 * @prop {boolean} [gzip=true] Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with `.gz` extension exists. Default `true`.
 * @prop {boolean} [br=true] Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with `.br` extension exists (note, that brotli is only accepted over https). Default `true`.
 * @prop {SetHeaders} [setHeaders] Function to set custom headers on response.
 * @prop {boolean} [extensions=false] Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. Default `false`.
 */

/* documentary types/middleware.xml */
/**
 * @typedef {Object} MiddlewareConfig Middleware configuration for the `idio` `core` server.
 * @prop {SessionOptions} [session] `session` options.
 * @prop {MulterOptions} [multer] `multer` options.
 * @prop {CSRFOptions} [csrf] `csrf` options.
 * @prop {BodyparserOptions} [bodyparser] `bodyparser` options.
 * @prop {CompressOptions} [compress] `compress` options.
 * @prop {CheckauthOptions} [checkauth] `checkauth` options.
 * @prop {LoggerOptions} [logger] `logger` options.
 * @prop {StaticOptions} [static] `static` options.
 */

/* documentary types/config.xml */
/**
 * @typedef {Object} Config Server configuration object.
 * @prop {number} [port=5000] The port on which to start the server. Default `5000`.
 * @prop {string} [host="0.0.0.0"] The host on which to listen. Default `0.0.0.0`.
 */

module.exports=idioCore
//# sourceMappingURL=index.js.map