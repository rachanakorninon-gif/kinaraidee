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
const token=()=>crypto.randomUUID().replaceAll('-','')+crypto.randomUUID().replaceAll('-','')

Deno.serve(async(req)=>{
  if(req.method==='OPTIONS') return new Response('ok',{headers:{...cors,'Cache-Control':'no-store'}})
  if(req.method!=='POST') return json({error:'method_not_allowed'},405)

  const contentLength=Number(req.headers.get('content-length')||0)
  if(Number.isFinite(contentLength)&&contentLength>8192) return json({error:'request_too_large'},413)

  const supabase=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  let b:any
  try{b=await req.json()}catch{return json({error:'invalid_json'},400)}
  const action=b?.action

  if(action==='create_room'){
    const meal=String(b.meal||''), budget=Number(b.budget), size=Number(b.size)
    if(!allowedMeals.includes(meal)||!allowedBudgets.includes(budget)||!Number.isInteger(size)||size<2||size>6)return json({error:'invalid_room'},400)
    const host_token=token()
    const {data,error}=await supabase.from('group_rooms').insert({meal,budget,size,host_token}).select('id,meal,budget,size,status,expires_at').single()
    if(error)return json({error:'db_error'},500)
    return json({room:data,hostToken:host_token})
  }

  if(action==='get_room'){
    const {data,error}=await supabase.from('group_rooms').select('id,meal,budget,size,status,expires_at').eq('id',b.roomId).single()
    if(error||!data)return json({error:'room_not_found'},404)
    if(data.status!=='open'||new Date(data.expires_at)<=new Date())return json({error:'room_closed'},410)
    const {count}=await supabase.from('group_votes').select('*',{count:'exact',head:true}).eq('room_id',data.id)
    return json({room:data,voteCount:count||0})
  }

  if(action==='submit_vote'){
    const roomId=String(b.roomId||''), voterId=String(b.voterId||'').slice(0,120), tags=Array.isArray(b.tags)?[...new Set(b.tags.map(String))]:[]
    if(!roomId||!voterId||tags.length>3||tags.some((x:string)=>!allowedTags.includes(x)))return json({error:'invalid_vote'},400)
    const {data:room}=await supabase.from('group_rooms').select('id,size,status,expires_at').eq('id',roomId).single()
    if(!room||room.status!=='open'||new Date(room.expires_at)<=new Date())return json({error:'room_closed'},410)
    const {data:existing}=await supabase.from('group_votes').select('id').eq('room_id',roomId).eq('voter_id',voterId).maybeSingle()
    if(!existing){
      const {count}=await supabase.from('group_votes').select('*',{count:'exact',head:true}).eq('room_id',roomId)
      if((count||0)>=room.size)return json({error:'room_full'},409)
    }
    const {error}=await supabase.from('group_votes').upsert({room_id:roomId,voter_id:voterId,tags,updated_at:new Date().toISOString()},{onConflict:'room_id,voter_id'})
    if(error)return json({error:'db_error'},500)
    const {count}=await supabase.from('group_votes').select('*',{count:'exact',head:true}).eq('room_id',roomId)
    return json({ok:true,voteCount:count||0,size:room.size})
  }

  if(action==='get_votes'){
    const roomId=String(b.roomId||''), hostToken=String(b.hostToken||'')
    const {data:room}=await supabase.from('group_rooms').select('id,size,host_token,status,expires_at').eq('id',roomId).single()
    if(!room||room.host_token!==hostToken)return json({error:'forbidden'},403)
    if(room.status!=='open'||new Date(room.expires_at)<=new Date())return json({error:'room_closed'},410)
    const {data,error}=await supabase.from('group_votes').select('voter_id,tags,updated_at').eq('room_id',roomId).order('created_at')
    if(error)return json({error:'db_error'},500)
    return json({votes:data||[],size:room.size})
  }

  if(action==='close_room'){
    const roomId=String(b.roomId||''), hostToken=String(b.hostToken||'')
    const {data:room}=await supabase.from('group_rooms').select('id,host_token').eq('id',roomId).single()
    if(!room||room.host_token!==hostToken)return json({error:'forbidden'},403)
    const {error}=await supabase.from('group_rooms').update({status:'closed'}).eq('id',roomId)
    if(error)return json({error:'db_error'},500)
    return json({ok:true})
  }

  return json({error:'unknown_action'},400)
})