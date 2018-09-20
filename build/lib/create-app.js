let Koa = require('koa'); if (Koa && Koa.__esModule) Koa = Koa.default;
let setupMiddleware = require('./setup-middleware'); if (setupMiddleware && setupMiddleware.__esModule) setupMiddleware = setupMiddleware.default;

/**
 * Create an application and setup middleware.
 * @param {import('..').MiddlewareConfig} middleware
 */
async function createApp(middlewareConfig) {
  const app = new Koa()

  const middleware = await setupMiddleware(middlewareConfig, app)

  if (app.env == 'production') {
    app.proxy = true
  }

  return {
    app,
    middleware,
  }
}

module.exports=createApp
//# sourceMappingURL=create-app.js.map