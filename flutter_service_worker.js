'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "b06afe145336470a7f52d3ef99b84ec3",
"version.json": "ae2283d73b7ffc61d0903be93f8da7d7",
"index.html": "510e66567c2db5820f42b514b1218a91",
"/": "510e66567c2db5820f42b514b1218a91",
"apple-touch-icon.png": "b907a5d3d71072ed311af35e9a010995",
"main.dart.js": "c21a880ad8632b59d26d7288a58ebcd5",
"icon-192.png": "aa54c13a984b5dbb3395441c4bb6b431",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"icon-192-maskable.png": "65e4ba66c17008d8b14b7dea03be88df",
"icon-512-maskable.png": "08a3a82844bd99f95a2ef57c4713c1b6",
"favicon.png": "e21792969c0f6aee05db3d4660efbe3a",
"icons/favicon.ico": "e21792969c0f6aee05db3d4660efbe3a",
"icons/apple-touch-icon.png": "b907a5d3d71072ed311af35e9a010995",
"icons/icon-192.png": "aa54c13a984b5dbb3395441c4bb6b431",
"icons/icon-192-maskable.png": "65e4ba66c17008d8b14b7dea03be88df",
"icons/icon-512-maskable.png": "08a3a82844bd99f95a2ef57c4713c1b6",
"icons/icon-512.png": "fe7e4c010ad394654a974f5054468e11",
"manifest.json": "43308e17c9150f9baeee347b38a80fd3",
"assets/AssetManifest.json": "df3910a298af8b7f28efc9774baf0a87",
"assets/NOTICES": "6a68d2fb3f86468f173ccb22c2f0f07c",
"assets/FontManifest.json": "760cc3770462a4d4092771fcdf1361d4",
"assets/AssetManifest.bin.json": "b1a82fd9000243ff018e39a38fe5467a",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/packages/fluttertoast/assets/toastify.js": "56e2c9cedd97f10e7e5f1cebd85d53e3",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/eva_icons_flutter/lib/fonts/Eva-Icons.ttf": "a71dbd49ad4a52020638190e30ac52e0",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "c370d5af7b101cf12dfcd41d9caf47e3",
"assets/fonts/MaterialIcons-Regular.otf": "59292c8ac69206d71c948d67e928a187",
"assets/assets/logo/movie2.png": "3a87de59a2ce6f6a479b871f51b1cf9b",
"assets/assets/logo/moviebanner1.png": "1f18aee99938721579ffeb0e51e2943e",
"assets/assets/logo/mb.png": "67e099f5ce31fc60698c1790a11d0f71",
"assets/assets/logo/fs.png": "7de7fc85d6774e0b7da83137f2dc7a4c",
"assets/assets/logo/bgw.png": "7a42c2e65e4a99a5e986b09c57254552",
"assets/assets/logo/pf.png": "b453c1b6eb7ad4c43369b569d08b8f59",
"assets/assets/logo/bgweb.png": "78c1b977fc24df10485c1da9f4b38910",
"assets/assets/logo/p1.png": "d8ce1733dad9b3d3e88c3d1a694f4531",
"assets/assets/logo/zom.png": "b9ecf1f027fc62ef5c6d5e07409ea1ea",
"assets/assets/logo/pfl.png": "ace1473c616234347e915e536032bb7b",
"assets/assets/logo/zlogo.png": "947413d3f0dce75edeb62ee67e48f2c7",
"assets/assets/logo/live.png": "09ffceae642f29f46db647f16949931c",
"assets/assets/logo/bg.png": "480f74bc8426371889c3796e8943568d",
"icon-512.png": "fe7e4c010ad394654a974f5054468e11",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
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
