// İki Zar Toplam Olasılıkları Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const t = h.int(v.toplam, 'Hedef toplam');
    if (t < 2 || t > 12) h.err('İki zarın toplamı 2 ile 12 arasında olabilir; bu aralıkta bir tam sayı yazın.');
    const yol = (s) => 6 - Math.abs(s - 7);
    const uygunMu = (s) => (v.kosul === 'enaz' ? s >= t : v.kosul === 'encok' ? s <= t : s === t);
    let uygun = 0;
    const ciftler = [];
    for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (uygunMu(a + b)) { uygun++; ciftler.push(`(${a},${b})`); }
    const obeb = (x, y) => (y === 0 ? x : obeb(y, x % y));
    const g = obeb(uygun, 36);
    const kesir = uygun === 36 ? '1' : `${uygun / g}/${36 / g}`;
    const p = uygun / 36;
    const satirlar = [];
    for (let s = 2; s <= 12; s++) satirlar.push(`${String(s).padStart(2, ' ')}: ${yol(s)}/36 = %${h.fix(yol(s) / 36 * 100, 2)}${uygunMu(s) ? '  ←' : ''}`);
    const baslik = v.kosul === 'enaz' ? `Toplam en az ${t}` : v.kosul === 'encok' ? `Toplam en çok ${t}` : `Toplam ${t}`;
    return {
      rows: [
        ['Olasılık', '%' + h.fmt(p * 100, 2)],
        ['Kesir olarak', kesir],
        ['Uygun durum sayısı', `${uygun} / 36`],
        ['Gelmeme olasılığı', '%' + h.fmt((1 - p) * 100, 2)],
        ['Ortalama sıklık', uygun === 36 ? 'Her atışta' : h.fmt(36 / uygun, 1) + ' atışta 1'],
      ],
      text: `${baslik} için uygun zar çiftleri (birinci zar, ikinci zar):\n${ciftler.join(' ')}\n\nTüm toplamların dağılımı:\n${satirlar.join('\n')}`,
      note: 'Zarların hilesiz ve birbirinden bağımsız olduğu varsayılır. Olasılık, uzun vadedeki oranı anlatır; tek tek atışların sonucunu belirlemez.',
    };
  }
