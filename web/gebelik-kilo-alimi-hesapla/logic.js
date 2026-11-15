// Gebelikte Kilo Alımı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const boy = h.pos(v.boy, 'Boy');
    const kilo = h.pos(v.kilo, 'Gebelik öncesi kilo');
    if (boy < 120 || boy > 220) h.err('"Boy" 120 ile 220 cm arasında olmalı; değeri santimetre olarak yazın (örn. 165).');
    if (kilo < 30 || kilo > 250) h.err('"Gebelik öncesi kilo" 30 ile 250 kg arasında olmalı.');
    const vki = kilo / ((boy / 100) * (boy / 100));
    const ikiz = v.tur === 'ikiz';
    // [ad, tekil alt, tekil üst, ikiz alt, ikiz üst, haftalık alt, haftalık üst]
    let g;
    if (vki < 18.5) g = ['Zayıf', 12.5, 18, null, null, 0.44, 0.58];
    else if (vki < 25) g = ['Normal kilolu', 11.5, 16, 17, 25, 0.35, 0.5];
    else if (vki < 30) g = ['Fazla kilolu', 7, 11.5, 14, 23, 0.23, 0.33];
    else g = ['Obez', 5, 9, 11, 19, 0.17, 0.27];
    const alt = ikiz ? g[3] : g[1];
    const ust = ikiz ? g[4] : g[2];
    const rows = [];
    if (alt === null) {
      rows.push(['Önerilen toplam kilo alımı', 'Bu grup için yerleşik bir aralık yok; hekiminize danışın']);
      rows.push(['Gebelik öncesi VKİ', h.fmt(vki, 1) + ' kg/m²']);
      rows.push(['VKİ grubu', g[0]]);
    } else {
      rows.push(['Önerilen toplam kilo alımı', `${h.fmt(alt, 1)} – ${h.fmt(ust, 1)} kg`]);
      rows.push(['Gebelik öncesi VKİ', h.fmt(vki, 1) + ' kg/m²']);
      rows.push(['VKİ grubu', g[0]]);
      rows.push(['Doğuma yakın beklenen kilo', `${h.fmt(kilo + alt, 1)} – ${h.fmt(kilo + ust, 1)} kg`]);
      if (!ikiz) rows.push(['Haftalık artış (2. ve 3. üç aylık dönem)', `${h.fmt(g[5], 2)} – ${h.fmt(g[6], 2)} kg`]);
    }
    if (String(v.simdi ?? '').trim() !== '') {
      const simdi = h.pos(v.simdi, 'Şimdiki kilo');
      const fark = simdi - kilo;
      rows.push(['Şu ana kadar alınan kilo', h.fmt(fark, 1) + ' kg']);
      if (alt !== null) {
        let durum;
        if (fark > ust + 1e-9) durum = `Önerilen üst sınır ${h.fmt(fark - ust, 1)} kg aşılmış`;
        else if (fark >= alt - 1e-9) durum = `Önerilen aralığın içinde; üst sınıra ${h.fmt(ust - fark, 1)} kg var`;
        else durum = `${h.fmt(alt - fark, 1)} – ${h.fmt(ust - fark, 1)} kg`;
        rows.push(['Doğuma kadar kalan pay', durum]);
      }
    }
    return {
      rows,
      note: 'Aralıklar gebelik öncesi vücut kitle indeksine dayalı, yaygın kullanılan genel önerilerdir. Kişisel hedefinizi sizi izleyen hekim ya da ebe belirler.',
    };
  }
