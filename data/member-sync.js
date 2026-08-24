// กินอะไรดี — Member cloud history sync
(function(){
  const SUPABASE_URL='https://cuspfvfzprlgtvtdyilh.supabase.co';
  const SUPABASE_KEY='sb_publishable_PGmPJ6_8tNIWm7zfF6qEng_0emmWchx';
  const OUTBOX_KEY='kinaraideeMemberHistoryOutboxV1';
  const AUTH_STORAGE_KEY='sb-cuspfvfzprlgtvtdyilh-auth-token';
  const DEDUP_WINDOW_MS=10*60*1000;
  let client=null,user=null,wrapped=false,loading=false,pendingWrites=0,writeGeneration=0,authResolved=false,flushing=false;

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

  function readOutbox(){
    try{
      const rows=JSON.parse(localStorage.getItem(OUTBOX_KEY)||'[]');
      return Array.isArray(rows)?rows:[];
    }catch(e){return[];}
  }

  function writeOutbox(rows){
    try{localStorage.setItem(OUTBOX_KEY,JSON.stringify((rows||[]).slice(-100)))}catch(e){}
  }

  function sessionUserIdHint(){
    try{
      const raw=localStorage.getItem(AUTH_STORAGE_KEY);
      if(!raw)return null;
      const parsed=JSON.parse(raw);
      return parsed?.user?.id||parsed?.currentSession?.user?.id||parsed?.session?.user?.id||null;
    }catch(e){return null;}
  }

  function newOpId(){
    try{return crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2)}catch(e){return Date.now()+'-'+Math.random().toString(36).slice(2)}
  }

  function enqueueAction(action,food){
    if(!food?.food_name)return null;
    const hintedUserId=user?.id||sessionUserIdHint();
    if(!hintedUserId&&authResolved)return null;
    const op={
      id:newOpId(),
      user_id:hintedUserId||null,
      auth_pending:!hintedUserId,
      action,
      food,
      local_at:Date.now()
    };
    const rows=readOutbox();
    rows.push(op);
    writeOutbox(rows);
    return op;
  }

  function claimPendingAuthOps(){
    let rows=readOutbox(),changed=false;
    if(user){
      rows=rows.map(op=>{
        if(!op.user_id&&op.auth_pending){changed=true;return {...op,user_id:user.id,auth_pending:false};}
        return op;
      });
    }else if(authResolved){
      const next=rows.filter(op=>!!op.user_id||!op.auth_pending);
      changed=next.length!==rows.length;
      rows=next;
    }
    if(changed)writeOutbox(rows);
  }

  function outboxForCurrentUser(){
    if(!user)return[];
    return readOutbox().filter(op=>op.user_id===user.id);
  }

  function removeOutboxOp(id){
    const rows=readOutbox();
    const next=rows.filter(op=>op.id!==id);
    if(next.length!==rows.length)writeOutbox(next);
  }

  function discardOutboxForUser(userId){
    if(!userId)return;
    const rows=readOutbox();
    const next=rows.filter(op=>op.user_id!==userId);
    if(next.length!==rows.length)writeOutbox(next);
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

  function historyIsActive(){
    return !!document.getElementById('history')?.classList.contains('active');
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

  function rowMatchesOp(r,op){
    if(!r||!op)return false;
    if(r.food_name!==op.food?.food_name||r.action!==op.action)return false;
    if(String(r.meal||'')!==String(op.food?.meal||''))return false;
    if((Number(r.people)||1)!==(Number(op.food?.people)||1))return false;
    const cloudAt=Date.parse(r.created_at),localAt=Number(op.local_at)||0;
    return Number.isFinite(cloudAt)&&localAt>0&&Math.abs(cloudAt-localAt)<=DEDUP_WINDOW_MS;
  }

  async function fetchCloudRows(){
    if(!client||!user)return[];
    const {data,error}=await client.from('member_food_history')
      .select('id,food_name,food_emoji,price,meal,spicy,people,action,created_at')
      .order('created_at',{ascending:false})
      .limit(60);
    if(error)throw error;
    return data||[];
  }

  async function insertOutboxOp(op){
    if(!client||!user||!op||op.user_id!==user.id)return false;
    pendingWrites++;
    writeGeneration++;
    try{
      const row={user_id:user.id,...op.food,action:op.action};
      const {error}=await client.from('member_food_history').insert(row);
      if(error)throw error;
      removeOutboxOp(op.id);
      return true;
    }catch(e){
      console.warn('Kinaraidee member history:',e?.message||e);
      return false;
    }finally{
      pendingWrites=Math.max(0,pendingWrites-1);
    }
  }

  async function flushOutbox(){
    if(!client||!user||flushing)return false;
    claimPendingAuthOps();
    const ops=outboxForCurrentUser();
    if(!ops.length)return true;
    flushing=true;
    let allSaved=true;
    try{
      let recent=[];
      try{recent=await fetchCloudRows()}catch(e){console.warn('Kinaraidee outbox dedupe:',e?.message||e);}
      const usedCloudIds=new Set();
      for(const op of ops){
        const match=recent.find(r=>!usedCloudIds.has(r.id)&&rowMatchesOp(r,op));
        if(match){
          usedCloudIds.add(match.id);
          removeOutboxOp(op.id);
          continue;
        }
        const saved=await insertOutboxOp(op);
        if(!saved)allSaved=false;
      }
      return allSaved&&outboxForCurrentUser().length===0;
    }finally{
      flushing=false;
      if(outboxForCurrentUser().length===0&&pendingWrites===0){
        setTimeout(()=>loadCloudHistory({render:historyIsActive()}),0);
      }
    }
  }

  async function saveAction(action,food){
    const op=enqueueAction(action,food);
    if(!op)return false;
    return flushOutbox();
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
    if(!client||!user||loading||flushing||pendingWrites>0||outboxForCurrentUser().length>0)return false;
    const generationAtStart=writeGeneration;
    loading=true;
    try{
      const rows=(await fetchCloudRows()).map(rowToLocal);
      // A member action may have started while this request was in flight.
      // Never let an older server snapshot overwrite a newer optimistic or durable local write.
      if(pendingWrites>0||writeGeneration!==generationAtStart||outboxForCurrentUser().length>0)return false;
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
    const currentUserId=user.id;
    discardOutboxForUser(currentUserId);
    const {error}=await client.from('member_food_history').delete().eq('user_id',currentUserId);
    if(error)console.warn('Kinaraidee cloud history clear:',error.message);
  }

  function queueChangedAction(action,food){
    const op=enqueueAction(action,food);
    if(op)flushOutbox();
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
      if(changed)queueChangedAction('liked',food);
      return out;
    };

    window.acceptFood=function(){
      const food=snapshotFood();
      let before;
      try{before=acceptedRun}catch(e){}
      const out=originalAccept.apply(this,arguments);
      let changed=true;
      try{changed=acceptedRun!==before}catch(e){}
      if(changed)queueChangedAction('picked',food);
      return out;
    };

    window.renderHistory=function(){
      const out=originalRender.apply(this,arguments);
      if(user){
        if(outboxForCurrentUser().length)flushOutbox();
        else loadCloudHistory({render:true});
      }
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

  async function settleAuthenticatedHistory(){
    claimPendingAuthOps();
    if(!user)return false;
    const flushed=await flushOutbox();
    if(flushed)return loadCloudHistory({render:historyIsActive()});
    return false;
  }

  async function init(){
    try{
      addMemberEntry();
      wrapActions();
      let tries=0;const timer=setInterval(()=>{
        addMemberEntry();
        wrapActions();
        if(wrapped)clearInterval(timer);
        else if(++tries>40)clearInterval(timer);
      },250);

      window.KINARAIDEE_MEMBER_SYNC={
        getUser:()=>user,
        isSignedIn:()=>!!user,
        saveAction,
        loadCloudHistory,
        clearCloudHistory,
        flushOutbox,
        pendingCount:()=>user?outboxForCurrentUser().length:readOutbox().length
      };

      await loadSupabase();
      client=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
      const {data}=await client.auth.getUser();
      user=data.user||null;
      authResolved=true;
      claimPendingAuthOps();
      updateMemberEntry();
      client.auth.onAuthStateChange((_event,session)=>{
        user=session?.user||null;
        authResolved=true;
        claimPendingAuthOps();
        updateMemberEntry();
        if(user)setTimeout(settleAuthenticatedHistory,0);
      });
      if(user)settleAuthenticatedHistory();
      window.addEventListener('online',()=>{if(user)settleAuthenticatedHistory()});
    }catch(e){console.warn('Kinaraidee member sync unavailable:',e?.message||e);}
  }
  init();
})();