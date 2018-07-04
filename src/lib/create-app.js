import Koa from 'koa'
import setupMiddleware from './setup-middleware'

export default async function createApp(config) {
  const app = new Koa()

  app.context.config = config

  const middleware = await setupMiddleware(config.middleware, app)

  if (app.env == 'production') {
    app.proxy = true
  }

  return {
    app,
    middleware,
  }
}
