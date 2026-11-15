// Amper Miliamper Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Akım değeri');
    const kat = { a: 1, ma: 1e-3, ua: 1e-6, ka: 1e3 };
    const k = kat[v.birim];
    if (!k) h.err('Listeden geçerli bir birim seçin.');
    const a = x * k;
    const s = {
      a: ['Amper', h.sig(a, 9) + ' A'],
      ma: ['Miliamper', h.sig(a * 1e3, 9) + ' mA'],
      ua: ['Mikroamper', h.sig(a * 1e6, 9) + ' µA'],
      ka: ['Kiloamper', h.sig(a / 1e3, 9) + ' kA'],
    };
    const sira = v.birim === 'a' ? ['ma', 'ua', 'ka'] : ['a', 'ma', 'ua', 'ka'];
    const rows = sira.filter((b) => b !== v.birim).map((b) => s[b]);
    const volt = h.opt(v.volt, null, 'Gerilim');
    if (volt !== null) {
      if (volt < 0) h.err('"Gerilim" negatif olamaz; boş bırakabilir ya da pozitif bir değer yazabilirsiniz.');
      rows.push(['Güç', h.sig(a * volt, 6) + ' W']);
    }
    return {
      rows,
      note: volt !== null
        ? 'Güç, P = V × I bağıntısıyla hesaplandı; doğru akım ya da güç katsayısı 1 olan yükler için geçerlidir.'
        : '1 A = 1.000 mA = 1.000.000 µA; 1 kA = 1.000 A.',
    };
  }
