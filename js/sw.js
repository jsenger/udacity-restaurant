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
    'img/1.png',
    'img/2.png',
    'img/3.png',
    'img/4.png',
    'img/5.png',
    'img/6.png',
    'img/7.png',
    'img/8.png',
    'img/9.png',
    'img/10.png'
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
                    caches.open('restaurant-app-v1').then(function(cache) {
                        cache.put(e.request, response);
                    })
                    return response;
                });
            }
        })
    );
});