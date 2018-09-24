import { equal } from 'assert'
import rqt from 'rqt'
import Context from '../../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'serves static files'({ start, staticDir: root, readStaticFixture }) {
    const body = await readStaticFixture()
    const { url } = await start({
      static: {
        root,
        use: true,
      },
    })
    const fullUrl = `${url}/chapter2.txt`
    const res = await rqt(fullUrl)
    equal(res, body)
  },
  async 'serves static files from specified mount point'(
    { start, staticDir: root, readStaticFixture }
  ) {
    const body = await readStaticFixture()
    const { url } = await start({
      static: {
        root,
        use: true,
        mount: '/test',
      },
    })
    const fullUrl = `${url}/test/chapter2.txt`
    const res = await rqt(fullUrl)
    equal(res, body)
  },
  async 'serves static files from multiple roots'({
    start, staticDir, staticDir2, readStaticFixture, readStaticFixture2,
  }) {
    const body = await readStaticFixture()
    const body2 = await readStaticFixture2()
    const { url } = await start({
      static: {
        use: true,
        root: [staticDir, staticDir2],
      },
    })
    const fullUrl = `${url}/chapter2.txt`
    const res = await rqt(fullUrl)
    equal(res, body)
    const fullUrl2 = `${url}/chapter3.txt`
    const res2 = await rqt(fullUrl2)
    equal(res2, body2)
  },
  async 'serves static files from multiple roots from mount'({
    start, staticDir, staticDir2, readStaticFixture, readStaticFixture2,
  }) {
    const body = await readStaticFixture()
    const body2 = await readStaticFixture2()
    const { url } = await start({
      static: {
        use: true,
        root: [staticDir, staticDir2],
        mount: '/test',
      },
    })
    const fullUrl = `${url}/test/chapter2.txt`
    const res = await rqt(fullUrl)
    equal(res, body)
    const fullUrl2 = `${url}/test/chapter3.txt`
    const res2 = await rqt(fullUrl2)
    equal(res2, body2)
  },
  async 'can specify multiple configurations'({
    start, staticDir, staticDir2, readStaticFixture, readStaticFixture2,
  }) {
    const body = await readStaticFixture()
    const body2 = await readStaticFixture2()
    const { url } = await start({
      static: [
        {
          use: true,
          root: staticDir,
        },
        {
          use: true,
          root: staticDir2,
        },
      ],
    })
    const fullUrl = `${url}/chapter2.txt`
    const res = await rqt(fullUrl)
    equal(res, body)
    const fullUrl2 = `${url}/chapter3.txt`
    const res2 = await rqt(fullUrl2)
    equal(res2, body2)
  },
}

export default T