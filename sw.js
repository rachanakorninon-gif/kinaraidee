const CACHE='kinaraidee-beta-v12';
const SHELL=[
  './','./index.html','./404.html','./manifest.webmanifest','./icon.svg',
  './feedback.html','./privacy.html','./partner.html','./robots.txt','./sitemap.xml',
  './data/foods-expanded.js','./data/choice-rules.js',
  './data/group-mode.js','./data/group-sync.js','./data/group-remote.js',
  './data/member-sync.js','./data/nearby-restaurants.js','./data/pwa-install.js',
  './data/home-surprise.js'
];

self.addEventListener('install',event=>event.waitUntil(
  caches.open(CACHE)
    .then(cache=>cache.addAll(SHELL))
    .then(()=>self.skipWaiting())
));

self.addEventListener('activate',event=>event.waitUntil(
  caches.keys()
    .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
    .then(()=>self.clients.claim())
));

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;

  if(event.request.mode==='navigate'){
    event.respondWith((async()=>{
      try{
        const response=await fetch(event.request);
        if(response&&response.ok){
          const cache=await caches.open(CACHE);
          await cache.put(event.request,response.clone());
        }
        return response;
      }catch(error){
        return (await caches.match(event.request)) ||
          (await caches.match('./index.html')) ||
          (await caches.match('./404.html')) ||
          Response.error();
      }
    })());
    return;
  }

  event.respondWith((async()=>{
    try{
      const response=await fetch(event.request);
      if(response&&response.ok){
        const cache=await caches.open(CACHE);
        await cache.put(event.request,response.clone());
      }
      return response;
    }catch(error){
      return (await caches.match(event.request)) || Response.error();
    }
  })());
});
