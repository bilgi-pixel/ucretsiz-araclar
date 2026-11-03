# Pazar Araştırması ve Araç Önceliklendirme

Tarih: 2026-11-03. Kapsam: `docs/PLAN.md`'deki 12 araca **ek** online araç adayları, rakip taraması, Türkiye'ye özgü fırsatlar, hesaplayıcılar.

## 0. Yöntem ve veri güvenilirliği (önce bunu okuyun)

- Web taraması yapıldı, ama **arama hacmi (aylık sorgu) verisine ulaşılamadı**: ücretsiz kaynaklarda araç bazlı TR hacmi yok. Bu belgedeki "tahmini talep" (yüksek/orta/düşük) bir **tahmindir**; gerekçesi yanında yazılı (niyet netliği, evrensellik, mevsimsellik, rakip yoğunluğu). Kesinleştirmek için: Google Search Console (yayınlanınca), Keyword Planner, Google Trends (TR filtresi) ile ilk 20 sorgu elle doğrulanmalı. Bunu Faz 2 başında yapın; sıralama değişebilir.
- Rakip limitleri çoğunlukla **üçüncü taraf karşılaştırma sitelerinden** geliyor ve kendi aralarında çelişiyor. Güvenilirlik sütununda işaretlendi: **[R]** resmi kaynakta gördüm, **[3T]** üçüncü taraf, **[?]** doğrulayamadım/genel bilgi. Yayına girecek bir karşılaştırma sayfasında rakam yazmadan önce rakibin kendi sayfasından teyit edin.
- Kurum şartnamelerindeki sayılar (e-Devlet/ÖSYM fotoğraf KB sınırı vb.) **kaynaklar arasında tutarsız**; rehberlerde sabit rakam yazmayın, "başvuru ekranındaki uyarıyı kontrol edin" + ön ayar butonları kullanın (bkz. §4).
- Kütüphane lisansları bilgi tabanımdan; **eklemeden önce paketin güncel lisansını `LICENSE` dosyasından teyit edin** (CLAUDE.md kuralı: yalnızca MIT/BSD/Apache).

---

## 1. Rakip tablosu

| Site | Araç sayısı | Dosya sunucuya yükleniyor mu? | Ücretsiz limitler | TR dil | Zayıf noktası (bizim fırsat) |
|---|---|---|---|---|---|
| **iLovePDF** | ~25+ (kendi beyanı) [3T] | **Evet** (sunucuda işlenir; arşivler ~2 saat sonra silinir [3T]) | Araca göre ayda ~1–25 belge, dosya başı ~15–200 MB, sonrası ücretli [3T, çelişkili] | Var | Yükleme zorunlu → gizlilik; limit duvarı; hesap/premium yönlendirmesi |
| **Smallpdf** | ~30 (kendi beyanı) [3T] | **Evet** (dosya 1 saat tutulur [R: kendi blogu]) | Ücretsiz günde ~**2 görev** [3T, çoğu kaynak], dosya boyutu sınırı; 7 gün deneme | Var (`/tr/` blogu aktif, "pdf 1 mb yapma" rehberi var) | En sert günlük limit → "limitsiz ücretsiz PDF" mesajı çok güçlü; TR rehber kümesi var, rekabetli |
| **PDF24 Tools** | ~30–40 (tahmin) [?] | **Evet** (web araçları kendi sunucularında işler [R]); **Windows masaüstü "Creator" çevrimdışı** [R] | Kendi beyanı: web araçları kısıtsız, reklamla finanse [R] | Var (`/tr/pdf-kucultme` vb.) | Gerçek rakibimiz: ücretsiz + limitsiz + TR. Zayıf: yükleme, eski arayüz, macOS masaüstü yok [R], tarayıcıda yerel işleme yok |
| **Convertio** | Format dönüştürücü (300+ format) [?] | **Evet** | Tek dosya 100 MB, günde 10 *dönüşüm dakikası*, aynı anda 2 dönüşüm [R: kendi şartları]; birçok site "günde 10 dönüşüm" yazıyor ama resmi metinle çelişiyor | Kısmi | Kuyruk/hız, hesap teşviki; PDF düzenleme yok |
| **TinyWow** | Çok geniş (yüzlerce, AI+PDF+görsel) [?] | **Büyük çoğunlukla Evet** [?] | "Kayıtsız ücretsiz" iddiası; AI araçlarında kredi/kota [?] | Sınırlı/yok [?] | Reklam yoğun, AI/spam algısı; güven sorunu. **Bu satır doğrulanmadı.** |
| **123apps** (123apps.com) | Ses/video/PDF/Dosya ~50 [?] | Birçok aracı tarayıcıda işlediğini söylüyor [?]; PDF araçlarında karışık | Ücretsiz; reklam gösterimi [?] | Var (çoklu dil) [?] | Gizlilik iddiası tutarsız, TR içerik zayıf. **Doğrulanmadı.** |
| **Canva ücretsiz araçlar** | Düzinelerce (resim/PDF/video, genelde `canva.com/tr/araclar`) [?] | Evet (bulut) | Ücretsiz sürümde birçok özellik (arka plan kaldırıcı, vb.) **Pro** | Var | Hesap zorunlu, bulut; "hızlı tek iş" için ağır; Pro duvarı |
| **Jotform PDF araçları** (TR) | Birkaç | Evet | ~30 MB dosya [3T] | Var | Kayıt/form ürününe yönlendirme |
| **hemenhesap.com/resim-kucultme** (TR) | Hesaplayıcı + birkaç araç | **Hayır, tarayıcıda** iddiası [3T] | Ücretsiz | TR | **En yakın TR rakip fikir olarak**; sade, ama içerik/rehber derinliği sınırlı olabilir [?] |
| **tamindir / webtekno rehberleri** (TR) | Rehber siteleri | — | — | TR | Araç değil, "4Dots gibi masaüstü program indirin" öneriyorlar → **online+yerel araç boşluğu** |
| **Çok sayıda küçük TR/EN klon siteler** (ör. imresizer, imageonline.co, passportphotosnap TR sayfası) | 1–10 | Karışık | Genelde ücretsiz, reklamlı | Bazı TR sayfalar | Çoğu "tam KB hedefi" sayfası var; **hedef-KB niş sorgularda rekabet var ama TR içerik kalitesi düşük** |

