# ARASTIRMA-4: Bizde olmayan, istemci tarafı yapılabilir fırsatlar

Tarih: 2026-11-04. Yöntem: mevcut slug listesi (web/, web/oyunlar, web/rehber, web/en) ile karşılaştırma + web araması.

**Veri notu (dürüstlük):** WebSearch ABD merkezlidir ve kesin Google Trends / aylık hacim verisi vermedi. "İlgi" değerleri şu kanıtlara dayanan tahmindir: (1) Ahrefs'e göre hesaplama.net (trafiğinin %99,2'si Türkiye) "yüzde hesaplama" 551K, "kpss puan hesaplama" 389K, "yaş hesaplama" 167K, "kdv hesaplama" 164K, "tyt puan hesaplama" 142K aylık arama hacmine sahip; (2) Hürriyet ve CNN Türk "Hesaplama Araçları" vitrinleri (en çok aranan hesaplar öne konur); (3) hepsihesapla / alomaliye gibi rakip listeleri; (4) genel kategori bilgisi. Kesin hacim için Google Trends TR + Ahrefs/Semrush'ta elle doğrulama önerilir. Sınav puanı, zam/kira gibi konular mevsimseldir.

**Haber vitrinlerinde / hesaplama.net'te olup bizde bulunmayanlar:** zekat, OBP (lise mezuniyet puanı), indirim oranı, metrekare, desi, okula başlama yaşı, TYT/AYT ayrı sayfaları.

Kısaltmalar: Y=yüksek, O=orta, D=düşük. "Evet" = saf JS, kütüphane gerekmez.

## 1. Aday tablosu (öncelik sırasına göre)

