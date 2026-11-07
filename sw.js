/* Uzuza service worker — app works offline; map tiles viewed online are kept for offline use */
const VERSION = "uzuza-v1.1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png"];
const TILES = "uzuza-tiles";
const MAX_TILES = 4000;

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== TILES).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
async function trimTiles() {
  const c = await caches.open(TILES); const keys = await c.keys();
  for (let i = 0; i < keys.length - MAX_TILES; i++) await c.delete(keys[i]);
}
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isTile = /arcgisonline\.com|tile\.openstreetmap\.org/.test(url.hostname);
  if (isTile) {
    e.respondWith(caches.open(TILES).then(async c => {
      try { const r = await fetch(req); if (r.ok) { c.put(req, r.clone()); trimTiles(); } return r; }
      catch (err) { const hit = await c.match(req); if (hit) return hit; throw err; }
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  if (req.mode === "navigate") {   // network first for the page, so updates arrive when online
    e.respondWith(fetch(req).then(r => { caches.open(VERSION).then(c => c.put("./index.html", r.clone())); return r; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
