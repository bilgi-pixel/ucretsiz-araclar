// Manyetik Kuvvet Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const B = h.nonneg(v.alan, 'Manyetik alan');
    const aci = h.num(v.aci, 'Açı');
    if (aci < 0 || aci > 180) h.err('Açı 0 ile 180 derece arasında olmalı. İki yön arasındaki küçük açıyı yazın.');
    let s = Math.sin(aci * Math.PI / 180);
    if (Math.abs(s) < 1e-12) s = 0;
    if (Math.abs(s - 1) < 1e-12) s = 1;
    const rows = [];
    if (v.tur === 'tel') {
      const I = h.nonneg(v.buyukluk, 'Akım');
      const L = h.nonneg(v.ikinci, 'Tel uzunluğu');
      const Fmax = B * I * L;
      const F = Fmax * s;
      rows.push(['Manyetik kuvvet', h.sig(F) + ' N']);
      rows.push(['Kullanılan formül', 'F = B·I·L·sin θ']);
      rows.push(['sin θ', h.fmt(s, 4)]);
      rows.push(['En büyük kuvvet (θ = 90°)', h.sig(Fmax) + ' N']);
      if (L > 0) rows.push(['Birim uzunluk başına kuvvet', h.sig(F / L) + ' N/m']);
    } else {
      const q = Math.abs(h.num(v.buyukluk, 'Yük'));
      const hiz = h.nonneg(v.ikinci, 'Hız');
      if (hiz >= 299792458) h.err('Hız ışık hızından (yaklaşık 3 × 10^8 m/s) küçük olmalı.');
      const Fmax = q * hiz * B;
      const F = Fmax * s;
      rows.push(['Manyetik kuvvet', h.sig(F) + ' N']);
      rows.push(['Kullanılan formül', 'F = |q|·v·B·sin θ']);
      rows.push(['sin θ', h.fmt(s, 4)]);
      rows.push(['En büyük kuvvet (θ = 90°)', h.sig(Fmax) + ' N']);
      if (String(v.kutle ?? '').trim() !== '') {
        const m = h.pos(v.kutle, 'Parçacık kütlesi');
        if (F > 0) {
          const r = m * hiz * s / (q * B);
          rows.push(['Dairesel yörünge yarıçapı', h.sig(r) + ' m']);
          rows.push(['Dolanma periyodu', h.sig(2 * Math.PI * m / (q * B)) + ' s']);
        } else {
          rows.push(['Dairesel yörünge yarıçapı', 'Kuvvet sıfır; parçacık sapmaz']);
        }
      }
    }
    return {
      rows,
      note: 'Sonuç kuvvetin büyüklüğüdür. Yön, sağ el kuralıyla bulunur; negatif yükte yön terstir. Alanın düzgün olduğu varsayılır.',
    };
  }
