import { createClient } from 'npm:@supabase/supabase-js@2.112.2'

const allowedOrigin='https://rachanakorninon-gif.github.io'
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

Deno.serve(async(req)=>{
  if(req.method==='OPTIONS'){
    if(req.headers.get('Origin')!==allowedOrigin)return json({error:'origin_not_allowed'},403)
    return new Response('ok',{headers:{...cors,'Cache-Control':'no-store'}})
  }
  if(req.method!=='POST')return json({error:'method_not_allowed'},405)
  if(req.headers.get('Origin')!==allowedOrigin)return json({error:'origin_not_allowed'},403)

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

  const [codeResult,totalResult,confirmedResult]=await Promise.all([
    sb.from('member_referral_codes')
      .select('code')
      .eq('user_id',user.id)
      .maybeSingle(),
    sb.from('member_referrals')
      .select('status',{count:'exact',head:true})
      .eq('referrer_user_id',user.id),
    sb.from('member_referrals')
      .select('status',{count:'exact',head:true})
      .eq('referrer_user_id',user.id)
      .eq('status','confirmed')
  ])

  if(codeResult.error||totalResult.error||confirmedResult.error)return json({error:'referral_summary_failed'},500)
  if(!codeResult.data?.code)return json({error:'referral_not_ready'},404)

  return json({
    referral_code:String(codeResult.data.code),
    total_referrals:Number(totalResult.count)||0,
    confirmed_referrals:Number(confirmedResult.count)||0
  })
})
