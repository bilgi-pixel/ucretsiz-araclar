# Bilişim Ajans Ücretsiz Araçlar — Ürün, Menü, Reklam ve Trafik Planı

Tarih: 2026-11-03. Sahip: Bilişim Ajans (bilisimajans.com).

## 1. Strateji özeti

- **Online önce, masaüstü sonra.** "pdf birleştir online", "resimden pdf'e" gibi aramalar
  "pdf programı indir" aramalarından kat kat büyük ve tıkla-kullan dönüşümü anında. İndirme
  gerektiren araç, trafiğin %90'ını kapıda kaybeder.
- **Tek kod, üç kanal.** Araçlar saf tarayıcı JS'i: (1) web sayfası, (2) **PWA** — siteye
  "Uygulama olarak yükle" düğmesi; Windows/Mac'te Chrome/Edge masaüstüne kurar, çevrimdışı
  çalışır ve hâlâ bizim alan adımızdaki web sayfası olduğu için **AdSense gösterilebilir**
  (masaüstü sürümünün reklam geliri buradan gelir), (3) Tauri ile Windows `.exe` / macOS `.dmg`
  paketi — **reklamsız**. AdSense politikası reklamı yalnızca tarayıcıda açılan web sayfalarında
  serbest bırakır; yerel uygulama içine gömülü AdSense hesap kapatma sebebidir, AdMob ise yalnızca
  Android/iOS içindir. Tauri paketlerinin görevi indirme portallarından backlink/güven ve kendi
  tanıtımımız (ajans hizmetleri, "daha fazla araç için online sürüm" bağlantısı).
- **Dosya sunucuya gitmez.** Hem gizlilik hem maliyet: sunucu yok, bant genişliği yok, KVKK derdi yok.
  Bu aynı zamanda ana pazarlama mesajı: *"Dosyanız bilgisayarınızdan çıkmaz."*
- **AdSense siteyi değil, alt alan adını kullanır.** Araçlar `araclar.bilisimajans.com` üzerinde
  GitHub Pages'te barınır (ücretsiz, sınırsız trafik). WordPress.com'daki ana site yalnızca
  "Ücretsiz Programlar" menüsüyle bu alt alana bağlanır. Böylece AdSense için WordPress.com
  Business planı **gerekmez**; AdSense alt alan adına doğrudan verilir.

## 2. Araç portföyü (12 online araç, 3 faz)

| # | Slug | Araç | Teknik | Hedef TR aramalar | Faz |
|---|---|---|---|---|---|
| 1 | `resimden-pdfe` | Resimden PDF'e (JPG/PNG/WebP → PDF, çoklu, sıralama) | pdf-lib | "resimden pdf'e çevirme", "jpg pdf yapma" | 1 |
| 2 | `pdf-birlestir` | PDF Birleştir (sürükle-sırala) | pdf-lib | "pdf birleştirme", "pdf birleştir online" | 1 |
| 3 | `pdf-bol` | PDF Böl / Sayfa Çıkar / Sayfa Sil | pdf-lib | "pdf bölme", "pdf sayfa ayırma" | 1 |
| 4 | `pdfden-resme` | PDF'den Resme (JPG/PNG, sayfa seçimi) | pdf.js | "pdf jpg çevirme", "pdf resme çevir" | 1 |
| 5 | `pdf-kucult` | PDF Küçült (görselleri yeniden sıkıştır; e-Devlet/okul için KB hedefi) | pdf.js + pdf-lib | "pdf küçültme", "pdf boyut küçültme 2 mb" | 2 |
| 6 | `pdfden-worde` | PDF'den Word'e (DOCX; metin+paragraf, beta) | pdf.js + docx | "pdf word çevirme", "pdf'i word'e çevir" | 2 |
| 7 | `wordden-pdfe` | Word'den PDF'e (DOCX → PDF; tarayıcı render) | mammoth + print-to-PDF | "word pdf çevirme" | 2 |
| 8 | `resim-kucult` | Resim Küçült / Dönüştür (JPG/PNG/WebP, KB hedefi, toplu) | Canvas | "fotoğraf küçültme", "biyometrik fotoğraf 50 kb" | 2 |
| 9 | `zip` | Zip Oluştur / Zip Aç (rar açma değil; açıkça yaz) | fflate | "zip dosyası açma online", "zip yapma" | 2 |
| 10 | `qr-kod` | QR Kod Oluşturucu (URL, Wi-Fi, vCard; PNG/SVG) | qrcode | "qr kod oluşturma", "wifi qr kod" | 3 |
| 11 | `sifre-uret` | Güçlü Şifre Üretici | WebCrypto | "şifre oluşturucu" | 3 |
| 12 | `metin-araclari` | Metin Araçları (kelime sayacı, büyük/küçük harf, Türkçe karakter temizleme, Base64) | saf JS | "kelime sayacı", "türkçe karakter temizleme" | 3 |

