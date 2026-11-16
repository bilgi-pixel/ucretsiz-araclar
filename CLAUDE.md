# Bilişim Ajans Ücretsiz Araçlar

bilisimajans.com'un "Ücretsiz Programlar" menüsü altında sunulan araçlar. İki katman, tek kod:

1. **Online araçlar** (`web/`): tarayıcıda çalışır, **dosya hiçbir zaman sunucuya gitmez**
   (tamamı istemci tarafı JS). Statik site; GitHub Pages → `araclar.bilisimajans.com`.
2. **Masaüstü kullanım** iki yolla: (a) **PWA** — `web/manifest.webmanifest` + `web/sw.js`;
   tarayıcıdan "Uygulama olarak yükle", çevrimdışı çalışır, AdSense **gösterilebilir** (hâlâ
   bizim alan adımızdaki web sayfasıdır). (b) Tauri 2 paketleri (`desktop/`, Faz 2) — Windows ve
   macOS; içinde AdSense **asla yok** (politika ihlali, hesap kapatır), yalnızca kendi
   tanıtımımız. Ağ erişimi masaüstünde yalnızca kullanıcı bağlantıya tıklayınca.

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
5. **Marka:** her sayfada "Bilişim Ajans" logosu ve "%100 ücretsiz · kayıt yok · dosya yüklenmez"
   satırı. Sahte "Premium" tuzağı, sahte geri sayım, yanıltıcı buton yok.
6. **Dil:** arayüz metinleri HTML içinde TR; EN sayfalar ayrı dosya. Kodda Türkçe yorum, İngilizce
   tanımlayıcı.
7. Commit mesajları Türkçe, emir kipinde: "PDF birleştirmede sayfa sırasını düzelt".
8. **Yasal sınır:** Yasa dışı kullanıma hizmet edebilecek araç yapılmaz (sahte belge/dekont,
   TC kimlik veya IBAN üretici, filigran kaldırıcı, şifre kırıcı, telifli içerik indirici vb.).
   Yeni araçtan önce "kötüye kullanılırsa suç oluşturur mu?" diye bakılır; evet ise yapılmaz
   ya da yalnızca doğrulama/koruma amaçlı biçimiyle yapılır. Ayrıntı: `docs/ARASTIRMA.md` §3.4.

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

## Bilgi Bankası (`web/bilgi-bankasi/`)

En çok aranan "nedir / nasıl hesaplanır" sorularına uzun, özgün makaleler (AdSense için ana içerik bölümü).
Kaynak `scripts/bilgi/makaleler/<slug>.mjs`; sayfalar elle düzenlenmez, `node scripts/bilgi/derle.mjs` üretir.

- Yazım kuralları ve SVG infografik kuralları: `scripts/bilgi/YAZAR.md`. Doğrulama: `node scripts/bilgi/dogrula.mjs <slug>`.
- Konu havuzu: `scripts/bilgi/konular.json` (araştırma ajanının seçtiği, araçlara bağlanan konular).
- `derle.mjs` ana sayfada `<!-- bilgi:basla -->…<!-- bilgi:bitis -->` bölümünü, `#bilgi` sekmesini, sitemap'teki
  `<!--bilgi-->` satırlarını, `tests/hub.spec.ts` kart sayısını ve `tests/bilgi-bankasi.json`'u günceller.
- **Araç üreticisiyle birlikte çalışma:** `scripts/uret/derle.mjs` de `web/index.html`, `sitemap.xml` ve `hub.spec.ts`'e
  yazar. İki üretici de dosyayı yerinde güncellediği için birbirinin işaretli bölümünü korur; ama paket hazırlamadan önce
  **mutlaka `main`'in son hâlini çekin** ve iki derleyiciyi de bir kez çalıştırın. Eski bir kopyadan üretilen `index.html`
  paketi diğer bölümü siler.
- Bilgi kartları araç sayısına girmez (`hub.js` ve `uret/derle.mjs` rehber + bilgi kartlarını sayaçtan hariç tutar;
  bilgi bölümü rehberlerden sonra, oyunlardan önce durur).

