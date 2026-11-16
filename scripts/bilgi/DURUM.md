# Bilgi Bankası üretim durumu

Hedef (Aydın Bey, 16.11.2026): 40'ar makalelik **50 parti** (toplam 2.000 makale), durmadan, kullanıcıya iş bırakmadan.
Aynı anda en fazla 3 ajan (kullanım limiti). Her parti: konu dosyası → 2 yazar ajan (20+20) → doğrula → derle → test → push.

| Parti | Konu dosyası | Durum |
|---|---|---|
| 1 | `konular.json` | Yayında (e53255c) |
| 2 | `konular-2.json` | Yayında (cddb8cf) |
| 3 | `konular-3.json` | Yayında |
| 4 | `konular-4.json` | Yayında |
| 5 | `konular-5.json` | Yayında |
| 6 | `konular-6.json` | Yayında |
| 7 | `konular-7.json` | Yayında |
| 8 | `konular-8.json` | Yayında |
| 9 | `konular-9.json` | Yayında |
| 10 | `konular-10.json` | Yayında |
| 11 | `konular-11.json` | Yayında |
| 12 | `konular-12.json` | Yazılıyor |
| 13 | `konular-13.json` | Konular hazır |
| 14+ | — | Araştırılacak (her seferinde 120 konu, mevcut tüm `konular*.json` + `rehberler.tsv` ile çakışmasız) |

## Bir partiyi yayına almak

```
git pull --ff-only origin main            # diğer oturumun araç paketleri ezilmesin
node scripts/bilgi/dogrula.mjs            # hepsi ✓ olmalı
node scripts/bilgi/derle.mjs
node scripts/check-tokens.mjs
PW_PORT=3230 npx playwright test tests/bilgi-bankasi.spec.ts tests/hub.spec.ts --project=chromium
git add -A scripts/bilgi web tests && git commit -m "Bilgi Bankası'na N. partiyi ekle: 40 makale" && git push origin main
```
`main`'e push, `Deploy (GitHub Pages)` iş akışını tetikler; canlı kontrol: `/bilgi-bankasi/` kart sayısı.

## Yazar ajan görevi (kalıp)
"scripts/bilgi/YAZAR.md'yi ve örnek makaleyi oku; konular-N.json'daki şu 20 slug'ı yaz; her birinden sonra dogrula.mjs;
yalnızca scripts/bilgi/makaleler/ altına yaz; güncel tutarları resmî kaynaktan doğrula, doğrulayamadığını 'örnek tutar' yaz."
