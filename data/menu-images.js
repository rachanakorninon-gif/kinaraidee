// กินอะไรดี — AI menu illustration rendering for Result + Favorite/History.
(function(){
  const manifest=window.KINARAIDEE_MENU_IMAGE_MANIFEST;
  if(!manifest||!Array.isArray(manifest.menus))return;

  const byName=new Map(manifest.menus.map(item=>[item.name,item]));
  const root=String(manifest.assetRoot||'./assets/menu-images').replace(/\/$/,'');
  const widths=Array.isArray(manifest.widths)&&manifest.widths.length?manifest.widths:[640,1120];
  const largest=Math.max(...widths);
  const fallback=`${root}/fallback.svg`;

  function entryFor(name){return byName.get(String(name||''))||null}
  function readyEntry(name){
    const entry=entryFor(name);
    return entry&&entry.status==='ready'?entry:null;
  }
  function srcset(entry){
    return widths.map(width=>`${root}/${entry.filename}-${width}.webp ${width}w`).join(', ');
  }
  function ensureStyles(){
    if(document.getElementById('kinaraideeMenuImageStyles'))return;
    const style=document.createElement('style');
    style.id='kinaraideeMenuImageStyles';
    style.textContent=`
      .foodMedia .menuVisual{display:block;width:100%;height:100%}
      .foodMedia .menuVisual img{display:block;width:100%;height:100%;object-fit:cover}
      .menuIllustrationLabel{margin:8px 2px 0;font-size:12px;line-height:1.35;color:#75685d}
      .history{position:relative;min-height:78px;padding-left:82px}
      .history .menuHistoryVisual{position:absolute;left:0;top:10px;width:68px;height:68px;border-radius:14px;overflow:hidden;background:#fff0d5}
      .history .menuHistoryVisual img{display:block;width:100%;height:100%;object-fit:cover}
      @media(max-width:360px){.history{padding-left:72px}.history .menuHistoryVisual{width:58px;height:58px}}
    `;
    document.head.appendChild(style);
  }
  function makePicture(name,className){
    const entry=readyEntry(name);
    const picture=document.createElement('picture');
    picture.className=className;
    picture.dataset.menuVisual='1';

    const img=document.createElement('img');
    img.alt=`ภาพประกอบเมนู ${name}`;
    img.loading='lazy';
    img.decoding='async';
    img.width=largest;
    img.height=largest;
    if(entry){
      img.srcset=srcset(entry);
      img.sizes=className==='menuHistoryVisual'?'68px':'(max-width: 560px) calc(100vw - 68px), 492px';
      img.src=`${root}/${entry.filename}-${largest}.webp`;
    }else{
      img.src=fallback;
      img.dataset.fallback='1';
    }
    img.addEventListener('error',()=>{
      if(img.dataset.fallback==='1')return;
      img.dataset.fallback='1';
      img.removeAttribute('srcset');
      img.removeAttribute('sizes');
      img.src=fallback;
    },{once:true});
    picture.appendChild(img);
    return picture;
  }
  function decorateResult(){
    const media=document.querySelector('#result .foodMedia');
    const name=window.KINARAIDEE_RESULT_CONTEXT?.food||document.getElementById('foodName')?.textContent||'';
    if(!media||!name)return;
    ensureStyles();
    media.querySelectorAll('[data-menu-visual="1"]').forEach(node=>node.remove());
    media.prepend(makePicture(name,'menuVisual'));
    const legacyPhoto=document.getElementById('foodPhoto');
    const emoji=document.getElementById('emoji');
    if(legacyPhoto)legacyPhoto.style.display='none';
    if(emoji)emoji.style.display='none';

    let label=document.getElementById('menuIllustrationLabel');
    if(!label){
      label=document.createElement('div');
      label.id='menuIllustrationLabel';
      label.className='menuIllustrationLabel';
      media.insertAdjacentElement('afterend',label);
    }
    label.textContent=manifest.disclaimer||'ภาพประกอบเมนู ไม่ใช่ภาพจริงจากร้านอาหาร';
  }
  function readHistory(){
    try{return JSON.parse(localStorage.getItem('kinaraideeHistory')||'[]')}
    catch(e){return[]}
  }
  function decorateHistory(){
    const list=document.getElementById('historyList');
    if(!list)return;
    ensureStyles();
    const items=readHistory();
    const rows=[...list.querySelectorAll('.history')];
    rows.forEach((row,index)=>{
      row.querySelectorAll('[data-menu-visual="1"]').forEach(node=>node.remove());
      const item=items[index];
      if(!item?.name)return;
      row.prepend(makePicture(item.name,'menuHistoryVisual'));
    });
  }

  const originalResult=window.renderResult;
  if(typeof originalResult==='function'){
    window.renderResult=function(){
      const value=originalResult.apply(this,arguments);
      decorateResult();
      return value;
    };
  }
  const originalHistory=window.renderHistory;
  if(typeof originalHistory==='function'){
    window.renderHistory=function(){
      const value=originalHistory.apply(this,arguments);
      decorateHistory();
      return value;
    };
  }

  window.KINARAIDEE_MENU_IMAGES=Object.freeze({
    manifest,
    entryFor,
    decorateResult,
    decorateHistory
  });

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',()=>{
      if(document.getElementById('result')?.classList.contains('active'))decorateResult();
      if(document.getElementById('history')?.classList.contains('active'))decorateHistory();
    },{once:true});
  }
})();
