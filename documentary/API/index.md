
## API

The package is available by importing its default function:

```js
import core from '@idio/core'
```

To start the server, call the async method and pass the configuration object:

%EXAMPLE: example/example.js, ../src => @idio/core, javascript%

```
File available at: http://localhost:8080/static/test.txt
```

```### core
[
  ["config?", "IdioConfig"]
]
```

The `@idio/core` accepts a single argument which is the configuration object. It is possible to start the server without any configuration, however it will do nothing, therefore it is important to add some middleware configuration.

### `IdioConfig` Type

%TYPE true
<p name="port" type="number">
  <d>Port on which to listen, default <code>5000</code>.</d>
  <e><code>80</code></e>
</p>
<p name="host" type="string">
  <d>Host to which to bind, default <code>0.0.0.0</code>.</d>
  <e><code>127.0.0.1</code></e>
</p>
<p name="middleware" type="MiddlewareConfig">
  <d>Middleware configuration. See details below.</d>
  <e></e>
</p>
%

### `MiddlewareConfig` Type

The middleware can be configured according to the `MiddlewareConfig` object which is part of the `IdioConfig`. `@idio/core` comes with some installed middleware as dependencies to speed up the process of creating a web server. Moreover, any custom middleware which is not part of the bundle can also be specified here.

Each middleware accepts the following properties:

```table
[
  ["Property", "Description", "Default"],
  ["`use`", "Whether to use this middleware for every request.", "`false`"],
  ["`config`", "Configuration object expected by the middleware constructor.", "`{}`"],
  ["`...props`", "Any additional specific properties (see individual middleware configuration).", ""]
]
```

#### session

[`koa-session`](https://github.com/koajs/session) for handling sessions.

```table
[
  ["Property", "Description", "Default", "Required"],
  ["`keys`", "A set of keys to be installed in `app.keys`", "-", "**true**"],
  ["`config`", "`koa-session` configuration", "`{}`", "`-`"]
]
```

<!-- Below is the summary of bundled middleware:

```table
[
  ["Middleware", "Purpose", "Link"],
  ["`session`", "To enable sessions.", "[`koa-session`](https://github.com/koajs/session)"],
]
``` -->