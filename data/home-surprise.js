// กินอะไรดี — instant “ไม่รู้เลย” action on the home screen
(function(){
  function inferMeal(){
    const h=new Date().getHours();
    if(h>=5&&h<11)return 'เช้า';
    if(h>=11&&h<16)return 'กลางวัน';
    if(h>=16&&h<22)return 'เย็น';
    return 'ดึก';
  }
  function runSurprise(){
    try{if(typeof resetPrefs==='function')resetPrefs()}catch(e){}
    try{
      prefs.meal=inferMeal();
      prefs.people=1;
      prefs.budget=999;
      prefs.types=[];
      if(typeof show==='function')show('loading');
      setTimeout(()=>{
        try{if(typeof recommendNow==='function')recommendNow();else if(typeof startFresh==='function')startFresh()}catch(e){if(typeof startFresh==='function')startFresh()}
      },300);
    }catch(e){if(typeof startFresh==='function')startFresh()}
  }
  function install(){
    const home=document.querySelector('#home .homeHero');
    if(!home||document.getElementById('homeSurpriseBtn'))return;
    const b=document.createElement('button');
    b.id='homeSurpriseBtn';
    b.className='primary';
    b.textContent='🎲 ไม่รู้เลย — เลือกให้ฉันทันที';
    b.style.background='#0f9d94';
    b.onclick=runSurprise;
    const group=[...home.querySelectorAll('button')].find(x=>x.textContent.includes('เลือกพร้อมกัน'));
    if(group)home.insertBefore(b,group);else home.appendChild(b);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();