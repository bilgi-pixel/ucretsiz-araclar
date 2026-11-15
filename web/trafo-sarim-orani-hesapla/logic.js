// Trafo Sarım Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const bos = (s) => String(s ?? '').trim() === '';
    const alan = [['v1', 'Primer gerilim'], ['v2', 'Sekonder gerilim'], ['n1', 'Primer sarım sayısı'], ['n2', 'Sekonder sarım sayısı']];
    const eksik = alan.filter(([k]) => bos(v[k]));
    if (eksik.length !== 1) h.err('Primer gerilim, sekonder gerilim, primer sarım ve sekonder sarım alanlarından tam olarak birini boş bırakın; diğer üçünü doldurun.');
    const d = {};
    for (const [k, ad] of alan) if (!bos(v[k])) d[k] = h.pos(v[k], ad);
    const hedef = eksik[0][0];
    if (hedef === 'v1') d.v1 = d.v2 * d.n1 / d.n2;
    else if (hedef === 'v2') d.v2 = d.v1 * d.n2 / d.n1;
    else if (hedef === 'n1') d.n1 = d.n2 * d.v1 / d.v2;
    else d.n2 = d.n1 * d.v2 / d.v1;
    const a = d.v1 / d.v2;
    const etiket = { v1: 'Primer gerilim', v2: 'Sekonder gerilim', n1: 'Primer sarım sayısı', n2: 'Sekonder sarım sayısı' };
    const deger = (k) => (k[0] === 'v' ? h.fmt(d[k], 3) + ' V' : h.fmt(d[k], 2) + ' sarım');
    const rows = [[etiket[hedef], deger(hedef)]];
    rows.push(['Dönüştürme oranı (N₁ : N₂)', h.fmt(a, 4) + ' : 1']);
    const tip = Math.abs(a - 1) < 1e-9 ? 'İzolasyon trafosu (1 : 1)' : a > 1 ? 'Düşürücü trafo' : 'Yükseltici trafo';
    rows.push(['Trafo tipi', tip]);
    rows.push(['Sarım başına gerilim', h.fmt(d.v1 / d.n1, 4) + ' V/sarım']);
    if (!bos(v.i2)) {
      const i2 = h.pos(v.i2, 'Sekonder akımı');
      rows.push(['Primer akımı (ideal)', h.fmt(i2 / a, 4) + ' A']);
      rows.push(['Görünür güç', h.fmt(d.v2 * i2, 2) + ' VA']);
    }
    let note = 'İdeal (kayıpsız) trafo varsayılmıştır; gerçek trafoda yük altında sekonder gerilimi bir miktar düşer.';
    if ((hedef === 'n1' || hedef === 'n2') && Math.abs(d[hedef] - Math.round(d[hedef])) > 1e-6) note = 'Sarım sayısı tam çıkmadı; uygulamada en yakın tam sayıya yuvarlanır. ' + note;
    return { rows, note };
  }
