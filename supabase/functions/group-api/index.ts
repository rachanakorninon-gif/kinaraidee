import { createClient } from 'npm:@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods':'POST, OPTIONS'
}
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{
  status,
  headers:{
    ...cors,
    'Content-Type':'application/json',
    'Cache-Control':'no-store',
    'X-Content-Type-Options':'nosniff'
  }
})
const allowedMeals=['เช้า','กลางวัน','เย็น','ดึก']
const allowedBudgets=[50,100,150,200,999]
const allowedTags=['ข้าว','เส้น','เผ็ด','ของทอด','ของหวาน','หนัก','โปรตีน','เบา','ซุป','ต่างชาติ']
const uuidPattern=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const hostTokenPattern=/^[0-9a-f]{64}$/
const validRoomId=(value:unknown)=>uuidPattern.test(String(value||''))
const token=()=>crypto.randomUUID().replaceAll('-','')+crypto.randomUUID().replaceAll('-','')
const maxRequestBytes=8192
const byteLength=(value:string)=>new TextEncoder().encode(value).byteLength

// Privacy-safe operational event logging. Never include room IDs, host tokens,
// voter IDs, tags, IP addresses, request bodies, or other user-supplied values.
const logEvent=(event:string,fields:Record<string,number|string|boolean>={})=>{
  console.log(JSON.stringify({component:'group-api',event,...fields}))
}

