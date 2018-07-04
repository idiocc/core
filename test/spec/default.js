import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import core from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof core, 'function')
  },
  async 'calls package without error'() {
    await core()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await core({
      type: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T
