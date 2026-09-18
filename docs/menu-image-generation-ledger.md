# AI menu image generation ledger

This file tracks the image-generation inventory separately from the runtime manifest. A menu is promoted to `ready` in `data/menu-image-manifest.js` only after both production WebP files are committed under `assets/menu-images/` and regression verification passes.

Baseline runtime catalog: **140 menus** (`data/foods-expanded.js`).

## Current inventory

- Exact menu visuals available in the working image set: **42 / 140**
- Of those, original approved reference visuals: **5**
- Additional AI-generated visuals with an exact runtime-menu mapping: **37**
- Production binaries committed to this branch: **0** at this checkpoint (the branch currently contains only `fallback.svg`)
- Runtime manifest rows currently marked `ready`: **5**; these remain provisional until their production binaries are committed
- Unmapped/alternate generated renders are intentionally not counted as ready and are retained for QA/reference only

## Exact mapped visuals

| ID | Menu | Source | Integration state |
|---|---|---|---|
| m001 | กะเพราไก่ไข่ดาว | generated | staged |
| m002 | ข้าวมันไก่ | approved reference | optimize/commit next |
| m003 | ผัดไทย | approved reference | optimize/commit next |
| m004 | ก๋วยเตี๋ยวเรือ | generated | staged |
| m005 | ส้มตำไก่ย่าง | generated | staged |
| m007 | สุกี้น้ำ | generated | staged |
| m008 | หมูกระทะ | generated | staged |
| m009 | ไก่ทอดข้าวเหนียว | generated | staged |
| m010 | โจ๊กหมูใส่ไข่ | generated | staged |
| m012 | ข้าวหมูแดง | generated | staged |
| m013 | ข้าวขาหมู | generated | staged |
| m014 | ราดหน้าหมู | approved reference | optimize/commit next |
| m015 | ผัดซีอิ๊ว | generated | staged |
| m016 | ข้าวไข่เจียวหมูสับ | generated | staged |
| m017 | ต้มยำกุ้ง | approved reference | optimize/commit next |
| m018 | ลาบหมู | generated | staged |
| m025 | กะเพราหมูสับไข่ดาว | approved reference | optimize/commit next |
| m028 | ข้าวหมูกระเทียม | generated | staged |
| m029 | ข้าวไก่กระเทียม | generated | staged |
| m030 | ข้าวผัดหมู | generated | staged |
| m031 | ข้าวผัดกุ้ง | generated | staged |
| m033 | ข้าวคลุกกะปิ | generated | staged |
| m034 | ข้าวหน้าเป็ด | generated | staged |
| m073 | ก๋วยเตี๋ยวต้มยำ | generated | staged |
| m075 | ก๋วยเตี๋ยวเย็นตาโฟ | generated | staged |
| m079 | ขนมจีนน้ำยา | generated | staged |
| m080 | ขนมจีนน้ำเงี้ยว | generated | staged |
| m081 | ข้าวซอยไก่ | generated | staged |
| m088 | คอหมูย่าง | generated | staged |
| m093 | แกงเขียวหวานไก่ | generated | staged |
| m094 | พะแนงหมู | generated | staged |
| m095 | แกงมัสมั่นไก่ | generated | staged |
| m096 | แกงส้มชะอมกุ้ง | generated | staged |
| m097 | ต้มข่าไก่ | generated | staged |
| m100 | ผัดคะน้าหมูกรอบ | generated | staged |
| m101 | ผัดพริกแกงหมู | generated | staged |
| m102 | ผัดฉ่าทะเล | generated | staged |
| m136 | มาม่าผัดขี้เมา | generated | staged |
| m137 | ข้าวไข่ข้นไส้กรอก | generated | staged |
| m138 | ข้าวไก่ทอดซอสเผ็ด | generated | staged |
| m139 | เฟรนช์โทสต์ | generated | staged |
| m140 | ไข่คนขนมปัง | generated | staged |

## Generated alternates not promoted

The working set also contains alternate or non-exact renders such as สุกี้แห้งทะเล, ผัดวุ้นเส้นกุ้ง, ผัดคั่วไก่, กุ้งอบวุ้นเส้น, โจ๊กปลา, and an alternate ผัดซีอิ๊วไก่. They are not mapped to a different runtime menu merely to increase the ready count.

## Promotion rule

For each mapped menu:

1. Keep the stable runtime ID (`mNNN`).
2. Export responsive WebP assets using the widths defined in the runtime manifest.
3. Commit the binaries under `assets/menu-images/`.
4. Change only that menu's manifest status from `pending` to `ready`.
5. Run `node tools/verify-menu-images.mjs` and require CI to pass before merge/deploy.
6. Keep the UI disclosure: `ภาพประกอบเมนู ไม่ใช่ภาพจริงจากร้านอาหาร`.
