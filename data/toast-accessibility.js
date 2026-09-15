(()=>{
  const node=document.getElementById('toast');
  if(!node||node.dataset.kinaraideeToastA11y==='1'||typeof window.toast!=='function')return;

  node.dataset.kinaraideeToastA11y='1';
  node.setAttribute('role','status');
  node.setAttribute('aria-live','polite');
  node.setAttribute('aria-atomic','true');

  let revealFrame=0;
  let hideTimer=0;
  const schedule=typeof requestAnimationFrame==='function'
    ? requestAnimationFrame.bind(window)
    : fn=>setTimeout(fn,0);
  const cancelSchedule=typeof cancelAnimationFrame==='function'
    ? cancelAnimationFrame.bind(window)
    : clearTimeout;

  window.toast=message=>{
    const text=String(message??'');
    if(revealFrame)cancelSchedule(revealFrame);
    if(hideTimer)clearTimeout(hideTimer);

    node.classList.remove('show');
    node.textContent='';
    revealFrame=schedule(()=>{
      revealFrame=0;
      node.textContent=text;
      node.classList.add('show');
      hideTimer=setTimeout(()=>{
        hideTimer=0;
        node.classList.remove('show');
      },2200);
    });
  };
})();

(()=>{
  const nav=document.querySelector('.nav');
  const buttons=nav?[...nav.querySelectorAll('button')]:[];
  if(buttons.length!==3||typeof window.show!=='function')return;

  const screenToNav={
    home:0,
    mealStep:1,
    peopleStep:1,
    budgetStep:1,
    typeStep:1,
    loading:1,
    result:1,
    history:2
  };

  const style=document.createElement('style');
  style.dataset.kinaraideeNavCurrent='1';
  style.textContent='.nav button.kinaraidee-current{background:#fff3df;color:#7a3c00;font-weight:900;box-shadow:inset 0 3px 0 #ff8500}';
  document.head.appendChild(style);

  function syncNavCurrent(screenId){
    const currentIndex=screenToNav[screenId];
    if(currentIndex===undefined)return;
    buttons.forEach((button,index)=>{
      const current=index===currentIndex;
      button.classList.toggle('kinaraidee-current',current);
      if(current)button.setAttribute('aria-current','page');
      else button.removeAttribute('aria-current');
    });
  }

  const originalShow=window.show;
  window.show=function(id){
    const result=originalShow.apply(this,arguments);
    syncNavCurrent(id);
    return result;
  };

  const activeScreen=document.querySelector('.screen.active');
  syncNavCurrent(activeScreen?.id||'home');
})();

(()=>{
  function installResultMenuFocusTarget(){
    const screen=document.getElementById('result');
    const menu=document.getElementById('foodName');
    if(!screen||!menu)return;

    const previous=screen.querySelector('[data-screen-focus="1"]');
    if(previous&&previous!==menu){
      previous.removeAttribute('data-screen-focus');
      previous.removeAttribute('tabindex');
      if(previous.getAttribute('role')==='heading'&&previous.getAttribute('aria-level')==='1'){
        previous.removeAttribute('role');
        previous.removeAttribute('aria-level');
      }
    }

    menu.dataset.screenFocus='1';
    menu.setAttribute('tabindex','-1');
    menu.setAttribute('role','heading');
    menu.setAttribute('aria-level','1');
    menu.removeAttribute('aria-live');
  }

  const install=()=>setTimeout(installResultMenuFocusTarget,0);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
