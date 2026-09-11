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
  function ensureProductEvents(){
    ensureAcquisition();
    if(window.KINARAIDEE_PRODUCT_EVENTS||document.querySelector('script[src="data/product-events.js"]'))return;
    const s=document.createElement('script');
    s.src='data/product-events.js';
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
  function installSelectedStateA11y(){
    const selector='#mealChips .option,#peopleChips .pill,#budgetChips .budget,#typeChips .chip';
    const controls=[...document.querySelectorAll(selector)];
    if(!controls.length)return;
    const sync=control=>control.setAttribute('aria-pressed',control.classList.contains('on')?'true':'false');
    controls.forEach(sync);
    if(document.documentElement.dataset.kinaraideeSelectedStateA11y==='1')return;
    document.documentElement.dataset.kinaraideeSelectedStateA11y='1';
    const observer=new MutationObserver(records=>{
      records.forEach(record=>{
        const control=record.target;
        if(control instanceof Element&&control.matches(selector))sync(control);
      });
    });
    controls.forEach(control=>observer.observe(control,{attributes:true,attributeFilter:['class']}));
  }
  function installScreenFocusA11y(){
    if(document.documentElement.dataset.kinaraideeScreenFocusA11y==='1')return;
    const targets={
      home:'.heroTitle',
      mealStep:'.stepHead h1',
      peopleStep:'.topbar b',
      budgetStep:'.topbar b',
      typeStep:'.stepHead h1',
      loading:'.loading h2',
      result:'.topbar b',
      history:'.topbar b'
    };
    Object.entries(targets).forEach(([id,selector])=>{
      const target=document.querySelector(`#${id} ${selector}`);
      if(!target)return;
      target.dataset.screenFocus='1';
      target.setAttribute('tabindex','-1');
      if(!/^H[1-6]$/.test(target.tagName)){
        target.setAttribute('role','heading');
        target.setAttribute('aria-level','1');
      }
    });
    const originalShow=window.show;
    if(typeof originalShow!=='function')return;
    const focusDestination=id=>{
      // Loading is intentionally transient: the existing Surprise live region owns
      // its busy announcement, while Result receives deterministic focus next.
      if(id==='loading')return;
      const screen=document.getElementById(id);
      if(!screen||!screen.classList.contains('active'))return;
      const target=screen.querySelector('[data-screen-focus="1"]');
      if(!target)return;
      const focus=()=>{
        if(!screen.classList.contains('active'))return;
        try{target.focus({preventScroll:true})}catch(e){target.focus()}
      };
      if(typeof window.requestAnimationFrame==='function')window.requestAnimationFrame(focus);
      else setTimeout(focus,0);
    };
    window.show=function(id){
      originalShow(id);
      focusDestination(id);
    };
    document.documentElement.dataset.kinaraideeScreenFocusA11y='1';
  }
  function ensurePremiumHomeStyles(){
    if(document.getElementById('kinaraideeHomeV3Styles'))return;
    const style=document.createElement('style');
    style.id='kinaraideeHomeV3Styles';
    style.textContent=`
      #home .homeHero.home-v3{
        position:relative;overflow:hidden;text-align:center;padding:24px 16px 20px;border-radius:30px;
        background:linear-gradient(180deg,rgba(255,255,255,.97),rgba(247,252,249,.96));
        border:1px solid #dce9e3;box-shadow:0 18px 42px rgba(31,93,72,.09)
      }
      #home .homeHero.home-v3:before,#home .homeHero.home-v3:after{
        content:"";position:absolute;border-radius:999px;pointer-events:none;z-index:0
      }
      #home .homeHero.home-v3:before{width:150px;height:150px;background:#dff5ea;right:-75px;top:110px}
      #home .homeHero.home-v3:after{width:120px;height:120px;background:#fff0cf;left:-66px;top:330px}
      #home .homeHero.home-v3>*{position:relative;z-index:1}
      #home .homeHero.home-v3 .brand{font-size:36px;letter-spacing:-1px;color:#18352f}
      #home .homeHero.home-v3 .tagline{margin-top:7px;color:#4f756b;font-weight:800}
      #home .homeHero.home-v3 .betaBadge{margin-top:12px;border:1px solid #c9ece1;background:#e9f9f4;color:#0c7164}
      #home .homeHero.home-v3 .heroTitle{font-size:34px;line-height:1.12;margin:17px 0 2px;letter-spacing:-1px}
      #home .homeHero.home-v3 .mascot{font-size:70px;margin:0;position:absolute!important;left:50%;top:50%;transform:translate(-50%,-50%)}
      #home .homeHero.home-v3 .primary,#home .homeHero.home-v3 .secondary{min-height:56px;border-radius:18px}
      #home .homeHero.home-v3 .primary{background:linear-gradient(135deg,#ff8a23,#ff7310);color:#2f241c;box-shadow:0 10px 24px rgba(255,123,25,.2)}
      #home .homeHero.home-v3 #homeSurpriseBtn{background:linear-gradient(135deg,#139987,#0d7f72)!important;color:#fff!important;box-shadow:0 10px 24px rgba(18,140,121,.18)}
      #home .homeHero.home-v3 .secondary{background:#fff;border:1px solid #dce9e3;color:#17352f}
      #home .homeHero.home-v3 .quick{gap:10px}
      #home .homeHero.home-v3 .quick button{min-height:72px;border:1px solid #dce9e3;background:rgba(255,255,255,.96);border-radius:18px;font-weight:900;color:#17352f}
      #home .homeHero.home-v3 .betaLinks{margin-top:16px}
      #home .homeHero.home-v3 .betaLinks a{font-weight:750;color:#5f756e;text-decoration:none}
      #home .home-v3-orbit{width:258px;height:190px;margin:16px auto 14px;position:relative}
      #home .home-v3-chip{position:absolute;width:78px;height:78px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#fff;border:1px solid #dce9e3;box-shadow:0 9px 22px rgba(40,102,82,.08);font-size:30px}
      #home .home-v3-chip small{font-size:10px;margin-top:2px;color:#526b63;font-weight:850}
      #home .home-v3-chip.c1{left:0;top:5px}#home .home-v3-chip.c2{right:0;top:5px}#home .home-v3-chip.c3{left:4px;bottom:3px}#home .home-v3-chip.c4{right:4px;bottom:3px}
      #home .home-v3-center{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:118px;height:118px;border-radius:50%;background:radial-gradient(circle at 50% 42%,#fff 0 35%,#e1f4ed 36% 100%);border:7px solid #fff;box-shadow:0 14px 34px rgba(40,102,82,.14)}
      #home+.stats,#home .stats{gap:10px}
      #home .stats>div{background:linear-gradient(180deg,#f4fbf7,#fff);border:1px solid #dce9e3;border-radius:17px;padding:12px}
      .nav{z-index:20}
      @media(max-width:390px){#home .homeHero.home-v3 .brand{font-size:32px}#home .homeHero.home-v3 .heroTitle{font-size:30px}#home .home-v3-orbit{width:235px;height:178px}#home .home-v3-chip{width:72px;height:72px}}
    `;
    document.head.appendChild(style);
  }
  function decorateHome(home){
    if(!home)return;
    ensurePremiumHomeStyles();
    home.classList.add('home-v3');
    if(document.getElementById('homeV3Orbit'))return;
    const mascot=home.querySelector('.mascot');
    if(!mascot)return;
    const orbit=document.createElement('div');
    orbit.id='homeV3Orbit';
    orbit.className='home-v3-orbit';
    orbit.setAttribute('aria-hidden','true');
    orbit.innerHTML='<div class="home-v3-chip c1">🍳<small>จานเดียว</small></div><div class="home-v3-chip c2">🌶️<small>อาหารไทย</small></div><div class="home-v3-center"></div><div class="home-v3-chip c3">🥗<small>เบา ๆ</small></div><div class="home-v3-chip c4">🍜<small>เส้น</small></div>';
    orbit.querySelector('.home-v3-center').appendChild(mascot);
    const title=home.querySelector('.heroTitle');
    if(title)home.insertBefore(orbit,title);else home.appendChild(orbit);
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
  function bindPreferenceSurprise(){
    const b=document.querySelector('#typeChips .chip[data-surprise]');
    if(!b||b.dataset.kinaraideeInstantAction==='1')return;
    const selectOnly=b.onclick;
    b.dataset.kinaraideeInstantAction='1';
    b.onclick=event=>{
      if(typeof selectOnly==='function')selectOnly.call(b,event);
      if(typeof startRecommend==='function')startRecommend();
    };
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
    installSelectedStateA11y();
    installScreenFocusA11y();
    ensureAcquisition();
    ensureProductEvents();
    ensureMemberSync();
    ensurePwaInstallHelper();
    bindPreferenceSurprise();
    const home=document.querySelector('#home .homeHero');
    if(!home)return;
    decorateHome(home);
    if(document.getElementById('homeSurpriseBtn'))return;
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
    document.body.appendChild(status);

    const group=[...home.querySelectorAll('button')].find(x=>x.textContent.includes('เลือกพร้อมกัน'));
    if(group)home.insertBefore(b,group);else home.appendChild(b);
  }
  ensureAcquisition();
  ensureProductEvents();
  ensureMemberSync();
  window.addEventListener('pageshow',recover);
  window.addEventListener('online',recover);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
