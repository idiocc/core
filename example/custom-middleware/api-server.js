import idioCore from '../../src'

/** @typedef {import('koa').Middleware} Middleware */

const APIServer = async () => {
  const { url } = await idioCore({
    /** @type {Middleware} */
    async log(ctx, next) {
      await next()
      console.log(' --> API: %s %s %s', ctx.method, ctx.url, ctx.status)
    },
    /** @type {Middleware} */
    async error(ctx, next) {
      try {
        await next()
      } catch (err) {
        ctx.status = 403
        ctx.body = err.message
      }
    },
    /** @type {Middleware} */
    async api(ctx, next) {
      if (ctx.query.key !== 'app-secret')
        throw new Error('Wrong API key.')
      ctx.body = {
        userId: 127,
      }
      await next()
    },
  })
  return url
}

export default APIServer