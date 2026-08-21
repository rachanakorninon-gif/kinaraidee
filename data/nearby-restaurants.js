// กินอะไรดี — Nearby restaurants + Supabase demand tracking
(function(){
  const PARTNER_API='https://cuspfvfzprlgtvtdyilh.supabase.co/functions/v1/partner-api';
  const SUPABASE_URL='https://cuspfvfzprlgtvtdyilh.supabase.co';
  const SUPABASE_KEY='sb_publishable_PGmPJ6_8tNIWm7zfF6qEng_0emmWchx';
  const SEARCH_RADIUS_KM=5;
  const DEDUP_MS=30000;
  let targetFood=null,lastCoords=null,lastSaved={key:'',at:0};

  function sessionId(){
    const k='kinaraideeNearbySession';
    let v=localStorage.getItem(k);
    if(!v){v=(crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2));localStorage.setItem(k,v)}
    return v;
  }
  async function api(action,payload={}){
    const r=await fetch(PARTNER_API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,...payload})});
    const d=await r.json().catch(()=>({})); if(!r.ok) throw new Error(d.error||('HTTP '+r.status)); return d;
  }
  function foodName(){return targetFood?.n||targetFood?.name||''}
  function requestKey(lat,lon){
    const a=Number.isFinite(lat)?Number(lat).toFixed(3):'na';
    const o=Number.isFinite(lon)?Number(lon).toFixed(3):'na';
    return `${foodName()}|${a}|${o}`;
  }
  async function saveRequest(lat,lon){
    const key=requestKey(lat,lon),now=Date.now();
    if(key===lastSaved.key&&now-lastSaved.at<DEDUP_MS)return {ok:true,deduped:true};
    try{
      const body={food_name:foodName(),search_radius_km:SEARCH_RADIUS_KM,status:'pending',source:'app'};
      if(Number.isFinite(lat)) body.latitude=lat;
      if(Number.isFinite(lon)) body.longitude=lon;
      const r=await fetch(SUPABASE_URL+'/rest/v1/restaurant_requests',{
        method:'POST',headers:{'Content-Type':'application/json','apikey':SUPABASE_KEY,'Authorization':'Bearer '+SUPABASE_KEY,'Prefer':'return=minimal'},body:JSON.stringify(body)
      });
      if(!r.ok) throw new Error('HTTP '+r.status);
      lastSaved={key,at:now};
      return {ok:true,deduped:false};
    }catch(e){console.error('restaurant_requests:',e);return {ok:false,deduped:false}}
  }
  function mapsUrl(name,lat,lon){
    const q=encodeURIComponent((name||'ร้านอาหาร')+' ใกล้ฉัน');
    return Number.isFinite(lat)&&Number.isFinite(lon)?`https://www.google.com/maps/search/?api=1&query=${q}&center=${lat},${lon}`:`https://www.google.com/maps/search/?api=1&query=${q}`;
  }
  function setStatus(t,bad=false){const e=document.getElementById('nearbyStatus');if(!e)return;e.textContent=t;e.style.display='block';e.style.background=bad?'#fff1ef':'#edfaf8'}
  function setBusy(busy){const b=document.getElementById('nearbyUseLocation');if(!b)return;b.disabled=busy;b.style.opacity=busy?'.65':'1';b.textContent=busy?'📍 กำลังหาตำแหน่ง…':'📍 ใช้ตำแหน่งปัจจุบัน'}
  async function openMaps(lat,lon){
    const saved=await saveRequest(lat,lon);
    try{await api('track_search',{food:foodName(),source:'maps_fallback',lat,lon})}catch(e){}
    if(saved.ok)setStatus(saved.deduped?'เปิด Google Maps ให้แล้ว (คำขอนี้บันทึกไว้ก่อนหน้านี้แล้ว)':'บันทึกความต้องการเมนูนี้แล้ว กำลังเปิด Google Maps…');
    window.open(mapsUrl(foodName(),lat,lon),'_blank');
  }
  async function openPartner(r){
    try{await api('track_click',{restaurantId:r.id,restaurantSlug:r.slug||'',food:foodName(),source:'nearby',sessionId:sessionId()})}catch(e){}
    if(r.destination_url)window.open(r.destination_url,'_blank');else openMaps(Number(r.lat),Number(r.lon));
  }
  function renderPartners(rows){
    const box=document.getElementById('nearbyPartners');if(!box)return;box.innerHTML='';
    if(!rows?.length){box.innerHTML=`<div class="fallbackCard"><b>ยังไม่มีร้านพาร์ตเนอร์สำหรับ “${foodName()||'เมนูนี้'}”</b><div class="nearbyMuted">คำขอของคุณถูกเก็บไว้เพื่อช่วยให้เราเพิ่มร้านที่ตรงกับความต้องการ และยังค้นหาร้านใกล้ตัวผ่าน Google Maps ได้ทันที</div></div>`;return}
    rows.forEach(r=>{const c=document.createElement('div');c.className='nearbyCard';const dist=Number.isFinite(Number(r.distanceKm))?` • ${Number(r.distanceKm).toFixed(1)} กม.`:'';const addr=r.address?`<div class="nearbyMuted">${r.address}${dist}</div>`:`<div class="nearbyMuted">มีเมนู ${foodName()}${dist}</div>`;c.innerHTML=`<span class="partnerBadge">✓ พาร์ตเนอร์</span><br><b>${r.name}</b>${addr}<button class="partnerBtn">ดูร้าน / สั่งอาหาร ›</button>`;c.querySelector('button').onclick=()=>openPartner(r);box.appendChild(c)})
  }
  async function loadPartners(lat,lon){
    try{const d=await api('find_partners',{food:foodName(),lat,lon,radiusKm:SEARCH_RADIUS_KM});renderPartners(d.partners||[]);setStatus(d.partners?.length?`พบร้านพาร์ตเนอร์ ${d.partners.length} ร้านสำหรับเมนูนี้`:'ยังไม่มีร้านพาร์ตเนอร์สำหรับเมนูนี้ — บันทึกความต้องการไว้แล้ว และค้นหาใน Google Maps ได้เลย')}
    catch(e){renderPartners([]);setStatus('ยังโหลดร้านพาร์ตเนอร์ไม่ได้ แต่คำขอยังบันทึกได้และค้นหาใน Google Maps ได้ตามปกติ',true)}
  }
  function useLocation(){
    if(!navigator.geolocation)return setStatus('อุปกรณ์นี้ไม่รองรับตำแหน่ง — เปิดค้นหาในแผนที่แทนได้ครับ',true);
    setBusy(true);setStatus('กำลังขอตำแหน่งของคุณ…');
    navigator.geolocation.getCurrentPosition(async p=>{
      lastCoords={lat:p.coords.latitude,lon:p.coords.longitude};
      const saved=await saveRequest(lastCoords.lat,lastCoords.lon);
      if(saved.ok)setStatus(saved.deduped?'ตำแหน่งพร้อมแล้ว — คำขอนี้บันทึกไว้ก่อนหน้านี้แล้ว กำลังหาร้านใกล้คุณ…':'✅ บันทึกคำขอแล้ว กำลังหาร้านพาร์ตเนอร์ใกล้คุณ…');
      else setStatus('ได้ตำแหน่งแล้ว แต่บันทึกคำขอไม่สำเร็จ — ยังลองค้นหาร้านได้ครับ',true);
      await loadPartners(lastCoords.lat,lastCoords.lon);setBusy(false);
    },async()=>{
      const saved=await saveRequest();
      setStatus(saved.ok?'ไม่ได้รับสิทธิ์ตำแหน่ง แต่ ✅ บันทึกความต้องการเมนูนี้ไว้แล้ว':'ไม่ได้รับสิทธิ์ตำแหน่ง และยังบันทึกคำขอไม่ได้',!saved.ok);
      await loadPartners();setBusy(false);
    },{enableHighAccuracy:false,timeout:8000,maximumAge:300000});
  }
  function addUI(){
    if(document.getElementById('nearbyRestaurants'))return;
    const s=document.createElement('style');s.textContent='.nearbyHero,.nearbyCard,.fallbackCard{background:#fff;border:1px solid #eadfce;border-radius:18px;padding:14px;margin:10px 0}.nearbyStatus{border-radius:14px;padding:11px;margin:10px 0;font-weight:750}.nearbyMuted{font-size:14px;color:#6b5b4e;margin-top:5px}.partnerBadge{display:inline-block;background:#edfaf8;color:#0d716c;padding:5px 9px;border-radius:99px;font-size:12px;font-weight:900}.partnerBtn{width:100%;border:0;border-radius:14px;padding:12px;margin-top:10px;font-weight:900;background:#ff8500;color:white}';document.head.appendChild(s);
    document.querySelector('main.app').insertAdjacentHTML('beforeend','<section id="nearbyRestaurants" class="screen"><div class="topbar"><button class="back" id="nearbyBack">‹</button><b>ร้านใกล้คุณ</b><span></span></div><div class="nearbyHero"><h2 id="nearbyTitle">หาร้านสำหรับเมนูนี้</h2><p>ใช้ตำแหน่งของคุณเพื่อค้นหาร้านใกล้เคียง</p></div><div id="nearbyStatus" style="display:none"></div><div id="nearbyPartners"></div><button class="primary" id="nearbyUseLocation">📍 ใช้ตำแหน่งปัจจุบัน</button><button class="secondary" id="nearbyOpenMaps">🗺️ ค้นหาใน Google Maps</button></section>');
    nearbyBack.onclick=()=>show('result');nearbyUseLocation.onclick=useLocation;nearbyOpenMaps.onclick=()=>openMaps(lastCoords?.lat,lastCoords?.lon)
  }
  function openNearby(){try{targetFood=current}catch(e){targetFood=null}lastCoords=null;addUI();nearbyTitle.textContent=foodName()?`หาร้าน “${foodName()}” ใกล้คุณ`:'หาร้านอาหารใกล้คุณ';nearbyStatus.style.display='none';nearbyPartners.innerHTML='';setBusy(false);show('nearbyRestaurants');loadPartners()}
  function init(){addUI();window.nearby=openNearby;window.KINARAIDEE_NEARBY={open:openNearby,openMaps}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else setTimeout(init,0)
})();