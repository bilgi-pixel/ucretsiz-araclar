// İş Hesaplama (Fizik) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const aci = h.opt(v.aci, 0, 'Açı');
    if (aci < 0 || aci > 180) h.err('Açı 0 ile 180 derece arasında olmalı.');
    let c = Math.cos((aci * Math.PI) / 180);
    if (Math.abs(c) < 1e-12) c = 0;
    let f, d, w;
    if (v.bul === 'f' || v.bul === 'd') {
      w = h.num(v.isDegeri, 'İş');
      if (c === 0) h.err('Açı 90° iken kuvvet iş yapmaz; işten kuvvet ya da yol bulunamaz. Farklı bir açı yazın.');
      if (w !== 0 && (w > 0) !== (c > 0)) h.err('İşin işareti açıyla uyumsuz: 90°\'den küçük açılarda iş pozitif, büyük açılarda negatif olmalı.');
      if (v.bul === 'f') {
        d = h.pos(v.yol, 'Yer değiştirme');
        f = w / (d * c);
      } else {
        f = h.pos(v.kuvvet, 'Kuvvet');
        d = w / (f * c);
      }
    } else {
      f = h.nonneg(v.kuvvet, 'Kuvvet');
      d = h.nonneg(v.yol, 'Yer değiştirme');
      w = f * d * c;
    }
    const satirlar = {
      w: ['İş', h.fmt(w, 4) + ' J'],
      f: ['Kuvvet', h.fmt(f, 4) + ' N'],
      d: ['Yer değiştirme', h.fmt(d, 4) + ' m'],
    };
    const sira = v.bul === 'f' ? ['f', 'w', 'd'] : v.bul === 'd' ? ['d', 'w', 'f'] : ['w', 'f', 'd'];
    const tur = w > 1e-12 ? 'Pozitif iş (kuvvet cisme enerji aktarır)' : w < -1e-12 ? 'Negatif iş (kuvvet cisimden enerji alır)' : 'İş yapılmıyor';
    return {
      rows: [
        ...sira.map((k) => satirlar[k]),
        ['İş (kJ)', h.fmt(w / 1000, 4) + ' kJ'],
        ['Kuvvetin hareket yönündeki bileşeni', h.fmt(f * c, 4) + ' N'],
        ['Yorum', tur],
      ],
      note: `Açı ${h.fmt(aci, 2)}° için cos θ = ${h.fmt(c, 4)}. Kuvvetin sabit ve yolun doğrusal olduğu varsayılır.`,
    };
  }
