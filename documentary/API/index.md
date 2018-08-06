
## API

The package is available by importing its default function:

```js
import core from '@idio/core'
```

To start the server, call the async method and pass middleware and server configuration objects. For example, the following code will start a server which serves static files with enabled compression.

%EXAMPLE: example/example.js, ../src => @idio/core, javascript%

```
File available at: http://localhost:8080/static/test.txt
```

```## core
[
  ["middleware?", "MiddlewareConfig"],
  ["config?", "Config"]
]
```

The `@idio/core` accepts 2 arguments which are the middleware configuration object and server configuration object. It is possible to start the server without any configuration, however it will do nothing, therefore it is important to add some middleware configuration.

<!-- Below is the summary of bundled middleware:

```table
[
  ["Middleware", "Purpose", "Link"],
  ["`session`", "To enable sessions.", "[`koa-session`](https://github.com/koajs/session)"],
]
``` -->
