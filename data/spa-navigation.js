(()=>{
  const STATE_KEY='__kinaraideeSpa';
  const TRANSIENT=new Set(['loading']);
  const root=document.documentElement;

  if(root.dataset.kinaraideeSpaHistory==='1')return;
  if(typeof window.show!=='function'||!window.history||typeof window.history.pushState!=='function'||typeof window.history.replaceState!=='function')return;

  const renderShow=window.show;
  let restoring=false;

  function activeScreen(){
    return document.querySelector('.screen.active')?.id||'home';
  }
  function isAppState(state){
    return !!(state&&state[STATE_KEY]===1&&typeof state.screen==='string');
  }
  function statePayload(screen,prev){
    return {[STATE_KEY]:1,screen,prev:prev||null};
  }
  function canRender(screen){
    return !!(screen&&document.getElementById(screen));
  }

  const initial=activeScreen();
  const existing=(history.state&&typeof history.state==='object')?history.state:{};
  history.replaceState({...existing,...statePayload(initial,null)},'',location.href);

  window.show=function(id){
    if(restoring||TRANSIENT.has(id)||!canRender(id))return renderShow.apply(this,arguments);

    const state=history.state;
    const current=activeScreen();
    if(isAppState(state)&&state.screen===id)return renderShow.apply(this,arguments);

    if(isAppState(state)&&state.prev===id){
      history.back();
      return;
    }

    const previous=isAppState(state)?state.screen:current;
    history.pushState(statePayload(id,previous),'',location.href);
    return renderShow.apply(this,arguments);
  };

  window.addEventListener('popstate',event=>{
    const state=event.state;
    if(!isAppState(state)||!canRender(state.screen))return;
    restoring=true;
    try{renderShow(state.screen)}finally{restoring=false}
  });

  root.dataset.kinaraideeSpaHistory='1';
})();
