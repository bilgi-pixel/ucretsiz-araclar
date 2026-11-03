# Üretim Sırası — Trafik Potansiyeline Göre (Yüksekten Düşüğe)

Tarih: 2026-11-04. Dayanak: [`ARASTIRMA.md`](ARASTIRMA.md), [`ARASTIRMA-2.md`](ARASTIRMA-2.md), [`PLAN.md`](PLAN.md).
Bu dosya **tek sıra**dır: PLAN'daki araçlar + iki turun adayları birlikte puanlandı. Ajanlar bu listeyi yukarıdan aşağı işler.

## Veri notu (dürüst)

- Google Trends otomatik erişime kapalı (429), ücretsiz TR hacim verisi bulunamadı. Tek sayısal ipucu küresel: "pdf to word" ≈ 4,0 M, "merge pdf" ≈ 1,7 M, "compress pdf" ≈ 1,6 M aylık (Ahrefs sayfası, Mayıs 2025, ülke belirsiz) [3T]. Bir araç sağlayıcısının kullanım raporunda en çok kullanılan araçlar: resim sıkıştırma > PDF sıkıştırma > resim boyutlandırma [3T, kendi verisi].
- Bu yüzden sıra **yargı**dır: TR niyet gücü × rakibin zayıflığı × kolaylık × mevsim. Yayından 30 gün sonra Search Console verisiyle yeniden sıralanır.
- Hesaplayıcı pazarı medya markalarında (Hürriyet, Milliyet, CNN Türk, Kariyer.net, hemenhesap). Hesaplayıcılar bu yüzden "yüksek talep" olsa da sırada aşağı çekildi; önce rakibin zayıf olduğu dosya araçları.

## Kademe A — Hemen başla (en yüksek trafik × kazanılabilirlik)

Her satır: araç · slug · neden · teknik · bağımlılık/not. Ajan: `tool-developer` (+ `seo-writer` metin, `qa-tester` test, `policy-reviewer` denetim).

