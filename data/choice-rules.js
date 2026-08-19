// Choice/tag expansion rules for กินอะไรดี
// Prepared separately so we can QA the food catalog before exposing new UI choices.
const KINARAIDEE_CHOICE_RULES={
  choices:[
    {key:'โปรตีน',label:'🍗 เนื้อสัตว์/โปรตีน'},
    {key:'เบา',label:'🥬 เบา ๆ'},
    {key:'ซุป',label:'🍲 ซุป/ต้ม'},
    {key:'ต่างชาติ',label:'🌏 อาหารต่างชาติ'}
  ],
  foreignCategories:['ญี่ปุ่น','เกาหลี','ตะวันตก','ฟิวชัน','ฟาสต์ฟู้ด'],
  soupKeywords:['ต้ม','แกง','ซุป','สุกี้','แจ่วฮ้อน','โจ๊ก','ข้าวต้ม','เกาเหลา','ก๋วยเตี๋ยวน้ำ','ราเมน','รามยอน'],
  proteinKeywords:['หมู','ไก่','ปลา','กุ้ง','ทะเล','เนื้อ','เป็ด','ปู','แซลมอน','ทูน่า','ไข่','หอย'],
  lightKeywords:['สลัด','ผัก','น้ำพริก','ตำ','ลาบ','ยำ','โจ๊ก','ข้าวต้ม','เกาเหลา','ซุป'],
  derive(row){
    const name=row[0]||'',category=row[6]||'';
    const tags=new Set((row[5]||'').split(',').filter(Boolean));
    if(this.foreignCategories.includes(category))tags.add('ต่างชาติ');
    if(this.soupKeywords.some(k=>name.includes(k)))tags.add('ซุป');
    if(this.proteinKeywords.some(k=>name.includes(k)))tags.add('โปรตีน');
    if(this.lightKeywords.some(k=>name.includes(k))&&!tags.has('หนัก')&&!tags.has('ของทอด'))tags.add('เบา');
    return [...tags];
  }
};
if(typeof window!=='undefined')window.KINARAIDEE_CHOICE_RULES=KINARAIDEE_CHOICE_RULES;
