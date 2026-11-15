// Kolonya ve Alkol Seyreltme Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const c1 = h.pos(v.c1, 'Eldeki alkolün derecesi');
    const c2 = h.pos(v.c2, 'Hedef derece');
    const hacim = h.pos(v.hacim, 'Hacim');
    if (c1 > 100) h.err('Alkol derecesi 100\'den büyük olamaz; hacimce yüzde değerini yazın (örn. 96).');
    if (c2 > c1 + 1e-9) h.err('Hedef derece, eldeki alkolün derecesinden yüksek olamaz; su ekleyerek derece yalnızca düşürülür.');
    let alkol, son;
    if (v.mod === 'alkol') { alkol = hacim; son = hacim * c1 / c2; }
    else { son = hacim; alkol = hacim * c2 / c1; }
    const su = son - alkol;
    const saf = alkol * c1 / 100;
    const oran = alkol > 0 ? su / alkol : 0;
    return {
      rows: [
        ['Eklenecek saf su', h.fmt(su, 2) + ' ml'],
        [`Gerekli alkol (${h.fmt(c1, 2)}°)`, h.fmt(alkol, 2) + ' ml'],
        ['Son karışım (kuramsal)', h.fmt(son, 2) + ' ml'],
        ['Karışımdaki saf etanol', h.fmt(saf, 2) + ' ml'],
        ['Su / alkol oranı', `1 ölçü alkole ${h.fmt(oran, 3)} ölçü su`],
      ],
      note: 'Hesap hacimce yüzdeye göredir. Alkol ve su karışınca toplam hacim bir miktar büzüldüğü için gerçek son hacim kuramsal değerden biraz az çıkar; kesin derece için alkolmetreyle ölçün.',
    };
  }
