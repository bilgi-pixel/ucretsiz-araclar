// Kiriş Uzunluğu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const r = h.pos(v.yaricap, 'Yarıçap');
    const x = h.num(v.deger, 'Bu ölçünün değeri');
    let d; // merkezden kirişe işaretli uzaklık (büyük yayda negatif)
    if (v.bilinen === 'uzaklik') {
      if (x < 0) h.err('Merkeze uzaklık negatif olamaz.');
      if (x >= r) h.err('Kirişin merkeze uzaklığı yarıçaptan küçük olmalı; eşit ya da büyükse doğru çemberi kesmez.');
      d = x;
    } else if (v.bilinen === 'ok') {
      if (!(x > 0)) h.err('Ok yüksekliği sıfırdan büyük olmalı.');
      if (x >= 2 * r) h.err('Ok yüksekliği çaptan (2r) küçük olmalı.');
      d = r - x;
    } else {
      if (!(x > 0) || !(x < 360)) h.err('Merkez açı 0 ile 360 derece arasında olmalı (uçlar hariç).');
      d = r * Math.cos((x * Math.PI) / 360);
    }
    const aciRad = v.bilinen === 'aci' ? (x * Math.PI) / 180 : 2 * Math.acos(Math.max(-1, Math.min(1, d / r)));
    const kiris = v.bilinen === 'aci' ? 2 * r * Math.sin(aciRad / 2) : 2 * Math.sqrt(Math.max(0, r * r - d * d));
    const ok = r - d;
    return {
      rows: [
        ['Kiriş uzunluğu', h.fmt(kiris, 4)],
        ['Merkez açı', h.fmt((aciRad * 180) / Math.PI, 4) + '°'],
        ['Merkeze uzaklık', h.fmt(Math.abs(d), 4)],
        ['Ok yüksekliği', h.fmt(ok, 4)],
        ['Yay uzunluğu', h.fmt(r * aciRad, 4)],
        ['Çap', h.fmt(2 * r, 4)],
      ],
      note: 'Uzunluklar yarıçapla aynı birimdedir. Merkez açı 180°\'den büyükse kiriş büyük yayı görür; ok yüksekliği yarıçaptan büyük çıkar.',
    };
  }
