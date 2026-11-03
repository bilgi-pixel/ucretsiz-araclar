# "Ücretsiz Araçlar" menüsü (bilisimajans.com)

Önerilen üst menü etiketi: **Ücretsiz Araçlar** ("Programlar" indirme çağrıştırır; araçlar
tarayıcıda çalıştığı için "Araçlar" daha doğru ve arama niyetine daha yakın).
Daha iddialı alternatifler: "Araç Kutusu", "Bedava Araçlar", "Online Araçlar".

## WordPress.com'da ekleme adımları

1. https://wordpress.com/home/bilisimajans.com → **Görünüm → Menüler** (blok temada:
   **Görünüm → Düzenleyici → Gezinme**).
2. Üst menüye **Özel Bağlantı** ekle: etiket `Ücretsiz Araçlar`, URL aşağıdaki "Tüm Araçlar".
3. Altına şu alt öğeleri ekle (hepsi Özel Bağlantı):

| Etiket | Bağlantı (şimdilik) | DNS sonrası |
|---|---|---|
| Tüm Araçlar | https://araclar.bilisimajans.com/ | https://araclar.bilisimajans.com/ |
| Resimden PDF'e | …/ucretsiz-araclar/resimden-pdfe/ | …/resimden-pdfe/ |
| PDF Birleştir | …/ucretsiz-araclar/pdf-birlestir/ | …/pdf-birlestir/ |
| PDF Böl | …/ucretsiz-araclar/pdf-bol/ | …/pdf-bol/ |
| PDF'den Resme | …/ucretsiz-araclar/pdfden-resme/ | …/pdfden-resme/ |
| Neden Ücretsiz? | /ucretsiz-programlar (WordPress sayfası) | aynı |

4. **Sayfalar → Yeni Sayfa**: başlık "Ücretsiz Araçlar", kalıcı bağlantı `/ucretsiz-programlar`,
   içerik `site/ucretsiz-programlar.md` dosyasından.

## Alt alan adı (araclar.bilisimajans.com) için DNS

Alan adı WordPress.com'da yönetiliyorsa: **Yükseltmeler → Alan Adları → bilisimajans.com →
DNS kayıtları** → yeni kayıt:

- Tür: `CNAME` · Ad: `araclar` · Değer: `bilgi-pixel.github.io` · TTL: varsayılan

Kayıt eklendikten sonra `docs/CNAME.bekliyor` dosyası `web/CNAME` olarak geri taşınır ve
GitHub → Settings → Pages → Custom domain alanına `araclar.bilisimajans.com` yazılır
(bunu ben yaparım; DNS kaydını eklediğinizi söylemeniz yeter).
