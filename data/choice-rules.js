// Choice/tag expansion rules for กินอะไรดี
// Central tag derivation used by single and group recommendation QA.
const KINARAIDEE_CHOICE_RULES={
  choices:[
    {key:'โปรตีน',label:'🍗 เนื้อสัตว์/โปรตีน'},
    {key:'เบา',label:'🥬 เบา ๆ'},
    {key:'ซุป',label:'🍲 ซุป/ต้ม'},
    {key:'ต่างชาติ',label:'🌏 อาหารต่างชาติ'}
  ],
  foreignCategories:['ญี่ปุ่น','เกาหลี','ตะวันตก','ฟิวชัน','ฟาสต์ฟู้ด'],
  soupKeywords:['ต้ม','แกง','ซุป','สุกี้','แจ่วฮ้อน','โจ๊ก','ข้าวต้ม','เกาเหลา','ก๋วยเตี๋ยวน้ำ','ราเมน','รามยอน','จีแก'],
  proteinKeywords:['หมู','ไก่','ปลา','กุ้ง','ทะเล','เนื้อ','เป็ด','ปู','แซลมอน','ทูน่า','ไข่','หอย','เต้าหู้','ไส้กรอก'],
  lightKeywords:['สลัด','ผัก','น้ำพริก','ตำ','ลาบ','ยำ','โจ๊ก','ข้าวต้ม','เกาเหลา','ซุป','มิโสะ'],
  heavyKeywords:['หมูกระทะ','ชาบู','ปิ้งย่าง','บุฟเฟต์','พิซซ่า','เบอร์เกอร์','สเต๊ก','คาโบนารา'],
  friedKeywords:['ทอด','เฟรนช์ฟราย','คาราอาเกะ','ทงคัตสึ','เทมปุระ','ไข่เจียว'],
  derive(row){
    const name=row[0]||'',category=row[6]||'';
    const tags=new Set((row[5]||'').split(',').filter(Boolean));
    if(this.foreignCategories.includes(category))tags.add('ต่างชาติ');
    if(this.soupKeywords.some(k=>name.includes(k)))tags.add('ซุป');
    if(this.proteinKeywords.some(k=>name.includes(k)))tags.add('โปรตีน');
    if(this.heavyKeywords.some(k=>name.includes(k)))tags.add('หนัก');
    if(this.friedKeywords.some(k=>name.includes(k)))tags.add('ของทอด');
    if(tags.has('หนัก')||tags.has('ของทอด'))tags.delete('เบา');
    else if(this.lightKeywords.some(k=>name.includes(k)))tags.add('เบา');
    return [...tags];
  }
};

