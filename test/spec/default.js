import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import idioCore from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof idioCore, 'function')
  },
  async 'calls package without error'() {
    await idioCore()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await idioCore({
      type: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T
