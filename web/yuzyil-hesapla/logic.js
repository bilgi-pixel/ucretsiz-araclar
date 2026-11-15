// Yıl Hangi Yüzyılda Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const t = String(v.yil ?? '').trim();
    if (t !== '' && h.num(t, 'Yıl') === 0) h.err('Takvimde 0 yılı yoktur; MÖ 1\'den sonra MS 1 gelir. 1 ya da daha büyük bir yıl yazın.');
    const y = h.posint(v.yil, 'Yıl');
    if (y > 9999) h.err('"Yıl" en fazla 9999 olabilir.');
    const mo = v.cag === 'mo';
    const roma = (n) => {
      const tab = [[100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
      let s = '';
      for (const [d, r] of tab) while (n >= d) { s += r; n -= d; }
      return s;
    };
    const c = Math.ceil(y / 100);
    const k = Math.ceil(y / 1000);
    const cBas = (c - 1) * 100 + 1, cSon = c * 100;
    const kBas = (k - 1) * 1000 + 1, kSon = k * 1000;
    const sira = mo ? cSon - y + 1 : y - cBas + 1;
    const kalan = mo ? y - cBas : cSon - y;
    const ceyrek = ['ilk çeyrek', 'ikinci çeyrek', 'üçüncü çeyrek', 'son çeyrek'][Math.ceil(sira / 25) - 1];
    const yari = sira <= 50 ? 'ilk yarı' : 'ikinci yarı';
    const on = mo ? '' : 'MS ';
    const rows = [
      ['Yüzyıl', `${mo ? 'MÖ ' : ''}${c}. yüzyıl`],
      ['Roma rakamıyla', `${mo ? 'MÖ ' : ''}${roma(c)}. yüzyıl`],
      ['Yüzyılın kapsadığı yıllar', mo ? `MÖ ${cSon} – MÖ ${cBas}` : `${cBas}–${cSon}`],
      ['Yüzyıl içindeki sırası', `${sira}. yıl (${yari}, ${ceyrek})`],
      ['Yüzyılın bitmesine kalan', `${kalan} yıl`],
      ['Binyıl', mo ? `MÖ ${k}. binyıl (MÖ ${kSon} – MÖ ${kBas})` : `${k}. binyıl (${kBas}–${kSon})`],
    ];
    if (!mo) rows.push(['Onyıl', `${Math.floor(y / 10) * 10}–${Math.floor(y / 10) * 10 + 9}`]);
    return {
      rows,
      note: `${on}${mo ? 'MÖ ' : ''}${y} yılı için hesaplandı. Yüzyıllar 1 ile biten yılda başlar, 00 ile biten yılda sona erer; 0 yılı yoktur.`,
    };
  }
