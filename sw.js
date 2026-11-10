/* SamMPurna service worker — app-shell cache, stale-while-revalidate.
   Opens instantly and fully offline; fetches the newest index.html in the
   background (cheap 304 when unchanged) and tells the page when it is ready. */
const CACHE = 'sammpurna-shell-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest',
               './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function revalidate(req, cache) {
  const res = await fetch(req, { cache: 'no-cache' });
  if (res && res.ok) {
    const old = await cache.match(req);
    const changed = !old ||
      old.headers.get('etag') !== res.headers.get('etag') ||
      old.headers.get('last-modified') !== res.headers.get('last-modified');
    await cache.put(req, res.clone());
    if (old && changed) {
      const cs = await self.clients.matchAll();
      cs.forEach(c => c.postMessage({ type: 'SW_UPDATED' }));
    }
  }
  return res;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;          // leave Google Apps Script sync etc. untouched
  const isPage = req.mode === 'navigate';
  const key = isPage ? new Request('./index.html') : req;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(key, { ignoreSearch: true });
    if (hit) { e.waitUntil(revalidate(key, cache).catch(() => {})); return hit; }
    try { return await revalidate(key, cache); }
    catch (_) { return (await cache.match('./index.html')) || Response.error(); }
  })());
});
