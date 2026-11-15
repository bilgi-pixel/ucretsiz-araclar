export default {
  slug: 'dyne-newton-cevir',
  title: 'Dyne Newton Çevirici',
  h1Tail: 'dyn ↔ N',
  pageTitle: 'Dyne Newton Çevirici – Dyn\'i Newtona, Newtonu Dyn\'e Çevirme',
  description: 'Dyne (din) değerini newtona, newtonu dyne\'e çevirin. 1 N = 100.000 dyn eşitliğiyle çalışır; milinewton ve kilogram-kuvvet karşılığını da gösterir.',
  card: 'Dyne (din) değerini newtona, newtonu dyne\'e çevirin; milinewton ve kgf karşılığıyla birlikte.',
  category: 'birim',
  keywords: ['dyne newton çevirme', '1 newton kaç dyn', 'din newton çevirici', 'dyn to newton', 'cgs kuvvet birimi', 'dyne nedir', 'newton dyne dönüştürme'],
  lead: 'Kuvveti CGS sistemindeki dyne (din) biriminden newtona ya da newtondan dyne\'e çevirin. Araç <strong>1 N = 100.000 dyn</strong> (10<sup>5</sup> dyn) eşitliğini kullanır.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Kuvvet', type: 'number', placeholder: 'Örn. 250', hint: 'Binlik ayraç kullanmadan yazın (örn. 100000). Yön belirtmek için negatif değer girebilirsiniz.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['dyn', 'Dyne → Newton'], ['n', 'Newton → Dyne']] },
  ],
  compute(v, h) {
    const x = h.num(v.deger, 'Kuvvet');
    const n = v.yon === 'n' ? x : x / 100000;
    const dyn = v.yon === 'n' ? x * 100000 : x;
    const satirN = ['Newton', h.sig(n, 8) + ' N'];
    const satirDyn = ['Dyne', h.sig(dyn, 8) + ' dyn'];
    return {
      rows: [
        v.yon === 'n' ? satirDyn : satirN,
        v.yon === 'n' ? satirN : satirDyn,
        ['Milinewton', h.sig(n * 1000, 8) + ' mN'],
        ['Kilogram-kuvvet', h.sig(n / 9.80665, 6) + ' kgf'],
      ],
      note: '1 N = 10^5 dyn; 1 dyn = 10^-5 N = 10 µN (tam değer). 1 kgf = 9,80665 N alınmıştır.',
    };
  },
  cases: [
    { in: { deger: '100000', yon: 'dyn' }, out: { 'Newton': '1 N', 'Milinewton': '1.000 mN' } },
    { in: { deger: '1', yon: 'n' }, out: { 'Dyne': '100.000 dyn' } },
    { in: { deger: '250', yon: 'dyn' }, out: { 'Newton': '0,0025 N', 'Milinewton': '2,5 mN' } },
    { in: { deger: '9,80665', yon: 'n' }, out: { 'Dyne': '980.665 dyn', 'Kilogram-kuvvet': '1 kgf' } },
    { in: { deger: '1', yon: 'dyn' }, out: { 'Newton': '0,00001 N', 'Milinewton': '0,01 mN' } },
    { in: { deger: '0,5', yon: 'n' }, out: { 'Dyne': '50.000 dyn', 'Milinewton': '500 mN' } },
    { in: { deger: '72,8', yon: 'dyn' }, out: { 'Newton': '0,000728 N' } },
    { in: { deger: 'kuvvet', yon: 'dyn' }, error: true },
    { in: { deger: '', yon: 'n' }, error: true },
  ],
  howto: [
    '"Kuvvet" alanına çevirmek istediğiniz değeri yazın. Ondalık için virgül kullanın; büyük sayıları binlik ayraç koymadan yazın.',
    '"Çeviri yönü" listesinden dyne\'den newtona mı, newtondan dyne\'e mi geçeceğinizi seçin.',
    '"Çevir" düğmesine basın. İlk satırda aradığınız karşılık, ardından milinewton ve kilogram-kuvvet değerleri görünür.',
    'Sonucu ödevinize ya da laboratuvar raporunuza aktarmak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Dyne ve newton nedir?', p: [
      'Newton (N), Uluslararası Birim Sistemi\'nin kuvvet birimidir: bir kilogramlık kütleye saniyede bir metre bölü saniyelik hız artışı, yani 1 m/s² ivme kazandıran kuvvettir. Günümüzde fizik derslerinde, mühendislikte ve standartlarda kuvvet neredeyse her zaman newton ile yazılır.',
      'Dyne (Türkçede "din" olarak da yazılır, simgesi dyn) ise santimetre-gram-saniye temelli CGS sisteminin kuvvet birimidir: bir gramlık kütleye 1 cm/s² ivme kazandıran kuvvet. Adı, Yunanca "güç, kuvvet" anlamındaki <em>dynamis</em> sözcüğünden gelir. Dyne çok küçük bir kuvvettir; yaklaşık bir miligramlık bir cismin ağırlığı kadardır. CGS sistemi yirminci yüzyılın ortalarına kadar bilimde yaygın olarak kullanıldığı için eski ders kitaplarında, klasik makalelerde ve bazı uzmanlık alanlarında dyne ile hâlâ karşılaşılır.',
    ] },
    { h: 'Neden tam 100.000 kat?', p: [
      'Çarpan, iki sistemin temel birimleri arasındaki orandan doğrudan çıkar. Newton kilogram ve metre üzerine, dyne gram ve santimetre üzerine kuruludur. Bir kilogram 1.000 gram, bir metre 100 santimetredir; saniye ortaktır. Buna göre 1 N = 1 kg·m/s² = 1.000 g × 100 cm/s² = 100.000 g·cm/s² = 100.000 dyn olur.',
      'Formül olarak <strong>N = dyn ÷ 100.000</strong> ve <strong>dyn = N × 100.000</strong>. Bilimsel gösterimle 1 dyn = 10<sup>−5</sup> N ve 1 N = 10<sup>5</sup> dyn yazılır. Pratikte yapılan iş, ondalık virgülü beş basamak sola ya da sağa kaydırmaktır. Bir dyne aynı zamanda 10 mikronewtona (µN) eşittir; bu da SI önekleriyle çalışırken kullanışlı bir ara değerdir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Eski bir ders kitabındaki problemde 250 dyn\'lik bir kuvvet veriliyor. Newton karşılığı 250 ÷ 100.000 = 0,0025 N, yani 2,5 milinewtondur.',
      '<strong>Örnek 2:</strong> Bir kilogram-kuvvet 9,80665 N\'dir. Dyne olarak 9,80665 × 100.000 = 980.665 dyn eder. Bu sayı tanıdık gelebilir: standart yer çekimi ivmesinin CGS birimindeki değeri 980,665 cm/s²\'dir ve bir gramlık kütlenin ağırlığı 980,665 dyn\'dir.',
      '<strong>Örnek 3:</strong> Oda sıcaklığındaki suyun yüzey gerilimi tablolarda yaklaşık 72,8 dyn/cm olarak verilir. 72,8 dyn = 0,000728 N\'dir; 1 dyn/cm ise 1 mN/m\'ye eşit olduğundan aynı değer SI birimleriyle 72,8 mN/m, yani 0,0728 N/m olarak yazılır.',
    ] },
    { h: 'Dyne bugün nerede kullanılıyor?', p: [
      'En sık karşılaşılan yer yüzey gerilimi ve ıslanabilirlik ölçümleridir. Ambalaj ve baskı sektöründe plastik filmlerin yüzey enerjisi "dyne seviyesi" olarak anılır ve dyn/cm biriminde ölçülür; mürekkep ya da yapıştırıcının yüzeye tutunup tutunmayacağını öngörmek için kullanılır. Kimya ve malzeme laboratuvarlarında tensiyometre sonuçları da çoğu zaman bu birimle raporlanır.',
      'Tıpta damar direnci hesaplarında dyn·s/cm<sup>5</sup> birimi hâlâ kullanılır. Astrofizik ve plazma fiziği yayınlarının bir bölümü geleneksel olarak CGS birimleriyle yazılır; bu alanlarda basınç dyn/cm² ile verilir (1 dyn/cm² = 0,1 pascal). Eski fizik ders kitaplarıyla çalışan öğrenciler ve tarihî makaleleri okuyan araştırmacılar için de dyne-newton çevirisi sık gereken bir işlemdir. Bu sayfa yalnızca birim çevirir; tıbbi ya da mühendislik yorumu için ilgili uzmana danışılmalıdır.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 dyn</strong> = 0,00001 N = 10 µN',
      '<strong>100 dyn</strong> = 0,001 N = 1 mN',
      '<strong>1.000 dyn</strong> = 0,01 N',
      '<strong>10.000 dyn</strong> = 0,1 N',
      '<strong>100.000 dyn</strong> = 1 N',
      '<strong>980.665 dyn</strong> = 9,80665 N = 1 kgf',
      '<strong>1.000.000 dyn</strong> = 10 N',
    ] },
    { h: 'Türetilmiş birimlerde dikkat', p: [
      'Dyne tek başına çevrilirken çarpan 100.000\'dir, ancak dyne içeren bileşik birimlerde uzunluk ve alan birimleri de değiştiği için çarpan farklılaşır. Yüzey geriliminde 1 dyn/cm = 0,001 N/m\'dir, çünkü paydadaki santimetre de metreye çevrilir. Basınçta 1 dyn/cm² = 0,1 Pa, enerjide ise 1 dyn·cm = 1 erg = 10<sup>−7</sup> joule\'dür. Bu yüzden bileşik bir birimi çevirirken yalnızca kuvvet kısmını değil, tüm birimi birlikte ele almak gerekir.',
      'Sık yapılan bir başka hata, dyne ile gram-kuvveti aynı sanmaktır. Bir gram-kuvvet 980,665 dyn\'dir; aradaki fark neredeyse bin kattır. Ayrıca çarpanı 10.000 ya da 1.000.000 olarak hatırlamak da yaygın bir yanlıştır; kilogramdan grama geçişin üç, metreden santimetreye geçişin iki basamak getirdiğini düşünmek doğru üssü (beş) hatırlamayı kolaylaştırır.',
    ] },
    { h: 'Gösterim ve sınırlar', p: [
      'Sonuçlar sekiz anlamlı basamağa kadar gösterilir. Çok küçük kuvvetlerde, örneğin 0,05 dyn gibi değerlerde, newton karşılığı milyonda birin altına indiği için araç bilimsel gösterime geçer ve sonucu "5 × 10^-7 N" biçiminde yazar. Kuvvet yönlü bir büyüklük olduğundan negatif değerler kabul edilir ve işaret korunur. Kilogram-kuvvet satırı, standart yer çekimi ivmesi olan 9,80665 m/s² üzerinden hesaplanır.',
    ] },
  ],
  faq: [
    ['1 newton kaç dyne eder?', '1 newton tam olarak 100.000 dyne eder; bilimsel gösterimle 10 üzeri 5 dyn. Bu değer, kilogramın 1.000 gram ve metrenin 100 santimetre olmasından gelir.'],
    ['1 dyne kaç newtondur?', '1 dyne 0,00001 newtondur, yani 10 üzeri eksi 5 N. Bu aynı zamanda 10 mikronewton demektir.'],
    ['Dyne ile din aynı birim mi?', 'Evet. "Dyne" birimin uluslararası yazımı, "din" ise Türkçe kaynaklarda kullanılan okunuşa dayalı yazımıdır. Simgesi her iki durumda da dyn\'dir.'],
    ['Dyne hangi birim sistemine aittir?', 'Santimetre, gram ve saniyeyi temel alan CGS sistemine aittir. Bu sistemde enerji birimi erg, basınç birimi ise dyn/cm² (barye) olarak geçer.'],
    ['dyn/cm değerini N/m\'ye nasıl çeviririm?', 'Değeri 1.000\'e bölün: 1 dyn/cm = 0,001 N/m = 1 mN/m. Bu nedenle yüzey gerilimi değerleri dyn/cm ve mN/m birimlerinde aynı sayıyla yazılır; 72,8 dyn/cm, 72,8 mN/m\'dir.'],
    ['1 dyne kaç gram-kuvvettir?', 'Yaklaşık 0,00102 gram-kuvvettir; yani bir dyne kabaca bir miligramlık kütlenin ağırlığı kadardır. Tersinden, 1 gram-kuvvet 980,665 dyne eder.'],
    ['Dyne neden hâlâ kullanılıyor?', 'Çoğunlukla alışkanlık ve yerleşik ölçüm gelenekleri yüzünden. Yüzey gerilimi, bazı tıbbi hesaplar ve astrofizik gibi alanlarda yayınlar ve cihazlar uzun süredir CGS birimleriyle çalışır; değerlerin SI karşılıkları bu tür çevirilerle bulunur.'],
    ['Girdiğim değer kaydediliyor mu?', 'Hayır. Çeviri tümüyle tarayıcınızda yapılır; yazdığınız sayı sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['newton-kgf-cevir', 'kuvvet-hesapla', 'kutle-agirlik-hesapla', 'nm-lbft-cevir', 'pascal-bar-cevir', 'g-kuvveti-ms2-cevir'],
};
