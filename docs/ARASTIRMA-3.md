# Araştırma 3 — Google Trends (Türkiye) Ölçümü ve Veriye Dayalı Sıra

Tarih: 2026-11-04. Önceki: [`ARASTIRMA.md`](ARASTIRMA.md), [`ARASTIRMA-2.md`](ARASTIRMA-2.md), [`URETIM-SIRASI.md`](URETIM-SIRASI.md). Bu dosya onları **değiştirmez**, verilerle düzeltir; üretim sırasını buradaki §3 belirler.

## 1. Yöntem

- Google Trends, Türkiye, son 12 ay, web araması. 9 karşılaştırma grubu, her grupta sabit çapa terim **"pdf birleştirme"**; tüm değerler çapaya göre normalize edildi (**pdf birleştirme = 100**).
- Değerler "Ortalama" çubuklarının piksel yüksekliğinden okundu (±2 puan hata). Trends **göreli ilgi** verir, mutlak hacim değil; birebir ifade bazlıdır ("resim küçültme" ile "fotoğraf boyutu küçültme" ayrı sayılır). Bu yüzden düşük görünen bir niyet, farklı ifadelerle toplamda daha yüksek olabilir; bunu Search Console doğrular.
- "çekiliş", "kira artış oranı", "pdf çevirme", "qr kod" gibi geniş terimler haber/alışveriş niyetini de içerir → araç niyeti daha düşüktür (işaretli).

## 2. Ölçüm sonuçları (pdf birleştirme = 100)

| İndeks | Sorgu | Bizim araç | Not |
|---|---|---|---|
| **~140** | ders programı | `ders-programi` | Eylül zirvesi (okul); yıl geneli çok daha düşük. Geniş terim (okul programı sorguları dahil) |
| **~128** | çekiliş | `cekilis` | Geniş: haber/sosyal çekilişler; araç niyeti belki 1/5'i |
| **~107** | kira artış oranı | `kira-artis-hesapla` | Geniş/haber; aylık TÜFE günlerinde zirve. Medya rekabeti yüksek |
| **100** | pdf birleştirme | `pdf-birlestir` ✅ var | Çapa. Yıl boyu düz ve yüksek |
| **~88** | pdf çevirme | PDF dönüştürücü ailesi | Geniş; içinde word/jpg/excel çevirme |
| **~78** | yüzde hesaplama | `yuzde-hesapla` | Çok yüksek, zorluk 1, yıl boyu düz. **Sürpriz kazanan** |
| **~40** | dilekçe örneği | `dilekce-olustur` | Yüksek; "istifa dilekçesi" tek başına ~10 |
| **38** | kdv hesaplama | `kdv-hesapla` | Düz ve yüksek |
| **~32** | yks puan hesaplama | `yks-puan-hesapla` | Haziran zirvesi, yıl geneli ~sıfır |
| **31** | qr kod | `qr-kod` | Geniş; "qr kod oluşturma" ~6 |
| 30 | pdf küçültme | `pdf-kucult` | + "pdf boyut küçültme" 4 → ~34 |
| 30 | kıdem tazminatı hesaplama | `kidem-tazminati` | Ocak/Temmuz zirveleri |
| 29 | yaş hesaplama | `yas-hesapla` | Düz |
| 27 | resmi tatiller | `resmi-tatiller` | Tatil öncesi zirveler |
| 24 | pdf word çevirme | `pdfden-worde` | |
| 24 | word pdf çevirme | `wordden-pdfe` | |
| 19 | pdf düzenleme | `pdf-sayfa-duzenle` | |
| ~15 | ekran kaydı | `ekran-kaydedici` | |
| 12 | pdf jpg çevirme | `pdfden-resme` ✅ var | |
| 12 | jpg pdf çevirme | `resimden-pdfe` ✅ var | "resimden pdf" ifadesi ~0 |
| 12 | biyometrik fotoğraf | `biyometrik-fotograf` | + "vesikalık fotoğraf" 7 → ~19; sezonluk |
| 10 | ocr | `resimden-yaziya` | |
| 10 | istifa dilekçesi | `dilekce-olustur` | |
| 4 | fotoğraf küçültme | `resim-kucult` | + "resim küçültme" 3 + "fotoğraf boyutu küçültme" 1 + "resim sıkıştırma" 0 → **~8 toplam** |
| 3 | brüt net maaş hesaplama | `brut-net-maas` | Beklenenden **çok düşük** (medya "maaş hesaplama" ifadesini kullanıyor olabilir; "asgari ücret net" ayrı) |
| 2 | fotoğraf boyutlandırma / resim boyutlandırma | `resim-boyutlandir` | |
| 2 | not ortalaması hesaplama | `not-ortalamasi` | |
| ~0 | kelime sayacı, zip açma, havalı yazı, pdf imzalama, sayıyı yazıya çevirme, webp jpg çevirme, resim sıkıştırma | — | Bu ifadelerle çapanın %1'i altında |

