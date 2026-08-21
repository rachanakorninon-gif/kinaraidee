const CACHE='kinaraidee-beta-v4';
const SHELL=[
  './','./index.html','./404.html','./manifest.webmanifest','./icon.svg',
  './feedback.html','./privacy.html','./partner.html','./robots.txt','./sitemap.xml',
  './data/foods-expanded.js','./data/choice-rules.js',
  './data/group-mode.js','./data/group-sync.js','./data/group-remote.js',
  './data/member-sync.js','./data/nearby-restaurants.js','./data/pwa-install.js'
];
self.addEventListener('install',event=>event.waitUntil(
  caches.open(CACHE).then(cache=>Promise.allSettled(SHELL.map(url=>cache.add(url)))).then(()=>self.skipWaiting())
));
self.addEventListener('activate',event=>event.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==location.origin)return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(response=>{
      const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;
    }).catch(async()=>await caches.match(event.request)||await caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}
    return response;
  })));
});