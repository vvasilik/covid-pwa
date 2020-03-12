const version = 'v1';

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('version').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/index.js',
                '/style.css',
                '/images/',
                '/images/icons/',
                '/images/icons/icon-72x72.png',
                '/images/icons/icon-96x96.png',
                '/images/icons/icon-128x128.png',
                '/images/icons/icon-144x144.png',
                '/images/icons/icon-152x152.png',
                '/images/icons/icon-192x192.png',
                '/images/icons/icon-384x384.png',
                '/images/icons/icon-512x512.png',
            ]);
        })
    );
});

this.addEventListener('activate', function(event) {
        var cacheWhitelist = [version];

        event.waitUntil(
            caches.keys().then(function(keyList) {
                return Promise.all(keyList.map(function(key) {
                    if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                    }
                }));
            })
        );
});

this.addEventListener('fetch', function(event) {

    event.respondWith(
        caches.match(event.request).then(function(resp) {
            return resp || fetch(event.request).then(function(response) {
                caches.open(version).then(function(cache) {
                        cache.put(event.request, response)
                    });
                return response.clone();
            });
        }).catch(function() {
            return caches.match('index.html');
        })
    );
});