export default {
  slug: 'gram-miligram-cevir',
  title: 'Gram Miligram Çevirici',
  h1Tail: 'g ↔ mg',
  pageTitle: 'Gram Miligram Çevirici – 1 Gram Kaç mg, mg\'dan Grama Hesaplama',
  description: 'Gramı miligrama, miligramı grama çevirin. 1 gram = 1.000 miligram; sonuçla birlikte mikrogram ve kilogram karşılığını da tek bakışta görün.',
  card: 'Gramı miligrama, miligramı grama çevirin; etiket, tarif ve laboratuvar değerleri için mikrogram ve kilogramla birlikte.',
  category: 'birim',
  keywords: ['gram miligram çevirme', '1 gram kaç mg', 'mg gram hesaplama', 'miligram kaç gram', '500 mg kaç gram', 'g mg dönüştürme', 'miligram gram çevirici'],
  lead: 'Bir miktarı gramdan miligrama ya da miligramdan grama çevirin. <strong>1 gram = 1.000 miligram</strong> olduğundan işlem bir virgül kaydırmadan ibarettir; araç yanlış basamak hatasını önlemek için mikrogram ve kilogram karşılığını da gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Miktar', type: 'number', placeholder: 'Örn. 500' },
    { id: 'birim', label: 'Girdiğiniz birim', type: 'select', options: [['g', 'Gram (g) → Miligram'], ['mg', 'Miligram (mg) → Gram']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Miktar');
    const mg = v.birim === 'mg' ? x : x * 1000;
    const g = v.birim === 'mg' ? x / 1000 : x;
    const ana = v.birim === 'mg'
      ? [['Gram', h.fmt(g, 9) + ' g'], ['Miligram', h.fmt(mg, 6) + ' mg']]
      : [['Miligram', h.fmt(mg, 6) + ' mg'], ['Gram', h.fmt(g, 9) + ' g']];
    return {
      rows: [
        ...ana,
        ['Mikrogram', h.fmt(mg * 1000, 3) + ' mcg'],
        ['Kilogram', h.fmt(g / 1000, 12) + ' kg'],
      ],
      note: '1 g = 1.000 mg = 1.000.000 mcg. Mikrogram, µg ya da mcg olarak yazılır.',
    };
  },
  cases: [
    { in: { deger: '1', birim: 'g' }, out: { 'Miligram': '1.000 mg', 'Mikrogram': '1.000.000 mcg' } },
    { in: { deger: '500', birim: 'mg' }, out: { 'Gram': '0,5 g', 'Mikrogram': '500.000 mcg' } },
    { in: { deger: '2,5', birim: 'g' }, out: { 'Miligram': '2.500 mg', 'Kilogram': '0,0025 kg' } },
    { in: { deger: '250', birim: 'mg' }, out: { 'Gram': '0,25 g' } },
    { in: { deger: '0,075', birim: 'g' }, out: { 'Miligram': '75 mg', 'Mikrogram': '75.000 mcg' } },
    { in: { deger: '1000', birim: 'mg' }, out: { 'Gram': '1 g', 'Kilogram': '0,001 kg' } },
    { in: { deger: '5', birim: 'mg' }, out: { 'Gram': '0,005 g', 'Mikrogram': '5.000 mcg' } },
    { in: { deger: 'beş', birim: 'mg' }, error: true },
    { in: { deger: '-10', birim: 'g' }, error: true },
  ],
  howto: [
    '"Miktar" alanına sayıyı yazın. Ondalık için virgül ya da nokta kullanabilirsiniz; 0,075 gibi küçük değerler de kabul edilir.',
    '"Girdiğiniz birim" listesinden değerin gram mı miligram mı olduğunu seçin.',
    '"Çevir" düğmesine basın. İlk satırda öbür birimdeki karşılık görünür.',
    'Sonucu etiketteki ya da tarifteki değerle karşılaştırın; basamak hatasından şüpheleniyorsanız mikrogram ve kilogram satırlarına da göz atın.',
  ],
  sections: [
    { h: 'Gram ve miligram arasındaki ilişki', p: [
      'Miligram, gramın binde biridir. "Mili" ön eki metrik sistemde her zaman binde bir anlamına gelir; milimetre metrenin, mililitre litrenin binde biri olduğu gibi miligram da gramın binde biridir. Gramın simgesi <strong>g</strong>, miligramın simgesi <strong>mg</strong> biçiminde yazılır; "gr" ya da "mgr" yazımları yaygın olsa da standart simgeler bunlardır.',
      'İlişki sabit ve tam olduğu için çeviride yuvarlama gerekmez: <strong>mg = g × 1.000</strong> ve <strong>g = mg ÷ 1.000</strong>. Pratikte bu, ondalık virgülün üç basamak sağa ya da sola kaydırılması demektir. Gramdan miligrama geçerken sayı büyür, miligramdan grama geçerken küçülür.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'Örnek 1: Bir besin etiketinde porsiyon başına 2,5 gram tuz yazıyor. Miligram karşılığı 2,5 × 1.000 = 2.500 mg\'dır.',
      'Örnek 2: Bir takviyenin kapsülünde 500 mg yazıyor. Gram karşılığı 500 ÷ 1.000 = 0,5 gramdır; yani iki kapsül bir gram eder.',
      'Örnek 3: Bir tarifte 0,075 gram safran isteniyor ve teraziniz miligram gösteriyor. 0,075 × 1.000 = 75 mg tartmanız gerekir.',
      'Örnek 4: Laboratuvar raporunda 5 mg olarak verilen bir miktar 0,005 gram, mikrogram cinsinden ise 5.000 mcg eder.',
      'Virgül kaydırırken boş kalan basamakları sıfırla doldurmayı unutmayın: 0,5 gram 500 mg\'dır, 5 mg değil; 5 mg ise 0,005 gramdır, 0,05 gram değil.',
    ] },
    { h: 'Metrik basamaklar: kilogramdan mikrograma', p: [
      'Kütle birimleri binerli basamaklarla ilerler. Bir kilogram bin gram, bir gram bin miligram, bir miligram bin mikrogramdır. Dolayısıyla bir gram aynı zamanda bir milyon mikrogramdır. Araç bu zinciri sonuç kutusunda birlikte gösterir; böylece tek bir değerin dört birimdeki karşılığını aynı anda görebilirsiniz.',
      'Mikrogramın simgesi Yunan harfi mü ile yazılan <strong>µg</strong> biçimindedir. Bu harf el yazısında ve bazı yazı tiplerinde "mg" ile karıştırılabildiği için sağlık alanında çoğu zaman <strong>mcg</strong> kısaltması yeğlenir. Bu sayfada da mikrogram için mcg yazımı kullanılmıştır.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>0,001 g</strong> = 1 mg',
      '<strong>0,01 g</strong> = 10 mg',
      '<strong>0,1 g</strong> = 100 mg',
      '<strong>0,25 g</strong> = 250 mg',
      '<strong>0,5 g</strong> = 500 mg',
      '<strong>1 g</strong> = 1.000 mg',
      '<strong>5 g</strong> = 5.000 mg',
      '<strong>10 g</strong> = 10.000 mg',
      '<strong>100 g</strong> = 100.000 mg',
      '<strong>1 kg</strong> = 1.000.000 mg',
    ] },
    { h: 'Bu çeviri nerelerde gerekir?', ul: [
      '<strong>Besin etiketleri:</strong> protein, yağ ve karbonhidrat gram ile, sodyum, kalsiyum ve demir gibi mineraller ise miligram ile yazılır; günlük toplamı hesaplarken aynı birime getirmek gerekir.',
      '<strong>Tuz ve sodyum karşılaştırması:</strong> bazı etiketler tuzu gram, bazıları sodyumu miligram olarak verir. Bu ikisi aynı şey değildir; birim çevirdikten sonra tuz-sodyum dönüşümü ayrıca yapılmalıdır.',
      '<strong>Mutfak:</strong> safran, vanilya, maya, jelatin ve baharat gibi az miktarda kullanılan malzemelerde hassas teraziler miligram gösterir.',
      '<strong>Okul ve laboratuvar:</strong> kimya ve fen derslerinde çözelti hazırlarken, deney raporu yazarken ve mol hesabında birimler sık sık değişir.',
      '<strong>Kuyumculuk ve hobi:</strong> küçük parça ağırlıkları, boncuk, pigment ve reçine katkıları miligramla ölçülür.',
      '<strong>Kahve ve çay:</strong> kafein miktarı miligramla, demlenecek çekirdek ya da yaprak gramla ifade edilir.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En tehlikeli hata, virgülü yanlış yöne ya da eksik basamak kaydırmaktır; sonuç on, yüz ya da bin kat yanlış çıkar. Kendinizi denetlemenin kolay yolu şudur: miligram değeri her zaman gram değerinden bin kat büyük olmalıdır. İkinci hata, miligram ile mililitreyi karıştırmaktır. Miligram kütle, mililitre hacim birimidir; ikisi arasında çeviri ancak maddenin yoğunluğu ya da çözeltinin derişimi bilinirse yapılabilir.',
      'Üçüncü hata, girdide binlik ayraç olarak tek nokta kullanmaktır. Araç "1.500" yazımını 1,5 olarak okur; bin beş yüz için 1500 yazın.',
    ] },
    { h: 'İlaç ve takviyelerde önemli uyarı', p: [
      'Bu araç yalnızca birim çevirir; doz hesaplamaz ve hangi miktarın uygun olduğunu söylemez. İlaç ve takviye kullanımında reçetede, kutuda ve prospektüste yazan değerleri esas alın. Bir dozu farklı bir birime çevirmeniz gerekiyorsa sonucu mutlaka hekiminize ya da eczacınıza doğrulatın; özellikle çocuklarda ve sıvı ilaçlarda küçük bir basamak hatası ciddi sonuçlar doğurabilir.',
    ] },
  ],
  faq: [
    ['1 gram kaç miligramdır?', '1 gram 1.000 miligramdır. Bu, metrik sistemdeki "mili" ön ekinin binde bir anlamına gelmesinden kaynaklanan tam bir eşitliktir.'],
    ['1 miligram kaç gramdır?', '1 miligram 0,001 gramdır, yani gramın binde biri. 10 mg 0,01 gram, 100 mg 0,1 gram eder.'],
    ['500 mg kaç gramdır?', '500 mg yarım gramdır, yani 0,5 g. Aynı mantıkla 250 mg çeyrek gram (0,25 g), 750 mg ise 0,75 gramdır.'],
    ['mg ile mcg arasındaki fark nedir?', 'mg miligram, mcg mikrogram demektir. 1 miligram 1.000 mikrograma eşittir; yani mikrogram miligramdan bin kat küçüktür. İkisini karıştırmak bin katlık hataya yol açar.'],
    ['Miligramı mililitreye çevirebilir miyim?', 'Doğrudan çeviremezsiniz, çünkü biri kütle öbürü hacim birimidir. Su için 1 mililitre yaklaşık 1 gram, yani 1.000 miligramdır; başka sıvılarda ve ilaç çözeltilerinde değer yoğunluğa ve derişime göre değişir.'],
    ['Gram "gr" olarak mı yazılır?', 'Standart simge yalnızca g harfidir ve sonuna nokta konmaz. "gr" yazımı gündelik kullanımda yaygındır ama resmî ve bilimsel metinlerde g kullanılır; miligram için de mg yazılır.'],
    ['Bir çay kaşığı kaç miligramdır?', 'Bunun tek bir cevabı yoktur; çay kaşığı hacim ölçer ve içine konan maddenin yoğunluğuna göre ağırlık değişir. Bir çay kaşığı tuz ile bir çay kaşığı un aynı gramı vermez. Kesin miktar için hassas terazi kullanın.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Çeviri tarayıcınızın içinde yapılır; girdiğiniz sayı sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['mikrogram-miligram-cevir', 'kg-gram-cevir', 'karat-gram-cevir', 'mutfak-olcu-donustur', 'birim-donustur'],
};
