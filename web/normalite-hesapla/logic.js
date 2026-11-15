// Normalite Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const td = h.posint(v.td, 'Tesir değerliği');
    if (td > 20) h.err('"Tesir değerliği" 20\'den büyük olamaz; değeri kontrol edin.');
    if (v.mod === 'molarite') {
      const M = h.pos(v.molarite, 'Molarite');
      const N = M * td;
      const rows = [
        ['Normalite', h.fmt(N, 4) + ' N'],
        ['Molarite', h.fmt(M, 4) + ' M'],
        ['1 litredeki eşdeğer gram sayısı', h.fmt(N, 4) + ' eşdeğer'],
      ];
      if (String(v.molKutle ?? '').trim() !== '') {
        const mk = h.pos(v.molKutle, 'Mol kütlesi');
        rows.push(['Eşdeğer kütle', h.fmt(mk / td, 4) + ' g/eşdeğer']);
        rows.push(['1 litre için gereken madde', h.fmt(M * mk, 4) + ' g']);
      }
      return { rows, note: 'Normalite = molarite × tesir değerliği. Tesir değerliği tepkimeye göre değişebilir.' };
    }
    const m = h.pos(v.kutle, 'Çözünen kütlesi');
    const mk = h.pos(v.molKutle, 'Mol kütlesi');
    const mL = h.pos(v.hacim, 'Çözelti hacmi');
    const mol = m / mk;
    const M = mol / (mL / 1000);
    const N = M * td;
    return {
      rows: [
        ['Normalite', h.fmt(N, 4) + ' N'],
        ['Molarite', h.fmt(M, 4) + ' M'],
        ['Eşdeğer kütle', h.fmt(mk / td, 4) + ' g/eşdeğer'],
        ['Eşdeğer gram sayısı', h.fmt(mol * td, 4) + ' eşdeğer'],
        ['Mol sayısı', h.fmt(mol, 4) + ' mol'],
      ],
      note: 'Normalite = eşdeğer gram sayısı ÷ çözelti hacmi (L). Hacim çözücünün değil, hazırlanan çözeltinin toplam hacmidir.',
    };
  }
