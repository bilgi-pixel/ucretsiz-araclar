# Ajan görevi: zekâ / IQ testi sayfalarının içerik spec'leri

Depo: /home/claude/repo. Test motoru ve soru üreticileri HAZIR (`web/assets/js/zeka-test.js`, `zeka-sorular.js`);
sen yalnızca sayfa spec'lerini (ve sana ayrıca söylendiyse soru bankasını) yazarsın.

1. Önce oku: `scripts/uret/REHBER.md` (içerik kuralları), `web/assets/js/zeka-sorular.js` (soru türlerini anlamak için).
2. Her slug için `scripts/uret/specs/<slug>.mjs` yaz; `node scripts/uret/dogrula.mjs <slug>` ile ✓ görene kadar düzelt.
   Yalnızca sana verilen dosyaları yaz; derle.mjs ya da git çalıştırma.
3. Test spec'i biçimi (form araçlarından farklı: `inputs`, `button`, `compute`, `cases` YOK):

```js
export default {
  slug: 'mantik-testi',
  title: 'Mantık Testi',                 // katalog.txt'teki başlık, aynen
  h1Tail: 'ücretsiz, açıklamalı',        // isteğe bağlı, kısa
  pageTitle: '…30–75 karakter…',
  description: '…110–170 karakter…',
  card: '…40–150 karakter…',
  category: 'zeka',
  kind: 'test',
  keywords: [/* 5–10 arama ifadesi */],
  lead: '1–2 cümle giriş.',
  test: { sure: 15, karisim: [['mantik', 15]] },   // AŞAĞIDAKİ TABLODAN AYNEN AL, değiştirme
  howto: [/* 3–6 adım */],
  sections: [/* en az 4 bölüm: { h, p?: [], ul?: [], ol?: [] } */],
  faq: [/* en az 7 [soru, cevap] */],
  related: [/* 3–6 slug: diğer zekâ testleri ve ilgili araçlar/oyunlar */],
};
```

4. Test ayarları (slug → `test`):
   - iq-testi → `{ sure: 25, karisim: [['matris', 6], ['sayiDizisi', 5], ['benzetme', 4], ['mantik', 4], ['donus', 3], ['harfDizisi', 3], ['sayiBenzetme', 3], ['farkliKelime', 2]] }`
   - hizli-iq-testi → `{ sure: 6, karisim: [['matris', 3], ['sayiDizisi', 2], ['benzetme', 2], ['mantik', 2], ['donus', 1]] }`
   - gorsel-iq-testi → `{ sure: 20, karisim: [['matris', 12], ['donus', 6]] }`
   - sayisal-zeka-testi → `{ sure: 15, karisim: [['sayiDizisi', 8], ['sayiBenzetme', 6], ['farkliSayi', 6]] }`
   - sozel-zeka-testi → `{ sure: 12, karisim: [['benzetme', 10], ['farkliKelime', 6], ['harfDizisi', 4]] }`
   - mantik-testi → `{ sure: 15, karisim: [['mantik', 15]] }`
   - sayi-dizisi-testi → `{ sure: 12, karisim: [['sayiDizisi', 15]] }`
   - sekil-matris-testi → `{ sure: 15, karisim: [['matris', 15]] }`
   - uzamsal-zeka-testi → `{ sure: 10, karisim: [['donus', 12]] }`
   - dikkat-testi → `{ sure: 6, karisim: [['dikkat', 12]] }`
   - cocuklar-icin-zeka-testi → `{ sure: 15, karisim: [['matris', 4, 1], ['sayiDizisi', 4, 1], ['harfDizisi', 2, 1], ['mantik', 2, 1], ['sayiBenzetme', 2, 1], ['dikkat', 1, 1]] }`
   - harf-dizisi-testi → `{ sure: 10, karisim: [['harfDizisi', 15]] }`
   - benzetme-testi → `{ sure: 10, karisim: [['benzetme', 15]] }`
   - farkli-olani-bul-testi → `{ sure: 10, karisim: [['farkliSayi', 8], ['farkliKelime', 7]] }`

5. İçerik (en az 800 kelime, özgün, her sayfa kendi testini anlatır):
   - Testte hangi soru türleri var, her biri neyi ölçmeye çalışır, bir-iki **çözümlü örnek** (kendi yazdığın, üreticinin
     kurallarına uygun: ör. dizide farkın artması, matriste satır/sütun kuralı, ayna görüntüsü-döndürme farkı).
   - Sonuç ekranı: doğru/yanlış/boş sayısı, başarı yüzdesi, tür bazında döküm, cevap anahtarı ve açıklamalar,
     "yeni sorularla tekrar çöz". Sorular her seferinde yeniden üretilir.
   - **Dürüstlük şart:** Bu testler eğlence ve alıştırma amaçlıdır; sonuç bir IQ puanı DEĞİLDİR, site IQ sayısı vermez.
     Gerçek IQ ölçümü norm çalışması yapılmış testlerle, uzman gözetiminde yapılır. Tanı, okul yerleştirme, işe alım
     gibi kararlar için kullanılmaz. "Bilimsel olarak kanıtlanmış", "resmî", "sertifikalı" gibi iddialar YOK.
     Çocuk testinde: ebeveyn eşliğinde, etiketleme yapmadan, gelişim endişesi varsa uzmana danışın.
   - Çözüm ipuçları, sık yapılan hatalar, süre yönetimi, pratikle gelişme (alıştırma etkisi) gibi yararlı bölümler.
   - Marka/ürün/kuruluş/test adı (ticari test adları, dernek adları) geçmesin; bağlantı yok; emoji yok.
   - Gizlilik: cevaplar ve sonuç hiçbir yere gönderilmez, kayıt gerekmez (doğrudur).
6. `related` için kullanılabilecek slug'lar: bu listedeki diğer testler, ayrıca mevcut araçlar
   (`sayi-dizisi`… değil; gerçekten var olanlar: `aritmetik-dizi-hesapla`, `geometrik-dizi-hesapla`, `olasilik-hesapla`,
   `asal-sayi-sorgula`, `hizli-okuma`, `anagram-kontrol`, `kelime-bulucu`, `pascal-ucgeni-olustur`). Doğrulayıcı kontrol eder.

Bitince yalnızca şunu döndür: geçen slug'lar ve varsa bitiremediklerin (nedeniyle).
