import { equal } from 'zoroaster/assert'
import Context from '../context'
import idioCore from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof idioCore, 'function')
  },
}

export default T
