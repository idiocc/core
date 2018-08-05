import Koa from 'koa'
import setupMiddleware from './setup-middleware'

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

export default createApp