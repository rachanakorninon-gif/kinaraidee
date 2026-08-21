// กินอะไรดี — PWA install helper for beta testers
(function(){
  let deferredPrompt=null;
  function installed(){return window.matchMedia?.('(display-mode: standalone)').matches||window.navigator.standalone===true}
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
  });
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ensureButton);else ensureButton();
})();