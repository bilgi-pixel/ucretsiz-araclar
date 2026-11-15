// Yay Uzunluğu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const r = h.pos(v.yaricap, 'Yarıçap');
    const x = h.pos(v.aci, 'Merkez açı');
    const rad = v.birim === 'radyan' ? x : x * Math.PI / 180;
    if (rad > 2 * Math.PI + 1e-9) h.err(v.birim === 'radyan' ? 'Merkez açı en fazla 2π (yaklaşık 6,2832) radyan olabilir; bu değer tam bir çembere karşılık gelir.' : 'Merkez açı en fazla 360° olabilir; bu değer tam bir çembere karşılık gelir.');
    const deg = rad * 180 / Math.PI;
    const u = (y) => h.fmt(y, 4) + ' birim', al = (y) => h.fmt(y, 4) + ' birim²';
    return {
      rows: [
        ['Yay uzunluğu', u(r * rad)],
        ['Kiriş uzunluğu', u(2 * r * Math.sin(rad / 2))],
        ['Daire dilimi alanı', al(0.5 * r * r * rad)],
        ['Daire parçası alanı', al(0.5 * r * r * (rad - Math.sin(rad)))],
        ['Çemberin tamamına oranı', '%' + h.fmt(rad / (2 * Math.PI) * 100, 4)],
        ['Merkez açı (derece)', h.fmt(deg, 6) + '°'],
        ['Merkez açı (radyan)', h.fmt(rad, 6) + ' rad'],
        ['Çemberin çevresi', u(2 * Math.PI * r)],
      ],
      note: 'Yay uzunluğu = r × θ (θ radyan). Uzunluklar yarıçapı yazdığınız birimde, alanlar o birimin karesindedir.',
    };
  }