## 3. Veriye göre düzeltilmiş üretim sırası

**Değişenler (önceki yargıya göre):**
- **Resim araçları aşağı iniyor.** "resim/fotoğraf küçültme" ailesi toplamda pdf birleştirmenin ~%8'i; "resim boyutlandırma" ~%2. Biyometrik+vesikalık ~%19 ve sezonluk. Önceki sırada A2–A5 idi → **Kademe B'ye**. Yine de yapılmalı (uzun kuyruk + biyometrik rehberleri), ama ilk hafta değil.
- **Hesaplayıcılar yukarı çıkıyor:** yüzde (78), KDV (38), yaş (29), kıdem (30), resmî tatiller (27) → zorluk 1–2, düz talep. Brüt-net (3) ise **aşağı** (medya tekeli + ifade farkı); yine Aralık için hazır tutulur ama öncelik değil.
- **Dilekçe oluşturucu yukarı:** "dilekçe örneği" 40 + "istifa dilekçesi" 10. İçerik ağırlıklı, `seo-writer` işi.
- **PDF dönüştürme ailesi doğrulandı:** pdf çevirme 88, pdf word/word pdf 24+24, pdf küçültme ~34, pdf düzenleme 19. PDF kümesi ana trafik motoru.
- **Ders programı, çekiliş, kira artış** yüksek görünüyor ama geniş/mevsimlik; **ders programı** (Eylül) ve **kira artış oranı** (aylık) yapılmaya değer, **çekiliş** araç niyeti belirsiz → Kademe C'de kalsın.
- Kelime sayacı, zip, havalı yazı, pdf imzalama, sayıyı yazıya çevirme, webp→jpg: bu ifadelerle talep yok → **Kademe D**. (pdf imzalama için "pdf imza ekleme" vb. alternatifler Search Console'da izlenir.)

### Kademe A — hemen (tool-developer + seo-writer + qa-tester + policy-reviewer)

| # | Araç | Slug | İndeks | Gerekçe |
|---|---|---|---|---|
| A1 | PDF Küçült | `pdf-kucult` | ~34 | PDF kümesi + e-Devlet senaryoları; rakipler yüklüyor |
| A2 | Yüzde Hesaplama | `hesapla/yuzde-hesapla` | 78 | Zorluk 1, yıl boyu düz; hesaplayıcı altyapısını (`parametreler.json`, şablon, test) bununla kur |
| A3 | KDV Hesaplama | `hesapla/kdv-hesapla` | 38 | Zorluk 1 |
| A4 | Yaş Hesaplama + Tarih Farkı | `hesapla/yas-hesapla`, `hesapla/tarih-farki` | 29 | Zorluk 1 |
| A5 | Kıdem + İhbar Tazminatı | `hesapla/kidem-tazminati`, `hesapla/ihbar-tazminati` | 30 | Ocak zirvesine yetişmeli; altın test seti; "hukuki tavsiye değildir" |
| A6 | Resmî Tatiller / Bayram / Köprü Günü (2026–2027) | `resmi-tatiller` | 27 | Statik veri; link mıknatısı |
| A7 | PDF'den Word'e (beta) + Word'den PDF'e | `pdfden-worde`, `wordden-pdfe` | 24+24 | Dürüst beta metni (PLAN notu) |
| A8 | QR Kod Oluştur | `qr-kod` | 31 (geniş) | Zorluk 1–2 |
| A9 | Dilekçe Oluşturucu (ilk 20 şablon) | `dilekce-olustur` | 40+10 | seo-writer ağırlıklı; policy-reviewer zorunlu |
| A10 | PDF Sayfa Düzenle + Döndür | `pdf-sayfa-duzenle`, `pdf-dondur` | 19 | "pdf düzenleme" niyetinin yapılabilir kısmı |

### Kademe B — A bitince

| # | Araç | Slug | İndeks |
|---|---|---|---|
| B1 | Resim Küçült (hedef KB) — resim motorunu burada kur | `resim-kucult` | ~8 (aile toplamı) |
| B2 | Biyometrik / Vesikalık Fotoğraf | `biyometrik-fotograf` | ~19, sezonluk (Şubat–Mart, Haziran) |
| B3 | Resim Boyutlandır + Dönüştür | `resim-boyutlandir`, `resim-donustur` | ~2 (+uzun kuyruk) |
| B4 | Kira Artış Oranı Hesaplama | `kira-artis-hesapla` | ~107 (geniş; aylık bakım) |
| B5 | Ders Programı Oluşturucu | `ders-programi` | ~140 (Eylül; Şubat'ta ikinci zirve) — **Ağustos'a hazır** |
| B6 | Ekran Kaydedici | `ekran-kaydedici` | ~15 |
| B7 | OCR (Türkçe) | `resimden-yaziya` | 10 |
| B8 | YKS Puan Hesaplama | `yks-puan-hesapla` | ~32 (Haziran) — **Mayıs'a hazır** |
| B9 | Brüt-Net Maaş (2027 değerleriyle) | `hesapla/brut-net-maas` | 3 (ifadeye göre düşük; Aralık'ta yine de hazır) |
| B10 | Not Ortalaması, Kredi Taksit, Zam Oranı, Yıllık İzin | `hesapla/*` | 2–? |

### Kademe C — orta
Çekiliş (niyet belirsiz), PDF sayfa numarası/filigran, PDF imzala, QR oku, metin araçları, zip, belge tarayıcı, kamera/mikrofon testi, CSV↔Excel, PDF karart, Excel şablonları, serbest meslek makbuzu, fitre/zekât, sınav geri sayım, sosyal medya boyutları.

### Kademe D — düşük
Kelime sayacı, havalı yazı, sayıyı yazıya çevirme, şifre üretici, GIF, favicon, SVG→PNG, EXIF, kolaj, renk seçici, diff, barkod, JSON, Markdown, zamanlayıcı, birim, hash, lorem, hayat sayacı, burç, VKİ, tapu/damga/noter, trafik cezası/MTV, CV, EN webmaster paketi (EN sürümle).

**Yapılmayacaklar:** değişmedi (CLAUDE.md kural 8, ARASTIRMA.md §3.4).

## 4. Çalışma kuralları (sahip talimatı, 2026-11-04)
- Ana dal **main**; ajanlar ortak dosyalara (`CLAUDE.md`, `docs/PLAN.md`, `web/assets/*`, hub `web/index.html` dışında birlikte düzenlenen dosyalar) dokunmaz; her araç kendi `web/<slug>/` klasöründe. Hub kartı ve sitemap güncellemesi tek elden (release-manager) yapılır.
- Araştırma çıktıları yalnızca `docs/ARASTIRMA-*.md`'ye yazılır.

## 6. 20 YENİ araç fikri (2026-11-04, ana oturum talebi)

Kapsam dışı: `web/index.html`'deki 85 araç, üretimdeki 32 araç ve `ARASTIRMA-2.md` adayları. Hepsi %100 tarayıcıda, kural 8'e uygun. İndeks: Trends TR 12 ay, pdf birleştirme = 100 (**ölçülemedi** = Trends o grubu iki denemede render etmedi; yargı ile sıralandı).

| # | Araç | Slug | Hedef sorgular | İndeks | Teknik | Z | Not |
|---|---|---|---|---|---|---|---|
| Y1 | **Arka Plan Kaldır** (insan + nesne) | `arka-plan-kaldir` | arka plan silme; fotoğraf arka planını kaldırma; png şeffaf yapma; arka planı beyaz yapma | ölçülemedi (ulusal olarak çok yüksek, Canva/remove.bg tekeli) | MediaPipe Selfie Segmentation (Apache-2.0) + U²-Net ONNX (Apache-2.0) + onnxruntime-web (MIT); model vendor'da (~5–40 MB), ilk kullanımda yüklenir | 4 | AGPL `@imgly` **kullanılmaz**. Fark: fotoğraf yüklenmez |
| Y2 | **Burç & Yükselen Burç Hesaplama** | `burc-hesapla` | burç hesaplama; yükselen burç hesaplama; doğum haritası; burcum ne | 31 | Güneş burcu tablo; yükselen için basit efemeris (astronomia JS, MIT) | 2 | "Eğlence amaçlı" notu |
| Y3 | **Kelime Bulucu / Harflerden Kelime Türetme** (Kelimelik, Wordle TR, bulmaca) | `kelime-bulucu` | kelime bulucu; harflerden kelime türetme; kelimelik hile; 5 harfli kelimeler | 29 (+ kelime türetme 4) | TR kelime listesi (açık lisanslı; TDK listesi derlemeleri → **lisans teyidi**), saf JS | 2 | Alt sayfalar: "x harfli kelimeler", "… ile başlayan" (ön ayar sayısı sınırlı) |
| Y4 | **Klavye / Fare / Ekran Testi** (tuş testi, ölü piksel, fare tıklama, dokunmatik) | `klavye-test`, `ekran-test` | klavye testi; tuş testi; ölü piksel testi; fare testi; dokunmatik ekran testi | 27 (+ ölü piksel 4) | Saf JS (KeyboardEvent, PointerEvent, tam ekran renk) | 1 | `kamera-test` ailesine ekleme; sıfır bakım, tekrar ziyaret |
| Y5 | **Kira Sözleşmesi / Basit Sözleşme Oluşturucu** (kira, kefalet, iş, satış sözleşmesi şablonları → Word/PDF) | `sozlesme-olustur` | kira sözleşmesi örneği; kira kontratı pdf; iş sözleşmesi örneği; araç satış sözleşmesi örneği | ölçülemedi (ulusal olarak yüksek; "kira sözleşmesi örneği" bilinen büyük sorgu) | `dilekce-olustur` motoru (docx + pdf-lib) | 2 | "Hukuki tavsiye değildir"; sahte belge değil, kullanıcı kendi tarafı. `policy-reviewer` |
| Y6 | **Logo / Yazı Logosu Oluşturucu** (metin + ikon + renk, SVG/PNG) | `logo-olustur` | logo yapma; ücretsiz logo oluşturma; logo tasarlama online | ölçülemedi (ulusal olarak çok yüksek, rekabet çok) | Canvas/SVG; açık lisanslı ikon seti (Tabler Icons MIT / Lucide ISC) | 3 | **Ajans CTA ile en uyumlu araç** ("profesyonel logo için bize yazın") |
| Y7 | **Vücut Kitle İndeksi + İdeal Kilo + Günlük Kalori** | `vki-hesapla` | vücut kitle indeksi hesaplama; ideal kilo hesaplama; günlük kalori ihtiyacı; bmi hesaplama | ölçülemedi (ulusal olarak yüksek) | Saf JS (BMI, Mifflin-St Jeor) | 1 | Sağlık → "tıbbi tavsiye değildir"; düşük reklam kategorisi riski kabul |
| Y8 | **Gebelik Haftası / Doğum Tarihi Hesaplama** | `gebelik-hesapla` | gebelik hesaplama; kaç haftalık hamileyim; doğum tarihi hesaplama; son adet tarihine göre | 13 | Saf JS (Naegele kuralı) | 1 | Sağlık notu; yalnızca takvim hesabı, tavsiye yok |
| Y9 | **Excel'den PDF'e / Excel'i Yazdır** | `excelden-pdfe` | excel pdf çevirme; xlsx pdf yapma; excel'i pdf olarak kaydetme | 8 | SheetJS (Apache-2.0) → HTML tablo → tarayıcı yazdırma (Word→PDF ile aynı yol) | 3 | Biçim sapması dürüstçe yazılır |
| Y10 | **PDF'den Excel'e (tablo çıkar)** (beta) | `pdf-excel` | pdf excel çevirme; pdf'den excel'e; pdf tablo çıkarma | ~8 (pdf çevirme ailesi) | pdf.js metin koordinatı + satır/sütun sezgisi; SheetJS yazma | 5 | "Beta, basit tablolar" rozeti |
| Y11 | **İşsizlik Maaşı Hesaplama** | `issizlik-maasi` | işsizlik maaşı hesaplama; işsizlik maaşı ne kadar; işsizlik maaşı kaç ay | 6 | Saf JS + `parametreler.json` (asgari ücret brüt %40/%80 tavan) | 1 | Hukuki not; Ocak güncellemesi |
| Y12 | **Fotoğraf Büyüt / Netleştir** (2× upscale) | `fotograf-netlestir` | fotoğraf netleştirme; fotoğraf büyütme; bulanık fotoğrafı düzeltme; çözünürlük artırma | 5 | Hızlı yol: Lanczos + unsharp (Canvas). İleri: Real-ESRGAN ONNX (BSD-3) ağır model | 3 | Model ile mobilde yavaş; önce Canvas sürümü |
| Y13 | **Yakıt Masrafı / Yol Maliyeti Hesaplama** | `yakit-hesapla` | yakıt hesaplama; yol masrafı hesaplama; 100 km yakıt tüketimi; km başı yakıt | 5 | Saf JS; km ve litre fiyatı kullanıcıdan (ağ yok) | 1 | Tatil öncesi zirveler |
| Y14 | **Tutanak Oluşturucu** (teslim-tesellüm, kaza tespit yardımcı, toplantı, iş kazası) | `tutanak-olustur` | tutanak örneği; teslim tutanağı; toplantı tutanağı örneği; kaza tespit tutanağı doldurma | 4 | Dilekçe motoru | 2 | "Resmî form yerine geçmez" (KTT resmi formdur, biz yalnızca doldurma rehberi) |
| Y15 | **Video Kırp / Küçült** (WebM çıktı, yeniden kodlama) | `video-kirp` | video kırpma online; video küçültme; video boyutu düşürme | 3+3 | WebCodecs + MediaRecorder/Canvas (ffmpeg **yok**) | 4 | Çıktı WebM; MP4 çıkışı için lisans temiz muxer gerek (mp4-muxer MIT — teyit). Dürüst sınır |
| Y16 | **Fotoğrafı Karakalem / Çizgi / Vintage Yap** (filtre seti) | `fotograf-filtre` | fotoğrafı karakalem yapma; fotoğrafı çizim yapma; siyah beyaz fotoğraf yapma; fotoğraf eskitme | — (ölçülmedi; viral) | Canvas filtreleri | 2 | `resim-duzenle` ile ayrı tutulursa viral sayfa |
| Y17 | **Yazıyı Sese Çevir (cihaz sesi, indirilemez)** | `yaziyi-sese-cevir` | yazıyı sese çevirme; metin okuma; türkçe seslendirme | 0 | speechSynthesis; yalnızca `localService` sesleri | 1 | Ağ sesleri kapatılır; ses indirme yok → düşük değer, **en sona** |
| Y18 | **Mail İmzası (HTML) Oluşturucu** | `mail-imzasi` | mail imzası oluşturma; outlook imza oluşturma; gmail imza | 0 | Saf JS, kopyalanabilir HTML | 1 | B2B/ajans uyumlu, hacim düşük |
| Y19 | **Altyazı (SRT/VTT) Aracı** — kaydır, birleştir, dönüştür | `altyazi-araci` | altyazı kaydırma; srt vtt çevirme; altyazı senkron | — (ölçülmedi, niş) | Saf JS | 1 | Niş ama sıfır rakip TR |
| Y20 | **Kan Grubu / Göz Rengi Olasılığı** | `kan-grubu-hesapla` | kan grubu hesaplama; çocuğun kan grubu; anne baba kan grubu | 0 | Saf JS | 1 | Eğitim amaçlı notu; düşük |

**Ölçüm notu:** mp4→mp3, elektrik faturası, sertifika şablonu, mail imzası, kan grubu, kartvizit tasarla "pdf birleştirme"nin %1'i altında çıktı → listeye alınmadı veya sona kondu.

**Önerilen ilk 16 (sıra):** Y1 arka-plan-kaldir, Y2 burc-hesapla, Y3 kelime-bulucu, Y4 klavye/ekran-test, Y5 sozlesme-olustur, Y6 logo-olustur, Y7 vki-hesapla, Y8 gebelik-hesapla, Y9 excelden-pdfe, Y10 pdf-excel, Y11 issizlik-maasi, Y12 fotograf-netlestir, Y13 yakit-hesapla, Y14 tutanak-olustur, Y15 video-kirp, Y16 fotograf-filtre.

## 7. 20 YENİ fikir — mevsimsel zirve ve esnaf/öğrenci/memur kitlesi (2026-11-04, 2. tur)

Kapsam dışı: `ls web` (2026-11-04, 120+ klasör), `ARASTIRMA-2.md`, §6. İndeks: Trends TR 12 ay, pdf birleştirme = 100. **Dürüst sonuç:** bu kitlelerin çoğu sorgusu bu ifadelerle düşük çıktı; mevsimsel araçların değeri yıl ortalamasında değil zirve ayında görünür (Trends ortalaması zirveyi düzleştirir). "memur maaş hesaplama" ve "ek ders ücreti" grubunu Trends üç denemede render etmedi → ölçülemedi.

| # | Araç | Slug | Hedef sorgular | İndeks | Zirve | Kitle | Teknik / not |
|---|---|---|---|---|---|---|---|
| S1 | **Net Hesaplama (deneme sınavı; D/Y, 4→1 / 3→1)** | `net-hesaplama` | net hesaplama; deneme net hesaplama; tyt net hesaplama; kpss net hesaplama; yanlış doğruyu götürür mü | **117** (çapanın üstünde) | Yıl boyu, Mart–Haziran | Öğrenci | Saf JS; `yks-puan-hesapla` puana gider, bu sayfa **net**e odaklanır (farklı niyet). Z1 |
| S2 | **Memur Maaş Hesaplama (derece/kademe, katsayı, 2027)** | `memur-maas-hesapla` | memur maaş hesaplama; memur maaşı 2027; derece kademe maaş; memur zammı hesaplama | ölçülemedi (Ocak/Temmuz'da bilinen büyük zirve) | Ocak, Temmuz | Memur | Katsayı/taban aylık `parametreler.json`; aile/çocuk yardımı; "tahmini" notu. Z3 |
| S3 | **Öğretmen Maaşı + Ek Ders Ücreti** | `ogretmen-maas-hesapla` | öğretmen maaşı 2027; ek ders ücreti hesaplama; öğretmen ek ders saat ücreti | 25 (öğretmen maaşı) | Ocak, Temmuz, Eylül | Memur/öğretmen | S2 motoru + ek ders tablosu. Z2 |
| S4 | **Harç Hesaplama 2027 (pasaport, ehliyet, kimlik, sürücü belgesi, yurt dışı çıkış)** | `harc-hesapla` | pasaport harcı 2027; ehliyet harcı; kimlik yenileme ücreti; yurt dışı çıkış harcı | 13 (pasaport harcı) | Ocak (yeniden değerleme), yaz | Herkes | Yıllık tablo, tek parametre dosyası. Z1 |
| S5 | **Takdir / Teşekkür Hesaplama (e-Okul ortalama)** | `takdir-tesekkur-hesapla` | takdir teşekkür hesaplama; karne ortalaması hesaplama; takdir almak için kaç puan | 7 (Ocak/Haziran'da ×10) | Ocak, Haziran (karne) | Öğrenci/veli | Saf JS, MEB yönetmelik puanları. Z1 |
| S6 | **Emekli İkramiyesi + Emekli Maaş Zammı (TÜFE %)** | `emekli-ikramiyesi-hesapla` | emekli ikramiyesi hesaplama; emekli maaşı zammı hesaplama; emekli zam oranı | 2 (+0) | Ocak, Temmuz | Memur/emekli | Yalnızca % ve katsayı; **emekli maaşı tutarı hesaplanmaz** (kural: YMYL karmaşık). Z2 |
| S7 | **Bağ-Kur (4B) Prim Hesaplama 2027** | `bagkur-primi-hesapla` | bağkur primi 2027; 4b prim hesaplama; esnaf sgk primi | 0 (ifade; Ocak'ta çıkar) | Ocak | Esnaf | Asgari ücret brüt × oran; parametre. Z1 |
| S8 | **Kira Stopajı / Net-Brüt Kira (iş yeri)** | `kira-stopaj-hesapla` | kira stopaj hesaplama; iş yeri kira stopajı; brüt kira net kira | 1 | Yıl boyu | Esnaf | %20 stopaj; parametre. Z1 |
| S9 | **Vade Farkı / Taksit Farkı / Çek Vadesi** | `vade-farki-hesapla` | vade farkı hesaplama; taksitli fiyat hesaplama; çek vade hesaplama | 0 | Yıl boyu | Esnaf | Saf JS. Z1 |
| S10 | **KYK Borç / Geri Ödeme Hesaplama** | `kyk-borc-hesapla` | kyk borç hesaplama; kyk kredi geri ödeme; kyk borcu ne kadar | 0 (ifade) | Ocak, Eylül | Öğrenci | TÜFE endeksli; "tahmini". Z2 |
| S11 | **Yüzdelik Dilim / Sıralama Hesaplama** | `yuzdelik-dilim-hesapla` | yüzdelik dilim hesaplama; yks sıralama hesaplama; lgs yüzdelik dilim | 1 (Haziran–Temmuz'da ×20) | Haziran–Temmuz | Öğrenci | ÖSYM/MEB önceki yıl tablosu; "tahmini". Z2 |
| S12 | **Not Dönüştürücü (4'lük ↔ 100'lük, harf notu, YÖK tablosu)** | `not-donustur` | 4lük sistemi 100lük sisteme çevirme; gano hesaplama; harf notu kaç puan | 0 (ifade) | Haziran, Ocak | Öğrenci | YÖK dönüşüm tablosu; `not-ortalamasi` ile çapraz link. Z1 |
| S13 | **Finalden Kaç Almalıyım** | `finalden-kac-almaliyim` | finalden kaç almalıyım; vize final ortalama hesaplama; dersi geçmek için kaç lazım | 0 (ifade; Ocak/Haziran'da yükselir) | Ocak, Haziran | Öğrenci | Saf JS. Z1 |
| S14 | **APA / MLA Kaynakça Oluşturucu** | `kaynakca-olustur` | apa kaynakça oluşturma; kaynakça nasıl yazılır; apa 7 kaynak gösterme | 1 | Mayıs, Aralık (ödev) | Öğrenci | Saf JS; `kapak-sayfasi-olustur` ile aynı kitle. Z2 |
| S15 | **QR Menü / Fiyat Listesi Oluşturucu (PDF)** | `qr-menu-olustur` | qr menü oluşturma; menü tasarlama; fiyat listesi şablonu | 0 (ifade) | Yaz (kafe sezonu) | Esnaf | pdf-lib + `qr-kod`; ajans CTA (menü sitesi). Z2 |
| S16 | **Vardiya / Nöbet Çizelgesi Oluşturucu** | `vardiya-cizelgesi` | vardiya çizelgesi; nöbet çizelgesi hazırlama; vardiya listesi excel | 0 | Yıl boyu | Esnaf/memur | `ders-programi-olustur` motoru + SheetJS. Z2 |
| S17 | **Klima / Elektrikli Alet Tüketim Hesaplama (kWh → TL)** | `elektrik-tuketim-hesapla` | klima elektrik tüketimi; kombi doğalgaz tüketimi; elektrikli ısıtıcı saatlik maliyet | 0 | Temmuz–Ağustos, Aralık–Şubat | Herkes | Tarife parametre (kullanıcı girer). Z1 |
| S18 | **Davetiye / Afiş Oluşturucu (düğün, nişan, sünnet, mevlit)** | `davetiye-olustur` | davetiye hazırlama; düğün davetiyesi örneği; sünnet davetiyesi | 0 (ifade) | Yaz | Herkes | `sosyal-medya-gorsel` motoru; ajans CTA. Z2 |
| S19 | **Etiket / Adres Etiketi / Raf Etiketi A4 (toplu)** | `etiket-olustur` | etiket şablonu; adres etiketi yazdırma; raf etiketi | 0 | Yıl boyu | Esnaf | pdf-lib + `barkod-olustur`. Z2 |
| S20 | **Kurban Hisse / Bayram Harçlığı Hesaplama** | `kurban-hisse-hesapla` | kurban hisse hesaplama; kurban payı bölüşme | 2 (Haziran'da ×30) | Kurban Bayramı öncesi | Herkes | Saf JS; tarafsız dil. Z1 |

**Elenenler (ölçüldü, ~0 ve niş):** harcırah, kasa sayım, hediye eşleştirme, karne notu hesaplama, sınıf geçme, e-okul ortalama.

**Önerilen ilk 16 (sıra):** S1 net-hesaplama, S2 memur-maas-hesapla, S3 ogretmen-maas-hesapla, S4 harc-hesapla, S5 takdir-tesekkur-hesapla, S11 yuzdelik-dilim-hesapla, S12 not-donustur, S13 finalden-kac-almaliyim, S6 emekli-ikramiyesi-hesapla, S7 bagkur-primi-hesapla, S14 kaynakca-olustur, S10 kyk-borc-hesapla, S8 kira-stopaj-hesapla, S9 vade-farki-hesapla, S17 elektrik-tuketim-hesapla, S15 qr-menu-olustur.
Mevsim takvimi: **Aralık–Ocak** S2, S3, S4, S6, S7, S5, S13 hazır olmalı; **Mayıs** S1, S11; **Haziran** S20, S5; **Eylül** S10, S3.

## 5. Sonraki doğrulama
Yayından 30 gün sonra Search Console'daki gerçek gösterim/tıklama ile bu tablo güncellenir. Özellikle: resim araçlarının farklı ifadelerle toplam talebi, "pdf imzalama" alternatif ifadeleri, brüt-net için "maaş hesaplama" geniş terimi.
