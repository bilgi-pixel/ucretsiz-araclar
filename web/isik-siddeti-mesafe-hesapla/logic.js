// Ters Kare Yasası Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    if (v.mod === 'kaynak') {
      const P = h.pos(v.siddet, 'Kaynak gücü');
      const r = h.pos(v.r1, 'Mesafe');
      const alan = 4 * Math.PI * r * r;
      const I = P / alan;
      const rows = [
        ['Şiddet', h.sig(I) + ' W/m²'],
        ['Küre yüzey alanı (4πr²)', h.sig(alan) + ' m²'],
        ['İki kat mesafedeki şiddet', h.sig(I / 4) + ' W/m²'],
      ];
      if (String(v.hedef ?? '').trim() !== '') {
        const r2 = h.pos(v.hedef, 'Yeni mesafe');
        rows.push(['Yeni mesafedeki şiddet', h.sig(P / (4 * Math.PI * r2 * r2)) + ' W/m²']);
      }
      return { rows, note: 'Kaynağın noktasal olduğu, gücünü her yöne eşit yaydığı ve ortamda soğurma ya da yansıma olmadığı varsayılır.' };
    }
    const I1 = h.pos(v.siddet, 'Bilinen şiddet');
    const r1 = h.pos(v.r1, 'Bilinen mesafe');
    if (v.mod === 'mesafe') {
      const I2 = h.pos(v.hedef, 'Hedef şiddet');
      const r2 = r1 * Math.sqrt(I1 / I2);
      return {
        rows: [
          ['Gereken mesafe', h.sig(r2) + ' m'],
          ['Mesafe oranı (r₂/r₁)', h.sig(r2 / r1)],
          ['Şiddet oranı (I₂/I₁)', h.sig(I2 / I1)],
          ['Mesafe değişimi', (r2 >= r1 ? '+' : '−') + h.sig(Math.abs(r2 - r1)) + ' m'],
        ],
        note: 'Hedef şiddet, bilinen şiddetle aynı birimde yazılmalıdır. Noktasal kaynak ve engelsiz ortam varsayılır.',
      };
    }
    const r2 = h.pos(v.hedef, 'Yeni mesafe');
    const oran = (r1 / r2) * (r1 / r2);
    const I2 = I1 * oran;
    return {
      rows: [
        ['Yeni şiddet', h.sig(I2)],
        ['Şiddet oranı (I₂/I₁)', h.sig(oran)],
        ['Yüzde olarak', '%' + h.sig(oran * 100, 5)],
        ['Düzey farkı', h.fmt(10 * Math.log10(oran), 2) + ' dB'],
        ['Mesafe oranı (r₂/r₁)', h.sig(r2 / r1)],
      ],
      note: 'Yeni şiddet, girdiğiniz şiddetle aynı birimdedir (lüks, W/m² vb.). Noktasal kaynak ve engelsiz ortam varsayılır.',
    };
  }
