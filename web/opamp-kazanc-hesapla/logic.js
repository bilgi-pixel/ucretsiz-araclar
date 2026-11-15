// Op-Amp Kazancı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const r1 = h.pos(v.r1, 'Giriş direnci R1');
    const rf = h.nonneg(v.rf, 'Geri besleme direnci Rf');
    const eviren = v.tip !== 'evirmeyen';
    if (eviren && rf === 0) h.err('Eviren devrede Rf sıfır olursa kazanç da sıfır olur; sıfırdan büyük bir geri besleme direnci yazın.');
    const oran = rf / r1;
    const av = eviren ? -oran : 1 + oran;
    const db = 20 * Math.log10(Math.abs(av));
    const carpan = v.birim === 'o' ? 1 : v.birim === 'm' ? 1e6 : 1e3;
    const ohmYaz = (x) => (x >= 1e6 ? h.fmt(x / 1e6, 3) + ' MΩ' : x >= 1e3 ? h.fmt(x / 1e3, 3) + ' kΩ' : h.fmt(x, 2) + ' Ω');
    const rows = [
      ['Gerilim kazancı (Av)', h.fmt(av, 4)],
      ['Kazanç (dB)', h.fmt(db, 2) + ' dB'],
      ['Rf / R1 oranı', h.fmt(oran, 4)],
      ['Faz', eviren ? '180° (çıkış ters çevrilir)' : '0° (çıkış girişle aynı fazda)'],
      ['Devrenin giriş direnci', eviren ? ohmYaz(r1 * carpan) + ' (R1 kadar)' : 'Çok yüksek (op-amp girişi)'],
    ];
    let note = 'İdeal op-amp varsayılmıştır: açık çevrim kazancı sonsuz, giriş akımı sıfır. Yüksek frekansta gerçek kazanç bant genişliği nedeniyle düşer.';
    if (String(v.vin ?? '').trim() !== '') {
      const vin = h.num(v.vin, 'Giriş gerilimi');
      const vout = av * vin;
      rows.push(['Çıkış gerilimi', h.fmt(vout, 4) + ' V']);
      if (String(v.besleme ?? '').trim() !== '') {
        const vs = h.pos(v.besleme, 'Besleme gerilimi');
        if (Math.abs(vout) > vs + 1e-12) {
          rows.push(['Doyma denetimi', 'Çıkış doyuma girer (±' + h.fmt(vs, 2) + ' V sınırı aşılıyor)']);
          note = 'Hesaplanan çıkış besleme gerilimini aşıyor; gerçek devrede çıkış kırpılır. Kazancı ya da giriş genliğini düşürün.';
        } else {
          rows.push(['Doyma denetimi', 'Çıkış besleme sınırları içinde']);
        }
      }
    }
    return { rows, note };
  }
