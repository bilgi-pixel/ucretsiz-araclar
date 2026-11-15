// Kilobayt Megabayt Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const k = v.sistem === '1000' ? 1000 : 1024;
    const kb = v.yon === 'mb' ? x * k : x;
    const mb = kb / k;
    const bayt = kb * k;
    const rMb = ['Megabayt', h.sig(mb, 8) + ' MB'];
    const rKb = ['Kilobayt', h.sig(kb, 8) + ' KB'];
    const diger = k === 1024
      ? ['Ondalık sistemde (1 MB = 1000 KB)', h.sig(bayt / 1e6, 8) + ' MB']
      : ['İkili sistemde (1 MiB = 1024 KiB)', h.sig(bayt / 1048576, 8) + ' MiB'];
    return {
      rows: [
        ...(v.yon === 'mb' ? [rKb, rMb] : [rMb, rKb]),
        ['Bayt', h.sig(bayt, 13) + ' bayt'],
        ['Gigabayt', h.sig(mb / k, 8) + ' GB'],
        diger,
      ],
      note: k === 1024
        ? 'Hesap 1 MB = 1024 KB = 1.048.576 bayt kabulüyle yapıldı.'
        : 'Hesap 1 MB = 1000 KB = 1.000.000 bayt (SI ondalık önekleri) kabulüyle yapıldı.',
    };
  }
