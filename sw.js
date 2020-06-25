importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
const CACHE_NAME = "info-mc"
if (workbox) {
  workbox.core.setCacheNameDetails({
    prefix: "Info-mc"
  })
  workbox.skipWaiting();
  workbox.clientsClaim();
  
  workbox.precaching.precacheAndRoute([
    {
      url: '/index.html',
      revision: 1,
    },
    {
      url: '/nav.html',
      revision: 1,
    },
    {
      url: '/style/material-icons.css',
      revision: 1,
    },
    {
      url: '/style/style.css',
      revision: 1,
    },
    {
      url: "/style/materialize.min.css",
      revision: 1
    },
    {
      url: '/pages/home.html',
      revision: 1,
    },
    {
      url: '/pages/pemain.html',
      revision: 1,
    },
    {
      url: '/pages/pinjadwal.html',
      revision: 1,
    },
    {
      url: '/pages/pinpemain.html',
      revision: 1,
    },
    {
      url: '/pages/tanding.html',
      revision: 1,
    },
    {
      url: '/js/app.js',
      revision: 1,
    },
    {
      url: '/js/push.js',
      revision: 1,
    },
    {
      url: '/js/const.js',
      revision: 1,
    },
    {
      url: '/js/idb.js',
      revision: 1
    },
    {
      url: '/js/materialize.min.js',
      revision: 1
    },
    {
      url: '/js/api/db.js',
      revision: 1,
    },
    {
      url: '/js/api/jadwal.controller.js',
      revision: 1,
    },
    {
      url: '/js/api/pemain.controller.js',
      revision: 1,
    },
    {
      url: '/js/api/push.config.js',
      revision: 1,
    },
    {
      url: '/js/api/db.js',
      revision: 1,
    },
    {
      url: '/js/components/content.js',
      revision: 1,
    },
    {
      url: '/js/components/nav.js',
      revision: 1,
    },
    {
      url: '/js/components/pemain.js',
      revision: 1,
    },
    {
      url: '/js/components/pinJadwal.js',
      revision: 1,
    },
    {
      url: '/js/components/pinPemain.js',
      revision: 1,
    },
    {
      url: '/js/components/tanding.js',
      revision: 1,
    },
    {
      url: '/js/data/dataPemain.js',
      revision: 1,
    },
    {
      url: '/js/data/dataPinJadwal.js',
      revision: 1,
    },
    {
      url: '/js/data/dataPinPemain.js',
      revision: 1,
    },
    {
      url: '/js/data/dataTanding.js',
      revision: 1,
    },
    {
      url: '/js/data/dataFile.js',
      revision: 1,
    },
    {
      url: '/js/helpers/convertDate.js',
      revision: 1,
    },
    {
      url: '/js/helpers/status.js',
      revision: 1,
    },
    {
      url: '/js/helpers/uint8array.js',
      revision: 1,
    },
    {
      url: '/images/city-team-min.jpg',
      revision: 1,
    },
    {
      url: '/images/logo.png',
      revision: 1,
    },
    {
      url: '/images/icons/icon-72x72.png',
      revision: 1,
    },
    {
      url: '/images/icons/icon-96x96.png',
      revision: 1,
    },
    {
      url: '/images/icons/icon-128x128.png',
      revision: 1,
    },
    {
      url: '/images/icons/icon-144x144.png',
      revision: 1,
    },
    {
      url: '/images/icons/icon-152x152.png',
      revision: 1,
    },
    {
      url: '/images/icons/icon-192x192.png',
      revision: 1,
    },
    {
      url: '/images/icons/icon-384x384.png',
      revision: 1,
    },
    {
      url: '/images/icons/icon-512x512.png',
      revision: 1,
    },
    {
      url: '/manifest.json',
      revision: 1,
    }
  ],
  {
    ignoreUrlParametersMatching: [/.*/]
  }
  );
  
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: "image-cache",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60
        })
      ]
    })
  )
  
  workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: `${CACHE_NAME}-pages`,
    }),
  );
  
  workbox.routing.registerRoute(
    new RegExp('/style/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'style-cache'
    })
  );
  
  workbox.routing.registerRoute(
    new RegExp('/images/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'images-cache'
    })
  );
  
  workbox.routing.registerRoute(
    new RegExp('https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: `Font-google-api`,
    }),
  );
  
  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.cacheFirst({
      cacheName: `${CACHE_NAME}-API`,
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    }),
  );
  console.log("workbox successfully loaded")
} else {
  console.log('Workbox failed to be load');
}

self.addEventListener('push', (e) => {
  let body;
  if (e.data) {
    body = e.data.text();
  } else {
    body = 'Push message tidak ada payload';
  }

  const options = {
    body: body,
    icon:
      'https://upload.wikimedia.org/wikipedia/id/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  e.waitUntil(
    self.registration.showNotification(
      'Manchester city info',
      options,
    ),
  );
});
