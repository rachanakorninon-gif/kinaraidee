# AI Menu Images

## Source of truth

The runtime catalog is `data/foods-expanded.js`. At this rollout baseline it contains **140 unique menus**.
`data/foods-budget-boost.js` contains 16 additional candidates but is not loaded by `index.html` or the current
Service Worker shell, so those entries are not runtime menus and are intentionally excluded from this manifest.

## Visual standard

All generated menu artwork must be photorealistic and faithful to the real dish: roughly a 45-degree camera angle,
warm natural light, clean/simple table setting, no people, no text, and no logos. The UI identifies every visual as
**“ภาพประกอบเมนู ไม่ใช่ภาพจริงจากร้านอาหาร”**.

Source renders should be square and large enough for downscaling. Production assets use stable ASCII IDs and are
optimized to WebP at 640×640 and 1120×1120. Do not change an existing ID when the catalog order changes.

## Rollout workflow

1. Generate/approve a menu image using the shared visual standard.
2. Export `assets/menu-images/<id>-640.webp` and `<id>-1120.webp`.
3. Change only that manifest row from `pending` to `ready`.
4. Run `node tools/verify-menu-images.mjs`.
5. Open/merge through the normal PR + CI workflow.

Pending menus render the lightweight local fallback. Real menu photos are intentionally not pre-cached by the Service
Worker; only the manifest, renderer, and fallback are in the app shell. This keeps install/update weight bounded while
lazy loading images on demand.
