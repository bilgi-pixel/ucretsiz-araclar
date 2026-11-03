# Bilişim Ajansı Ücretsiz Araçlar

bilisimajans.com'un "Ücretsiz Programlar" menüsü altında sunulan araçlar. İki katman, tek kod:

1. **Online araçlar** (`web/`): tarayıcıda çalışır, **dosya hiçbir zaman sunucuya gitmez**
   (tamamı istemci tarafı JS). Statik site; GitHub Pages → `araclar.bilisimajans.com`.
2. **Masaüstü uygulamalar** (`desktop/`, Faz 2): aynı `web/` kodunu Tauri 2 ile Windows ve
   macOS uygulamasına sarar. Reklam ve ağ erişimi masaüstünde **yok**.

## Teknoloji

- `web/`: bundler yok. Saf HTML + CSS + ES module JS. Kütüphaneler `web/vendor/` altına sabit
  sürümle kopyalanır (CDN'e bağımlılık yok; masaüstü çevrimdışı çalışmalı).
- İzinli kütüphaneler: pdf-lib (MIT), pdf.js (Apache-2.0), fflate (MIT), docx (MIT),
  mammoth (BSD-2), qrcode (MIT). Yeni paket → lisans MIT/BSD/Apache olmalı,
  `THIRD_PARTY_NOTICES.md`'ye yaz. AGPL ve gelir eşikli lisanslar yasak.
- Test: Playwright (`tests/`), her aracın mutlu yolu + bozuk dosya senaryosu.
- CI: `.github/workflows/` — PR'da test, `main`'e push'ta GitHub Pages'e yayın.

## Klasör yapısı

```
web/
├─ index.html                 # Araçlar ana sayfası (hub)
├─ <arac-slug>/index.html     # her araç kendi klasöründe, TR slug (resimden-pdfe, pdf-birlestir…)
├─ en/<tool-slug>/index.html  # İngilizce karşılık (Faz 2)
├─ assets/css/ba.css          # tek tema dosyası (tasarım token'ları :root'ta)
├─ assets/js/ba.js            # ortak: dropzone, ilerleme, indirme, i18n yardımcıları
├─ assets/js/ads.js           # AdSense yükleyici (yalnızca web; desktop derlemesinde hariç)
├─ assets/img/                # logo, ikonlar, ekran görüntüleri
├─ vendor/                    # sabitlenmiş kütüphaneler
└─ CNAME                      # araclar.bilisimajans.com
docs/PLAN.md                  # ürün, menü, reklam ve trafik planı
site/                         # WordPress'e yapıştırılacak menü/sayfa metinleri
```

## Kesin kurallar

1. **Gizlilik:** dosya yükleme/analitik/çerez/izleme kodu yok. Tek istisna AdSense'in kendi
   script'i (`ads.js` üzerinden, yalnızca web). Her araç sayfasında "Dosyanız bilgisayarınızdan
   çıkmaz" rozeti bulunur ve bu doğru olmak zorundadır.
2. **AdSense yerleşimi:** reklam alanları yalnızca `<div class="ba-ad" data-slot="…">` ile ve
   yalnızca şu konumlarda: araç kutusunun **altında** (sonuç/indirme butonundan en az 1 ekran
   uzak), içerik ortasında, sayfa sonunda. **Dosya seç / Dönüştür / İndir butonlarının yanında
   veya üstünde reklam asla olmaz.** Buton benzeri reklam yasak.
3. **İçerik:** her araç sayfası = araç + en az 800 kelime özgün TR metin (nasıl kullanılır, SSS ≥ 6,
   gizlilik notu, ilgili araçlar). Sadece araç olan sayfa yayınlanmaz (ince içerik → AdSense reddi).
4. **Erişilebilirlik ve mobil:** 360px genişlikte çalışır, klavyeyle kullanılabilir, kontrast AA.
5. **Marka:** her sayfada "Bilişim Ajansı" logosu ve "%100 ücretsiz · kayıt yok · dosya yüklenmez"
   satırı. Sahte "Premium" tuzağı, sahte geri sayım, yanıltıcı buton yok.
6. **Dil:** arayüz metinleri HTML içinde TR; EN sayfalar ayrı dosya. Kodda Türkçe yorum, İngilizce
   tanımlayıcı.
7. Commit mesajları Türkçe, emir kipinde: "PDF birleştirmede sayfa sırasını düzelt".

## Komutlar

```
npx serve web            # yerel önizleme (http://localhost:3000)
npx playwright test      # testler
```

## Ajanlar (`.claude/agents/`)

- `tool-developer` — yeni online araç sayfası + JS.
- `qa-tester` — Playwright testleri, bozuk dosya/mobil/klavye kontrolleri.
- `seo-writer` — araç sayfası metinleri, rehberler, WordPress menü/sayfa içerikleri.
- `policy-reviewer` — AdSense / gizlilik / yanıltıcı tasarım denetimi.
- `release-manager` — Pages yayını, Tauri sürümleri, sürüm notları.

Ürün listesi ve sıra: `docs/PLAN.md`.
