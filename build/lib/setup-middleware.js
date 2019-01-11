let session = require('koa-session'); if (session && session.__esModule) session = session.default;
let CSRF = require('koa-csrf'); if (CSRF && CSRF.__esModule) CSRF = CSRF.default;
let multer = require('koa-multer'); if (multer && multer.__esModule) multer = multer.default;
let bodyParser = require('koa-bodyparser'); if (bodyParser && bodyParser.__esModule) bodyParser = bodyParser.default;
let logger = require('koa-logger'); if (logger && logger.__esModule) logger = logger.default;
let cors = require('@koa/cors'); if (cors && cors.__esModule) cors = cors.default;
let ensurePath = require('@wrote/ensure-path'); if (ensurePath && ensurePath.__esModule) ensurePath = ensurePath.default;
const { join, resolve } = require('path');
let compress = require('koa-compress'); if (compress && compress.__esModule) compress = compress.default;
let serve = require('koa-static'); if (serve && serve.__esModule) serve = serve.default;
let compose = require('koa-compose'); if (compose && compose.__esModule) compose = compose.default;
const { Z_SYNC_FLUSH } = require('zlib');
let Mount = require('koa-mount'); if (Mount && Mount.__esModule) Mount = Mount.default;
const checkAuth = require('./check-auth');

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

function setupCors(app, config, {
  origin,
}) {
  const o = Array.isArray(origin) ? (ctx) => {
    const oh = ctx.get('Origin')
    const found = origin.find(a => a == oh)
    return found
  } : origin
  const fn = cors({
    origin: o,
    ...config,
  })
  return fn
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
  cors: setupCors,
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
               async function setupMiddleware(middlewareConfig = {}, app) {
  /** @type {Object.<string, Middleware>} */
  const res = await Object.keys(middlewareConfig)
    .reduce(async (acc, name) => {
      const accRes = await acc
      const conf = middlewareConfig[name]
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


module.exports = setupMiddleware