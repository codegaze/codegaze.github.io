var staticAssetsCacheName = 'StaticAssets',
    imageAssetsCacheName = 'ImgStatic',
    version = 'v2.23::';

var staticPrimaryAssets = [
  '/',
  '/styles.css',
  '/offline.html'
];

var staticSecondaryAssets = [
  '/assets/js/all.js',
  '/assets/css/all.css'
];

self.addEventListener('install', event => {
  console.log(' 💾 Worker Installation');
  event.waitUntil(updateStaticAssets());
});

self.addEventListener('activate', event => {
  console.log(' ☑ Worker Activation');
  event.waitUntil(
      caches.keys().
      then(function(keys) {
        // Remove caches no longer valid
        return Promise.all(keys.
            filter(function(key) {
              return key.indexOf(version) !== 0;
            }).
            map(function(key) {
              console.log(' New key available, delete old key: ' + key);
              return caches.delete(key);
            })
        );
      }).
      catch(function() {
        console.log('Something Went wrong');
      })
  );
});

self.addEventListener('fetch', event => {
  // … Perhaps respond to this fetch in a useful way?
  var request = event.request;

  if (isDoNotCacheDomain(request)) {
    event.respondWith(fetch(event.request));
  } else if (isHTMLContent(request)) {
    event.respondWith(handleHTMLContent(request));
  } else if (isStaticImage(request)) {
    event.respondWith(handleImageContent(request));
  } else {
    event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
    );
  }
});

function handleImageContent(request) {
  return caches.open(imageAssetsCacheName).then(function(cache) {
    return cache.match(request.url).then(function(response) {
      if (response) return response;

      return fetch(request).then(function(networkResponse) {
        cache.put(request.url, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}

function handleHTMLContent(request) {
  // Fix for Chrome bug: https://code.google.com/p/chromium/issues/detail?id=573937
  if (request.mode != 'navigate') {
    request = new Request(request.url, {
      method: 'GET',
      headers: request.headers,
      mode: request.mode,
      credentials: request.credentials,
      redirect: request.redirect,
    });
  }

  return fetch(request).
    then(function(response) {
      // Stash a copy of this page in the cache
      var copy = response.clone();
      caches.open(version + staticAssetsCacheName).
        then(function(cache) {
          cache.put(request, copy);
        });
      return response;
    }).
    catch(function() {
      return caches.match(request).
        then(function(response) {
          return response || caches.match('/offline.html');
        });
    });
}

function updateStaticAssets() {
  return caches.open(version + staticAssetsCacheName).
    then(function(cache) {
      cache.addAll(staticSecondaryAssets);
      return cache.addAll(staticPrimaryAssets);
    });
}

function isStaticImage(request) {
  if (request.headers.get('Accept').indexOf('image') !== -1) {
    return true;
  }
  return false;
}

function isHTMLContent(request) {
  if (request.headers.get('Accept').indexOf('text/html') !== -1) {
    return true;
  }
  return false;
}

function isDoNotCacheDomain(request) {
  if (request.url.indexOf('analytics') !== -1) {
    return true;
  }
  return false;
}

if ('serviceWorker' in navigator) {
  console.log(' ☑ Service Worker Is available. Yeah!');
  navigator.serviceWorker.register('/worker.js', {
    scope: '/',
  });
}
