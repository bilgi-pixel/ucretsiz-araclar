// Aydınlatma İhtiyacı (Lümen) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tablo = { salon: 150, yatak: 100, mutfak: 300, banyo: 200, koridor: 100, calisma: 500, atolye: 750 };
    const alan = h.pos(v.alan, 'Oda alanı');
    const ozel = String(v.ozelLux ?? '').trim() !== '';
    const lux = ozel ? h.pos(v.ozelLux, 'Özel aydınlık düzeyi') : (tablo[v.mekan] ?? 150);
    const ampul = h.opt(v.ampul, 800, 'Bir ampulün ışık akısı');
    if (!(ampul > 0)) h.err('"Bir ampulün ışık akısı" sıfırdan büyük olmalı.');
    const verim = h.opt(v.verim, 100, 'Işık verimi');
    if (!(verim > 0)) h.err('"Işık verimi" sıfırdan büyük olmalı.');
    const lm = alan * lux;
    const adet = Math.max(1, Math.ceil(lm / ampul - 1e-9));
    return {
      rows: [
        ['Gerekli ışık akısı', h.fmt(lm, 0) + ' lm'],
        ['Hedef aydınlık düzeyi', h.fmt(lux, 0) + ' lüks'],
        ['Ampul sayısı', adet + ' adet'],
        ['Yaklaşık LED gücü', h.fmt(lm / verim, 1) + ' W'],
        ['Seçilen ampullerle toplam', h.fmt(adet * ampul, 0) + ' lm'],
      ],
      note: 'Hesap, ışığın tamamının kullanım yüzeyine ulaştığını varsayar. Koyu duvar, yüksek tavan, abajur ve gömme armatür kayıpları için sonuca %20–30 pay eklemek yerinde olur.',
    };
  }
