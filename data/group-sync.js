// กินอะไรดี — Group Mode Phase 2B Supabase adapter
(function(){
  const API='https://cuspfvfzprlgtvtdyilh.supabase.co/functions/v1/group-api';
  async function call(action,payload={}){
    const res=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,...payload})});
    const data=await res.json().catch(()=>({error:'invalid_response'}));
    if(!res.ok) throw new Error(data.error||('HTTP '+res.status));
    return data;
  }
  const api={
    enabled:()=>true,
    createRoom:({meal,budget,size})=>call('create_room',{meal,budget,size}),
    getRoom:(roomId)=>call('get_room',{roomId}),
    submitVote:(roomId,voterId,tags)=>call('submit_vote',{roomId,voterId,tags}),
    getVotes:(roomId,hostToken)=>call('get_votes',{roomId,hostToken}),
    closeRoom:(roomId,hostToken)=>call('close_room',{roomId,hostToken})
  };
  window.KINARAIDEE_GROUP_SYNC=api;
})();