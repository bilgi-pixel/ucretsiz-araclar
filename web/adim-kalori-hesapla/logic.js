// Adım Sayısından Kalori Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const adim = h.posint(v.adim, 'Adım sayısı');
    const kilo = h.pos(v.kilo, 'Kilo');
    if (adim > 500000) h.err('Adım sayısı 500.000\'den büyük olamaz; tek bir güne ya da yürüyüşe ait değeri yazın.');
    if (kilo < 20 || kilo > 400) h.err('Kilo 20 ile 400 kg arasında olmalı.');
    let adimCm;
    if (String(v.adimBoyu ?? '').trim() !== '') {
      adimCm = h.pos(v.adimBoyu, 'Adım uzunluğu');
      if (adimCm < 20 || adimCm > 150) h.err('Adım uzunluğu 20 ile 150 cm arasında olmalı.');
    } else {
      const boy = h.pos(v.boy, 'Boy');
      if (boy < 100 || boy > 250) h.err('Boy 100 ile 250 cm arasında olmalı; santimetre cinsinden yazın.');
      adimCm = boy * 0.414;
    }
    const tablo = { yavas: [3.2, 2.8], orta: [4.8, 3.5], hizli: [6.4, 5.0] };
    const [hiz, met] = tablo[v.tempo] || tablo.orta;
    const km = adim * adimCm / 100000;
    const saat = km / hiz;
    const kcal = met * kilo * saat;
    const net = (met - 1) * kilo * saat;
    const dk = saat * 60;
    const sa = Math.floor(dk / 60 + 1e-9);
    const kalanDk = Math.round(dk - sa * 60);
    const sureMetin = sa > 0 ? `${sa} sa ${kalanDk} dk` : `${h.fmt(dk, 0)} dk`;
    return {
      rows: [
        ['Yakılan kalori', h.fmt(kcal, 0) + ' kcal'],
        ['Mesafe', h.fmt(km, 2) + ' km'],
        ['Yaklaşık süre', sureMetin],
        ['Adım uzunluğu', h.fmt(adimCm, 1) + ' cm'],
        ['1.000 adımda kalori', h.fmt(kcal / adim * 1000, 1) + ' kcal'],
        ['Net kalori (dinlenme hariç)', h.fmt(net, 0) + ' kcal'],
      ],
      note: `Hesap ${h.fmt(met, 1)} MET ve ${h.fmt(hiz, 1)} km/sa tempo varsayımıyla yapılır. Eğim, zemin ve kişisel farklar sonucu değiştirir; değerler tahmindir.`,
    };
  }
