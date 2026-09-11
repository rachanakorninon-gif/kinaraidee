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
