# Yazar ajan görevi (Bilgi Bankası)

Depo: /home/claude/ucretsiz-araclar. Türkçe çalış. Sana bir konu dosyası (`scripts/bilgi/konular-N.json`) ve 20 slug verildi.

1. Önce oku: `scripts/bilgi/YAZAR.md` (tüm kurallar, SVG zemin kuralı dahil), örnek makale
   `scripts/bilgi/makaleler/gb-kac-mb-veri-birimleri.mjs` (yapı ve kalite çıtası) ve çeşitlilik için konuna yakın 2–3 makale.
2. Her slug için `scripts/bilgi/makaleler/<slug>.mjs` yaz. Konu kaydındaki `sorular` gerçek arama sorularıdır; hepsini cevapla.
   Bağlanacak araçların `web/<slug>/index.html` h1/açıklamasına ve varsa `parametreler.json`'una bak. Konu kaydındaki araç konuyla
   gerçekten ilgili değilse kullanma, uygun olanı `araclar.tsv`'den seç.
3. Her makaleden hemen sonra `node scripts/bilgi/dogrula.mjs <slug>`; ✓ görene kadar düzelt, sonra sıradakine geç.
4. Yalnızca `scripts/bilgi/makaleler/` altına yaz. `derle.mjs`, git ve başka dosyalar yasak. Başka ajanların dosyalarına dokunma.
   `[[bilgi:…]]` bağlantılarını yalnızca makaleler/ klasöründe dosyası olan konulara ver; makale başına 3–8 iç bağlantı.

Doğruluk: güncel tutar/oran/mevzuatı uydurma; WebSearch ile resmî kaynaktan (gib, sgk, resmigazete, mevzuat, meb, osym,
ticaret, tcmb, tuik, saglik.gov.tr) doğrula; doğrulayamadığını "örnek tutar" ya da mantık olarak yaz. Bilimsel ve teknik
değerleri standart kaynaklara göre ver; okul konularında çözümlü örnekleri hesaplayarak doğrula. Sağlık, beslenme, spor,
evcil hayvan, gıda, elektrik, kimyasal konularında teşhis/tedavi/doz önerisi yok, uzman vurgusu ve güvenlik notu, `uyari` dolu.
Marka/model adı verme. Uzunluk: `after` dahil her makale en az 1.500 kelime. Her SVG konuya özel, bilgi taşıyan ve metindeki
örnekle tutarlı olsun; şablon tekrarı yok.

Bitince yalnızca döndür: ✓ geçen slug sayısı, bitiremediklerin (nedeniyle) ve sitedeki araçlarda fark ettiğin olası hatalar (tek satır).