**Masaüstü ek araçlar (Faz 4, yalnızca Tauri):** Ekran Görüntüsü, Toplu Yeniden Adlandır,
Yinelenen Dosya Bulucu — dosya sistemi erişimi gerektirir, tarayıcıda yapılamaz.

Dürüst teknik notlar:
- PDF→Word tarayıcıda mükemmel olmaz (tablo/düzen kaybı). Sayfada "beta, basit belgeler için"
  diye yazılır; abartılı vaat AdSense ve güven açısından zararlı.
- Word→PDF: DOCX, HTML'e çevrilip tarayıcının yazdırma motoruyla PDF'e basılır. Karmaşık
  biçimlendirmede sapma olur; yine açıkça belirtilir.
- RAR açma tarayıcıda lisans ve teknik olarak sorunlu; "zip" aracı RAR'ı desteklemez, sayfada yazar.

## 3. Yapılmayacaklar (politika riski)

YouTube/sosyal medya indirici, "PC hızlandırıcı", sürücü güncelleyici, antivirüs, filigran
kaldırıcı, lisans/kırma araçları, "ücretsiz" deyip Premium'a zorlayan akışlar.

## 4. bilisimajans.com menü yapısı

Üst menüye yeni öğe: **Ücretsiz Programlar** (açılır):

```
Ücretsiz Programlar
├─ Tüm Araçlar            → https://araclar.bilisimajans.com/
├─ PDF Araçları           → …/#pdf        (birleştir, böl, küçült, resme, Word'e)
├─ Dönüştürücüler         → …/#donustur   (resimden PDF'e, Word'den PDF'e, resim dönüştür)
├─ Dosya Araçları         → …/#dosya      (zip, QR, şifre, metin)
├─ Masaüstü Sürümleri     → …/indir/      (Windows / Mac — Faz 2'de açılır)
└─ Neden Ücretsiz?        → bilisimajans.com/ucretsiz-programlar (WordPress sayfası)
```

WordPress sayfası "Ücretsiz Programlar": projenin hikâyesi (ajansın topluluğa katkısı),
gizlilik vaadi, araç kartları (alt alana bağlantı), ajans hizmetleri CTA'sı. Metni
`site/ucretsiz-programlar.md` içinde.

## 5. Araçlar sitesi tasarımı (araclar.bilisimajans.com)

- **Hub sayfası:** üstte logo + "Bilişim Ajans Ücretsiz Araçlar", bir cümle vaat, arama kutusu,
  kategori sekmeleri (PDF / Dönüştür / Resim / Dosya / Metin), araç kartları (ikon, ad, tek satır
  açıklama, "Çevrimdışı sürüm" rozeti). Altta "Nasıl çalışır?" (3 adım), gizlilik bloğu, SSS,
  ajans CTA'sı, altbilgi (Gizlilik, İletişim, Hakkımızda, GitHub).
- **Araç sayfası düzeni (yukarıdan aşağı):**
  1. Başlık + rozet satırı: `%100 ücretsiz · kayıt yok · dosya yüklenmez`
  2. Araç kutusu (dropzone → seçenekler → tek büyük "Dönüştür" → sonuç + "İndir")
  3. *[Reklam alanı A — araç kutusunun altında, indirme butonundan ayrı bir blokta]*
  4. Nasıl kullanılır (adımlar)
  5. *[Reklam alanı B — içerik ortası]*
  6. Neden bu araç / Gizlilik / SSS
  7. İlgili araçlar
  8. *[Reklam alanı C — sayfa sonu]*
  9. Altbilgi
- Tasarım: tek tema dosyası, açık/koyu mod, marka rengi ana sitedekiyle aynı (logo ve renk
  kodları `web/assets/img/` ve `ba.css :root` içinde; ana siteden alınacak), sistem fontu +
  Inter, büyük dokunma hedefleri, 360px'te tek sütun.

