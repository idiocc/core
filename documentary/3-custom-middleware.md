## Custom Middleware

When required to add any other middleware in the application not included in the `@idio/core` bundle, it can be done in several ways.

1. Passing the middleware function as part of the _MiddlewareConfig_. It will be automatically installed to be used by the _Application_. All middleware will be installed in order it is found in the _MiddlewareConfig_.

%EXAMPLE: example/custom-middleware/api-server.js, ../../src => @idio/core%
%FORK example example/custom-middleware/run-api%

2. Passing a configuration object as part of the _MiddlewareConfig_ that includes the `middlewareConstructor` property. Other properties such as `conf` and `use` will be used in the same way as when setting up bundled middleware.

%EXAMPLE: example/custom-middleware/proxy.js, ../../src => @idio/core%
%FORK example example/custom-middleware/proxy%



<!-- set up by passing its constructor as the `middlewareConstructor` property of the configuration. The constructor will receive the `app` and `config` arguments and should return a middleware function. -->

<!-- The `use` and `config` properties stay applicable as with the bundled middleware.

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
``` -->

%~%