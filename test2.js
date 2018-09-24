import idioCore from './src'

(async () => {
  const { url } = await idioCore({
    /** @type {import('koa').Middleware} */
    async test(ctx, next) {
      ctx.body = 'test'
      await next()
    },
  })
  console.log(url)
})()