// Bilimsel Gösterim Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let t = String(v.sayi ?? '').trim();
    if (t === '') h.err('Bir sayı ya da bilimsel gösterim yazın (örn. 150000000 ya da 1,5 × 10^8).');
    const ustHarita = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-', '⁺': '+' };
    t = t.replace(/\s+/g, '').replace(/−/g, '-').toLowerCase()
      .replace(/10([⁺⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)$/, (m, u) => '10^' + u.split('').map((c) => ustHarita[c]).join(''));
    const bicimHata = () => h.err('Sayı anlaşılamadı. Şu biçimlerden birini kullanın: 150000000 · 0,00042 · 1,5e8 · 1,5 × 10^8 · 10^-3');
    let mant = t, us = 0, m;
    if ((m = /^([-+]?)10\^\(?([-+]?\d+)\)?$/.exec(t))) { mant = m[1] + '1'; us = Number(m[2]); }
    else if ((m = /^([-+]?[\d.,]+)[x×*·]10\^\(?([-+]?\d+)\)?$/.exec(t))) { mant = m[1]; us = Number(m[2]); }
    else if ((m = /^([-+]?[\d.,]+)e([-+]?\d+)$/.exec(t))) { mant = m[1]; us = Number(m[2]); }
    if (Math.abs(us) > 100) h.err('Üs çok büyük; bu araç 10^-100 ile 10^100 arasındaki üsleri destekler.');
    let negatif = false;
    if (mant[0] === '-') { negatif = true; mant = mant.slice(1); } else if (mant[0] === '+') mant = mant.slice(1);
    // Ayraçları çöz: hem nokta hem virgül varsa sonuncusu ondalık; birden çok nokta binlik ayraçtır
    const virgul = (mant.match(/,/g) || []).length, nokta = (mant.match(/\./g) || []).length;
    if (virgul && nokta) mant = mant.lastIndexOf(',') > mant.lastIndexOf('.') ? mant.replace(/\./g, '').replace(',', '.') : mant.replace(/,/g, '');
    else if (virgul === 1) mant = mant.replace(',', '.');
    else if (virgul > 1) bicimHata();
    else if (nokta > 1) mant = mant.replace(/\./g, '');
    if (!/^(\d+\.?\d*|\.\d+)$/.test(mant)) bicimHata();
    const [tamKisim, kesirKisim = ''] = mant.split('.');
    let basamaklar = (tamKisim + kesirKisim).replace(/^0+/, '');
    let e10 = us - kesirKisim.length;
    if (basamaklar === '') {
      return { rows: [['Bilimsel gösterim', '0'], ['Normal (ondalık) yazım', '0']], note: 'Sıfırın bilimsel gösterimi yoktur; çünkü 1 ile 10 arasında bir katsayıyla yazılamaz. Sıfır yalnızca 0 olarak gösterilir.' };
    }
    const sondaSifir = basamaklar.length - basamaklar.replace(/0+$/, '').length;
    basamaklar = basamaklar.slice(0, basamaklar.length - sondaSifir);
    e10 += sondaSifir;
    if (basamaklar.length > 60) h.err('Sayı çok uzun; en fazla 60 anlamlı basamak yazın.');
    const E = basamaklar.length - 1 + e10;
    if (Math.abs(E) > 120) h.err('Sayı bu aracın sınırlarının dışında; 10^-120 ile 10^120 arasında bir değer yazın.');
    const isaret = negatif ? '-' : '';
    const katsayi = basamaklar[0] + (basamaklar.length > 1 ? ',' + basamaklar.slice(1) : '');
    // Mühendislik gösterimi: üs 3'ün katı, katsayı 1 ile 1000 arasında
    const e3 = Math.floor(E / 3) * 3, k = E - e3;
    const ds = basamaklar.padEnd(k + 1, '0');
    const katsayi3 = ds.slice(0, k + 1) + (ds.length > k + 1 ? ',' + ds.slice(k + 1) : '');
    // Normal yazım
    let tam, kesir = '';
    if (e10 >= 0) tam = basamaklar + '0'.repeat(e10);
    else {
      const yer = basamaklar.length + e10;
      if (yer > 0) { tam = basamaklar.slice(0, yer); kesir = basamaklar.slice(yer); }
      else { tam = '0'; kesir = '0'.repeat(-yer) + basamaklar; }
    }
    const normal = isaret + tam.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (kesir ? ',' + kesir : '');
    const rows = [
      ['Bilimsel gösterim', `${isaret}${katsayi} × 10^${E}`],
      ['Normal (ondalık) yazım', normal],
      ['Mühendislik gösterimi', `${isaret}${katsayi3} × 10^${e3}`],
      ['E gösterimi', `${isaret}${katsayi.replace(',', '.')}E${E}`],
    ];
    const onek = { 24: 'yotta (Y)', 21: 'zetta (Z)', 18: 'eksa (E)', 15: 'peta (P)', 12: 'tera (T)', 9: 'giga (G)', 6: 'mega (M)', 3: 'kilo (k)', '-3': 'mili (m)', '-6': 'mikro (µ)', '-9': 'nano (n)', '-12': 'piko (p)', '-15': 'femto (f)', '-18': 'atto (a)', '-21': 'zepto (z)', '-24': 'yokto (y)' };
    if (onek[e3]) rows.push(['SI önekiyle', `${isaret}${katsayi3} ${onek[e3]}`]);
    rows.push(['Büyüklük mertebesi', `10^${E}`]);
    const yon = E > 0 ? `Ondalık virgül ${E} basamak sola kaydırıldı; üs pozitif.` : E < 0 ? `Ondalık virgül ${-E} basamak sağa kaydırıldı; üs negatif.` : 'Sayı zaten 1 ile 10 arasında olduğu için üs 0.';
    return { rows, note: yon + ' Tek noktalı girdide (örn. 1.234) nokta ondalık ayırıcı sayılır.' };
  }