| # | Araç | Slug | Neden burada | Teknik | Not |
|---|---|---|---|---|---|
| A1 | **PDF Küçült** (hedef KB/MB ön ayarlı) | `pdf-kucult` | TR'de en sürekli dosya niyeti (e-Devlet, okul, başvuru); küresel 3. büyük PDF sorgusu; rakipler yüklüyor/limitli | pdf.js raster + pdf-lib yeniden paketleme; kalite kaydırıcı; "hedef boyut" döngüsü | PLAN #5. Sayfa: e-Devlet/UYAP/KYK senaryoları. Rakam sabitleme yok |
| A2 | **Resim Küçült / KB'ye Düşür** (toplu) | `resim-kucult` | Kullanım raporlarında 1. sıra; biyometrik/başvuru/WhatsApp niyeti | Canvas, kalite ikili arama ile hedef KB | PLAN #8. A3–A5'in motoru; **önce bu** |
| A3 | **Biyometrik / Vesikalık Fotoğraf** | `biyometrik-fotograf` | TR'ye özgü, sınav+vize+kimlik sezonları; büyük rakipler genel içerikli | A2 motoru + kırpma çerçevesi (35×45, 50×60, ÖSYM ön ayarı) | Kabul garantisi yok; resmî kılavuz linki |
| A4 | **Resim Boyutlandır / Kırp** | `resim-boyutlandir` | Evrensel yüksek hacim; kullanım raporunda 3. | A2 motoru | |
| A5 | **Resim Dönüştür** (WebP/PNG/JPG) | `resim-donustur` | "webp jpg çevirme" kalıcı hacim; zorluk 1 | Canvas | A2 ile aynı sayfa ailesi |
| A6 | **PDF'den Word'e** (beta) | `pdfden-worde` | Küresel en büyük PDF sorgusu (≈4 M); TR'de de büyük. Kalite sınırlı → **beta rozeti, dürüst metin** | pdf.js metin + docx | PLAN #6. Sıra yukarı alındı **yalnızca hacim yüzünden**; metin abartısız olmalı |
| A7 | **QR Kod Oluştur** (URL/Wi-Fi/vCard) | `qr-kod` | Yüksek, kalıcı, zorluk 1–2; Wi-Fi QR alt sayfası sevilir | qrcode | PLAN #10 |
| A8 | **Hesaplayıcı çekirdeği (Aralık'a yetişmeli):** Brüt-Net Maaş, Kıdem & İhbar, KDV, Yaş, Tarih Farkı | `hesapla/brut-net-maas`, `kidem-tazminati`, `ihbar-tazminati`, `kdv-hesapla`, `yas-hesapla`, `tarih-farki` | 2027 asgari ücret duyurusu (Aralık) → zirve; medya rakip güçlü ama güncel + hızlı olan kazanır | saf JS + `hesapla/parametreler.json` (tek dosya, tarih alanı) | **Altın test seti şart** (`qa-tester`). "Hukuki tavsiye değildir" |

## Kademe B — A biter bitmez (yüksek talep, orta kazanılabilirlik)

| # | Araç | Slug | Neden | Teknik | Not |
|---|---|---|---|---|---|
| B1 | **PDF'e İmza Ekle** | `pdf-imzala` | Yüksek niyet; Smallpdf günde 2 görev limiti | pdf.js + canvas + pdf-lib | "Görsel imza, e-imza değil" |
| B2 | **Resimden Yazıya (OCR, TR)** | `resimden-yaziya` | "ocr türkçe" yüksek; rakipler yüklüyor | tesseract.js + `tur` verisi vendor'da (~15 MB, ilk kullanımda yüklenir) | Performans spike'ı önce |
| B3 | **PDF Sayfa Düzenle** (sırala/sil/döndür) + ayrı **PDF Döndür** sayfası | `pdf-sayfa-duzenle`, `pdf-dondur` | "pdf düzenleme" niyetinin yapılabilir kısmı | pdf.js önizleme + pdf-lib | PLAN #3 (böl) ile çakışmayı tek sayfada çöz |
| B4 | **Dilekçe Oluşturucu** (ilk 20 şablon: istifa, izin, kira feshi, itiraz, mazeret…) | `dilekce-olustur` | "istifa dilekçesi örneği" türü sorgular yoğun; kişisel veri cihazda kalır farkı; `seo-writer` ağırlıklı | docx + pdf-lib, TR font gömme | "Hukuki tavsiye değildir"; şablonlar özgün; `policy-reviewer` |
| B5 | **Word'den PDF'e** | `wordden-pdfe` | Yüksek hacim; render sapması dürüstçe yazılır | mammoth → HTML → yazdır | PLAN #7 |
| B6 | **Resmî Tatiller / Bayram Tatili / Köprü Günü** | `resmi-tatiller` | Her tatil öncesi zirve; link alan "veri varlığı" | statik veri (Diyanet/Resmî Gazete, yıllık) | 2027 takvimi Aralık'ta hazır |
| B7 | **Sayıyı Yazıya Çevir** | `sayi-yaziya-cevir` | Muhasebe/çek; TR'ye özgü; zorluk 1 | saf JS | |
| B8 | **QR Kod Oku** | `qr-kod-oku` | PC'de QR okuma ihtiyacı; A7 ile çapraz link | jsQR | URL'yi açmadan göster |
| B9 | **PDF Sayfa Numarası** + **PDF Filigran Ekle** | `pdf-sayfa-numarasi`, `pdf-filigran-ekle` | Tez/rapor dönemleri; 1 günlük iş | pdf-lib | |
| B10 | **Ders Programı Oluşturucu** | `ders-programi` | Eylül/Şubat zirveleri; yazdırılabilir | Canvas/pdf-lib | Şubat başına |

## Kademe C — Orta (değerli ama rekabet/mevsim/bakım yükü var)

| # | Araç | Slug | Not |
|---|---|---|---|
| C1 | Zip Oluştur / Aç | `zip` | PLAN #9; "rar" beklentisi → dürüst metin |
| C2 | Serbest Meslek Makbuzu / Stopaj hesabı | `serbest-meslek-makbuzu` | Taslak; "resmî belge değildir"; parametre dosyası |
| C3 | Hazır Excel Şablonları (bütçe, stok, fatura takip) | `excel-sablonlar` | Özgün şablon + açıklama; SheetJS veya elle |
| C4 | Sınav Geri Sayım (YKS/KPSS/LGS…) | `sinav-geri-sayim` | Tarihler resmî teyitli; takvim açıklanınca |
| C5 | Belge Tarayıcı (kamera → PDF) | `belge-tarayici` | Mobil trafik |
| C6 | Ekran Kaydedici | `ekran-kaydedici` | getDisplayMedia; yüksek niyet, sıfır yükleme |
| C7 | Kamera / Mikrofon Testi, Ses Kaydedici | `kamera-test`, `ses-kaydedici` | Ucuz, tekrar ziyaret |
| C8 | Metin Araçları (kelime sayacı, büyük/küçük, TR karakter temizle, Base64) | `metin-araclari` | PLAN #12 |
| C9 | PDF'den Metin Çıkar, PDF Görüntüleyici | `pdf-metin-cikar`, `pdf-ac` | |
| C10 | PDF Karart (gerçek silme) | `pdf-karart` | KVKK/dekont paylaşımı |
| C11 | CSV ↔ Excel (TR ayraç/UTF-8 düzeltme) | `csv-excel` | SheetJS |
| C12 | Fitre & Zekât | `fitre-zekat` | Ramazan öncesi; Diyanet değerleri; tarafsız dil |
| C13 | Kira Artış Oranı (TÜFE 12 ay ort.) | `kira-artis-hesapla` | Aylık veri bakımı; medya güçlü |
| C14 | YKS Net → Puan Tahmini | `yks-puan-hesapla` | Mayıs'a hazır; "tahmini" |
| C15 | Yüzde, Not Ortalaması, Kredi Taksit, Zam Oranı, Yıllık İzin, Mesai | `hesapla/*` | A8 altyapısı üzerine seri |
| C16 | Çekiliş / Rastgele Seçici | `cekilis` | Dil: kumar çağrışımı yok |
| C17 | Sosyal Medya Görsel Boyutları + Kırp | `sosyal-medya-boyut` | A2 motoru |
| C18 | Şifre Üretici | `sifre-uret` | PLAN #11; kalabalık alan |
| C19 | PDF Şifre Ekle / Kaldır (şifre biliniyorsa) | `pdf-sifre-ekle`, `pdf-sifre-kaldir` | Önce kütüphane/lisans kararı |
| C20 | Teklif / Proforma Taslağı | `fatura-sablonu` | `policy-reviewer` zorunlu; "resmî fatura değildir" |

## Kademe D — Düşük öncelik / fırsat olursa

GIF oluştur, Favicon/ICO, SVG→PNG, EXIF temizle, Resim birleştir/kolaj, Renk seçici, Resim döndür, Resme yazı ekle, Metin karşılaştır (diff), Barkod, JSON biçimlendir, Markdown önizleme, Zamanlayıcı/Pomodoro, Birim dönüştürücü, Dosya hash, Lorem ipsum, Hayat sayacı, Havalı yazı/sembol (trafik yüksek, gelir düşük; deneme), Roma rakamı / Hicri-Miladi, Burç, VKİ (sağlık notu), Tapu harcı / damga vergisi / noter, Trafik cezası / MTV, CV oluşturucu (rekabet çok yüksek; B4 motorundan türetilir), EN-first webmaster paketi (EN sürümle birlikte).

## Yapılmayacaklar

Bkz. `CLAUDE.md` kural 8 ve `ARASTIRMA.md` §3.4: sahte belge/dekont, TC-IBAN üretici, filigran kaldırıcı, şifre kırıcı, telifli indirici, RAR, HEIC (LGPL), ffmpeg.wasm (LGPL/GPL), AGPL arka plan kaldırıcı, sesten yazıya (Google'a gider), döviz/altın/hava (ağ), emekli maaşı/EYT (karmaşık, YMYL), bahis hesaplayıcı.

## Her araç için teslim tanımı (kısa)

1. `web/<slug>/index.html` + istemci JS; ağ çağrısı yok; 360 px; klavye.
2. ≥800 özgün TR kelime: nasıl kullanılır, TR senaryoları, SSS ≥6, gizlilik, ilgili araçlar, "son güncelleme".
3. Playwright: mutlu yol + bozuk dosya (hesaplayıcıda ≥10 bilinen sonuç).
4. `policy-reviewer` onayı (reklam konumu A/B/C, yasal sınır).
5. Hub'a kart + `sitemap.xml` + iç linkler.

## Yeniden sıralama kuralı

Yayından 30 gün sonra Search Console'daki gösterim/tıklama ile bu liste güncellenir; A8 gibi mevsimsel kalemler takvime göre öne çekilir (Aralık: maaş/kıdem; Şubat: biyometrik/ÖSYM; Mayıs: YKS; Ağustos: KYK/okul).
