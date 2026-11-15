// Hata Payı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const zTablo = { '80': 1.2815515655, '90': 1.6448536270, '95': 1.9599639845, '98': 2.3263478740, '99': 2.5758293035 };
    const duzey = String(v.guven);
    if (!(duzey in zTablo)) h.err('Listeden bir güven düzeyi seçin.');
    const z = zTablo[duzey];
    const n = h.posint(v.n, 'Örneklem büyüklüğü (n)');
    const pY = h.num(v.oran, 'Bulunan oran (%)');
    if (pY < 0 || pY > 100) h.err('"Bulunan oran (%)" 0 ile 100 arasında olmalı.');
    const evrenVar = String(v.evren ?? '').trim() !== '';
    const N = evrenVar ? h.posint(v.evren, 'Evren büyüklüğü') : null;
    if (N !== null && n > N) h.err('Örneklem büyüklüğü evren büyüklüğünden fazla olamaz.');
    const p = pY / 100;
    const fpc = N === null ? 1 : (N > 1 ? Math.sqrt((N - n) / (N - 1)) : 0);
    const se = Math.sqrt(p * (1 - p) / n) * fpc;
    const me = z * se * 100;
    const alt = Math.max(0, pY - me), ust = Math.min(100, pY + me);
    const rows = [
      ['Hata payı', '± %' + h.fmt(me, 2)],
      [`%${duzey} güven aralığı`, `%${h.fmt(alt, 2)} – %${h.fmt(ust, 2)}`],
      ['Standart hata', '%' + h.fmt(se * 100, 2)],
      ['z değeri', h.fmt(z, 4)],
    ];
    if (N !== null) rows.push(['Sonlu evren düzeltme katsayısı', h.fmt(fpc, 4)]);
    let note = 'Hata payı yalnızca rastgele örnekleme hatasını kapsar; soru biçimi, yanıtsızlık ve kapsam dışı kalma gibi hatalar bu sayıya dahil değildir.';
    if (pY === 0 || pY === 100) note = 'Oran %0 ya da %100 olduğunda bu formül hata payını sıfır verir; bu gerçek belirsizliği yansıtmaz. ' + note;
    else if (n * p < 10 || n * (1 - p) < 10) note = 'Örneklem küçük ya da oran uç değere yakın olduğundan normal yaklaşım kaba kalabilir; sonucu temkinli yorumlayın. ' + note;
    return { rows, note };
  }
