import fs from 'node:fs';
import vm from 'node:vm';

const fail=(message)=>{throw new Error(message)};
const assert=(condition,message)=>{if(!condition)fail(message)};

const foodContext={window:{}};
vm.runInNewContext(fs.readFileSync('data/foods-expanded.js','utf8'),foodContext,{filename:'data/foods-expanded.js'});
const rows=foodContext.window.EXPANDED_FOODS;
assert(Array.isArray(rows)&&rows.length>0,'EXPANDED_FOODS must be available');
const sourceNames=rows.map(row=>row[0]);
assert(new Set(sourceNames).size===sourceNames.length,'food source contains duplicate names');

const imageContext={window:{}};
vm.runInNewContext(fs.readFileSync('data/menu-image-manifest.js','utf8'),imageContext,{filename:'data/menu-image-manifest.js'});
const manifest=imageContext.window.KINARAIDEE_MENU_IMAGE_MANIFEST;
assert(manifest&&Array.isArray(manifest.menus),'menu image manifest must expose menus');
assert(manifest.source==='data/foods-expanded.js','manifest source must remain data/foods-expanded.js');
assert(Array.isArray(manifest.widths)&&manifest.widths.length>=2,'manifest needs responsive image widths');
assert(manifest.format==='webp','menu images currently use WebP');
assert(manifest.disclaimer.includes('ไม่ใช่ภาพจริงจากร้านอาหาร'),'manifest must retain the illustration disclaimer');

const mappedNames=manifest.menus.map(item=>item.name);
assert(manifest.menus.length===sourceNames.length,`manifest/source count mismatch: ${manifest.menus.length}/${sourceNames.length}`);
for(const name of sourceNames)assert(mappedNames.includes(name),`missing menu image mapping: ${name}`);
for(const name of mappedNames)assert(sourceNames.includes(name),`manifest contains non-runtime menu: ${name}`);

const ids=new Set();
const filenames=new Set();
let ready=0;
for(const item of manifest.menus){
  assert(/^m\d{3,}$/.test(item.id),`unsafe/invalid menu id: ${item.id}`);
  assert(item.filename===item.id,`filename stem must equal stable id: ${item.id}`);
  assert(!ids.has(item.id),`duplicate menu id: ${item.id}`);
  assert(!filenames.has(item.filename),`duplicate filename stem: ${item.filename}`);
  ids.add(item.id); filenames.add(item.filename);
  assert(item.status==='ready'||item.status==='pending',`invalid status for ${item.name}`);
  if(item.status==='ready'){
    ready++;
    for(const width of manifest.widths){
      const path=`assets/menu-images/${item.filename}-${width}.webp`;
      assert(fs.existsSync(path)&&fs.statSync(path).isFile(),`ready image missing: ${path}`);
      assert(fs.statSync(path).size<=220*1024,`image too large (>220 KiB): ${path}`);
    }
  }
}
assert(ready>=5,`expected at least the five approved reference images to be ready; got ${ready}`);
assert(fs.existsSync('assets/menu-images/fallback.svg'),'fallback image is missing');

const index=fs.readFileSync('index.html','utf8');
assert(index.includes('data/menu-image-manifest.js'),'index must load menu image manifest');
assert(index.includes('data/menu-images.js'),'index must load menu image renderer');
assert(index.indexOf('data/menu-image-manifest.js')<index.indexOf('data/menu-images.js'),'manifest must load before renderer');

const sw=fs.readFileSync('sw.js','utf8');
assert(sw.includes("'./data/menu-image-manifest.js'"),'PWA shell must cache menu image manifest');
assert(sw.includes("'./data/menu-images.js'"),'PWA shell must cache menu image renderer');
assert(sw.includes("'./assets/menu-images/fallback.svg'"),'PWA shell must cache only the tiny fallback image');
assert(!/['"]\.\/assets\/menu-images\/m\d{3,}-\d+\.webp['"]/.test(sw),'menu photos must not be pre-cached in SHELL');
assert(sw.includes("url.pathname.includes('/assets/menu-images/')"),'Service Worker must special-case menu images');
assert(sw.includes('return fetch(event.request);'),'menu photos must stay network-only to avoid unbounded PWA cache growth');

console.log(`Menu image regression PASS: ${sourceNames.length} mapped, ${ready} ready, ${sourceNames.length-ready} pending`);
