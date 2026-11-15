# Bilgi Bankası makalesi yazma rehberi (ajanlar için)

Her makale tek dosyadır: `scripts/bilgi/makaleler/<slug>.mjs` (`export default { … }`).
Üretici (`scripts/bilgi/derle.mjs`) bu dosyadan sayfayı, Bilgi Bankası listesini, ana sayfa kartını,
sitemap'i ve testi üretir. **Yalnızca kendi makale dosyalarını yazarsın**; `web/`, `tests/`, başka
dosyalara dokunma, `derle.mjs` ya da git çalıştırma.

Örnek (yapıyı birebir izle): `scripts/bilgi/makaleler/` içindeki ilk tamamlanmış makale (yönetici yazdı).
Konu listesi: `scripts/bilgi/konular.json` (slug, başlık, kategori, anahtar kelimeler, gerçek kullanıcı soruları, bağlanacak araçlar).
Araç listesi: `scripts/bilgi/araclar.tsv` (slug, başlık, kategori). Rehberler: `scripts/bilgi/rehberler.tsv`.

## İş akışı
1. Sana verilen her slug için `konular.json`'daki kaydı oku; `sorular` alanı gerçek arama sorularıdır, makale bunların hepsini cevaplamalı.
2. Bağlanacak araçların sayfasına bak (`web/<arac-slug>/index.html` içindeki h1 ve açıklama yeter) ki aracı doğru anlat.
3. Dosyayı yaz, hemen `node scripts/bilgi/dogrula.mjs <slug>` çalıştır, `✓` görene kadar düzelt. Bitirmeden sıradakine geçme.
4. Sonunda yalnızca kısa özet döndür: geçen slug'lar ve (varsa) bitiremediğin slug ile nedeni.

## Alanlar
- `slug`, `kategori`: konular.json'daki gibi. `tarih: '2026-11-15'`.
- `title`: H1, arama niyetine birebir uyan soru/başlık (25–110 karakter). `pageTitle`: 30–72 karakter, ana anahtar kelime başta.
- `description`: 110–168 karakter, sorunun cevabını özetleyen meta açıklama.
- `keywords`: 5–12 Türkçe arama ifadesi.
- `lead`: 35–110 kelime. **İlk cümle sorunun doğrudan cevabıdır** (Google öne çıkan snippet ve yapay zekâ özetleri bunu alır).
- `kisaCevap`: 4–7 madde, her biri tek cümlelik net bilgi (formül, sayı, kural).
- `figure`: `{ svg, caption, alt }` — konuya özel, öğretici **özgün infografik** (akış şeması, karşılaştırma çubukları,
  formül diyagramı, zaman çizelgesi, örnek hesap kartı…). Kurallar aşağıda.
- `sections`: en az 6 bölüm `{ h, p?:[…], formula?:'satır\nsatır', table?:{head:[…], rows:[[…]], caption?}, ul?:[…], ol?:[…], after?:[…], note? }`.
  Önerilen akış: tanım/ne işe yarar → formül veya kural → adım adım **çözümlü örnek(ler)** → karşılaştırma tablosu →
  Türkiye'ye özgü durumlar → sık yapılan hatalar → aracı kullanma adımları (ilgili araca bağlantıyla).
- `faq`: en az 8 `[soru?, cevap]`; sorular konular.json `sorular`ından gelsin; cevap en az 18 kelime, bağımsız okunabilir.
- `tools`: 2–6 gerçek araç slug'ı (konular.json `araclar`; gerekirse araclar.tsv'den ekle).
- `related` (isteğe bağlı): ilişkili diğer Bilgi Bankası slug'ları (konular.json'dakilerden).
- `sources` (isteğe bağlı, önerilir): `[['Kurum – sayfa adı', 'https://…']]` yalnızca resmî/kurumsal kaynak (gib.gov.tr, sgk.gov.tr, osym.gov.tr, meb.gov.tr, tcmb.gov.tr, tuik.gov.tr, mevzuat.gov.tr, turkiye.gov.tr, who.int …). Uydurma URL yazma; emin değilsen kurumun ana sayfasını ver.
- `uyari` (isteğe bağlı): sağlık/finans/hukuk konularında sayfa sonu notuna eklenecek kısa yan cümle, ör. `'tıbbi tavsiye değildir, kişisel durumunuz için hekiminize danışın'`.

