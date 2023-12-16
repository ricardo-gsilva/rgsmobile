'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "cedc8820240754bfa5fc0a9710966516",
"favicon.ico": "3bffdaa758aa5caf621b4113fd50e1ee",
"index.html": "a6c51a38d18f52f075fac8377523277a",
"/": "a6c51a38d18f52f075fac8377523277a",
"main.dart.js": "fbca78c0555e41eeff4824567e32627a",
"flutter.js": "7d69e653079438abfbb24b82a655b0a4",
"icons/android-chrome-192x192.png": "5dc2fa05a59c71a7d09f45c0b6f0a4cd",
"icons/apple-touch-icon.png": "1fc6a7035e58fa221d36d7b14a3d3c76",
"icons/android-chrome-512x512.png": "1bf8c85538de59ca2f186639c437fa28",
"manifest.json": "3c34d21960c3543b23b273712dd63c03",
"assets/AssetManifest.json": "ef44e086e01477824049ad33112241d4",
"assets/NOTICES": "25ff7b56bc59672c6cabca6a1190e145",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "cf121f7ca218ca3acfb02b6cd18737d6",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"assets/AssetManifest.bin": "0c0ffc5b1e2cf5431fbc587ea57d7f85",
"assets/fonts/MaterialIcons-Regular.otf": "65e21b5db78a7c132bbb04776ec9c399",
"assets/assets/lockpass/lockpass06.jpg": "76969d69e8e173373928ec74c00c8d97",
"assets/assets/lockpass/lockpass07.jpg": "b5e4a969aab52f5b4cb79b43673645f7",
"assets/assets/lockpass/lockpass05.jpg": "7e3b7aa18fb0a552d6f8a30bb7763c9f",
"assets/assets/lockpass/lockpass04.jpg": "e708b3927df22b998e800ad518ca92f4",
"assets/assets/lockpass/lockpass01.jpg": "72109a93016ab017ed1ef3909a697552",
"assets/assets/lockpass/lockpass03.jpg": "c9e750c82efd02729ec96a33fdf94703",
"assets/assets/lockpass/lockpass02.jpg": "6d5bf68b7f460115ba9872cc4d7043b0",
"assets/assets/aqua_help/aquahelp01.png": "7ce287f315da65c0298f058603e64b71",
"assets/assets/aqua_help/aquahelp02.png": "2d8402e465f1af98e56217aff991a6c1",
"assets/assets/aqua_help/aquahelp03.png": "f2f30b2791e50f3b72543393b1dde54b",
"assets/assets/spread_gifs/spreadgifs01.png": "74e4f79bd2c904b12e71c48c1311f4e8",
"assets/assets/spread_gifs/spreadgifs03.png": "bfdd873ee947b0c4ae5b9aa43288f3a0",
"assets/assets/spread_gifs/spreadgifs02.png": "824d4b732b06a1f6a33d547aaa1d2dcf",
"assets/assets/logo/logo_lockpass.png": "1726bda4819cb94c7daadf6f1b476d3d",
"assets/assets/logo/logo_aquahelp.png": "1ca04241c24a054b99585a3bc400748b",
"assets/assets/logo/logo_rgsmobile.png": "cceba701d51d9f9a4ece0b7189725c41",
"assets/assets/logo/logo_exemplifica.png": "ad99576409837d92550604a7bb2492cc",
"assets/assets/logo/logo_spreadgifs.png": "729be62290033d5f5007aef3af190423",
"assets/assets/exemplifica/exemplifica02.png": "e3da6ed644a22993201ec84fb97285d3",
"assets/assets/exemplifica/exemplifica03.png": "07f365249a75154ed2c0d44f6c5f9d1a",
"assets/assets/exemplifica/exemplifica01.png": "a94eb4086570153adac42c848f2f41cb",
"assets/assets/exemplifica/exemplifica04.png": "e1b50fbbf5c89a845da87d3a3f25ab7a",
"assets/assets/exemplifica/exemplifica05.png": "6ad7fe5941d62dac1b6775e76d7f9783",
"assets/assets/linkedin.png": "6cf0e9d0393dbde64a198413d918ad8a",
"assets/assets/banner/banner_aquahelp.png": "198dccf1412e52e8ee9ef2d3d11cf030",
"assets/assets/banner/banner_spreadgifs.png": "6d4ba8c84a1781a0cb19930654f8dccc",
"assets/assets/banner/banner_exemplifica.png": "b1dfbd4239a31f27ac6d73acf01f793d",
"assets/assets/banner/banner_lockpass.png": "73cebd06cb50c0fdc81dd28c9e6b1bff",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "4124c42a73efa7eb886d3400a1ed7a06",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "f87e541501c96012c252942b6b75d1ea",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "64edb91684bdb3b879812ba2e48dd487",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
