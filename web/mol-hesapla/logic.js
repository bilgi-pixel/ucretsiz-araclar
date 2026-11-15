// Mol Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const NA = 6.02214076e23;
    const dolu = String(v.molKutle ?? '').trim() !== '';
    const M = dolu ? h.pos(v.molKutle, 'Mol kütlesi') : null;
    const x = h.pos(v.deger, 'Değer');
    let n;
    if (v.mod === 'mol') {
      if (M === null) h.err('Molden kütleye geçmek için "Mol kütlesi" alanını doldurun (örn. su için 18).');
      n = x;
    } else if (v.mod === 'tanecik') n = x / NA;
    else if (v.mod === 'hacim') n = x / 22.4;
    else {
      if (M === null) h.err('Kütleden mol bulmak için "Mol kütlesi" alanını doldurun (örn. su için 18).');
      n = x / M;
    }
    const molMetin = (n >= 0.001 ? h.fmt(n, 4) : h.sig(n, 4)) + ' mol';
    const bil = (y) => {
      const [m, e] = y.toExponential(3).split('e');
      return `${String(Number(m)).replace('.', ',')} × 10^${Number(e)}`;
    };
    const rows = [];
    const kutleSatiri = M === null ? null : ['Kütle', h.sig(n * M, 6) + ' g'];
    if (v.mod === 'mol') { rows.push(kutleSatiri); rows.push(['Mol sayısı', molMetin]); }
    else { rows.push(['Mol sayısı', molMetin]); if (kutleSatiri) rows.push(kutleSatiri); }
    rows.push(['Tanecik sayısı', bil(n * NA)]);
    rows.push(['Normal şartlarda gaz hacmi (0 °C, 1 atm)', h.sig(n * 22.4, 6) + ' L']);
    rows.push(['Oda koşullarında gaz hacmi (25 °C, 1 atm)', h.sig(n * 24.5, 6) + ' L']);
    return {
      rows,
      note: 'Hacim satırları yalnızca gaz hâlindeki maddeler için anlamlıdır ve ideal gaz kabulüne dayanır. Avogadro sayısı 6,02214076 × 10^23 alınmıştır.',
    };
  }
