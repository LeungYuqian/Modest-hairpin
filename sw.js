self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('qian-card-v2').then((cache) => {
            return cache.addAll([
                '/<repository>/login.html',
                '/<repository>/admin.html',
                '/<repository>/generate_card.html'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});