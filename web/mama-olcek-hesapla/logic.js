// Bebek Maması Su Ölçek Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const dolu = (s) => String(s ?? '').trim() !== '';
    const su = h.pos(v.su, 'Hazırlanacak su miktarı');
    if (su > 2000) h.err('"Hazırlanacak su miktarı" en fazla 2000 ml olabilir; tek bir hazırlama için miktarı yazın.');
    const oran = h.pos(v.oran, 'Kutudaki oran');
    const olcek = su / oran;
    const yakin = Math.round(olcek);
    const tam = Math.abs(olcek - yakin) < 1e-9;
    const rows = [['Gereken mama', `${h.fmt(olcek, 2)} ölçek`]];
    let note;
    if (tam) {
      note = 'Su miktarı tam ölçeğe denk geliyor. ';
    } else {
      const alt = Math.floor(olcek + 1e-9);
      const ust = alt + 1;
      if (alt >= 1) rows.push(['Alt tam ölçek seçeneği', `${alt} ölçek için ${h.fmt(alt * oran, 1)} ml su`]);
      rows.push(['Üst tam ölçek seçeneği', `${ust} ölçek için ${h.fmt(ust * oran, 1)} ml su`]);
      note = 'Bu su miktarı tam ölçeğe denk gelmiyor. Ölçeği yarım ya da tepeleme doldurmak yerine su miktarını tam ölçek seçeneklerinden birine göre ayarlayın. ';
    }
    let gunlukGram = null;
    if (dolu(v.ogun)) {
      const ogun = h.posint(v.ogun, 'Günlük öğün sayısı');
      if (ogun > 24) h.err('"Günlük öğün sayısı" en fazla 24 olabilir.');
      rows.push(['Günlük toplam su', `${h.fmt(su * ogun, 1)} ml`]);
      rows.push(['Günlük toplam ölçek', `${h.fmt(olcek * ogun, 2)} ölçek`]);
      if (dolu(v.olcekGram)) gunlukGram = olcek * ogun * h.pos(v.olcekGram, 'Bir ölçek kaç gram');
    }
    if (dolu(v.olcekGram)) {
      const g = h.pos(v.olcekGram, 'Bir ölçek kaç gram');
      rows.push(['Bir öğündeki mama tozu', `${h.fmt(olcek * g, 1)} g`]);
      if (gunlukGram !== null) rows.push(['Günlük mama tozu', `${h.fmt(gunlukGram, 1)} g`]);
    }
    if (dolu(v.kutuGram)) {
      const kutu = h.pos(v.kutuGram, 'Kutu ağırlığı');
      if (gunlukGram === null) h.err('Kutunun kaç gün yeteceğini hesaplamak için "Günlük öğün sayısı" ve "Bir ölçek kaç gram" alanlarını da doldurun.');
      rows.push(['Kutunun yeteceği süre', `${h.fmt(kutu / gunlukGram, 1)} gün`]);
    }
    return {
      rows,
      note: note + 'Oran ve hazırlama talimatı için her zaman kullandığınız mamanın kutusunu esas alın; bebeğinizin ne kadar ve ne sıklıkta besleneceğine çocuk doktorunuz karar verir.',
    };
  }
