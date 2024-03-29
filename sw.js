const staticCache = 'restaurant-app-v1';
const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/css/styles.css',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg'
];


//Install.
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(staticCache).then(function (cache) {
            return cache.addAll(cacheFiles);
        })
    );
});

//Fetch.
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            if (response) {
                return response;
            } else {
                return fetch(e.request)
                .then(function(response) {
                    const responseToCache = response.clone();
                    caches.open('restaurant-app-v1').then(function(cache) {
                        cache.put(e.request, responseToCache);
                    })
                    return response;
                });
            }
        })
    );
});