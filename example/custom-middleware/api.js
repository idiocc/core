/* start example */
import rqt from 'rqt'

const middlewareConstructor = async (app, config) => {
  app.context.SECRET = await Promise.resolve('AN APP SECRET')

  return async(ctx, next) => {
    const res = await rqt(`${config.API}/key=${ctx.SECRET}`)
    ctx.body = res
    await next()
  }
}
/* end example */

export default middlewareConstructor