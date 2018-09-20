## API

The package is available by importing its default function:

```js
import core from '@idio/core'
```

%~ width="15"%

```## core
[
  ["middleware?", "MiddlewareConfig"],
  ["config?", "Config"]
]
```

The `@idio/core` accepts 2 arguments which are the middleware configuration object and server configuration object. It is possible to start the server without any configuration, however it will do nothing, therefore it is important to add some middleware configuration.

%TYPEDEF types/middleware.xml MiddlewareConfig%

%TYPEDEF types/config.xml Config%

To start the server, the async method needs to be called and passed the middleware and server configuration objects. For example, the following code will start a server which serves static files with enabled compression.

%EXAMPLE: example/example.js, ../src => @idio/core%

```
File available at: http://localhost:8080/static/test.txt
```

%~%