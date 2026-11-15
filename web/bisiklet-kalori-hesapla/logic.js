// Bisiklette Yakılan Kalori Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kg = h.pos(v.kilo, 'Vücut ağırlığı');
    const dk = h.pos(v.sure, 'Sürüş süresi');
    if (kg < 25 || kg > 250) h.err('Vücut ağırlığı 25 ile 250 kg arasında olmalı.');
    const tur = v.tur || 'hiz';
    const sabit = { dag: [8.5, 'Dağ bisikleti, arazi'], sabitHafif: [3.5, 'Sabit bisiklet, hafif tempo'], sabitOrta: [6.8, 'Sabit bisiklet, orta tempo'], sabitYuksek: [8.8, 'Sabit bisiklet, yüksek tempo'] };
    let met, tanim, kmh = null;
    const mesafeDolu = String(v.mesafe ?? '').trim() !== '';
    if (mesafeDolu) {
      const km = h.pos(v.mesafe, 'Mesafe');
      kmh = (km / dk) * 60;
      if (kmh > 60) h.err('Ortalama hız 60 km/sa üzerinde çıkıyor. Mesafeyi kilometre, süreyi dakika olarak yazdığınızdan emin olun.');
    }
    if (tur === 'hiz') {
      if (kmh === null) h.err('"Hıza göre" hesap için "Mesafe" alanını doldurun ya da başka bir sürüş türü seçin.');
      const e = 1e-9;
      if (kmh < 16 - e) { met = 4.0; tanim = '16 km/sa altı, gezinti temposu'; }
      else if (kmh < 19 - e) { met = 6.8; tanim = '16–19 km/sa, hafif tempo'; }
      else if (kmh < 22.5 - e) { met = 8.0; tanim = '19–22,5 km/sa, orta tempo'; }
      else if (kmh < 25.7 - e) { met = 10.0; tanim = '22,5–25,7 km/sa, canlı tempo'; }
      else if (kmh < 32 - e) { met = 12.0; tanim = '25,7–32 km/sa, hızlı tempo'; }
      else { met = 15.8; tanim = '32 km/sa ve üzeri, yarış temposu'; }
    } else if (sabit[tur]) { met = sabit[tur][0]; tanim = sabit[tur][1]; }
    else h.err('Geçerli bir sürüş türü seçin.');
    const saat = dk / 60;
    const kcal = met * kg * saat;
    const rows = [
      ['Yakılan kalori', h.fmt(kcal, 0) + ' kcal'],
      ['Net kalori (dinlenme hariç)', h.fmt((met - 1) * kg * saat, 0) + ' kcal'],
      ['MET değeri', h.fmt(met, 1)],
      ['Efor düzeyi', tanim],
      ['Saat başına', h.fmt(met * kg, 0) + ' kcal'],
    ];
    if (kmh !== null) rows.push(['Ortalama hız', h.fmt(kmh, 1) + ' km/sa']);
    return { rows, note: 'MET değerleri ortalama koşullar içindir; rüzgâr, yokuş, bisiklet tipi ve lastik basıncı gerçek harcamayı değiştirir.' };
  }
