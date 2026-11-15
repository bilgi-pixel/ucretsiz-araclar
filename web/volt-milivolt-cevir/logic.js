// Volt Milivolt Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.deger, 'Gerilim değeri');
    const kat = { v: 1, mv: 1e-3, uv: 1e-6, kv: 1e3 };
    const k = kat[v.birim];
    if (!k) h.err('Listeden geçerli bir birim seçin.');
    const volt = x * k;
    const s = {
      v: ['Volt', h.sig(volt, 9) + ' V'],
      mv: ['Milivolt', h.sig(volt * 1e3, 9) + ' mV'],
      uv: ['Mikrovolt', h.sig(volt * 1e6, 9) + ' µV'],
      kv: ['Kilovolt', h.sig(volt / 1e3, 9) + ' kV'],
    };
    const sira = v.birim === 'v' ? ['mv', 'uv', 'kv'] : ['v', 'mv', 'uv', 'kv'];
    const rows = sira.filter((b) => b !== v.birim).map((b) => s[b]);
    const r = h.opt(v.direnc, null, 'Direnç');
    if (r !== null) {
      if (!(r > 0)) h.err('"Direnç" sıfırdan büyük olmalı ya da boş bırakılmalı.');
      const i = Math.abs(volt) / r;
      rows.push(['Akım', h.sig(i, 6) + ' A']);
      rows.push(['Akım (miliamper)', h.sig(i * 1000, 6) + ' mA']);
    }
    return {
      rows,
      note: r !== null
        ? 'Akım, Ohm kanunuyla (I = V ÷ R) ve gerilimin mutlak değeri üzerinden hesaplandı; yalnızca omik dirençler için geçerlidir.'
        : '1 V = 1.000 mV = 1.000.000 µV; 1 kV = 1.000 V.',
    };
  }
