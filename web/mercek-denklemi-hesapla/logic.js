// Mercek Denklemi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let f, dc, dg, sonsuz = false;
    if (v.bul === 'odak') {
      dc = h.pos(v.cisim, 'Cisim uzaklığı');
      dg = h.num(v.goruntu, 'Görüntü uzaklığı');
      if (dg === 0) h.err('Görüntü uzaklığı sıfır olamaz.');
      const t = 1 / dc + 1 / dg;
      if (Math.abs(t) < 1e-12) h.err('Bu değerlerle odak uzaklığı sonsuz çıkıyor; bu bir mercek değil, düz cam davranışıdır.');
      f = 1 / t;
    } else if (v.bul === 'cisim') {
      f = h.num(v.odak, 'Odak uzaklığı');
      if (f === 0) h.err('Odak uzaklığı sıfır olamaz.');
      dg = h.num(v.goruntu, 'Görüntü uzaklığı');
      if (dg === 0) h.err('Görüntü uzaklığı sıfır olamaz.');
      const t = 1 / f - 1 / dg;
      if (t <= 1e-12) h.err('Bu odak ve görüntü uzaklığıyla gerçek bir cisim konumu bulunamıyor; işaretleri kontrol edin (sanal görüntü ve ıraksak mercek için eksi).');
      dc = 1 / t;
    } else {
      f = h.num(v.odak, 'Odak uzaklığı');
      if (f === 0) h.err('Odak uzaklığı sıfır olamaz.');
      dc = h.pos(v.cisim, 'Cisim uzaklığı');
      const t = 1 / f - 1 / dc;
      if (Math.abs(t) < 1e-12) sonsuz = true; else dg = 1 / t;
    }
    const guc = ['Mercek gücü', h.fmt(100 / f, 4) + ' diyoptri'];
    const tur = ['Mercek türü', f > 0 ? 'İnce kenarlı (yakınsak)' : 'Kalın kenarlı (ıraksak)'];
    if (sonsuz) {
      return {
        rows: [
          ['Görüntü uzaklığı', 'Sonsuzda (görüntü oluşmaz)'],
          ['Cisim uzaklığı', h.fmt(dc, 4) + ' cm'],
          ['Odak uzaklığı', h.fmt(f, 4) + ' cm'],
          ['Görüntünün niteliği', 'Cisim odakta; kırılan ışınlar birbirine paralel çıkar'],
          guc, tur,
        ],
      };
    }
    const m = -dg / dc;
    const am = Math.abs(m);
    const buyukluk = Math.abs(am - 1) < 1e-9 ? 'cisimle aynı boyda' : am > 1 ? 'büyütülmüş' : 'küçültülmüş';
    const nitelik = (dg > 0 ? 'Gerçek, ters, ' : 'Sanal, düz, ') + buyukluk;
    const gS = ['Görüntü uzaklığı', h.fmt(dg, 4) + ' cm'];
    const cS = ['Cisim uzaklığı', h.fmt(dc, 4) + ' cm'];
    const fS = ['Odak uzaklığı', h.fmt(f, 4) + ' cm'];
    const ilk = v.bul === 'odak' ? [fS, cS, gS] : v.bul === 'cisim' ? [cS, fS, gS] : [gS, cS, fS];
    const rows = [...ilk, ['Büyütme', h.fmt(m, 4)], ['Görüntünün niteliği', nitelik], guc, tur];
    if (String(v.boy ?? '').trim() !== '') {
      const boy = h.pos(v.boy, 'Cisim boyu');
      rows.push(['Görüntü boyu', h.fmt(am * boy, 4) + ' cm (' + (m < 0 ? 'ters' : 'düz') + ')']);
    }
    return {
      rows,
      note: 'İşaret kuralı: yakınsak mercekte f artı, ıraksak mercekte eksi; gerçek görüntüde uzaklık artı, sanal görüntüde eksi. Büyütme m = −dg ÷ dc; eksi değer ters görüntü demektir.',
    };
  }
