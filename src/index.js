import startApp from './lib/start-app'

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
 * @param {CorsOptions} [middlewareConfig.cors] `cors` options.
 * @param {FrontendOptions} [middlewareConfig.frontend] `frontend` options. If the option is specified, the middleware always will be used, i.e., no need to pass `use: true`.
 * @param {Config} [config] Server configuration object.
 * @param {number} [config.port=5000] The port on which to start the server. Default `5000`.
 * @param {string} [config.host="0.0.0.0"] The host on which to listen. Default `0.0.0.0`.
 * @example
```js
// start a server, and serve files from the "static" directory.
await idioCore({
  static: {
    use: true,
    root: 'static',
    config: {
      hidden: true,
    },
  },
})
```
 */
async function idioCore(middlewareConfig = {}, config = {}) {
  const res = await startApp(middlewareConfig, config)
  const { url, app, server, router, middleware } = res

  return { url, app, router, server, middleware }
}

// here until https://github.com/Microsoft/TypeScript/issues/26921 solved
/**
 * @typedef {import('@goa/koa').Middleware} _goa.Middleware
 */

/* documentary types/options/bodyparser.xml */
/**
 * @typedef {Object} BodyparserOptions
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {BodyparserConfig} [config] `koa-bodyparser` configuration.
 */

/* documentary types/config/bodyparser.xml */
/**
 * @typedef {import('@goa/koa').Context} Context
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

/* documentary types/options/cors.xml */
/**
 * @typedef {import('koa').Context} Context
 *
 * @typedef {Object} CorsOptions
 * @prop {string|Array<string>|((ctx: Context) => string)} [origin] The origin or an array of origins to accept as valid. In case of an array, the origin from the request headers will be searched in the array, and if found, it will be returned (since browsers only support a single `Access-Control-Allow-Origin` header). If a function is passed, it should return the string with the origin to set. If not passed, the request origin is returned, allowing any origin to access the resource.
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {CorsConfig} [config] `@koa/cors` configuration.
 */

/* documentary types/config/cors.xml */
/**
 * @typedef {Object} CorsConfig
 * @prop {string} [origin="request Origin header"] `Access-Control-Allow-Origin` header value. Default `request Origin header`.
 * @prop {string|Array<string>} [allowMethods="GET,HEAD,PUT,POST,DELETE,PATCH"] `Access-Control-Allow-Methods` header value. Default `GET,HEAD,PUT,POST,DELETE,PATCH`.
 * @prop {string|Array<string>} [exposeHeaders] `Access-Control-Expose-Headers` header value.
 * @prop {string|Array<string>} [allowHeaders] `Access-Control-Allow-Headers` header value.
 * @prop {string|number} [maxAge] `Access-Control-Max-Age` header value in seconds.
 * @prop {boolean} [credentials=false] `Access-Control-Allow-Credentials` header value. Default `false`.
 * @prop {boolean} [keepHeadersOnError=false] Add set headers to `err.header` if an error is thrown. Default `false`.
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
 * @prop {CorsOptions} [cors] `cors` options.
 * @prop {FrontendOptions} [frontend] `frontend` options. If the option is specified, the middleware always will be used, i.e., no need to pass `use: true`.
 */

/* documentary types/config/frontend.xml */
/**
 * @typedef {Object} FrontendConfig
 * @prop {string} [pragma="import { h } from 'preact'"] The pragma function to import. This enables to skip writing `h` at the beginning of each file. JSX will be transpiled to have `h` pragma, therefore to use React it's possible to do `import { createElement: h } from 'react'`. Default `import { h } from 'preact'`.
 */

/* documentary types/options/frontend.xml */
/**
 * @typedef {Object} FrontendOptions Allows to serve front-end JS files and CSS as modules, including from node_modules folder.
 * @prop {(string|Array<string>)} [directory="frontend"] The directory or directories from which to serve files. Default `frontend`.
 * @prop {FrontendConfig} [config] `@idio/frontend` configuration.
 */

/* documentary types/config.xml */
/**
 * @typedef {Object} Config Server configuration object.
 * @prop {number} [port=5000] The port on which to start the server. Default `5000`.
 * @prop {string} [host="0.0.0.0"] The host on which to listen. Default `0.0.0.0`.
 */

export default idioCore