Deno.serve(async(req)=>{
  if(req.method==='OPTIONS') return new Response('ok',{headers:{...cors,'Cache-Control':'no-store'}})
  if(req.method!=='POST'){
    logEvent('request_rejected',{reason:'method_not_allowed'})
    return json({error:'method_not_allowed'},405)
  }

  // Content-Length is only an early reject. The actual decoded request body is
  // measured as UTF-8 bytes below so chunked/missing-length requests cannot
  // bypass the same 8 KiB application contract.
  const contentLength=Number(req.headers.get('content-length')||0)
  if(Number.isFinite(contentLength)&&contentLength>maxRequestBytes){
    logEvent('request_rejected',{reason:'request_too_large'})
    return json({error:'request_too_large'},413)
  }

  let rawBody=''
  try{rawBody=await req.text()}catch{
    logEvent('request_rejected',{reason:'invalid_json'})
    return json({error:'invalid_json'},400)
  }
  if(byteLength(rawBody)>maxRequestBytes){
    logEvent('request_rejected',{reason:'request_too_large'})
    return json({error:'request_too_large'},413)
  }

  const supabase=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  let b:any
  try{b=JSON.parse(rawBody)}catch{
    logEvent('request_rejected',{reason:'invalid_json'})
    return json({error:'invalid_json'},400)
  }
  const action=b?.action

  if(action==='create_room'){
    const meal=String(b.meal||''), budget=Number(b.budget), size=Number(b.size)
    if(!allowedMeals.includes(meal)||!allowedBudgets.includes(budget)||!Number.isInteger(size)||size<2||size>6){
      logEvent('create_room_rejected',{reason:'invalid_room'})
      return json({error:'invalid_room'},400)
    }
    const host_token=token()
    const {data,error}=await supabase.from('group_rooms').insert({meal,budget,size,host_token}).select('id,meal,budget,size,status,expires_at').single()
    if(error){
      logEvent('create_room_failed',{reason:'db_error'})
      return json({error:'db_error'},500)
    }
    logEvent('create_room_succeeded',{size})
    return json({room:data,hostToken:host_token})
  }

  if(action==='get_room'){
    const roomId=String(b.roomId||'')
    if(!validRoomId(roomId)){
      logEvent('get_room_rejected',{reason:'invalid_room_id'})
      return json({error:'invalid_room_id'},400)
    }
    const {data,error}=await supabase.from('group_rooms').select('id,meal,budget,size,status,expires_at').eq('id',roomId).single()
    if(error||!data){
      logEvent('get_room_rejected',{reason:'room_not_found'})
      return json({error:'room_not_found'},404)
    }
    if(data.status!=='open'||new Date(data.expires_at)<=new Date()){
      logEvent('get_room_rejected',{reason:'room_closed'})
      return json({error:'room_closed'},410)
    }
    const {count}=await supabase.from('group_votes').select('*',{count:'exact',head:true}).eq('room_id',data.id)
    logEvent('get_room_succeeded',{voteCount:count||0,size:data.size})
    return json({room:data,voteCount:count||0})
  }

  if(action==='submit_vote'){
    const roomId=String(b.roomId||''), voterId=String(b.voterId||'').trim(), tags=Array.isArray(b.tags)?[...new Set(b.tags.map(String))]:[]
    if(!validRoomId(roomId)||!voterId||voterId.length>120||tags.length>3||tags.some((x:string)=>!allowedTags.includes(x))){
      logEvent('submit_vote_rejected',{reason:'invalid_vote'})
      return json({error:'invalid_vote'},400)
    }
    const {data:room}=await supabase.from('group_rooms').select('id,size,status,expires_at').eq('id',roomId).single()
    if(!room||room.status!=='open'||new Date(room.expires_at)<=new Date()){
      logEvent('submit_vote_rejected',{reason:'room_closed'})
      return json({error:'room_closed'},410)
    }
    const {data:existing}=await supabase.from('group_votes').select('id').eq('room_id',roomId).eq('voter_id',voterId).maybeSingle()
    if(!existing){
      const {count}=await supabase.from('group_votes').select('*',{count:'exact',head:true}).eq('room_id',roomId)
      if((count||0)>=room.size){
        logEvent('submit_vote_rejected',{reason:'room_full',size:room.size})
        return json({error:'room_full'},409)
      }
    }
    const {error}=await supabase.from('group_votes').upsert({room_id:roomId,voter_id:voterId,tags,updated_at:new Date().toISOString()},{onConflict:'room_id,voter_id'})
    if(error){
      logEvent('submit_vote_failed',{reason:'db_error'})
      return json({error:'db_error'},500)
    }
    const {count}=await supabase.from('group_votes').select('*',{count:'exact',head:true}).eq('room_id',roomId)
    logEvent('submit_vote_succeeded',{voteCount:count||0,size:room.size,isUpdate:Boolean(existing)})
    return json({ok:true,voteCount:count||0,size:room.size})
  }

  if(action==='get_votes'){
    const roomId=String(b.roomId||''), hostToken=String(b.hostToken||'')
    if(!validRoomId(roomId)||!hostTokenPattern.test(hostToken)){
      logEvent('get_votes_rejected',{reason:'forbidden'})
      return json({error:'forbidden'},403)
    }
    const {data:room}=await supabase.from('group_rooms').select('id,size,host_token,status,expires_at').eq('id',roomId).single()
    if(!room||room.host_token!==hostToken){
      logEvent('get_votes_rejected',{reason:'forbidden'})
      return json({error:'forbidden'},403)
    }
    if(room.status!=='open'||new Date(room.expires_at)<=new Date()){
      logEvent('get_votes_rejected',{reason:'room_closed'})
      return json({error:'room_closed'},410)
    }
    const {data,error}=await supabase.from('group_votes').select('voter_id,tags,updated_at').eq('room_id',roomId).order('created_at')
    if(error){
      logEvent('get_votes_failed',{reason:'db_error'})
      return json({error:'db_error'},500)
    }
    logEvent('get_votes_succeeded',{voteCount:(data||[]).length,size:room.size})
    return json({votes:data||[],size:room.size})
  }

  if(action==='close_room'){
    const roomId=String(b.roomId||''), hostToken=String(b.hostToken||'')
    if(!validRoomId(roomId)||!hostTokenPattern.test(hostToken)){
      logEvent('close_room_rejected',{reason:'forbidden'})
      return json({error:'forbidden'},403)
    }
    const {data:room}=await supabase.from('group_rooms').select('id,host_token').eq('id',roomId).single()
    if(!room||room.host_token!==hostToken){
      logEvent('close_room_rejected',{reason:'forbidden'})
      return json({error:'forbidden'},403)
    }
    const {error}=await supabase.from('group_rooms').update({status:'closed'}).eq('id',roomId)
    if(error){
      logEvent('close_room_failed',{reason:'db_error'})
      return json({error:'db_error'},500)
    }
    logEvent('close_room_succeeded')
    return json({ok:true})
  }

  logEvent('request_rejected',{reason:'unknown_action'})
  return json({error:'unknown_action'},400)
})
