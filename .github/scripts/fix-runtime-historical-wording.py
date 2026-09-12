from pathlib import Path

path = Path('CURRENT-RUNTIME.md')
text = path.read_text()
old = '- The previous verified Issue #585 core toast runtime candidate `f9b5f137375e9d30d1053d9cad814d636cb88821` was merged/deployed through PR #623 as `11c27167965c63ba60218d6ec216e503b334b4ca`; GitHub Pages run `34571331729`, Kinaraidee Live Smoke run `34571373301`, Auth Password Security Live Smoke run `34571373282`, Campaign 3000 Premium Live Smoke run `34571373303`, and Premium Research Preview Live Smoke run `34571373350` completed successfully on that exact deployed SHA. The cache generation remained `kinaraidee-beta-v16`. That trace is the last verified browser/PWA deployment until the current offline-shell follow-up candidate is merged and independently deployed/verified.'
new = '- The previous verified Issue #585 core toast runtime candidate `f9b5f137375e9d30d1053d9cad814d636cb88821` was merged/deployed through PR #623 as `11c27167965c63ba60218d6ec216e503b334b4ca`; GitHub Pages run `34571331729`, Kinaraidee Live Smoke run `34571373301`, Auth Password Security Live Smoke run `34571373282`, Campaign 3000 Premium Live Smoke run `34571373303`, and Premium Research Preview Live Smoke run `34571373350` completed successfully on that exact deployed SHA. The cache generation remained `kinaraidee-beta-v16`. That trace remains historical verified deployment evidence superseded by the current Issue #585 offline-shell deployment trace.'
if text.count(old) != 1:
    raise SystemExit(f'expected exactly one stale sentence, got {text.count(old)}')
text = text.replace(old, new, 1)
if text.count(new) != 1:
    raise SystemExit('replacement verification failed')
path.write_text(text)
