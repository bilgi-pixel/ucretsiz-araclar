// Olasılık Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.int(v.istenen, 'İstenen durum sayısı');
    const b = h.posint(v.toplam, 'Tüm durum sayısı');
    if (a < 0) h.err('"İstenen durum sayısı" negatif olamaz.');
    if (a > b) h.err('İstenen durum sayısı tüm durum sayısından büyük olamaz; olasılık 1\'i aşamaz.');
    const n = String(v.deneme ?? '').trim() === '' ? 1 : h.posint(v.deneme, 'Deneme sayısı');
    if (n > 1000000) h.err('"Deneme sayısı" en fazla 1.000.000 olabilir.');
    const ebob = (x, y) => { while (y) { [x, y] = [y, x % y]; } return x; };
    const g = ebob(a, b) || 1;
    const p = a / b;
    const q = (b - a) / b;
    let oran;
    if (a === 0) oran = '0 : 1 (olanaksız olay)';
    else if (a === b) oran = '1 : 0 (kesin olay)';
    else { const g2 = ebob(a, b - a); oran = `${h.fmt(a / g2, 0)} : ${h.fmt((b - a) / g2, 0)}`; }
    const enAzBir = 1 - Math.pow(q, n);
    const hepsi = Math.pow(p, n);
    const rows = [
      ['Olasılık', h.fmt(p, 6)],
      ['Yüzde', '%' + h.fmt(p * 100, 4)],
      ['Kesir', a === 0 ? '0' : a === b ? '1' : `${a / g}/${b / g}`],
      ['Olmama olasılığı', `${h.fmt(q, 6)} (%${h.fmt(q * 100, 4)})`],
      ['Lehte : aleyhte oranı', oran],
    ];
    if (n > 1) {
      rows.push([`${h.fmt(n, 0)} denemede en az bir kez`, `${h.fmt(enAzBir, 6)} (%${h.fmt(enAzBir * 100, 4)})`]);
      rows.push([`${h.fmt(n, 0)} denemenin hepsinde`, `${h.sig(hepsi, 6)} (%${h.sig(hepsi * 100, 6)})`]);
      rows.push([`${h.fmt(n, 0)} denemede hiç olmaması`, `${h.fmt(1 - enAzBir, 6)} (%${h.fmt((1 - enAzBir) * 100, 4)})`]);
    }
    return {
      rows,
      note: 'Hesap, tüm durumların eşit olasılıklı ve tekrarlanan denemelerin birbirinden bağımsız olduğunu varsayar.',
    };
  }
