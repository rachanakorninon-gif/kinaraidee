from pathlib import Path


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'{label}: expected exactly one target, got {count}')
    return text.replace(old, new, 1)

p = Path('prototype/auth-multi-provider/member-auth-multi-provider.js')
text = p.read_text()
text = replace_once(text, """  function providerLabel(provider){
    if(provider===LINE_PROVIDER)return 'LINE';
    if(provider==='facebook')return 'Facebook';
    if(provider==='phone')return 'เบอร์โทร';
    if(provider==='email')return 'อีเมล';
    return String(provider||'บัญชี');
  }

  function createButton(text,className,enabled,onClick){""", """  function providerLabel(provider){
    if(provider===LINE_PROVIDER)return 'LINE';
    if(provider==='facebook')return 'Facebook';
    if(provider==='phone')return 'เบอร์โทร';
    if(provider==='email')return 'อีเมล';
    return String(provider||'บัญชี');
  }

  function safeMemberRedirect(raw){
    const expected=new URL('member.html',location.href);
    try{
      const target=new URL(raw||expected.href,location.href);
      if(target.origin!==expected.origin||target.pathname!==expected.pathname)return expected.href;
      target.hash='';
      return target.href;
    }catch(_error){
      return expected.href;
    }
  }

  function createButton(text,className,enabled,onClick){""", 'insert safe redirect')
text = replace_once(text, """    const setMessage=(text,ok=false)=>{
      if(typeof options.setMessage==='function')return options.setMessage(text,ok);
      const msg=document.getElementById('msg');
      if(!msg)return;
      msg.textContent=text;
      msg.className='msg'+(text?(ok?' ok':' err'):'');
    };

    const redirectTo=options.redirectTo||new URL('member.html',location.href).href;
    let pendingPhone='';""", """    const messageRegion=document.getElementById('msg');
    if(messageRegion){
      messageRegion.setAttribute('role','status');
      messageRegion.setAttribute('aria-live','polite');
      messageRegion.setAttribute('aria-atomic','true');
    }
    const setMessage=(text,ok=false)=>{
      if(typeof options.setMessage==='function')return options.setMessage(text,ok);
      if(!messageRegion)return;
      messageRegion.textContent=text;
      messageRegion.className='msg'+(text?(ok?' ok':' err'):'');
    };

    const redirectTo=safeMemberRedirect(options.redirectTo);
    let pendingPhone='';""", 'message live region and redirect')
text = replace_once(text, """    async function oauthLogin(provider,label){
      setMessage('กำลังพาไปยัง '+label+'...',true);
      const {error}=await client.auth.signInWithOAuth({provider,options:{redirectTo}});
      if(error)setMessage('ยังไม่สามารถเข้าสู่ระบบด้วย '+label+' ได้ กรุณาใช้อีเมลก่อนครับ');
    }

    const lineBtn=createButton('LINE  ดำเนินการต่อด้วย LINE','authProvider authLine',rollout.line,()=>oauthLogin(LINE_PROVIDER,'LINE'));""", """    function setProviderBusy(button,busy){
      if(!button)return;
      button.disabled=busy;
      button.setAttribute('aria-disabled',busy?'true':'false');
      button.setAttribute('aria-busy',busy?'true':'false');
      if(busy)button.dataset.busy='true';
      else delete button.dataset.busy;
    }

    async function oauthLogin(provider,label,button){
      if(button?.dataset.busy==='true')return;
      setProviderBusy(button,true);
      setMessage('กำลังพาไปยัง '+label+'...',true);
      try{
        const {error}=await client.auth.signInWithOAuth({provider,options:{redirectTo}});
        if(error){
          setProviderBusy(button,false);
          return setMessage('ยังไม่สามารถเข้าสู่ระบบด้วย '+label+' ได้ กรุณาลองใหม่หรือใช้อีเมลก่อนครับ');
        }
      }catch(_error){
        setProviderBusy(button,false);
        return setMessage('เชื่อมต่อ '+label+' ไม่สำเร็จ กรุณาตรวจอินเทอร์เน็ตแล้วลองใหม่ หรือใช้อีเมลก่อนครับ');
      }
    }

    const lineBtn=createButton('LINE  ดำเนินการต่อด้วย LINE','authProvider authLine',rollout.line,()=>oauthLogin(LINE_PROVIDER,'LINE',lineBtn));""", 'oauth failure retry source')
