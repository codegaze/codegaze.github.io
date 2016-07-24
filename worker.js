/********** 
* Log With Colors. Stolen from a google dev video.
*/

var _log = console.log;
var logStyle = 'color: #fff; background: #F1654C';
console.log = (str) => _log('%c' + str + ' ', logStyle);

/********** 
* Set 
*/
var staticAssetsCacheName = "StaticAssets";
var imageAssetsCacheName = "ImgStatic";

var version = "v2::";

var staticPrimaryAssets = [
    '/',
    '/styles.css',
    '/scripts/main.js'
]
var staticSecondaryAssets = [
    '/assets/js/fontfaceobserver.min.js',
    '/assets/js/prism.js',
    '/assets/css/prism.css',
    '/assets/css/styles.css',
    'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOFtXRa8TVwTICgirnJhmVJw.woff2'
]


self.addEventListener('install', event => {

    console.log(' 💾 Worker Installation');
    event.waitUntil(updateStaticAssets());

});

self.addEventListener('activate', function (event) {
    console.log(' ☑ Worker Activation');
    event.waitUntil(
        caches.keys()
            .then(function (keys) {
                // Remove caches whose name is no longer valid
                return Promise.all(keys
                    .filter(function (key) {
                      return key.indexOf(version) !== 0;
                    })
                    .map(function (key) {
                      console.log(' New key available, delete old key: ' + key);
                      return caches.delete(key);
                    })
                );
            })
            .catch(function () {
                console.log('Something Went wrong');
            })
    )
});


self.addEventListener('fetch', event => {
  // … Perhaps respond to this fetch in a useful way? 
    var request = event.request;
  
    if (isHTMLContent(request)) {
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

function handleImageContent(request)
{

    return caches.open(imageAssetsCacheName).then(function(cache) {
        return cache.match(request.url).then(function(response) {
            if (response) return response;

            return fetch(request).then(function(networkResponse) {
                cache.put(request.url, networkResponse.clone());
                return networkResponse;
            });
        })
    })

}

function handleHTMLContent(request)
{
    
    // Fix for Chrome bug: https://code.google.com/p/chromium/issues/detail?id=573937
    if (request.mode != 'navigate') {
        request = new Request(request.url, {
            method: 'GET',
            headers: request.headers,
            mode: request.mode,
            credentials: request.credentials,
            redirect: request.redirect
        });
    }
    
    return fetch(request)
        .then(function (response) {
            // Stash a copy of this page in the cache
            var copy = response.clone();
            caches.open(version + staticAssetsCacheName)
                .then(function (cache) {
                    cache.put(request, copy);
                });
            return response;
        })
        .catch(function () {
            return caches.match(request)
                .then(function (response) {
                    return response || caches.match('https://codegaze.github.io/offline');
                })
        })
    
}

function updateStaticAssets()
{
  return caches.open(version + staticAssetsCacheName)
    .then(function (cache) {
      cache.addAll(staticSecondaryAssets);
      return cache.addAll(staticPrimaryAssets);
    });
}


function isStaticImage(request)
{
    if (request.headers.get('Accept').indexOf('image') !== -1) {
        return true;
    }
    return false;
}

function isHTMLContent(request)
{
    if (request.headers.get('Accept').indexOf('text/html') !== -1) {
        return true;
    }
    return false;
}
 

if ('serviceWorker' in navigator) {
  console.log(' ☑ Service Worker Is available. Yeah!');
  navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });
}