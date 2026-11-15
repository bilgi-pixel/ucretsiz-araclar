// Oran Sadeleştirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.oran ?? '').trim();
    if (ham === '') h.err('"Oran" alanını doldurun (örn. 12:18).');
    const parcalar = ham.split(/[:\/]/).map((p) => p.trim());
    if (parcalar.length < 2) h.err('Oran en az iki terimden oluşur; terimleri iki nokta üst üste ile ayırarak yazın (örn. 12:18).');
    if (parcalar.length > 6) h.err('En çok 6 terimli oran sadeleştirilebilir; terim sayısını azaltın.');
    const terimler = parcalar.map((p, i) => h.pos(p, `${i + 1}. terim`));
    let k = 1, tamlar = null;
    for (let i = 0; i <= 9 && !tamlar; i++) {
      const t = terimler.map((q) => q * k);
      if (t.every((q) => Math.abs(q - Math.round(q)) < 1e-9 * Math.max(1, q) && q < 1e15)) tamlar = t.map(Math.round);
      else k *= 10;
    }
    if (!tamlar) h.err('Terimler çok büyük ya da çok fazla ondalık basamaklı; en çok 9 ondalık basamak kullanın.');
    const ebob = (p, q) => { while (q) { [p, q] = [q, p % q]; } return p; };
    const g = tamlar.reduce(ebob);
    const sade = tamlar.map((q) => q / g);
    const toplam = sade.reduce((p, q) => p + q, 0);
    const bolen = g / k;
    const rows = [
      ['Sadeleşmiş oran', sade.map((q) => h.fmt(q, 0).replace(/\./g, '')).join(':')],
      ['Ortak bölen (EBOB)', h.fmt(bolen, 9)],
      ['Birinci terim 1 alınırsa', sade.map((q) => h.fmt(q / sade[0], 4)).join(' : ')],
      ['Terimlerin payı', sade.map((q) => '%' + h.fmt(q / toplam * 100, 2)).join(' / ')],
    ];
    if (sade.length === 2) rows.push(['Kesir değeri (ilk ÷ ikinci)', h.fmt(sade[0] / sade[1], 6)]);
    return {
      rows,
      note: Math.abs(bolen - 1) < 1e-12
        ? 'Girdiğiniz oran zaten en sade hâlinde; terimlerin 1\'den büyük ortak böleni yok.'
        : 'Bütün terimler ortak bölene bölündü; oranın değeri değişmedi, yalnızca yazılışı sadeleşti.',
    };
  }
