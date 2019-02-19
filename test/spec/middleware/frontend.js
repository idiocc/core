import { equal } from 'assert'
import rqt, { aqt } from 'rqt'
import Context from '../../context'
import SnapshotContext from 'snapshot-context'

/** @type {Object.<string, (c: Context, s: SnapshotContext)>} */
const T = {
  context: [Context, SnapshotContext],
  async 'serves redirect'({ start, frontend }) {
    const { url } = await start({
      frontend: {
        directory: frontend,
      },
    })
    const fullUrl = `${url}/${frontend}`
    const { statusCode, headers: { location } } = await aqt(fullUrl)
    equal(statusCode, 302)
    equal(location, `/${frontend}/index.jsx`)
  },
  async 'serves jsx file'({ start, frontend, SNAPSHOT_DIR }, { setDir, test }) {
    setDir(SNAPSHOT_DIR)
    const { url } = await start({
      frontend: {
        directory: frontend,
      },
    })
    const fullUrl = `${url}/${frontend}/index.jsx`
    const res = await rqt(fullUrl)
    await test('frontend/index.jsx', res)
  },
  async 'serves jsx index file'({ start, frontend, SNAPSHOT_DIR }, { setDir, test }) {
    setDir(SNAPSHOT_DIR)
    const { url } = await start({
      frontend: {
        directory: frontend,
      },
    })
    const fullUrl = `${url}/${frontend}/`
    const res = await rqt(fullUrl)
    await test('frontend/index.jsx', res)
  },
  async 'serves multiple directories'({ start, frontend, frontend2 }) {
    const { url } = await start({
      frontend: {
        directory: [frontend, frontend2],
      },
    })
    const fullUrl = `${url}/${frontend}/index.jsx`
    const { statusCode } = await aqt(fullUrl)
    equal(statusCode, 200)
    const fullUrl2 = `${url}/${frontend2}/index.jsx`
    const { statusCode: sc } = await aqt(fullUrl2)
    equal(sc, 200)
  },
  async 'serves alt pragma'({ start, frontend, SNAPSHOT_DIR }, { setDir, test }) {
    setDir(SNAPSHOT_DIR)
    const { url } = await start({
      frontend: {
        directory: frontend,
        config: {
          pragma: 'import { createElement as h } from \'preact\'',
        },
      },
    })
    const fullUrl = `${url}/${frontend}/index.jsx`
    const res = await rqt(fullUrl)
    await test('frontend/pragma.jsx', res)
  },
}

export default T