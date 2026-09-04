// Kinaraidee — multi-provider Auth foundation
// All new providers are disabled by default. Enabling requires external provider
// configuration + referral/acquisition parity + physical acceptance evidence.
(function(){
  'use strict';

  const DEFAULT_ROLLOUT=Object.freeze({line:false,phone:false,facebook:false});
  const LINE_PROVIDER='custom:line';

  function normalizeThaiPhone(raw){
    const value=String(raw||'').replace(/[\s()-]/g,'');
    if(/^0\d{9}$/.test(value))return '+66'+value.slice(1);
    if(/^\+66\d{9}$/.test(value))return value;
    return '';
  }

  function maskPhone(raw){
    const digits=String(raw||'').replace(/\D/g,'');
    if(digits.length<4)return 'เบอร์โทรของคุณ';
    return '••• ••• '+digits.slice(-4);
  }

  function providerLabel(provider){
    if(provider===LINE_PROVIDER)return 'LINE';
    if(provider==='facebook')return 'Facebook';
    if(provider==='phone')return 'เบอร์โทร';
    if(provider==='email')return 'อีเมล';
    return String(provider||'บัญชี');
  }

  function createButton(text,className,enabled,onClick){
    const b=document.createElement('button');
    b.type='button';
    b.className=className;
    b.textContent=text;
    b.disabled=!enabled;
    b.setAttribute('aria-disabled',enabled?'false':'true');
    if(enabled)b.addEventListener('click',onClick);
    return b;
  }

  function init(client,options={}){
    if(!client?.auth)throw new Error('Supabase Auth client is required');
    const rollout={...DEFAULT_ROLLOUT,...(options.rollout||{})};
    const signedOut=document.getElementById('signedOut');
    if(!signedOut||document.getElementById('multiAuthBox'))return;

    const setMessage=(text,ok=false)=>{
      if(typeof options.setMessage==='function')return options.setMessage(text,ok);
      const msg=document.getElementById('msg');
      if(!msg)return;
      msg.textContent=text;
      msg.className='msg'+(text?(ok?' ok':' err'):'');
    };

    const redirectTo=options.redirectTo||new URL('member.html',location.href).href;
    let pendingPhone='';

    const style=document.createElement('style');
    style.textContent=`
      .multiAuth{margin-bottom:18px}.multiAuthTitle{font-size:14px;font-weight:900;margin:0 0 10px;color:#4c4036}
      .authProvider{width:100%;border:1px solid #dfd4c4;border-radius:16px;padding:14px 15px;margin:8px 0;background:#fff;font-size:16px;font-weight:900;text-align:left}
      .authProvider:disabled{opacity:.58;cursor:not-allowed}.authLine{border-color:#b7e9c1}.authFacebook{border-color:#c9d7f2}.authPhone{border-color:#ead8bd}
      .authProviderMeta{display:block;font-size:12px;font-weight:700;color:#76685d;margin-top:3px}.authDivider{display:flex;align-items:center;gap:10px;color:#8a7a6b;font-size:12px;margin:18px 0}
      .authDivider:before,.authDivider:after{content:'';height:1px;background:#e9dfd2;flex:1}.phoneAuthBox{display:none;border:1px solid #eadfce;border-radius:18px;padding:14px;margin-top:10px;background:#fffaf2}
      .phoneAuthBox.on{display:block}.phoneAuthBox label{margin-top:8px}.phoneActions{display:grid;grid-template-columns:1fr 1fr;gap:8px}.phoneActions button{margin-top:10px}
      .rolloutNote{font-size:12px;line-height:1.5;color:#75685d;background:#f8f5f0;border-radius:12px;padding:10px;margin-top:10px}
      .accountMethods{margin-top:18px;padding-top:18px;border-top:1px solid #eee1cf}.methodChips{display:flex;gap:7px;flex-wrap:wrap;margin-top:8px}.methodChip{font-size:12px;font-weight:850;border:1px solid #dcd1c0;border-radius:999px;padding:7px 10px;background:#fff}
    `;
    document.head.appendChild(style);

    const box=document.createElement('section');
    box.id='multiAuthBox';
    box.className='multiAuth';
    const title=document.createElement('div');
    title.className='multiAuthTitle';
    title.textContent='เลือกวิธีสมัครสมาชิกหรือเข้าสู่ระบบ';
    box.appendChild(title);

    async function oauthLogin(provider,label){
      setMessage('กำลังพาไปยัง '+label+'...',true);
      const {error}=await client.auth.signInWithOAuth({provider,options:{redirectTo}});
      if(error)setMessage('ยังไม่สามารถเข้าสู่ระบบด้วย '+label+' ได้ กรุณาใช้อีเมลก่อนครับ');
    }

    const lineBtn=createButton('LINE  ดำเนินการต่อด้วย LINE','authProvider authLine',rollout.line,()=>oauthLogin(LINE_PROVIDER,'LINE'));
    const lineMeta=document.createElement('span');lineMeta.className='authProviderMeta';lineMeta.textContent=rollout.line?'เข้าสู่ระบบผ่าน LINE':'กำลังเตรียมเปิด — ยังไม่เชื่อม Production';lineBtn.appendChild(lineMeta);
    box.appendChild(lineBtn);

    const phoneBtn=createButton('📱  ดำเนินการต่อด้วยเบอร์โทร','authProvider authPhone',rollout.phone,()=>phoneBox.classList.toggle('on'));
    const phoneMeta=document.createElement('span');phoneMeta.className='authProviderMeta';phoneMeta.textContent=rollout.phone?'รับรหัส OTP ทาง SMS':'กำลังเตรียมเปิด — ต้องตั้งค่า SMS provider ก่อน';phoneBtn.appendChild(phoneMeta);
    box.appendChild(phoneBtn);

    const facebookBtn=createButton('f  ดำเนินการต่อด้วย Facebook','authProvider authFacebook',rollout.facebook,()=>oauthLogin('facebook','Facebook'));
    const facebookMeta=document.createElement('span');facebookMeta.className='authProviderMeta';facebookMeta.textContent=rollout.facebook?'เข้าสู่ระบบผ่าน Facebook':'กำลังเตรียมเปิด — ยังไม่เชื่อม Production';facebookBtn.appendChild(facebookMeta);
    box.appendChild(facebookBtn);

    const phoneBox=document.createElement('div');
    phoneBox.id='phoneAuthBox';phoneBox.className='phoneAuthBox';
    phoneBox.innerHTML='<label for="authPhone">เบอร์โทรศัพท์</label><input id="authPhone" type="tel" inputmode="tel" autocomplete="tel" placeholder="เช่น 0812345678"><div id="phoneOtpStep" style="display:none"><label for="authOtp">รหัส OTP 6 หลัก</label><input id="authOtp" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" placeholder="123456"></div><div class="phoneActions"><button type="button" id="sendPhoneOtp" class="secondary">ส่ง OTP</button><button type="button" id="verifyPhoneOtp" class="primary" style="display:none">ยืนยัน OTP</button></div>';
    box.appendChild(phoneBox);

    const sendPhoneOtp=phoneBox.querySelector('#sendPhoneOtp');
    const verifyPhoneOtp=phoneBox.querySelector('#verifyPhoneOtp');
    const phoneOtpStep=phoneBox.querySelector('#phoneOtpStep');

    sendPhoneOtp.addEventListener('click',async()=>{
      const phone=normalizeThaiPhone(phoneBox.querySelector('#authPhone').value);
      if(!phone)return setMessage('กรุณากรอกเบอร์มือถือไทยให้ถูกต้อง เช่น 0812345678');
      sendPhoneOtp.disabled=true;
      setMessage('กำลังส่ง OTP...',true);
      const {error}=await client.auth.signInWithOtp({phone});
      sendPhoneOtp.disabled=false;
      if(error)return setMessage('ส่ง OTP ไม่สำเร็จ กรุณาลองใหม่ภายหลังหรือใช้อีเมลก่อนครับ');
      pendingPhone=phone;
      phoneOtpStep.style.display='block';
      verifyPhoneOtp.style.display='block';
      setMessage('ส่ง OTP ไปที่ '+maskPhone(phone)+' แล้วครับ',true);
    });

    verifyPhoneOtp.addEventListener('click',async()=>{
      const token=String(phoneBox.querySelector('#authOtp').value||'').trim();
      if(!pendingPhone)return setMessage('กรุณาส่ง OTP ก่อนครับ');
      if(!/^\d{6}$/.test(token))return setMessage('กรุณากรอกรหัส OTP 6 หลัก');
      verifyPhoneOtp.disabled=true;
      setMessage('กำลังยืนยัน OTP...',true);
      const {error}=await client.auth.verifyOtp({phone:pendingPhone,token,type:'sms'});
      verifyPhoneOtp.disabled=false;
      if(error)return setMessage('รหัส OTP ไม่ถูกต้องหรือหมดอายุ กรุณาลองใหม่ครับ');
      pendingPhone='';
      setMessage('เข้าสู่ระบบสำเร็จครับ',true);
    });

    const divider=document.createElement('div');divider.className='authDivider';divider.textContent='หรือใช้อีเมล';box.appendChild(divider);
    const rolloutNote=document.createElement('div');rolloutNote.className='rolloutNote';rolloutNote.textContent='ระยะเตรียมระบบ: LINE / เบอร์โทร / Facebook จะเปิดให้กดได้ทีละช่องทางหลังตั้งค่าผู้ให้บริการและผ่านการทดสอบจริง โดยอีเมลยังเป็นช่องทางหลักที่ใช้งานได้';box.appendChild(rolloutNote);

    signedOut.insertBefore(box,signedOut.firstChild);

    const signedIn=document.getElementById('signedIn');
    if(signedIn){
      const methods=document.createElement('section');
      methods.id='accountMethodsBox';methods.className='accountMethods';
      methods.innerHTML='<b>วิธีเข้าสู่ระบบที่เชื่อมกับบัญชีนี้</b><div id="methodChips" class="methodChips"><span class="methodChip">กำลังตรวจสอบ…</span></div><div class="small" style="margin-top:8px">การเชื่อม/ยกเลิกการเชื่อมบัญชีจะเปิดภายหลังเมื่อ manual identity-linking และ conflict safeguards ผ่านการทดสอบแล้ว</div>';
      signedIn.insertBefore(methods,signedIn.firstChild.nextSibling);
    }

    async function renderMethods(){
      const chips=document.getElementById('methodChips');
      if(!chips)return;
      const {data,error}=await client.auth.getUserIdentities();
      if(error||!data?.identities?.length){chips.innerHTML='<span class="methodChip">ยังไม่พบข้อมูลวิธีเข้าสู่ระบบ</span>';return}
      const providers=[...new Set(data.identities.map(x=>x.provider).filter(Boolean))];
      chips.replaceChildren(...providers.map(p=>{const s=document.createElement('span');s.className='methodChip';s.textContent=providerLabel(p)+' • เชื่อมแล้ว';return s}));
    }

    client.auth.onAuthStateChange((_event,session)=>{if(session)queueMicrotask(renderMethods)});
    client.auth.getSession().then(({data})=>{if(data?.session)renderMethods()});

    return {rollout:{...rollout},renderMethods};
  }

  window.KINARAIDEE_MULTI_AUTH={init,normalizeThaiPhone,DEFAULT_ROLLOUT,LINE_PROVIDER};
})();
