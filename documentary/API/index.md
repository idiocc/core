
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

<!-- Below is the summary of bundled middleware:

```table
[
  ["Middleware", "Purpose", "Link"],
  ["`session`", "To enable sessions.", "[`koa-session`](https://github.com/koajs/session)"],
]
``` -->
