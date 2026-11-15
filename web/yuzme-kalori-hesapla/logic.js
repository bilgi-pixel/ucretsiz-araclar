// Yüzmede Yakılan Kalori Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kg = h.pos(v.kilo, 'Vücut ağırlığı');
    const dk = h.pos(v.sure, 'Yüzme süresi');
    if (kg < 20 || kg > 250) h.err('Vücut ağırlığı 20 ile 250 kg arasında olmalı.');
    if (dk > 1440) h.err('Süre 1.440 dakikadan (24 saat) uzun olamaz.');
    const tablo = {
      serbestYavas: [5.8, 'Serbest stil, yavaş / orta'],
      serbestHizli: [9.8, 'Serbest stil, hızlı'],
      sirt: [4.8, 'Sırtüstü, rahat'],
      sirtAnt: [9.5, 'Sırtüstü, antrenman'],
      kurbaga: [5.3, 'Kurbağalama, rahat'],
      kurbagaAnt: [10.3, 'Kurbağalama, antrenman'],
      kelebek: [13.8, 'Kelebek'],
      keyif: [6.0, 'Keyif için yüzme'],
      durma: [3.5, 'Suda durma'],
    };
    const sec = tablo[v.stil || 'serbestYavas'];
    if (!sec) h.err('Geçerli bir stil seçin.');
    const met = sec[0];
    const saat = dk / 60;
    const kcal = met * kg * saat;
    const rows = [
      ['Yakılan kalori', h.fmt(kcal, 0) + ' kcal'],
      ['Net kalori (dinlenme hariç)', h.fmt((met - 1) * kg * saat, 0) + ' kcal'],
      ['Stil', sec[1]],
      ['MET değeri', h.fmt(met, 1)],
      ['Dakika başına', h.fmt(kcal / dk, 1) + ' kcal'],
    ];
    if (String(v.mesafe ?? '').trim() !== '') {
      const m = h.pos(v.mesafe, 'Mesafe');
      const sn = Math.round(((dk * 60) / m) * 100);
      if (sn < 40) h.err('100 metre temposu 40 saniyenin altında çıkıyor. Mesafeyi metre, süreyi dakika olarak yazdığınızdan emin olun.');
      rows.push(['100 m temposu', `${Math.floor(sn / 60)}:${String(sn % 60).padStart(2, '0')} dk`]);
      rows.push(['Ortalama hız', h.fmt((m / 1000) / saat, 2) + ' km/sa']);
      rows.push(['100 m başına', h.fmt((kcal / m) * 100, 1) + ' kcal']);
    }
    return { rows, note: 'MET değerleri ortalama bir yüzücü içindir; teknik, su sıcaklığı ve dinlenme araları gerçek harcamayı değiştirir.' };
  }
