import { createClient } from 'npm:@supabase/supabase-js@2.112.2'

const cors={
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods':'POST, OPTIONS'
}
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{
  status,
  headers:{...cors,'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}
})

const maxRequestBytes=8192
const trackingStartedAt='2026-09-03T22:08:32.000Z'

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

const pct=(n:number,d:number)=>d>0?Number((n*100/d).toFixed(1)):0

Deno.serve(async(req)=>{
  if(req.method==='OPTIONS')return new Response('ok',{headers:{...cors,'Cache-Control':'no-store'}})
  if(req.method!=='POST')return json({error:'method_not_allowed'},405)
  const contentLength=Number(req.headers.get('content-length')||0)
  if(Number.isFinite(contentLength)&&contentLength>maxRequestBytes)return json({error:'request_too_large'},413)
  const bodyResult=await readBodyLimited(req)
  if(!bodyResult.ok)return json({error:bodyResult.error},bodyResult.error==='request_too_large'?413:400)
  let body:any
  try{body=JSON.parse(bodyResult.text||'{}')}catch{return json({error:'invalid_json'},400)}

  const sb=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const auth=req.headers.get('Authorization')||''
  const token=auth.startsWith('Bearer ')?auth.slice(7):''
  if(!token)return json({error:'unauthorized'},401)
  const {data:{user},error:userError}=await sb.auth.getUser(token)
  if(userError||!user?.email)return json({error:'unauthorized'},401)
  const {data:owner,error:ownerError}=await sb.from('admin_dashboard_owners').select('email,active').eq('email',user.email.toLowerCase()).eq('active',true).maybeSingle()
  if(ownerError)return json({error:'owner_check_failed'},500)
  if(!owner)return json({error:'forbidden'},403)

  if(String(body?.action||'')!=='summary')return json({error:'unknown_action'},400)
  const days=Math.max(1,Math.min(365,Number(body?.days)||30))
  const requestedSinceMs=Date.now()-days*86400000
  const trackingStartMs=new Date(trackingStartedAt).getTime()
  const measuredSinceMs=Math.max(requestedSinceMs,trackingStartMs)
  const measuredSince=new Date(measuredSinceMs).toISOString()

  const {data:productMeta,error:productMetaError}=await sb.from('product_measurement_meta').select('started_at,schema_version').eq('singleton',true).maybeSingle()
  if(productMetaError||!productMeta?.started_at)return json({error:'product_measurement_meta_failed'},500)
  const productTrackingStartedAt=String(productMeta.started_at)
  const productTrackingStartMs=new Date(productTrackingStartedAt).getTime()
  const productMeasuredSinceMs=Math.max(requestedSinceMs,productTrackingStartMs)
  const productMeasuredSince=new Date(productMeasuredSinceMs).toISOString()

  const users:any[]=[]
  const perPage=1000
  for(let page=1;page<=50;page++){
    const {data,error}=await sb.auth.admin.listUsers({page,perPage})
    if(error)return json({error:'auth_query_failed'},500)
    const batch=data?.users||[]
    users.push(...batch)
    if(batch.length<perPage)break
    if(page===50)return json({error:'auth_query_limit'},500)
  }

  const measuredUsers=users.filter((u:any)=>new Date(u.created_at).getTime()>=measuredSinceMs)
  const measuredIds=new Set(measuredUsers.map((u:any)=>u.id))
  const confirmedIds=new Set(measuredUsers.filter((u:any)=>Boolean(u.email_confirmed_at)).map((u:any)=>u.id))
  const productWindowUsers=users.filter((u:any)=>new Date(u.created_at).getTime()>=productMeasuredSinceMs)
  const productWindowIds=new Set(productWindowUsers.map((u:any)=>u.id))
  const productWindowConfirmedIds=new Set(productWindowUsers.filter((u:any)=>Boolean(u.email_confirmed_at)).map((u:any)=>u.id))

  const fetchPaged=async(table:string,select:string,dateColumn:string,since:string,limit=20000)=>{
    const all:any[]=[]
    const pageSize=1000
    for(let from=0;from<limit;from+=pageSize){
      const {data,error}=await sb.from(table).select(select).gte(dateColumn,since).order(dateColumn,{ascending:true}).range(from,from+pageSize-1)
      if(error)return {error,rows:[] as any[]}
      const batch=data||[]
      all.push(...batch)
      if(batch.length<pageSize)return {error:null,rows:all}
    }
    return {error:new Error('row_limit'),rows:[] as any[]}
  }

  const [attributionResult,referralResult,productEventResult]=await Promise.all([
    fetchPaged('member_acquisition_attribution','user_id,utm_source,utm_medium,utm_campaign,utm_content,referral_code,created_at','created_at',measuredSince),
    fetchPaged('member_referrals','referred_user_id,status,created_at,confirmed_at','created_at',measuredSince),
    fetchPaged('product_acquisition_events','session_id,event_name,utm_source,utm_medium,utm_campaign,utm_content,occurred_at','occurred_at',productMeasuredSince,50000)
  ])
  if(attributionResult.error||referralResult.error||productEventResult.error)return json({error:'db_error'},500)

  const attributionRows=attributionResult.rows.filter((r:any)=>measuredIds.has(r.user_id))
  const productWindowAttributionRows=attributionResult.rows.filter((r:any)=>productWindowIds.has(r.user_id))
  const referralRows=referralResult.rows.filter((r:any)=>measuredIds.has(r.referred_user_id))
  const productRows=productEventResult.rows
  const hasAttribution=(r:any)=>Boolean(r.utm_source||r.utm_medium||r.utm_campaign||r.utm_content||r.referral_code)
  const hasFullUtm=(r:any)=>Boolean(r.utm_source&&r.utm_medium&&r.utm_campaign&&r.utm_content)
  const attributedRows=attributionRows.filter(hasAttribution)
  const productWindowAttributedRows=productWindowAttributionRows.filter(hasFullUtm)
  const productWindowConfirmedAttributed=productWindowAttributedRows.filter((r:any)=>productWindowConfirmedIds.has(r.user_id)).length

  const rank=(rows:any[],key:string)=>{
    const grouped=new Map<string,{count:number,confirmed:number}>()
    for(const row of rows){
      const raw=row[key]
      if(!raw)continue
      const name=String(raw)
      const current=grouped.get(name)||{count:0,confirmed:0}
      current.count++
      if(confirmedIds.has(row.user_id))current.confirmed++
      grouped.set(name,current)
    }
    return [...grouped.entries()].map(([name,v])=>({name,count:v.count,confirmed:v.confirmed,confirmationRate:pct(v.confirmed,v.count)})).sort((a,b)=>b.count-a.count||a.name.localeCompare(b.name)).slice(0,20)
  }

  const productRank=(key:string)=>{
    const grouped=new Map<string,{landing:number,guided:number,surprise:number,result:number,nearby:number,signups:number,confirmed:number}>()
    const rowFor=(name:string)=>{
      const current=grouped.get(name)||{landing:0,guided:0,surprise:0,result:0,nearby:0,signups:0,confirmed:0}
      grouped.set(name,current)
      return current
    }
    for(const row of productRows){
      const raw=row[key]
      if(!raw)continue
      const current=rowFor(String(raw))
      if(row.event_name==='landing')current.landing++
      else if(row.event_name==='guided_start')current.guided++
      else if(row.event_name==='surprise_tap')current.surprise++
      else if(row.event_name==='recommendation_result')current.result++
      else if(row.event_name==='nearby_tap')current.nearby++
    }
    for(const row of productWindowAttributedRows){
      const raw=row[key]
      if(!raw)continue
      const current=rowFor(String(raw))
      current.signups++
      if(productWindowConfirmedIds.has(row.user_id))current.confirmed++
    }
    return [...grouped.entries()].map(([name,v])=>({
      name,...v,
      resultRate:pct(v.result,v.landing),
      signupRate:pct(v.signups,v.landing),
      confirmedRate:pct(v.confirmed,v.landing)
    })).sort((a,b)=>b.landing-a.landing||b.result-a.result||a.name.localeCompare(b.name)).slice(0,20)
  }

  const eventCount=(name:string)=>productRows.filter((r:any)=>r.event_name===name).length
  const productSessions=new Set(productRows.map((r:any)=>r.session_id)).size
  const landingSessions=eventCount('landing')
  const guidedStarts=eventCount('guided_start')
  const surpriseTaps=eventCount('surprise_tap')
  const recommendationResults=eventCount('recommendation_result')
  const nearbyTaps=eventCount('nearby_tap')

  const measuredSignups=measuredUsers.length
  const confirmedSignups=confirmedIds.size
  const trackedSignups=attributionRows.length
  const attributedSignups=attributedRows.length
  const referralSignups=referralRows.length
  const confirmedReferrals=referralRows.filter((r:any)=>r.status==='confirmed').length
  const paidSocialSignups=attributionRows.filter((r:any)=>r.utm_medium==='paid_social').length

  return json({
    observed:true,
    sourceOfTruth:'Supabase Auth + first-party acquisition/referral/product-event tables',
    campaignEligibilityIncluded:false,
    spendIncluded:false,
    days,
    requestedSince:new Date(requestedSinceMs).toISOString(),
    trackingStartedAt,
    measuredSince,
    productTrackingStartedAt,
    productMeasuredSince,
    generatedAt:new Date().toISOString(),
    metrics:{
      measuredSignups,
      confirmedSignups,
      trackedSignups,
      attributedSignups,
      unattributedSignups:Math.max(0,measuredSignups-attributedSignups),
      paidSocialSignups,
      referralSignups,
      confirmedReferrals,
      confirmationRate:pct(confirmedSignups,measuredSignups),
      attributionCoverage:pct(trackedSignups,measuredSignups),
      referralRate:pct(referralSignups,measuredSignups),
      referralConfirmationRate:pct(confirmedReferrals,referralSignups)
    },
    productMetrics:{
      measuredSessions:productSessions,
      landingSessions,
      guidedStarts,
      surpriseTaps,
      recommendationResults,
      nearbyTaps,
      resultRate:pct(recommendationResults,landingSessions),
      signupRate:pct(productWindowAttributedRows.length,landingSessions),
      confirmedRate:pct(productWindowConfirmedAttributed,landingSessions)
    },
    bySource:rank(attributionRows,'utm_source'),
    byCampaign:rank(attributionRows,'utm_campaign'),
    byContent:rank(attributionRows,'utm_content'),
    productBySource:productRank('utm_source'),
    productByCampaign:productRank('utm_campaign'),
    productByContent:productRank('utm_content')
  })
})