Not: "pdfdonustur", "resimkucult" gibi adlandırılmış TR siteleri aramada doğrudan çıkmadı; TR SERP'inde ağırlık PDF24, Smallpdf, iLovePDF, ve alt sayfalar. Kullanıcı kendi rakip listesindeki bu siteleri elle SERP'te kontrol etmeli.

**Sonuç — konumlama:** (1) "Dosya yüklenmez" gerçek ve rakiplerin çoğunda yok (PDF24 web, iLovePDF, Smallpdf, Convertio yüklüyor). (2) Smallpdf'in günde 2 görev limiti en büyük açık; "limitsiz, kayıtsız" vurgusu. (3) TR'ye özgü kullanım senaryoları (e-Devlet, ÖSYM, biyometrik) için büyük rakipler genel içerik üretiyor; **niş TR rehber + ön ayarlı araç** kazanma alanı.

---

## 2. Aday araç listesi (50 araç)

Sütunlar: **Talep** tahmini (Y/O/D + gerekçe) · **İstemci** (Evet/Kısmen/Hayır + kütüphane) · **Z** zorluk 1–5 · **Risk** AdSense/politika.
`PLAN.md`'deki 12 araç hariçtir. Hesaplayıcılar bu listede kısaca yer alır, detay §5'te.

### 2.1 PDF araçları