text = replace_once(text, "const facebookBtn=createButton('f  ดำเนินการต่อด้วย Facebook','authProvider authFacebook',rollout.facebook,()=>oauthLogin('facebook','Facebook'));", "const facebookBtn=createButton('f  ดำเนินการต่อด้วย Facebook','authProvider authFacebook',rollout.facebook,()=>oauthLogin('facebook','Facebook',facebookBtn));", 'facebook busy binding')
text = replace_once(text, """    sendPhoneOtp.addEventListener('click',async()=>{
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
      if(!/^\\d{6}$/.test(token))return setMessage('กรุณากรอกรหัส OTP 6 หลัก');
      verifyPhoneOtp.disabled=true;
      setMessage('กำลังยืนยัน OTP...',true);
      const {error}=await client.auth.verifyOtp({phone:pendingPhone,token,type:'sms'});
      verifyPhoneOtp.disabled=false;
      if(error)return setMessage('รหัส OTP ไม่ถูกต้องหรือหมดอายุ กรุณาลองใหม่ครับ');
      pendingPhone='';
      setMessage('เข้าสู่ระบบสำเร็จครับ',true);
    });""", """    sendPhoneOtp.addEventListener('click',async()=>{
      const phone=normalizeThaiPhone(phoneBox.querySelector('#authPhone').value);
      if(!phone)return setMessage('กรุณากรอกเบอร์มือถือไทยให้ถูกต้อง เช่น 0812345678');
      sendPhoneOtp.disabled=true;
      sendPhoneOtp.setAttribute('aria-busy','true');
      setMessage('กำลังส่ง OTP...',true);
      try{
        const {error}=await client.auth.signInWithOtp({phone});
        if(error)return setMessage('ส่ง OTP ไม่สำเร็จ กรุณาลองใหม่ภายหลังหรือใช้อีเมลก่อนครับ');
        pendingPhone=phone;
        phoneOtpStep.style.display='block';
        verifyPhoneOtp.style.display='block';
        setMessage('ส่ง OTP ไปที่ '+maskPhone(phone)+' แล้วครับ',true);
      }catch(_error){
        setMessage('เชื่อมต่อบริการ OTP ไม่สำเร็จ กรุณาตรวจอินเทอร์เน็ตแล้วลองใหม่ หรือใช้อีเมลก่อนครับ');
      }finally{
        sendPhoneOtp.disabled=false;
        sendPhoneOtp.setAttribute('aria-busy','false');
      }
    });

    verifyPhoneOtp.addEventListener('click',async()=>{
      const token=String(phoneBox.querySelector('#authOtp').value||'').trim();
      if(!pendingPhone)return setMessage('กรุณาส่ง OTP ก่อนครับ');
      if(!/^\\d{6}$/.test(token))return setMessage('กรุณากรอกรหัส OTP 6 หลัก');
      verifyPhoneOtp.disabled=true;
      verifyPhoneOtp.setAttribute('aria-busy','true');
      setMessage('กำลังยืนยัน OTP...',true);
      try{
        const {error}=await client.auth.verifyOtp({phone:pendingPhone,token,type:'sms'});
        if(error)return setMessage('รหัส OTP ไม่ถูกต้องหรือหมดอายุ กรุณาลองใหม่ครับ');
        pendingPhone='';
        setMessage('เข้าสู่ระบบสำเร็จครับ',true);
      }catch(_error){
        setMessage('เชื่อมต่อเพื่อยืนยัน OTP ไม่สำเร็จ กรุณาตรวจอินเทอร์เน็ตแล้วลองใหม่ครับ');
      }finally{
        verifyPhoneOtp.disabled=false;
        verifyPhoneOtp.setAttribute('aria-busy','false');
      }
    });""", 'phone network recovery')
text = replace_once(text, "window.KINARAIDEE_MULTI_AUTH={init,normalizeThaiPhone,DEFAULT_ROLLOUT,LINE_PROVIDER};", "window.KINARAIDEE_MULTI_AUTH={init,normalizeThaiPhone,safeMemberRedirect,DEFAULT_ROLLOUT,LINE_PROVIDER};", 'export redirect guard')
p.write_text(text)

p = Path('AUTH-MULTI-PROVIDER-ROLLOUT.md')
text = p.read_text()
anchor = "- The deployed member UI remains email/password only. The client prototype under `prototype/auth-multi-provider/` remains intentionally **not** wired into `member.html`, `data/`, the Service Worker cache or the deployed Pages runtime."
addition = anchor + "\n- The non-deployed prototype now includes source-level same-origin `member.html` redirect validation, polite/atomic status feedback, programmatic OAuth/OTP busy states, caught network/provider exceptions and retry-control recovery. This is **source preparation only**; it does not satisfy the physical network/provider failure-retry or accessibility gates for an actually integrated LINE button."
text = replace_once(text, anchor, addition, 'rollout source-prep note')
p.write_text(text)

js = Path('prototype/auth-multi-provider/member-auth-multi-provider.js').read_text()
member = Path('member.html').read_text()
sw = Path('sw.js').read_text()
if "Object.freeze({line:false,phone:false,facebook:false})" not in js:
    raise SystemExit('provider rollout defaults changed unexpectedly')
if 'member-auth-multi-provider.js' in member or 'custom:line' in member:
    raise SystemExit('Production member page was unexpectedly wired')
if 'member-auth-multi-provider.js' in sw:
    raise SystemExit('Prototype was unexpectedly added to Service Worker')
