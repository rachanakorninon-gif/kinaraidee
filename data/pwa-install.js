// กินอะไรดี — PWA install helper for beta testers
(function(){
  let deferredPrompt=null;
  function installed(){return window.matchMedia?.('(display-mode: standalone)').matches||window.navigator.standalone===true}
  function isIOS(){const ua=navigator.userAgent||'';return /iphone|ipad|ipod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)}
  function loadScript(src){if(document.querySelector(`script[src="${src}"]`))return;const s=document.createElement('script');s.src=src;s.async=false;document.body.appendChild(s)}
  function ensureIOSHint(){
    if(installed()||!isIOS()||document.getElementById('iosInstallHint'))return;
    const home=document.querySelector('#home .homeHero');
    if(!home)return;
    const d=document.createElement('div');
    d.id='iosInstallHint';
    d.style.cssText='margin:10px 0;padding:11px 13px;border-radius:14px;background:#f5f7ff;color:#44506a;font-size:13px;line-height:1.5';
    d.textContent='iPhone/iPad: หากต้องการติดตั้งแอป ให้เปิดใน Safari กดปุ่มแชร์ แล้วเลือก “เพิ่มไปยังหน้าจอโฮม”';
    const links=home.querySelector('.betaLinks');
    if(links)home.insertBefore(d,links);else home.appendChild(d);
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