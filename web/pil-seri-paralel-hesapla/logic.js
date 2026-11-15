// Pil Seri Paralel Bağlantı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const vh = h.pos(v.gerilim, 'Hücre gerilimi');
    const mah = h.pos(v.kapasite, 'Hücre kapasitesi');
    const s = h.posint(v.seri, 'Seri hücre sayısı');
    const p = h.posint(v.paralel, 'Paralel kol sayısı');
    if (s > 1000 || p > 1000) h.err('Seri ve paralel sayıları en fazla 1000 olabilir.');
    const vt = vh * s;
    const mahT = mah * p;
    const wh = vt * mahT / 1000;
    const rows = [
      ['Toplam gerilim', h.fmt(vt, 3) + ' V'],
      ['Toplam kapasite', h.fmt(mahT, 2) + ' mAh'],
      ['Toplam kapasite (Ah)', h.fmt(mahT / 1000, 4) + ' Ah'],
      ['Toplam enerji', h.fmt(wh, 3) + ' Wh'],
      ['Dizilim', s + 'S' + p + 'P'],
      ['Toplam hücre sayısı', h.fmt(s * p, 0) + ' adet'],
    ];
    if (String(v.akim ?? '').trim() !== '') {
      const a = h.pos(v.akim, 'Yük akımı');
      const saat = mahT / 1000 / a;
      const dk = Math.round(saat * 60);
      rows.push(['Kuramsal çalışma süresi', h.fmt(saat, 2) + ' saat (' + Math.floor(dk / 60) + ' sa ' + (dk % 60) + ' dk)']);
      rows.push(['Hücre başına akım', h.fmt(a / p, 3) + ' A']);
      rows.push(['Yük gücü (anma geriliminde)', h.fmt(vt * a, 2) + ' W']);
    }
    return { rows, note: 'Gerilim anma (nominal) değeriyle hesaplanır. Gerçek süre; boşalma akımı, sıcaklık, pil yaşı ve koruma devresinin kesme gerilimi nedeniyle kuramsal değerin altında kalır.' };
  }
