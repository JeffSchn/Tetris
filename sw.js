const CACHE_NAME = 'tetris-v4';
const ASSETS = [
  './index.html',
  './tetris.css',
  './manifest.json',
  './icons/icon-192.svg',
  './icons/icon-512.svg',
  './icons/apple-touch-icon.svg',
  './js/main.js',
  './js/constants.js',
  './js/state.js',
  './js/board.js',
  './js/piece.js',
  './js/rendering.js',
  './js/game.js',
  './js/input.js',
  './js/touch.js',
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
