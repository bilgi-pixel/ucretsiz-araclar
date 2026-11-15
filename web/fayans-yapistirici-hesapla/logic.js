// Fayans Yapıştırıcısı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const alan = h.pos(v.alan, 'Döşenecek alan');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const torba = h.pos(v.torba, 'Torba ağırlığı');
    let birim;
    let kaynak;
    if (String(v.ozel ?? '').trim() !== '') {
      birim = h.pos(v.ozel, 'Ambalajdaki tüketim');
      if (birim > 30) h.err('Ambalajdaki tüketim kg/m² olarak yazılmalı; çoğu üründe 2 ile 8 arasındadır.');
      kaynak = 'ambalaj değeri';
    } else {
      const dis = Number(v.tarak);
      if (![3, 4, 6, 8, 10, 12].includes(dis)) h.err('Listeden bir tarak diş ölçüsü seçin.');
      birim = dis * 0.5;
      kaynak = dis + ' mm tarak';
    }
    const net = birim * alan;
    const toplam = net * (1 + fire / 100);
    const adet = Math.ceil(toplam / torba - 1e-9);
    return {
      rows: [
        ['Gerekli yapıştırıcı', h.fmt(toplam, 1) + ' kg'],
        ['Torba sayısı', `${h.fmt(adet, 0)} torba (${h.fmt(torba, 1)} kg)`],
        ['m² başına tüketim', `${h.fmt(birim, 2)} kg/m² (${kaynak})`],
        ['Fire hariç miktar', h.fmt(net, 1) + ' kg'],
        ['Bir torbanın kapladığı alan', h.fmt(torba / birim, 1) + ' m²'],
      ],
      note: 'Tarak seçiminde tüketim, diş ölçüsünün her milimetresi için yaklaşık 0,5 kg/m² kabul edilir. Zemin düzgünlüğü ve ürün tipi gerçek sarfiyatı değiştirir.',
    };
  }
