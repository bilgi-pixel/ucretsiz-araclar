// Yıllık Bileşik Büyüme Oranı (CAGR) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.pos(v.baslangic, 'Başlangıç değeri');
    const b = h.nonneg(v.bitis, 'Bitiş değeri');
    const n = h.pos(v.yil, 'Süre');
    const yuzde = (x) => {
      const t = h.fmt(Math.abs(x), 2);
      return (x < 0 && t !== '0' ? '-%' : '%') + t;
    };
    const kat = b / a;
    const cagr = (Math.pow(kat, 1 / n) - 1) * 100;
    const toplam = (kat - 1) * 100;
    const rows = [
      ['Yıllık bileşik büyüme (CAGR)', yuzde(cagr)],
      ['Toplam büyüme', yuzde(toplam)],
      ['Büyüme katsayısı', h.fmt(kat, 4) + ' kat'],
      ['Mutlak değişim', h.fmt(b - a, 2)],
      ['Basit yıllık ortalama', yuzde(toplam / n)],
    ];
    if (cagr > 0) rows.push(['Bu hızla ikiye katlanma süresi', h.fmt(Math.log(2) / Math.log(1 + cagr / 100), 2) + ' yıl']);
    return { rows, note: 'CAGR = (bitiş ÷ başlangıç)^(1 ÷ yıl) − 1. Oran, aradaki yılların iniş çıkışını göstermez; yalnızca iki uç değeri birbirine bağlar.' };
  }
