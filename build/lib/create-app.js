"use strict";

exports.__esModule = true;
exports.default = void 0;

var _koa = _interopRequireDefault(require("koa"));

var _setupMiddleware = _interopRequireDefault(require("./setup-middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create an application and setup middleware.
 * @param {import('..').MiddlewareConfig} middleware
 */
async function createApp(middlewareConfig) {
  const app = new _koa.default();
  const middleware = await (0, _setupMiddleware.default)(middlewareConfig, app);

  if (app.env == 'production') {
    app.proxy = true;
  }

  return {
    app,
    middleware
  };
}

var _default = createApp;
exports.default = _default;
//# sourceMappingURL=create-app.js.map