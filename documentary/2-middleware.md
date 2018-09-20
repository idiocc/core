## Middleware Configuration

The middleware can be configured according to the `MiddlewareConfig`. `@idio/core` comes with some installed middleware as dependencies to speed up the process of creating a web server. Moreover, any custom middleware which is not part of the bundle can also be specified here (see [Custom Middleware](#custom-middleware)).

Each middleware accepts the following properties:

```table
[
  ["Property", "Description", "Default"],
  ["`use`", "Whether to use this middleware for every request. If not set to `true`, the configured middleware function will be included in the `middleware` property of the returned object, which can then be passed to a router configuration (not part of the `@idio/core`).", "`false`"],
  ["`config`", "Configuration object expected by the middleware constructor.", "`{}`"],
  ["`function`", "A constructor function when passing middleware not from the bundle.", ""],
  ["`...props`", "Any additional specific properties (see individual middleware configuration).", ""]
]
```

%~ width="15"%

### session

[`koa-session`](https://github.com/koajs/session) for handling sessions.

%TYPEDEF types/session.xml%

<!-- ```table
[
  ["Property", "Description", "Default", "Required"],
  ["`use`", "A set of keys to be installed in `app.keys.`", "-", "_true_"],
  ["`keys`", "A set of keys to be installed in `app.keys.`", "-", "_true_"],
  ["`config`", "`koa-session` configuration.", "`{}`", ""]
]
``` -->

<!-- %TYPEDEF types/middleware.xml SessionConfig% -->

%~ width="15"%

<details open>
<summary><strong>[multer](###)</strong>: file uploads <a href="https://github.com/koa-modules/multer">middleware</a>.
<br/><br/>
</summary>

%TYPEDEF types/multer.xml%

<!-- ```table
[
  ["Property", "Description", "Default", "Required"],
  ["`config.dest`", "An upload directory which will be created on start.", "-", "_true_"],
  ["`config`", "`koa-multer` configuration.", "`{}`", ""]
]
``` -->

</details>

%~ width="15"%

### csrf

[`koa-csrf`](https://github.com/koajs/csrf) for prevention against CSRF attacks.

%TYPEDEF types/csrf.xml%

<!-- ```table
[
  ["Property", "Description", "Default", "Required"],
  ["`config`", "`koa-csrf` configuration.", "`{}`", ""]
]
``` -->

%~ width="15"%

### bodyparser

[`koa-bodyparser`](https://github.com/koajs/body-parser) to parse data sent to the server.

<!-- ```table
[
  ["Property", "Description", "Default", "Required"],
  ["`config`", "`koa-bodyparser` configuration.", "`{}`", ""]
]
``` -->

%TYPEDEF types/bodyparser.xml%

%~ width="15"%

### checkauth

A simple middleware which throws if `ctx.session.user` is not set. Does not require configuration.

%TYPEDEF types/checkauth.xml%

%~ width="15"%

### logger

[`koa-logger`](https://github.com/koajs/logger) to log requests.

<!-- ```table
[
  ["Property", "Description", "Default", "Required"],
  ["`config`", "`koa-logger` configuration.", "`{}`", ""]
]
``` -->

%TYPEDEF types/logger.xml%

%~ width="15"%

### compress

[`koa-compress`](https://github.com/koajs/compress) to apply compression.

<!-- ```table
[
  ["Property", "Description", "Default", "Required"],
  ["`threshold`", "Minimum response size in bytes to compress.", "`1024`", ""],
  ["`config`", "`koa-compress` configuration.", "`{}`", ""]
]
``` -->

%TYPEDEF types/compress.xml%

%~ width="15"%

### static

[`koa-static`](https://github.com/koajs/static) to serve static files.

<!-- ```table
[
  ["Property", "Description", "Default", "Required"],
  ["`root`", "Root directory as a string or directories as an array of strings. For example, `'static'` or `['static', 'files']`.", "", "_true_"],
  ["`mount`", "Path from which files will be served.", "`/`", ""],
  ["`maxage`", "Controls caching time.", "`0`", ""],
  ["`config`", "`koa-static` configuration.", "`{}`", ""]
]
``` -->

%TYPEDEF types/static.xml%

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

%~%

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