import rqt from 'rqt'
/* start example */
import idioCore from '../src'

async function pre(ctx, next) {
  console.log('  <-- %s %s',
    ctx.request.method,
    ctx.request.path,
  )
  await next()
}

async function post(ctx, next) {
  console.log('  --> %s %s %s',
    ctx.request.method,
    ctx.request.path,
    ctx.response.status,
  )
  await next()
}

const Server = async () => {
  const path = '/test'
  const {
    url, router, app, middleware: { bodyparser },
  } = await idioCore({
    // 1. Configure the bodyparser without using it for each request.
    bodyparser: {
      config: {
        enableTypes: ['json'],
      },
    },
  }, { port: 5003 })

  // 2. Setup router with the bodyparser and path-specific middleware.
  router.post(path,
    pre,
    bodyparser,
    async (ctx, next) => {
      ctx.body = {
        ok: true,
        request: ctx.request.body,
      }
      await next()
    },
    post,
  )
  app.use(router.routes())
  return `${url}${path}`
}

/* end example */

(async () => {
  const s = await Server()
  console.log('Page available at: %s', s)
  const res = await rqt(s, {
    data: { hello: 'world' },
  })
  console.error(res)
  process.exit()
})()