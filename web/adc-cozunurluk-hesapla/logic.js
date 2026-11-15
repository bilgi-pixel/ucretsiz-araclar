// ADC Çözünürlük ve Adım Gerilimi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const n = h.posint(v.bit, 'Çözünürlük');
    if (n > 32) h.err('Çözünürlük en fazla 32 bit olabilir.');
    const vref = h.pos(v.vref, 'Referans gerilimi');
    const seviye = Math.pow(2, n);
    const lsb = vref / seviye;
    const gerYaz = (x) => (x >= 1 ? h.sig(x, 5) + ' V' : x >= 1e-4 ? h.sig(x * 1e3, 5) + ' mV' : h.sig(x * 1e6, 5) + ' µV');
    const rows = [
      ['Adım gerilimi (1 LSB)', gerYaz(lsb)],
      ['Seviye sayısı', h.fmt(seviye, 0)],
      ['En büyük sayısal kod', h.fmt(seviye - 1, 0)],
      ['Tam ölçeğe göre çözünürlük', '%' + h.sig(100 / seviye, 4)],
      ['İdeal sinyal-gürültü oranı', h.fmt(6.02 * n + 1.76, 2) + ' dB'],
    ];
    let note = 'Adım gerilimi Vref ÷ 2ⁿ olarak hesaplanır. Gerçek çeviricilerde gürültü, ofset ve doğrusallık hataları nedeniyle etkin çözünürlük bit sayısının altında kalır.';
    if (String(v.vin ?? '').trim() !== '') {
      const vin = h.nonneg(v.vin, 'Giriş gerilimi');
      let kod = Math.floor(vin / lsb + 1e-9);
      if (kod > seviye - 1) {
        kod = seviye - 1;
        if (vin > vref + 1e-12) note = 'Giriş gerilimi referansın üzerinde olduğu için kod en büyük değerde doyar. Referansı aşan gerilim çeviriciye zarar verebilir; girişe gerilim bölücü ekleyin.';
      }
      rows.push(['Sayısal kod (ondalık)', h.fmt(kod, 0)]);
      rows.push(['Sayısal kod (onaltılık)', '0x' + kod.toString(16).toUpperCase()]);
      rows.push(['Sayısal kod (ikilik)', kod.toString(2).padStart(n, '0')]);
      rows.push(['Kodun karşılık geldiği gerilim', h.sig(kod * lsb, 5) + ' V']);
    }
    return { rows, note };
  }
