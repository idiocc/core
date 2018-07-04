import { debuglog } from 'util'

const LOG = debuglog('@idio/core')

/**
 * The core idio functionality and middleware.
 * @param {Config} config Configuration object.
 * @param {string} config.type The type.
 */
export default async function core(config = {}) {
  const {
    type,
  } = config
  LOG('@idio/core called with %s', type)
  return type
}

/**
 * @typedef {Object} Config
 * @property {string} type The type.
 */
