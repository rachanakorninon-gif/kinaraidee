// กินอะไรดี — Group Mode Phase 2B backend-ready adapter
// This file does not choose a vendor. Configure window.KINARAIDEE_SYNC_CONFIG.apiBase
// with a REST backend that implements the endpoints documented below.
(function(){
  const cfg=()=>window.KINARAIDEE_SYNC_CONFIG||{};
  const base=()=>String(cfg().apiBase||'').replace(/\/$/,'');
  const enabled=()=>/^https?:\/\//.test(base());
  async function request(path,options={}){
    if(!enabled()) throw new Error('sync-not-configured');
    const res=await fetch(base()+path,{headers:{'Content-Type':'application/json',...(options.headers||{})},...options});
    if(!res.ok){const text=await res.text().catch(()=>String(res.status));throw new Error(text||('HTTP '+res.status))}
    if(res.status===204)return null;
    return res.json();
  }
  const api={
    enabled,
    async createRoom(input){return request('/rooms',{method:'POST',body:JSON.stringify(input)})},
    async getRoom(roomId){return request('/rooms/'+encodeURIComponent(roomId))},
    async submitVote(roomId,voterId,tags){return request('/rooms/'+encodeURIComponent(roomId)+'/votes',{method:'POST',body:JSON.stringify({voterId,tags})})},
    async getVotes(roomId){return request('/rooms/'+encodeURIComponent(roomId)+'/votes')},
    async closeRoom(roomId){return request('/rooms/'+encodeURIComponent(roomId)+'/close',{method:'POST',body:'{}'})}
  };
  window.KINARAIDEE_GROUP_SYNC=api;
})();

/*
Expected backend contract for Phase 2B:
POST /rooms
  body: {meal,budget,size}
  -> {id,meal,budget,size,status:'open',createdAt}
GET /rooms/:id
  -> same room object
POST /rooms/:id/votes
  body: {voterId,tags:[0..3 valid choice keys]}
  -> {ok:true,count,total}
  Rules: voterId is idempotent per room; re-submit replaces that voter's vote.
GET /rooms/:id/votes
  -> {roomId,count,total,votes:[{voterId,tags}]}
POST /rooms/:id/close
  -> {ok:true,status:'closed'}

Backend must enforce: room size 2..6, allowed meal/budget values, max 3 tags,
unique voterId per room, no writes after close, and CORS for the deployed app origin.
*/