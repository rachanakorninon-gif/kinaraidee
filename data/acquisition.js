// กินอะไรดี — privacy-conscious first-touch acquisition capture
(function(){
  const STORAGE_KEY='kinaraideeAcquisitionV1';
  const MAX_AGE_MS=30*24*60*60*1000;
  const UTM_KEYS=['utm_source','utm_medium','utm_campaign','utm_content'];

  function safeSlug(value,max=80){
    const v=String(value||'').trim().toLowerCase();
    if(!v||v.length>max||!/^[a-z0-9_-]+$/.test(v))return null;
    return v;
  }

  function safeReferral(value){
    const v=String(value||'').trim().toUpperCase();
    if(!v||v.length>24||!/^[A-Z0-9_-]+$/.test(v))return null;
    return v;
  }

  function read(){
    try{
      const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
      if(!parsed||typeof parsed!=='object')return null;
      const firstSeenAt=Number(parsed.first_seen_at)||0;
      if(!firstSeenAt||Date.now()-firstSeenAt>MAX_AGE_MS){
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return parsed;
    }catch(e){return null;}
  }

  function write(value){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(value))}catch(e){}
  }

  function capture(){
    let params;
    try{params=new URLSearchParams(location.search)}catch(e){return read()}
    const existing=read()||{first_seen_at:Date.now()};
    let changed=!read();

    UTM_KEYS.forEach(key=>{
      if(existing[key])return;
      const value=safeSlug(params.get(key));
      if(value){existing[key]=value;changed=true;}
    });

    if(!existing.referral_code){
      const referral=safeReferral(params.get('ref'));
      if(referral){existing.referral_code=referral;changed=true;}
    }

    if(changed)write(existing);
    return existing;
  }

  function signupMetadata(){
    const a=capture()||{};
    const out={};
    if(a.referral_code)out.kinaraidee_referral_code=a.referral_code;
    if(a.utm_source)out.kinaraidee_utm_source=a.utm_source;
    if(a.utm_medium)out.kinaraidee_utm_medium=a.utm_medium;
    if(a.utm_campaign)out.kinaraidee_utm_campaign=a.utm_campaign;
    if(a.utm_content)out.kinaraidee_utm_content=a.utm_content;
    return out;
  }

  function clear(){
    try{localStorage.removeItem(STORAGE_KEY)}catch(e){}
  }

  window.KINARAIDEE_ACQUISITION={capture,get:read,signupMetadata,clear};
  capture();
})();
