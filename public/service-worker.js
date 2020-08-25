importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([{
    url: '/article.html',
    revision: '1'
  },
  {
    url: '/index.html',
    revision: '1'
  },
  {
    url: '/nav.html',
    revision: '1'
  },
  {
    url: '/manifest.json',
    revision: '1'
  },
  {
    url: '/css/materialize.min.css',
    revision: '1'
  },
  {
    url: '/js/api.js',
    revision: '1'
  },
  {
    url: '/js/db.js',
    revision: '1'
  },
  {
    url: '/js/idb.js',
    revision: '1'
  },
  {
    url: '/js/materialize.min.js',
    revision: '1'
  },
  {
    url: '/js/nav.js',
    revision: '1'
  },
  {
    url: '/js/script.js',
    revision: '1'
  },
  {
    url: 'https://fonts.googleapis.com/icon?family=Material+Icons',
    revision: '1'
  }
]);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api',
  })
);

workbox.routing.registerRoute(
  new RegExp('/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'app',
  })
);

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'images/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(self.registration.showNotification('Push Notification', options));
});

// const CACHE_NAME = "premier-league-gas-v1";
// var urlsToCache = [
//   "/",
//   "/nav.html",
//   "/index.html",
//   "/article.html",
//   "/manifest.json",
//   "/pages/home.html",
//   "/pages/tim_favorit.html",
//   "/css/materialize.min.css",
//   "/js/api.js",
//   "/js/db.js",
//   "/js/idb.js",
//   "/js/materialize.min.js",
//   "/js/nav.js",
//   "/js/script.js",
//   "/images/icon.png",
//   "/images/icon-192.png",
//   "/images/icon-512.png"
// ];

// self.addEventListener("install", function (event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("fetch", function (event) {
//   var base_url = "https://api.football-data.org/v2/";

//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function (cache) {
//         return fetch(event.request).then(function (response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request, {
//         ignoreSearch: true
//       }).then(function (response) {
//         return response || fetch(event.request);
//       })
//     )
//   }
// });

// self.addEventListener("activate", function (event) {
//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           if (cacheName != CACHE_NAME) {
//             console.log("ServiceWorker: cache " + cacheName + " dihapus");
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });


// self.addEventListener('push', function (event) {
//   var body;
//   if (event.data) {
//     body = event.data.text();
//   } else {
//     body = 'Push message no payload';
//   }
//   var options = {
//     body: body,
//     icon: 'icon.png',
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: 1,
//     },
//   };
//   event.waitUntil(self.registration.showNotification('Push Notification', options));
// });