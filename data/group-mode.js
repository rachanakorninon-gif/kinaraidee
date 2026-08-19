// กินอะไรดี — Group Mode Phase 1
// ใช้งานบนเครื่องเดียว: ตั้งค่ากลุ่ม -> ให้สมาชิกเลือกความชอบทีละคน -> รวมคะแนนและสุ่มเมนูที่เหมาะกับกลุ่ม
(function(){
  const TAGS=[
    ['ข้าว','🍚 ข้าว'],['เส้น','🍜 เส้น'],['เผ็ด','🌶️ เผ็ด'],['ของทอด','🍟 ของทอด'],['ของหวาน','🍰 ของหวาน'],
    ['หนัก','🥘 มื้อหนัก'],['โปรตีน','🍗 โปรตีน'],['เบา','🥬 เบา ๆ'],['ซุป','🍲 ซุป/ต้ม'],['ต่างชาติ','🌏 ต่างชาติ']
  ];
  const state={size:2,meal:'กลางวัน',budget:200,member:0,votes:[]};

  function ready(){return typeof window.foods!=='undefined'||document.querySelector('#home')}
  function hideAll(){document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'))}
  function show(id){hideAll();const el=document.getElementById(id);if(el){el.classList.add('active');scrollTo(0,0)}}
  function reset(){state.size=2;state.meal='กลางวัน';state.budget=200;state.member=0;state.votes=[]}
  function addStyles(){
    const s=document.createElement('style');
    s.textContent='.groupPanel{background:#fff;border:1px solid #eee1cf;border-radius:24px;padding:18px}.groupGrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.groupChoice{border:1px solid #e9dfd0;background:#fff;border-radius:16px;padding:14px;font-weight:850}.groupChoice.on{border:2px solid #16a096;background:#edfaf8}.groupMeta{background:#fff8dd;border-radius:16px;padding:12px;margin:10px 0}.groupResult{border:2px solid #ff8a00;background:#fff8ee;border-radius:20px;padding:18px;text-align:center}.groupResult .big{font-size:72px}.groupResult h2{font-size:29px;margin:8px 0}.groupCount{font-size:44px;font-weight:950;text-align:center;margin:14px}';
    document.head.appendChild(s);
  }
  function addScreens(){
    if(document.getElementById('groupSetup'))return;
    const main=document.querySelector('main.app');if(!main)return;
    main.insertAdjacentHTML('beforeend',`
<section id="groupSetup" class="screen"><div class="topbar"><button class="back" id="groupHome">‹</button><b>เลือกพร้อมกัน (กลุ่ม)</b><span></span></div><div class="groupPanel"><div class="stepHead"><h1>มากันกี่คน?</h1><p>เวอร์ชันนี้ส่งเครื่องให้เลือกทีละคนได้เลย</p></div><div class="groupCount" id="groupSize">2 คน</div><div class="actionRow"><button class="secondary" id="groupMinus">− ลด</button><button class="secondary" id="groupPlus">＋ เพิ่ม</button></div><h3>มื้ออาหาร</h3><div class="groupGrid" id="groupMeals"><button class="groupChoice" data-v="เช้า">🌅 เช้า</button><button class="groupChoice on" data-v="กลางวัน">☀️ กลางวัน</button><button class="groupChoice" data-v="เย็น">🌇 เย็น</button><button class="groupChoice" data-v="ดึก">🌙 ดึก</button></div><h3>งบต่อคน</h3><div class="groupGrid" id="groupBudgets"><button class="groupChoice" data-v="50">≤ 50</button><button class="groupChoice" data-v="100">≤ 100</button><button class="groupChoice" data-v="150">≤ 150</button><button class="groupChoice on" data-v="200">≤ 200</button><button class="groupChoice" data-v="999">∞ ไม่จำกัด</button></div><button class="primary" id="groupBegin">เริ่มเลือกทีละคน ›</button></div></section>
<section id="groupVote" class="screen"><div class="topbar"><button class="back" id="groupBackSetup">‹</button><b>ความชอบของกลุ่ม</b><span></span></div><div class="groupMeta" id="groupProgress"></div><div class="stepHead"><h1 id="groupMemberTitle">คนที่ 1 ชอบอะไร?</h1><p>เลือกได้สูงสุด 3 อย่าง หรือไม่เลือกเลยก็ได้</p></div><div class="typeGrid" id="groupTags"></div><button class="primary" id="groupNextMember">บันทึกคนนี้ ›</button></section>
<section id="groupResult" class="screen"><div class="topbar"><button class="back" id="groupRestart">‹</button><b>ผลลัพธ์ของกลุ่ม</b><span></span></div><div class="groupResult"><div class="big" id="groupFoodEmoji">🍽️</div><h2 id="groupFoodName"></h2><div id="groupFoodInfo"></div><div class="groupMeta" id="groupReason"></div></div><button class="secondary" id="groupReroll">🔄 สุ่มจากตัวเลือกกลุ่มอีกครั้ง</button><button class="primary" id="groupUseSingle">👍 กินอันนี้</button><button class="secondary" id="groupShare">↗ แชร์ผลให้เพื่อน</button></section>`);
  }
  function syncSetup(){
    document.getElementById('groupSize').textContent=state.size+' คน';
    document.querySelectorAll('#groupMeals .groupChoice').forEach(b=>b.classList.toggle('on',b.dataset.v===state.meal));
    document.querySelectorAll('#groupBudgets .groupChoice').forEach(b=>b.classList.toggle('on',+b.dataset.v===state.budget));
  }
  function renderVote(){
    const box=document.getElementById('groupTags');box.innerHTML='';
    TAGS.forEach(([v,l])=>{const b=document.createElement('button');b.className='groupChoice';b.dataset.v=v;b.textContent=l;b.onclick=()=>{const on=[...box.querySelectorAll('.on')];if(!b.classList.contains('on')&&on.length>=3)return; b.classList.toggle('on')};box.appendChild(b)});
    document.getElementById('groupProgress').textContent=`สมาชิก ${state.member+1} / ${state.size} • ${state.meal} • งบ ${state.budget===999?'ไม่จำกัด':state.budget+' บาท/คน'}`;
    document.getElementById('groupMemberTitle').textContent=`คนที่ ${state.member+1} ชอบอะไร?`;
    document.getElementById('groupNextMember').textContent=state.member===state.size-1?'รวมคะแนนแล้วเลือกเมนู ✨':'บันทึกคนนี้ ›';
  }
  function getFoods(){try{return foods}catch(e){return[]}}
  function candidates(){return getFoods().filter(f=>f.m.includes(state.meal)&&f.p<=state.budget)}
  function scoreFood(f){return state.votes.reduce((sum,v)=>sum+v.filter(t=>f.tags.includes(t)).length,0)}
  function pick(){
    let pool=candidates();if(!pool.length)return null;
    const scored=pool.map(f=>({f,s:scoreFood(f)}));const max=Math.max(...scored.map(x=>x.s));
    const best=scored.filter(x=>x.s===max).map(x=>x.f);return {food:best[Math.floor(Math.random()*best.length)],score:max,total:state.votes.reduce((n,v)=>n+v.length,0)};
  }
  let lastPick=null;
  function renderResult(){
    lastPick=pick();if(!lastPick){alert('ยังไม่มีเมนูในมื้อและงบนี้ ลองเพิ่มงบหรือเปลี่ยนมื้อนะครับ');return show('groupSetup')}
    const f=lastPick.food;document.getElementById('groupFoodEmoji').textContent=f.e;document.getElementById('groupFoodName').textContent=f.n;document.getElementById('groupFoodInfo').textContent=`💸 ${f.p} บาท/คน • 🌶️ ${f.s} • 👥 ${state.size} คน`;
    document.getElementById('groupReason').textContent=lastPick.total?`ตรงกับความชอบของกลุ่ม ${lastPick.score} คะแนน จากตัวเลือกทั้งหมด ${lastPick.total} คะแนน`:'ทุกคนให้เราตัดสินใจ จึงสุ่มจากมื้อและงบของกลุ่ม';show('groupResult');
  }
  async function share(){if(!lastPick)return;const f=lastPick.food;const text=`👥 กลุ่มเราเลือกกิน: ${f.n}\n💸 ประมาณ ${f.p} บาท/คน • ${state.size} คน\nกินอะไรดี ${location.href}`;try{if(navigator.share)await navigator.share({title:'กลุ่มเราเลือกกิน '+f.n,text});else await navigator.clipboard.writeText(text)}catch(e){}}
  function bind(){
    const groupBtn=[...document.querySelectorAll('#home button')].find(b=>b.textContent.includes('เลือกพร้อมกัน'));
    if(groupBtn){groupBtn.removeAttribute('onclick');groupBtn.onclick=()=>{reset();syncSetup();show('groupSetup')}}
    document.getElementById('groupHome').onclick=()=>{if(typeof goHome==='function')goHome();else show('home')};
    document.getElementById('groupMinus').onclick=()=>{state.size=Math.max(2,state.size-1);syncSetup()};
    document.getElementById('groupPlus').onclick=()=>{state.size=Math.min(6,state.size+1);syncSetup()};
    document.querySelectorAll('#groupMeals .groupChoice').forEach(b=>b.onclick=()=>{state.meal=b.dataset.v;syncSetup()});
    document.querySelectorAll('#groupBudgets .groupChoice').forEach(b=>b.onclick=()=>{state.budget=+b.dataset.v;syncSetup()});
    document.getElementById('groupBegin').onclick=()=>{state.member=0;state.votes=[];renderVote();show('groupVote')};
    document.getElementById('groupBackSetup').onclick=()=>show('groupSetup');
    document.getElementById('groupNextMember').onclick=()=>{state.votes.push([...document.querySelectorAll('#groupTags .groupChoice.on')].map(x=>x.dataset.v));if(state.member<state.size-1){state.member++;renderVote()}else renderResult()};
    document.getElementById('groupRestart').onclick=()=>{reset();syncSetup();show('groupSetup')};
    document.getElementById('groupReroll').onclick=renderResult;
    document.getElementById('groupShare').onclick=share;
    document.getElementById('groupUseSingle').onclick=()=>{if(!lastPick)return;try{current=lastPick.food;resultRun++;acceptedRun=-1;likedRun=-1;media(current);foodName.textContent=current.n;price.textContent='💸 '+current.p+' บาท/คน';people.textContent='👥 '+state.size+' คน';spicy.textContent='🌶️ '+current.s;meal.textContent='🕒 '+state.meal;reason.textContent='👥 เมนูที่กลุ่มช่วยกันเลือก';prefs.meal=state.meal;prefs.people=Math.min(4,state.size);prefs.budget=state.budget;prefs.types=[];show('result')}catch(e){}};
  }
  function init(){if(!ready())return setTimeout(init,100);addStyles();addScreens();bind()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else setTimeout(init,0);
})();