## Metin biçimi
- İzinli etiketler: `<strong> <em> <code> <sub> <sup>`. Başka HTML yok, HTML varlığı (`&lt;` vb.) yok, emoji yok, metinde URL yok.
- Site içi bağlantı: `[[arac:kdv-hesapla|KDV Hesapla aracı]]`, `[[bilgi:<slug>|metin]]`, `[[rehber:<slug>|metin]]`. Makale başına 3–8 bağlantı, doğal yerlerde.
- JS dizgilerinde kesme işareti için çift tırnak ya da backtick kullan (Türkçe metinde çok `'` var). Dosya geçerli ES modülü olmalı.

## SVG görsel kuralları
- Kök: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">` (genişlik 600–800, yükseklik 260–520; width/height yazma).
- İzinli öğeler: g, rect, circle, ellipse, line, polyline, polygon, path, text, tspan, title, desc, defs, marker, linearGradient, stop, use.
- **Renk yazma** (hex/rgb/style yasak; site açık/koyu temaya göre renkleri kendisi verir). Renk ve stil yalnızca class ile:
  - dolgu: `p` (bordo ana renk), `ps` (açık bordo), `a` (vurgu), `s2` (gri yüzey), `sf` (beyaz yüzey), `t` `t2` `mu` (metin tonları), `ok` `oks` (yeşil/açık yeşil), `dg` `dgs` (kırmızı/açık kırmızı), `c` `m` `y` (camgöbeği, macenta, sarı – az kullan)
  - çizgi: `sp` `sb` `st` `sa` `sok` `sdg`; kalın çizgi `sw`; kesikli `dash`. Çizgi öğelerine `fill="none"` yaz.
  - yazı: `<text>` varsayılan metin rengindedir; `b` kalın, `sm` küçük (12px), `lg` (19px), `xl` (26px kalın); `mid` ortala, `end` sağa yasla; yazı rengi için `p`, `ok`, `dg`, `mu`, `t2`, koyu kutu üstünde `sf`.
- **Görselin zemini zaten `s2` (gri) renktedir**: `s2` dolgulu kutu zeminde kaybolur. Nötr kutular için `class="sf sb"` (beyaz yüzey + ince kenar), vurgulu kutular için `ps`, `oks`, `dgs` ya da `p` kullan. `p` (koyu bordo) kutunun üstündeki yazıya `sf` ver.
- Yazılar Türkçe, okunur boyutta; 360px telefonda da anlaşılır olsun (az ama büyük yazı, en fazla ~12 kelimelik etiketler).
- Görsel bilgi taşısın: sayılar metindeki çözümlü örnekle tutarlı olsun. Süs için çizim yapma. En fazla 14.000 karakter.

## İçerik kuralları (AdSense için kritik)
- Toplam metin **en az 1.300 kelime** (hedef 1.500–2.200), özgün, bu konuya özel. Şablon cümleleri makaleden makaleye kopyalama.
- Doğruluk: emin olmadığın sayısal iddia, tarih, mevzuat, fiyat, oran yazma. 2026 için kesin bilmediğin tutarları
  (asgari ücret, harç, prim, faiz oranı, vergi dilimi) sabit gerçek gibi yazma: formülü ve mantığı anlat, örneklerde
  "örnek tutar" olduğunu belirt, güncel değer için resmî kaynağa yönlendir. Kalıcı bilgiler (formüller, birimler,
  kanunun genel kuralı, fiziksel sabitler) kesin yazılabilir.
- Yazım: doğal, akıcı, Türkiye Türkçesi; "siz" dili; kısa paragraflar (2–4 cümle). Ondalık virgül, binlik nokta (1.250,50 TL).
- Başka site, marka, rakip ürün adı yok (resmî kurumlar hariç). Abartılı vaat, "en iyi" iddiası yok.
- Sağlıkta teşhis/tedavi/ilaç önerisi yok; yalnızca genel bilgi ve "hekiminize danışın". Yasa dışı kullanıma hizmet eden içerik yok.
