export default {
  slug: 'bilimsel-gosterim-cevir',
  title: 'Bilimsel Gösterim Çevirici',
  h1Tail: 'a × 10ⁿ',
  pageTitle: 'Bilimsel Gösterim Çevirici – Sayıyı a × 10ⁿ Biçimine Çevirme',
  description: 'Çok büyük ya da çok küçük sayıları bilimsel gösterime çevirin veya bilimsel gösterimi normal sayıya açın. Mühendislik gösterimi, E yazımı ve SI öneki de verilir.',
  card: 'Sayıları bilimsel gösterime çevirin ya da a × 10ⁿ biçimini normal sayıya açın; mühendislik gösterimi ve SI önekiyle.',
  category: 'matematik',
  keywords: ['bilimsel gösterim', 'bilimsel gösterim çevirme', 'bilimsel gösterim hesaplama', '10 üzeri gösterim', 'mühendislik gösterimi', 'e gösterimi', 'bilimsel gösterim nedir', 'standart forma çevirme', 'çok büyük sayıların gösterimi'],
  lead: 'Sıradan bir sayıyı <strong>a × 10ⁿ</strong> biçimindeki bilimsel gösterime çevirin ya da bilimsel gösterimle yazılmış bir sayıyı bütün basamaklarıyla açın. Araç girdinin hangi biçimde olduğunu kendisi anlar ve dört gösterimi birlikte verir.',
  button: 'Çevir',
  inputs: [
    { id: 'sayi', label: 'Sayı ya da bilimsel gösterim', type: 'text', placeholder: 'Örn. 150000000 ya da 1,5 × 10^8 ya da 1,5e8', hint: 'Üs için ^ işareti ya da e harfi kullanın: 4,2x10^-4 · 4,2e-4', wide: true },
  ],
  compute(v, h) {
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
  },
  cases: [
    { in: { sayi: '150000000' }, out: { 'Bilimsel gösterim': '1,5 × 10^8', 'Normal (ondalık) yazım': '150.000.000', 'Mühendislik gösterimi': '150 × 10^6', 'E gösterimi': '1.5E8', 'SI önekiyle': '150 mega (M)', 'Büyüklük mertebesi': '10^8' } },
    { in: { sayi: '0,00042' }, out: { 'Bilimsel gösterim': '4,2 × 10^-4', 'Normal (ondalık) yazım': '0,00042', 'Mühendislik gösterimi': '420 × 10^-6', 'E gösterimi': '4.2E-4', 'SI önekiyle': '420 mikro (µ)' } },
    { in: { sayi: '3,2e5' }, out: { 'Bilimsel gösterim': '3,2 × 10^5', 'Normal (ondalık) yazım': '320.000', 'Mühendislik gösterimi': '320 × 10^3' } },
    { in: { sayi: '6,022 × 10^23' }, out: { 'Bilimsel gösterim': '6,022 × 10^23', 'Normal (ondalık) yazım': '602.200.000.000.000.000.000.000', 'Mühendislik gösterimi': '602,2 × 10^21' } },
    { in: { sayi: '1,6x10^-19' }, out: { 'Normal (ondalık) yazım': '0,00000000000000000016', 'Mühendislik gösterimi': '160 × 10^-21', 'SI önekiyle': '160 zepto (z)' } },
    { in: { sayi: '-0,05' }, out: { 'Bilimsel gösterim': '-5 × 10^-2', 'Mühendislik gösterimi': '-50 × 10^-3', 'E gösterimi': '-5E-2' } },
    { in: { sayi: '299792458' }, out: { 'Bilimsel gösterim': '2,99792458 × 10^8', 'Mühendislik gösterimi': '299,792458 × 10^6' } },
    { in: { sayi: '10^6' }, out: { 'Bilimsel gösterim': '1 × 10^6', 'Normal (ondalık) yazım': '1.000.000', 'SI önekiyle': '1 mega (M)' } },
    { in: { sayi: '1.234.567,89' }, out: { 'Bilimsel gösterim': '1,23456789 × 10^6', 'Normal (ondalık) yazım': '1.234.567,89' } },
    { in: { sayi: '7' }, out: { 'Bilimsel gösterim': '7 × 10^0', 'Mühendislik gösterimi': '7 × 10^0', 'Normal (ondalık) yazım': '7' } },
    { in: { sayi: '45 × 10³' }, out: { 'Bilimsel gösterim': '4,5 × 10^4', 'Normal (ondalık) yazım': '45.000', 'Mühendislik gösterimi': '45 × 10^3', 'SI önekiyle': '45 kilo (k)' } },
    { in: { sayi: '0' }, out: { 'Bilimsel gösterim': '0' } },
    { in: { sayi: 'abc' }, error: true },
    { in: { sayi: '' }, error: true },
    { in: { sayi: '1e500' }, error: true },
    { in: { sayi: '1,2,3' }, error: true },
  ],
  howto: [
    'Kutuya çevirmek istediğiniz sayıyı yazın. Normal bir sayı (150000000 ya da 0,00042) yazabileceğiniz gibi bilimsel gösterim de yazabilirsiniz.',
    'Bilimsel gösterim için şu yazımlardan biri yeterlidir: <code>1,5 × 10^8</code>, <code>1,5x10^8</code>, <code>1,5e8</code> ya da yalnızca <code>10^8</code>. Negatif üsler için eksi işareti kullanın: <code>4,2e-4</code>.',
    '"Çevir" düğmesine basın. İlk satır bilimsel gösterimi, ikinci satır sayının bütün basamaklarıyla açık yazımını verir.',
    'Elektronik ya da ölçü birimleriyle çalışıyorsanız "Mühendislik gösterimi" ve "SI önekiyle" satırlarına; hesap makinesi ya da kod için "E gösterimi" satırına bakın.',
  ],
  sections: [
    { h: 'Bilimsel gösterim nedir?', p: [
      'Bilimsel gösterim, bir sayıyı 1 ile 10 arasında bir katsayı ile 10\'un bir tam sayı kuvvetinin çarpımı olarak yazmaktır: <strong>a × 10ⁿ</strong>. Burada katsayı için <strong>1 ≤ |a| < 10</strong> koşulu aranır, yani virgülün solunda sıfırdan farklı tek bir rakam bulunur. n ise pozitif, negatif ya da sıfır olabilen bir tam sayıdır.',
      'Bu yazım, çok büyük ve çok küçük sayıları sıfır saymadan okumayı ve karşılaştırmayı sağlar. Işığın boşluktaki hızı saniyede 299.792.458 metredir; bilimsel gösterimle 2,99792458 × 10^8 m/s yazılır. Bir protonun yükü olan yaklaşık 0,00000000000000000016 coulomb ise 1,6 × 10^-19 biçiminde çok daha okunaklıdır. Türkiye\'deki ortaokul ve lise müfredatında konu, üslü ifadelerle birlikte işlenir.',
    ] },
    { h: 'Sayı bilimsel gösterime nasıl çevrilir?', ol: [
      'Ondalık virgülü, solunda sıfırdan farklı tek bir rakam kalacak yere taşıyın. Elde ettiğiniz sayı katsayıdır.',
      'Virgülü kaç basamak kaydırdığınızı sayın. Bu sayı 10\'un üssünün mutlak değeridir.',
      'Virgülü <strong>sola</strong> kaydırdıysanız (sayı 10 ya da daha büyükse) üs pozitif, <strong>sağa</strong> kaydırdıysanız (sayı 1\'den küçükse) üs negatiftir.',
      'Katsayının sonundaki gereksiz sıfırları atın ve sonucu a × 10ⁿ biçiminde yazın.',
    ], p: [
      '<strong>Çözümlü örnek 1:</strong> 150.000.000 sayısında virgül en sondadır. 1 ile 5 arasına gelmesi için 8 basamak sola taşınır: 1,5. Sonuç 1,5 × 10^8 olur. Araca 150000000 yazdığınızda aynı sonucu ve "virgül 8 basamak sola kaydırıldı" notunu görürsünüz.',
      '<strong>Çözümlü örnek 2:</strong> 0,00042 sayısında virgül 4\'ün sağına gelene kadar 4 basamak sağa taşınır: 4,2. Sayı 1\'den küçük olduğundan üs negatiftir: 4,2 × 10^-4.',
      '<strong>Çözümlü örnek 3 – tersine çevirme:</strong> 3,2 × 10^5 ifadesini açmak için virgül 5 basamak sağa taşınır; boş kalan yerlere sıfır yazılır: 320.000. 1,6 × 10^-19 için virgül 19 basamak sola taşınır ve 0,00000000000000000016 elde edilir.',
    ] },
    { h: 'Mühendislik gösterimi ve SI önekleri', p: [
      'Mühendislik gösteriminde üs her zaman 3\'ün katıdır ve katsayı 1 ile 1000 arasında kalır. Bunun nedeni, ölçü birimlerindeki öneklerin biner biner ilerlemesidir: kilo 10^3, mega 10^6, giga 10^9; küçük tarafta mili 10^-3, mikro 10^-6, nano 10^-9. Böylece sayı doğrudan bir önekle okunabilir.',
      '150.000.000 sayısı bilimsel gösterimde 1,5 × 10^8 iken mühendislik gösteriminde 150 × 10^6\'dır ve "150 mega" diye okunur; 150.000.000 hertz, 150 megahertz demektir. 0,00042 ise 420 × 10^-6, yani 420 mikrodur; 0,00042 amper 420 mikroamper eder. Araç uygun önek varsa bunu ayrı satırda gösterir.',
    ], ul: [
      '<strong>10^12</strong> tera (T) · <strong>10^9</strong> giga (G) · <strong>10^6</strong> mega (M) · <strong>10^3</strong> kilo (k)',
      '<strong>10^-3</strong> mili (m) · <strong>10^-6</strong> mikro (µ) · <strong>10^-9</strong> nano (n) · <strong>10^-12</strong> piko (p)',
    ] },
    { h: 'E gösterimi: hesap makinesi ve bilgisayar yazımı', p: [
      'Hesap makineleri, elektronik tablolar ve programlama dilleri üst simge yazamadığı için "× 10 üzeri" yerine E harfini kullanır. <strong>1.5E8</strong> yazımı 1,5 × 10^8 anlamına gelir; <strong>4.2E-4</strong> ise 4,2 × 10^-4\'tür. Buradaki E harfi matematikteki e sabiti (2,718…) ile ilgili değildir, yalnızca "üs" anlamındaki kısaltmadır.',
      'Elektronik tabloda bir hücrede 1,23E+11 gibi bir değer görüyorsanız sayı bozulmamıştır; yalnızca hücre dar olduğu ya da biçim bilimsel seçildiği için böyle gösterilmektedir. Değeri buraya yazarak açık hâlini görebilirsiniz. Araç E gösterimini kod ve çoğu yazılımla uyumlu olsun diye ondalık noktayla üretir.',
    ] },
    { h: 'Bilimsel gösterimle dört işlem', ul: [
      '<strong>Çarpma:</strong> katsayılar çarpılır, üsler toplanır. (2 × 10^3) × (3 × 10^4) = 6 × 10^7.',
      '<strong>Bölme:</strong> katsayılar bölünür, üsler çıkarılır. (8 × 10^6) ÷ (2 × 10^2) = 4 × 10^4.',
      '<strong>Toplama ve çıkarma:</strong> önce üsler eşitlenir, sonra katsayılar toplanır. 3 × 10^4 + 5 × 10^3 = 3 × 10^4 + 0,5 × 10^4 = 3,5 × 10^4.',
      '<strong>Düzeltme:</strong> işlem sonunda katsayı 10\'u aşarsa ya da 1\'in altına düşerse virgül kaydırılıp üs ayarlanır. 45 × 10^3 doğru bilimsel gösterim değildir; 4,5 × 10^4 olarak düzeltilir.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      '<strong>Katsayıyı 1 ile 10 arasında bırakmamak.</strong> 15 × 10^7 ya da 0,15 × 10^9 aynı sayıyı gösterir ama bilimsel gösterim sayılmaz.',
      '<strong>Üssün işaretini karıştırmak.</strong> 1\'den küçük sayıların üssü negatiftir; negatif üs sayının negatif olduğu anlamına gelmez. 4,2 × 10^-4 pozitif bir sayıdır.',
      '<strong>Sayının işareti ile üssün işaretini birbirine katmak.</strong> −5 × 10^-2 ifadesinde ilk eksi sayıyı negatif yapar (−0,05), ikincisi büyüklüğünü belirler.',
      '<strong>Sıfırları yanlış saymak.</strong> 10^8, birin yanında sekiz sıfır demektir; ancak 1,5 × 10^8 sayısında yedi sıfır vardır, çünkü 5 de bir basamak tutar.',
      '<strong>Nokta ve virgülü karıştırmak.</strong> Türkçe yazımda ondalık ayırıcı virgüldür. Bu araçta tek nokta içeren girdi (1.234) ondalıklı sayı olarak okunur; binlik ayraçlı yazıyorsanız ondalık kısmı virgülle belirtin ya da ayraç kullanmayın.',
    ] },
    { h: 'Sınırlar', p: [
      'Çeviri kayan noktalı sayı yerine basamak basamak yapıldığı için sonuçta yuvarlama olmaz: yazdığınız bütün anlamlı basamaklar korunur. Sondaki anlamsız sıfırlar atılır; ölçüm duyarlılığını göstermek için sıfırları koruması gereken raporlarda katsayıyı elle düzenlemeniz gerekir. Araç 60 anlamlı basamağa ve 10^-100 ile 10^100 arasındaki üslere kadar çalışır.',
    ] },
  ],
  faq: [
    ['Bilimsel gösterimde katsayı hangi aralıkta olmalıdır?', 'Katsayının mutlak değeri 1\'e eşit ya da 1\'den büyük, 10\'dan küçük olmalıdır. Yani virgülün solunda sıfırdan farklı tek bir rakam bulunur: 4,2 × 10^-4 doğrudur, 42 × 10^-5 değildir.'],
    ['Üs ne zaman negatif olur?', 'Sayının mutlak değeri 1\'den küçükse üs negatiftir. 0,003 = 3 × 10^-3 gibi. Negatif üs sayının küçük olduğunu gösterir, negatif olduğunu değil.'],
    ['1,5E8 ne demektir?', '1,5 × 10^8, yani 150.000.000 demektir. E harfi hesap makinelerinde ve yazılımlarda "çarpı 10 üzeri" anlamında kullanılır.'],
    ['Mühendislik gösterimi ile bilimsel gösterim arasındaki fark nedir?', 'Bilimsel gösterimde katsayı 1 ile 10 arasındadır ve üs herhangi bir tam sayı olabilir. Mühendislik gösteriminde üs yalnızca 3\'ün katıdır, katsayı ise 1 ile 1000 arasında kalır; böylece kilo, mega, mili, mikro gibi öneklerle doğrudan eşleşir.'],
    ['Sıfır bilimsel gösterimle yazılır mı?', 'Hayır. Sıfır, 1 ile 10 arasında bir katsayı ile yazılamadığı için bilimsel gösterimi yoktur; yalnızca 0 olarak yazılır.'],
    ['1 ile 10 arasındaki bir sayının bilimsel gösterimi nasıldır?', 'Üs 0 olur. Örneğin 7 = 7 × 10^0, çünkü 10^0 = 1\'dir. Pratikte bu sayılar olduğu gibi yazılır.'],
    ['Negatif sayılar bilimsel gösterime çevrilir mi?', 'Evet. Eksi işareti katsayının önünde kalır: −0,05 = −5 × 10^-2. Üssün işareti bundan bağımsızdır ve sayının büyüklüğüne göre belirlenir.'],
    ['Yazdığım sayılar bir yere gönderiliyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; yazdığınız değer sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['us-logaritma-hesapla', 'yuvarlama-hesapla', 'birim-donustur', 'sayi-tabani-donustur', 'hesap-makinesi'],
};
