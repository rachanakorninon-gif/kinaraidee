// กินอะไรดี — Member cloud history sync
(function(){
  const SUPABASE_URL='https://cuspfvfzprlgtvtdyilh.supabase.co';
  const SUPABASE_KEY='sb_publishable_PGmPJ6_8tNIWm7zfF6qEng_0emmWchx';
  let client=null,user=null,wrapped=false;

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

  function snapshotFood(){
    try{
      if(!current)return null;
      return {
        food_name:current.n||'',
        food_emoji:current.e||'',
        price:Number(current.p)||null,
        meal:(prefs&&prefs.meal)||null,
        spicy:current.s||null,
        people:Number((prefs&&prefs.people)||1)||1
      };
    }catch(e){return null;}
  }

  async function saveAction(action,food){
    if(!client||!user||!food?.food_name)return;
    const row={user_id:user.id,...food,action};
    const {error}=await client.from('member_food_history').insert(row);
    if(error)console.warn('Kinaraidee member history:',error.message);
  }

  function wrapActions(){
    if(wrapped)return;
    const originalLike=window.saveLike;
    const originalAccept=window.acceptFood;
    if(typeof originalLike!=='function'||typeof originalAccept!=='function')return;
    window.saveLike=function(){
      const food=snapshotFood();
      const out=originalLike.apply(this,arguments);
      saveAction('liked',food);
      return out;
    };
    window.acceptFood=function(){
      const food=snapshotFood();
      const out=originalAccept.apply(this,arguments);
      saveAction('picked',food);
      return out;
    };
    wrapped=true;
  }

  async function init(){
    try{
      await loadSupabase();
      client=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
      const {data}=await client.auth.getUser();
      user=data.user||null;
      client.auth.onAuthStateChange((_event,session)=>{user=session?.user||null;});
      wrapActions();
      // Main app functions are declared after this file may begin loading; retry briefly.
      let tries=0;const timer=setInterval(()=>{wrapActions();if(wrapped||++tries>20)clearInterval(timer);},250);
      window.KINARAIDEE_MEMBER_SYNC={
        getUser:()=>user,
        isSignedIn:()=>!!user,
        saveAction
      };
    }catch(e){console.warn('Kinaraidee member sync unavailable:',e?.message||e);}
  }
  init();
})();