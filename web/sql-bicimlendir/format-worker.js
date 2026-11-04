// SQL biçimlendirme işçisi: büyük sorgular ana sayfayı dondurmasın diye sql-formatter ayrı iş parçacığında çalışır.
// Ağ isteği yapmaz; kütüphane aynı sitedeki vendor/ klasöründen yüklenir. Sorgu yalnızca biçimlendirilir, ÇALIŞTIRILMAZ.
importScripts('../vendor/sql-formatter@15.9.0/sql-formatter.min.js');

self.onmessage = (e) => {
  const { id, text, options } = e.data;
  try {
    const out = self.sqlFormatter.format(text, options);
    self.postMessage({ id, ok: true, out });
  } catch (err) {
    // Kütüphanenin ayrıştırma mesajı çok satırlı dilbilgisi dökümü içerir; yalnızca ilk satır (konum bilgisi) yeterli.
    const message = String((err && err.message) || err).split('\n')[0];
    self.postMessage({ id, ok: false, message });
  }
};