### Bilgi Bankası yazarlarının araçlarda bulduğu, doğrulanması gereken iki parametre (16.11.2026)
- `web/emekli-ikramiyesi-hesapla/parametreler.json` → `ikramiye_azami_hizmet_yili: 30`. Anayasa Mahkemesi'nin
  2013/111 E., 2014/195 K. kararı (yürürlük 07.01.2015) ile 30 yıl sınırının kaldırıldığı belirtildi; makale buna göre yazıldı.
  Resmî kaynaktan doğrulayıp araçla makaleyi uyumlu hâle getirin.
- `web/gelir-vergisi-hesapla/parametreler.json` → `kira_istisna_tutari: 47000` 2025 gelirleri içindir; 2026 gelirleri için
  mesken kira istisnası 58.000 TL (Gelir Vergisi Genel Tebliği Seri No: 332). Araç hangi yılı hesaplıyorsa ona göre güncelleyin.
- `web/temettu-verimi-hesapla/index.html` metnindeki ilk örnek stopajı "%10 kabul edilirse" diye hesaplıyor; temettü
  stopajı 22.12.2024'ten beri %15 (9286 sayılı CB Kararı). İkinci örnek zaten %15; ilkini düzeltin.
- `web/kelime-sayfa-cevir/logic.js` 12 puntoda sayfa başına 500 kelime (İngilizce metne göre) varsayıyor; Türkçe kelimeler
  eklerle uzun olduğu için sayfa sayısı düşük çıkabilir. Türkçe için daha düşük bir kelime/sayfa varsayımı ya da seçenek ekleyin.
- `web/ayakkabi-numarasi-donustur`: EU → UK/US sabit farkla (34/33/31,5) çeviriyor; EU 6,67 mm, UK/US 8,47 mm adımlı olduğu için
  uçlarda sapıyor (30 cm ayak: araç UK 13,5, formül 12). Paris noktası / barleycorn formülüne geçin.
- `web/dogalgaz-tuketim-hesapla` 10,64 kWh/m³, `web/elektrik-tuketim-hesapla/parametreler.json` 9,2 kWh/m³ kullanıyor; tek değerde birleştirin.
- `web/bel-kalca-orani-hesapla/logic.js`: kadında 0,80–0,84 "orta", erkekte 1,00 "yüksek risk" eşiği kullanıyor; DSÖ eşiği kadında
  0,85, erkekte 0,90 ve üzeri. Hangi sınıflamanın kullanıldığını sayfada belirtin ya da DSÖ eşiğine geçin.
- Kablo kesiti aracı yalnızca gerilim düşümüne bakıyor (kısa hatta 25 A için 1,5 mm² çıkabiliyor); akım taşıma kapasitesi kontrolü ekleyin.
- Evcil hayvan yaşı aracı 1 yaş altını doğrusal hesaplıyor (6 aylık kedi → 7,5; yaygın tablolar ~10) ve dev ırk köpeklerin ilk iki yılını
  küçük ırkla aynı sayıyor. UPS aracındaki "Aküden çekilen akım" satırı aküleri seri bağlı varsayıyor; sayfada belirtin.
- `vardiya-cizelgesi`: molayı düşmüyor; 24–08 gece vardiyası (30 dk mola, net 7,5 sa) 7,5 saat sınırını aşıyor sayılabiliyor, haftalık 45 saat
  brüt saatle sayılıyor. `merdiven-hesapla` yalnızca 2h+b kuralına bakıyor; İmar Yönetmeliği md. 31 sınırları (rıht ≤16/18 cm, basış ≥27 cm) için uyarı ekleyin.
  `yagmur-suyu-hasadi-hesapla` izdüşüm alanı, `cati-alani-hesapla` eğik yüzey alanı veriyor; farkı sayfalarda belirtin.
