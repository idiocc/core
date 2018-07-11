# @idio/core

[![npm version](https://badge.fury.io/js/%40idio%2Fcore.svg)](https://npmjs.org/package/@idio/core)

`@idio/core` is a koa2-based web server with some pre-installed middleware that facilitates a quick creation of a web server with the essential functionality, such as static files serving, compression, body parsing, _etc_. Other components such as `@idio/database` and `@idio/jsx` allow to build more complex websites.

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
  <td>Middleware configuration. See details below.</td>
  <td></td>
 </tr>
 </tbody>
</table>


### `MiddlewareConfig` Type

The middleware can be configured according to the `MiddlewareConfig` object which is part of the `IdioConfig`. `@idio/core` comes with some installed middleware as dependencies to speed up the process of creating a web server. Moreover, any custom middleware which is not part of the bundle can also be specified here.

Each middleware accepts the following properties:

| Property | Description | Default |
| -------- | ----------- | ------- |
| `use` | Whether to use this middleware for every request. | `false` |
| `config` | Configuration object expected by the middleware constructor. | `{}` |
| `...props` | Any additional specific properties (see individual middleware configuration). |  |

#### session

[`koa-session`](https://github.com/koajs/session) for handling sessions.

| Property | Description | Default | Required |
| -------- | ----------- | ------- | -------- |
| `keys` | A set of keys to be installed in `app.keys` | - | **true** |
| `config` | `koa-session` configuration | `{}` | `-` |


---

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz
