export default {
  slug: 'mmhg-kpa-cevir',
  title: 'mmHg Kilopascal Çevirici',
  h1Tail: 'mmHg ↔ kPa',
  pageTitle: 'mmHg kPa Çevirici – Milimetre Cıva Kilopascal Basınç Çevirme',
  description: 'mmHg değerini kilopascala, kPa değerini milimetre cıvaya çevirin. Tansiyon, kan gazı ve barometre değerleri için hPa, atm, psi ve cmH₂O karşılığını da görün.',
  card: 'Milimetre cıvayı kilopascala, kPa\'yı mmHg\'ye çevirin; tansiyon, kan gazı ve barometre okumaları için ek birimlerle.',
  category: 'birim',
  keywords: ['mmhg kpa çevirme', '1 mmhg kaç kpa', 'kpa mmhg çevirme', 'milimetre cıva kilopascal', 'tansiyon kpa mmhg', '760 mmhg kaç kpa', 'torr kpa', 'mmhg hesaplama'],
  lead: 'Milimetre cıva (mmHg) cinsinden bir basıncı kilopascala ya da kPa değerini mmHg\'ye çevirin. Hesap <strong>1 mmHg = 133,322387 Pa</strong> kabulüne dayanır; yani 1 kPa yaklaşık 7,5 mmHg eder.',
  button: 'Çevir',
  inputs: [
    { id: 'basinc', label: 'Basınç', type: 'number', placeholder: 'Örn. 120' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['mmhg', 'mmHg → kPa'], ['kpa', 'kPa → mmHg']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.basinc, 'Basınç');
    const MMHG = 0.133322387415; // 1 mmHg = 133,322387415 Pa (geleneksel tanım)
    const kpa = v.yon === 'kpa' ? x : x * MMHG;
    const mmhg = v.yon === 'kpa' ? x / MMHG : x;
    const f = (n) => h.sig(n, 7);
    return {
      rows: [
        v.yon === 'kpa' ? ['Milimetre cıva', f(mmhg) + ' mmHg'] : ['Kilopascal', f(kpa) + ' kPa'],
        v.yon === 'kpa' ? ['Kilopascal', f(kpa) + ' kPa'] : ['Milimetre cıva', f(mmhg) + ' mmHg'],
        ['Hektopascal (milibar)', f(kpa * 10) + ' hPa'],
        ['Atmosfer', f(kpa / 101.325) + ' atm'],
        ['PSI', f(kpa / 6.894757293168361) + ' psi'],
        ['Santimetre su', f(kpa * 1000 / 98.0665) + ' cmH₂O'],
      ],
      note: '1 mmHg = 133,322387415 Pa kabul edilmiştir. Sonuçlar birim çevirisidir; tıbbi değerlendirme yerine geçmez.',
    };
  },
  cases: [
    { in: { basinc: '120', yon: 'mmhg' }, out: { 'Kilopascal': '15,99869 kPa', 'Hektopascal (milibar)': '159,9869 hPa' } },
    { in: { basinc: '100', yon: 'kpa' }, out: { 'Milimetre cıva': '750,0616 mmHg', 'Kilopascal': '100 kPa' } },
    { in: { basinc: '760', yon: 'mmhg' }, out: { 'Kilopascal': '101,325 kPa', 'Atmosfer': '1 atm' } },
    { in: { basinc: '80', yon: 'mmhg' }, out: { 'Kilopascal': '10,66579 kPa' } },
    { in: { basinc: '1', yon: 'kpa' }, out: { 'Milimetre cıva': '7,500616 mmHg' } },
    { in: { basinc: '1', yon: 'mmhg' }, out: { 'Kilopascal': '0,1333224 kPa', 'Santimetre su': '1,35951 cmH₂O' } },
    { in: { basinc: '16', yon: 'kpa' }, out: { 'Milimetre cıva': '120,0099 mmHg' } },
    { in: { basinc: '-10', yon: 'mmhg' }, error: true },
    { in: { basinc: '12/8', yon: 'mmhg' }, error: true },
  ],
  howto: [
    '"Basınç" alanına tek bir sayı yazın. Tansiyon gibi iki değerli ölçümlerde büyük ve küçük tansiyonu ayrı ayrı çevirin.',
    '"Çeviri yönü" listesinden "mmHg → kPa" ya da "kPa → mmHg" seçeneğini belirleyin.',
    '"Çevir" düğmesine basın. Karşılık gelen değer ilk satırda; hektopascal, atmosfer, psi ve santimetre su karşılıkları alt satırlarda görünür.',
    'Değerleri not almak ya da paylaşmak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'mmHg ve kPa nedir?', p: [
      '<strong>Milimetre cıva (mmHg)</strong>, basıncı bir cıva sütununun yüksekliğiyle ifade eden geleneksel bir birimdir. Kökeni cıvalı barometreye dayanır: açık hava basıncı, bir ucu kapalı cam tüpteki cıvayı deniz seviyesinde yaklaşık 760 milimetre yükseklikte tutar. Cıva çok yoğun bir sıvı olduğu için küçük bir tüple büyük basınçlar ölçülebilir; tıpta kan basıncının hâlâ bu birimle anılması, ilk tansiyon aletlerinin cıvalı olmasından kaynaklanır.',
      '<strong>Kilopascal (kPa)</strong> ise Uluslararası Birim Sistemi\'nin basınç birimi olan pascalın bin katıdır. Bilimsel yayınlarda, bazı ülkelerin laboratuvar raporlarında ve mühendislikte tercih edilir. İki birim arasındaki bağ, standart koşullardaki cıvanın yoğunluğu ve standart yerçekimi ivmesi üzerinden kurulmuştur: 1 mmHg = 133,322387415 Pa kabul edilir. Buradan 1 kPa = 7,500616 mmHg bulunur.',
    ] },
    { h: 'Çeviri formülü ve çözümlü örnekler', p: [
      'mmHg\'den kPa\'ya geçmek için değeri 0,1333224 ile çarparsınız: <strong>kPa = mmHg × 0,1333224</strong>. Ters yönde 7,500616 ile çarparsınız: <strong>mmHg = kPa × 7,500616</strong>. Akıldan hesap için mmHg değerini 7,5\'e bölmek yeterince yakın sonuç verir.',
      '<strong>Örnek 1:</strong> 120 mmHg\'lik bir değer 120 × 0,1333224 = 16,00 kPa eder. 80 mmHg ise 10,67 kPa\'dır. Dolayısıyla "120/80 mmHg" olarak okunan bir ölçüm kilopascal ile yaklaşık "16/10,7 kPa" biçiminde yazılır.',
      '<strong>Örnek 2:</strong> Bir laboratuvar raporunda gaz basıncı 5,3 kPa olarak verilmiş. 5,3 × 7,500616 = 39,75 mmHg; yani yaklaşık 40 mmHg.',
      '<strong>Örnek 3:</strong> Cıvalı barometre 760 mmHg gösteriyor. 760 × 0,1333224 = 101,325 kPa; bu tam olarak 1 standart atmosferdir. Hava raporlarındaki karşılığı 1.013,25 hPa\'dır.',
    ] },
    { h: 'Sağlık alanında kullanım', p: [
      'Tansiyon aletleri, göz içi basıncı ölçümleri ve yoğun bakım monitörleri değerleri çoğunlukla mmHg olarak verir. Kan gazı analizlerinde oksijen ve karbondioksit kısmi basınçları ise kimi laboratuvarda mmHg, kimisinde kPa olarak raporlanır. Yurt dışında yapılmış bir tahlili okurken ya da yabancı kaynaklı bir makaleyi incelerken birimi fark etmeden sayıları karşılaştırmak ciddi yanlış anlamalara yol açabilir: 13,3 kPa ile 100 mmHg aynı basınçtır.',
      'Solunum cihazlarında ve bazı kateter ölçümlerinde bir üçüncü birim, santimetre su (cmH₂O) kullanılır. 1 mmHg yaklaşık 1,36 cmH₂O eder; araç bu karşılığı da ayrı bir satırda verir.',
      '<strong>Önemli:</strong> Bu sayfa yalnızca birim dönüştürür. Bir ölçümün normal, düşük ya da yüksek olup olmadığını söylemez ve tıbbi tavsiye vermez. Ölçüm sonuçlarınızın yorumu, tanı ve tedavi kararları için mutlaka hekiminize başvurun; ilaç dozunu ya da tedaviyi bu çeviriye dayanarak değiştirmeyin.',
    ] },
    { h: 'Tıp dışındaki kullanım alanları', ul: [
      '<strong>Meteoroloji ve barometreler:</strong> Eski duvar barometrelerinin kadranı mmHg taksimatlıdır; güncel hava raporları hPa kullanır. 750 mmHg yaklaşık 1.000 hPa eder.',
      '<strong>Vakum tekniği:</strong> Vakum pompaları, soğutma ve klima servis manometreleri düşük basınçları mmHg ya da ona çok yakın olan Torr ile gösterir. Derin vakum değerleri için mikron (milimetrenin binde biri cıva) da kullanılır.',
      '<strong>Kimya laboratuvarı:</strong> Buhar basıncı tabloları ve damıtma koşulları sıklıkla mmHg ile verilir; hesaplamalarda SI birimine geçmek için kPa\'ya çevrilir.',
      '<strong>Havacılık:</strong> Altimetre ayarı bazı ülkelerde inç cıva, bazılarında hektopascal ile yapılır; ikisi de aynı fiziksel büyüklüğün farklı ifadeleridir.',
    ] },
    { h: 'mmHg ile Torr aynı mı?', p: [
      'Uygulamada evet. Torr, standart atmosferin tam 760\'ta biri olarak tanımlanır: 1 Torr = 101.325 ÷ 760 = 133,322368 Pa. Geleneksel mmHg ise 133,322387 Pa\'dır. Aradaki fark yaklaşık yedi milyonda birdir ve hiçbir gündelik ölçüm aleti bu ayrımı göremez. Bu nedenle 760 mmHg\'yi çevirdiğinizde sonuç, gösterilen basamak sayısında tam 101,325 kPa ve 1 atm olarak görünür.',
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      '<strong>40 mmHg</strong> = 5,33 kPa',
      '<strong>60 mmHg</strong> = 8,00 kPa',
      '<strong>80 mmHg</strong> = 10,67 kPa',
      '<strong>90 mmHg</strong> = 12,00 kPa',
      '<strong>100 mmHg</strong> = 13,33 kPa',
      '<strong>120 mmHg</strong> = 16,00 kPa',
      '<strong>140 mmHg</strong> = 18,67 kPa',
      '<strong>160 mmHg</strong> = 21,33 kPa',
      '<strong>760 mmHg</strong> = 101,325 kPa',
      '<strong>1 kPa</strong> = 7,50 mmHg',
      '<strong>10 kPa</strong> = 75,01 mmHg',
      '<strong>100 kPa</strong> = 750,06 mmHg',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'Tansiyon konuşma dilinde "12\'ye 8" diye söylenir; bu aslında santimetre cıva cinsinden yuvarlanmış bir ifadedir ve 120/80 mmHg anlamına gelir. Çeviriciye 12 yazarsanız 12 mmHg\'yi çevirmiş olursunuz. Doğru sonuç için değeri milimetre olarak, yani 120 biçiminde girin.',
      'Bir diğer hata, kPa ile hPa\'nın karıştırılmasıdır. Hava durumu uygulamalarındaki 1.013 sayısı hektopascaldır; kilopascal karşılığı 101,3\'tür. İki birim arasında on kat fark vardır. Ayrıca mmHg ile inç cıvayı (inHg) karıştırmayın: 1 inç cıva 25,4 mmHg\'ye eşittir.',
    ] },
  ],
  faq: [
    ['1 mmHg kaç kPa eder?', '1 mmHg yaklaşık 0,1333 kPa, yani 133,32 pascal eder. Tersinden 1 kPa yaklaşık 7,5 mmHg\'dir.'],
    ['120 mmHg kaç kPa yapar?', '120 mmHg yaklaşık 16,0 kPa yapar (120 × 0,1333224 = 15,99869). 80 mmHg ise 10,67 kPa\'dır.'],
    ['760 mmHg kaç kPa\'dır?', '760 mmHg, 101,325 kPa\'dır. Bu değer standart atmosfer basıncına, yani 1 atm\'ye karşılık gelir.'],
    ['Tansiyon neden mmHg ile ölçülür?', 'İlk tansiyon aletleri cıvalı manometre kullandığı ve basınç doğrudan cıva sütununun yüksekliğinden okunduğu için. Günümüzde dijital ve aneroid aletler yaygın olsa da tıpta alışılmış birim olarak mmHg korunmuştur.'],
    ['mmHg ile Torr arasında fark var mı?', 'Tanımları farklıdır ama değerleri pratikte aynıdır; fark milyonda birin altındadır. Gündelik ve klinik kullanımda 1 mmHg = 1 Torr kabul edilir.'],
    ['Bu araç tansiyonumun normal olup olmadığını söyler mi?', 'Hayır. Araç yalnızca birim çevirir. Ölçümünüzün değerlendirilmesi yaş, sağlık durumu ve ölçüm koşulları gibi etkenlere bağlıdır ve bir sağlık profesyoneli tarafından yapılmalıdır.'],
    ['kPa değerini mmHg\'ye akıldan nasıl çeviririm?', 'kPa değerini 7,5 ile çarpın: önce 7 ile çarpıp üzerine değerin yarısını ekleyin. Örneğin 12 kPa için 84 + 6 = 90 mmHg bulunur; tam değer 90,01 mmHg\'dir.'],
    ['Yazdığım sağlık verileri bir yere kaydediliyor mu?', 'Hayır. Çeviri yalnızca tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez, saklanmaz ve kimseyle paylaşılmaz.'],
  ],
  related: ['tansiyon-degerlendirme', 'ortalama-arteriyel-basinc-hesapla', 'bar-kpa-cevir', 'bar-atm-cevir', 'psi-kpa-cevir'],
};
