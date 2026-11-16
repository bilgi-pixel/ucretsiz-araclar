export default {
  slug: 'cati-alani-hesapla',
  title: 'Çatı Alanı ve Eğimi Hesaplama',
  h1Tail: 'beşik, kırma ve tek eğimli çatı',
  pageTitle: 'Çatı Alanı ve Eğimi Hesaplama – m², Eğim Yüzdesi ve Mertek Boyu',
  description: 'Bina ölçüleri ve çatı eğiminden gerçek çatı alanını, eğim açısını, mertek uzunluğunu ve mahya yüksekliğini hesaplayın. Beşik, kırma ve tek eğimli çatılar.',
  card: 'Bina eni, boyu ve eğimden çatının gerçek yüzey alanını, eğim açısını, mertek boyunu ve mahya yüksekliğini bulun.',
  category: 'insaat',
  keywords: ['çatı alanı hesaplama', 'çatı eğimi hesaplama', 'çatı metrekare hesabı', 'mertek uzunluğu hesaplama', 'mahya yüksekliği', 'çatı eğim yüzdesi', 'beşik çatı alanı'],
  lead: 'Binanın enini ve boyunu, çatının eğimini yazın; araç <strong>eğimli çatı yüzeyinin gerçek alanını</strong>, eğimin yüzde ve derece karşılığını, mertek uzunluğunu ve mahya yüksekliğini hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'Bina eni (m)', type: 'number', placeholder: 'Örn. 8', hint: 'Eğimin indiği yöndeki genişlik (mahyaya dik kenar).' },
    { id: 'boy', label: 'Bina boyu (m)', type: 'number', placeholder: 'Örn. 10', hint: 'Mahya doğrultusundaki uzunluk.' },
    { id: 'tip', label: 'Çatı tipi', type: 'select', options: [['besik', 'Beşik çatı (iki eğimli)'], ['kirma', 'Kırma çatı (dört eğimli)'], ['tek', 'Tek eğimli çatı (sundurma)']] },
    { id: 'egimTur', label: 'Eğim birimi', type: 'select', options: [['yuzde', 'Yüzde (%)'], ['derece', 'Derece (°)']] },
    { id: 'egim', label: 'Eğim değeri', type: 'number', placeholder: 'Örn. 33' },
    { id: 'sacak', label: 'Saçak çıkıntısı (cm)', type: 'number', value: '0', hint: 'Duvardan dışarı taşan yatay mesafe; her kenara eklenir.' },
  ],
  compute(v, h) {
    const en = h.pos(v.en, 'Bina eni');
    const boy = h.pos(v.boy, 'Bina boyu');
    const e = h.pos(v.egim, 'Eğim değeri');
    const s = h.nonneg(v.sacak, 'Saçak çıkıntısı') / 100;
    let t;
    if (v.egimTur === 'derece') {
      if (e >= 80) h.err('Eğim açısı 80 dereceden küçük olmalı. Yüzde değeri yazdıysanız eğim birimini "Yüzde" seçin.');
      t = Math.tan(e * Math.PI / 180);
    } else {
      if (e > 500) h.err('Eğim yüzdesi en fazla 500 olabilir.');
      t = e / 100;
    }
    const carpan = Math.sqrt(1 + t * t);
    const E = en + 2 * s;
    const B = boy + 2 * s;
    const plan = E * B;
    const alan = plan * carpan;
    const kosu = v.tip === 'tek' ? E : v.tip === 'kirma' ? Math.min(E, B) / 2 : E / 2;
    const mertek = kosu * carpan;
    const yuk = kosu * t;
    return {
      rows: [
        ['Çatı alanı', h.fmt(alan, 2) + ' m²'],
        ['Plan (izdüşüm) alanı', h.fmt(plan, 2) + ' m²'],
        ['Eğim', '% ' + h.fmt(t * 100, 2)],
        ['Eğim açısı', h.fmt(Math.atan(t) * 180 / Math.PI, 2) + '°'],
        ['Mertek uzunluğu', h.fmt(mertek, 2) + ' m'],
        ['Mahya yüksekliği', h.fmt(yuk, 2) + ' m'],
        ['Alan çarpanı', h.fmt(carpan, 4)],
      ],
      note: 'Mahya yüksekliği saçak ucu hizasından ölçülür. Kırma çatıda dört yüzeyin de aynı eğimde olduğu varsayılır. Bindirme ve fire payı dahil değildir. Sonuç eğik yüzey alanıdır; yağmur suyu toplama hesabında izdüşüm (plan) alanı kullanılır.',
    };
  },
  cases: [
    { in: { en: '8', boy: '10', tip: 'besik', egimTur: 'yuzde', egim: '75', sacak: '0' }, out: { 'Çatı alanı': '100 m²', 'Plan (izdüşüm) alanı': '80 m²', 'Eğim': '% 75', 'Eğim açısı': '36,87°', 'Mertek uzunluğu': '5 m', 'Mahya yüksekliği': '3 m', 'Alan çarpanı': '1,25' } },
    { in: { en: '10', boy: '12', tip: 'besik', egimTur: 'derece', egim: '45', sacak: '0' }, out: { 'Çatı alanı': '169,71 m²', 'Eğim': '% 100', 'Eğim açısı': '45°', 'Mertek uzunluğu': '7,07 m', 'Mahya yüksekliği': '5 m' } },
    { in: { en: '3', boy: '4', tip: 'tek', egimTur: 'yuzde', egim: '75', sacak: '0' }, out: { 'Çatı alanı': '15 m²', 'Mertek uzunluğu': '3,75 m', 'Mahya yüksekliği': '2,25 m' } },
    { in: { en: '8', boy: '10', tip: 'besik', egimTur: 'yuzde', egim: '75', sacak: '50' }, out: { 'Çatı alanı': '123,75 m²', 'Plan (izdüşüm) alanı': '99 m²' } },
    { in: { en: '8', boy: '10', tip: 'kirma', egimTur: 'yuzde', egim: '75', sacak: '0' }, out: { 'Çatı alanı': '100 m²', 'Mertek uzunluğu': '5 m', 'Mahya yüksekliği': '3 m' } },
    { in: { en: '6', boy: '8', tip: 'besik', egimTur: 'derece', egim: '30', sacak: '0' }, out: { 'Çatı alanı': '55,43 m²', 'Eğim': '% 57,74', 'Mertek uzunluğu': '3,46 m', 'Mahya yüksekliği': '1,73 m', 'Alan çarpanı': '1,1547' } },
    { in: { en: '8', boy: '10', egimTur: 'derece', egim: '90' }, error: true },
    { in: { en: '', boy: '10', egim: '33' }, error: true },
    { in: { en: '8', boy: '10', egim: '0' }, error: true },
  ],
  howto: [
    'Binanın enini ve boyunu metre olarak yazın. En, eğimin aşağı indiği yöndeki genişliktir; boy, mahya boyunca uzanan kenardır.',
    'Çatı tipini seçin: iki yana eğimli beşik çatı, dört yana eğimli kırma çatı ya da tek yöne eğimli sundurma çatı.',
    'Eğimi yüzde ya da derece olarak girin ve uygun birimi seçin.',
    'Çatı duvardan dışarı taşıyorsa saçak çıkıntısını santimetre olarak ekleyin.',
    '"Hesapla" düğmesine basın; çatı alanı, eğim karşılıkları, mertek uzunluğu ve mahya yüksekliği görüntülenir.',
  ],
  sections: [
    { h: 'Çatı alanı neden taban alanından büyüktür?', p: [
      'Bir binaya yukarıdan baktığınızda gördüğünüz alan çatının <strong>plan</strong> ya da izdüşüm alanıdır. Çatı yüzeyi ise eğimlidir; aynı yatay mesafeyi kat etmek için eğik düzlemde daha uzun bir yol gerekir. Kiremit, sac, membran ya da yalıtım malzemesi bu eğik yüzeye döşendiği için sipariş verirken plan alanı değil, gerçek yüzey alanı kullanılmalıdır.',
      'İki alan arasındaki ilişki basittir: <strong>çatı alanı = plan alanı × alan çarpanı</strong>. Alan çarpanı, eğim açısının kosinüsünün tersidir ve eğim arttıkça büyür. Eğim yüzde olarak biliniyorsa çarpan <strong>√(1 + (eğim ÷ 100)²)</strong> formülüyle bulunur. Bütün yüzeyleri aynı eğimde olan beşik ve kırma çatılarda sonuç aynıdır; çatının kaç parçaya bölündüğü toplam alanı değiştirmez.',
    ] },
    { h: 'Eğim yüzdesi ve derece arasındaki fark', p: [
      'Eğim yüzdesi, yatayda 100 birim gidildiğinde düşeyde kaç birim yükselindiğini anlatır. Yüzde 50 eğim, bir metre yatay mesafede yarım metre yükselme demektir. Derece ise çatı yüzeyinin yatayla yaptığı açıdır. İkisi aynı şey değildir: <strong>yüzde = tan(açı) × 100</strong>. Yüzde 100 eğim 45 dereceye karşılık gelir, 90 dereceye değil.',
    ], ul: [
      '% 10 ≈ 5,71°',
      '% 20 ≈ 11,31°',
      '% 33 ≈ 18,26°',
      '% 40 ≈ 21,80°',
      '% 50 ≈ 26,57°',
      '% 75 ≈ 36,87°',
      '% 100 = 45°',
    ] },
    { h: 'Çözümlü örnek: 8 × 10 metrelik beşik çatı', p: [
      'Eni 8 m, boyu 10 m olan bir binaya yüzde 75 eğimli beşik çatı yapılacak olsun. Mahya binanın ortasından geçer; her iki yanda yatay mesafe 8 ÷ 2 = 4 m\'dir. Yükselme 4 × 0,75 = <strong>3 m</strong> olur. Mertek, yani saçaktan mahyaya uzanan eğik kenar, dik üçgenin hipotenüsüdür: √(4² + 3²) = <strong>5 m</strong>.',
      'Her bir çatı yüzeyi 5 m × 10 m = 50 m², iki yüzey birlikte <strong>100 m²</strong> eder. Plan alanı 80 m² olduğundan alan çarpanı 1,25\'tir. Aynı binaya her kenarda 50 cm saçak eklerseniz plan 9 m × 11 m = 99 m² olur ve çatı alanı 123,75 m²\'ye çıkar. Saçak küçük görünse de alanı neredeyse dörtte bir artırdığına dikkat edin.',
    ] },
    { h: 'Çatı tipleri arasındaki fark', p: [
      '<strong>Beşik çatıda</strong> mahya binanın boyu doğrultusunda uzanır ve iki eğimli yüzey vardır; kısa kenarlarda üçgen kalkan duvarlar kalır. Mertek uzunluğu yarım genişlik üzerinden hesaplanır.',
      '<strong>Kırma çatıda</strong> dört kenar da saçakla biter ve dört eğimli yüzey bulunur. Bütün yüzeyler aynı eğimdeyse toplam alan yine plan alanının çarpanla çarpımıdır. Mahya yüksekliği kısa kenarın yarısı üzerinden bulunur. Köşelerden mahyaya uzanan eğik mertekler daha uzundur ve ayrıca hesaplanmalıdır.',
      '<strong>Tek eğimli çatıda</strong> yüzey bir kenardan diğerine tek parça yükselir. Yatay mesafe binanın tüm enidir; bu yüzden aynı eğimde yükseklik beşik çatının iki katına çıkar. Garaj, sundurma ve eklentilerde sık kullanılır.',
    ] },
    { h: 'Sonuçları kullanırken', ul: [
      'Kaplama malzemesi siparişinde çatı alanına bindirme ve kesim için fire payı ekleyin; pay malzemeye ve çatı biçimine göre değişir.',
      'Baca, çatı penceresi ve dere gibi ayrıntılar alanı az değiştirir ama işçiliği ve fireyi artırır.',
      'Eğimi yerinde ölçmek için bir su terazisi ve metre yeterlidir: teraziyi yatay tutup 100 cm ilerideki düşey mesafeyi ölçerseniz doğrudan yüzde eğimi bulursunuz.',
      'Farklı eğimli yüzeylerden oluşan çatılarda her yüzeyi ayrı hesaplayıp toplayın.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç geometrik bir hesap yapar; taşıyıcı sistemi, kar ve rüzgâr yüklerini, mertek kesitini ya da aşık aralığını belirlemez. Hangi kaplama için hangi eğimin uygun olduğu malzeme üreticisinin teknik bilgilerine ve bölgenin iklim koşullarına bağlıdır. Çatı konstrüksiyonu tasarımı ve uygulaması için bir inşaat mühendisine ya da mimara danışın. Mertek uzunluğu eksen ölçüsüdür; birleşim kesimleri ve saçak ucu payı için uygulamada ek boy bırakılır.',
    ] },
  ],
  faq: [
    ['100 m² evin çatısı kaç metrekaredir?', 'Eğime bağlıdır. Yüzde 33 eğimde çarpan yaklaşık 1,053 olduğundan saçaksız çatı alanı 105,3 m² eder. Yüzde 75 eğimde çarpan 1,25\'tir ve alan 125 m²\'ye çıkar. Saçak çıkıntıları bu değeri ayrıca artırır.'],
    ['Yüzde 33 eğim kaç derecedir?', 'Yaklaşık 18,26 derecedir. Hesap için eğim yüzdesini 100\'e bölüp ters tanjantını alırsınız. Araç her iki birimi de sonuçta gösterir.'],
    ['Mertek uzunluğu nasıl hesaplanır?', 'Yatay mesafe ile yükselmenin oluşturduğu dik üçgenin hipotenüsüdür. Beşik çatıda yatay mesafe bina eninin yarısıdır; 4 m yatay ve 3 m yükselme için mertek 5 m çıkar.'],
    ['Kırma çatının alanı beşik çatıdan farklı mı?', 'Bütün yüzeyler aynı eğimdeyse hayır; ikisinde de alan, plan alanının alan çarpanıyla çarpımıdır. Fark, kırma çatıda kalkan duvarı bulunmaması ve köşe merteklerinin gerekmesidir.'],
    ['Saçak çıkıntısını nasıl girmeliyim?', 'Duvar yüzeyinden çatı ucuna kadar olan yatay mesafeyi santimetre olarak yazın. Araç bu değeri binanın dört kenarına ekler; yalnızca iki kenarda saçak varsa bina ölçülerini kendiniz artırıp saçağı sıfır bırakabilirsiniz.'],
    ['Mahya yüksekliği nereden ölçülüyor?', 'Saçak ucunun bulunduğu yatay hizadan mahyaya kadar olan düşey mesafedir. Saçak sıfır girildiğinde bu, duvar üst kotundan mahyaya olan yüksekliğe eşittir.'],
    ['Eğimi derece mi yüzde mi girmeliyim?', 'Hangisini biliyorsanız onu girin ve birimi buna göre seçin. Projelerde eğim çoğunlukla yüzde olarak, bazı ürün kataloglarında derece olarak verilir.'],
    ['Girdiğim bina ölçüleri bir yere gönderiliyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; ölçüleriniz sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['kiremit-hesapla', 'egim-yuzdesi-hesapla', 'alan-cevre-hesapla', 'yagmur-suyu-hasadi-hesapla', 'rampa-egimi-hesapla'],
};
