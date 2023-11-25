const staticCache = 'stat_v1'
const dynamicCache = 'dynam_v1'

const assetUrls = [
  '/index.html',
  '/App.js',
  '/App.css',
  '/offline.html'
]

self.addEventListener('install', async event => {
  const cache = await caches.open(staticCache)
  await cache.addAll(assetUrls)
})

self.addEventListener('activate', async event => {
  const cacheNames = await caches.keys()
  await Promise.all(
    cacheNames
      .filter(name => name !== staticCache)
      .filter(name => name !== dynamicCache)
      .map(name => caches.delete(name))
  )
})

self.addEventListener('fetch', event => {
  const {request} = event
  const url = new URL(request.url)
  if (url.origin === location.origin) {
    event.respondWith(fromCache(request))
  } else {
    event.respondWith(fromNetwork(request))
  }
})


async function fromCache(request) {
  const cached = await caches.match(request)
  return cached ?? await fetch(request)
}

async function fromNetwork(request) {
  const cache = await caches.open(dynamicCache)
  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())
    return response
  } catch (e) {
    const cached = await cache.match(request)
    return cached ?? await caches.match('/offline.html')
  }
}