const CACHE_NAME = 'ifsu-sage-v20';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './dashboard.html',
    './research-proposals.html',
    './literature-corpus.html',
    './model-retrieval.html',
    './retrieval-results.html',
    './relevance-evaluation.html',
    './evaluation-agreement.html',
    './model-performance.html',
    './reports-deployment.html',
    './style.css',
    './script.js',
    './dashboard.js',
    './manifest.json',
    './ifsu-icon.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName.startsWith('ifsu-sage-') && cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);
    if (event.request.method !== 'GET' || requestUrl.origin !== self.location.origin) return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;

            return fetch(event.request).then((networkResponse) => {
                if (networkResponse.ok) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
                }
                return networkResponse;
            }).catch((error) => {
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
                throw error;
            });
        })
    );
});
