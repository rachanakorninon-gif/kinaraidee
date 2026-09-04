// กินอะไรดี — privacy-minimal product funnel telemetry for reviewed UTM traffic
(function(){
  const API='https://cuspfvfzprlgtvtdyilh.supabase.co/functions/v1/product-event-api';
  const SESSION_KEY='kinaraideeProductEventSessionV1';
  const SENT_KEY='kinaraideeProductEventSentV1';
  const EVENTS=new Set(['landing','guided_start','surprise_tap','recommendation_result','nearby_tap']);
  const UUID_RE=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  let observer=null;

  function acquisition(){
    const a=window.KINARAIDEE_ACQUISITION?.get?.();
    if(!a)return null;
    const required=['utm_source','utm_medium','utm_campaign','utm_content'];
    if(!required.every(k=>typeof a[k]==='string'&&a[k]))return null;
    return a;
  }

  function sessionId(){
    try{
      let id=sessionStorage.getItem(SESSION_KEY)||'';
      if(UUID_RE.test(id))return id;
      id=crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY,id);
      return id;
    }catch(e){
      try{return crypto.randomUUID()}catch(_e){return null}
    }
  }

  function sentSet(){
    try{
      const value=JSON.parse(sessionStorage.getItem(SENT_KEY)||'[]');
      return new Set(Array.isArray(value)?value:[]);
    }catch(e){return new Set()}
  }

  function markSent(name){
    try{
      const sent=sentSet();
      sent.add(name);
      sessionStorage.setItem(SENT_KEY,JSON.stringify([...sent]));
    }catch(e){}
  }

  async function track(name,retry=true){
    if(!EVENTS.has(name)||sentSet().has(name))return false;
    const a=acquisition(),sid=sessionId();
    if(!a||!sid)return false;
    const payload={
      session_id:sid,
      event_name:name,
      utm_source:a.utm_source,
      utm_medium:a.utm_medium,
      utm_campaign:a.utm_campaign,
      utm_content:a.utm_content
    };
    try{
      const r=await fetch(API,{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(payload),
        credentials:'omit',
        cache:'no-store',
        referrerPolicy:'no-referrer',
        keepalive:true
      });
      if(r.ok){markSent(name);return true}
    }catch(e){}
    if(retry&&navigator.onLine!==false)setTimeout(()=>track(name,false),1500);
    return false;
  }

  function installClicks(){
    document.addEventListener('click',event=>{
      const el=event.target?.closest?.('button,a');
      if(!el)return;
      if(el.id==='homeSurpriseBtn'||el.matches?.('[data-surprise]'))track('surprise_tap');
      const inline=el.getAttribute?.('onclick')||'';
      if(inline.includes('startFresh()'))track('guided_start');
      if(inline.includes('nearby()'))track('nearby_tap');
    },{capture:true,passive:true});
  }

  function installResultObserver(){
    const result=document.getElementById('result');
    if(!result)return;
    const check=()=>{if(result.classList.contains('active'))track('recommendation_result')};
    observer=new MutationObserver(check);
    observer.observe(result,{attributes:true,attributeFilter:['class']});
    check();
  }

  function start(attempt=0){
    if(!window.KINARAIDEE_ACQUISITION){
      if(attempt<8)return setTimeout(()=>start(attempt+1),125);
      return;
    }
    installClicks();
    installResultObserver();
    track('landing');
  }

  window.KINARAIDEE_PRODUCT_EVENTS={track};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>start());else start();
  window.addEventListener('online',()=>track('landing'));
  window.addEventListener('pagehide',()=>{try{observer?.disconnect()}catch(e){}});
})();
