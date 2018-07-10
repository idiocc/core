/* yarn example/cache.js */
import core from '../src'

const template = (pages) => {
  const files = Object.keys(pages).map(a => `'${a}'`).join(', ')
  return `
    const files = ['.', ${files}]
    const cacheName = 'cache-name'
    self.addEventListener('install', (event) => {
      console.log('installing service worker')
      event.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(files))
      )
    })

    self.addEventListener('fetch', (event) => {
      event.respondWith((async () => {
        try {
          const response = await caches.match(event.request)
          if (response) {
            console.log('found %s in cache', event.request.url)
            return response
          }
        } catch (err) {
          console.log('error')
          return caches.match('/offline')
        }
      })())
    })

    self.addEventListener('activate', (event) => {
      console.log('activating new service worker')
      const wl = [cacheName]
      event.waitUntil(
        caches.keys().then(cacheNames => {
          return Promise.all(
            cacheNames.map(name => {
              if (wl.indexOf(name) == -1) {
                console.log('deleting an old cache')
                return caches.delete(name)
              }
            })
          )
        })
      )
    })
`
}

(async () => {
  try {
    const { url, methods, router } = await core()

    router.get('service worker', '/service-worker.js', async (ctx) => {
      ctx.type = 'application/javascript'
      ctx.body = template(methods.get)
    })
    console.log(url) // eslint-disable-line
  } catch ({ stack }) {
    console.log(stack) // eslint-disable-line
    process.exit(1)
  }
})()
