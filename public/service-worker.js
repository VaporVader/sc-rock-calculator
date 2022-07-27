const appScope  = 'sc-rock-mining-calcualator';
const assets    = []; // currently nothing to cache, online online version.

/**
 * Install handling.
 * Store assest to the cache.
 */
self.addEventListener( "install", installEvent => {
    installEvent.waitUntil(
      caches.open( appScope ).then( cache => {
        cache.addAll( assets )
      })
    );
});

/**
 * Fetch handling.
 * When requesting something from the cache.
 */
self.addEventListener( "fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match( fetchEvent.request ).then( res => {
        return res || fetch( fetchEvent.request )
      })
    );
});