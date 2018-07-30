"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startApp;

var _util = require("util");

var _serverDestroy = _interopRequireDefault(require("server-destroy"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _erotic = _interopRequireDefault(require("erotic"));

var _createApp = _interopRequireDefault(require("./create-app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOG = (0, _util.debuglog)('idio');
const DEFAULT_PORT = 5000;
const DEFAULT_HOST = '0.0.0.0';

async function destroy(server) {
  await new Promise(resolve => {
    server.on('close', resolve);
    server.destroy();
  });
  LOG('destroyed the server');
}
/**
 * @param {Koa} app
 * @param {number} [port]
 * @param {string} [hostname]
 */


function listen(app, port, hostname = '0.0.0.0') {
  const cb = (0, _erotic.default)(true);
  return new Promise((r, j) => {
    const ec = err => {
      const e = cb(err);
      j(e);
    };

    const server = app.listen(port, hostname, () => {
      r(server);
      app.removeListener('error', ec);
    }).once('error', ec);
  });
}
/**
 * Start the server.
 * @param {Config} [config] configuration object
 * @returns {AppReturn} An object with variables
 */


async function startApp(middleware, config) {
  const {
    port = DEFAULT_PORT,
    host = DEFAULT_HOST
  } = config; // close all connections when running nodemon

  process.once('SIGUSR2', async () => {
    await app.destroy();
    process.kill(process.pid, 'SIGUSR2');
  });
  const appMeta = await (0, _createApp.default)(middleware, config);
  const {
    app
  } = appMeta;
  const server = await listen(app, port, host);
  (0, _serverDestroy.default)(server);

  app.destroy = async () => {
    await destroy(server);
  };

  const {
    port: p
  } = server.address();
  const url = `http://localhost:${p}`;
  const router = (0, _koaRouter.default)();
  return { ...appMeta,
    router,
    url
  };
}
//# sourceMappingURL=start-app.js.map