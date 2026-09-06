const CACHE="joe-english-v4";
const ASSETS=["./","./index.html","./style.css","./app.js","./course.json","./manifest.webmanifest"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener("activate",e=>e.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
));
self.addEventListener("fetch",e=>{
  const url=new URL(e.request.url);
  if(url.pathname.startsWith("/api/")) return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
