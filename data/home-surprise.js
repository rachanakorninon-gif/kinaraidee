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
  function ensureMemberSync(){
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
  function ensureCampaignStyles(){
    if(document.getElementById('kinaraideeCampaignStyles'))return;
    const style=document.createElement('style');
    style.id='kinaraideeCampaignStyles';
    style.textContent=`
      .campaign3000{margin:14px 0 2px;background:#111;color:#fff;border-radius:24px;padding:17px;text-align:left;box-shadow:0 12px 30px rgba(0,0,0,.10)}
      .campaign3000Top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
      .campaign3000Eyebrow{color:#ffd341;font-size:12px;font-weight:950;letter-spacing:.02em}
      .campaign3000Title{font-size:21px;line-height:1.25;font-weight:950;margin-top:4px}
      .campaign3000Prize{color:#ff7298;font-weight:950;margin-top:5px}
      .campaign3000Phone{font-size:42px;line-height:1}
      .campaign3000Status{margin-top:12px;background:#292929;border-radius:14px;padding:10px 12px;font-size:13px;line-height:1.45;color:#eee}
      .campaign3000Cta{display:block;margin-top:11px;background:#ff4f7f;color:#fff;text-decoration:none;text-align:center;border-radius:14px;padding:12px;font-weight:950}
      .campaign3000Fine{margin-top:8px;color:#cfcfcf;font-size:11px;line-height:1.45}
    `;
    document.head.appendChild(style);
  }
  function installCampaignBanner(){
    if(document.getElementById('campaign3000Banner'))return;
    const hero=document.querySelector('#home .homeHero');
    if(!hero||!hero.parentNode)return;
    ensureCampaignStyles();
    const card=document.createElement('section');
    card.id='campaign3000Banner';
    card.className='campaign3000';
    card.setAttribute('aria-label','แคมเปญ 3,000 Premium เตรียมเปิด');
    card.innerHTML=`
      <div class="campaign3000Top">
        <div>
          <div class="campaign3000Eyebrow">🎉 แคมเปญเตรียมเปิด</div>
          <div class="campaign3000Title">3,000 Premium ลุ้นรางวัลใหญ่</div>
          <div class="campaign3000Prize">iPhone 17 Pro Max 256GB • 1 เครื่อง</div>
        </div>
        <div class="campaign3000Phone" aria-hidden="true">📱</div>
      </div>
      <div class="campaign3000Status"><b>0 / 3,000</b> • ยังไม่เริ่มนับสิทธิ์<br>Premium แบบชำระเงินจริงและกติกากิจกรรมยังอยู่ในช่วงเตรียมเปิด</div>
      <a class="campaign3000Cta" href="campaign-3000-premium.html">ดูรายละเอียดแคมเปญ ›</a>
      <div class="campaign3000Fine">การสมัครบัญชีทั่วไปตอนนี้ยังไม่ถือเป็นสิทธิ์ลุ้นรางวัล</div>
    `;
    hero.parentNode.insertBefore(card,hero.nextSibling);
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
    ensureMemberSync();
    ensurePwaInstallHelper();
    installCampaignBanner();
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
    document.body.appendChild(status);

    const group=[...home.querySelectorAll('button')].find(x=>x.textContent.includes('เลือกพร้อมกัน'));
    if(group)home.insertBefore(b,group);else home.appendChild(b);
  }
  ensureMemberSync();
  window.addEventListener('pageshow',recover);
  window.addEventListener('online',recover);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();