// Mod (Tepe Değer) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.nums(v.sayilar, 'Sayılar');
    const say = new Map();
    for (const x of a) {
      const k = x === 0 ? 0 : x;
      say.set(k, (say.get(k) || 0) + 1);
    }
    const tablo = [...say.entries()].sort((p, q) => p[0] - q[0]);
    const enCok = Math.max(...tablo.map((t) => t[1]));
    const enAz = Math.min(...tablo.map((t) => t[1]));
    const modlar = tablo.filter((t) => t[1] === enCok).map((t) => t[0]);
    const farkli = tablo.length;
    const yok = farkli > 1 && enCok === enAz;
    let tur;
    if (yok) tur = 'Modu yok';
    else if (modlar.length === 1) tur = 'Tek modlu (unimodal)';
    else if (modlar.length === 2) tur = 'İki modlu (bimodal)';
    else tur = 'Çok modlu (multimodal)';
    const satirlar = tablo.slice(0, 300).map((t) => `${h.fmt(t[0], 6)}\t${t[1]}`);
    return {
      rows: [
        ['Mod (tepe değer)', yok ? 'Yok' : modlar.map((x) => h.fmt(x, 6)).join('; ')],
        ['Tekrar sayısı', yok ? `Her değer ${enCok} kez` : `${enCok} kez`],
        ['Dağılım türü', tur],
        ['Veri sayısı', String(a.length)],
        ['Farklı değer sayısı', String(farkli)],
      ],
      text: 'Değer\tSıklık\n' + satirlar.join('\n') + (tablo.length > 300 ? '\n…' : ''),
      note: yok
        ? 'Bütün değerler eşit sayıda geçtiği için öne çıkan bir tepe değer yoktur.'
        : 'Altta her değerin kaç kez geçtiğini gösteren sıklık (frekans) tablosu yer alır.',
    };
  }
