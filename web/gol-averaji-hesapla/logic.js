// Gol Averajı ve Puan Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tam = (s, ad) => { const n = h.int(s, ad); if (n < 0) h.err(`"${ad}" negatif olamaz.`); return n; };
    const g = tam(v.galibiyet, 'Galibiyet');
    const b = tam(v.beraberlik, 'Beraberlik');
    const m = tam(v.maglubiyet, 'Mağlubiyet');
    const a = tam(v.atilan, 'Atılan gol');
    const y = tam(v.yenilen, 'Yenilen gol');
    const gp = h.nonneg(String(v.gPuan ?? '').trim() === '' ? '3' : v.gPuan, 'Galibiyet puanı');
    const bp = h.nonneg(String(v.bPuan ?? '').trim() === '' ? '1' : v.bPuan, 'Beraberlik puanı');
    const mac = g + b + m;
    if (mac === 0) h.err('En az bir maç girin; galibiyet, beraberlik ve mağlubiyet toplamı sıfır olamaz.');
    if (g > 0 && a === 0) h.err('Galibiyeti olan bir takımın attığı gol sıfır olamaz; gol sayılarını kontrol edin.');
    if (m > 0 && y === 0) h.err('Mağlubiyeti olan bir takımın yediği gol sıfır olamaz; gol sayılarını kontrol edin.');
    const puan = g * gp + b * bp;
    const fark = a - y;
    const isaretli = fark > 0 ? '+' + h.fmt(fark, 0) : h.fmt(fark, 0);
    const enCok = mac * gp;
    return {
      rows: [
        ['Puan', h.fmt(puan, 2)],
        ['Gol averajı (fark)', isaretli],
        ['Oynanan maç', String(mac)],
        ['Gol oranı (atılan ÷ yenilen)', y === 0 ? 'Tanımsız (gol yenmedi)' : h.fmt(a / y, 3)],
        ['Maç başına puan', h.fmt(puan / mac, 2)],
        ['Maç başına atılan gol', h.fmt(a / mac, 2)],
        ['Maç başına yenilen gol', h.fmt(y / mac, 2)],
        ['Galibiyet yüzdesi', '%' + h.fmt(g / mac * 100, 1)],
        ['Alınabilecek puanın yüzdesi', enCok > 0 ? '%' + h.fmt(puan / enCok * 100, 1) : '—'],
      ],
      note: `Hesap galibiyete ${h.fmt(gp, 2)}, beraberliğe ${h.fmt(bp, 2)}, mağlubiyete 0 puan verir. Puan eşitliğinde hangi ölçütün önce uygulanacağı ligin kendi talimatına bağlıdır.`,
    };
  }
