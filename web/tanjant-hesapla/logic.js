// Tanjant ve Kotanjant Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.aci, 'Açı');
    const kat = { derece: 1, radyan: 180 / Math.PI, pi: 180, grad: 0.9 }[v.birim] || 1;
    let deg = x * kat;
    if (Math.abs(deg) > 1e12) h.err('Açı çok büyük; daha küçük bir değer yazın.');
    if (Math.abs(deg - Math.round(deg)) < 1e-9) deg = Math.round(deg);
    const d = ((deg % 360) + 360) % 360;
    const m = d % 180, ref = m > 90 ? 180 - m : m;
    const neg = m > 90;
    let t = null, k = null; // null = tanımsız
    if (m === 0) { t = 0; }
    else if (m === 90) { k = 0; }
    else { t = Math.tan(m * Math.PI / 180); k = 1 / t; }
    const tanTablo = { 0: '0', 15: '2 - √3', 30: '√3/3', 45: '1', 60: '√3', 75: '2 + √3' };
    const cotTablo = { 15: '2 + √3', 30: '√3', 45: '1', 60: '√3/3', 75: '2 - √3', 90: '0' };
    const isaretle = (s) => (s === undefined ? undefined : !neg || s === '0' ? s : s.includes(' ') ? '-(' + s + ')' : '-' + s);
    const tanTam = isaretle(tanTablo[ref]), cotTam = isaretle(cotTablo[ref]);
    let bolge;
    if (d % 90 === 0) bolge = 'Eksen üzerinde (bölge sınırı)';
    else bolge = ['I. bölge (tanjant pozitif)', 'II. bölge (tanjant negatif)', 'III. bölge (tanjant pozitif)', 'IV. bölge (tanjant negatif)'][Math.floor(d / 90)];
    const rows = [['Tanjant', t === null ? 'tanımsız' : h.fmt(t, 10)]];
    if (tanTam !== undefined) rows.push(['Tanjant (tam değer)', tanTam]);
    rows.push(['Kotanjant', k === null ? 'tanımsız' : h.fmt(k, 10)]);
    if (cotTam !== undefined) rows.push(['Kotanjant (tam değer)', cotTam]);
    rows.push(
      ['Yüzde eğim karşılığı', t === null ? 'tanımsız (düşey)' : '%' + h.fmt(t * 100, 4)],
      ['Açı (derece)', h.fmt(deg, 6) + '°'],
      ['Açı (radyan)', h.fmt(deg * Math.PI / 180, 6) + ' rad'],
      ['Esas ölçü', h.fmt(d, 6) + '°'],
      ['Bölge', bolge],
    );
    return { rows, note: 'Tanjant 90° ve 270°\'de, kotanjant 0° ve 180°\'de tanımsızdır. Sonuçlar en fazla on ondalık basamağa yuvarlanır.' };
  }
