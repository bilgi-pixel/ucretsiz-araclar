// Eğik Atış Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const v0 = h.pos(v.hiz, 'İlk hız');
    const aci = h.num(v.aci, 'Atış açısı');
    if (aci < 0 || aci > 90) h.err('Atış açısı 0 ile 90 derece arasında olmalı.');
    const h0 = h.opt(v.yukseklik, 0, 'Atış yüksekliği');
    if (h0 < 0) h.err('"Atış yüksekliği" negatif olamaz.');
    const g = h.pos(v.g, 'Yer çekimi ivmesi');
    const rad = (aci * Math.PI) / 180;
    const vx = aci === 90 ? 0 : v0 * Math.cos(rad);
    const vy = aci === 0 ? 0 : v0 * Math.sin(rad);
    const tCikis = vy / g;
    const T = (vy + Math.sqrt(vy * vy + 2 * g * h0)) / g;
    const R = vx * T;
    const H = h0 + (vy * vy) / (2 * g);
    const vSon = Math.sqrt(v0 * v0 + 2 * g * h0);
    return {
      rows: [
        ['Menzil', h.fmt(R, 2) + ' m'],
        ['Maksimum yükseklik', h.fmt(H, 2) + ' m'],
        ['Uçuş süresi', h.fmt(T, 2) + ' s'],
        ['Tepe noktasına çıkış süresi', h.fmt(tCikis, 2) + ' s'],
        ['Yatay hız', h.fmt(vx, 2) + ' m/s'],
        ['Düşey ilk hız', h.fmt(vy, 2) + ' m/s'],
        ['Yere çarpma hızı', h.fmt(vSon, 2) + ' m/s'],
      ],
      note: `g = ${h.fmt(g, 4)} m/s² alındı. Hava direnci yok sayılır ve cismin atış düzeyinin altındaki yatay zemine düştüğü varsayılır; maksimum yükseklik yerden ölçülür.`,
    };
  }
