import { createClient } from 'npm:@supabase/supabase-js@2.112.2'

const allowedOrigin='https://rachanakorninon-gif.github.io'
const maxRequestBytes=4096
const maxClaimAgeMs=60*60*1000
const maxFutureClockSkewMs=5*60*1000
const cors={
  'Access-Control-Allow-Origin':allowedOrigin,
  'Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods':'POST, OPTIONS',
  'Vary':'Origin'
}
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{
  status,
  headers:{...cors,'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}
})

const allowedKeys=new Set(['utm_source','utm_medium','utm_campaign','utm_content','referral_code'])
const socialProviders=new Set(['custom:line','facebook'])

function optionalSlug(value:unknown,max=80){
  if(value===undefined||value===null||value==='')return {ok:true as const,value:null}
  if(typeof value!=='string')return {ok:false as const}
  const normalized=value.trim().toLowerCase()
  if(!normalized||normalized.length>max||!/^[a-z0-9_-]+$/.test(normalized))return {ok:false as const}
  return {ok:true as const,value:normalized}
}

function optionalReferral(value:unknown){
  if(value===undefined||value===null||value==='')return {ok:true as const,value:null}
  if(typeof value!=='string')return {ok:false as const}
  const normalized=value.trim().toUpperCase()
  if(!normalized||normalized.length>24||!/^[A-Z0-9_-]+$/.test(normalized))return {ok:false as const}
  return {ok:true as const,value:normalized}
}

async function readJsonLimited(req:Request){
  const declared=Number(req.headers.get('content-length')||0)
  if(Number.isFinite(declared)&&declared>maxRequestBytes)return {ok:false as const,status:413,error:'request_too_large'}
  if(!req.body)return {ok:true as const,body:{}}

  const reader=req.body.getReader()
  const decoder=new TextDecoder('utf-8',{fatal:true})
  let total=0,text=''
  try{
    while(true){
      const {value,done}=await reader.read()
      if(done)break
      total+=value.byteLength
      if(total>maxRequestBytes){
        try{await reader.cancel()}catch{}
        return {ok:false as const,status:413,error:'request_too_large'}
      }
      text+=decoder.decode(value,{stream:true})
    }
    text+=decoder.decode()
    const parsed=JSON.parse(text||'{}')
    if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))return {ok:false as const,status:400,error:'invalid_json'}
    return {ok:true as const,body:parsed as Record<string,unknown>}
  }catch{
    return {ok:false as const,status:400,error:'invalid_json'}
  }finally{
    try{reader.releaseLock()}catch{}
  }
}

Deno.serve(async(req)=>{
  if(req.method==='OPTIONS'){
    if(req.headers.get('Origin')!==allowedOrigin)return json({error:'origin_not_allowed'},403)
    return new Response('ok',{headers:{...cors,'Cache-Control':'no-store'}})
  }
  if(req.method!=='POST')return json({error:'method_not_allowed'},405)
  if(req.headers.get('Origin')!==allowedOrigin)return json({error:'origin_not_allowed'},403)

  const bodyResult=await readJsonLimited(req)
  if(!bodyResult.ok)return json({error:bodyResult.error},bodyResult.status)
  const body=bodyResult.body
  if(Object.keys(body).some(key=>!allowedKeys.has(key)))return json({error:'unknown_field'},400)

  const source=optionalSlug(body.utm_source)
  const medium=optionalSlug(body.utm_medium)
  const campaign=optionalSlug(body.utm_campaign)
  const content=optionalSlug(body.utm_content)
  const referral=optionalReferral(body.referral_code)
  if(!source.ok||!medium.ok||!campaign.ok||!content.ok||!referral.ok)return json({error:'invalid_input'},400)
  if(!source.value&&!medium.value&&!campaign.value&&!content.value&&!referral.value)return json({error:'nothing_to_claim'},400)

  const auth=req.headers.get('Authorization')||''
  const token=auth.startsWith('Bearer ')?auth.slice(7):''
  if(!token)return json({error:'unauthorized'},401)

  const sb=createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    {auth:{persistSession:false,autoRefreshToken:false}}
  )
  const {data:{user},error:userError}=await sb.auth.getUser(token)
  if(userError||!user)return json({error:'unauthorized'},401)

  const providers=new Set<string>()
  const appProvider=user.app_metadata?.provider
  if(typeof appProvider==='string')providers.add(appProvider)
  const appProviders=user.app_metadata?.providers
  if(Array.isArray(appProviders))for(const provider of appProviders){if(typeof provider==='string')providers.add(provider)}

  let authMethod:''|'oauth'|'phone'=''
  if(providers.has('phone'))authMethod='phone'
  else if([...providers].some(provider=>socialProviders.has(provider)))authMethod='oauth'
  if(!authMethod)return json({error:'unsupported_auth_method'},403)

  const createdAtMs=Date.parse(String(user.created_at||''))
  const ageMs=Date.now()-createdAtMs
  if(!Number.isFinite(createdAtMs)||ageMs < -maxFutureClockSkewMs)return json({error:'invalid_auth_state'},403)
  if(ageMs>maxClaimAgeMs)return json({result:'claim_window_expired',referral_recorded:false},409)

  const {data,error}=await sb.rpc('claim_member_acquisition_internal',{
    p_user_id:user.id,
    p_auth_method:authMethod,
    p_utm_source:source.value,
    p_utm_medium:medium.value,
    p_utm_campaign:campaign.value,
    p_utm_content:content.value,
    p_referral_code:referral.value
  })
  if(error)return json({error:'claim_failed'},500)

  const row=Array.isArray(data)?data[0]:data
  const result=String(row?.result||'')
  const allowedResults=new Set([
    'claimed',
    'already_claimed',
    'claimed_referral_unresolved',
    'claimed_self_referral_rejected',
    'claimed_referral_recorded',
    'claimed_referral_existing',
    'nothing_to_claim',
    'invalid_input',
    'unsupported_auth_method',
    'user_not_found'
  ])
  if(!allowedResults.has(result))return json({error:'claim_failed'},500)

  return json({
    result,
    referral_recorded:Boolean(row?.referral_recorded)
  })
})
