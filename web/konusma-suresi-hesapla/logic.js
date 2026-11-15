// Konuşma Süresi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const metin = String(v.metin ?? '');
    let kelime;
    if (metin.trim() !== '') {
      kelime = metin.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
      if (kelime === 0) h.err('Metinde sayılabilecek kelime bulunamadı. Harf ya da rakam içeren bir metin yapıştırın.');
    } else if (String(v.kelime ?? '').trim() !== '') {
      kelime = h.posint(v.kelime, 'Kelime sayısı');
    } else h.err('Konuşma metnini yapıştırın ya da "Kelime sayısı" alanını doldurun.');
    const hiz = String(v.ozelHiz ?? '').trim() !== '' ? h.pos(v.ozelHiz, 'Kendi hızınız') : Number(v.hiz) || 130;
    if (hiz > 600) h.err('"Kendi hızınız" en fazla 600 kelime/dk olabilir.');
    const sure = (sn) => {
      const t = Math.round(sn);
      if (t < 60) return `${t} sn`;
      const sa = Math.floor(t / 3600), dk = Math.floor((t % 3600) / 60), s = t % 60;
      return [sa ? `${sa} sa` : '', dk ? `${dk} dk` : '', s ? `${s} sn` : ''].filter(Boolean).join(' ');
    };
    const rows = [
      ['Konuşma süresi', sure((kelime / hiz) * 60)],
      ['Kelime sayısı', h.fmt(kelime, 0)],
      ['Konuşma hızı', h.fmt(hiz, 1) + ' kelime/dk'],
      ['Yavaş tempo (110 kelime/dk)', sure((kelime / 110) * 60)],
      ['Hızlı tempo (150 kelime/dk)', sure((kelime / 150) * 60)],
    ];
    if (String(v.hedef ?? '').trim() !== '') {
      const hedef = h.pos(v.hedef, 'Hedef süre');
      const sigan = Math.floor(hedef * hiz + 1e-9);
      const fark = kelime - sigan;
      rows.push(['Hedef süreye sığan kelime', h.fmt(sigan, 0)]);
      rows.push(['Hedefe göre durum', fark === 0 ? 'Hedefe tam uygun' : `${h.fmt(Math.abs(fark), 0)} kelime ${fark > 0 ? 'fazla' : 'eksik'} (${sure((Math.abs(fark) / hiz) * 60)})`]);
    }
    return { rows, note: 'Süre; duraklamalar, soru-cevap, alkış ve slayt geçişleri dışında yalnızca konuşulan metni kapsar. Prova yaparak kendi hızınızla doğrulayın.' };
  }
