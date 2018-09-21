import rqt from 'rqt'
import APIServer from './api-server'

(async () => {
  const url = await APIServer()
  console.log('Started API server at: %s', url)
  await rqt(url)
  await rqt(`${url}?key=app-secret`)
  process.exit()
})()