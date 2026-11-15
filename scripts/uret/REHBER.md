# Araç spec'i yazma rehberi (ajanlar için)

Her araç tek dosyadır: `scripts/uret/specs/<slug>.mjs`. Üretici (`derle.mjs`) bu dosyadan sayfayı,
mantığı, kartı ve testi üretir. **Yalnızca spec dosyası yazarsın**; `web/`, `tests/` ve diğer
dosyalara dokunma, `derle.mjs` çalıştırma, git komutu çalıştırma.

Örnek (birebir bu yapıyı izle): `scripts/uret/specs/cm-inc-cevir.mjs`.
Yardımcılar: `web/assets/js/arac-yardimci.js` (`h` nesnesi) — önce oku.

## İş akışı
1. `node scripts/uret/grup.mjs <grupNo>` ile listeni al. `VAR` satırlarını atla, `YAZ` satırlarını yaz.
2. Her araç için spec'i yaz, hemen `node scripts/uret/dogrula.mjs <slug>` çalıştır, `✓` görene kadar düzelt.
   Bir aracı bitirmeden diğerine geçme. Doğrulayıcıyı kandırma (beklenen değeri hesaba uydurmak yerine
   önce doğru sonucu elle/bağımsız hesapla; uyuşmuyorsa hatayı `compute` içinde ara).
3. Sonunda yalnızca kısa özet döndür: geçen slug'lar, (varsa) bitiremediğin slug ve nedeni.

## Alanlar
- `slug`, `title`: listedeki gibi (title'ı değiştirme). `category`: listedeki kategori anahtarı.
- `h1Tail` (isteğe bağlı): başlığın devamı, kısa. `pageTitle`: 30–75 karakter, anahtar kelimeyle.
- `description`: 110–170 karakter meta açıklama. `card`: 40–150 karakter ana sayfa kart metni.
- `keywords`: 5–10 Türkçe arama ifadesi. `lead`: 1–2 cümle giriş. `button`: "Hesapla", "Çevir", "Oluştur"…
- `inputs`: 1–10 alan. `{ id, label, type, placeholder?, hint?, value?, options?, wide? }`
  - `type`: `number` (ondalıklı sayı; metin kutusudur, virgül kabul eder), `text`, `textarea`, `select`
    (`options: [[deger, etiket], …]`), `date`.
  - `id` camelCase/küçük harf; şu adlar yasak: form, error, result, rows, out, note, calc, clear, copy.
- `compute(v, h)`: `v[id]` her zaman **metindir**. Dönüş: `{ rows: [[etiket, değerMetni], …], text?, note? }`.
  - `rows`: ilk satır ana sonuçtur. Değerler birimli, Türkçe biçimli metin olmalı (`h.fmt`, `h.fix`, `h.para`, `h.sig`).
  - `text`: uzun/çok satırlı çıktı (metin araçları, kod üreticiler) salt okunur kutuda gösterilir.
  - `note`: sonuç altı kısa not (varsayım, uyarı).
  - Geçersiz girdide `h.err('Türkçe, çözüm öneren mesaj')` ya da `h.num/pos/nonneg/int/posint/date` hatası.
  - **Tamamen bağımsız olmalı**: dosyadaki başka değişken/fonksiyona, import'a erişemez (kaynağı ayrı
    modüle kopyalanır). Sabit tablolar ve yardımcı fonksiyonlar `compute` gövdesinin içinde tanımlanır.
  - Ağ yok (`fetch` yasak), DOM yok, `localStorage` yok. `async` olabilir (ör. `crypto.subtle`).
  - Bugünün tarihine bağlı araçlarda isteğe bağlı bir `date` alanı ekle ("Bugünün tarihi (boş = bugün)") ve
    `h.dateOrToday(v.bugun)` kullan; test örneklerinde bu alanı hep doldur ki sonuç sabit olsun.
  - Rastgele sonuç üreten araçlarda örnekleri `match` / `textMatch` (regex) ile yaz.
  - Kayan nokta artıklarına dikkat: sonucu `h.fmt(x, n)` ile biçimle; tam bölme/kat için `1e-9` payı bırak.
- `cases`: en az 6; en az 5 başarılı + en az 1 `{ in, error: true }`.
  - `{ in: { id: 'metin' }, out: { 'Etiket': 'tam değer' } }` — `out` satırların alt kümesidir, tam eşleşir.
  - Seçenekler: `match: { 'Etiket': 'regex' }`, `text: 'tam çıktı'`, `textMatch: 'regex'`.
  - Verilmeyen alanlar varsayılanını alır (`value`, select'te ilk seçenek, yoksa boş).
  - İlk iki başarılı örnek ve ilk hata örneği tarayıcı testinde de koşar; bunları en temsili olanlardan seç.
  - Beklenen değerler **bilinen doğru sonuçlar** olmalı (ders kitabı örneği, tanım, elle hesap).
- `howto`: 3–6 adım. `sections`: en az 4 bölüm `{ h, p?: [..], ul?: [..], ol?: [..] }`.
- `faq`: en az 7 `[soru, cevap]`; sonuncusu gizlilikle ilgili olabilir. `related`: 3–6 slug
  (mevcut `web/<slug>/` araçları ya da `katalog.txt`'teki slug'lar; doğrulayıcı kontrol eder).

## İçerik kuralları (AdSense için kritik)
- `lead + howto + sections + faq` toplamı **en az 800 kelime**, özgün ve bu araca özel Türkçe metin.
  Şablon cümleleri araçtan araca kopyalama; her sayfa kendi konusunu anlatsın: formül ve mantığı,
  adım adım **çözümlü örnek(ler)** (sayılar `compute` sonucuyla tutarlı), Türkiye'den kullanım
  senaryoları, sık yapılan hatalar, sınırlar/varsayımlar, hızlı başvuru değerleri.
- Doğruluk: emin olmadığın sayısal iddia, tarih, mevzuat, fiyat, oran yazma. Güncel vergi/ücret/kur
  gibi değişen değerleri sabitleme; gerekiyorsa kullanıcıdan girdi olarak al.
- Sağlık, finans, elektrik, inşaat araçlarında bölümlerden birinde kısa uyarı: sonuç bilgilendirme
  amaçlıdır; tıbbi/mali/mühendislik kararı için uzmana danışılmalı. Abartılı vaat yok.
- Başka site, marka, rakip ürün adı, bağlantı/URL yok. Emoji yok. Metinde yalnızca şu etiketler:
  `<strong> <em> <code> <sub> <sup>`.
- "Dosya yüklenmez / veri gönderilmez" vaadi doğrudur; aksi bir şey yazma.
- Yasa dışı kullanıma hizmet eden işlev yok (sahte belge, kimlik/IBAN üretme, şifre kırma vb.).
- JS dizgilerinde kesme işaretini kaçır (`\'`) ya da çift tırnak/backtick kullan; dosya geçerli ES modülü olmalı.