if(typeof EXPANDED_FOODS!=='undefined'){
  const extra=[
    ['ไข่ลวกขนมปัง','🥚',45,'ไม่เผ็ด','เช้า','โปรตีน,เบา','อาหารเช้า'],
    ['ไข่ต้มข้าวสวย','🥚',45,'ไม่เผ็ด','เช้า,กลางวัน','ข้าว,โปรตีน,เบา','อาหารจานเดียว'],
    ['โจ๊กไข่ลวก','🥣',45,'ไม่เผ็ด','เช้า,ดึก','ซุป,โปรตีน,เบา','อาหารเช้า'],
    ['ข้าวต้มไข่','🥣',45,'ไม่เผ็ด','เช้า,ดึก','ข้าว,ซุป,โปรตีน,เบา','อาหารเช้า'],
    ['ซุปไก่ใส','🍲',50,'ไม่เผ็ด','เช้า,กลางวัน,เย็น,ดึก','ซุป,โปรตีน,เบา','ซุป/ต้ม'],
    ['ต้มจืดเต้าหู้หมูสับ','🍲',50,'ไม่เผ็ด','กลางวัน,เย็น,ดึก','ซุป,โปรตีน,เบา','กับข้าว'],
    ['ยำไข่ต้ม','🥚',50,'เผ็ดน้อย','กลางวัน,เย็น,ดึก','เผ็ด,โปรตีน,เบา','ยำ'],
    ['สลัดไข่ต้ม','🥗',50,'ไม่เผ็ด','เช้า,กลางวัน,เย็น','โปรตีน,เบา','สลัด'],
    ['สลัดทูน่าไซซ์เล็ก','🥗',50,'ไม่เผ็ด','กลางวัน,เย็น','โปรตีน,เบา','สลัด'],
    ['มิโสะซุป','🍲',50,'ไม่เผ็ด','เช้า,กลางวัน,เย็น','ซุป,เบา,ต่างชาติ','ญี่ปุ่น'],
    ['ออนเซ็นทามาโกะ','🥚',50,'ไม่เผ็ด','เช้า,กลางวัน,เย็น','โปรตีน,เบา,ต่างชาติ','ญี่ปุ่น'],
    ['คิมบับคำเล็ก','🍙',50,'ไม่เผ็ด','เช้า,กลางวัน,ดึก','ข้าว,ต่างชาติ','เกาหลี'],
    ['ซุปสาหร่ายเกาหลี','🍲',50,'ไม่เผ็ด','เช้า,กลางวัน,เย็น,ดึก','ซุป,เบา,ต่างชาติ','เกาหลี'],
    ['แซนด์วิชไข่','🥪',50,'ไม่เผ็ด','เช้า,กลางวัน,ดึก','โปรตีน,ต่างชาติ','ตะวันตก'],
    ['ขนมปังไข่ดาว','🍳',50,'ไม่เผ็ด','เช้า,ดึก','ของทอด,โปรตีน,ต่างชาติ','ตะวันตก'],
    ['ซุปข้าวโพดถ้วยเล็ก','🌽',50,'ไม่เผ็ด','เช้า,กลางวัน,เย็น,ดึก','ซุป,เบา,ต่างชาติ','ตะวันตก'],
    ['วุ้นเส้นน้ำไข่','🍜',50,'ไม่เผ็ด','เช้า,ดึก','เส้น,ซุป,โปรตีน,เบา','เส้น'],
    ['ยำวุ้นเส้นไข่ต้ม','🥗',50,'เผ็ดน้อย','ดึก','เส้น,เผ็ด,โปรตีน,เบา','ยำ'],
    ['ข้าวไข่เจียวจานเล็ก','🍳',50,'ไม่เผ็ด','เช้า,ดึก','ข้าว,ของทอด,โปรตีน,หนัก','อาหารจานเดียว'],
    ['ข้าวไข่เจียวพริกสด','🍳',50,'เผ็ดน้อย','เช้า,ดึก','ข้าว,เผ็ด,ของทอด,โปรตีน,หนัก','อาหารจานเดียว'],
    ['นักเก็ตไก่ไซซ์เล็ก','🍗',50,'ไม่เผ็ด','ดึก','ของทอด,โปรตีน,ต่างชาติ','ฟาสต์ฟู้ด'],
    ['มาม่าผัดไข่จานเล็ก','🍜',50,'ไม่เผ็ด','ดึก','เส้น,โปรตีน,หนัก','อาหารตามสั่ง'],
    ['ข้าวไข่ดาวไส้กรอก','🍳',50,'ไม่เผ็ด','กลางวัน,เย็น','ข้าว,ของทอด,โปรตีน,หนัก','อาหารจานเดียว'],
    ['ข้าวไข่ข้นจานเล็ก','🍳',50,'ไม่เผ็ด','กลางวัน,เย็น','ข้าว,โปรตีน,หนัก','อาหารจานเดียว'],
    ['ยำมาม่าไข่ต้มจานเล็ก','🥗',50,'เผ็ดน้อย','กลางวัน,เย็น','เส้น,เผ็ด,โปรตีน','ยำ'],
    ['ตำแตงไข่ต้ม','🥗',50,'เผ็ด','กลางวัน,เย็น','เผ็ด,โปรตีน,เบา','อีสาน'],
    ['ขนมปังปิ้งนม','🍞',45,'ไม่เผ็ด','เช้า,ดึก','ของหวาน','ของหวาน'],
    ['กล้วยปิ้งราดนม','🍌',50,'ไม่เผ็ด','เช้า,ดึก','ของหวาน','ของหวาน'],
    ['แฮชบราวน์ไข่ดาว','🍳',50,'ไม่เผ็ด','เช้า','ของทอด,โปรตีน,หนัก,ต่างชาติ','ตะวันตก'],
    ['แซนด์วิชไส้กรอกไข่','🥪',50,'ไม่เผ็ด','เช้า,ดึก','โปรตีน,หนัก,ต่างชาติ','ตะวันตก'],
    ['ซุปไข่สาหร่าย','🍲',50,'ไม่เผ็ด','ดึก','ซุป,โปรตีน,เบา,ต่างชาติ','เกาหลี'],
    ['ราเมนไข่ถ้วยเล็ก','🍜',50,'ไม่เผ็ด','ดึก','เส้น,ซุป,โปรตีน,ต่างชาติ','ญี่ปุ่น']
  ];
  const existing=new Set(EXPANDED_FOODS.map(x=>String(x?.[0]||'').trim()));
  extra.forEach(x=>{if(!existing.has(x[0])){EXPANDED_FOODS.push(x);existing.add(x[0])}});

  const validMeals=new Set(['เช้า','กลางวัน','เย็น','ดึก']);
  const seen=new Set();
  const clean=[];
  const report={input:EXPANDED_FOODS.length,duplicates:0,invalid:0,output:0,coverage:{},sparse:[]};
  EXPANDED_FOODS.forEach(row=>{
    if(!Array.isArray(row)||row.length<7){report.invalid++;return}
    const name=String(row[0]||'').trim();
    const price=Number(row[2]);
    const meals=String(row[4]||'').split(',').map(x=>x.trim()).filter(Boolean);
    if(!name||!Number.isFinite(price)||price<=0||!meals.length||meals.some(m=>!validMeals.has(m))){report.invalid++;return}
    const key=name.toLocaleLowerCase('th-TH');
    if(seen.has(key)){report.duplicates++;return}
    seen.add(key);
    row[0]=name;row[2]=Math.round(price);row[4]=[...new Set(meals)].join(',');
    row[5]=[...new Set(String(row[5]||'').split(',').map(x=>x.trim()).filter(Boolean))].join(',');
    clean.push(row);
  });
  EXPANDED_FOODS.splice(0,EXPANDED_FOODS.length,...clean);
  report.output=clean.length;

  const qaMeals=['เช้า','กลางวัน','เย็น','ดึก'];
  const qaBudgets=[100,150,200,999];
  const qaTags=['ข้าว','เส้น','เผ็ด','ของทอด','ของหวาน','หนัก','โปรตีน','เบา','ซุป','ต่างชาติ'];
  qaMeals.forEach(meal=>{
    report.coverage[meal]={};
    qaBudgets.forEach(budget=>{
      const bKey=String(budget);
      report.coverage[meal][bKey]={};
      qaTags.forEach(tag=>{
        const count=clean.filter(row=>Number(row[2])<=budget&&String(row[4]).split(',').includes(meal)&&KINARAIDEE_CHOICE_RULES.derive(row).includes(tag)).length;
        report.coverage[meal][bKey][tag]=count;
        if(count<2)report.sparse.push({meal,budget,tag,count});
      });
    });
  });
  if(typeof window!=='undefined')window.KINARAIDEE_CATALOG_QA=report;
}

if(typeof window!=='undefined'){
  window.KINARAIDEE_CHOICE_RULES=KINARAIDEE_CHOICE_RULES;
  // เอางบ 50 บาทออกจากหน้าเลือกงบ แต่เก็บเมนูราคาต่ำไว้เป็นผลลัพธ์ได้ตามปกติ
  document.querySelector('#budgetChips .budget[data-v="50"]')?.remove();
  if(!document.querySelector('script[src$="data/group-mode.js"]')){
    const g=document.createElement('script');g.src='data/group-mode.js';g.dataset.kinaraideeGroup='1';document.head.appendChild(g);
  }
  if(!document.querySelector('script[src$="data/group-remote.js"]')){
    const r=document.createElement('script');r.src='data/group-remote.js';r.dataset.kinaraideeRemote='1';document.head.appendChild(r);
  }
  if(!document.querySelector('script[src$="data/group-sync.js"]')){
    const s=document.createElement('script');s.src='data/group-sync.js';s.dataset.kinaraideeSync='1';document.head.appendChild(s);
  }
}
