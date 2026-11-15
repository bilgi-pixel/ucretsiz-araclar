// Gigabayt Terabayt Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const k = v.sistem === '1000' ? 1000 : 1024;
    const gb = v.yon === 'tb' ? x * k : x;
    const tb = gb / k;
    const bayt = gb * k * k * k;
    const rTb = ['Terabayt', h.sig(tb, 8) + ' TB'];
    const rGb = ['Gigabayt', h.sig(gb, 8) + ' GB'];
    const diger = k === 1024
      ? ['Ondalık (üretici etiketi) karşılığı', h.sig(bayt / 1e9, 8) + ' GB']
      : ['Bilgisayarda görünen (1024 tabanlı)', h.sig(bayt / 1073741824, 8) + ' GiB'];
    return {
      rows: [
        ...(v.yon === 'tb' ? [rGb, rTb] : [rTb, rGb]),
        ['Megabayt', h.sig(gb * k, 10) + ' MB'],
        diger,
      ],
      note: k === 1024
        ? 'Hesap 1 TB = 1024 GB = 1.048.576 MB kabulüyle yapıldı.'
        : 'Hesap 1 TB = 1000 GB = 1.000.000 MB (SI ondalık önekleri) kabulüyle yapıldı.',
    };
  }
