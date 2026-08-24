// กินอะไรดี — Nearby restaurants + Supabase demand tracking
(function(){
  const PARTNER_API='https://cuspfvfzprlgtvtdyilh.supabase.co/functions/v1/partner-api';
  const SUPABASE_URL='https://cuspfvfzprlgtvtdyilh.supabase.co';
  const SUPABASE_KEY='sb_publishable_PGmPJ6_8tNIWm7zfF6qEng_0emmWchx';
  const SEARCH_RADIUS_KM=5, DEDUP_MS=30000;
  let targetFood=null,lastCoords=null,lastSaved={key:'',at:0};
  function sessionId(){const k='kinaraideeNearbySession';let v=localStorage.getItem(k);if(!v){v=(crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2));localStorage.setItem(k,v)}return v}
  async function api(action,payload={}){const r=await fetch(PARTNER_API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,...payload})});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error||('HTTP '+r.status));return d}
  function foodName(){return targetFood?.n||targetFood?.name||''}
  function roundCoord(v){return Number.isFinite(v)?Number(Number(v).toFixed(3)):null}
  function requestKey(lat,lon){return `${foodName()}|${Number.isFinite(lat)?Number(lat).toFixed(3):'na'}|${Number.isFinite(lon)?Number(lon).toFixed(3):'na'}`}
  async function saveRequest(lat,lon){const key=requestKey(lat,lon),now=Date.now();if(key===lastSaved.key&&now-lastSaved.at<DEDUP_MS)return{ok:true,deduped:true};try{const body={food_name:foodName(),search_radius_km:SEARCH_RADIUS_KM,status:'pending',source:'app'};const safeLat=roundCoord(lat),safeLon=roundCoord(lon);if(safeLat!==null)body.latitude=safeLat;if(safeLon!==null)body.longitude=safeLon;const r=await fetch(SUPABASE_URL+'/rest/v1/restaurant_requests',{method:'POST',headers:{'Content-Type':'application/json','apikey':SUPABASE_KEY,'Authorization':'Bearer '+SUPABASE_KEY,'Prefer':'return=minimal'},body:JSON.stringify(body)});if(!r.ok)throw new Error('HTTP '+r.status);lastSaved={key,at:now};return{ok:true,deduped:false}}catch(e){console.error('restaurant_requests:',e);return{ok:false,deduped:false}}}
  function mapsUrl(name,lat,lon){const q=encodeURIComponent((name||'ร้านอาหาร')+(Number.isFinite(lat)&&Number.isFinite(lon)?` ${lat},${lon}`:' ใกล้ฉัน'));return `https://www.google.com/maps/search/?api=1&query=${q}`}
  function setBoxStatus(id,t,bad=false){const e=document.getElementById(id);if(!e)return;e.textContent=t;e.style.display='block';e.style.background=bad?'#fff1ef':'#edfaf8'}
  function setPartnerStatus(t,bad=false){setBoxStatus('nearbyStatus',t,bad)}
  function setLocationStatus(t,bad=false){setBoxStatus('nearbyLocationStatus',t,bad)}
  function hideStatus(id){const e=document.getElementById(id);if(e)e.style.display='none'}
  function locationErrorMessage(error){
    if(!error)return'ยังหาตำแหน่งไม่ได้ — ลองอีกครั้ง หรือใช้ Google Maps แทนได้ครับ';
    if(error.code===1)return'ยังไม่ได้รับสิทธิ์ตำแหน่งจาก Safari/เบราว์เซอร์ — ตรวจ Location ของเว็บไซต์แล้วลองอีกครั้ง หรือใช้ Google Maps แทนได้ครับ';
    if(error.code===2)return'อุปกรณ์ยังระบุตำแหน่งไม่ได้ในขณะนี้ — ตรวจสัญญาณตำแหน่งแล้วลองอีกครั้ง หรือใช้ Google Maps แทนได้ครับ';
    if(error.code===3)return'ใช้เวลาหาตำแหน่งนานเกินไป — ลองอีกครั้งในที่สัญญาณดีขึ้น หรือใช้ Google Maps แทนได้ครับ';
    return'ยังหาตำแหน่งไม่ได้ — ลองอีกครั้ง หรือใช้ Google Maps แทนได้ครับ';
  }
  function setBusy(busy){const b=document.getElementById('nearbyUseLocation');if(!b)return;b.disabled=busy;b.style.opacity=busy?'.65':'1';b.textContent=busy?'📍 กำลังหาตำแหน่ง…':'📍 ใช้ตำแหน่งปัจจุบัน'}
  async function openMaps(lat,lon){const saved=await saveRequest(lat,lon);try{await api('track_search',{food:foodName(),source:'maps_fallback',lat,lon})}catch(e){}if(saved.ok)setLocationStatus(saved.deduped?'กำลังเปิด Google Maps (คำขอนี้บันทึกไว้ก่อนหน้านี้แล้ว)':'บันทึกความต้องการเมนูนี้แล้ว กำลังเปิด Google Maps…');location.href=mapsUrl(foodName(),lat,lon)}
  async function openPartner(r){try{await api('track_click',{restaurantId:r.id,restaurantSlug:r.slug||'',food:foodName(),source:'nearby',sessionId:sessionId()})}catch(e){}if(r.destination_url)location.href=r.destination_url;else openMaps(Number(r.lat),Number(r.lon))}
  function renderPartners(rows){
    const box=document.getElementById('nearbyPartners');
    if(!box)return;
    box.replaceChildren();
    if(!rows?.length){
      const card=document.createElement('div');card.className='fallbackCard';
      const title=document.createElement('b');title.textContent=`ยังไม่มีร้านพาร์ตเนอร์สำหรับ “${foodName()||'เมนูนี้'}”`;
      const detail=document.createElement('div');detail.className='nearbyMuted';detail.textContent='คำขอของคุณถูกเก็บไว้เพื่อช่วยให้เราเพิ่มร้านที่ตรงกับความต้องการ และยังค้นหาร้านใกล้ตัวผ่าน Google Maps ได้ทันที';
      card.append(title,detail);box.appendChild(card);return;
    }
    rows.forEach(r=>{
      const c=document.createElement('div');c.className='nearbyCard';
      const badge=document.createElement('span');badge.className='partnerBadge';badge.textContent='✓ พาร์ตเนอร์';
      const br=document.createElement('br');
      const name=document.createElement('b');name.textContent=String(r.name||'ร้านพาร์ตเนอร์');
      const detail=document.createElement('div');detail.className='nearbyMuted';
      const dist=Number.isFinite(Number(r.distanceKm))?` • ${Number(r.distanceKm).toFixed(1)} กม.`:'';
      detail.textContent=String(r.address||('มีเมนู '+foodName()))+dist;
      const button=document.createElement('button');button.className='partnerBtn';button.type='button';button.textContent='ดูร้าน / สั่งอาหาร ›';button.onclick=()=>openPartner(r);
      c.append(badge,br,name,detail,button);box.appendChild(c);
    });
  }
  async function loadPartners(lat,lon){try{const d=await api('find_partners',{food:foodName(),lat,lon,radiusKm:SEARCH_RADIUS_KM});renderPartners(d.partners||[]);setPartnerStatus(d.partners?.length?`พบร้านพาร์ตเนอร์ ${d.partners.length} ร้านสำหรับเมนูนี้`:'ยังไม่มีร้านพาร์ตเนอร์สำหรับเมนูนี้ — ค้นหาใน Google Maps ได้เลย')}catch(e){renderPartners([]);setPartnerStatus('ยังโหลดร้านพาร์ตเนอร์ไม่ได้ แต่ยังค้นหาใน Google Maps ได้ตามปกติ',true)}}
  function useLocation(){
    if(!navigator.geolocation)return setLocationStatus('อุปกรณ์นี้ไม่รองรับตำแหน่ง — เปิดค้นหาในแผนที่แทนได้ครับ',true);
    setBusy(true);setLocationStatus('กำลังขอตำแหน่งของคุณ…');
    navigator.geolocation.getCurrentPosition(async p=>{
      lastCoords={lat:p.coords.latitude,lon:p.coords.longitude};
      const saved=await saveRequest(lastCoords.lat,lastCoords.lon);
      setLocationStatus(saved.ok?(saved.deduped?'✅ ใช้ตำแหน่งปัจจุบันแล้ว — กำลังหาร้านใกล้คุณ…':'✅ ได้ตำแหน่งแล้วและบันทึกคำขอเรียบร้อย — กำลังหาร้านใกล้คุณ…'):'✅ ได้ตำแหน่งแล้ว แต่บันทึกคำขอไม่สำเร็จ — ยังค้นหาร้านใกล้คุณได้ครับ',!saved.ok);
      await loadPartners(lastCoords.lat,lastCoords.lon);
      setBusy(false);
    },async error=>{
      lastCoords=null;
      const saved=await saveRequest();
      const suffix=saved.ok?' ความต้องการเมนูนี้ยังถูกบันทึกไว้แล้ว':'';
      setLocationStatus(locationErrorMessage(error)+suffix,true);
      await loadPartners();
      setBusy(false);
    },{enableHighAccuracy:false,timeout:15000,maximumAge:600000});
  }
  function addUI(){if(document.getElementById('nearbyRestaurants'))return;const s=document.createElement('style');s.textContent='.nearbyHero,.nearbyCard,.fallbackCard{background:#fff;border:1px solid #eadfce;border-radius:18px;padding:14px;margin:10px 0}.nearbyStatus{border-radius:14px;padding:11px;margin:10px 0;font-weight:750}.nearbyLocationStatus{border-radius:14px;padding:11px;margin:10px 0;font-weight:750}.nearbyMuted{font-size:14px;color:#6b5b4e;margin-top:5px}.privacyNote{font-size:12px;color:#786a60;text-align:center;margin:8px 12px 2px;line-height:1.5}.privacyNote a{color:#0d716c}.partnerBadge{display:inline-block;background:#edfaf8;color:#0d716c;padding:5px 9px;border-radius:99px;font-size:12px;font-weight:900}.partnerBtn{width:100%;border:0;border-radius:14px;padding:12px;margin-top:10px;font-weight:900;background:#ff8500;color:white}';document.head.appendChild(s);document.querySelector('main.app').insertAdjacentHTML('beforeend','<section id="nearbyRestaurants" class="screen"><div class="topbar"><button class="back" id="nearbyBack">‹</button><b>ร้านใกล้คุณ</b><span></span></div><div class="nearbyHero"><h2 id="nearbyTitle">หาร้านสำหรับเมนูนี้</h2><p>ใช้ตำแหน่งของคุณเพื่อค้นหาร้านใกล้เคียง</p></div><div id="nearbyLocationStatus" class="nearbyLocationStatus" style="display:none" role="status" aria-live="polite"></div><div id="nearbyStatus" class="nearbyStatus" style="display:none"></div><div id="nearbyPartners"></div><button class="primary" id="nearbyUseLocation">📍 ใช้ตำแหน่งปัจจุบัน</button><div class="privacyNote">ตำแหน่งจะถูกใช้เมื่อคุณกดปุ่มนี้เท่านั้น และพิกัดที่บันทึกเพื่อวิเคราะห์ความต้องการจะลดความละเอียดประมาณระดับย่าน • <a href="privacy.html">นโยบายความเป็นส่วนตัว</a></div><button class="secondary" id="nearbyOpenMaps">🗺️ ค้นหาใน Google Maps</button></section>');document.getElementById('nearbyBack').onclick=()=>show('result');document.getElementById('nearbyUseLocation').onclick=useLocation;document.getElementById('nearbyOpenMaps').onclick=()=>openMaps(lastCoords?.lat,lastCoords?.lon)}
  function loadScript(src){if(document.querySelector(`script[src="${src}"]`))return;const s=document.createElement('script');s.src=src;s.async=false;document.body.appendChild(s)}
  function openNearby(){try{targetFood=current}catch(e){targetFood=null}lastCoords=null;addUI();document.getElementById('nearbyTitle').textContent=foodName()?`หาร้าน “${foodName()}” ใกล้คุณ`:'หาร้านอาหารใกล้คุณ';hideStatus('nearbyLocationStatus');hideStatus('nearbyStatus');document.getElementById('nearbyPartners').replaceChildren();setBusy(false);show('nearbyRestaurants');loadPartners()}
  function init(){addUI();window.nearby=openNearby;window.KINARAIDEE_NEARBY={open:openNearby,openMaps};if(!window.KINARAIDEE_GROUP_MODE)loadScript('data/group-mode.js');loadScript('data/pwa-install.js');loadScript('data/history-ui.js')}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else setTimeout(init,0)
})();