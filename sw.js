/* KidsTasks — Service Worker. O nome do cache é o `CACHE_NAME` abaixo: fonte única, para o
   comentário não virar uma segunda cópia que envelhece sozinha (r72a). */

const CACHE_NAME = 'kidstasks-v73';
const HTML_ESPERA_MS = 3500; // quanto a abertura espera a rede antes de usar a cópia do cache (r147)

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

  // App (HTML/navegação): network-first — pega a versão nova quando a rede RESPONDE e cai no cache
  // quando ela não responde. "Offline" não é o caso difícil, sinal FRACO é (r147): sem o tempo-limite,
  // a abertura esperava o `fetch` desistir. E só resposta `ok` entra no cache — um 500 passageiro do
  // Pages substituía o app bom, e a abertura offline seguinte mostrava só "Offline".
  if (isHTML) {
    const doCache = () => caches.match(event.request, { ignoreSearch: true });
    let gravou = Promise.resolve();
    const daRede = fetch(event.request).then(resp => {
      if (resp.ok) { const copia = resp.clone(); gravou = caches.open(CACHE_NAME).then(c => c.put(event.request, copia)); }
      return resp;
    });
    event.waitUntil(daRede.then(() => gravou).catch(() => {})); // resposta tardia ainda atualiza o cache
    const espera = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), HTML_ESPERA_MS));
    event.respondWith(
      Promise.race([daRede, espera])
        .then(resp => (resp.ok || resp.type === 'opaqueredirect') ? resp : doCache().then(c => c || resp))
        .catch(() => doCache().then(c => c || daRede.catch(() => new Response('Offline', { status: 503 }))))
    );
    return;
  }

  // Demais recursos do mesmo origin (manifest, ícones, favicon): cache-first. Também só `ok` entra:
  // aqui um 404 gravado ficaria servido até o próximo bump (r155a).
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        if (response.ok && (url.includes('manifest.json') || url.includes('icon-') || url.includes('favicon.svg'))) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached || new Response('Offline', { status: 503 }));
    })
  );
});
