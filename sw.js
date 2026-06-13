/* KidsTasks — Service Worker (cache kidstasks-v60) */

const CACHE_NAME = 'kidstasks-v60';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  const url = event.request.url;
  const isHTML = event.request.mode === 'navigate' || url.includes('KidsTasks.html');

  // App (HTML/navegação): network-first — sempre pega a versão nova quando online
  // e cai no cache só se estiver offline. Evita o app ficar preso numa versão antiga.
  if (isHTML) {
    event.respondWith(
      fetch(event.request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => caches.match(event.request).then(c => c || new Response('Offline', { status: 503 })))
    );
    return;
  }

  // Demais recursos do mesmo origin (manifest, ícones, favicon): cache-first.
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        if (url.includes('manifest.json') || url.includes('icon-') || url.includes('favicon.svg')) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached || new Response('Offline', { status: 503 }));
    })
  );
});
