// กินอะไรดี — instant “ไม่รู้เลย” action on the home screen
(function(){
  let busy=false;
  const READY_LABEL='ไม่รู้เลย ให้ระบบเลือกเมนูอาหารให้ทันที';
  const BUSY_MESSAGE='กำลังเลือกเมนูอาหารให้ กรุณารอสักครู่';
  function inferMeal(){
    const h=new Date().getHours();
    if(h>=5&&h<11)return 'เช้า';
    if(h>=11&&h<16)return 'กลางวัน';
    if(h>=16&&h<22)return 'เย็น';
    return 'ดึก';
  }
  function setBusy(on){
    busy=on;
    const b=document.getElementById('homeSurpriseBtn');
    const status=document.getElementById('homeSurpriseStatus');
    if(!b)return;
    b.disabled=on;
    b.setAttribute('aria-disabled',on?'true':'false');
    b.setAttribute('aria-busy',on?'true':'false');
    b.setAttribute('aria-label',on?BUSY_MESSAGE:READY_LABEL);
    b.style.opacity=on?'.7':'1';
    b.textContent=on?'🎲 กำลังเลือกให้…':'🎲 ไม่รู้เลย — เลือกให้ฉันทันที';
    if(status)status.textContent=on?BUSY_MESSAGE:'';
  }
  function recover(){setBusy(false)}
  function runSurprise(){
    if(busy)return;
    setBusy(true);
    try{if(typeof resetPrefs==='function')resetPrefs()}catch(e){}
    try{
      prefs.meal=inferMeal();
      prefs.people=1;
      prefs.budget=999;
      prefs.types=[];
      if(typeof show==='function')show('loading');
      setTimeout(()=>{
        try{
          if(typeof recommendNow==='function')recommendNow();
          else if(typeof startFresh==='function')startFresh();
        }catch(e){
          if(typeof startFresh==='function')startFresh();
        }finally{
          setBusy(false);
        }
      },650);
    }catch(e){
      setBusy(false);
      if(typeof startFresh==='function')startFresh();
    }
  }
  function install(){
    const home=document.querySelector('#home .homeHero');
    if(!home||document.getElementById('homeSurpriseBtn'))return;
    const b=document.createElement('button');
    b.id='homeSurpriseBtn';
    b.type='button';
    b.className='primary';
    b.setAttribute('aria-label',READY_LABEL);
    b.setAttribute('aria-busy','false');
    b.setAttribute('aria-disabled','false');
    b.textContent='🎲 ไม่รู้เลย — เลือกให้ฉันทันที';
    b.style.background='#0f9d94';
    b.onclick=runSurprise;

    const status=document.createElement('span');
    status.id='homeSurpriseStatus';
    status.setAttribute('role','status');
    status.setAttribute('aria-live','assertive');
    status.setAttribute('aria-atomic','true');
    status.style.cssText='position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);clip-path:inset(50%);white-space:nowrap;border:0;';

    const group=[...home.querySelectorAll('button')].find(x=>x.textContent.includes('เลือกพร้อมกัน'));
    if(group){home.insertBefore(b,group);home.insertBefore(status,group)}
    else{home.appendChild(b);home.appendChild(status)}
  }
  window.addEventListener('pageshow',recover);
  window.addEventListener('online',recover);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();