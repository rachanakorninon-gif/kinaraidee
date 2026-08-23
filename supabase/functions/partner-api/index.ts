import { createClient } from 'npm:@supabase/supabase-js@2'

const cors={
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods':'POST, OPTIONS'
}
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{
  status,
  headers:{...cors,'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}
})

const maxRequestBytes=32768
const readBodyLimited=async(req:Request)=>{
  if(!req.body)return {ok:true as const,text:''}
  const reader=req.body.getReader()
  const decoder=new TextDecoder('utf-8',{fatal:true})
  let totalBytes=0
  let text=''
  try{
    while(true){
      const {value,done}=await reader.read()
      if(done)break
      totalBytes+=value.byteLength
      if(totalBytes>maxRequestBytes){
        try{await reader.cancel()}catch{}
        return {ok:false as const,error:'request_too_large' as const}
      }
      text+=decoder.decode(value,{stream:true})
    }
    text+=decoder.decode()
    return {ok:true as const,text}
  }catch{
    return {ok:false as const,error:'invalid_json' as const}
  }finally{
    try{reader.releaseLock()}catch{}
  }
}

Deno.serve(async(req)=>{
  if(req.method==='OPTIONS')return new Response('ok',{headers:{...cors,'Cache-Control':'no-store'}})
  if(req.method!=='POST')return json({error:'method_not_allowed'},405)

  const contentLength=Number(req.headers.get('content-length')||0)
  if(Number.isFinite(contentLength)&&contentLength>maxRequestBytes)return json({error:'request_too_large'},413)

  const bodyResult=await readBodyLimited(req)
  if(!bodyResult.ok)return json({error:bodyResult.error},bodyResult.error==='request_too_large'?413:400)

  let b:any
  try{b=JSON.parse(bodyResult.text)}catch{return json({error:'invalid_json'},400)}

  const sb=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const action=String(b?.action||'')
  const requireOwner=async()=>{
    const auth=req.headers.get('Authorization')||''
    const token=auth.startsWith('Bearer ')?auth.slice(7):''
    if(!token)return {error:json({error:'unauthorized'},401)}
    const {data:{user},error:ue}=await sb.auth.getUser(token)
    if(ue||!user?.email)return {error:json({error:'unauthorized'},401)}
    const {data:owner}=await sb.from('admin_dashboard_owners').select('email,active').eq('email',user.email.toLowerCase()).eq('active',true).maybeSingle()
    if(!owner)return {error:json({error:'forbidden'},403)}
    return {user}
  }

  if(action==='find_partners'){
    const food=String(b.food||'').trim().slice(0,120),lat=Number(b.lat),lon=Number(b.lon)
    let q=sb.from('partner_restaurants').select('id,name,slug,address,latitude,longitude,menu_keywords,destination_url,commission_note,commission_type,commission_rate').eq('status','active')
    if(food)q=q.contains('menu_keywords',[food])
    const {data,error}=await q.limit(20)
    if(error)return json({error:'db_error'},500)
    const rows=(data||[]).map((r:any)=>{
      let distanceKm:null|number=null
      if(Number.isFinite(lat)&&Number.isFinite(lon)&&Number.isFinite(Number(r.latitude))&&Number.isFinite(Number(r.longitude))){
        const rad=(x:number)=>x*Math.PI/180,R=6371,dLat=rad(Number(r.latitude)-lat),dLon=rad(Number(r.longitude)-lon)
        const a=Math.sin(dLat/2)**2+Math.cos(rad(lat))*Math.cos(rad(Number(r.latitude)))*Math.sin(dLon/2)**2
        distanceKm=R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))
      }
      return{id:r.id,name:r.name,slug:r.slug,address:r.address,lat:r.latitude,lon:r.longitude,menus:r.menu_keywords,destination_url:r.destination_url,commission_note:r.commission_note,commission_type:r.commission_type,commission_rate:Number(r.commission_rate)||0,distanceKm}
    }).sort((a:any,b:any)=>(a.distanceKm??9999)-(b.distanceKm??9999))
    return json({partners:rows.slice(0,8)})
  }

  if(action==='track_search'){
    const food=String(b.food||'').trim().slice(0,120)
    if(!food)return json({error:'invalid_food'},400)
    const lat=Number(b.lat),lon=Number(b.lon),row:any={food_name:food,source:String(b.source||'maps_fallback').slice(0,40)}
    if(Number.isFinite(lat))row.latitude=lat
    if(Number.isFinite(lon))row.longitude=lon
    const {error}=await sb.from('restaurant_search_demand').insert(row)
    if(error)return json({error:'db_error'},500)
    return json({ok:true})
  }

  if(action==='track_click'){
    const restaurantId=String(b.restaurantId||''),restaurantSlug=String(b.restaurantSlug||'').slice(0,120),food=String(b.food||'').slice(0,120),source=String(b.source||'nearby').slice(0,40),sessionId=String(b.sessionId||'').slice(0,120)
    if(!restaurantId)return json({error:'invalid_restaurant'},400)
    const {data:partner}=await sb.from('partner_restaurants').select('commission_type,commission_rate').eq('id',restaurantId).maybeSingle()
    const estimatedCommission=partner?.commission_type==='per_click'?Math.max(0,Number(partner.commission_rate)||0):0
    const {error}=await sb.from('partner_clicks').insert({restaurant_id:restaurantId,restaurant_slug:restaurantSlug||null,food_name:food,source,session_id:sessionId||null,estimated_commission:estimatedCommission})
    if(error)return json({error:'db_error'},500)
    return json({ok:true,estimatedCommission})
  }

  if(action==='owner_test_click'){
    const own=await requireOwner();if(own.error)return own.error
    const {data:partner,error:pe}=await sb.from('partner_restaurants').select('id,name,slug,commission_type,commission_rate').eq('status','active').order('created_at',{ascending:true}).limit(1).maybeSingle()
    if(pe||!partner)return json({error:'no_active_partner'},404)
    const estimatedCommission=partner.commission_type==='per_click'?Math.max(0,Number(partner.commission_rate)||0):0
    const {error}=await sb.from('partner_clicks').insert({restaurant_id:partner.id,restaurant_slug:partner.slug||null,food_name:'ทดสอบระบบ Owner',source:'owner_test',session_id:'owner-dashboard',estimated_commission:estimatedCommission})
    if(error)return json({error:'db_error'},500)
    return json({ok:true,restaurant:partner.name,estimatedCommission})
  }

  if(action==='review_partner_application'){
    const own=await requireOwner();if(own.error)return own.error
    const id=String(b.id||''),decision=String(b.decision||'')
    if(!id||!['approved','rejected','contacted'].includes(decision))return json({error:'invalid_request'},400)
    const {data:app,error:ae}=await sb.from('partner_applications').select('*').eq('id',id).maybeSingle()
    if(ae||!app)return json({error:'application_not_found'},404)
    if(decision==='approved'){
      if(app.status==='approved')return json({ok:true,status:'approved',alreadyReviewed:true})
      const base=String(app.restaurant_name||'partner').toLowerCase().replace(/[^a-z0-9ก-๙]+/g,'-').replace(/^-|-$/g,'').slice(0,55)||'partner'
      const slug=`${base}-${id.slice(0,8)}`
      const menus=String(app.menu_examples||'').split(/[,\n]/).map((x:string)=>x.trim()).filter(Boolean).slice(0,30)
      const {error:pe}=await sb.from('partner_restaurants').insert({name:app.restaurant_name,slug,status:'inactive',address:app.address||null,menu_keywords:menus,destination_url:null,commission_note:'สมัครผ่าน Partner Application',commission_type:'per_click',commission_rate:0})
      if(pe&&String((pe as any).code)!=='23505')return json({error:'create_partner_failed'},500)
    }
    const {error:ue}=await sb.from('partner_applications').update({status:decision}).eq('id',id)
    if(ue)return json({error:'update_application_failed'},500)
    return json({ok:true,status:decision})
  }

  if(action==='list_partner_admin'){
    const own=await requireOwner();if(own.error)return own.error
    const {data,error}=await sb.from('partner_restaurants').select('id,name,slug,status,address,menu_keywords,destination_url,commission_note,commission_type,commission_rate,created_at,updated_at').order('created_at',{ascending:false}).limit(200)
    if(error)return json({error:'db_error'},500)
    return json({partners:data||[]})
  }

  if(action==='list_partner_audit'){
    const own=await requireOwner();if(own.error)return own.error
    const {data,error}=await sb.from('partner_audit_log').select('id,partner_id,action,old_data,new_data,created_at').order('created_at',{ascending:false}).limit(100)
    if(error)return json({error:'db_error'},500)
    return json({audit:data||[]})
  }

  if(action==='update_partner_admin'){
    const own=await requireOwner();if(own.error)return own.error
    const id=String(b.id||'')
    if(!id)return json({error:'invalid_id'},400)
    const status=String(b.status||'inactive')
    if(!['active','inactive'].includes(status))return json({error:'invalid_status'},400)
    const commissionType=String(b.commission_type||'per_click')
    if(!['per_click','percent','fixed_order'].includes(commissionType))return json({error:'invalid_commission_type'},400)
    const commissionRate=Math.max(0,Number(b.commission_rate)||0),name=String(b.name||'').trim().slice(0,160)
    if(!name)return json({error:'invalid_name'},400)
    const menus=Array.isArray(b.menu_keywords)?b.menu_keywords.map((x:any)=>String(x).trim()).filter(Boolean).slice(0,60):String(b.menu_keywords||'').split(/[,\n]/).map((x:string)=>x.trim()).filter(Boolean).slice(0,60)
    const {data:before,error:be}=await sb.from('partner_restaurants').select('id,name,slug,status,address,menu_keywords,destination_url,commission_note,commission_type,commission_rate').eq('id',id).maybeSingle()
    if(be||!before)return json({error:'partner_not_found'},404)
    const patch={name,status,address:String(b.address||'').trim().slice(0,500)||null,menu_keywords:menus,destination_url:String(b.destination_url||'').trim().slice(0,1000)||null,commission_note:String(b.commission_note||'').trim().slice(0,500)||null,commission_type:commissionType,commission_rate:commissionRate,updated_at:new Date().toISOString()}
    const {data,error}=await sb.from('partner_restaurants').update(patch).eq('id',id).select('id,name,slug,status,address,menu_keywords,destination_url,commission_note,commission_type,commission_rate').maybeSingle()
    if(error||!data)return json({error:'update_partner_failed'},500)
    await sb.from('partner_audit_log').insert({partner_id:id,action:'update_partner',changed_by:own.user.id,old_data:before,new_data:data})
    return json({ok:true,partner:data})
  }

  if(action==='list_conversions_admin'){
    const own=await requireOwner();if(own.error)return own.error
    const [{data:rows,error:e1},{data:partners,error:e2}]=await Promise.all([
      sb.from('partner_conversions').select('id,restaurant_id,source_ref,order_amount,commission_amount,status,occurred_at,created_at,updated_at').order('occurred_at',{ascending:false}).limit(300),
      sb.from('partner_restaurants').select('id,name,status,commission_type,commission_rate').order('name')
    ])
    if(e1||e2)return json({error:'db_error'},500)
    const names=new Map((partners||[]).map((p:any)=>[p.id,p.name]))
    return json({conversions:(rows||[]).map((x:any)=>({...x,restaurant_name:names.get(x.restaurant_id)||'ไม่ทราบร้าน'})),partners:partners||[]})
  }

  if(action==='create_conversion_admin'){
    const own=await requireOwner();if(own.error)return own.error
    const restaurantId=String(b.restaurant_id||''),sourceRef=String(b.source_ref||'').trim().slice(0,200)||null,orderAmount=Math.max(0,Number(b.order_amount)||0)
    if(!restaurantId)return json({error:'invalid_restaurant'},400)
    const {data:partner,error:pe}=await sb.from('partner_restaurants').select('id,commission_type,commission_rate').eq('id',restaurantId).maybeSingle()
    if(pe||!partner)return json({error:'partner_not_found'},404)
    const rate=Math.max(0,Number(partner.commission_rate)||0)
    let commission=0
    if(partner.commission_type==='percent')commission=orderAmount*rate/100
    else if(partner.commission_type==='fixed_order')commission=rate
    commission=Number(commission.toFixed(2))
    const occurred=b.occurred_at?new Date(b.occurred_at):new Date()
    if(Number.isNaN(occurred.getTime()))return json({error:'invalid_occurred_at'},400)
    const {data,error}=await sb.from('partner_conversions').insert({restaurant_id:restaurantId,source_ref:sourceRef,order_amount:orderAmount,commission_amount:commission,status:'pending',occurred_at:occurred.toISOString(),created_by:own.user.id}).select('*').single()
    if(error)return json({error:'create_conversion_failed'},500)
    return json({ok:true,conversion:data})
  }

  if(action==='update_conversion_status'){
    const own=await requireOwner();if(own.error)return own.error
    const id=String(b.id||''),status=String(b.status||'')
    if(!id||!['pending','confirmed','cancelled'].includes(status))return json({error:'invalid_request'},400)
    const {data,error}=await sb.from('partner_conversions').update({status,updated_at:new Date().toISOString()}).eq('id',id).select('*').maybeSingle()
    if(error||!data)return json({error:'conversion_not_found'},404)
    return json({ok:true,conversion:data})
  }

  if(action==='dashboard_summary'){
    const own=await requireOwner();if(own.error)return own.error
    const days=Math.max(1,Math.min(365,Number(b.days)||30)),since=new Date(Date.now()-days*86400000).toISOString()
    const [{data:clicks,error:e1},{data:partners,error:e2},{data:feedback,error:e3},{data:searches,error:e4},{data:applications,error:e5},{data:conversions,error:e6}]=await Promise.all([
      sb.from('partner_clicks').select('restaurant_id,food_name,source,clicked_at,estimated_commission').gte('clicked_at',since).order('clicked_at',{ascending:false}).limit(5000),
      sb.from('partner_restaurants').select('id,name,status,commission_type,commission_rate'),
      sb.from('beta_feedback').select('id,rating,feedback_type,message,user_id,created_at').order('created_at',{ascending:false}).limit(50),
      sb.from('restaurant_search_demand').select('food_name,created_at').gte('created_at',since).limit(5000),
      sb.from('partner_applications').select('id,restaurant_name,contact_name,phone,line_id,email,address,menu_examples,notes,status,created_at').order('created_at',{ascending:false}).limit(100),
      sb.from('partner_conversions').select('restaurant_id,order_amount,commission_amount,status,occurred_at').gte('occurred_at',since).limit(5000)
    ])
    if(e1||e2||e3||e4||e5||e6)return json({error:'db_error'},500)
    const names=new Map((partners||[]).map((p:any)=>[p.id,p.name])),byRestaurant:any={},byFood:any={},revenueByRestaurant:any={},missingFood:any={},confirmedRevenueByRestaurant:any={}
    let estimatedRevenue=0,confirmedRevenue=0,pendingRevenue=0,confirmedOrders=0
    for(const c of clicks||[]){const n=names.get(c.restaurant_id)||'ไม่ทราบร้าน';const rev=Math.max(0,Number(c.estimated_commission)||0);estimatedRevenue+=rev;byRestaurant[n]=(byRestaurant[n]||0)+1;byFood[c.food_name||'ไม่ทราบเมนู']=(byFood[c.food_name||'ไม่ทราบเมนู']||0)+1;revenueByRestaurant[n]=(revenueByRestaurant[n]||0)+rev}
    for(const s of searches||[]){const n=s.food_name||'ไม่ทราบเมนู';missingFood[n]=(missingFood[n]||0)+1}
    for(const c of conversions||[]){const rev=Math.max(0,Number(c.commission_amount)||0),n=names.get(c.restaurant_id)||'ไม่ทราบร้าน';if(c.status==='confirmed'){confirmedRevenue+=rev;confirmedOrders++;confirmedRevenueByRestaurant[n]=(confirmedRevenueByRestaurant[n]||0)+rev}else if(c.status==='pending')pendingRevenue+=rev}
    const top=(o:any)=>Object.entries(o).sort((a:any,b:any)=>Number(b[1])-Number(a[1])).slice(0,10).map(([name,count])=>({name,count}))
    const revTop=(o:any)=>Object.entries(o).sort((a:any,b:any)=>Number(b[1])-Number(a[1])).slice(0,10).map(([name,revenue])=>({name,revenue:Number(Number(revenue).toFixed(2))}))
    return json({days,totalClicks:(clicks||[]).length,activePartners:(partners||[]).filter((p:any)=>p.status==='active').length,estimatedRevenue:Number(estimatedRevenue.toFixed(2)),confirmedRevenue:Number(confirmedRevenue.toFixed(2)),pendingRevenue:Number(pendingRevenue.toFixed(2)),confirmedOrders,topRestaurants:top(byRestaurant),topFoods:top(byFood),topMissingFoods:top(missingFood),revenueByRestaurant:revTop(revenueByRestaurant),confirmedRevenueByRestaurant:revTop(confirmedRevenueByRestaurant),recent:(clicks||[]).slice(0,20).map((c:any)=>({restaurant:names.get(c.restaurant_id)||'ไม่ทราบร้าน',food:c.food_name,source:c.source,clicked_at:c.clicked_at,estimatedCommission:Number(c.estimated_commission)||0})),feedback:feedback||[],partnerApplications:applications||[],newPartnerApplications:(applications||[]).filter((x:any)=>x.status==='new').length})
  }

  return json({error:'unknown_action'},400)
})
