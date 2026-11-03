// 늘 최신 파일을 먼저 받고, 인터넷이 없으면 저장해 둔 걸 써요
const C='monawara-v6';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin) return;
  e.respondWith(fetch(e.request).then(r=>{ const c=r.clone(); caches.open(C).then(x=>x.put(e.request,c)); return r; }).catch(()=>caches.match(e.request)));
});
