// กินอะไรดี — Nearby restaurant flow (Phase 1)
(function(){
  let targetFood=null;
  function addStyles(){
    if(document.getElementById('nearbyRestaurantStyles'))return;
    const s=document.createElement('style');s.id='nearbyRestaurantStyles';s.textContent=`
      .nearbyHero{background:#fff8ee;border:1px solid #f0dfc8;border-radius:22px;padding:18px;margin-bottom:12px}
      .nearbyHero h2{margin:0 0 6px;font-size:24px}.nearbyHero p{margin:0;color:#6b5b4e}
      .nearbyCard{background:#fff;border:1px solid #eadfce;border-radius:18px;padding:14px;margin:10px 0}
      .nearbyCard b{font-size:18px}.nearbyMuted{font-size:14px;color:#6b5b4e;margin-top:5px}
      .nearbyStatus{background:#edfaf8;color:#0d716c;border-radius:14px;padding:11px;margin:10px 0;font-weight:750}
      .nearbyNote{background:#fff8dd;border-radius:14px;padding:11px;margin-top:12px;font-size:14px}
    `;document.head.appendChild(s)
  }
  function addScreen(){
    if(document.getElementById('nearbyRestaurants'))return;
    const main=document.querySelector('main.app');if(!main)return;
    main.insertAdjacentHTML('beforeend',`<section id="nearbyRestaurants" class="screen">
      <div class="topbar"><button class="back" id="nearbyBack">‹</button><b>ร้านใกล้คุณ</b><span></span></div>
      <div class="nearbyHero"><h2 id="nearbyTitle">หาร้านสำหรับเมนูนี้</h2><p id="nearbySubtitle">ใช้ตำแหน่งของคุณเพื่อค้นหาร้านใกล้เคียง</p></div>
      <div id="nearbyStatus"></div>
      <button class="primary" id="nearbyUseLocation">📍 ใช้ตำแหน่งปัจจุบัน</button>
      <button class="secondary" id="nearbyOpenMaps">🗺️ ค้นหาใน Google Maps</button>
      <div class="nearbyNote">ตอนนี้เราใช้การค้นหาจากแผนที่ก่อน เมื่อระบบร้านพาร์ตเนอร์พร้อม จะสามารถแสดงร้านในแอปและเชื่อมรายได้จากร้านได้โดยตรง</div>
    </section>`);
    document.getElementById('nearbyBack').onclick=()=>{if(typeof show==='function')show('result')};
    document.getElementById('nearbyOpenMaps').onclick=()=>openMaps();
    document.getElementById('nearbyUseLocation').onclick=()=>useLocation();
  }
  function foodName(){return targetFood?.n||targetFood?.name||''}
  function mapsUrl(name,lat,lon){
    const q=encodeURIComponent((name||'ร้านอาหาร')+' ใกล้ฉัน');
    if(Number.isFinite(lat)&&Number.isFinite(lon))return `https://www.google.com/maps/search/?api=1&query=${q}&center=${lat},${lon}`;
    return `https://www.google.com/maps/search/?api=1&query=${q}`
  }
  function setStatus(text,ok=true){const el=document.getElementById('nearbyStatus');if(!el)return;el.className='nearbyStatus';el.textContent=text;el.style.display='block';if(!ok)el.style.background='#fff1ef'}
  function openMaps(lat,lon){window.open(mapsUrl(foodName(),lat,lon),'_blank')}
  function useLocation(){
    if(!navigator.geolocation){setStatus('อุปกรณ์นี้ไม่รองรับตำแหน่ง — เปิดค้นหาในแผนที่แทนได้ครับ',false);return}
    setStatus('กำลังขอตำแหน่งของคุณ…');
    navigator.geolocation.getCurrentPosition(
      p=>{setStatus('พบตำแหน่งแล้ว กำลังเปิดร้านใกล้คุณ');openMaps(p.coords.latitude,p.coords.longitude)},
      ()=>setStatus('ไม่ได้รับสิทธิ์ตำแหน่ง คุณยังค้นหาใน Google Maps ได้ตามปกติ',false),
      {enableHighAccuracy:false,timeout:8000,maximumAge:300000}
    )
  }
  function openNearby(){
    try{targetFood=typeof current!=='undefined'?current:null}catch(e){targetFood=null}
    addStyles();addScreen();
    const name=foodName();
    document.getElementById('nearbyTitle').textContent=name?`หาร้าน “${name}” ใกล้คุณ`:'หาร้านอาหารใกล้คุณ';
    document.getElementById('nearbySubtitle').textContent='เลือกใช้ตำแหน่งปัจจุบัน หรือเปิดค้นหาในแผนที่ได้ทันที';
    const st=document.getElementById('nearbyStatus');if(st)st.style.display='none';
    if(typeof show==='function')show('nearbyRestaurants')
  }
  function init(){addStyles();addScreen();window.nearby=openNearby;window.KINARAIDEE_NEARBY={open:openNearby,openMaps}}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else setTimeout(init,0)
})();