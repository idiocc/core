# @idio/core

[![npm version](https://badge.fury.io/js/%40idio%2Fcore.svg)](https://npmjs.org/package/@idio/core)

`@idio/core` is a koa2-based web server with some pre-installed middleware that facilitates quick creation of a web server with the essential functionality, such as static files serving, compression, body parsing, _etc_. Other components such as `@idio/database`, `@idio/route` and `@idio/jsx` allow to build more complex websites.

```sh
yarn add -E @idio/core
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`core(config?: IdioConfig)`](#coreconfig-idioconfig-void)
  * [`IdioConfig` Type](#idioconfig-type)
    * [<code>port</code>](#port)
    * [<code>host</code>](#host)
    * [<code>middleware</code>](#middleware)
  * [`MiddlewareConfig` Type](#middlewareconfig-type)
    * [session](#session)
    * [multer](#multer)
    * [csrf](#csrf)
    * [bodyparser](#bodyparser)
    * [checkauth](#checkauth)
    * [logger](#logger)
    * [compress](#compress)
    * [static](#static)
    * [Custom Middleware](#custom-middleware)

## API

The package is available by importing its default function:

```js
import core from '@idio/core'
```

To start the server, call the async method and pass the configuration object:

```javascript
/* yarn example */
import { resolve } from 'path'
import core from '@idio/core'

(async () => {
  const { url } = await core({
    port: 8080,
    middleware: {
      static: {
        use: true,
        root: resolve(__dirname, 'static'),
        mount: '/static',
      },
    },
  })
  console.log('File available at: %s/static/test.txt', url)
})()
```

```
File available at: http://localhost:8080/static/test.txt
```

### `core(`<br/>&nbsp;&nbsp;`config?: IdioConfig,`<br/>`): void`

The `@idio/core` accepts a single argument which is the configuration object. It is possible to start the server without any configuration, however it will do nothing, therefore it is important to add some middleware configuration.


### `IdioConfig` Type

<table>
 <thead>
  <tr>
   <th>Property</th>
   <th>Type</th>
   <th>Description</th>
   <th>Example</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td><a name="port"><code>port</code></a></td>
   <td><em>number</em></td>
   <td>Port on which to listen, default <code>5000</code>.</td>
   <td><code>80</code></td>
  </tr>
  <tr>
   <td><a name="host"><code>host</code></a></td>
   <td><em>string</em></td>
   <td>Host to which to bind, default <code>0.0.0.0</code>.</td>
   <td><code>127.0.0.1</code></td>
  </tr>
  <tr>
   <td><a name="middleware"><code>middleware</code></a></td>
   <td><em>MiddlewareConfig</em></td>
   <td colspan="2">Middleware configuration. See details below.</td>
  </tr>
  <tr></tr>
  <tr>
   <td colspan="4">

```js
{
  session: {
    use: true,
    keys: ['secret-key'],
  },
  static: {
    mount: '/files',
    root: 'files',
    use: true,
  },
}
```
</td>
  </tr>
 </tbody>
</table>



### `MiddlewareConfig` Type

The middleware can be configured according to the `MiddlewareConfig` object which is part of the `IdioConfig`. `@idio/core` comes with some installed middleware as dependencies to speed up the process of creating a web server. Moreover, any custom middleware which is not part of the bundle can also be specified here.

Each middleware accepts the following properties:

| Property | Description | Default |
| -------- | ----------- | ------- |
| `use` | Whether to use this middleware for every request. If not set to `true`, the configured middleware function will be included in the `middleware` property of the returned object, which can then be passed to a router configuration (not part of the `@idio/core`). | `false` |
| `config` | Configuration object expected by the middleware constructor. | `{}` |
| `function` | A constructor function when passing middleware not from the bundle. |  |
| `...props` | Any additional specific properties (see individual middleware configuration). |  |

#### session

[`koa-session`](https://github.com/koajs/session) for handling sessions.

| Property | Description | Default | Required |
| -------- | ----------- | ------- | -------- |
| `keys` | A set of keys to be installed in `app.keys.` | - | _true_ |
| `config` | `koa-session` configuration. | `{}` |  |

#### multer

[`koa-multer`](https://github.com/koa-modules/multer) for file uploads.

| Property | Description | Default | Required |
| -------- | ----------- | ------- | -------- |
| `config.dest` | An upload directory which will be created on start. | - | _true_ |
| `config` | `koa-multer` configuration. | `{}` |  |


#### csrf

[`koa-csrf`](https://github.com/koajs/csrf) for prevention against CSRF attacks.

| Property | Description | Default | Required |
| -------- | ----------- | ------- | -------- |
| `config` | `koa-csrf` configuration. | `{}` |  |

#### bodyparser

[`koa-bodyparser`](https://github.com/koajs/body-parser) to parse data sent to the server.

| Property | Description | Default | Required |
| -------- | ----------- | ------- | -------- |
| `config` | `koa-bodyparser` configuration. | `{}` |  |

#### checkauth

A simple middleware which throws if `ctx.session.user` is not set. Does not require configuration.

#### logger

[`koa-logger`](https://github.com/koajs/logger) to log requests.

| Property | Description | Default | Required |
| -------- | ----------- | ------- | -------- |
| `config` | `koa-logger` configuration. | `{}` |  |

#### compress

[`koa-compress`](https://github.com/koajs/compress) to apply compression.

| Property | Description | Default | Required |
| -------- | ----------- | ------- | -------- |
| `threshold` | Minimum response size in bytes to compress. | `1024` |  |
| `config` | `koa-compress` configuration. | `{}` |  |

#### static

[`koa-static`](https://github.com/koajs/static) to serve static files.

| Property | Description | Default | Required |
| -------- | ----------- | ------- | -------- |
| `root` | Root directory as a string or directories as an array of strings. For example, `'static'` or `['static', 'files']`. |  | _true_ |
| `mount` | Path from which files will be served. | `/` |  |
| `maxage` | Controls caching time. | `0` |  |
| `config` | `koa-static` configuration. | `{}` |  |

For example, the below configuration will serve files from both the `static` directory of the project, and the _React.js_ dependency. When `NODE_ENV` environment variable is set to `production`, files will be cached for 10 days.

```js
import { resolve } from 'path'
import core from '@idio/core'

const STATIC = resolve(__dirname, 'static')
const REACT = resolve(dirname(require.resolve('react')), 'umd')

const DAY = 1000 * 60 * 60 * 24

(async () => {
  const { url } = await core({
    middleware: {
      static: {
        use: true,
        root: [STATIC, REACT],
        mount: '/scripts',
        maxage: process.env.NODE_ENV == 'production' ? 10 * DAY : 0,
      },
    },
  })
})
```

#### Custom Middleware

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
  middleware: {
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
  },
})
```

---

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz
