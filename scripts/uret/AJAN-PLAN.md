# Ajan görevi: yazdırılabilir planlayıcı / çizelge spec'leri (PDF çıktılı)

Depo: /home/claude/repo. Sana bir slug listesi verildi (hepsi `katalog.txt`'te `planlama` kategorisinde).

1. Önce oku: `scripts/uret/REHBER.md`, `scripts/uret/AJAN.md` (genel kurallar), ve **örnek olarak**
   `scripts/uret/specs/haftalik-planlayici.mjs` (PDF çıktılı araç böyle yazılır), `web/assets/js/arac-yardimci.js`.
2. Her slug için `scripts/uret/specs/<slug>.mjs` yaz; hemen `node scripts/uret/dogrula.mjs <slug>` ile ✓ görene kadar düzelt.
   Yalnızca `scripts/uret/specs/` altına yaz; derle.mjs ya da git çalıştırma. Zaten var olan spec'e dokunma.
3. PDF kuralları (REHBER'e ek):
   - Spec'te `pdf: true` ve `category: 'planlama'` olmalı. `compute` şunu döndürür:
     `{ rows, note?, pdf: { ad: '<slug>', baslik, boyut: 'a4'|'a5', yatay: true|false, sayfalar: [[işlem…], …] } }`
   - İşlemler **milimetre**, başlangıç sol üst köşe. Sayfa: A4 210×297, A5 148×210 (yatay ise en-boy yer değiştirir).
     - `['cizgi', x1, y1, x2, y2, { kalinlik, ton, kesik }]`
     - `['kutu', x, y, genislik, yukseklik, { dolgu, cizgi, kalinlik }]`
     - `['daire', x, y, yaricap, { dolgu, cizgi, kalinlik }]`
     - `['yazi', 'metin', x, y, punto, { kalin, hiza: 'sol'|'orta'|'sag', ton }]` — y satır taban çizgisidir.
     - `ton`/`dolgu`/`cizgi`: 0 (siyah) – 1 (beyaz) arası gri; ya da `'#rrggbb'`. Son öğe seçenek nesnesidir, atlanabilir.
   - Her şey kenardan en az 4 mm içeride olmalı (doğrulayıcı reddeder); pratikte 10–12 mm kenar boşluğu bırak.
     Yazı puntosu 5–40. Yazının kutudan taşmadığını kendin hesapla (yaklaşık karakter genişliği ≈ punto × 0,19 mm);
     uzun kullanıcı metinlerini sınırla (`h.err` ile) ya da kısalt.
   - Bir dosyada en fazla 60 sayfa. Test örneklerinde `pdfSayfa: n` ile sayfa sayısını doğrula.
   - Tarihe bağlı planlayıcılarda tarih alanı boşsa `h.dateOrToday` kullan; örneklerde tarihi hep doldur
     (ISO biçimi: '2026-11-18'). Tarih/gün/hafta hesaplarını bilinen takvim günleriyle doğrula
     (ör. 16.11.2026 Pazartesi, 01.01.2027 Cuma, 29.02.2028 Salı).
   - Kullanışlı seçenekler sun: kâğıt boyutu (A4/A5), sayfa/hafta/ay sayısı, isteğe bağlı başlık, satır sayısı,
     kullanıcının kendi kalemleri (alışkanlık adları, dersler vb. — textarea'da satır satır, sınırla).
   - Tasarım **özgün** olsun: başka bir sitenin ya da ürünün düzenini, adını, metnini taklit etme. Sade, baskıya uygun,
     gri tonlu, bol yazma alanı olan düzen. Marka adı, logo, alıntı söz, telifli içerik yok.
4. İçerik kuralları aynı: en az 800 kelime özgün Türkçe metin (sayfada ne var, nasıl doldurulur, yazdırma/ciltleme,
   sınırlar…), en az 7 SSS, en az 6 örnek (≥1 hata). Sağlıkla ilgili çizelgelerde (uyku, su, ruh hali, egzersiz)
   "tıbbi tavsiye değildir" notu ve abartısız dil.

Bitince yalnızca şunu döndür: geçen slug'lar ve varsa bitiremediklerin (nedeniyle).
