// Zar Olasılığı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const n = h.posint(v.zar, 'Zar sayısı');
    if (n > 20) h.err('"Zar sayısı" en fazla 20 olabilir.');
    const f = h.posint(v.yuz, 'Bir zarın yüz sayısı');
    if (f < 2 || f > 100) h.err('"Bir zarın yüz sayısı" 2 ile 100 arasında olmalı.');
    const t = h.int(v.hedef, 'Hedef toplam');
    // Toplamların dağılımı: olasılık (kayan nokta) ve mümkünse tam durum sayısı.
    const tum = Math.pow(f, n);
    const tamSayim = tum <= 9e15;
    let ol = [1];
    let say = [1];
    for (let i = 0; i < n; i++) {
      const yeniOl = new Array(ol.length + f - 1).fill(0);
      const yeniSay = new Array(ol.length + f - 1).fill(0);
      for (let s = 0; s < ol.length; s++) {
        for (let k = 0; k < f; k++) {
          yeniOl[s + k] += ol[s] / f;
          if (tamSayim) yeniSay[s + k] += say[s];
        }
      }
      ol = yeniOl; say = yeniSay;
    }
    // ol[i] → toplam = n + i
    const enK = n, enB = n * f;
    let p = 0, adet = 0;
    for (let i = 0; i < ol.length; i++) {
      const s = n + i;
      const uygun = v.kosul === 'enaz' ? s >= t : v.kosul === 'encok' ? s <= t : s === t;
      if (uygun) { p += ol[i]; adet += say[i]; }
    }
    if (tamSayim) p = adet / tum;
    if (p > 1) p = 1;
    const ebob = (x, y) => { while (y) { [x, y] = [y, x % y]; } return x; };
    const rows = [
      ['Olasılık', h.sig(p, 6)],
      ['Yüzde', '%' + h.sig(p * 100, 6)],
    ];
    if (tamSayim) {
      const g = ebob(adet, tum) || 1;
      rows.push(['Uygun durum / tüm durum', `${h.fmt(adet, 0)} / ${h.fmt(tum, 0)}`]);
      rows.push(['Kesir', adet === 0 ? '0' : adet === tum ? '1' : `${h.fmt(adet / g, 0)}/${h.fmt(tum / g, 0)}`]);
    }
    rows.push(['Ortalama kaç atışta bir', p > 0 ? h.sig(1 / p, 6) : '—']);
    rows.push(['Olası toplam aralığı', `${enK} – ${enB}`]);
    rows.push(['Beklenen toplam', h.fmt(n * (f + 1) / 2, 1)]);
    const orta = n * (f + 1);
    rows.push(['En olası toplam', n === 1 ? 'Tüm yüzler eşit olasılıklı' : orta % 2 === 0 ? String(orta / 2) : `${(orta - 1) / 2} ve ${(orta + 1) / 2}`]);
    let note = 'Zarların hilesiz olduğu ve birbirinden bağımsız atıldığı varsayılır.';
    if (t < enK || t > enB) note = `Hedef ${t}, olası toplam aralığının (${enK}–${enB}) dışında. ` + note;
    return { rows, note };
  }