| # | Slug önerisi | Kategori | TR arama ilgisi (gerekçe) | Örnek rakip | İstemci tarafı | Kural 8 |
|---|---|---|---|---|---|---|
| 1 | zekat-hesapla | hesapla | Y (hesaplama.net, Hürriyet, CNN Türk vitrinleri; Ramazan/Kurban öncesi zirve) | hesaplama.net | evet (nisap değerini kullanıcı girer) | yok |
| 2 | obp-hesapla | hesapla | Y (vitrinlerde üst sıra; her yaz zirve) | hesaplama.net | evet | yok |
| 3 | tyt-puan-hesapla | hesapla | Y (Ahrefs: 142K hacim) | hesaplama.net | evet (yks koduyla ortak) | yok |
| 4 | ayt-puan-hesapla | hesapla | Y (YKS ile birlikte aranır) | hesaplama.net | evet | yok |
| 5 | indirim-orani-hesapla | hesapla | Y (vitrinlerde, kampanya dönemleri) | hesaplama.net | evet | yok |
| 6 | desi-hesapla | hesapla | Y (e-ticaret/kargo, vitrinlerde) | hesaplama.net | evet | yok |
| 7 | metrekare-hesapla | hesapla | Y (vitrinlerde, emlak/inşaat) | hesaplama.net | evet | yok |
| 8 | okula-baslama-yasi-hesapla | hesapla | Y (yazın zirve, vitrinlerde) | hesaplama.net | evet | yok |
| 9 | konut-kredisi-hesapla | hesapla | Y (kredi hesabının alt niyeti) | hesapkurdu, bankalar | evet | yok |
| 10 | tasit-kredisi-hesapla | hesapla | Y | hesapkurdu | evet | yok |
| 11 | ihtiyac-kredisi-hesapla | hesapla | Y | hesapkurdu | evet | yok |
| 12 | asgari-ucret-hesapla | hesapla | Y (yıl başı / ara zamda çok yüksek) | alomaliye | evet (yıllık parametre tablosu) | yok |
| 13 | mevduat-faizi-hesapla (net getiri, stopaj) | hesapla | Y | hesapkurdu | evet | yok |
| 14 | emeklilik-yasi-hesapla | hesapla | Y (EYT sonrası da güçlü) | hesaplama.net | evet (kural tablosu; "bilgilendirme" notu) | yok |
| 15 | kelime-say-karakter-say | dosya | Y (kalıcı yüksek; metin-araclari içinde varsa ayrı niyet sayfası) | wordcounter.net | evet | yok |
| 16 | buyuk-kucuk-harf-donustur | dosya | Y (TR i/İ sorunu aranır) | metin siteleri | evet (toLocaleUpperCase('tr')) | yok |
| 17 | pdf-sayfa-sil | pdf | Y ("pdf sayfa silme") | ilovepdf, smallpdf | evet (pdf-lib, MIT) | yok |
| 18 | webp-jpg-donustur | donustur | Y (rehber var, araç slug'ı ayrı) | convertio | evet (canvas) | yok |
| 19 | jpg-png-donustur | donustur | Y | iloveimg | evet (canvas) | yok |
| 20 | fotograf-50-kb-yap (ve 100/200 kb ön ayarları) | donustur | Y (başvuru/e-Devlet fotoğraf boyutu) | iloveimg | evet | yok |
| 21 | heic-jpg-donustur | donustur | Y (iPhone fotoğrafları) | heictojpg.com | kısmen (heic2any MIT; içindeki libheif lisansı doğrulanmalı) | yok |
| 22 | cps-testi | oyunlar | Y (global trend) | clickspeedtest.com | evet | yok |
| 23 | kelime-tahmin (Türkçe 5 harfli) | oyunlar | Y (Wordle benzeri kalıcı trafik) | TR Wordle klonları | evet (kelime listesi gömülür; "Wordle" adı kullanılmaz) | yok |
| 24 | okey | oyunlar | Y (TR'de çok popüler) | okey siteleri | kısmen (bota karşı; çok oyunculu yok) | yok |
| 25 | pisti | oyunlar | Y | kağıt oyun siteleri | evet (bot) | yok |
| 26 | batak | oyunlar | Y | batak siteleri | evet (bot) | yok |
| 27 | bubble-shooter (balon-atis) | oyunlar | Y (poki/crazygames üst sıra) | poki | evet | yok |
| 28 | mahjong-eslestirme | oyunlar | Y | poki | evet | yok |
| 29 | labirent-yemleme (Pac-Man tarzı, özgün ad/görsel) | oyunlar | Y | poki | evet | yok (telifli ad/görsel kullanma) |
| 30 | resim-arka-plan-sil | donustur | Y (global çok yüksek) | remove.bg | kısmen (onnxruntime-web MIT + açık lisanslı model; büyük indirme, model lisansı doğrulanmalı) | yok |
| 31 | mp4-mp3-donustur | donustur | Y | convertio | kısmen (WebCodecs; ffmpeg.wasm LGPL/GPL çekirdek, kullanma) | yok |
| 32 | video-sikistir | donustur | Y | clideo, freeconvert | kısmen (WebCodecs + muxer; tarayıcı desteği değişken) | yok |
| 33 | video-kirp | donustur | O-Y | clideo | kısmen (WebCodecs/MediaRecorder) | yok |
| 34 | ses-yaziya-cevir | dosya | Y | speechnotes | kısmen (Web Speech API bazı tarayıcılarda sunucuya gider: gizlilik rozetiyle çelişir, cihaz içi model gerekir) | yok |
| 35 | pdf-sayfa-cikar | pdf | O | ilovepdf | evet (pdf-lib) | yok |
| 36 | pdf-resim-cikar | pdf | O | pdfcandy | evet (pdf.js, Apache-2.0) | yok |
| 37 | adet-dongusu-hesapla | hesapla | Y (yumurtlama-hesapla'ya komşu) | sağlık siteleri | evet (yerel veri, gizlilik avantajı) | yok |
| 38 | bazal-metabolizma-hesapla | hesapla | O-Y | calculator.net | evet | yok |
| 39 | vucut-yag-orani-hesapla | hesapla | O-Y | calculator.net | evet | yok |
| 40 | bilesik-faiz-hesapla | hesapla | O | calculator.net | evet | yok |
| 41 | ters-yuzde-hesapla (yüzde artış/azalış) | hesapla | Y (yüzde varyant niyetleri) | hesaplama.net | evet | yok |
| 42 | ortalama-hesapla (aritmetik/geometrik) | hesapla | O | omnicalculator | evet | yok |
| 43 | kredi-karti-asgari-odeme-hesapla | hesapla | O-Y | banka siteleri | evet | yok |
| 44 | ek-ders-ucreti-hesapla | hesapla | O | eğitim siteleri | evet (birim ücret tablosu) | yok |
| 45 | boya-fayans-hesapla | hesapla | O (tadilat) | tadilat siteleri | evet | yok |
| 46 | beton-hesapla | hesapla | O | calculator.net | evet | yok |
| 47 | json-yaml-donustur | dosya | O | codebeautify | evet (js-yaml, MIT) | yok |
| 48 | sql-bicimlendir | dosya | D-O | sqlformat.org | evet (sql-formatter, MIT) | yok |
| 49 | xml-bicimlendir | dosya | D-O | freeformatter | evet (DOMParser) | yok |
| 50 | uuid-uret | dosya | D-O | uuidgenerator.net | evet (crypto.randomUUID) | yok |
| 51 | jwt-coz | dosya | D-O | jwt.io | evet (yalnız decode) | yok |
| 52 | unix-zaman-damgasi | dosya | O | unixtimestamp.com | evet | yok |
| 53 | cron-ifade-olustur | dosya | D-O | crontab.guru | evet (cronstrue, MIT) | yok |
| 54 | meme-olustur | donustur | O | imgflip | evet (canvas; kullanıcı kendi görselini yükler) | yok |
| 55 | resim-kolaj-olustur | donustur | O-Y | fotor | evet | yok |
| 56 | ay-evresi-hesapla | hesapla | O | timeanddate | evet | yok |
| 57 | nisan-testi (aim trainer) | oyunlar | O-Y | aim trainer siteleri | evet | yok |
| 58 | bilardo-8-top | oyunlar | O-Y | poki | evet (canvas fizik) | yok |
| 59 | kelime-zinciri | oyunlar | O | oyun siteleri | evet (TR kelime listesi) | yok |
| 60 | bowling | oyunlar | O | poki | evet | yok |
| 61 | hanoi-kulesi | oyunlar | D-O | okul siteleri | evet | yok |
| 62 | isik-sondurme | oyunlar | D | poki | evet | yok |
| 63 | sayi-bulmaca-24 | oyunlar | D-O | 24game | evet | yok |
| 64 | tangram | oyunlar | D-O | okul siteleri | evet | yok |
| 65 | fatura-sablonu-olustur | dosya | O-Y | invoice-generator | evet (pdf-lib) | **var (düşük-orta)**: sahte belge riski; yalnız "örnek şablon, resmî e-fatura değildir" uyarısıyla, aksi halde atla |

### Rehber adayları (12)
zekat-nasil-hesaplanir, obp-nasil-hesaplanir, tyt-ayt-puan-nasil-hesaplanir, indirim-orani-nasil-hesaplanir, desi-nasil-hesaplanir-kargo, metrekare-nasil-hesaplanir, heic-dosyasi-nasil-acilir, pdf-sayfa-silme-nasil-yapilir, asgari-ucret-net-brut, emeklilik-yasi-nasil-hesaplanir, mevduat-faiz-getirisi-nasil-hesaplanir, fotograf-boyutu-kb-dusurme.

### İngilizce (en/) öncelikleri
Mevcut en/ yalnız PDF/resim ağırlıklı. Öncelik: jpg-to-png, png-to-jpg, webp-to-jpg, heic-to-jpg, remove-background, delete-pdf-pages, extract-pdf-pages, word-counter, case-converter, json-formatter, uuid-generator, cps-test, typing-speed-test, bmi-calculator, loan-calculator, compound-interest-calculator, discount-calculator, mp4-to-mp3. İngilizce AdSense RPM'si Türkçeden belirgin yüksektir.

## 2. (a) En hızlı 10 kazanç (yüksek trafik + kolay yapım)

1. zekat-hesapla
2. obp-hesapla
3. tyt-puan-hesapla + ayt-puan-hesapla (yks koduna dayanır)
4. indirim-orani-hesapla
5. desi-hesapla
6. metrekare-hesapla
7. okula-baslama-yasi-hesapla
8. konut / taşıt / ihtiyaç kredisi (kredi-hesapla koduna dayanır, 3 sayfa)
9. kelime-say-karakter-say + buyuk-kucuk-harf-donustur (metin-araclari kodundan)
10. pdf-sayfa-sil + webp-jpg-donustur + jpg-png-donustur (mevcut kod, yeni niyet sayfaları)

## 3. (b) SEO / trafik önerileri

- **Niyet bölme:** Tek "kredi" sayfası yerine konut/taşıt/ihtiyaç ayrı sayfa; her biri kendi 800+ kelimelik metni ve SSS'siyle (kural 3). Hesaplama.net'in gücü bu uzun kuyruk sayfalarından gelir.
- **Mevsimsellik:** Ocak: asgari ücret, zam, kira artışı. Mayıs-Temmuz: LGS, YKS, TYT/AYT, OBP, KPSS. Ağustos-Eylül: okula başlama yaşı, ders programı. Ramazan/Kurban öncesi: zekat, kurban hisse (var). Sezondan 4-6 hafta önce yayınla.
- **İç bağlantı kümeleri:** sınav (yks, tyt, ayt, obp, kpss, ales, lgs, dgs), maaş/işçi (brüt-net, asgari ücret, kıdem, ihbar, mesai, yıllık izin), kredi (kredi, konut, taşıt, ihtiyaç, faiz, mevduat), sağlık (vki, kalori, bmr, yağ oranı, adet döngüsü), PDF/resim. Her araçta "ilgili araçlar" + rehber; her rehberde araca CTA.
- **Yıllık güncelleme:** Parametreli sayfalarda başlıkta yıl ve "son güncelleme" tarihi; mevcut URL'yi yenile, yeni URL açma.
- **İngilizce:** Önce dönüştürücü ve PDF araçları; hesaplamalardan evrensel olanlar (BMI, compound interest, percentage, discount).
- **Oyunlar:** Poki/CrazyGames kategorileri kalıcı trafik getirir; TR geleneksel kart oyunlarında (okey, pisti, batak) rekabet düşük. Oyun sayfalarına da 800+ kelime (kurallar, ipuçları, SSS).
- **Doğrulama:** Yayından önce Google Trends TR ve Search Console sorgularıyla sırayı güncelle.

## 4. (c) Yapılmaması gerekenler

- **Kural 8:** TC kimlik / IBAN / vergi no üretici (doğrulayıcı var, üretici yok), sahte dekont-fatura-belge, filigran kaldırıcı, PDF/zip/Office şifre kırıcı, video indirici (YouTube/Instagram/TikTok), telifli içerik indirici, SMS bomber, sahte sağlık raporu, kimlik/ehliyet düzenleyici.
- **Resmî görünüm:** Fatura/makbuz/sözleşme şablonları resmî belge iddiası taşımaz (#65 çekinceli).
- **Lisans:** ffmpeg.wasm (LGPL/GPL çekirdek), libheif (LGPL), AGPL ve gelir eşikli lisanslar eklenmez; yeni paket THIRD_PARTY_NOTICES'a yazılır.
- **Gizlilik rozeti:** Web Speech API ve CDN'den model çekme "dosya sunucuya gitmez" iddiasını bozabilir; cihaz içi çalıştır veya o sayfada iddiayı değiştir.
- **Canlı veri:** Döviz/altın/borsa/namaz vakti/hava durumu sunucusuz yapılamaz; kullanıcı elle girsin ya da yapma.
- **Telif:** Tetris, Pac-Man, Wordle vb. ad ve görseller kullanılmaz; özgün ad/görsel.
- **İnce içerik:** Sadece araç olan sayfa yayınlanmaz.
- **Tavsiye:** Emeklilik, vergi, tazminat, adet/gebelik sayfalarında "bilgilendirme amaçlıdır, tavsiye değildir" notu zorunlu.

## Kaynaklar
- Ahrefs verisi (hesaplama.net): https://ahrefstop.com/websites/hesaplama.net
- Hürriyet hesaplama araçları: https://www.hurriyet.com.tr/hesaplama-araclari/
- CNN Türk hesaplama araçları: https://www.cnnturk.com/hesaplama-araclari/
- Similarweb rakip sayfaları: https://www.similarweb.com/website/freeconvert.com/competitors
