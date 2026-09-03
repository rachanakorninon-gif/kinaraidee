// กินอะไรดี — instant “ไม่รู้เลย” action on the home screen
(function(){
  let busy=false;
  let statusWriteTimer=null;
  let statusClearTimer=null;
  const READY_LABEL='ไม่รู้เลย ให้ระบบเลือกเมนูอาหารให้ทันที';
  const BUSY_MESSAGE='กำลังเลือกเมนูอาหารให้ กรุณารอสักครู่';
  function inferMeal(){
    const h=new Date().getHours();
    if(h>=5&&h<11)return 'เช้า';
    if(h>=11&&h<16)return 'กลางวัน';
    if(h>=16&&h<22)return 'เย็น';
    return 'ดึก';
  }
  function ensureAcquisition(){
    if(window.KINARAIDEE_ACQUISITION||document.querySelector('script[src="data/acquisition.js"]'))return;
    const s=document.createElement('script');
    s.src='data/acquisition.js';
    s.async=false;
    document.body.appendChild(s);
  }
  function ensureMemberSync(){
    ensureAcquisition();
    if(window.KINARAIDEE_MEMBER_SYNC||document.querySelector('script[src="data/member-sync.js"]'))return;
    const s=document.createElement('script');
    s.src='data/member-sync.js';
    s.async=false;
    document.body.appendChild(s);
  }
  function ensureAccessibilityStyles(){
    if(document.getElementById('kinaraideeAccessibilityStyles'))return;
    const style=document.createElement('style');
    style.id='kinaraideeAccessibilityStyles';
    style.textContent=`
      button:focus-visible,a:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible,[tabindex]:focus-visible{
        outline:3px solid #0b6bcb;
        outline-offset:3px;
      }
      @media (prefers-reduced-motion: reduce){
        *,*::before,*::after{
          scroll-behavior:auto !important;
          animation-duration:.01ms !important;
          animation-iteration-count:1 !important;
          transition-duration:.01ms !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
  function announceBusy(status){
    if(!status)return;
    if(statusWriteTimer)clearTimeout(statusWriteTimer);
    if(statusClearTimer)clearTimeout(statusClearTimer);
    status.textContent='';
    statusWriteTimer=setTimeout(()=>{
      statusWriteTimer=null;
      status.textContent=BUSY_MESSAGE;
    },40);
  }
  function clearStatusLater(status){
    if(!status)return;
    if(statusClearTimer)clearTimeout(statusClearTimer);
    statusClearTimer=setTimeout(()=>{
      statusClearTimer=null;
      if(!busy)status.textContent='';
    },1200);
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
    if(on)announceBusy(status);else clearStatusLater(status);
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
  function ensurePwaInstallHelper(){
    if(document.querySelector('script[src="data/pwa-install.js"]'))return;
    const s=document.createElement('script');
    s.src='data/pwa-install.js';
    s.async=false;
    document.body.appendChild(s);
  }
  function install(){
    ensureAccessibilityStyles();
    ensureAcquisition();
    // index.html loads this helper directly. Start member sync before the user can
    // create a favorite, then bridge the PWA install helper as before.
    ensureMemberSync();
    ensurePwaInstallHelper();
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
    // Keep the live region outside #home because show('loading') hides every inactive .screen.
    // A live region inside #home disappears from the accessibility tree before TalkBack can announce it.
    document.body.appendChild(status);

    const group=[...home.querySelectorAll('button')].find(x=>x.textContent.includes('เลือกพร้อมกัน'));
    if(group)home.insertBefore(b,group);else home.appendChild(b);
  }
  ensureAcquisition();
  ensureMemberSync();
  window.addEventListener('pageshow',recover);
  window.addEventListener('online',recover);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
