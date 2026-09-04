import { createClient } from 'npm:@supabase/supabase-js@2.112.2'

const allowedOrigin='https://rachanakorninon-gif.github.io'
const cors={
  'Access-Control-Allow-Origin':allowedOrigin,
  'Access-Control-Allow-Headers':'content-type',
  'Access-Control-Allow-Methods':'POST, OPTIONS',
  'Vary':'Origin'
}
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{
  status,
  headers:{...cors,'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}
})

const maxRequestBytes=4096
const events=new Set(['landing','guided_start','surprise_tap','recommendation_result','nearby_tap'])
const sources=new Set(['facebook','instagram','tiktok','youtube','organic_social','qr'])
const mediums=new Set(['paid_social','organic_social','video','qr','referral'])
const slug=/^[a-z0-9][a-z0-9_-]{0,79}$/
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const readBodyLimited=async(req:Request)=>{
  if(!req.body)return {ok:true as const,text:''}
  const reader=req.body.getReader(),decoder=new TextDecoder('utf-8',{fatal:true})
  let total=0,text=''
  try{
    while(true){
      const {value,done}=await reader.read()
      if(done)break
      total+=value.byteLength
      if(total>maxRequestBytes){try{await reader.cancel()}catch{};return {ok:false as const,error:'request_too_large' as const}}
      text+=decoder.decode(value,{stream:true})
    }
    text+=decoder.decode()
    return {ok:true as const,text}
  }catch{return {ok:false as const,error:'invalid_json' as const}}
  finally{try{reader.releaseLock()}catch{}}
}

Deno.serve(async(req)=>{
  if(req.method==='OPTIONS'){
    if(req.headers.get('Origin')!==allowedOrigin)return json({error:'origin_not_allowed'},403)
    return new Response('ok',{headers:{...cors,'Cache-Control':'no-store'}})
  }
  if(req.method!=='POST')return json({error:'method_not_allowed'},405)
  if(req.headers.get('Origin')!==allowedOrigin)return json({error:'origin_not_allowed'},403)

  const contentLength=Number(req.headers.get('content-length')||0)
  if(Number.isFinite(contentLength)&&contentLength>maxRequestBytes)return json({error:'request_too_large'},413)
  const bodyResult=await readBodyLimited(req)
  if(!bodyResult.ok)return json({error:bodyResult.error},bodyResult.error==='request_too_large'?413:400)

  let body:any
  try{body=JSON.parse(bodyResult.text||'{}')}catch{return json({error:'invalid_json'},400)}

  const sessionId=String(body?.session_id||'')
  const eventName=String(body?.event_name||'')
  const source=String(body?.utm_source||'').toLowerCase()
  const medium=String(body?.utm_medium||'').toLowerCase()
  const campaign=String(body?.utm_campaign||'').toLowerCase()
  const content=String(body?.utm_content||'').toLowerCase()

  if(!uuid.test(sessionId))return json({error:'invalid_session'},400)
  if(!events.has(eventName))return json({error:'invalid_event'},400)
  if(!sources.has(source)||!mediums.has(medium))return json({error:'invalid_source_or_medium'},400)
  if(!slug.test(campaign)||!slug.test(content))return json({error:'invalid_campaign_or_content'},400)
  if(campaign.includes('prize')||campaign.includes('premium_3000'))return json({error:'campaign_not_live'},400)

  const sb=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const {error}=await sb.from('product_acquisition_events').insert({
    session_id:sessionId,
    event_name:eventName,
    utm_source:source,
    utm_medium:medium,
    utm_campaign:campaign,
    utm_content:content
  })

  if(error?.code==='23505')return json({ok:true,duplicate:true})
  if(error)return json({error:'event_write_failed'},500)
  return json({ok:true,duplicate:false},201)
})
