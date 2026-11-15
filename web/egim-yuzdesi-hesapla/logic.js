// Eğim Yüzdesi ve Açı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tur = v.tur || 'olcu';
    const yatayVar = String(v.yatay ?? '').trim() !== '';
    let oran; let yatay = null; let dusey = null;
    if (tur === 'olcu') {
      dusey = h.nonneg(v.deger, 'Yükseklik farkı');
      yatay = h.pos(v.yatay, 'Yatay mesafe');
      oran = dusey / yatay;
    } else if (tur === 'yuzde') {
      oran = h.nonneg(v.deger, 'Eğim yüzdesi') / 100;
    } else {
      const a = h.nonneg(v.deger, 'Eğim açısı');
      if (a >= 90) h.err('Eğim açısı 90 dereceden küçük olmalı; 90° dik duvardır ve yüzdesi tanımsızdır.');
      oran = Math.tan(a * Math.PI / 180);
    }
    if (tur !== 'olcu' && yatayVar) { yatay = h.pos(v.yatay, 'Yatay mesafe'); dusey = yatay * oran; }
    const aci = Math.atan(oran) * 180 / Math.PI;
    const rows = [
      ['Eğim yüzdesi', '%' + h.fmt(oran * 100, 2)],
      ['Eğim açısı', h.fmt(aci, 2) + '°'],
      ['Oran (düşey:yatay)', oran > 0 ? '1:' + h.fmt(1 / oran, 2) : 'Düz (eğim yok)'],
      ['Binde eğim', '‰' + h.fmt(oran * 1000, 1)],
      ['100 birim yatayda yükselme', h.fmt(oran * 100, 2) + ' birim'],
    ];
    if (yatay !== null) {
      if (tur !== 'olcu') rows.push(['Yükseklik farkı', h.fmt(dusey, 3) + ' birim']);
      rows.push(['Eğik (yüzey) uzunluk', h.fmt(Math.sqrt(yatay * yatay + dusey * dusey), 3) + ' birim']);
    }
    return { rows, note: 'Eğim yüzdesi = yükseklik farkı ÷ yatay mesafe × 100. Yükseklik ve mesafe aynı birimde olmalıdır.' };
  }
