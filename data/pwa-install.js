// กินอะไรดี — PWA install helper for beta testers
(function(){
  let deferredPrompt=null;
  const IOS_HINT_KEY='kinaraideeIosInstallHintDismissedAt';
  const HINT_COOLDOWN_MS=7*24*60*60*1000;
  function installed(){return window.matchMedia?.('(display-mode: standalone)').matches||window.navigator.standalone===true}
  function isIOS(){const ua=navigator.userAgent||'';return /iphone|ipad|ipod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)}
  function hintDismissedRecently(){try{const t=Number(localStorage.getItem(IOS_HINT_KEY)||0);return t&&Date.now()-t<HINT_COOLDOWN_MS}catch(e){return false}}
  function loadScript(src){if(document.querySelector(`script[src="${src}"]`))return;const s=document.createElement('script');s.src=src;s.async=false;document.body.appendChild(s)}
  function ensureIOSHint(){
    if(installed()||!isIOS()||hintDismissedRecently()||document.getElementById('iosInstallHint'))return;
    const home=document.querySelector('#home .homeHero');
    if(!home)return;
    const d=document.createElement('div');
    d.id='iosInstallHint';
    d.style.cssText='margin:10px 0;padding:11px 13px;border-radius:14px;background:#f5f7ff;color:#44506a;font-size:13px;line-height:1.5;text-align:left';
    d.innerHTML='<div><b>ติดตั้งบน iPhone/iPad</b></div><div>เปิดใน Safari กดปุ่มแชร์ แล้วเลือก “เพิ่มไปยังหน้าจอโฮม”</div><button type="button" id="iosInstallHintDismiss" style="margin-top:8px;border:0;background:transparent;color:#5368a6;font-weight:800;padding:4px 0">เข้าใจแล้ว</button>';
    const links=home.querySelector('.betaLinks');
    if(links)home.insertBefore(d,links);else home.appendChild(d);
    document.getElementById('iosInstallHintDismiss').onclick=()=>{try{localStorage.setItem(IOS_HINT_KEY,String(Date.now()))}catch(e){}d.remove()};
  }
  function ensureButton(){
    if(installed()||document.getElementById('installAppBtn'))return;
    const home=document.querySelector('#home .homeHero');
    if(!home)return;
    const b=document.createElement('button');
    b.id='installAppBtn';
    b.className='secondary';
    b.style.display='none';
    b.textContent='📲 ติดตั้งแอปบนมือถือ';
    b.onclick=async()=>{
      if(!deferredPrompt)return;
      b.disabled=true;
      deferredPrompt.prompt();
      try{await deferredPrompt.userChoice}catch(e){}
      deferredPrompt=null;
      b.style.display='none';
      b.disabled=false;
    };
    const links=home.querySelector('.betaLinks');
    if(links)home.insertBefore(b,links);else home.appendChild(b);
  }
  function init(){ensureButton();ensureIOSHint();loadScript('data/home-surprise.js')}
  window.addEventListener('beforeinstallprompt',e=>{
    e.preventDefault();
    deferredPrompt=e;
    ensureButton();
    const b=document.getElementById('installAppBtn');
    if(b)b.style.display='block';
  });
  window.addEventListener('appinstalled',()=>{
    deferredPrompt=null;
    const b=document.getElementById('installAppBtn');
    if(b)b.remove();
    const d=document.getElementById('iosInstallHint');
    if(d)d.remove();
  });
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();