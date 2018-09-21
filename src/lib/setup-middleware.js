import session from 'koa-session'
import CSRF from 'koa-csrf'
import multer from 'koa-multer'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import ensurePath from '@wrote/ensure-path'
import { join, resolve } from 'path'
import compress from 'koa-compress'
import serve from 'koa-static'
import compose from 'koa-compose'
import { Z_SYNC_FLUSH } from 'zlib'
import Mount from 'koa-mount'
import checkAuth from './check-auth'

function setupStatic(app, config, {
  root = [],
  maxage,
  mount,
}) {
  const roots = Array.isArray(root) ? root : [root]
  const m = roots.map((r) => {
    const fn = serve(r, {
      maxage,
      ...config,
    })
    return fn
  })
  const c = compose(m)
  if (mount) return Mount(mount, c)
  return c
}

function setupCompress(app, config, {
  threshold = 1024,
}) {
  const fn = compress({
    threshold,
    flush: Z_SYNC_FLUSH,
    ...config,
  })
  return fn
}
function setupCheckAuth() {
  return checkAuth()
}
function setupSession(app, config, { keys }) {
  if (!Array.isArray(keys)) {
    throw new Error('Keys must be an array')
  }
  app.keys = keys
  const ses = session(config, app)
  return ses
}
function setupCsrf(app, config) {
  const csrf = new CSRF(config)
  return csrf
}

const setupMulter = async (app, config = {})  => {
  if (typeof config.dest != 'string') {
    throw new Error('expecting uploadDir for multer')
  }
  const resolvedDir = resolve(config.dest)
  const uploadDirTestPath = join(resolvedDir, 'test.data')
  await ensurePath(uploadDirTestPath)
  const upload = multer(config)
  return upload
}

const setupBodyParser = (app, config) => {
  const bodyparser = bodyParser(config)
  return bodyparser
}

const setupLogger = (app, config) => {
  const l = logger(config)
  return l
}

const map = {
  session: setupSession,
  multer: setupMulter,
  csrf: setupCsrf,
  compress: setupCompress,
  bodyparser: setupBodyParser,
  checkauth: setupCheckAuth,
  logger: setupLogger,
  static: setupStatic,
}

/**
 * @return {Middleware}
 */
async function initMiddleware(name, conf, app) {
  if (typeof conf == 'function') {
    app.use(conf)
    return conf
  }
  let fn
  if (name in map) {
    fn = map[name]
  } else if (conf.middlewareConstructor) {
    if (typeof conf.middlewareConstructor != 'function') {
      throw new Error(`Expecting a function in the "middlewareConstructor" of the ${name} middleware.`)
    }
    fn = conf.middlewareConstructor
  } else {
    throw new Error('Either the "middleware" or "middlewareConstructor" properties must be passed.')
  }
  const { use, config = {}, ...rest } = conf
  const res = await fn(app, config, rest)
  if (use) {
    app.use(res)
  }
  return res
}

/**
 * @param {MiddlewareConfig} middleware
 * @param {import('koa').Application} app
 */
export default async function setupMiddleware(middleware = {}, app) {
  /** @type {Object.<string, Middleware>} */
  const res = await Object.keys(middleware)
    .reduce(async (acc, name) => {
      const accRes = await acc
      const conf = middleware[name]
      let installed
      if (Array.isArray(conf)) {
        const p = conf.map(async (c) => {
          await initMiddleware(name, c, app)
        })
        installed = await Promise.all(p)
      } else {
        installed = await initMiddleware(name, conf, app)
      }
      return {
        ...accRes,
        [name]: installed,
      }
    }, {})
  return res
}

/** @typedef {import('koa').Middleware} Middleware */
/** @typedef {import('..').MiddlewareConfig} MiddlewareConfig */
