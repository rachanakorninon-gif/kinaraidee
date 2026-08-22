// กินอะไรดี — Member cloud history sync
(function(){
  const SUPABASE_URL='https://cuspfvfzprlgtvtdyilh.supabase.co';
  const SUPABASE_KEY='sb_publishable_PGmPJ6_8tNIWm7zfF6qEng_0emmWchx';
  let client=null,user=null,wrapped=false,loading=false;

  function loadSupabase(){
    return new Promise((resolve,reject)=>{
      if(window.supabase?.createClient)return resolve();
      const existing=document.querySelector('script[data-kinaraidee-supabase]');
      if(existing){existing.addEventListener('load',resolve,{once:true});existing.addEventListener('error',reject,{once:true});return;}
      const s=document.createElement('script');
      s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      s.dataset.kinaraideeSupabase='1';
      s.onload=resolve;s.onerror=reject;document.head.appendChild(s);
    });
  }

  function addMemberEntry(){
    const hero=document.querySelector('#home .homeHero');
    if(!hero||document.getElementById('memberEntryBtn'))return;
    const b=document.createElement('button');
    b.id='memberEntryBtn';
    b.className='secondary';
    b.textContent='👤 สมาชิก / เข้าสู่ระบบ';
    b.onclick=()=>location.href='member.html';
    hero.appendChild(b);
  }

  function updateMemberEntry(){
    const b=document.getElementById('memberEntryBtn');
    if(!b)return;
    b.textContent=user?'👤 บัญชีของฉัน ✓':'👤 สมาชิก / เข้าสู่ระบบ';
  }

  function snapshotFood(){
    try{
      if(!current)return null;
      const meta=typeof currentMeta==='function'?currentMeta():{people:(prefs&&prefs.people)||1,meal:(prefs&&prefs.meal)||null};
      return {
        food_name:current.n||'',
        food_emoji:current.e||'',
        price:Number(current.p)||null,
        meal:meta.meal||null,
        spicy:current.s||null,
        people:Number(meta.people||1)||1
      };
    }catch(e){return null;}
  }

  async function saveAction(action,food){
    if(!client||!user||!food?.food_name)return;
    const row={user_id:user.id,...food,action};
    const {error}=await client.from('member_food_history').insert(row);
    if(error)console.warn('Kinaraidee member history:',error.message);
  }

  function rowToLocal(r){
    const parsedAt=Date.parse(r.created_at);
    const liked=r.action==='liked';
    const accepted=r.action==='picked';
    return {
      name:r.food_name,
      emoji:r.food_emoji||'🍽️',
      liked,
      accepted,
      type:liked?'ชอบ':'เลือกกิน',
      at:Number.isFinite(parsedAt)?parsedAt:Date.now(),
      date:new Date(Number.isFinite(parsedAt)?parsedAt:Date.now()).toLocaleString('th-TH'),
      mode:(Number(r.people)||1)>1?'group':'single',
      people:Number(r.people)||1,
      meal:r.meal||'',
      price:r.price==null?null:Number(r.price),
      cloudId:r.id
    };
  }

  async function loadCloudHistory(opts={}){
    if(!client||!user||loading)return false;
    loading=true;
    try{
      const {data,error}=await client.from('member_food_history')
        .select('id,food_name,food_emoji,price,meal,spicy,people,action,created_at')
        .order('created_at',{ascending:false})
        .limit(60);
      if(error)throw error;
      const rows=(data||[]).map(rowToLocal);
      try{
        history=rows;
        localStorage.setItem('kinaraideeHistory',JSON.stringify(history));
        if(typeof stats==='function')stats();
        if(opts.render&&typeof renderHistory==='function')renderHistory();
      }catch(e){console.warn('Kinaraidee history apply:',e?.message||e);}
      return true;
    }catch(e){
      console.warn('Kinaraidee cloud history load:',e?.message||e);
      return false;
    }finally{loading=false;}
  }

  async function clearCloudHistory(){
    if(!client||!user)return;
    const {error}=await client.from('member_food_history').delete().eq('user_id',user.id);
    if(error)console.warn('Kinaraidee cloud history clear:',error.message);
  }

  function wrapActions(){
    if(wrapped)return;
    const originalLike=window.saveLike;
    const originalAccept=window.acceptFood;
    const originalRender=window.renderHistory;
    const originalClear=window.clearHistory;
    if(typeof originalLike!=='function'||typeof originalAccept!=='function'||typeof originalRender!=='function'||typeof originalClear!=='function')return;

    window.saveLike=function(){
      const food=snapshotFood();
      let before;
      try{before=likedRun}catch(e){}
      const out=originalLike.apply(this,arguments);
      let changed=true;
      try{changed=likedRun!==before}catch(e){}
      if(changed)saveAction('liked',food);
      return out;
    };

    window.acceptFood=function(){
      const food=snapshotFood();
      let before;
      try{before=acceptedRun}catch(e){}
      const out=originalAccept.apply(this,arguments);
      let changed=true;
      try{changed=acceptedRun!==before}catch(e){}
      if(changed)saveAction('picked',food);
      return out;
    };

    window.renderHistory=function(){
      const out=originalRender.apply(this,arguments);
      if(user)loadCloudHistory({render:true});
      return out;
    };

    window.clearHistory=function(){
      if(!user)return originalClear.apply(this,arguments);
      if(confirm('ล้างประวัติทั้งหมดของบัญชีนี้หรือไม่?')){
        try{history=[];localStorage.setItem('kinaraideeHistory','[]');if(typeof stats==='function')stats();originalRender();}catch(e){}
        clearCloudHistory();
      }
    };

    wrapped=true;
  }

  async function init(){
    try{
      addMemberEntry();
      await loadSupabase();
      client=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
      const {data}=await client.auth.getUser();
      user=data.user||null;
      updateMemberEntry();
      client.auth.onAuthStateChange((_event,session)=>{
        user=session?.user||null;
        updateMemberEntry();
        if(user)setTimeout(()=>loadCloudHistory({render:document.getElementById('history')?.classList.contains('active')}),0);
      });
      wrapActions();
      let tries=0;const timer=setInterval(()=>{
        addMemberEntry();
        updateMemberEntry();
        wrapActions();
        if(wrapped){clearInterval(timer);if(user)loadCloudHistory();}
        else if(++tries>40)clearInterval(timer);
      },250);
      window.KINARAIDEE_MEMBER_SYNC={
        getUser:()=>user,
        isSignedIn:()=>!!user,
        saveAction,
        loadCloudHistory,
        clearCloudHistory
      };
    }catch(e){console.warn('Kinaraidee member sync unavailable:',e?.message||e);}
  }
  init();
})();