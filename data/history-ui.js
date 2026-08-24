// กินอะไรดี — Favorite/history visual differentiation
(function(){
  function readItems(){
    try{return JSON.parse(localStorage.getItem('kinaraideeHistory')||'[]')}
    catch(e){return[]}
  }

  function ensureStyles(){
    if(document.getElementById('kinaraideeHistoryUiStyles'))return;
    const style=document.createElement('style');
    style.id='kinaraideeHistoryUiStyles';
    style.textContent='.historySummary{background:#edfaf8;border-radius:14px;padding:10px 12px;margin-bottom:8px;font-weight:800;color:#0d716c}.historyKind{display:inline-block;margin:7px 6px 0 0;padding:4px 8px;border-radius:99px;font-size:12px;font-weight:900}.historyKind.favorite{background:#fff1f3;color:#a92d45}.historyKind.accepted{background:#fff4de;color:#8a4300}';
    document.head.appendChild(style);
  }

  function decorateHistory(){
    const screen=document.getElementById('history');
    const list=document.getElementById('historyList');
    if(!screen||!list)return;
    ensureStyles();

    const title=screen.querySelector('.topbar b');
    if(title)title.textContent='เมนูโปรด / ประวัติ';

    const items=readItems();
    let summary=document.getElementById('historySummary');
    if(!summary){
      summary=document.createElement('div');
      summary.id='historySummary';
      summary.className='historySummary';
      list.parentNode.insertBefore(summary,list);
    }
    const liked=items.filter(item=>item&&item.liked).length;
    const accepted=items.filter(item=>item&&item.accepted).length;
    summary.textContent=`❤️ เมนูโปรด ${liked} • 👍 เลือกกิน ${accepted}`;

    const rows=[...list.querySelectorAll('.history')];
    rows.forEach((row,index)=>{
      row.querySelectorAll('.historyKind').forEach(node=>node.remove());
      const item=items[index];
      if(!item)return;
      const anchor=row.querySelector('b')||row;
      if(item.liked){
        const badge=document.createElement('span');
        badge.className='historyKind favorite';
        badge.textContent='❤️ เมนูโปรด';
        anchor.insertAdjacentElement('afterend',badge);
      }
      if(item.accepted){
        const badge=document.createElement('span');
        badge.className='historyKind accepted';
        badge.textContent='👍 เลือกกิน';
        anchor.insertAdjacentElement('afterend',badge);
      }
    });
  }

  const original=window.renderHistory;
  if(typeof original==='function'){
    window.renderHistory=function(){
      const result=original.apply(this,arguments);
      decorateHistory();
      return result;
    };
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',decorateHistory);
  else decorateHistory();
})();
