// Sayıların İngilizce Okunuşu — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const BIR = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
      'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const ON = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const OLCEK = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion'];
    const t = String(v.sayi ?? '').replace(/\s/g, '').replace(/−/g, '-');
    if (t === '') h.err('Çevrilecek sayıyı yazın.');
    const m = /^([-+]?)(\d+)(?:[.,](\d+))?$/.exec(t);
    if (!m) h.err('Geçerli bir sayı yazın. Binlik ayraç kullanmayın; yalnızca rakam ve tek bir ondalık ayracı girin (örn. 1250 ya da 3,14).');
    const tam = m[2].replace(/^0+(?=\d)/, '');
    const kesir = m[3] || '';
    if (tam.length > 18) h.err('Tam kısım en fazla 18 basamaklı olabilir.');
    if (kesir.length > 20) h.err('Ondalık kısım en fazla 20 basamaklı olabilir.');
    const uk = v.stil === 'uk';
    const iki = (n) => (n < 20 ? BIR[n] : ON[Math.floor(n / 10)] + (n % 10 ? '-' + BIR[n % 10] : ''));
    const uc = (n) => {
      const y = Math.floor(n / 100), k = n % 100, p = [];
      if (y) p.push(BIR[y] + ' hundred');
      if (k) p.push((y && uk ? 'and ' : '') + iki(k));
      return p.join(' ');
    };
    const gruplar = [];
    for (let i = tam.length; i > 0; i -= 3) gruplar.push(Number(tam.slice(Math.max(0, i - 3), i)));
    let okunus;
    if (gruplar.every((g) => g === 0)) okunus = 'zero';
    else {
      const p = [];
      for (let i = gruplar.length - 1; i >= 0; i--) {
        const g = gruplar[i];
        if (!g) continue;
        let s = uc(g);
        if (i === 0 && uk && g < 100 && p.length) s = 'and ' + s;
        p.push(s + (OLCEK[i] ? ' ' + OLCEK[i] : ''));
      }
      okunus = p.join(' ');
    }
    const sifir = okunus === 'zero';
    let tumu = okunus;
    if (kesir) tumu += ' point ' + kesir.split('').map((c) => BIR[Number(c)]).join(' ');
    const negatif = m[1] === '-' && !(sifir && !/[1-9]/.test(kesir));
    if (negatif) tumu = 'minus ' + tumu;
    const ingilizce = (negatif ? '-' : '') + tam.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (kesir ? '.' + kesir : '');
    const rows = [['İngilizce okunuşu', tumu]];
    if (!kesir && !negatif && !sifir) {
      const OZEL = { one: 'first', two: 'second', three: 'third', five: 'fifth', eight: 'eighth', nine: 'ninth', twelve: 'twelfth' };
      const kes = Math.max(okunus.lastIndexOf(' '), okunus.lastIndexOf('-')) + 1;
      const son = okunus.slice(kes);
      const sira = okunus.slice(0, kes) + (OZEL[son] || (son.endsWith('y') ? son.slice(0, -1) + 'ieth' : son + 'th'));
      const son2 = Number(tam.slice(-2)), son1 = son2 % 10;
      const ek = son2 >= 11 && son2 <= 13 ? 'th' : son1 === 1 ? 'st' : son1 === 2 ? 'nd' : son1 === 3 ? 'rd' : 'th';
      rows.push(['Sıra sayısı (ordinal)', sira], ['Kısa sıra yazımı', ingilizce + ek]);
    }
    rows.push(['İngilizce rakamla yazım', ingilizce]);
    return {
      rows,
      note: 'İngilizcede binlik ayraç virgül, ondalık ayraç noktadır. Ondalık kısım rakam rakam okunur.',
    };
  }
