const cacheName = 'bryan-portfolio-v1'
const shell = new URL('./', self.registration.scope).href
const assets = ['manifest.webmanifest', 'icon-192.png', 'icon-512.png']
  .map(path => new URL(path, shell).href)

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll([shell, ...assets])))
})

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key.startsWith('bryan-portfolio-') && key !== cacheName)
    .map(key => caches.delete(key)))))
})

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url)
  const home = url.origin + url.pathname
  if (event.request.method !== 'GET') return
  if (event.request.mode === 'navigate' && (home === shell || home === shell + 'index.html')) {
    event.respondWith((async () => {
      const cache = await caches.open(cacheName)
      try {
        const response = await fetch(event.request)
        if (response.ok) await cache.put(shell, response.clone()).catch(() => {})
        return response
      } catch {
        return (await cache.match(shell)) || Response.error()
      }
    })())
  } else if (assets.includes(url.href)) {
    event.respondWith(caches.open(cacheName).then(async cache =>
      (await cache.match(event.request)) || fetch(event.request)))
  }
})
