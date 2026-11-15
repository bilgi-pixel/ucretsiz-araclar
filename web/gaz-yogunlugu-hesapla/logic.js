// Gaz Yoğunluğu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const R = 0.082057366; // L·atm/(mol·K)
    const HAVA = 28.97;
    const M = h.pos(v.molKutle, 'Gazın mol kütlesi');
    const p = h.pos(v.basinc, 'Basınç');
    const t = h.num(v.sicaklik, 'Sıcaklık');
    const atm = v.pBirim === 'kpa' ? p / 101.325 : v.pBirim === 'bar' ? p / 1.01325 : v.pBirim === 'mmhg' ? p / 760 : p;
    const T = v.tBirim === 'k' ? t : t + 273.15;
    if (!(T > 0)) h.err('Sıcaklık mutlak sıfırın (0 K = −273,15 °C) üzerinde olmalı.');
    const Vm = R * T / atm;
    const d = M / Vm;
    const bagil = M / HAVA;
    const yorum = Math.abs(bagil - 1) < 0.005 ? 'hava ile yaklaşık aynı' : bagil > 1 ? 'havadan ağır' : 'havadan hafif';
    return {
      rows: [
        ['Yoğunluk', h.fmt(d, 4) + ' g/L'],
        ['Yoğunluk (SI)', h.fmt(d, 4) + ' kg/m³'],
        ['Molar hacim', h.fmt(Vm, 4) + ' L/mol'],
        ['Havaya göre bağıl yoğunluk', `${h.fmt(bagil, 4)} (${yorum})`],
        ['Mutlak sıcaklık', h.fmt(T, 2) + ' K'],
        ['Basınç', h.fmt(atm, 4) + ' atm'],
      ],
      note: 'İdeal gaz kabulüyle hesaplanmıştır (R = 0,082057 L·atm/(mol·K)). Yüksek basınçta ve yoğuşma noktasına yakın sıcaklıklarda gerçek yoğunluk farklı olabilir.',
    };
  }
