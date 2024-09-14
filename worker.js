const cacheName = "severstal"
const cacheFiles = [
    "/severstal/",
    "/severstal/index.html",
    "/severstal/logo.png",
    "/severstal/assets/index.js",
    "/severstal/assets/index.css",
    "/severstal/assets/manifest.webmanifest",
    "/severstal/model/model.json",
    "/severstal/model/group1-shard1of7.bin",
    "/severstal/model/group1-shard2of7.bin",
    "/severstal/model/group1-shard3of7.bin",
    "/severstal/model/group1-shard4of7.bin",
    "/severstal/model/group1-shard5of7.bin",
    "/severstal/model/group1-shard6of7.bin",
    "/severstal/model/group1-shard7of7.bin"
]

self.addEventListener("install", (e) => {
  console.log("Worker install");
  e.waitUntil(
      (async () => {
        const cache = await caches.open(cacheName);
        console.log("Caching all");
        await cache.addAll(cacheFiles);
      })(),
  );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        (async () => {
            const r = await caches.match(e.request);
            console.log(`Fetching ${e.request.url}`);
            if (r) return r;
            const response = await fetch(e.request);
            const cache = await caches.open(cacheName);
            console.log(`Caching ${e.request.url}`);
            cache.put(e.request, response.clone());
            return response;
        })(),
    );
});
