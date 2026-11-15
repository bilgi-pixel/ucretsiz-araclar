// Kosinüs Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.aci, 'Açı');
    const kat = { derece: 1, radyan: 180 / Math.PI, pi: 180, grad: 0.9 }[v.birim] || 1;
    let deg = x * kat;
    if (Math.abs(deg) > 1e12) h.err('Açı çok büyük; daha küçük bir değer yazın.');
    if (Math.abs(deg - Math.round(deg)) < 1e-9) deg = Math.round(deg);
    const d = ((deg % 360) + 360) % 360;
    let c = Math.cos(d * Math.PI / 180);
    if (d === 90 || d === 270) c = 0; else if (d === 0) c = 1; else if (d === 180) c = -1;
    const m = d % 180, ref = m > 90 ? 180 - m : m;
    const tablo = { 0: '1', 15: '(√6 + √2)/4', 30: '√3/2', 45: '√2/2', 60: '1/2', 75: '(√6 - √2)/4', 90: '0' };
    let tam = tablo[ref];
    if (tam !== undefined && d > 90 && d < 270) tam = '-' + tam;
    let bolge;
    if (d % 90 === 0) bolge = 'Eksen üzerinde (bölge sınırı)';
    else bolge = ['I. bölge (kosinüs pozitif)', 'II. bölge (kosinüs negatif)', 'III. bölge (kosinüs negatif)', 'IV. bölge (kosinüs pozitif)'][Math.floor(d / 90)];
    const rows = [['Kosinüs', h.fmt(c, 10)]];
    if (tam !== undefined) rows.push(['Tam değer', tam]);
    rows.push(
      ['Sekant (1 / cos)', c === 0 ? 'tanımsız' : h.fmt(1 / c, 10)],
      ['Açı (derece)', h.fmt(deg, 6) + '°'],
      ['Açı (radyan)', h.fmt(deg * Math.PI / 180, 6) + ' rad'],
      ['Esas ölçü', h.fmt(d, 6) + '°'],
      ['Bölge', bolge],
    );
    return { rows, note: 'Kosinüs değeri her zaman -1 ile 1 arasındadır. Sonuç en fazla on ondalık basamağa yuvarlanır.' };
  }
