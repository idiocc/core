/**
 * @param {Hello} t
 */
export default function test(t) {
  process.stdout.write(t.abc)
}

test()

/**
 * @typedef {Object} World
 * @prop {string} def The DEF.
 *
 * @typedef {Object} Hello
 * @prop {string} abc The ABC.
 * @prop {World} world
 */

