// Megabayt Gigabayt Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const k = v.sistem === '1000' ? 1000 : 1024;
    const mb = v.yon === 'gb' ? x * k : x;
    const gb = mb / k;
    const bayt = mb * k * k;
    const rGb = ['Gigabayt', h.sig(gb, 8) + ' GB'];
    const rMb = ['Megabayt', h.sig(mb, 8) + ' MB'];
    const diger = k === 1024
      ? ['Ondalık sistemde (1 GB = 1000 MB)', h.sig(bayt / 1e9, 8) + ' GB']
      : ['İkili sistemde (1 GiB = 1024 MiB)', h.sig(bayt / 1073741824, 8) + ' GiB'];
    return {
      rows: [
        ...(v.yon === 'gb' ? [rMb, rGb] : [rGb, rMb]),
        ['Kilobayt', h.sig(mb * k, 10) + ' KB'],
        ['Bayt', h.sig(bayt, 13) + ' bayt'],
        diger,
      ],
      note: k === 1024
        ? 'Hesap 1 GB = 1024 MB = 1.048.576 KB kabulüyle yapıldı.'
        : 'Hesap 1 GB = 1000 MB = 1.000.000 KB (SI ondalık önekleri) kabulüyle yapıldı.',
    };
  }
