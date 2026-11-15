// Daire Dilimi Alanı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const r = h.pos(v.yaricap, 'Yarıçap');
    const aci = h.pos(v.aci, 'Merkez açı');
    let t;
    if (v.birim === 'radyan') {
      if (aci > 2 * Math.PI + 1e-9) h.err('Merkez açı en fazla 2π (yaklaşık 6,2832) radyan olabilir. Derece yazdıysanız açı birimini "Derece" seçin.');
      t = Math.min(aci, 2 * Math.PI);
    } else {
      if (aci > 360) h.err('Merkez açı en fazla 360 derece olabilir.');
      t = aci * Math.PI / 180;
    }
    const alan = r * r * t / 2;
    const yay = r * t;
    const kiris = 2 * r * Math.abs(Math.sin(t / 2));
    const parca = r * r * (t - Math.sin(t)) / 2;
    return {
      rows: [
        ['Dilim alanı', h.fmt(alan, 4) + ' birim²'],
        ['Yay uzunluğu', h.fmt(yay, 4) + ' birim'],
        ['Dilimin çevresi (yay + 2 yarıçap)', h.fmt(yay + 2 * r, 4) + ' birim'],
        ['Kiriş uzunluğu', h.fmt(kiris, 4) + ' birim'],
        ['Daire parçası alanı (kiriş ile yay arası)', h.fmt(parca, 4) + ' birim²'],
        ['Tam dairedeki payı', '%' + h.fmt(t / (2 * Math.PI) * 100, 2)],
        ['Açı', h.fmt(t * 180 / Math.PI, 4) + '° = ' + h.fmt(t, 4) + ' rad'],
      ],
      note: 'Dilim alanı = π·r²·α ÷ 360 (derece) = ½·r²·θ (radyan). Yay uzunluğu = r·θ.',
    };
  }
