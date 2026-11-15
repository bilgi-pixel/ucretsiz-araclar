// Satış Primi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const y = v.yontem || 'tum';
    const satis = h.nonneg(v.satis, 'Dönem satış tutarı');
    const oran = h.nonneg(v.oran, 'Prim oranı');
    if (oran > 100) h.err('Prim oranı %100\'den büyük olamaz.');
    const hedefVar = String(v.hedef ?? '').trim() !== '';
    if (y !== 'tum' && !hedefVar) h.err('Bu prim yönteminde "Satış hedefi" alanını doldurmanız gerekir.');
    const hedef = hedefVar ? h.pos(v.hedef, 'Satış hedefi') : 0;
    const asan = hedefVar ? Math.max(0, satis - hedef) : 0;
    let prim;
    if (y === 'asim') prim = asan * oran / 100;
    else if (y === 'kademeli') {
      const ust = h.nonneg(v.ustOran, 'Hedef üstü oranı');
      if (ust > 100) h.err('Hedef üstü oranı %100\'den büyük olamaz.');
      prim = Math.min(satis, hedef) * oran / 100 + asan * ust / 100;
    } else if (y === 'esik') prim = satis >= hedef - 1e-9 ? satis * oran / 100 : 0;
    else prim = satis * oran / 100;
    const maas = h.opt(v.maas, 0, 'Sabit brüt maaş');
    if (maas < 0) h.err('"Sabit brüt maaş" negatif olamaz.');
    const rows = [['Prim tutarı', h.para(prim)]];
    if (hedefVar) {
      rows.push(['Hedef gerçekleşme', '%' + h.fmt((satis / hedef) * 100, 2)]);
      rows.push(satis >= hedef ? ['Hedefi aşan tutar', h.para(asan)] : ['Hedefe kalan tutar', h.para(hedef - satis)]);
    }
    rows.push(['Primin satışa oranı', satis > 0 ? '%' + h.fmt((prim / satis) * 100, 2) : '—']);
    if (maas > 0) rows.push(['Toplam brüt gelir', h.para(maas + prim)]);
    return {
      rows,
      note: 'Tutarlar brüttür; gelir vergisi, damga vergisi ve sigorta primi kesintileri hesaba katılmamıştır.',
    };
  }