| # | Araç | Slug | TR hedef aramalar | Talep | İstemci | Z | Risk |
|---|---|---|---|---|---|---|---|
| 1 | PDF Sayfa Döndür | `pdf-dondur` | pdf döndürme; pdf sayfa çevirme; pdf'i yan çevirme; pdf rotate | **O** — taranmış belge yan çıkınca sık ihtiyaç, düşük rakip derinliği | Evet — pdf-lib (MIT) | 1 | Yok |
| 2 | PDF Sayfa Düzenle/Sırala (küçük resimlerden sürükle, sil, çevir) | `pdf-sayfa-duzenle` | pdf sayfa sıralama; pdf sayfa silme; pdf sayfa düzenleme; pdf sayfa yerini değiştirme | **Y** — "pdf düzenle" genel niyeti büyük, bu alt kümesi yapılabilir | Evet — pdf.js (Apache-2.0, önizleme) + pdf-lib | 3 | Yok (PLAN #3 "böl/sil" ile örtüşen kısmı: onu bu araca katıp tek güçlü sayfa yapmak düşünülebilir) |
| 3 | PDF'e İmza Ekle (çiz/görsel yükle/yaz) | `pdf-imzala` | pdf imzalama; pdf'e imza ekleme; pdf imza atma; ıslak imza pdf | **Y** — evrak/sözleşme/başvuru; "pdf imzala online" rakipler limitli | Evet — pdf.js + pdf-lib + canvas (**e-imza değil**, sayfada açık yazılacak) | 3 | Düşük: "e-imza/yasal geçerli" iddiası yok; "görsel imza" denmeli |
| 4 | PDF Sayfa Numarası Ekle | `pdf-sayfa-numarasi` | pdf sayfa numarası ekleme; pdf'e sayfa numarası koyma | **O** — tez/rapor öğrencileri, mevsimsel (dönem sonu) | Evet — pdf-lib | 1 | Yok |
| 5 | PDF'e Filigran/Damga Ekle (metin/logo) | `pdf-filigran-ekle` | pdf filigran ekleme; pdf'e logo ekleme; pdf damga | **O** | Evet — pdf-lib | 2 | Düşük (yalnızca *ekleme*; "kaldırma" yapılmaz) |
| 6 | PDF Şifrele (açma şifresi koy) | `pdf-sifre-ekle` | pdf şifreleme; pdf şifre koyma; pdf'e parola ekleme | **O** | Kısmen — pdf-lib şifrelemeyi desteklemiyor; QPDF-WASM veya `@cantoo/pdf-lib` fork (MIT) denenmeli, **lisans+boyut teyidi gerek** | 4 | Yok |
| 7 | PDF Şifresini Kaldır (**şifre biliniyorsa**) | `pdf-sifre-kaldir` | pdf şifre kaldırma; pdf şifresini kaldır; pdf kilidi açma | **Y** — çok aranan; ama kırma beklentisi kitlesi var | Kısmen — aynı kütüphane sorunu | 4 | **Orta**: "şifre kırma" beklentisi; sayfada "yalnızca şifreyi biliyorsanız" ve kırma yok diye yazılmalı |
| 8 | PDF'den Metin Çıkar (.txt) | `pdf-metin-cikar` | pdf'den yazı kopyalama; pdf metin çıkarma; pdf'i txt'ye çevirme | **O** | Evet — pdf.js | 2 | Yok |
| 9 | PDF Kırp (kenar boşluğu/sayfa kutusu) | `pdf-kirp` | pdf kırpma; pdf kenar boşluğu silme; pdf crop | **D–O** | Evet — pdf-lib (CropBox) | 2 | Yok |
| 10 | PDF Karart (hassas bilgi gizle; sayfayı resme çevirerek *gerçekten* siler) | `pdf-karart` | pdf'de bilgi gizleme; pdf karartma; tc no gizleme pdf | **O** — KVKK/başvuru belgeleri; tehlike: sahte karartma ile bilgi sızar | Evet — pdf.js raster + pdf-lib | 3 | Düşük (sayfada "metin seçilemez hale gelir" net yazılmalı) |
| 11 | Belge Tarayıcı (telefon kamerasıyla çek → PDF) | `belge-tarayici` | belge tarama online; telefonla pdf tarama; kamera ile pdf | **Y** — mobil trafik; "Tara→PDF" uygulama aramalarını yakalar | Evet — getUserMedia + canvas + pdf-lib; kenar bulma için basit JS/OpenCV.js (Apache-2.0, ağır) opsiyonel | 3 | Düşük (kamera izni; veriler cihazda — doğru) |
| 12 | Metinden/HTML'den PDF (TXT→PDF, yazı yapıştır → PDF) | `metinden-pdf` | txt pdf çevirme; yazıyı pdf yapma; not defterinden pdf | **D–O** | Evet — pdf-lib + font gömme (Türkçe karakter için TTF gömmek gerek) | 2 | Yok |
| 13 | PDF Görüntüleyici (tarayıcıda aç, arama, yakınlaştır) | `pdf-ac` | pdf açma online; pdf okuyucu; pdf görüntüleyici | **O–Y** — niyet "dosya açamıyorum"; PDF24/Smallpdf güçlü | Evet — pdf.js | 2 | Yok |
| 14 | PDF'den Tabloya (Excel/CSV) — *beta* | `pdf-excel` | pdf'den excel'e çevirme; pdf tablo çıkarma | **Y** — çok aranır; ama kalite düşük kalır | **Kısmen** — pdf.js metin koordinatı + sezgisel satır/sütun; taranmış PDF'te OCR gerekir; SheetJS (Apache-2.0, kaynağı sabitle) | 5 | **Orta**: "mükemmel dönüşüm" iddiası yasak, beta rozeti şart |
| 15 | PDF'i Sıkıştırmadan Boyut/Meta Bilgisi, Meta Temizle | `pdf-meta-temizle` | pdf özellikleri silme; pdf meta veri temizleme | **D** | Evet — pdf-lib | 1 | Yok |
| 16 | PDF'i Gri Tonlama / Siyah-Beyaz Yap | `pdf-gri-tonlama` | pdf siyah beyaz yapma; pdf gri tonlama | **D–O** (yazıcı mürekkebi niyeti) | Evet — pdf.js raster → canvas → pdf-lib (metin kaybolur, açıkça yazılır) | 2 | Yok |
| 17 | Excel/PPT → PDF | — | excel pdf çevirme | Y | **Hayır** (tarayıcıda güvenilir render yok; LibreOffice-WASM lisansı MPL/LGPL, ağır) | — | "Yapma" listesi |

### 2.2 Görsel araçları

| # | Araç | Slug | TR hedef aramalar | Talep | İstemci | Z | Risk |
|---|---|---|---|---|---|---|---|
| 18 | **Biyometrik / Vesikalık Fotoğraf** (35×45, 50×60, KB hedefli, kılavuz çerçeve) | `biyometrik-fotograf` | biyometrik fotoğraf boyutu; vesikalık fotoğraf hazırlama online; fotoğrafı 50 kb yapma; pasaport fotoğrafı ölçüleri; ösym fotoğraf boyutu | **Y** — her sınav/başvuru/vize sezonunda zirve; mevcut sonuçlar genel/pazarlamalı | Evet — Canvas, kırpma + sıkıştırma (`resim-kucult` motoru) | 2 | Düşük: resmi kabul garantisi **vermeyin**; "kurum şartnamesini kontrol edin" |
| 19 | Resim Boyutlandır & Kırp (px/cm/%; oran kilitli) | `resim-boyutlandir` | resim boyutlandırma; fotoğraf kırpma; resim boyutunu değiştirme; fotoğraf px ayarlama | **Y** — evrensel, yüksek niyet | Evet — Canvas | 2 | Yok |
| 20 | Resim Format Dönüştür (JPG↔PNG↔WebP) | `resim-donustur` | png jpg çevirme; webp jpg çevirme; jpg png yapma; resim dönüştürücü | **Y** — "webp jpg" TR'de sürekli aranır (siteler WebP verdiği için) | Evet — Canvas | 1 | Yok |
| 21 | **Resimden Yazıya (OCR)** | `resimden-yaziya` | resimden yazıya çevirme; ocr online türkçe; fotoğraftan yazı kopyalama; taranmış pdf yazıya çevirme | **Y** — "OCR TR" talebi yüksek, çoğu rakip yükleme yapıyor | Evet — tesseract.js (Apache-2.0) + `tur` eğitim verisi (Apache-2.0) **vendor'a kopyalanmalı** (CDN yok); ilk yüklemede ~10–20 MB veri, doğruluk orta | 3 | Yok. "Doğruluk %100 değil" yazılmalı |
| 22 | Arka Plan Kaldır | `arka-plan-kaldir` | arka plan silme; resim arka planını kaldırma; png şeffaf yapma | **Y** — çok yüksek ama rekabet çok (Canva, remove.bg) | **Kısmen** — MediaPipe Selfie Segmentation (Apache-2.0) insan için; genel nesne için U²-Net ONNX (Apache-2.0) + onnxruntime-web (MIT). **`@imgly/background-removal` AGPL → yasak**; RMBG modelleri ticari lisans sorunlu | 4 | Düşük; model dosyası vendor + lisans notu |
| 23 | Resim Döndür / Çevir (flip) | `resim-dondur` | resim döndürme; fotoğraf çevirme; resim aynalama | **D–O** | Evet — Canvas | 1 | Yok |
| 24 | Resme Yazı/Filigran Ekle | `resme-yazi-ekle` | resme yazı yazma; fotoğrafa filigran ekleme; resme logo ekleme | **O** | Evet — Canvas | 2 | Düşük |
| 25 | GIF Oluştur (resimlerden) | `gif-olustur` | gif yapma; resimden gif; gif oluşturucu | **O** — sosyal medya, evrensel | Evet — gifenc (MIT) | 3 | Yok |
| 26 | Favicon/İkon Oluştur (ICO, PNG setleri) | `favicon-olustur` | favicon oluşturma; ico dönüştürücü; png ico çevirme | **O** (web yöneticisi kitlesi, ajans CTA uyumlu) | Evet — Canvas + ICO yazıcı (basit) | 2 | Yok |
| 27 | SVG → PNG/JPG | `svg-png` | svg png çevirme; svg jpg dönüştürme | **O** | Evet — Canvas | 1 | Yok |
| 28 | EXIF/Konum Bilgisi Temizle | `exif-temizle` | fotoğraf konum bilgisi silme; exif silme; meta veri temizleme | **D–O** (gizlilik içeriği paylaşılır) | Evet — Canvas ile yeniden kodlama | 1 | Yok |
| 29 | Resimleri Birleştir (yan yana/alt alta, kolaj) | `resim-birlestir` | iki fotoğrafı birleştirme; resim birleştirme | **O** | Evet — Canvas | 2 | Yok |
| 30 | Renk Seçici / Resimden Renk Paleti | `renk-secici` | resimden renk kodu bulma; hex renk seçici | **D–O** | Evet — Canvas | 1 | Yok |
| 31 | HEIC → JPG (iPhone) | `heic-jpg` | heic jpg çevirme; iphone fotoğraf jpg yapma | **Y** — çok aranan, rakipler çoğunlukla yükler | **Hayır şimdilik** — decoder'lar (libheif) LGPL; `heic2any` (MIT) paketi libheif gömer → CLAUDE.md lisans kuralına takılır. Lisans kararı netleşirse (hukuki görüş) yeniden değerlendirilir | 3 | Lisans riski |

### 2.3 Ses/video/ekran (yalnızca saf tarayıcı API'siyle)

| # | Araç | Slug | TR hedef aramalar | Talep | İstemci | Z | Risk |
|---|---|---|---|---|---|---|---|
| 32 | Ekran Kaydedici | `ekran-kaydedici` | ekran kaydı alma online; bilgisayar ekran kaydı; ekran kaydedici ücretsiz | **Y** — yaygın ihtiyaç (Windows'ta gömülü var ama bilinmiyor) | Evet — getDisplayMedia + MediaRecorder (WebM çıkışı) | 2 | Düşük (izin diyaloğu tarayıcıdan) |
| 33 | Ses Kaydedici (mikrofon) | `ses-kaydedici` | online ses kaydı; mikrofon testi; ses kaydetme | **O** | Evet — MediaRecorder | 1 | Yok |
| 34 | Mikrofon/Kamera Testi | `kamera-test` | kamera testi; mikrofon testi online | **O–Y** — toplantı öncesi acil niyet, yüksek tekrar | Evet — getUserMedia | 1 | Yok |
| 35 | Yazıyı Sese Çevirme (TTS) | `yaziyi-sese-cevir` | yazıyı sese çevirme; metin okuma türkçe | **O–Y** | **Kısmen** — Web Speech `speechSynthesis` (cihaz sesleri; bazı tarayıcılarda sunucu sesi → gizlilik uyarısı); kalite cihaza bağlı | 1 | Orta: ağ kullanan sesler "dosya çıkmaz" vaadini bozabilir; yerel ses seçilmeli, uyarı yazılmalı |
| 36 | Videodan GIF / Video Sıkıştır / MP4→MP3 | — | video küçültme, mp4 mp3 | Y | **Hayır** — ffmpeg.wasm LGPL/GPL, lamejs LGPL; WebCodecs ile sınırlı biçim | — | "Yapma" listesi |

### 2.4 Yazı / kodlama / yardımcı

| # | Araç | Slug | TR hedef aramalar | Talep | İstemci | Z | Risk |
|---|---|---|---|---|---|---|---|
| 37 | Sayıyı Yazıya Çevirme (yazıyla tutar, TR) | `sayi-yaziya-cevir` | sayıyı yazıya çevirme; rakamı yazıya çevir; tutar yazıyla; çek yazıyla | **Y** — muhasebe/fatura/çek/senet, evrensel, TR'ye özgü (sayıların Türkçe okunuşu) | Evet — saf JS (TR kural tabanı) | 1 | Yok |
| 38 | Çekiliş / Rastgele İsim Seçici / Çarkıfelek | `cekilis` | çekiliş yapma; rastgele isim seçici; çarkıfelek; instagram çekiliş | **Y** — sosyal medya çekilişleri çok; viral | Evet — saf JS + WebCrypto rastgelelik | 2 | **Düşük–orta**: kumar/bahis çağrışımı olmamalı; "tesadüfi, denetlenebilir kod" notu |
| 39 | Rastgele Sayı Üretici / Zar / Yazı-Tura | `rastgele-sayi` | rastgele sayı üretme; zar atma; yazı tura | **O** | Evet | 1 | Yok |
| 40 | Metin Karşılaştır (diff) | `metin-karsilastir` | iki metni karşılaştırma; metin farkı bulma; diff online | **O** | Evet — jsdiff (BSD-3-Clause) | 2 | Yok |
| 41 | Barkod Oluşturucu (EAN/Code128) | `barkod-olustur` | barkod oluşturma; ean13 barkod; kod128 | **O** — esnaf kitlesi, kalıcı | Evet — JsBarcode (MIT) | 2 | Yok |
| 42 | QR Kod Okuyucu (görselden/kameradan) | `qr-kod-oku` | qr kod okuma; qr kod tarama online | **Y** — PC'de QR okuma ihtiyacı sık | Evet — jsQR (Apache-2.0) | 2 | Yok (phishing uyarısı: açmadan URL'yi göster) |
| 43 | CSV ↔ Excel (XLSX) Dönüştür | `csv-excel` | csv excel çevirme; csv'yi excel'e dönüştürme; excel csv | **O–Y** — Türkçe karakter/ayraç (noktalı virgül) sorunu klasik TR acısı | Evet — SheetJS CE (Apache-2.0; hangi paketten alındığını sabitle) | 2 | Yok |
| 44 | JSON Biçimlendir / Doğrula | `json-bicimlendir` | json düzenleme; json formatlama; json validator | **O** (geliştirici kitlesi, RPM yüksek) | Evet — saf JS | 1 | Yok |
| 45 | Markdown Önizleme | `markdown-onizleme` | markdown editör online; md önizleme | **D** | Evet — marked (MIT) | 1 | Yok |
| 46 | Geri Sayım / Kronometre / Pomodoro | `zamanlayici` | online kronometre; geri sayım sayacı; pomodoro | **Y** (ama rekabet yüksek, sürekli açık sayfa → reklam görüntüleme yüksek) | Evet | 1 | Yok |
| 47 | Birim Dönüştürücü (uzunluk, ağırlık, KB↔MB, sıcaklık) | `birim-donustur` | birim çevirici; kb mb çevirme; inç cm çevirme | **Y** — evrensel, dayanıklı | Evet | 2 | Yok |
| 48 | Dosya Hash (SHA-256) Hesapla | `dosya-hash` | dosya hash hesaplama; sha256 hesaplama; md5 | **D** | Evet — WebCrypto (MD5 yok, yazılmalı) | 1 | Yok |
| 49 | Lorem Ipsum / Türkçe Örnek Metin | `lorem-ipsum` | lorem ipsum oluşturucu | **D** | Evet | 1 | Yok |
| 50 | Hesaplayıcılar paketi (KDV, yaş, kıdem, IBAN, TC doğrulama…) | `hesapla/*` | bkz. §5 | **Y** (aşağıda) | Evet — saf JS | 1–3 | Bkz. §5 |

---

## 3. Önerilen sıra

### 3.1 PLAN.md sıralamasına eleştiri

1. **`pdf-kucult` (#5) ve `resim-kucult` (#8) Faz 2'nin sonunda değil, Faz 1'in hemen arkasında olmalı.** TR'de "pdf küçültme / boyut düşürme / resim KB küçültme" e-Devlet, okul, ÖSYM, iş başvurusu yüzünden en sürekli talep gören sorgu ailesi; bizim "yükleme yok" vaadi tam burada işe yarar. Bu iki araç aynı zamanda §4'teki bütün TR niş sayfalarının motoru.
2. **`pdfden-worde` (#6) ve `wordden-pdfe` (#7) Faz 2'nin ilk yarısında çok erken.** Talepleri yüksek ama tarayıcıda kalite düşük kalır; hayal kırıklığı + AdSense "yanıltıcı vaat" riski. Öneri: Faz 2'nin sonuna kaydır; önce hafif çözümler (`pdf-metin-cikar`, `resimden-yaziya`) yayına girsin, sonra "beta" ile çık. (PLAN zaten beta yazıyor; sıra yine de yukarı çekilmemeli.)
3. **`zip` (#9) ve `sifre-uret` (#11) değer/emek oranı düşük.** Zip sorgularının büyük kısmı "rar açma" (biz yapamıyoruz) → hayal kırıklığı/hemen çıkma. `sifre-uret` zaten çok kalabalık bir alan. İkisi de Faz 3 sonu.
4. **`qr-kod` (#10) Faz 2'ye çekilsin:** talep yüksek, zorluk 1–2, "Wi-Fi QR" gibi sevilen alt sayfalar var.
5. **Hesaplayıcılar Faz 3 değil Faz 2'ye (paralel) alınmalı.** Her biri 1–2 günlük iş, içerik üretim maliyeti (800+ kelime) asıl maliyet. Evergreen + yıllık güncellenen sayfalar AdSense başvurusu için "≥9 araç sayfası" eşiğini hızla doldurur ve içerik derinliği için rehber kümesi doğal. Uyarı: yıllık parametreler (asgari ücret, kıdem tavanı, KDV oranı) tek bir `parametreler` dosyasında tutulmalı.
6. **Eksik:** `biyometrik-fotograf`, `resim-boyutlandir`, `resim-donustur`, `resimden-yaziya` (OCR) — PLAN'daki hiçbir satır bunları karşılamıyor ve hepsi TR'de yüksek talepli. En azından ilk üçü Faz 2 başına konmalı.
7. **AdSense başvurusu için ≥9 araç** yeterli, ama sayfa başına özgün 800+ kelime yükü yüksek: yeni araçları "motor paylaşan" gruplamak (resim: boyutlandır/dönüştür/biyometrik aynı Canvas modülü) üretim maliyetini düşürür; sayfa içerikleri yine ayrı olmalı (kopya içerik yasak).

### 3.2 İlk 10 (yeni adaylar; PLAN'dakilere ek)

Ölçüt: TR talep × (1/zorluk) × rekabet boşluğu × mevcut motorlarla örtüşme.

| Sıra | Araç | Neden |
|---|---|---|
| 1 | `biyometrik-fotograf` (#18) | TR'ye özgü, mevsimsel zirveleri var (sınav, vize, başvuru); Canvas, zorluk 2; büyük rakipler genel içerik üretiyor; sonraki 10 rehber sayfasının çekirdeği |
| 2 | `resim-boyutlandir` (#19) | Evrensel, yüksek niyet; biyometrik ile aynı motor, maliyeti ~0 |
| 3 | `resim-donustur` (#20) | "webp jpg / png jpg" kalıcı yüksek hacim; zorluk 1 |
| 4 | `resimden-yaziya` (#21, OCR) | "ocr türkçe" yüksek talep; yükleyen rakipler çoğunlukta → gizlilik farkı; Apache lisanslı tesseract.js. İlk yükleme boyutu/performans testi gerekli |
| 5 | `pdf-imzala` (#3) | "pdf imzalama" yüksek niyet; Smallpdf'in 2 görev/gün limiti tam burayı vuruyor |
| 6 | `pdf-sayfa-duzenle` (#2, +döndür) | PDF'de "düzenle" niyetinin yapılabilir alt kümesi; `pdf-dondur` ayrı bir kolay sayfa olarak da yayınlanabilir (#1) |
| 7 | `sayi-yaziya-cevir` (#37) | Zorluk 1, TR'ye özgü (dil kuralları), muhasebe kitlesi; düşük rekabet derinliği |
| 8 | KDV hesaplama (§5) | Zorluk 1, evergreen, hesaplayıcı eşiği; AdSense dostu |
| 9 | `pdf-sayfa-numarasi` (#4) + `pdf-filigran-ekle` (#5) | pdf-lib ile 1 günlük iş; tez/rapor sezonu |
| 10 | `qr-kod-oku` (#42) + QR oluşturucuyla çapraz bağlantı | PC'de QR okuma ihtiyacı yaygın; Apache lisanslı jsQR; PLAN #10 ile sinerji |

### 3.3 Sonraki 10

1. `pdf-sifre-ekle` / `pdf-sifre-kaldir` (#6, #7) — lisans/kütüphane kararı (QPDF-WASM / fork) verildikten sonra; "kırma yok" metniyle.
2. `belge-tarayici` (#11) — mobil trafik.
3. `ekran-kaydedici` (#32) — yüksek niyet, sıfır rakip yükleme sorunu.
4. `cekilis` (#38) — viral potansiyel; politika dil kontrolü.
5. `kamera-test` (#34) ve `ses-kaydedici` (#33) — ucuz, tekrar ziyaret eden trafik.
6. `csv-excel` (#43) — TR ayraç/UTF-8 sorunu çözümü ile fark yaratır.
7. `pdf-metin-cikar` (#8) + `pdf-ac` (#13).
8. `pdf-karart` (#10) — KVKK konumlaması (gerçek karartma).
9. `gif-olustur` (#25), `favicon-olustur` (#26), `svg-png` (#27) — ajans CTA (web tasarımı) ile uyumlu kitle.
10. Kıdem tazminatı, IBAN doğrulama, TC kimlik algoritma (§5) — veri bakımı gerektirenler sona.

Diğerleri (orta/düşük): #9, #12, #15, #16, #23, #24, #28–#31 (HEIC hariç), #39–#49.

### 3.4 "Yapma" listesi

**İlke (sahip kararı, 2026-11-03):** Yasa dışı kullanıma hizmet edebilecek hiçbir araç yapılmaz. Yeni bir araç eklenmeden önce "kötüye kullanılırsa suç oluşturur mu?" sorusu sorulur; cevap evet ise araç ya yapılmaz ya da yalnızca doğrulama/koruma amaçlı biçimiyle yapılır.

| Ne | Sebep |
|---|---|
| YouTube/Instagram/TikTok indirici, video/ses "indir" araçları | AdSense yasaklı içerik (telif ihlali kolaylaştırma); zaten PLAN'da var |
| Filigran/watermark **kaldırıcı** (PDF/resim) | Telif ihlali; politika |
| PDF/Office **şifre kırıcı** (şifre bilinmiyorsa) | Hukuki/politika riski; yalnızca "şifre biliniyorsa kaldır" |
| **TC kimlik / IBAN / kredi kartı numarası üretici** (sahte ama geçerli) | Dolandırıcılık amaçlı kötüye kullanım; AdSense "sahte belge" riski. *Doğrulama* aracı yapılır (§5), üretici yapılmaz |
| **Sahte dekont / makbuz / sağlık raporu / fatura üretici** | Sahte belge → AdSense/yasal risk |
| MERNİS/NVİ **TC kimlik sorgulama (kimlik doğrulama servisi)** | Ağ çağrısı → "dosya/veri çıkmaz" vaadi bozulur; kişisel veri; yalnızca *algoritma kontrolü* yapılır |
| Video sıkıştır/MP4→MP3/GIF'ten video | ffmpeg.wasm (LGPL/GPL), lamejs (LGPL) → lisans kuralı; yeniden değerlendirilebilir |
| HEIC→JPG | Pratikte libheif (LGPL) gerekir; lisans kuralı ihlali, hukuki görüşle netleşirse yeniden aç |
| `@imgly/background-removal` | AGPL → yasak. Alternatif: MediaPipe / U²-Net (Apache) |
| Excel/PowerPoint→PDF, PDF→PowerPoint | Güvenilir tarayıcı içi render yok; kalite hayal kırıklığı |
| Sesten yazıya (Web Speech API STT) | Chrome'da ses Google sunucusuna gider → "dosya yüklenmez" rozeti yanlış olur |
| Döviz/altın/hava/namaz vakti araçları | Sürekli ağ/API gerekir; gizlilik ve masaüstü çevrimdışı kuralıyla çelişir |
| Sağlık tanı/doz/gebelik **tavsiyesi** veren hesaplayıcılar | AdSense hassas kategori; VKİ/ideal kilo bile bilgilendirici + "tıbbi tavsiye değildir" ile ve düşük öncelikle |
| Bahis/oran/şans oyunu hesaplayıcıları | AdSense kısıtlı içerik |
| "PC temizleyici/hızlandırıcı/sürücü güncelleyici" | PLAN'da zaten yasaklı |
| RAR açma | PLAN'da zaten; teknik+lisans (unrar) |

---

## 4. Türkiye'ye özgü uzun kuyruk fırsatları

**Kural:** Hiçbir sayfada kurumun KB/piksel sınırını "kesin" yazmayın. Taramada aynı sınav için 50–200 KB (çok kaynak), 240 KB, 500 KB, 1 MB gibi farklı rakamlar bulundu; ÖSYM'nin resmi 2026 YKS SSS belgesi fotoğraf güncelleme usulünü anlatıyor ama KB/piksel sınırı vermiyor. Rehber her sayfada resmî kılavuza/başvuru ekranına link vermeli ve aracı **ön ayarlı + elle düzenlenebilir** sunmalı (`?hedef=…`).

| Fırsat | Araç | Rehber sayfası önerisi |
|---|---|---|
| e-Devlet'e belge yüklerken "dosya boyutu çok büyük" | `pdf-kucult` ön ayar 1/2/5 MB (PLAN #5) | "e-Devlet'e PDF yüklerken boyut sınırı nasıl aşılır" — sınırı kullanıcıya sorar, rakam sabitlemez |
| ÖSYM AİS / KPSS / YKS / MSÜ başvuru fotoğrafı | `biyometrik-fotograf` (#18) + ön ayar "ÖSYM/AİS" | "ÖSYM başvuru fotoğrafı nasıl hazırlanır" (resmî kılavuza link; "50–200 KB gibi yaygın aralıklar" ifadesi *teyit edin* notuyla) |
| Biyometrik fotoğraf (TC kimlik/pasaport/ehliyet) ölçüleri | `biyometrik-fotograf` (35×45 / 50×60 mm; çözünürlük 300 dpi px hesabı) | "Biyometrik fotoğraf ölçüleri ve kurallar" — kaynaklarda 50×60 ve 35×45 farklı kurumlar için; ikisi için de sekme |
| Schengen/ABD vize fotoğrafı | `biyometrik-fotograf` | "Vize fotoğrafı ölçüleri" (ülkeye göre tablo; resmî kaynağa link) |
| KYK / GSB burs-yurt başvuru belgeleri tek PDF | `pdf-birlestir` (mevcut) + `pdf-kucult` | "KYK başvurusunda belgeleri tek PDF yapma" |
| Öğrenci belgesi / transkript PDF'i birleştirme, küçültme | `pdf-birlestir`, `pdf-kucult` | "Öğrenci belgesi PDF'ini birleştirme" |
| Banka dekontu / IBAN sorunları | `pdf-birlestir`, `pdfden-resme`, `pdf-karart` (IBAN/TC gizleme) | "Dekont PDF'ini resme çevirme / birleştirme"; "Dekontu paylaşırken bilgileri gizleme" (KVKK). **Sahte dekont üretici asla** |
| UYAP dilekçe ekleri / e-tebligat belgeleri (PDF zorunlu, boyut sorunu) | `pdf-kucult`, `pdf-birlestir`, `pdf-sayfa-duzenle` | "UYAP'a ek belge yüklemeden önce PDF'i hazırlama" (boyut sınırını UYAP ekranına göre doğrulayın) |
| SGK hizmet dökümü / barkodlu belge PDF'i, İŞKUR / okul kayıt belgesi | `pdf-sayfa-duzenle`, `pdf-kucult` | "Barkodlu belgeyi PDF'ten resme çevirme" |
| İş başvurusu CV (Kariyer.net vb. dosya sınırı) | `pdf-kucult`, `pdf-sifre-ekle` | "CV PDF boyutu nasıl küçültülür" |
| Telefondan belge tarama + imza | `belge-tarayici`, `pdf-imzala` | "Telefonla belge tarayıp PDF yapma ve imzalama" |
| Çek/senet/fatura tutarı "yazıyla" | `sayi-yaziya-cevir` | "Yazıyla tutar nasıl yazılır (kuruş, bin/milyon kuralları)" |
| Noter/tapu/kira sözleşmesi imza & parafı | `pdf-imzala` | "Kira sözleşmesine görsel imza ekleme (e-imza farkı)" |
| WhatsApp'a gidemeyen büyük dosya/fotoğraf | `resim-kucult`, `zip` (PLAN) | "WhatsApp'ta dosya boyutu sınırı ve küçültme" |
| Windows/Mac yerleşik yöntemlerle karşılaştırma ("Önizleme'de PDF birleştirme") | tüm PDF araçları | Dürüst alternatif rehberleri (PLAN §7.3) |

---

## 5. Hesaplayıcı araçlar (kısa)

Neden: zorluk 1–2; evergreen; AdSense dostu (YMYL dışı olanlar); yıllık sorgu zirveleri (zam dönemleri, vergi dönemi). Dikkat: **özgün 800+ kelime** (ör. formül açıklaması, örnek hesap, yasal dayanak, SSS); sayfa "ince içerik" olmamalı. **Bakım:** tüm oranlar/tavanlar `web/hesapla/parametreler.json` (tek dosya, tarih alanı) içinde; her Ocak ve Temmuz güncelleme görevi.

| Araç | Slug | Hedef aramalar | Talep | İstemci | Z | Notlar |
|---|---|---|---|---|---|---|
| KDV Hesaplama (dahil/hariç) | `kdv-hesapla` | kdv hesaplama; kdv dahil fiyattan kdv çıkarma; %20 kdv hesaplama | **Y** | Evet — saf JS | 1 | Oranlar (%1/%10/%20) kullanıcı seçsin; güncel oranı kaynak linkiyle teyit edin [?] |
| Yaş Hesaplama | `yas-hesapla` | yaş hesaplama; kaç yaşındayım; doğum tarihinden yaş | **Y** | Evet | 1 | Hicri/burç yan bilgi eklenebilir |
| Tarih Farkı / Gün Hesaplama | `tarih-farki` | iki tarih arası gün hesaplama; kaç gün kaldı | **Y** | Evet | 1 | İş günü seçeneği: resmî tatil takvimi yıllık güncelleme (dini bayramlar değişken) |
| Kıdem Tazminatı | `kidem-tazminati` | kıdem tazminatı hesaplama 2026; kıdem tazminatı tavanı | **Y** — zam/emeklilik/işten çıkarılma, zirveli | Evet | 2–3 | **Bakım gerektirir.** Taramada Ocak–Haz 2026 tavanı ≈ 64.948,77 TL (Habertürk/Milliyet); Temmuz–Aralık 2026 tavanı için kaynaklar çelişkili (bir hukuk blogu 73.729,84 TL yazıyor — **resmî duyuruyla teyit edilmeli**). "Tahmini hesap, hukuki tavsiye değil" notu şart |
| İhbar Tazminatı & Yıllık İzin Hesabı | `ihbar-tazminati`, `yillik-izin` | ihbar tazminatı hesaplama; yıllık izin hesaplama | **O–Y** | Evet | 2 | Aynı hukuki not |
| Brüt-Net Maaş (2026) | `brut-net-maas` | brüt net maaş hesaplama; asgari ücret net | **Y** — çok zirveli; **vergi dilimi/SGK/damga tabloları** karmaşık | Evet | 3 | 2026 asgari ücret: brüt 33.030 TL, net ≈ 28.075 TL (kaynaklarda kuruş farkı var) [3T]; kümülatif matrah hesabı hata riskini artırır → doğrulama testi şart |
| IBAN Doğrulama (TR, mod 97) + banka adı | `iban-dogrula` | iban doğrulama; iban kontrol; iban hangi banka | **Y** | Evet — saf JS; banka kodu tablosu statik (TCMB/EFT listesi; yıllık kontrol) | 2 | **Yalnızca doğrulama**, üretici yok; ağ çağrısı yok (hesap sahibi sorgusu YOK) |
| TC Kimlik No Algoritma Doğrulama | `tc-kimlik-dogrula` | tc kimlik no doğrulama; tc kimlik algoritması; tc kimlik geçerli mi | **O–Y** | Evet — 11 hane, 10. ve 11. hane kuralı | 1 | **"Kimlik kimin?" sorgusu değil**; başlıkta "algoritma kontrolü, MERNİS sorgusu değildir" yazılmalı; üretici yapılmaz |
| Yüzde Hesaplama | `yuzde-hesapla` | yüzde hesaplama; yüzde artış hesaplama; indirim hesaplama | **Y** | Evet | 1 | |
| Not Ortalaması / Ağırlıklı Ortalama / Vize-Final | `not-ortalamasi` | ortalama hesaplama; vize final ortalama; ağırlıklı ortalama | **Y** — dönem içi tekrar | Evet | 1 | |
| Faiz / Kredi Taksit / Mevduat Getirisi | `kredi-hesapla` | kredi hesaplama; taksit hesaplama; faiz hesaplama | **Y** | Evet | 2 | Finans tavsiyesi *vermez*, matematik hesaplar; reklam kategorisi yüksek RPM ama YMYL — açıklama ve uyarı şart |
| Zam Oranı / Enflasyon Farkı (tek seferlik hesap) | `zam-orani-hesapla` | zam oranı hesaplama; maaş zammı yüzde | **O–Y** | Evet | 1 | TÜFE verisi gömme → bakım; kullanıcı girişli bırak |
| Gün/Saat Hesap (çalışma süresi, mesai) | `mesai-hesapla` | fazla mesai hesaplama; çalışma saati hesaplama | **O** | Evet | 2 | Yıllık-izin gibi hukuki not |
| Roma Rakamı / Hicri-Miladi Tarih | `roma-rakami`, `hicri-miladi` | roma rakamı çevirme; hicri miladi çevirme | **D–O** | Evet — `Intl` + Hijri takvimi (ICU) | 1 | Resmî dini takvimle sapma notu |
| Burç Hesaplama | `burc-hesapla` | burcum ne; yükselen burç hesaplama | **O** (viral) | Evet — güneş burcu; yükselen için efemeris (ağır/kısmen) | 1–3 | "Eğlence" notu; astroloji AdSense'te sorun değil ama hassas iddia yok |
| Vücut Kitle İndeksi | `vki-hesapla` | vücut kitle indeksi hesaplama | **Y** | Evet | 1 | Sağlık → AdSense hassas; düşük öncelik, tıbbi tavsiye değildir |

---

## 6. Sonraki adımlar (önerilen)

1. İlk 10 + KDV için Search Console'u beklemeden Google Trends (TR) ile hızlı hacim kontrolü yapılsın (1 saat).
2. `resim-kucult` motorunu (PLAN #8) önce yap, sonra biyometrik/boyutlandır/dönüştür aynı modülden türesin.
3. `tesseract.js` ile TR OCR için boyut/performans denemesi (mobilde 15 MB indirme kabul edilebilir mi) — kısa bir spike.
4. QPDF-WASM / `@cantoo/pdf-lib` lisans ve boyut incelemesi (şifre ekle/kaldır için).
5. `parametreler.json` mimarisi ve Ocak/Temmuz güncelleme görevi tanımlansın.
6. Rakip rakamlarını (Smallpdf, iLovePDF, TinyWow, 123apps) yayına girecek karşılaştırma sayfaları öncesinde resmî sayfalardan tek tek doğrulayın; bu belgedeki [3T]/[?] işaretli satırlar teyide muhtaç.

## Kaynaklar (tarama sırasında bakılanlar)

- Smallpdf, iLovePDF, Capterra/karşılaştırma blogları: [Capterra – Smallpdf vs iLovePDF](https://capterra.com/compare/172606-173963/Smallpdf-vs-iLovePDF), [Smallpdf blog – dosya 1 saat tutulur](https://smallpdf.com/blog/how-to-delete-a-page-in-a-scanned-pdf-file), [temperstack Smallpdf planları](https://www.temperstack.com/plans/smallpdf/)
- PDF24: [tools.pdf24.org](https://tools.pdf24.org/), [PDF24 TR küçültme](https://Tools.pdf24.org/tr/pdf-kucultme)
- Convertio şartları: [convertio.co/terms](https://convertio.co/terms)
- TR resim küçültme: [hemenhesap](https://www.hemenhesap.com/hesap/resim-kucultme), [Jotform TR PDF küçültme](https://www.jotform.com/tr/pdf/compress/), [Webtekno rehberi](https://www.webtekno.com/pdf-boyut-dusurme-nasil-yapilir-h86454.html)
- Fotoğraf şartnameleri: [ÖSYM YKS SSS (2026)](https://dokuman.osym.gov.tr/pdfdokuman/2026/YKS/sss_yksd19022026.pdf), [kpss.digital belgeler](https://kpss.digital/kpss-basvuru/belgeler/), [Türkiye Sigorta – biyometrik fotoğraf](https://www.turkiyesigorta.com.tr/blog/yasam-diger/biyometrik-fotograf-nedir-olculeri-kac-olmalidir), [passport-photo.online TR](https://passport-photo.online/tr/biyometrik-fotograf)
- Asgari ücret / kıdem tavanı: [Habertürk – 2026 kıdem tavanı](https://www.haberturk.com/2026-kidem-tazminati-tavani-ne-kadar-oldu-kac-tl-ye-yukseldi-ne-zamandan-itibaren-gecerli-kimler-yararlanabilir-3851550), [Hukukçular Evi – 2026 hesaplama esasları](https://hukukcularevi.com/hukuk-gundemi/kidem-tazminati-tavani-2026-hesaplama-esaslari-memur-maas-katsayisi-isten-ayrilma-zamanlamasi/), [CNN Türk](https://www.cnnturk.com/ekonomi/kidem-tazminati-hesaplama-2026-asgari-ucret-sonrasi-kidem-tazminati-ne-kadar-oldu-2376202)
