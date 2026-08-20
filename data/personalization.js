// กินอะไรดี — lightweight personalization from member/local history
(function(){
  let installed=false;
  function install(){
    if(installed)return;
    if(typeof window.recommendNow!=='function'||typeof window.pool!=='function')return setTimeout(install,200);
    const original=window.recommendNow;
    window.recommendNow=function(){
      try{
        window.KINARAIDEE_RESULT_CONTEXT=null;
        let p=pool();
        if(!p.length)return original.apply(this,arguments);
        const recent=(Array.isArray(history)?history:[]).slice(0,30);
        const nameScore=new Map();
        recent.forEach((h,i)=>{
          const w=(h.type==='ชอบ'?4:2)*Math.max(.35,1-i/40);
          if(h?.name)nameScore.set(h.name,(nameScore.get(h.name)||0)+w);
        });
        const tagScore=new Map();
        p.forEach(f=>{
          const s=nameScore.get(f.n)||0;
          if(s>0)(f.tags||[]).forEach(t=>tagScore.set(t,(tagScore.get(t)||0)+s));
        });
        const scored=p.map(f=>{
          let score=(nameScore.get(f.n)||0)*1.5;
          (f.tags||[]).forEach(t=>score+=(tagScore.get(t)||0)*.25);
          score+=Math.random()*1.5; // keep discovery, avoid repetitive recommendations
          return {f,score};
        }).sort((a,b)=>b.score-a.score);
        let next=scored[0]?.f||p[Math.floor(Math.random()*p.length)];
        if(p.length>1&&current&&next.n===current.n)next=scored.find(x=>x.f.n!==current.n)?.f||next;
        current=next;resultRun++;likedRun=-1;acceptedRun=-1;media(current);
        foodName.textContent=current.n;price.textContent='💸 '+current.p+' บาท/คน';people.textContent='👥 '+prefs.people+' คน';spicy.textContent='🌶️ '+current.s;meal.textContent='🕒 '+prefs.meal;
        const learned=recent.length>0;
        reason.textContent=(prefs.types.length?'✓ ตรงทุกเงื่อนไขที่เลือก':learned?'✨ ปรับจากประวัติที่คุณเคยชอบ/เลือกกิน':'🎲 เราเลือกให้จากมื้อและงบของคุณ')+(current.cat?' • '+current.cat:'');
        show('result');
      }catch(e){return original.apply(this,arguments)}
    };
    installed=true;
    window.KINARAIDEE_PERSONALIZATION={enabled:()=>true};
  }
  install();
})();