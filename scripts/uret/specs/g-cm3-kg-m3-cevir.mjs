export default {
  slug: 'g-cm3-kg-m3-cevir',
  title: 'Yoğunluk Çevirici (g/cm³ – kg/m³)',
  h1Tail: 'yoğunluk birimleri',
  pageTitle: 'Yoğunluk Çevirici – g/cm³, kg/m³, kg/L ve lb/ft³ Dönüştürme',
  description: 'Yoğunluk değerini g/cm³, kg/m³, kg/L, g/mL, g/L ve lb/ft³ arasında çevirin. 1 g/cm³ = 1.000 kg/m³; suya göre bağıl yoğunluğu da gösterir.',
  card: 'Yoğunluğu g/cm³, kg/m³, kg/L, g/L ve lb/ft³ arasında çevirin; suya göre bağıl yoğunluk da hesaplanır.',
  category: 'birim',
  keywords: ['g/cm3 kg/m3 çevirme', 'yoğunluk birim çevirme', 'özkütle birim dönüştürme', '1 g/cm3 kaç kg/m3', 'kg/m3 g/cm3', 'lb/ft3 kg/m3', 'bağıl yoğunluk'],
  lead: `Bir maddenin yoğunluğunu (özkütlesini) <strong>g/cm³</strong>, <strong>kg/m³</strong>, <strong>kg/L</strong>, <strong>g/L</strong> ve <strong>lb/ft³</strong> birimleri arasında çevirin. Tek bir değer girmeniz yeterlidir; tüm karşılıklar ve suya göre bağıl yoğunluk birlikte listelenir.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Yoğunluk değeri', type: 'number', placeholder: 'Örn. 7,85' },
    { id: 'birim', label: 'Girilen birim', type: 'select', options: [['gcm3', 'g/cm³ (gram/santimetreküp)'], ['kgm3', 'kg/m³ (kilogram/metreküp)'], ['kgl', 'kg/L (kilogram/litre)'], ['gml', 'g/mL (gram/mililitre)'], ['gl', 'g/L (gram/litre)'], ['lbft3', 'lb/ft³ (libre/fitküp)']] },
  ],
  compute(v, h) {
    const x = h.pos(v.deger, 'Yoğunluk değeri');
    const LB = 16.018463373960138; // 1 lb/ft³ kaç kg/m³
    const kat = { gcm3: 1000, kgm3: 1, kgl: 1000, gml: 1000, gl: 1, lbft3: LB };
    const k = kat[v.birim];
    if (!k) h.err('Geçerli bir birim seçin.');
    const kgm3 = x * k;
    const suya = Math.abs(kgm3 - 1000) < 1e-6 ? 'suyla aynı yoğunlukta' : kgm3 < 1000 ? 'sudan az yoğun' : 'sudan yoğun';
    const a = ['kg/m³', h.sig(kgm3, 6) + ' kg/m³'];
    const b = ['g/cm³', h.sig(kgm3 / 1000, 6) + ' g/cm³'];
    return {
      rows: [
        v.birim === 'kgm3' || v.birim === 'gl' ? b : a,
        v.birim === 'kgm3' || v.birim === 'gl' ? a : b,
        ['kg/L (g/mL)', h.sig(kgm3 / 1000, 6) + ' kg/L'],
        ['g/L', h.sig(kgm3, 6) + ' g/L'],
        ['lb/ft³', h.sig(kgm3 / LB, 6) + ' lb/ft³'],
        ['Bağıl yoğunluk (su = 1)', h.sig(kgm3 / 1000, 6)],
        ['Suya göre', suya],
      ],
      note: 'Bağıl yoğunlukta suyun yoğunluğu 1.000 kg/m³ alınmıştır. Sonuçlar altı anlamlı basamakla gösterilir.',
    };
  },
  cases: [
    { in: { deger: '1', birim: 'gcm3' }, out: { 'kg/m³': '1.000 kg/m³', 'lb/ft³': '62,428 lb/ft³', 'Suya göre': 'suyla aynı yoğunlukta' } },
    { in: { deger: '7850', birim: 'kgm3' }, out: { 'g/cm³': '7,85 g/cm³', 'kg/L (g/mL)': '7,85 kg/L', 'Suya göre': 'sudan yoğun' } },
    { in: { deger: '2,7', birim: 'gcm3' }, out: { 'kg/m³': '2.700 kg/m³', 'Bağıl yoğunluk (su = 1)': '2,7' } },
    { in: { deger: '13,6', birim: 'gcm3' }, out: { 'kg/m³': '13.600 kg/m³' } },
    { in: { deger: '1,225', birim: 'kgm3' }, out: { 'g/cm³': '0,001225 g/cm³', 'Suya göre': 'sudan az yoğun' } },
    { in: { deger: '0,789', birim: 'kgl' }, out: { 'kg/m³': '789 kg/m³', 'g/L': '789 g/L' } },
    { in: { deger: '62,428', birim: 'lbft3' }, out: { 'kg/m³': '1.000 kg/m³', 'g/cm³': '1 g/cm³' } },
    { in: { deger: '920', birim: 'gl' }, out: { 'g/cm³': '0,92 g/cm³', 'kg/m³': '920 kg/m³' } },
    { in: { deger: '0', birim: 'gcm3' }, error: true },
    { in: { deger: '-1', birim: 'kgm3' }, error: true },
  ],
  howto: [
    `"Yoğunluk değeri" alanına elinizdeki sayıyı yazın; ondalık için virgül ya da nokta kullanabilirsiniz.`,
    `"Girilen birim" listesinden bu sayının hangi birimde olduğunu seçin.`,
    `"Çevir" düğmesine basın. Sonuç kutusunda değerin diğer bütün birimlerdeki karşılığı, bağıl yoğunluğu ve suya göre durumu görünür.`,
    `Tabloya ya da rapora aktarmak için "Sonucu kopyala" düğmesini kullanın.`,
  ],
  sections: [
    { h: 'Yoğunluk ve birimleri', p: [
      `Yoğunluk, bir maddenin birim hacmindeki kütledir; Türkçe ders kitaplarında <strong>özkütle</strong> adıyla da geçer ve <strong>d = m ÷ V</strong> bağıntısıyla tanımlanır. Uluslararası birim sisteminde birimi kilogram/metreküptür (kg/m³). Laboratuvarda ve okul fiziğinde ise gram/santimetreküp (g/cm³) çok daha kullanışlıdır, çünkü suyun yoğunluğu bu birimde yaklaşık 1 çıkar ve diğer maddeler kolayca kıyaslanır.`,
      `Sıvılarla çalışanlar çoğu zaman kg/L ya da g/mL kullanır. Bir santimetreküp ile bir mililitre aynı hacim olduğundan <strong>g/cm³, g/mL ve kg/L sayısal olarak birbirine eşittir</strong>. Benzer biçimde bir metreküp bin litre olduğu için <strong>kg/m³ ile g/L de eşittir</strong>. Araç bu eşdeğerleri ayrı satırlarda gösterir ki hangi birimle çalışırsanız çalışın doğrudan okuyabilesiniz.`,
    ] },
    { h: 'g/cm³ ile kg/m³ arasındaki 1.000 çarpanı nereden gelir?', p: [
      `Bir kilogram 1.000 gram, bir metreküp ise 100 × 100 × 100 = 1.000.000 santimetreküptür. Buna göre 1 g/cm³ = 0,001 kg ÷ 0,000001 m³ = 1.000 kg/m³. Kural basittir: <strong>g/cm³ değerini 1.000 ile çarparsanız kg/m³, kg/m³ değerini 1.000'e bölerseniz g/cm³ elde edersiniz</strong>.`,
      `Öğrencilerin sık yaptığı hata, uzunluktaki 100 katını hacme de 100 olarak uygulamak ya da kütle ile hacim çarpanlarını ters yönde kullanmaktır. Hacim birimleri uzunluğun küpüyle ölçeklendiği için metreden santimetreye geçişte çarpan bir milyondur.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> Çeliğin yoğunluğu çizelgelerde yaklaşık 7.850 kg/m³ olarak verilir. 7.850 ÷ 1.000 = 7,85 g/cm³. Yani bir litre hacmindeki çelik blok yaklaşık 7,85 kg gelir.`,
      `<strong>Örnek 2:</strong> Alüminyum için 2,7 g/cm³ değeri 2,7 × 1.000 = 2.700 kg/m³ eder. Bağıl yoğunluğu 2,7'dir; aynı hacimdeki sudan 2,7 kat ağırdır.`,
      `<strong>Örnek 3:</strong> Deniz seviyesinde havanın yoğunluğu için sık kullanılan 1,225 kg/m³ değeri 0,001225 g/cm³'e karşılık gelir. Gazlarda g/cm³ birimi bu yüzden pek kullanılmaz; sayılar çok küçülür.`,
      `<strong>Örnek 4:</strong> Yoğunluğu 0,789 kg/L olan bir sıvı 789 kg/m³, yani 789 g/L eder ve sudan az yoğundur.`,
    ] },
    { h: 'lb/ft³ birimi', p: [
      `Amerikan kaynaklı teknik belgelerde yoğunluk libre/fitküp (lb/ft³) olarak verilir. Bir libre 0,45359237 kg ve bir fit 0,3048 m olarak tanımlandığından 1 lb/ft³ yaklaşık 16,0185 kg/m³ eder. Suyun yoğunluğu bu birimde yaklaşık 62,43'tür. İthal yalıtım malzemesi, köpük ya da kereste kataloglarında gördüğünüz değerleri araçta "lb/ft³" seçerek metrik karşılığına çevirebilirsiniz.`,
    ] },
    { h: 'Bağıl yoğunluk ne anlatır?', p: [
      `Bağıl yoğunluk (özgül ağırlık olarak da anılır), bir maddenin yoğunluğunun suyun yoğunluğuna oranıdır ve birimsizdir. Su 1.000 kg/m³ kabul edildiğinde bağıl yoğunluk, g/cm³ değeriyle sayısal olarak aynıdır. 1'den küçükse madde sudan az yoğundur; suda çözünmeyen bir katı ya da sıvıysa su yüzeyinde kalır. 1'den büyükse dibe çöker. Araçtaki "Suya göre" satırı bu karşılaştırmayı sözle verir.`,
      `Suyun yoğunluğu sıcaklıkla az da olsa değişir; en yüksek değerine yaklaşık 4 °C'de ulaşır ve oda sıcaklığında binde birkaç düşer. Hassas ölçümlerde referans sıcaklık ayrıca belirtilir.`,
    ] },
    { h: 'Bazı maddelerin yaklaşık yoğunlukları', p: [
      `Aşağıdaki değerler oda koşulları için yuvarlanmış tipik değerlerdir; alaşıma, saflığa, sıcaklığa ve neme göre değişir.`,
    ], ul: [
      `<strong>Hava:</strong> yaklaşık 1,2 kg/m³`,
      `<strong>Etil alkol:</strong> yaklaşık 0,79 g/cm³`,
      `<strong>Zeytinyağı:</strong> yaklaşık 0,92 g/cm³`,
      `<strong>Buz:</strong> yaklaşık 0,92 g/cm³`,
      `<strong>Su:</strong> yaklaşık 1 g/cm³ (1.000 kg/m³)`,
      `<strong>Beton:</strong> yaklaşık 2,4 g/cm³`,
      `<strong>Alüminyum:</strong> yaklaşık 2,7 g/cm³`,
      `<strong>Çelik:</strong> yaklaşık 7,85 g/cm³`,
      `<strong>Bakır:</strong> yaklaşık 8,96 g/cm³`,
      `<strong>Kurşun:</strong> yaklaşık 11,3 g/cm³`,
      `<strong>Cıva:</strong> yaklaşık 13,5 g/cm³`,
      `<strong>Altın:</strong> yaklaşık 19,3 g/cm³`,
    ] },
    { h: 'Kullanım alanları ve sınırlar', p: [
      `Yoğunluk çevirisi; malzeme ağırlığı hesabında (hacim × yoğunluk), nakliye ve depolama planlamasında, laboratuvar çözeltilerinde, yakıt ve yağ ölçümlerinde ve fizik-kimya ödevlerinde gerekir. Bir sac levhanın ağırlığını bulurken hacmi metreküp olarak hesapladıysanız yoğunluğu kg/m³, santimetreküp olarak hesapladıysanız g/cm³ cinsinden kullanmalısınız; birimleri karıştırmak sonucu bin kat saptırır.`,
      `Araç yalnızca birim çevirir; sıcaklık ve basınç düzeltmesi yapmaz, dökme (yığın) yoğunluk ile gerçek yoğunluk ayrımını bilemez. Taşıyıcı yapı, basınçlı kap ya da yük hesabı gibi mühendislik kararlarında malzemenin belgelenmiş değerini kullanın ve hesabı bir uzmana doğrulatın.`,
    ] },
  ],
  faq: [
    ['1 g/cm³ kaç kg/m³ eder?', '1 g/cm³ tam olarak 1.000 kg/m³ eder. Çünkü 1 kilogram 1.000 gram, 1 metreküp ise 1.000.000 santimetreküptür.'],
    ['kg/m³ değerini g/cm³\'e nasıl çeviririm?', 'Değeri 1.000\'e bölün. Örneğin 2.700 kg/m³, 2,7 g/cm³ eder.'],
    ['g/cm³ ile g/mL aynı mı?', 'Evet. 1 santimetreküp ile 1 mililitre aynı hacimdir; bu nedenle g/cm³, g/mL ve kg/L birimlerindeki sayılar birbirine eşittir.'],
    ['Suyun yoğunluğu kaçtır?', 'Yaklaşık 1 g/cm³, yani 1.000 kg/m³ ya da 1 kg/L\'dir. Sıcaklıkla çok az değişir; en yüksek değerini 4 °C dolayında alır.'],
    ['Özkütle ile yoğunluk aynı şey mi?', 'Gündelik kullanımda ve bu çeviride evet; ikisi de kütlenin hacme oranını ifade eder. Özkütle terimi daha çok okul kitaplarında kullanılır.'],
    ['lb/ft³ değerini kg/m³\'e nasıl çeviririm?', 'Değeri yaklaşık 16,0185 ile çarpın. Örneğin 62,428 lb/ft³ yaklaşık 1.000 kg/m³ eder. Araçta birim olarak lb/ft³ seçmeniz yeterlidir.'],
    ['Bağıl yoğunluk neden g/cm³ değeriyle aynı çıkıyor?', 'Bağıl yoğunluk, maddenin yoğunluğunun suyun yoğunluğuna bölünmesiyle bulunur. Su 1 g/cm³ kabul edildiğinde bölme işlemi sayıyı değiştirmez; yalnızca birim ortadan kalkar.'],
    ['Girdiğim değer kaydediliyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; yazdığınız sayı hiçbir sunucuya gönderilmez.'],
  ],
  related: ['yogunluk-hesapla', 'kg-gram-cevir', 'ton-kg-cevir', 'birim-donustur', 'kg-pound-cevir'],
};
