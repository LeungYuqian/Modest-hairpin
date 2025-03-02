self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('qian-card-v3').then((cache) => {
            return cache.addAll([
                '/<repository>/login.html',
                '/<repository>/admin.html',
                '/<repository>/generate_card.html'
            ]);
        })
    );
    self.skipWaiting(); // 立即激活新版本
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['qian-card-v3'];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName); // 刪除舊緩存
                    }
                })
            );
        }).then(() => self.clients.claim()) // 立即控制所有客戶端
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request); // 離線時才使用緩存
        })
    );
});