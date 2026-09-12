from pathlib import Path

path = Path('CURRENT-RUNTIME.md')
text = path.read_text()
required = '- Current deployment PASS is scoped to the browser/PWA static deployment trace and live source markers only.'
anchor = '- Current runtime deployment evidence: Issue #585 offline-shell source candidate `0b6352af081f51ad9df2343022d0683b109d93a4` merged through PR #627 as `af329c471c0335fd6e0812a8d5f75066ffb335cd`; GitHub Pages run `34676035335`, Toast Accessibility Live Smoke run `34676056553`, Kinaraidee Live Smoke run `34676056521`, Auth Password Security Live Smoke run `34676056466`, Campaign 3000 Premium Live Smoke run `34676056536`, and Premium Research Preview Live Smoke run `34676056518` completed successfully on the exact merged/deployed SHA. The Service Worker shell includes `data/toast-accessibility.js` and the cache generation remains `kinaraidee-beta-v16`. This deployment trace does not establish screen-reader Physical PASS.'

if required in text:
    if text.count(required) != 1:
        raise SystemExit(f'expected exactly one existing scope boundary, got {text.count(required)}')
else:
    if text.count(anchor) != 1:
        raise SystemExit(f'expected exactly one deployment-evidence anchor, got {text.count(anchor)}')
    text = text.replace(anchor, anchor + '\n' + required, 1)

if text.count(required) != 1:
    raise SystemExit(f'expected exactly one scope boundary after patch, got {text.count(required)}')
path.write_text(text)
