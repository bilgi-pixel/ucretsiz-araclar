// Gübre Miktarı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const alan = h.pos(v.alan, 'Arazi büyüklüğü');
    const doz = h.pos(v.doz, 'Önerilen saf besin');
    const oran = h.pos(v.oran, 'Gübredeki besin oranı');
    if (oran > 100) h.err('Gübredeki besin oranı %100\'den büyük olamaz; torbanın üzerindeki yüzdeyi yazın (örn. 46).');
    const torba = h.pos(v.torba, 'Torba ağırlığı');
    const saf = alan * doz;
    const gubre = saf / (oran / 100);
    const dekara = gubre / alan;
    const adet = Math.ceil(gubre / torba - 1e-9);
    return {
      rows: [
        ['Gereken toplam gübre', h.fmt(gubre, 2) + ' kg'],
        ['Dekara atılacak gübre', h.fmt(dekara, 2) + ' kg/da'],
        ['Toplam saf besin', h.fmt(saf, 2) + ' kg'],
        ['Gereken torba sayısı', `${h.fmt(adet, 0)} torba (${h.fmt(torba, 2)} kg\'lık)`],
        ['Ton karşılığı', h.fmt(gubre / 1000, 3) + ' ton'],
      ],
      note: 'Formül: gübre = alan × saf besin ÷ (oran ÷ 100). Torba sayısı yukarı yuvarlanır. Doz önerisi için toprak analizi esas alınmalıdır.',
    };
  }
