"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = core;

var _util = require("util");

const LOG = (0, _util.debuglog)('@idio/core');
/**
 * The core idio functionality and middleware.
 * @param {Config} config Configuration object.
 * @param {string} config.type The type.
 */

async function core(config = {}) {
  const {
    type
  } = config;
  LOG('@idio/core called with %s', type);
  return type;
}
/**
 * @typedef {Object} Config
 * @property {string} type The type.
 */
//# sourceMappingURL=index.js.map