// Bit Bayt Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const bit = v.yon === 'bayt' ? x * 8 : x;
    const bayt = bit / 8;
    const rBayt = ['Bayt', h.sig(bayt, 12) + ' bayt'];
    const rBit = ['Bit', h.sig(bit, 12) + ' bit'];
    return {
      rows: [
        ...(v.yon === 'bayt' ? [rBit, rBayt] : [rBayt, rBit]),
        ['Kilobit (1000 bit)', h.sig(bit / 1000, 8) + ' kbit'],
        ['Megabit (1.000.000 bit)', h.sig(bit / 1e6, 8) + ' Mbit'],
        ['Kilobayt (1024 bayt)', h.sig(bayt / 1024, 8) + ' KB'],
        ['Megabayt (1.048.576 bayt)', h.sig(bayt / 1048576, 8) + ' MB'],
      ],
      note: '1 bayt = 8 bit. Bit katları ondalık (1 kbit = 1000 bit), bayt katları ikili (1 KB = 1024 bayt) olarak gösterilir.',
    };
  }
