// Gibibayt Gigabayt (GiB – GB) Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const GIB = 1073741824;
    const bayt = v.yon === 'gb' ? x * 1e9 : x * GIB;
    const gb = v.yon === 'gb' ? x : bayt / 1e9;
    const gib = v.yon === 'gb' ? bayt / GIB : x;
    const rGb = ['Gigabayt (GB)', h.sig(gb, 10) + ' GB'];
    const rGib = ['Gibibayt (GiB)', h.sig(gib, 10) + ' GiB'];
    return {
      rows: [
        ...(v.yon === 'gb' ? [rGib, rGb] : [rGb, rGib]),
        ['Bayt', h.sig(bayt, 14) + ' bayt'],
        ['Mebibayt (MiB)', h.sig(bayt / 1048576, 10) + ' MiB'],
        ['Megabayt (MB)', h.sig(bayt / 1e6, 10) + ' MB'],
        ['Sayısal fark (GB − GiB)', h.sig(gb - gib, 6)],
      ],
      note: '1 GiB = 1.073.741.824 bayt, 1 GB = 1.000.000.000 bayt. Aynı miktar GB olarak yazıldığında sayı yaklaşık %7,37 daha büyük görünür.',
    };
  }
