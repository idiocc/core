# @idio/core

[![npm version](https://badge.fury.io/js/%40idio%2Fcore.svg)](https://npmjs.org/package/@idio/core)

`@idio/core` is a koa2-based web server with some pre-installed middleware that facilitates quick creation of a web server with the essential functionality, such as static files serving, compression, body parsing, _etc_. Other components such as `@idio/database`, `@idio/route` and `@idio/jsx` allow to build more complex websites.

```sh
yarn add -E @idio/core
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`core(middleware?: MiddlewareConfig, config?: Config)`](#coremiddleware-middlewareconfigconfig-config-void)
  * [`MiddlewareConfig`](#middlewareconfig)
  * [`Config`](#config)
- [Middleware Configuration](#middleware-configuration)
  * [session](#session)
    * [`SessionOptions`](#sessionoptions)
    * [`SessionConfig`](#sessionconfig)
  * [multer](#multer)
    * [`MulterOptions`](#multeroptions)
    * [`Limits`](#limits)
    * [`MulterConfig`](#multerconfig)
  * [csrf](#csrf)
    * [`CSRFOptions`](#csrfoptions)
    * [`CSRFConfig`](#csrfconfig)
  * [bodyparser](#bodyparser)
    * [`BodyparserOptions`](#bodyparseroptions)
    * [`BodyparserConfig`](#bodyparserconfig)
  * [checkauth](#checkauth)
    * [`CheckauthOptions`](#checkauthoptions)
  * [logger](#logger)
    * [`LoggerOptions`](#loggeroptions)
    * [`LoggerConfig`](#loggerconfig)
  * [compress](#compress)
    * [`CompressOptions`](#compressoptions)
    * [`CompressConfig`](#compressconfig)
  * [static](#static)
    * [`SetHeaders`](#setheaders)
    * [`StaticOptions`](#staticoptions)
    * [`StaticConfig`](#staticconfig)
- [Custom Middleware](#custom-middleware)
- [Copyright](#copyright)

## API

The package is available by importing its default function:

```js
import core from '@idio/core'
```

To start the server, call the async method and pass middleware and server configuration objects. For example, the following code will start a server which serves static files with enabled compression.

```javascript
/* yarn example/ */
import { resolve } from 'path'
import core from '@idio/core'

(async () => {
  const { url } = await core({
    logger: {
      use: true,
    },
    static: {
      use: true,
      root: resolve(__dirname, 'static'),
      mount: '/static',
    },
    compress: {
      use: true,
      config: {
        threshold: 1024,
      },
    },
  }, {
    port: 8080,
  })
  console.log('File available at: %s/static/test.txt', url)
})()
```

```
File available at: http://localhost:8080/static/test.txt
```

## `core(`<br/>&nbsp;&nbsp;`middleware?: MiddlewareConfig,`<br/>&nbsp;&nbsp;`config?: Config,`<br/>`): void`

The `@idio/core` accepts 2 arguments which are the middleware configuration object and server configuration object. It is possible to start the server without any configuration, however it will do nothing, therefore it is important to add some middleware configuration.


__<a name="middlewareconfig">`MiddlewareConfig`</a>__: Middleware configuration for the `idio` `core` server.

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| session | _[SessionOptions](#sessionoptions)_ | `session` options. | - |
| multer | _[MulterOptions](#multeroptions)_ | `multer` options. | - |
| csrf | _[CSRFOptions](#csrfoptions)_ | `csrf` options. | - |
| bodyparser | _[BodyparserOptions](#bodyparseroptions)_ | `bodyparser` options. | - |
| compress | _[CompressOptions](#compressoptions)_ | `compress` options. | - |
| checkauth | _[CheckauthOptions](#checkauthoptions)_ | `checkauth` options. | - |
| logger | _[LoggerOptions](#loggeroptions)_ | `logger` options. | - |
| static | _[StaticOptions](#staticoptions)_ | `static` options. | - |

__<a name="config">`Config`</a>__: Server configuration object.

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| port | _number_ | The port on which to start the server. | `5000` |
| host | _string_ | The host on which to listen. | `0.0.0.0` |

## Middleware Configuration

The middleware can be configured according to the `MiddlewareConfig`. `@idio/core` comes with some installed middleware as dependencies to speed up the process of creating a web server. Moreover, any custom middleware which is not part of the bundle can also be specified here (see [Custom Middleware](#custom-middleware)).

Each middleware accepts the following properties:

| Property | Description | Default |
| -------- | ----------- | ------- |
| `use` | Whether to use this middleware for every request. If not set to `true`, the configured middleware function will be included in the `middleware` property of the returned object, which can then be passed to a router configuration (not part of the `@idio/core`). | `false` |
| `config` | Configuration object expected by the middleware constructor. | `{}` |
| `function` | A constructor function when passing middleware not from the bundle. |  |
| `...props` | Any additional specific properties (see individual middleware configuration). |  |

### session

[`koa-session`](https://github.com/koajs/session) for handling sessions.

__<a name="sessionoptions">`SessionOptions`</a>__

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| __keys*__ | _string[]_ | A set of keys to be installed in `app.keys`. | - |
| use | _boolean_ | Use this middleware for every request. | `false` |
| config | [_SessionConfig_](#sessionconfig) | `koa-session` configuration. | - |

__<a name="sessionconfig">`SessionConfig`</a>__: Configuration passed to `koa-session`.

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| key | _string_ | Cookie key. | `koa:sess` |
| maxAge | _number\|'session'_ | maxAge in ms with default of 1 day. `session` will result in a cookie that expires when session/browser is closed. Warning: If a session cookie is stolen, this cookie will never expire. | `86400000` |
| overwrite | _boolean_ | Can overwrite or not. | `true` |
| httpOnly | _boolean_ | httpOnly or not or not. | `true` |
| signed | _boolean_ | Signed or not. | `true` |
| rolling | _boolean_ | Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. | `false` |
| renew | _boolean_ | Renew session when session is nearly expired, so we can always keep user logged in. | `false` |

### multer

[`koa-multer`](https://github.com/koa-modules/multer) for file uploads.

`import('http').IncomingMessage` __<a name="incomingmessage">`IncomingMessage`</a>__

`import('fs').Stats` __<a name="stats">`Stats`</a>__

`import('koa-multer').StorageEngine` __<a name="storageengine">`StorageEngine`</a>__: [Storage](https://github.com/expressjs/multer#storage).

`import('koa-multer').File` __<a name="file">`File`</a>__: [File information](https://github.com/expressjs/multer#file-information).

__<a name="multeroptions">`MulterOptions`</a>__

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| use | _boolean_ | Use this middleware for every request. | `false` |
| config | [_MulterConfig_](#multerconfig) | `koa-multer` configuration. | - |

__<a name="limits">`Limits`</a>__: [An object](https://github.com/expressjs/multer#limits) specifying the size limits.

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| fieldNameSize | _number_ | Max field name size in bytes. | `100` |
| fieldSize | _number_ | Max field value size in bytes. | `1024` |
| fields | _number_ | Max number of non-file fields. | `Infinity` |
| fileSize | _number_ | For multipart forms, the max file size in bytes. | `Infinity` |
| files | _number_ | For multipart forms, the max number of file fields. | `Infinity` |
| parts | _number_ | For multipart forms, the max number of parts (fields + files). | `Infinity` |
| headerPairs | _number_ | For multipart forms, the max number of header key=> value pairs to parse. | `2000` |

__<a name="multerconfig">`MulterConfig`</a>__

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| dest | _string_ | Where to store the files. | - |
| storage | [_StorageEngine_](#storageengine) | Where to store the files. | - |
| fileFilter | _(req: IncomingMessage, file: File, callback: (error: Error \| null, acceptFile: boolean)) => void_ | [Function](https://github.com/expressjs/multer#filefilter) to control which files are accepted. | - |
| limits | [_Limits_](#limits) | Limits of the uploaded data. | - |
| preservePath | _boolean_ | Keep the full path of files instead of just the base name. | `false` |

### csrf

[`koa-csrf`](https://github.com/koajs/csrf) for prevention against CSRF attacks.

__<a name="csrfoptions">`CSRFOptions`</a>__

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| use | _boolean_ | Use this middleware for every request. | `false` |
| config | [_CSRFConfig_](#csrfconfig) | `koa-csrf` configuration. | - |

__<a name="csrfconfig">`CSRFConfig`</a>__

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| invalidSessionSecretMessage | _string_ |  | - |
| invalidSessionSecretStatusCode | _number_ |  | - |
| invalidTokenMessage | _string_ |  | - |
| invalidTokenStatusCode | _number_ |  | - |
| excludedMethods | _string[]_ |  | - |
| disableQuery | _boolean_ |  | - |

### bodyparser

[`koa-bodyparser`](https://github.com/koajs/body-parser) to parse data sent to the server.

`import('koa').Context` __<a name="context">`Context`</a>__

__<a name="bodyparseroptions">`BodyparserOptions`</a>__

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| use | _boolean_ | Use this middleware for every request. | `false` |
| config | [_BodyparserConfig_](#bodyparserconfig) | `koa-bodyparser` configuration. | - |

__<a name="bodyparserconfig">`BodyparserConfig`</a>__

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| enableTypes | _string[]_ | Parser will only parse when request type hits enableTypes. | `['json', 'form']` |
| encode | _string_ | Requested encoding. | `utf-8` |
| formLimit | _string_ | Limit of the urlencoded body. If the body ends up being larger than this limit a 413 error code is returned. | `56kb` |
| jsonLimit | _string_ | Limit of the json body. | `1mb` |
| strict | _boolean_ | When set to true, JSON parser will only accept arrays and objects. | `true` |
| detectJSON | _(ctx: Context) => boolean_ | Custom json request detect function. | `null` |
| extendTypes | _{json: string[], form: string[], text: string[]}_ | Support extend types. | - |
| onerror | _(err: Error, ctx: Context) => void_ | Support custom error handle. | - |

### checkauth

A simple middleware which throws if `ctx.session.user` is not set. Does not require configuration.

__<a name="checkauthoptions">`CheckauthOptions`</a>__

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| use | _boolean_ | Use this middleware for every request. | `false` |

### logger

[`koa-logger`](https://github.com/koajs/logger) to log requests.

__<a name="loggeroptions">`LoggerOptions`</a>__

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| use | _boolean_ | Use this middleware for every request. | `false` |
| config | [_LoggerConfig_](#loggerconfig) | `koa-logger` configuration. | - |

__<a name="loggerconfig">`LoggerConfig`</a>__

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| transporter | _(str: string, args: [string, string, string, string, string, string, string]) => void_ | Param `str` is output string with ANSI Color, and you can get pure text with other modules like `strip-ansi`. Param `args` is a array by `[format, method, url, status, time, length]`. | - |

### compress

[`koa-compress`](https://github.com/koajs/compress) to apply compression.

__<a name="compressoptions">`CompressOptions`</a>__

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| use | _boolean_ | Use this middleware for every request. | `false` |
| config | [_CompressConfig_](#compressconfig) | `koa-compress` configuration. | - |

__<a name="compressconfig">`CompressConfig`</a>__

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| filter | _(content_type: string) => boolean_ | An optional function that checks the response content type to decide whether to compress. By default, it uses `compressible`. | - |
| threshold | _number_ | Minimum response size in bytes to compress. | `1024` |
| flush | _number_ | Default: `zlib.constants.Z_NO_FLUSH`. | - |
| finishFlush | _number_ | Default: `zlib.constants.Z_FINISH`. | - |
| chunkSize | _number_ | Default: `16*1024`. | - |
| windowBits | _number_ | Support extend types. | - |
| level | _number_ | Compression only. | - |
| memLevel | _number_ | Compression only. | - |
| strategy | _number_ | Compression only. | - |
| dictionary | _*_ | Deflate/inflate only, empty dictionary by default. | - |

### static

[`koa-static`](https://github.com/koajs/static) to serve static files.

`import('http').ServerResponse` __<a name="serverresponse">`ServerResponse`</a>__

`(res: ServerResponse, path: string, stats: Stats) => any` __<a name="setheaders">`SetHeaders`</a>__

__<a name="staticoptions">`StaticOptions`</a>__

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| __root*__ | _string\|string[]_ | Root or multiple roots from which to serve files. | - |
| use | _boolean_ | Use this middleware for every request. | `false` |
| mount | _string_ | Path from which to serve files. | `/` |
| maxage | _number_ | How long to cache file for. | `0` |
| config | [_StaticConfig_](#staticconfig) | `koa-static` configuration. | - |

__<a name="staticconfig">`StaticConfig`</a>__

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| maxage | _number_ | Browser cache max-age in milliseconds. | `0` |
| hidden | _boolean_ | Allow transfer of hidden files. | `false` |
| index | _string_ | Default file name. | `index.html` |
| defer | _boolean_ | If `true`, serves after return next(), allowing any downstream middleware to respond first. | `false` |
| gzip | _boolean_ | Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with `.gz` extension exists. | `true` |
| br | _boolean_ | Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with `.br` extension exists (note, that brotli is only accepted over https). | `true` |
| setHeaders | [_SetHeaders_](#setheaders) | Function to set custom headers on response. | - |
| extensions | _boolean_ | Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. | `false` |

For example, the below configuration will serve files from both the `static` directory of the project, and the _React.js_ dependency. When `NODE_ENV` environment variable is set to `production`, files will be cached for 10 days.

```js
import { resolve } from 'path'
import core from '@idio/core'

const STATIC = resolve(__dirname, 'static')
const REACT = resolve(dirname(require.resolve('react')), 'umd')

const DAY = 1000 * 60 * 60 * 24

(async () => {
  const { url } = await core({
    static: {
      use: true,
      root: [STATIC, REACT],
      mount: '/scripts',
      maxage: process.env.NODE_ENV == 'production' ? 10 * DAY : 0,
    },
  })
})
```

## Custom Middleware

When required to add any other middleware in the application not included in the `@idio/core` bundle, it can be set up by passing its constructor as the `function` property of the configuration. The constructor will receive the `app` and `config` arguments and should return a middleware function.

```js
const middlewareConstructor = async (app, config) => {
  app.context.usingFunction = true

  return async(ctx, next) => {
    await next()
    if (config.debug) {
      console.error(ctx.usingFunction)
    }
  }
}
```

The `use` and `config` properties stay applicable as with the bundled middleware.

For example, setting up a custom middleware can look like this:

```js
await core({
  customMiddleware: {
    async function(app, config) {
      app.context.usingFunction = true

      return async(ctx, next) => {
        await next()
        if (config.debug) {
          console.error(ctx.usingFunction)
        }
      }
    },
    config: { debug: process.env.NODE_DEBUG == '@idio/core' },
    use: true,
  },
})
```

## Copyright

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz
