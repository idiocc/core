let session = require('koa-session'); if (session && session.__esModule) session = session.default;
let CSRF = require('koa-csrf'); if (CSRF && CSRF.__esModule) CSRF = CSRF.default;
let multer = require('koa-multer'); if (multer && multer.__esModule) multer = multer.default;
let bodyParser = require('koa-bodyparser'); if (bodyParser && bodyParser.__esModule) bodyParser = bodyParser.default;
let logger = require('koa-logger'); if (logger && logger.__esModule) logger = logger.default;
let ensurePath = require('@wrote/ensure-path'); if (ensurePath && ensurePath.__esModule) ensurePath = ensurePath.default;
const { join, resolve } = require('path');
let compress = require('koa-compress'); if (compress && compress.__esModule) compress = compress.default;
let serve = require('koa-static'); if (serve && serve.__esModule) serve = serve.default;
let compose = require('koa-compose'); if (compose && compose.__esModule) compose = compose.default;
const { Z_SYNC_FLUSH } = require('zlib');
let Mount = require('koa-mount'); if (Mount && Mount.__esModule) Mount = Mount.default;
let checkAuth = require('./check-auth'); if (checkAuth && checkAuth.__esModule) checkAuth = checkAuth.default;

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

async function initMiddleware(name, conf, app) {
  const fn = typeof conf.function == 'function' ? conf.function : map[name]
  if (typeof fn != 'function') {
    throw new Error(`Expecting function for ${name} middleware`)
  }
  const { use, config = {}, ...rest } = conf
  const res = await fn(app, config, rest)
  if (use) {
    app.use(res)
  }
  return res
}

/** @typedef {import('koa').Middleware} Middleware */

               async function setupMiddleware(middleware = {}, app) {
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


module.exports = setupMiddleware
//# sourceMappingURL=setup-middleware.js.map