import startApp from './lib/start-app'

/**
 * Start the server.
 * @param {{ session: SessionOptions }} [middleware] Middleware configuration for the `idio` `core` server.
 * @param {SessionOptions} [middleware.session] Session options.
 * @param {Config} config A configuration object.
 * @param {number} [config.port] Port on which to start the server. Default `5000`.
 * @param {number} [config.host] The host on which to listen. Default `0.0.0.0`.
 */
async function idioCore(middleware = {}, config = {}) {
  const res = await startApp(middleware, config)
  const { url, app, router, middleware: mw } = res

  return { url, app, router, middleware: mw }
}

/* documentary types/middleware.xml */
/**
 * @typedef {import('koa').Context} Context
 *
 * @typedef {import('fs').Stats} Stats
 *
 * @typedef {import('http').ServerResponse} ServerResponse
 *
 * @typedef {import('koa-multer').StorageEngine} StorageEngine
 *
 * @typedef {(res: ServerResponse, path: string, stats: Stats) => any} SetHeaders
 *
 * @typedef {Object} StaticConfig
 * @prop {number} maxage=0 Browser cache max-age in milliseconds. Default `0`.
 * @prop {boolean} hidden=false  Allow transfer of hidden files. Default `false`.
 * @prop {string} index="index.html" Default file name. Default `index.html`.
 * @prop {boolean} defer If `true`, serves after return next(), allowing any downstream middleware to respond first.
 * @prop {boolean} gzip=true  Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. Default `true`.
 * @prop {boolean} br=true Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with .br extension exists (note, that brotli is only accepted over https). Default `true`.
 * @prop {SetHeaders} setHeaders Function to set custom headers on response.
 * @prop {boolean} extensions=false Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. Default `false`.
 *
 * @typedef {Object} SessionConfig
 * @prop {string} [key="koa:sess"] cookie key. Default `koa:sess`.
 * @prop {number|'session'} [maxAge] maxAge in ms. Default `86400000` (1 day). `session` will result in a cookie that expires when session/browser is closed. Warning: If a session cookie is stolen, this cookie will never expire.
 * @prop {boolean} [overwrite=true] Can overwrite or not. Default `true`.
 * @prop {boolean} [httpOnly=true] httpOnly or not or not. Default `true`.
 * @prop {boolean} [true=true] Signed or not. Default `true`.
 * @prop {boolean} [rolling=false] Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. Default `false`.
 * @prop {boolean} [renew=false] Renew session when session is nearly expired, so we can always keep user logged in. Default `false`.
 *
 * @typedef {Object} Limits
 * @prop {number} [fieldNameSize] Max field name size (Default: 100 bytes).
 * @prop {number} [fieldSize] Max field value size (Default: 1MB).
 * @prop {number} [fields] Max number of non- file fields (Default: Infinity).
 * @prop {number} [fileSize] For multipart forms, the max file size (in bytes)(Default: Infinity).
 * @prop {number} [files] For multipart forms, the max number of file fields (Default: Infinity).
 * @prop {number} [parts] For multipart forms, the max number of parts (fields + files)(Default: Infinity).
 * @prop {number} [headerPairs] For multipart forms, the max number of header key=> value pairs to parse Default: 2000 (same as node's http).
 *
 * @typedef {Object} MulterConfig
 * @prop {string} [dest] Where to store the files.
 * @prop {StorageEngine} [storage] Where to store the files.
 * @prop {(req: IncomingMessage, file: File, callback: (error: Error | null, acceptFile: boolean)) => void} [fileFilter] Function to control which files are accepted.
 * @prop {Limits} [limits] Limits of the uploaded data.
 * @prop {boolean} [preservePath=false] Keep the full path of files instead of just the base name. Default `false`.
 *
 * @typedef {Object} CSRFConfig
 * @prop {string} [invalidSessionSecretMessage] 
 * @prop {number} [invalidSessionSecretStatusCode] 
 * @prop {string} [invalidTokenMessage] 
 * @prop {number} [invalidTokenStatusCode] 
 * @prop {string[]} [excludedMethods] 
 * @prop {boolean} [disableQuery] 
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
 *
 * @typedef {Object} CompressConfig
 * @prop {(content_type: string) => boolean} [filter] An optional function that checks the response content type to decide whether to compress. By default, it uses `compressible`.
 * @prop {number} [threshold]  Minimum response size in bytes to compress. Default 1024 bytes or 1kb.
 * @prop {number} [flush] default: zlib.constants.Z_NO_FLUSH
 * @prop {number} [finishFlush] default: zlib.constants.Z_FINISH
 * @prop {number} [chunkSize] default: 16*1024
 * @prop {number} [windowBits] Support extend types.
 * @prop {number} [level] compression only
 * @prop {number} [memLevel] compression only
 * @prop {number} [strategy] compression only
 * @prop {any} [dictionary] deflate/inflate only, empty dictionary by default
 *
 * @typedef {Object} LoggerConfig
 * @prop {(str: string, args: [string, string, string, string, string, string, string]) => void} [transporter] Param `str` is output string with ANSI Color, and you can get pure text with other modules like `strip-ansi`. Param `args` is a array by `[format, method, url, status, time, length]`.
 *
 * @typedef {Object} Config
 * @prop {number} [port=5000] Port on which to start the server. Default `5000`.
 * @prop {string} [host="0.0.0.0"] The host on which to listen. Default `0.0.0.0`.
 *
 * @typedef {Object} StaticOptions
 * @prop {boolean} [use] Use this middleware for every request.
 * @prop {string|string[]} root Root or multiple roots from which to serve files.
 * @prop {string} [mount="/"] Path from which to serve files. Default `/`.
 * @prop {number} [maxage=0] How long to cache file for. Default `0`.
 * @prop {StaticConfig} [config] `koa-static` configuration.
 *
 * @typedef {Object} LoggerOptions
 * @prop {boolean} [use] Use this middleware for every request.
 * @prop {object} [config] `koa-logger` configuration.
 *
 * @typedef {Object} SessionOptions
 * @prop {string[]} keys A set of keys to be installed in app.keys.
 * @prop {boolean} [use] Use this middleware for every request.
 * @prop {SessionConfig} [config] `koa-session` configuration.
 *
 * @typedef {Object} MulterOptions
 * @prop {boolean} [use] Use this middleware for every request.
 * @prop {MulterConfig} [config] `koa-multer` configuration.
 *
 * @typedef {Object} CSRFOptions
 * @prop {boolean} [use] Use this middleware for every request.
 * @prop {CSRFConfig} [config] `koa-csrf` configuration.
 *
 * @typedef {Object} BodyparserOptions
 * @prop {boolean} [use] Use this middleware for every request.
 * @prop {BodyparserConfig} [config] `koa-bodyparser` configuration.
 *
 * @typedef {Object} CompressOptions
 * @prop {boolean} [use] Use this middleware for every request.
 * @prop {CompressConfig} [config] `koa-compress` configuration.
 *
 * @typedef {Object} MiddlewareConfig ABC
 * @prop {SessionOptions} [session] `session` options.
 * @prop {MulterOptions} [multer] `multer` options.
 * @prop {CSRFOptions} [csrf] `csrf` options.
 * @prop {BodyparserOptions} [bodyparser] `bodyparser` options.
 * @prop {CompressOptions} [compress] `compress` options.
 * @prop {{ use?: boolean }} [checkauth] `checkauth` options.
 * @prop {{ use?: boolean, config: LoggerConfig }} [logger] `logger` options.
 * @prop {StaticOptions} [static] `static` options.
 */

export default idioCore
