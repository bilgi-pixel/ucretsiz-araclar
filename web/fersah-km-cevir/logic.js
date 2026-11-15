// Fersah Kilometre Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const kat = { osmanli: 5.685, metrik: 6, deniz: 5.556, lig: 4.828032, lieue: 4, km: 1 };
    const k = kat[v.birim];
    if (!k) h.err('Listeden geçerli bir birim seçin.');
    const km = x * k;
    const dkTop = Math.round((km / 5) * 60);
    const saat = Math.floor(dkTop / 60);
    const dk = dkTop % 60;
    const sure = saat ? `${h.fmt(saat, 0)} saat ${dk} dk` : `${dk} dk`;
    const rows = [];
    if (v.birim === 'km') {
      rows.push(['Osmanlı fersahı', h.fmt(km / kat.osmanli, 4) + ' fersah']);
      rows.push(['Metrik fersah', h.fmt(km / kat.metrik, 4) + ' fersah']);
      rows.push(['Deniz fersahı', h.fmt(km / kat.deniz, 4) + ' fersah']);
      rows.push(['Kara ligi', h.fmt(km / kat.lig, 4) + ' lig']);
      rows.push(['Fransız metrik ligi', h.fmt(km / kat.lieue, 4) + ' lig']);
    } else {
      rows.push(['Kilometre', h.fmt(km, 4) + ' km']);
    }
    rows.push(['Metre', h.fmt(km * 1000, 1) + ' m']);
    rows.push(['Kara mili', h.fmt(km / 1.609344, 4) + ' mil']);
    rows.push(['Deniz mili', h.fmt(km / 1.852, 4) + ' deniz mili']);
    rows.push(['Yaya yürüyüş süresi (5 km/saat)', sure]);
    return {
      rows,
      note: 'Fersah tarih boyunca bölgeye göre değişmiş bir ölçüdür; buradaki katsayılar yaygın kabul gören yaklaşık değerlerdir. Yürüyüş süresi düz yolda mola vermeden 5 km/saat hız varsayar.',
    };
  }
