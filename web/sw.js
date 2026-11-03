/* Bilişim Ajans Ücretsiz Araçlar — service worker.
   Amaç: kurulu uygulama (PWA) çevrimdışı çalışsın. Ağ varsa her zaman ağdan alır (güncel içerik),
   ağ yoksa önbellekten sunar. Hiçbir kullanıcı dosyası önbelleğe girmez; yalnızca sitenin kendi
   HTML/CSS/JS/vendor dosyaları saklanır. Reklam istekleri (googlesyndication) hiç önbelleklenmez. */
const VERSION = 'ba-v2';
const ROOT = new URL('./', self.location.href).pathname;
const SHELL = ['', 'index.html', 'assets/css/ba.css', 'assets/js/ba.js', 'assets/js/hub.js', 'assets/js/ads.js',
  'assets/js/pwa.js', 'assets/img/logo.png', 'assets/img/favicon.svg', '404.html', 'cevrimdisi.html']
  .map((p) => ROOT + p);

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // reklam ve dış kaynaklar: dokunma
  if (!url.pathname.startsWith(ROOT)) return;
  e.respondWith(networkFirst(req));
});

async function networkFirst(req) {
  const cache = await caches.open(VERSION);
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch (_) {
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;
    if (req.mode === 'navigate') {
      const off = await cache.match(ROOT + 'cevrimdisi.html');
      if (off) return off;
    }
    return new Response('Çevrimdışısınız ve bu sayfa daha önce açılmamış.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
}
