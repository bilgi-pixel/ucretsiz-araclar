// Merkezcil Kuvvet Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let m, hiz, r, f;
    if (v.bul === 'v') {
      f = h.pos(v.kuvvet, 'Merkezcil kuvvet'); m = h.pos(v.kutle, 'Kütle'); r = h.pos(v.yaricap, 'Yarıçap');
      hiz = Math.sqrt((f * r) / m);
    } else if (v.bul === 'r') {
      f = h.pos(v.kuvvet, 'Merkezcil kuvvet'); m = h.pos(v.kutle, 'Kütle'); hiz = h.pos(v.hiz, 'Çizgisel hız');
      r = (m * hiz * hiz) / f;
    } else if (v.bul === 'm') {
      f = h.pos(v.kuvvet, 'Merkezcil kuvvet'); hiz = h.pos(v.hiz, 'Çizgisel hız'); r = h.pos(v.yaricap, 'Yarıçap');
      m = (f * r) / (hiz * hiz);
    } else {
      m = h.pos(v.kutle, 'Kütle'); hiz = h.pos(v.hiz, 'Çizgisel hız'); r = h.pos(v.yaricap, 'Yarıçap');
      f = (m * hiz * hiz) / r;
    }
    const s = {
      f: ['Merkezcil kuvvet', h.fmt(f, 4) + ' N'],
      v: ['Çizgisel hız', h.fmt(hiz, 4) + ' m/s'],
      r: ['Yarıçap', h.fmt(r, 4) + ' m'],
      m: ['Kütle', h.fmt(m, 4) + ' kg'],
    };
    const sira = [v.bul in s ? v.bul : 'f', ...['f', 'm', 'v', 'r'].filter((k) => k !== (v.bul in s ? v.bul : 'f'))];
    const T = (2 * Math.PI * r) / hiz;
    return {
      rows: [
        ...sira.map((k) => s[k]),
        ['Merkezcil ivme', h.fmt((hiz * hiz) / r, 4) + ' m/s²'],
        ['Açısal hız', h.fmt(hiz / r, 4) + ' rad/s'],
        ['Periyot (bir tur süresi)', h.fmt(T, 4) + ' s'],
        ['Frekans', h.fmt(1 / T, 4) + ' Hz'],
      ],
      note: 'Sabit süratli (düzgün) çembersel hareket varsayılır. Merkezcil kuvvet her an yörüngenin merkezine yöneliktir.',
    };
  }
