# Pazar Araştırması — 2. Tur: Trafik, SEO ve Yeni Araç Fırsatları

Tarih: 2026-11-04. Önceki tur: [`ARASTIRMA.md`](ARASTIRMA.md) (50 aday, rakip tablosu, yapma listesi). Bu tur odağı: **trafik nasıl gelir, hangi yeni araçlar eklenir, ne zaman yayınlanır.**
İşaretler önceki gibi: **[R]** kaynağı okudum, **[3T]** üçüncü taraf/blog, **[?]** genel bilgi/tahmin. Arama hacmi verisine yine ulaşılamadı; puanlar yargıdır, kesin sayı değil.

---

## 1. Bu turda öğrenilen 7 şey (özet)

1. **En yakın TR rakip: hemenhesap.com.** [R] Ana sayfada "Hesaplayıcılar (106)" yazıyor, menüde ~103 araç saydım. Resim küçültme, QR, PDF birleştir, PDF'den JPG, şifre üretici gibi bizim araçların TR karşılıkları *zaten orada*. Resim küçültme sayfasında "sunucusuz çalışma/yükleme yok" mesajı, ~1.100–1.300 kelimelik makale, 7 soruluk SSS, "Sitende Kullan" iframe embed'i, puanlama ve "son güncelleme" tarihi var. Yani bizim "yüklenmez" mesajı TR'de **tek başına farklılaştırıcı değil**; gerçek fark: kalite, hız, EN sürüm, çevrimdışı masaüstü, derin PDF araç seti.
2. **Hesaplayıcı pazarı büyük medya markalarının elinde.** Hürriyet, Milliyet, CNN Türk, Kariyer.net, Eleman.net, hemenhesap kendi "hesaplama araçları" bölümlerini işletiyor [R: arama sonuçları]. Yeni bir alan adının *genel* sorgularda ("kıdem tazminatı hesaplama") ilk sayfaya girmesi zor. Bizim yolumuz: **niş/uzun kuyruk, taze veri, yazdırılabilir/PDF çıktı veren hesaplayıcılar, belge oluşturucular.**
3. **Hesaplayıcıların TR'deki en güçlü sinyali: sınav puan hesaplama (YKS) ve emeklilik/SGK.** [3T] YKS'de "60 net kaç puan?" tipi sorgular sınav dönemi patlıyor, sonra düşüyor. Emeklilik hesabı çok aranıyor ama kuralları karmaşık ve YMYL → yanlış hesap itibar/hukuk riski, **şimdilik yapma**.
4. **Araçların AI Overviews'tan etkilenmesi daha az görünüyor.** [3T, dolaylı] Bir SEO analizi araç/hesaplayıcı sorgularında ~%3 etki, "bir paragrafla cevaplanabilen" bilgi sorgularında çok daha büyük kayıp diyor. Bunun methodolojisi doğrulanamadı; yine de yön tutarlı: **etkileşimli araç = daha korunaklı trafik.** Saf bilgi/rehber sayfaları riskli; rehberleri araca *yönlendiren* içerik olarak yazın.
5. **AdSense reddinin kök nedeni: "araç kutusu + düğme" sayfası.** [3T/anekdot] Araç sitelerinde "düşük değerli içerik" en sık sebep. Her araç sayfasında 8 bölüm şablonu (H1, değer önerisi, araç, adımlar, kullanım senaryoları, 5–8 SSS, gizlilik, iç linkler) ≈ 800–1.000 kelime öneriliyor. Resmî bir eşik **yok** (resmî kaynakta bulunamadı); bu CLAUDE.md'deki 800 kelime kuralıyla zaten uyumlu.
6. **Google "scaled content abuse" (Mart 2024'ten beri) bizim için pratik risk.** [3T] Politika *amaca* bakıyor: kullanıcıya yarayan hesaplayıcı serbest; sorgu varyasyonu için çoğaltılmış, neredeyse aynı sayfalar tehlikeli. PLAN'daki `?hedef=2mb` gibi ön ayar sayfaları için kural: **yalnızca gerçekten farklı kitle/şartname olan ön ayarlara ayrı sayfa; her birinde özgün rehber (≥500 özgün kelime); toplam ön ayar sayfası sayısı sınırlı (ilk etapta ≤15).**
7. **Gelir gerçeği:** RPM kaynakları pazarlama blogları, TR'ye özel güvenilir veri yok [3T]. Finans/sigorta içeriği genelde en yüksek RPM; TR kullanıcıda CPC düşük. **Test edilmeden hedef rakam yazılmamalı**; yayınlandıktan sonra ilk 30 günde gerçek RPM ölçülüp model güncellenir (§7).

---

## 2. Trafik stratejisi (SEO + dağıtım)

### 2.1 Mimari ve teknik SEO
- **Konu kümeleri (topical authority):** Her küme = 1 "ana araç" + 3–5 destek rehberi + 2–3 niş ön ayar sayfası. Kümeler: PDF, Resim/Fotoğraf (biyometrik dahil), Belge & Dilekçe, Hesaplayıcı (iş hukuku, vergi), Sınav. Her kümeyi bitirip bir sonrakine geç; serpiştirme yapma.
- **URL:** kısa, TR, kalıcı (`/pdf-kucult/`). Yıl URL'de olmasın (`/brut-net-maas/`, yıl H1'de ve "son güncelleme" tarihinde) — her yıl aynı sayfayı güncelleyip link değerini koruruz.
- **İç link:** araç → ilgili 3 araç + ilgili rehber; rehber → araç (bağlamsal, ilk 200 kelimede). Hub'da kategori sayfaları (`/pdf-araclari/` gibi) gerçek metinle, sadece kart listesi değil.
- **Şema:** `WebApplication`/`SoftwareApplication` (ücretsiz, tarayıcıda), `BreadcrumbList`, `FAQPage`. Not [?]: Google 2023'ten beri FAQ zengin sonucunu çoğunlukla devlet/sağlık sitelerine gösteriyor, HowTo zengin sonucunu kaldırdı; şemayı yine koyun ama trafik hedefini buna bağlamayın. Teyit: Google Search Central güncel belgesi.
- **Performans:** Ağır kütüphaneleri (pdf.js, tesseract) yalnızca araç kullanılırken, dosya seçildiğinde yükleyin; ilk boyama hafif kalsın (Core Web Vitals). Mobilde 360 px zaten kural.
- **Arama motorları:** Search Console + **Bing Webmaster + Yandex Webmaster** (Yandex'in TR payını doğrulayamadım [?]; kayıt ücretsiz, kayıt yaptırın). `sitemap.xml` zaten var; araç/rehber başına `lastmod` doğru tutulsun.
- **EN sürüm:** hreflang çiftleri, EN sayfalar *çeviri değil* özgün yazılsın (aynı metnin otomatik çevirisi scaled content riskidir).

### 2.2 Sayfa kalite şablonu (AdSense + sıralama için)
1. H1 = hedef sorgu doğal hali ("PDF Küçültme — Boyutu Online Düşür, Dosya Yüklenmez").
2. İlk ekranda araç. Hemen altında 2 cümle değer önerisi.
3. "Nasıl kullanılır" 3–5 adım. 4. Kullanım senaryoları (TR'ye özgü: e-Devlet, okul, iş başvurusu). 5. Ayar rehberi/tablo (ör. kalite % → boyut). 6. Sınırlar ve dürüst notlar. 7. SSS ≥6. 8. Gizlilik. 9. İlgili araçlar. 10. "Son güncelleme: tarih" + kim yaptı (Bilişim Ajans).
- hemenhesap'ın yaptığı "Kısa Cevap" kutusu (araca inmeden cevap) iyi bir UX; yapılabilir.
- Her araç sayfasının "kanıt" bölümü: "Ağ sekmesini açın, hiçbir dosya gönderilmediğini görün" (kısa talimat + GIF). Rakiplerin çoğu bunu kanıtlayamıyor.

### 2.3 Backlink / dağıtım (organik)
| Kanal | Ne yapılır | Not |
|---|---|---|
| **Embed ("Sitende Kullan")** | Hesaplayıcı ve QR gibi araçlar için iframe/kod; çıkışta "Bilişim Ajans" linki (dofollow) | hemenhesap bunu yapıyor [R]; embed içi reklam *olmaz*; link metni zorunlu |
| **Masaüstü indirme portalları** | Tamindir, Gezginler, Softpedia, Uptodown, AlternativeTo, winget, Homebrew | PLAN §7.5; her liste bir backlink |
| **GitHub açık kaynak** | README TR+EN, "kod görülebilir" güveni | PLAN §7.6 |
| **TR forum/topluluk** | Technopat, DonanımHaber, Reddit r/Turkey, Ekşi Sözlük başlıkları | Spam değil: gerçek sorulara cevap + link. Moderatör kurallarına uyun [?] |
| **Veri/rehber varlıkları (linklenebilir)** | "Biyometrik fotoğraf ölçüleri kurum kurum tablosu", "2027 resmî tatil takvimi", "KB sınırları derlemesi (kaynaklı)" | Gazeteci/blogger link verir; kaynak linki ve tarih şart |
| **Öğrenci/kariyer toplulukları** | Üniversite kulüpleri, kariyer merkezleri | Kampüs `.edu.tr` backlinkleri değerli |
| **E-posta/müşteri tabanı** | Ajans müşterileri | İlk trafik/geri bildirim |

Kaçınılacaklar: satın alınmış link, PBN, yorum spam'i (Google spam politikası; ayrıca CLAUDE.md "yanıltıcı yok").

### 2.4 Mevsimsellik takvimi (yayın zamanlaması)
Tarihler **tipik düzendir**; resmî duyurularla teyit edin (ÖSYM 2026/2027 takvimini doğrulayamadım, kaynaklar çelişkili/eski).

| Dönem | Zirve konular | Bizim yayın hedefimiz |
|---|---|---|
| **Kasım–Aralık (şimdi)** | Asgari ücret 2027 beklentisi, Ocak zamları, memur/emekli zammı, 2027 ÖSYM takvimi | **Brüt-net, kıdem tavanı, zam hesaplayıcıları hazır, parametre dosyasına 2027 değeri duyurulur duyurulmaz gir.** Yayın Aralık sonuna yetişmeli |
| Ocak | Zam hesapları, vergi dilimleri, MTV | Sayfalar güncel; rehber "2027 yeni değerler" |
| Şubat–Mart | ÖSYM/KPSS başvuru dönemleri, fotoğraf | Biyometrik + ÖSYM rehberi + resim küçültme |
| Mayıs–Haziran | YKS, LGS | YKS net/puan hesap, sınav geri sayım |
| Temmuz | Kıdem tavanı, memur zammı, tercih | Parametre güncelle |
| Ağustos–Eylül | KYK, okul kayıt, ders programı | Belge birleştir/küçült rehberleri, ders programı |
| Mart–Nisan, Mayıs ve dini bayramlar | Ramazan/bayram tatilleri, fitre | Resmî tatil/bayram tatili sayfası, fitre/zekat (Diyanet değerleri) |

**En zamana duyarlı iş:** 2027 asgari ücret açıklanınca (Aralık) brüt-net/kıdem/ihbar sayfalarının hazır ve doğru olması. Mevcut ana rakipler medya; hızlı olmamız rekabet avantajı, yanlış hesap ise itibar kaybı → **altın test setleri** (bilinen sonuçlarla otomatik test) şart.

---

## 3. Yeni aday araçlar (ARASTIRMA.md'dekilere ek)

İlk turda yer almayan fikirler. Puan = **Talep (1–5) × Kazanılabilirlik (1–5; rekabet azaldıkça artar) × Kolaylık (6 − zorluk)**, en fazla 125. Yargıdır; veriyle doğrulanana kadar sıralama göstergedir.

| # | Araç | Slug | TR hedef aramalar | Talep | Kaz. | Z | Skor | İstemci / kütüphane | Risk |
|---|---|---|---|---|---|---|---|---|---|
| N1 | **Dilekçe Oluşturucu** (istifa, izin, kira feshi, itiraz… 30–50 şablon, Word/PDF çıktı) | `dilekce-olustur` | istifa dilekçesi; izin dilekçesi örneği; kira fesih dilekçesi; itiraz dilekçesi | 5 | 3 | 2 | **60** | Evet — docx (MIT) + pdf-lib; kişisel veri cihazda kalır (güçlü fark) | Orta: "hukuki tavsiye değildir", sahte belge değil kullanıcı kendi dilekçesini yazar. Şablonlar özgün yazılmalı |
| N2 | **Resmî Tatil / Bayram Tatili / Uzun Hafta Sonu** (yıllık takvim + "köprü günü" hesabı) | `resmi-tatiller` | 2027 resmi tatil günleri; kurban bayramı tatili kaç gün; köprü izin hesaplama | 4 | 3 | 1 | **60** | Evet — saf JS, statik veri (dini bayram tarihleri Diyanet'ten yıllık) | Düşük; veri yıllık güncelleme |
| N3 | **Havalı Yazı / Sembol / Özel Karakter** (Unicode yazı stilleri, kalp, boş karakter) | `havali-yazi`, `ozel-karakter` | havalı yazı yazma; instagram yazı tipi; sembol kopyala; boş karakter | 5 | 2 | 1 | **50** | Evet — saf JS Unicode eşlemeleri | Düşük; trafik genç/mobil → RPM düşük olabilir [?] |
| N4 | **Serbest Meslek Makbuzu / KDV+Stopaj Hesabı** (brütten/netten, PDF makbuz taslağı) | `serbest-meslek-makbuzu` | serbest meslek makbuzu hesaplama; stopaj hesaplama; kdv stopaj | 3 | 4 | 2 | **48** | Evet — saf JS (+ pdf-lib taslak) | Orta: makbuz *taslağı* — "resmî belge değildir" açıkça; sahte belge değil, gerçek kullanıcının kendi iş hesabı. Oranlar parametre dosyasında |
| N5 | **Ders Programı Oluşturucu** (haftalık, yazdırılabilir PDF/PNG) | `ders-programi` | ders programı hazırlama; haftalık çalışma programı; yks çalışma programı | 3 | 4 | 2 | **48** | Evet — Canvas/pdf-lib | Düşük; Eylül ve Şubat zirveleri |
| N6 | **Hazır Excel Şablonları** (bütçe, stok, fatura takip; statik .xlsx indirme, makrosuz) | `excel-sablonlar` | excel şablonları; bütçe tablosu excel; stok takip excel | 4 | 3 | 2 | **48** | Evet — SheetJS (Apache-2.0) ile üret / elle hazırla | Düşük; özgün şablon + açıklama şart |
| N7 | **Sınav Geri Sayım** (YKS/KPSS/ALES/DGS/LGS; tarihler resmî duyurudan) | `sinav-geri-sayim` | yks kaç gün kaldı; kpss ne zaman; sınava kaç gün var | 3 | 3 | 1 | **45** | Evet | Düşük; **tarihler resmî kaynak teyitli**, yanlış tarih itibar riski |
| N8 | **Fitre & Zekât Hesabı** (Diyanet'in yıllık fitre bedeli parametre) | `fitre-zekat` | fitre ne kadar; zekat hesaplama; nisap miktarı | 3 | 3 | 1 | **45** | Evet | Orta: dini hassasiyet, "Diyanet ilan eder" notu, tarafsız dil |
| N9 | **Kira Artış Oranı Hesaplama** (TÜFE 12 aylık ortalama, aylık veri) | `kira-artis-hesapla` | kira artış oranı hesaplama; kira zammı ne kadar; kira artışı 2027 | 5 | 2 | 2 | **40** | Evet — TÜFE ortalaması tablo (aylık güncelleme) | Orta (YMYL-hukuki hafif): aylık bakım yükü; yanlış veri riski. Medya güçlü |
| N10 | **Teklif / Proforma Fatura / İrsaliye Taslağı Oluşturucu** (PDF) | `fatura-sablonu` | fatura şablonu; proforma fatura oluşturma; teklif formu | 4 | 3 | 3 | 36 | Evet — pdf-lib + Türkçe font gömme | **Orta–yüksek**: e-Fatura/e-Arşiv yerine geçmez; başlık/not "taslak, resmî fatura değildir" şart. Sahte belge ilkesine uyar çünkü kullanıcı kendi bilgisini yazar; **yine de politika denetiminden geçirin** |
| N11 | Sosyal Medya Görsel Boyutları + Kırp (Instagram, YouTube kapak, WhatsApp profil) | `sosyal-medya-boyut` | instagram gönderi boyutu; youtube kapak boyutu; profil fotoğrafı yuvarlak kırp | 3 | 3 | 2 | 36 | Evet — Canvas | Düşük; boyut tabloları güncel olmalı |
| N12 | Tapu Harcı / Damga Vergisi / Noter Ücreti Hesabı | `tapu-harci` | tapu harcı hesaplama; damga vergisi hesaplama | 3 | 3 | 2 | 36 | Evet | Orta: oran/harç tarifesi yıllık; hukuki not |
| N13 | CV / Özgeçmiş Oluşturucu (PDF, Türkçe karakter) | `cv-olustur` | cv hazırlama; özgeçmiş oluşturma; cv örneği pdf | 5 | 2 | 4 | 20 | Evet — pdf-lib + font + şablonlar (dilekçe motoruyla ortak) | Düşük; rekabet çok yüksek (Kariyer.net, Canva…). **Fark: kişisel veri yüklenmez.** |
| N14 | YKS TYT/AYT Net-Puan Tahmini (sınav sonrası mevsimsel) | `yks-puan-hesapla` | yks puan hesaplama; tyt net hesaplama; 60 net kaç puan | 5 | 2 | 3 | 30 | Evet — saf JS; katsayı ve standart sapma ÖSYM duyurularından | **Orta:** puan yalnızca *tahmin*; ÖSYM standart sapmaları sonuçtan sonra bilinir → "tahmini" açıkça. Mevsimsel zirve + yüksek medya rekabeti |
| N15 | Webmaster / Geliştirici Paketi — **EN-first** (UTM builder, meta tag & OG önizleme oluşturucu, robots/sitemap/htaccess üretici, px↔rem, CSS gölge/gradyan, JWT çözücü, UUID, cron açıklayıcı) | `webmaster/*` (EN: `/en/…`) | utm builder; meta tag generator; og image preview; px to rem | 3 | 2 | 1 | 30 | Evet — saf JS | Düşük; **EN RPM yüksek hedefi**, rekabet çok yüksek, uzun kuyruk ve niş araç yarat |
| N16 | Hayat Sayacı / Kaç Gün Yaşadım | `hayat-sayaci` | kaç gün yaşadım; doğum günüme kaç gün kaldı | 3 | 2 | 1 | 30 | Evet | Düşük; viral ama düşük derinlik |
| N17 | Trafik Cezası / MTV / ÖTV Hesabı | `trafik-cezasi-hesapla` | trafik cezası hesaplama; mtv hesaplama 2027 | 4 | 2 | 3 | 24 | Evet — yıllık yeniden değerleme tarifesi tablosu | Orta: tarifeler büyük, güncelleme yükü |
| N18 | Emekli Maaşı / EYT / 3600 Gün | `emeklilik-hesapla` | emekli maaşı hesaplama; eyt hesaplama | 5 | 1 | 5 | 5 | — | **Yapma (şimdilik):** kural çok karmaşık, yanlış hesap itibar riski, rakipler (SGK, medya) çok güçlü |

**Önceki turdan aynen geçerli ve hâlâ en yüksek öncelik:** `biyometrik-fotograf`, `resim-boyutlandir`, `resim-donustur`, `resimden-yaziya`, `pdf-imzala`, `pdf-sayfa-duzenle`, KDV, `sayi-yaziya-cevir` (bkz. ARASTIRMA.md §3.2).

### Ek rekabet gözlemleri (hemenhesap kategorileri, TR araç boşlukları)
hemenhesap menüsü [R]: Vergi (15 araç: noter, damga, tapu harcı, KDV, MTV, ÖTV, emlak vergisi, gelir vergisi, kira stopaj, serbest meslek makbuzu…), Emeklilik (7), Çalışan Hakları (10), Banka/Finans (7), Sosyal Yardım (5), Eğitim (11: LGS, YKS, ALES, KPSS, TUS, DGS, AGS, KYK borcu), Ulaşım (8), Fatura (4), Dini (fitre, zekat), Yaşam (11). **Boşluklar** (listede görünmeyen veya zayıf): dilekçe/belge oluşturucular, ders programı, Excel şablonları, çevrimdışı/masaüstü, EN sürüm, PDF *düzenleme* ailesi (imza, sayfa düzenle, karart), OCR, biyometrik fotoğraf. Bizim ilk hamle bu boşluklara.

---

## 4. Genişletilmiş sıralama (iki turun birleşimi)

**Dalga 1 — Ocak'a kadar (şimdi → Aralık sonu):**
1. `pdf-kucult` + `resim-kucult` (PLAN #5, #8; hedef-KB ön ayarlı) — tüm TR niş sayfaların motoru.
2. `biyometrik-fotograf` + `resim-boyutlandir` + `resim-donustur` (aynı Canvas modülü).
3. **Hesaplayıcı çekirdeği + `parametreler.json`**: KDV, brüt-net, kıdem/ihbar, yıllık izin, yaş, tarih farkı. Aralık sonuna 2027 değerleriyle yayında.
4. `qr-kod` (PLAN #10) — zorluk düşük, kalıcı.

**Dalga 2 — Şubat–Nisan:**
5. `resimden-yaziya` (OCR), `pdf-imzala`, `pdf-sayfa-duzenle`/`pdf-dondur`.
6. `dilekce-olustur` (N1) — içerik odaklı, hafif geliştirme, yüksek talep; aynı motor CV için de kullanılır.
7. `resmi-tatiller` (N2), `ders-programi` (N5), `sinav-geri-sayim` (N7) — Şubat/Mart başı.
8. `sayi-yaziya-cevir`, `serbest-meslek-makbuzu` (N4), `excel-sablonlar` (N6).

**Dalga 3 — Mayıs ve sonrası:**
9. `yks-puan-hesapla` (N14; Mayıs'ta hazır, sonuç sonrası güncelle), `kira-artis-hesapla` (N9), `cv-olustur` (N13).
10. EN-first webmaster paketi (N15) ve EN sayfalar; `belge-tarayici`, `ekran-kaydedici`, PDF şifre araçları (kütüphane kararı sonrası).
11. `havali-yazi` (N3) — trafik çeker, gelir/kalite dengesi için deneme olarak.

**İlk 90 gün hedefi (öneri):** ≥12 araç + ≥15 rehber yayında, Search Console'da hepsi indeksli, AdSense başvurusu (PLAN §6 eşikleri).

---

## 5. Kalite & risk kontrol listesi (her yeni araçtan önce)
- [ ] **Yasal sınır (CLAUDE.md #8):** "Kötüye kullanılırsa suç oluşturur mu?" → hayırsa devam. Belge oluşturucularda (dilekçe, fatura taslağı, makbuz): kullanıcı *kendi* bilgisini girer, çıktıda "taslak/örnektir, resmî belge yerine geçmez" notu, hazır imza/kaşe/resmî logo yok.
- [ ] Hesaplayıcı: ≥10 bilinen-sonuç testi (Playwright), kaynak yasa/duyuru linki, "son güncelleme" tarihi, yıl parametresi tek dosyada.
- [ ] Kurum şartı (KB/piksel): rakam *kullanıcıya* seçtirilir, resmî kılavuza link verilir, "kabul garantisi yok" yazılır.
- [ ] Özgün 800+ kelime; başka sayfadan kopya paragraf yok (scaled content riski).
- [ ] Ön ayar sayfası ancak gerçek farklı kitle/şartname varsa; toplam sınırlı.
- [ ] Ağ çağrısı yok → "dosyanız çıkmaz" rozeti doğru (araç sayfasında harici font/analitik yok).
- [ ] Mobil 360 px, klavye, AA kontrast.
- [ ] `policy-reviewer` ajanından geçti.

---

## 6. Ölçüm planı
| Ne | Nerede | Sıklık |
|---|---|---|
| Sorgu/tıklama/CTR, indeks durumu | Search Console (+ Bing, Yandex) | Haftalık |
| Sayfa başına otururma süresi, çıkış, "araç kullanıldı" olayı | Çerezsiz, ilkeli analitik **yok** (CLAUDE.md: izleme yok). Alternatif: Search Console + sunucu tarafı toplam sayaç eklemeden; araç kullanımını ölçmek için *gizlilik dostu, ağ çağrısız* yerel sayaç yok → **karar gerekli** | — |
| RPM, sayfa başına gelir | AdSense raporu | Haftalık (onaydan sonra) |
| Sıralama (ilk 20 hedef sorgu) | Manuel SERP kontrolü / ücretsiz araç | Aylık |

> **KARAR (sahip, 2026-11-04): Ölçüm yalnızca Search Console + AdSense raporlarıyla yapılır; sayaç/analitik eklenmez. İlk 30 günde ihtiyaç doğarsa yeniden değerlendirilir.**
>
> (Soru metni, kayıt için:) CLAUDE.md "analitik/izleme kodu yok" diyor. Bu durumda yalnızca Search Console ve AdSense raporu ile ölçeriz (kullanıcı bazlı ölçüm yok). Bu kabul edilebilir mi, yoksa çerezsiz bir sayaç (ör. self-hosted, kimlik içermeyen) kuralın istisnası olarak eklensin mi? Önerim: **şimdilik yalnızca Search Console + AdSense**; ilk 30 günde ihtiyaç doğarsa tekrar değerlendirin.

---

## 7. Gelir modeli — senaryolar (varsayım, doğrulanmamış)

Yalnızca **büyüklük mertebesi** göstermek için. RPM'ler test edilene kadar kesin değil; kaynaklar finans nişinde yüksek RPM'ler yazıyor ama TR kullanıcıda CPC düşük, ve TR'ye özel güvenilir veri bulunamadı [3T].

Aylık gelir ≈ (sayfa görüntüleme / 1000) × RPM.

| Senaryo | Aylık sayfa görüntüleme | TR RPM varsayımı | EN pay | Tahmini aylık gelir |
|---|---|---|---|---|
| Ürün başlangıcı (6. ay) | 150.000 | 0,5–1,5 $ | %0 | ≈ 75–225 $ |
| Orta (12. ay) | 600.000 | 0,5–1,5 $ | %20 EN, RPM 4–10 $ | ≈ 0,8×600k/1000×1 + 0,2×600k/1000×7 ≈ 480 + 840 ≈ **~1.300 $** (yalnızca EN RPM tutarsa) |
| İyi (18–24. ay) | 2.000.000 | 0,5–1,5 $ | %30 EN | birkaç bin $ |

Hesabı yapan formül sayfada açık olduğu için sayıları kendi RPM gerçeğinizle (ilk 30 gün) değiştirin. **Asıl kaldıraç: EN sayfalar ve ajans CTA'sı (B2B lead).** Her sayfadaki "web tasarım/yazılım" bağlantısı reklamdan bağımsız değer üretir; ölçüm: iletişim formundan "kaynak" alanı.

---

## 8. Sonraki adımlar (kim ne yapsın)
1. **tool-developer:** `resim-kucult` motoru → biyometrik/boyutlandır/dönüştür; `parametreler.json` altyapısı ve hesaplayıcı çekirdeği.
2. **seo-writer:** dilekçe şablonları (ilk 15), biyometrik/ÖSYM rehberi, brüt-net/kıdem sayfa metinleri (2027 güncellemesine hazır).
3. **qa-tester:** hesaplayıcı altın testleri (brüt-net, kıdem, KDV; resmî örneklerle).
4. **policy-reviewer:** belge oluşturucular (N1, N4, N10) için politika/sahte belge denetimi.
5. **Sahip (siz):** Search Console + Bing + Yandex hesapları, AdSense yayıncı kimliği, Aralık'ta asgari ücret duyurusunu takip, ve §6'daki ölçüm kararı.
6. **Araştırma:** Google Trends'te (TR) ilk 25 sorguyu elle karşılaştırıp bu belgedeki Talep/Kaz. puanlarını revize etmek (≈1–2 saat; ben web arayüzünü kullanamıyorum, siz yapabilirsiniz veya Chrome oturumuyla ben yapabilirim).

## Kaynaklar (bu turda bakılanlar)
- Rakip site incelemesi: [hemenhesap.com](https://www.hemenhesap.com/) ve [resim küçültme sayfası](https://www.hemenhesap.com/hesap/resim-kucultme) (okundu)
- Medya hesaplama bölümleri: [Hürriyet](https://www.hurriyet.com.tr/hesaplama-araclari/), [Milliyet](https://www.milliyet.com.tr/hesaplama-araclari/), [CNN Türk](https://www.cnnturk.com/hesaplama-araclari/), [Kariyer.net](https://www.kariyer.net/hesaplama-araclari), [Eleman.net](https://www.eleman.net/hesaplama-araclari)
- YKS puan hesaplama talebi: [CNN Türk – YKS 2026 net/puan](https://www.cnnturk.com/turkiye/galeri/yks-2026-net-ve-puan-hesaplama-robotu-2026-yks-tyt-ayt-net-puan-hesaplama-nasil-yapilir-osym-tyt-ayt-puan-hesapla-3432678)
- AdSense reddi / araç siteleri (kişisel blog, anekdot): [NeatForge](https://neatforge.pages.dev/guides/adsense-rejection-reasons-tool-sites), [Google AdSense topluluk rehberi](https://support.google.com/adsense/community-guide/241032356/how-can-you-solve-the-low-value-content-adsense-disapproval-challenge?hl=en)
- Scaled content abuse (ikincil): [ppc.land](https://ppc.land/scaled-content-abuse/), [Victorious](https://victorious.com/blog/scaled-content-abuse/)
- AI Overviews etkisi (ikincil, dolaylı): [Digital Applied](https://www.digitalapplied.com/blog/ai-overviews-13-percent-queries-seo-traffic-impact)
- RPM kıyasları (pazarlama blogları, güvenilirlik düşük): [RankTracker](https://www.ranktracker.com/blog/which-niches-have-the-highest-rpm-in-adsense)


---

## Ek: 8. dalga için 40 araç fikri (hesapla/pdf/donustur/dosya)

Tarih: 2026-11-04. Filtre: `ARASTIRMA.md` §3.4 "Yapma listesi", CLAUDE.md kural 1 ve 8; tamamen istemci tarafı, ağ API'si yok.

**Talep kanıtı hakkında dürüst not.** WebSearch arama hacmi vermedi. Tek somut veri Ahrefs özeti: hesaplama.net trafiğinin %99,2'si Türkiye'den (~6,3 milyon ziyaret), "yüzde hesaplama" ~421 bin ziyaret, KPSS puan / yaş / KDV / TYT puan aramalarında 1. sırada ([ahrefstop.com](https://ahrefstop.com/websites/hesaplama.net)). Ayrıca hesapkurdu'nda emlak vergisi hesaplama sayfası ([hesapkurdu](https://www.hesapkurdu.com/konut-kredisi/h/emlak-vergi-hesaplama)); TinyWow'un öne çıkan grubu PDF/resim/metin araçları ([aipure](https://aipure.ai/products/tinywow)). Aşağıdaki Y/O/D değerleri bu verilere ve hesaplayıcı sitelerinin kategori yapısına dayanan **yargıdır**; Search Console / Keyword Planner ile doğrulanmalı.

**Çakışma önleme:** Mevcut 88 araç klasörü, 10 rehber ve 7. dalga listesi tekrar edilmedi. `not-ortalamasi`, `metin-araclari`, `birim-donustur`, `zamanlayici`, `yazdirilabilir-kagit` mevcut; uygulayan ajan önce ilgili sayfanın kapsamına bakmalı. Hesap araçlarında yıllık parametreler (dilim, oran, katsayı) düzenlenebilir alan + "yıl/kaynak" notu olarak verilir; kesin değer iddia edilmez.

Kısaltmalar: talep Y/O/D = yüksek/orta/düşük; zorluk 1-5.

### hesapla (20)

| # | Slug | Başlık | Hedef sorgular | Talep | Gerekçe | Teknik | Zor. | Politika/yasal risk |
|---|---|---|---|---|---|---|---|---|
| 1 | kpss-puan-hesapla | KPSS Puan Hesaplama | kpss puan hesaplama, kpss net hesaplama, kpss lisans puanı, kpss ortaöğretim puan | Y | hesaplama.net'te 1. sırada anahtar kelime | saf JS, yks/lgs motoru | 2 | Düşük; katsayı kullanıcı girer, "tahmini" notu |
| 2 | dgs-puan-hesapla | DGS Puan Hesaplama | dgs puan hesaplama, dgs net hesaplama, dgs sayısal ağırlıklı | Y | sınav sezonu | saf JS, aynı motor | 2 | Düşük |
| 3 | ales-puan-hesapla | ALES Puan Hesaplama | ales puan hesaplama, ales net, ales sayısal sözel | O | akademik başvuru | saf JS, aynı motor | 2 | Düşük |
| 4 | tyt-ayt-net-hesapla | TYT AYT Net Hesaplama | tyt net hesaplama, ayt net hesaplama, yks net | Y | TYT hesaplama.net'te 1. sırada | saf JS | 1 | Düşük; yks-puan ile çift içerik olmasın |
| 5 | gelir-vergisi-hesapla | Gelir Vergisi Hesaplama | gelir vergisi hesaplama, gelir vergisi dilimleri, yıllık gelir vergisi | Y | maaş/serbest meslek | saf JS, dilim tablosu düzenlenebilir | 3 | Orta (YMYL vergi): bilgilendirme notu |
| 6 | isveren-maliyeti-hesapla | İşveren Maliyeti Hesaplama | işveren maliyeti hesaplama, personel maliyeti, brüt maaşa işveren payı | O | KOBİ kitlesi | saf JS, brut-net motoru | 3 | Orta, aynı not |
| 7 | issizlik-maasi-hesapla | İşsizlik Maaşı Hesaplama | işsizlik maaşı hesaplama, işsizlik ödeneği ne kadar | Y | kıdem tazminatı kitlesi | saf JS, oran/tavan kullanıcı alanı | 3 | Orta (YMYL), "tahmini" |
| 8 | emlak-vergisi-hesapla | Emlak Vergisi Hesaplama | emlak vergisi hesaplama, bina vergisi, arsa vergisi | Y | hesapkurdu'nda sayfa var | saf JS; değer ve oranı kullanıcı girer | 2 | Düşük-orta |
| 9 | faiz-hesapla | Faiz Hesaplama (Basit/Bileşik/Mevduat) | faiz hesaplama, bileşik faiz hesaplama, mevduat net getiri, stopaj | Y | finans çekirdeği | saf JS, stopaj düzenlenebilir | 2 | Düşük; yatırım tavsiyesi yok |
| 10 | enflasyon-hesapla | Enflasyon ve Alım Gücü Hesaplama | enflasyon hesaplama, alım gücü kaybı | O | gündem; oran kullanıcıdan, TÜİK çekilmez | saf JS | 2 | Düşük |
| 11 | kar-marji-hesapla | Kâr Marjı ve Kâr Zarar Hesaplama | kar marjı hesaplama, kar zarar hesaplama, brüt kar | O | e-ticaret/esnaf | saf JS | 1 | Düşük |
| 12 | kira-getirisi-hesapla | Kira Getirisi ve Amortisman | kira getirisi hesaplama, amortisman süresi | O | emlak ilgisi | saf JS | 2 | Düşük; tavsiye yok |
| 13 | is-gunu-hesapla | İş Günü Hesaplama | iş günü hesaplama, iki tarih arası iş günü | O | tarih-farki yakın; tatiller kullanıcıdan | saf JS | 2 | Düşük |
| 14 | saat-dakika-hesapla | Saat Dakika Toplama/Çıkarma | saat hesaplama, saat dakika toplama, süre hesaplama | O | mesai kitlesi | saf JS | 1 | Düşük |
| 15 | istatistik-hesapla | İstatistik Hesaplama | ortalama, medyan, mod bulma, standart sapma hesaplama | O | öğrenci | saf JS | 1 | Düşük |
| 16 | oran-oranti-hesapla | Oran Orantı ve Üçlü Kural | oran orantı hesaplama, üçlü kural, ters orantı | O | ortaokul/lise | saf JS | 1 | Düşük |
| 17 | ebob-ekok-hesapla | EBOB EKOK Hesaplama | ebob ekok hesaplama, asal çarpanlara ayırma | O | MEB müfredatı | saf JS | 1 | Düşük |
| 18 | denklem-coz | İkinci Derece Denklem Çözücü | ikinci derece denklem çözme, diskriminant, kök bulma | O | lise matematik | saf JS | 2 | Düşük |
| 19 | alan-cevre-hesapla | Alan, Çevre ve Hacim Hesaplama | alan hesaplama, çevre hesaplama, daire alanı, hacim hesaplama | Y | çok şekil, uzun kuyruk | saf JS | 2 | Düşük |
| 20 | kesir-hesapla | Kesir ve Ondalık Dönüştürme | kesir hesaplama, kesir toplama, ondalık kesir çevirme | D-O | öğrenci | saf JS | 2 | Düşük |

### pdf (5)

| # | Slug | Başlık | Hedef sorgular | Talep | Gerekçe | Teknik | Zor. | Risk |
|---|---|---|---|---|---|---|---|---|
| 21 | pdf-a4-boyutlandir | PDF'i A4'e Sığdır | pdf a4 yapma, pdf sayfa boyutu değiştirme | O | e-Devlet/UYAP, yazdırma | pdf-lib (MIT) embedPage | 2 | Düşük |
| 22 | pdf-n-up | PDF'te Tek Kağıda Çok Sayfa | pdf bir sayfaya iki sayfa, kitapçık yazdırma | O | öğrenci/ofis | pdf-lib, aynı motor | 2 | Düşük |
| 23 | pdf-duzlestir | PDF Form Düzleştir | pdf form düzleştirme, flatten pdf | O | pdf-form-doldur çıktısını kilitleme | pdf-lib form.flatten() | 1 | Düşük |
| 24 | pdf-bilgi-duzenle | PDF Başlık/Yazar Bilgisi Düzenle | pdf özellikleri düzenleme, pdf başlık değiştir | D | meta-temizle tamamlayıcısı | pdf-lib | 1 | Düşük |
| 25 | pdf-resimleri-cikar | PDF'ten Görselleri Çıkar | pdf'ten resim çıkarma, pdf görselleri kaydet | O | yaygın araç | pdf.js (Apache-2.0) + fflate (MIT) | 4 | Orta: "hak sahibi olduğunuz dosyalar" notu |

### donustur (7)

| # | Slug | Başlık | Hedef sorgular | Talep | Gerekçe | Teknik | Zor. | Risk |
|---|---|---|---|---|---|---|---|---|
| 26 | resim-kirp | Resim Kırp | resim kırpma, fotoğraf kırp, instagram boyutuna kırp | Y | en yaygın görsel araçlardan, mevcutta yok | canvas | 2 | Düşük |
| 27 | resim-duzenle | Resim Düzenle (Parlaklık, Kontrast, Filtre) | fotoğraf düzenleme online, siyah beyaz yapma | Y | genel kitle | canvas filter | 2 | Düşük |
| 28 | resim-renk-paleti | Resimden Renk Paleti | resimden renk bulma, renk paleti çıkarma, hex kodu | O | renk-secici tamamlayıcısı | canvas + k-means saf JS | 2 | Düşük |
| 29 | resim-piksellestir | Resim Piksellestir / Mozaik | resim piksellestirme, mozaik efekti, 8 bit | D | bulanıklaştır kitlesi | canvas | 1 | Düşük; "sansür için tam güvenli değil" notu |
| 30 | ses-wav-donustur | Ses WAV'a Çevir / Hız Değiştir | ses dönüştürme, ses hızlandırma, wav dönüştür | O | ses-kirp ile aynı motor | Web Audio + elle WAV (mp3 yok) | 3 | Düşük |
| 31 | markdown-html-donustur | Markdown'dan HTML'e | markdown html çevirme, md to html | O | geliştirici | marked (MIT) + DOMPurify (Apache-2.0 seçilir) | 2 | Düşük |
| 32 | html-markdown-donustur | HTML'den Markdown'a | html markdown çevirme | D | aynı kitle | turndown (MIT) | 2 | Düşük |

### dosya: yazdırılabilir şablon ve geliştirici (8)

| # | Slug | Başlık | Hedef sorgular | Talep | Gerekçe | Teknik | Zor. | Risk |
|---|---|---|---|---|---|---|---|---|
| 33 | ders-programi-olustur | Ders Programı Oluştur | ders programı hazırlama, haftalık ders programı pdf | Y | okul dönemi, kalıcı sorgu | HTML/CSS + pdf-lib/yazdır | 2 | Düşük |
| 34 | kapak-sayfasi-olustur | Ödev/Rapor Kapak Sayfası | ödev kapağı hazırlama, proje kapak sayfası | Y | öğrenci; tez-rapor rehberiyle uyumlu | HTML/CSS + pdf-lib | 2 | Düşük; kurum amblemi gömülmez, kullanıcı kendi görselini ekler |
| 35 | haftalik-plan-olustur | Haftalık/Aylık Planlayıcı | haftalık planlayıcı pdf, yapılacaklar listesi yazdır | O | şablon aramaları | HTML/CSS | 1 | Düşük |
| 36 | yaml-json-donustur | YAML ↔ JSON | yaml json çevirme, yaml doğrulama | O | geliştirici | js-yaml (MIT) | 2 | Düşük |
| 37 | sql-bicimlendir | SQL Biçimlendirici | sql formatlama, sql beautifier | O | geliştirici | sql-formatter (MIT) | 2 | Düşük |
| 38 | unix-zaman-damgasi | Unix Zaman Damgası Çevirici | unix timestamp çevirme, epoch tarih | O | geliştirici | saf JS Intl | 1 | Düşük |
| 39 | jwt-coz | JWT Çözücü (Yerel) | jwt decode, jwt token okuma | O | geliştirici | saf JS base64url | 1 | Orta: token hassas, "ağa gitmez" vurgusu; imza doğrulama/üretme yok |
| 40 | uuid-uret | UUID/GUID Üretici | uuid üretici, guid oluştur | D | geliştirici | crypto.randomUUID | 1 | Düşük |

### Bilerek önerilmeyenler

| Fikir | Sebep |
|---|---|
| Fatura/makbuz/sertifika-diploma/rapor üretici | Sahte belge riski (kural 8) |
| TC/IBAN/kart üretici | Dolandırıcılık |
| BMI/kalori/gebelik/ovülasyon | YMYL sağlık |
| Bahis/loto kombinasyonu | AdSense kısıtlı içerik |
| Namaz/döviz/altın/hava | Ağ API'si |
| MP3 kodlama, video, HEIC | LGPL/GPL |
| Arka plan silici | AGPL |
| Emekli yaşı/EYT hesabı | Kural karmaşıklığı, YMYL |

### İlk 16 (8 ajan × 2 araç)

| Ajan | Araç A | Araç B | Ortak motor | Gerekçe |
|---|---|---|---|---|
| 1 | kpss-puan-hesapla | dgs-puan-hesapla | sınav puan motoru (yks/lgs) | En güçlü kanıt, düşük risk |
| 2 | resim-kirp | resim-duzenle | canvas | Mevcutta olmayan yüksek hacimli görsel araçları |
| 3 | gelir-vergisi-hesapla | isveren-maliyeti-hesapla | brut-net/vergi dilimi motoru | Finans kitlesi; YMYL notu şart |
| 4 | faiz-hesapla | enflasyon-hesapla | bileşik büyüme motoru | Finans CPC; tavsiyesiz biçim |
| 5 | pdf-a4-boyutlandir | pdf-n-up | pdf-lib embedPage | Sıfır risk, ucuz |
| 6 | ders-programi-olustur | kapak-sayfasi-olustur | HTML/CSS + yazdır/pdf-lib | Öğrenci dönemi trafiği |
| 7 | alan-cevre-hesapla | oran-oranti-hesapla | saf JS formül sayfaları | Uzun kuyruk, kolay |
| 8 | markdown-html-donustur | html-markdown-donustur | marked + turndown | MIT, ucuz |

Yedekler: tyt-ayt-net-hesapla, issizlik-maasi-hesapla, emlak-vergisi-hesapla, kar-marji-hesapla, ales-puan-hesapla, pdf-duzlestir, resim-renk-paleti, istatistik-hesapla.

Uygulama notu: her sayfa kural 3 gereği ≥800 kelime özgün metin, SSS ≥ 6 ve gizlilik rozeti içermeli; vergi/finans/sınav sayfalarında "bilgilendirme amaçlı, resmî kaynakla doğrulayın" ve parametre yılı yazılmalı. marked, turndown, DOMPurify, js-yaml, sql-formatter `THIRD_PARTY_NOTICES.md`'ye eklenmeli.
