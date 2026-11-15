// Ters Orantı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a1 = h.pos(v.a1, 'Birinci büyüklük ilk değer');
    const b1 = h.pos(v.b1, 'İkinci büyüklük ilk değer');
    const a2 = h.pos(v.a2, 'Birinci büyüklük yeni değer');
    const k = a1 * b1;
    const b2 = k / a2;
    const degisim = (eski, yeni) => {
      const yuzde = (yeni / eski - 1) * 100;
      const metin = h.fmt(Math.abs(yuzde), 2);
      if (metin === '0') return 'Değişmedi';
      return `%${metin} ${yuzde > 0 ? 'artış' : 'azalış'}`;
    };
    return {
      rows: [
        ['İkinci büyüklüğün yeni değeri (b₂)', h.fmt(b2, 6)],
        ['Sabit çarpım (k = a × b)', h.fmt(k, 6)],
        ['Birinci büyüklükteki değişim', degisim(a1, a2)],
        ['İkinci büyüklükteki değişim', degisim(b1, b2)],
        ['Doğru orantı olsaydı', h.fmt(b1 * a2 / a1, 6)],
      ],
      note: 'b₂ = a₁ × b₁ ÷ a₂. Hesap, iki büyüklüğün çarpımının sabit kaldığını (örneğin her işçinin aynı hızda çalıştığını) varsayar.',
    };
  }
