// กินอะไรดี — Nearby restaurants + Supabase demand tracking
(function(){
  const PARTNER_API='https://cuspfvfzprlgtvtdyilh.supabase.co/functions/v1/partner-api';
  const SUPABASE_URL='https://cuspfvfzprlgtvtdyilh.supabase.co';
  const SUPABASE_KEY='sb_publishable_PGmPJ6_8tNIWm7zfF6qEng_0emmWchx';
  let targetFood=null,lastCoords=null;

  async function api(action,payload={}){
    const r=await fetch(PARTNER_API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,...payload})});
    const d=await r.json().catch(()=>({})); if(!r.ok) throw new Error(d.error||('HTTP '+r.status)); return d;
  }
  async function saveRequest(lat,lon){
    try{
      const body={food_name:foodName(),search_radius_km:5,status:'pending',source:'app'};
      if(Number.isFinite(lat)) body.latitude=lat;
      if(Number.isFinite(lon)) body.longitude=lon;
      const r=await fetch(SUPABASE_URL+'/rest/v1/restaurant_requests',{
        method:'POST',headers:{'Content-Type':'application/json','apikey':SUPABASE_KEY,'Authorization':'Bearer '+SUPABASE_KEY,'Prefer':'return=minimal'},body:JSON.stringify(body)
      });
      if(!r.ok) throw new Error('HTTP '+r.status);
      return true;
    }catch(e){console.error('restaurant_requests:',e);return false}
  }
  function foodName(){return targetFood?.n||targetFood?.name||''}
  function mapsUrl(name,lat,lon){const q=encodeURIComponent((name||'ร้านอาหาร')+' ใกล้ฉัน');return Number.isFinite(lat)&&Number.isFinite(lon)?`https://www.google.com/maps/search/?api=1&query=${q}&center=${lat},${lon}`:`https://www.google.com/maps/search/?api=1&query=${q}`}
  function setStatus(t,bad=false){const e=document.getElementById('nearbyStatus');if(!e)return;e.textContent=t;e.style.display='block';e.style.background=bad?'#fff1ef':'#edfaf8'}
  async function openMaps(lat,lon){await saveRequest(lat,lon);try{await api('track_search',{food:foodName(),source:'maps_fallback',lat,lon})}catch(e){}window.open(mapsUrl(foodName(),lat,lon),'_blank')}
  async function openPartner(r){try{await api('track_click',{restaurantId:r.id,restaurantSlug:r.slug||'',food:foodName(),source:'nearby'})}catch(e){}if(r.destination_url)window.open(r.destination_url,'_blank');else openMaps(Number(r.lat),Number(r.lon))}
  function renderPartners(rows){const box=document.getElementById('nearbyPartners');if(!box)return;box.innerHTML='';if(!rows?.length){box.innerHTML=`<div class="fallbackCard"><b>ยังไม่มีร้านพาร์ตเนอร์สำหรับ “${foodName()||'เมนูนี้'}”</b><div class="nearbyMuted">ค้นหาร้านใกล้ตัวได้ทันที และระบบจะเก็บความต้องการเมนูนี้ไว้เพื่อช่วยเพิ่มร้านพาร์ตเนอร์ในอนาคต</div></div>`;return}rows.forEach(r=>{const c=document.createElement('div');c.className='nearbyCard';c.innerHTML=`<span class="partnerBadge">✓ พาร์ตเนอร์</span><br><b>${r.name}</b><div class="nearbyMuted">มีเมนู ${foodName()}</div><button class="partnerBtn">ดูร้าน / สั่งอาหาร ›</button>`;c.querySelector('button').onclick=()=>openPartner(r);box.appendChild(c)})}
  async function loadPartners(lat,lon){try{const d=await api('find_partners',{food:foodName(),lat,lon});renderPartners(d.partners||[]);setStatus(d.partners?.length?`พบร้านพาร์ตเนอร์ ${d.partners.length} ร้านสำหรับเมนูนี้`:'ยังไม่มีร้านพาร์ตเนอร์สำหรับเมนูนี้ — กดค้นหาร้านใกล้ฉันได้เลย')}catch(e){renderPartners([]);setStatus('ยังโหลดร้านพาร์ตเนอร์ไม่ได้ แต่ยังค้นหาร้านใกล้ฉันได้ตามปกติ',true)}}
  function useLocation(){if(!navigator.geolocation)return setStatus('อุปกรณ์นี้ไม่รองรับตำแหน่ง — เปิดค้นหาในแผนที่แทนได้ครับ',true);setStatus('กำลังขอตำแหน่งของคุณ…');navigator.geolocation.getCurrentPosition(async p=>{lastCoords={lat:p.coords.latitude,lon:p.coords.longitude};await saveRequest(lastCoords.lat,lastCoords.lon);setStatus('บันทึกคำขอแล้ว กำลังหาร้านพาร์ตเนอร์ใกล้คุณ…');loadPartners(lastCoords.lat,lastCoords.lon)},async()=>{await saveRequest();setStatus('ไม่ได้รับสิทธิ์ตำแหน่ง แต่บันทึกคำขอเมนูไว้แล้ว',true);loadPartners()},{enableHighAccuracy:false,timeout:8000,maximumAge:300000})}
  function addUI(){if(document.getElementById('nearbyRestaurants'))return;const s=document.createElement('style');s.textContent='.nearbyHero,.nearbyCard,.fallbackCard{background:#fff;border:1px solid #eadfce;border-radius:18px;padding:14px;margin:10px 0}.nearbyStatus{border-radius:14px;padding:11px;margin:10px 0;font-weight:750}.nearbyMuted{font-size:14px;color:#6b5b4e;margin-top:5px}.partnerBadge{display:inline-block;background:#edfaf8;color:#0d716c;padding:5px 9px;border-radius:99px;font-size:12px;font-weight:900}.partnerBtn{width:100%;border:0;border-radius:14px;padding:12px;margin-top:10px;font-weight:900;background:#ff8500;color:white}';document.head.appendChild(s);document.querySelector('main.app').insertAdjacentHTML('beforeend','<section id="nearbyRestaurants" class="screen"><div class="topbar"><button class="back" id="nearbyBack">‹</button><b>ร้านใกล้คุณ</b><span></span></div><div class="nearbyHero"><h2 id="nearbyTitle">หาร้านสำหรับเมนูนี้</h2><p>ใช้ตำแหน่งของคุณเพื่อค้นหาร้านใกล้เคียง</p></div><div id="nearbyStatus" style="display:none"></div><div id="nearbyPartners"></div><button class="primary" id="nearbyUseLocation">📍 ใช้ตำแหน่งปัจจุบัน</button><button class="secondary" id="nearbyOpenMaps">🗺️ ค้นหาใน Google Maps</button></section>');nearbyBack.onclick=()=>show('result');nearbyUseLocation.onclick=useLocation;nearbyOpenMaps.onclick=()=>openMaps(lastCoords?.lat,lastCoords?.lon)}
  function openNearby(){try{targetFood=current}catch(e){targetFood=null}lastCoords=null;addUI();nearbyTitle.textContent=foodName()?`หาร้าน “${foodName()}” ใกล้คุณ`:'หาร้านอาหารใกล้คุณ';nearbyStatus.style.display='none';nearbyPartners.innerHTML='';show('nearbyRestaurants');loadPartners()}
  function init(){addUI();window.nearby=openNearby;window.KINARAIDEE_NEARBY={open:openNearby,openMaps}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else setTimeout(init,0)
})();