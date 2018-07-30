import Koa from 'koa'
import setupMiddleware from './setup-middleware'

export default async function createApp(middleware) {
  const app = new Koa()

  const mw = await setupMiddleware(middleware, app)

  if (app.env == 'production') {
    app.proxy = true
  }

  return {
    app,
    middleware: mw,
  }
}
