import rqt from 'rqt'
/* start example */
import idioCore from '../src'

(async () => {
  const path = '/test'
  const {
    url, router, app, middleware: { pre, post },
  } = await idioCore({
    async pre(ctx, next) {
      console.log('  <-- %s %s',
        ctx.request.method,
        ctx.request.path,
      )
      await next()
    },
    async post(ctx, next) {
      console.log('  --> %s %s %s',
        ctx.request.method,
        ctx.request.path,
        ctx.response.status,
      )
      await next()
    },
  })
  router.get(path, pre,
    async (ctx, next) => {
      ctx.body = '<!doctype html><html><body>test</body></html>'
      await next()
    }, post)
  app.use(router.routes())
  console.log('Page available at: %s%s', url, path)
  /* end example */
  await rqt(`${url}${path}`)
  process.exit()
})()