- `et-pisirme-suresi-hesapla`: dana "az pişmiş" 52–55 °C hedefi, gıda güvenliği sınırının (bütün parça 63 °C + 3 dk) altında olduğu
  belirtilmeden gösteriliyor; uyarı ekleyin. `renk-kontrast-hesapla` hazır örneklerinde üçüncü taraf marka adları geçiyor.
  `kopek-mama-miktari-hesapla` varsayılan çarpanı 1,6 (kısırlaştırılmış); "normal" 1,8 olduğu sayfada açık değil.
- `harc-hesapla/parametreler.json`: 6 aylık pasaport 2806, 2 yıllık 6698 yazıyor; 2026 tutarları 2.806,50 ve 6.698,50 TL (kuruşlar eksik).
  `ses-donustur` MP3 çıktısı vermiyor (yalnızca WAV ve Opus); sayfa metni buna uygun olmalı. `terleme-orani-hesapla`daki "kaybı tam
  karşılamak için 15 dakikada bir içilecek miktar" satırı fazla su içmeye yönlendirebilir; hedef, kaybı vücut ağırlığının %2'sinin altında tutmaktır.
- `cozunurluk-hesapla` kimyada çözünürlük hesaplıyor; ekran/görüntü çözünürlüğü konularına bağlanmamalı (konu dosyalarında bu eşleşme vardı).
  `pirinc-su-orani-hesapla` basmatiyi 1:1,75 alıyor; "paket oranı esas alınır" notu ekleyin.
- `palet-yukleme-hesapla`: "İzin verilen yük yüksekliği" alanının palet (14,4 cm) dahil mi hariç mi olduğu yazmıyor; bir kat fark yaratabilir.
- `satranc-elo-hesapla`: FIDE'nin 400 puan sınırını ve K×n ≤ 700 kuralını uygulamıyor; K=40 seçeneği "18 yaş altı ve 2300 altı" koşulunu
  belirtmiyor. `masa-kisi-sayisi-hesapla` 180 cm yuvarlak masaya 9 kişi veriyor, salonlarda bu masa "10 kişilik" diye anılır; sayfada açıklayın.
- `harc-hesapla`: ruhsat kaleminde 1.1.2026'dan beri noterde araç satışı ve ilk tescilde alınan binde 2 harcı (en az 1.000 TL,
  7566 sayılı Kanun) hesaplamıyor. `ogretmen-maas-hesapla`: uzman öğretmen/başöğretmen hazır ek gösterge seçenekleri (4200, 4800)
  yaklaşık; resmî kaynakla doğrulayın.
- `periyodik-tablo/elementler.json` yuvarlanmış atom kütleleri (H 1,01, O 16) kullanıyor; `molar-kutle-hesapla` ve
  `kutle-yuzdesi-bilesik-hesapla` standart değerleri (1,008 / 15,999). Aynı bileşikte farklı sonuç çıkmasın diye tek kaynağa bağlayın.
- `vucut-su-orani-hesapla/logic.js`: erkek Watson formülünde yaş katsayısı 0,09156 yazılmış; standart değer 0,09516.
- `morse-alfabesi-cevir` ı ile İ'yi aynı koda eşliyor; Mors'tan metne çeviride ı/i ayrımı kayboluyor. `akort-aleti` bozuk (La–Re–Sol)
  ve bağlama (La–Re–Mi) düzen ön ayarlarını bir müzik kaynağıyla doğrulayın.
- `trafik-cezasi-hesapla/parametreler.json` hız ihlallerinin hepsinde ceza puanını 0 veriyor; Karayolları Trafik Yönetmeliği'nin puan
  cetveliyle doğrulayın. `wordden-pdfe` PDF/A çıktısı vermiyor; sayfa metni bunu ima etmemeli.
- `pdf-n-up` kitapçık modu 4'ün katına tamamlarken boş sayfaları en sona ekliyor; son sayfa arka kapaksa içe kayıyor.
  "Son sayfayı arka kapak olarak koru" seçeneği ekleyin.