## 6. AdSense planı

**Başvuru koşulları (hedef: Faz 2 sonu, ~6–8 hafta):**
- ≥ 9 araç sayfası (her biri ≥ 800 kelime) + ≥ 10 rehber + Hakkımızda/Gizlilik/İletişim/Çerez.
- Search Console'da indeksli, günlük ≥ 100 organik ziyaret.
- Alt alan adı AdSense'e "site" olarak eklenir; ana sitedeki WordPress.com planı etkilemez.

**Yerleşim kuralları (hesap güvenliği):** reklam yalnızca A/B/C alanlarında; buton yanında
asla; "Reklam" etiketi; sayfa başına en fazla 3 birim; otomatik reklamları (Auto ads) **kapalı**
tut — Auto ads indirme butonunun yanına reklam basabilir ve bu, "yanıltıcı yerleşim" ihlalidir.

**Gelir beklentisi (dürüst):** TR trafiği RPM ≈ 0,5–1,5 $. 200 bin aylık görüntüleme ≈ 100–300 $.
EN sayfalar (Faz 3) RPM 5–15 $. Asıl kaldıraç: EN sürüm + uzun kuyruk rehberler.
İkinci gelir kanalı: her sayfada ajans hizmetlerine CTA (web tasarımı, yazılım) — B2B lead.

## 7. Trafik fikirleri (ek)

1. **Türkiye'ye özgü uzun kuyruk sayfaları:** "e-Devlet için PDF 2 MB altına küçültme",
   "Biyometrik fotoğrafı 50 KB'a düşürme", "ÖSYM başvuru fotoğrafı boyutlandırma",
   "Öğrenci belgesi PDF birleştirme", "KYK başvuru belgeleri tek PDF". Her biri rehber + araç
   ön ayarı (örn. `pdf-kucult/?hedef=2mb`).
2. **Hesaplayıcılar (ucuz, yüksek trafik, AdSense dostu):** KDV hesaplama, yaş hesaplama, IBAN
   doğrulama, TC kimlik no algoritma doğrulama, tarih farkı, kıdem tazminatı tahmini.
   Faz 3'te `hesapla/` altına.
3. **"Nasıl yapılır" rehber kümesi:** her araç için 3 rehber (Windows yerleşik yol, Mac yolu,
   bizim araç). Dürüst alternatif anlatan sayfalar daha çok paylaşılır ve backlink alır.
4. **EN sürüm (`/en/`):** aynı araçlar, hreflang etiketleri. Gelirin büyük kısmı buradan.
5. **Masaüstü sürümleri = backlink makinesi:** Tamindir, Gezginler, Softpedia, Uptodown,
   AlternativeTo, winget, Homebrew cask. Her liste bir backlink.
6. **GitHub açık kaynak:** "açık kaynak, kodu görebilirsiniz" güven veriyor; geliştirici
   topluluğu paylaşır. Repo README'si TR+EN.
7. **Paylaşım kancası:** sonuç ekranında "Bu araç işinize yaradı mı? Paylaşın" (WhatsApp/X
   bağlantıları, izleme yok).
8. **Ajans müşterilerine e-posta/duyuru:** mevcut müşteri tabanı ilk trafik ve geri bildirim.

## 8. Yol haritası

| Faz | Süre | Çıktı |
|---|---|---|
| 1 | Hafta 1–2 | Hub + 4 PDF aracı yayında (araclar.bilisimajans.com), WordPress menüsü, Gizlilik/Hakkımızda |
| 2 | Hafta 3–6 | Araç 5–9, 10 rehber, Search Console, AdSense başvurusu; Tauri Win/Mac paketleri |
| 3 | Hafta 7–10 | Araç 10–12, hesaplayıcılar, EN sürüm, indirme portalları |
| 4 | Ay 3+ | Masaüstü-özel araçlar, PWA, reklam yerleşim A/B, aylık içerik takvimi |

## 9. Sizin yapmanız gerekenler

- `gh auth login` adımını terminalde tamamlamak (Enter → tarayıcıda kod).
- DNS: `araclar` CNAME → `<github-kullanıcı>.github.io` (Pages ayarı yapılınca ben söylerim).
- Logo (SVG/PNG) ve marka renk kodlarını `web/assets/img/` için paylaşmak.
- AdSense hesabı (varsa publisher ID: `ca-pub-…`) — `web/assets/js/ads.js` içine yazılır.
