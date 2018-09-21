
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

%~%