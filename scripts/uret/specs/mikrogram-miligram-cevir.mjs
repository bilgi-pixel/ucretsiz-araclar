export default {
  slug: 'mikrogram-miligram-cevir',
  title: 'Mikrogram Miligram Çevirici',
  h1Tail: 'mcg ↔ mg',
  pageTitle: 'Mikrogram Miligram Çevirici – mcg (µg) Kaç mg, mg Kaç mcg',
  description: 'Mikrogramı miligrama, miligramı mikrograma çevirin. 1 mg = 1.000 mcg (µg); vitamin ve mineral etiketlerini okurken gram ve nanogram karşılığını da görün.',
  card: 'Mikrogramı (mcg, µg) miligrama, miligramı mikrograma çevirin; vitamin etiketleri ve tahlil değerleri için.',
  category: 'birim',
  keywords: ['mikrogram miligram çevirme', 'mcg kaç mg', '1 mg kaç mcg', 'µg mg hesaplama', 'mcg mg dönüştürme', '1000 mcg kaç mg', 'mikrogram nedir'],
  lead: 'Çok küçük miktarları mikrogramdan (<strong>mcg</strong> ya da <strong>µg</strong>) miligrama, miligramdan mikrograma çevirin. <strong>1 miligram = 1.000 mikrogram</strong> eşitliği kullanılır; sonuç gram ve nanogram olarak da verilir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Miktar', type: 'number', placeholder: 'Örn. 400' },
    { id: 'birim', label: 'Girdiğiniz birim', type: 'select', options: [['mcg', 'Mikrogram (mcg, µg) → Miligram'], ['mg', 'Miligram (mg) → Mikrogram']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Miktar');
    const mcg = v.birim === 'mg' ? x * 1000 : x;
    const mg = v.birim === 'mg' ? x : x / 1000;
    const ana = v.birim === 'mg'
      ? [['Mikrogram', h.fmt(mcg, 6) + ' mcg'], ['Miligram', h.fmt(mg, 9) + ' mg']]
      : [['Miligram', h.fmt(mg, 9) + ' mg'], ['Mikrogram', h.fmt(mcg, 6) + ' mcg']];
    return {
      rows: [
        ...ana,
        ['Gram', h.fmt(mg / 1000, 12) + ' g'],
        ['Nanogram', h.fmt(mcg * 1000, 3) + ' ng'],
      ],
      note: '1 mg = 1.000 mcg; 1 mcg = 1.000 ng. mcg ile µg aynı birimin iki yazımıdır. Bu araç doz önerisi vermez.',
    };
  },
  cases: [
    { in: { deger: '1000', birim: 'mcg' }, out: { 'Miligram': '1 mg', 'Gram': '0,001 g' } },
    { in: { deger: '0,5', birim: 'mg' }, out: { 'Mikrogram': '500 mcg', 'Nanogram': '500.000 ng' } },
    { in: { deger: '400', birim: 'mcg' }, out: { 'Miligram': '0,4 mg', 'Gram': '0,0004 g' } },
    { in: { deger: '25', birim: 'mcg' }, out: { 'Miligram': '0,025 mg', 'Nanogram': '25.000 ng' } },
    { in: { deger: '1', birim: 'mg' }, out: { 'Mikrogram': '1.000 mcg', 'Gram': '0,001 g' } },
    { in: { deger: '2,4', birim: 'mcg' }, out: { 'Miligram': '0,0024 mg', 'Nanogram': '2.400 ng' } },
    { in: { deger: '0', birim: 'mcg' }, out: { 'Miligram': '0 mg' } },
    { in: { deger: 'mcg', birim: 'mcg' }, error: true },
    { in: { deger: '-50', birim: 'mg' }, error: true },
  ],
  howto: [
    'Etikette ya da raporda gördüğünüz sayıyı "Miktar" alanına yazın; birim harflerini yazmayın, yalnızca sayıyı girin.',
    '"Girdiğiniz birim" listesinden sayının mikrogram mı miligram mı olduğunu seçin. Etikette µg, mcg ya da ug yazıyorsa mikrogramı seçin.',
    '"Çevir" düğmesine basın; öbür birimdeki karşılık ilk satırda görünür.',
    'İki ürünü karşılaştırıyorsanız ikisini de aynı birime çevirip yan yana koyun; gram ve nanogram satırları basamak denetimi için oradadır.',
  ],
  sections: [
    { h: 'Mikrogram nedir, nasıl yazılır?', p: [
      'Mikrogram, gramın milyonda biri, miligramın ise binde biridir. "Mikro" ön eki metrik sistemde milyonda bir anlamına gelir. Resmî simgesi, Yunan alfabesindeki mü harfiyle yazılan <strong>µg</strong> biçimindedir. Ancak bu harf klavyede kolay bulunmadığı ve el yazısında "m" ile karıştırılabildiği için özellikle sağlık alanında <strong>mcg</strong> kısaltması yaygınlaşmıştır. Bazı etiketlerde harf yerine düz "u" kullanılarak "ug" yazıldığı da görülür. Üçü de aynı birimi anlatır.',
      'Mikrogram, gözle görülemeyecek kadar küçük miktarlar içindir. Bir miligram zaten bir tutam tuzun çok küçük bir bölümü kadardır; mikrogram bunun da binde biridir. Bu yüzden mikrogramla ifade edilen maddeleri ev terazisiyle tartmak mümkün değildir; bu değerler üretimde ve laboratuvarda özel cihazlarla ölçülür.',
    ] },
    { h: 'Çeviri formülü', p: [
      'Mikrogramdan miligrama geçmek için değeri 1.000\'e bölersiniz: <strong>mg = mcg ÷ 1.000</strong>. Miligramdan mikrograma geçmek için 1.000 ile çarparsınız: <strong>mcg = mg × 1.000</strong>. Virgülü üç basamak kaydırmak yeterlidir; mikrograma geçerken sayı büyür, miligrama geçerken küçülür.',
      'Örnek 1: Etiketinde 400 mcg yazan bir tablet, 400 ÷ 1.000 = 0,4 mg içerir. Başka bir üründe aynı madde 0,4 mg olarak yazıyorsa iki ürün aynı miktardadır.',
      'Örnek 2: 0,5 mg olarak verilen bir değer 0,5 × 1.000 = 500 mcg eder.',
      'Örnek 3: 25 mcg, 0,025 mg\'dır; nanogram cinsinden 25.000 ng eder.',
      'Örnek 4: 2,4 mcg gibi küçük bir değer 0,0024 mg olur. Görüldüğü gibi miligrama çevrildiğinde baştaki sıfırlar artar; bu tür değerlerin etiketlerde mikrogramla yazılmasının nedeni de okunabilirliktir.',
    ] },
    { h: 'Vitamin ve mineral etiketlerini okurken', p: [
      'Besin takviyelerinde her madde, gündelik miktarının büyüklüğüne uygun birimle yazılır. C vitamini, kalsiyum ve magnezyum gibi görece yüksek miktarda bulunanlar miligramla; B12 vitamini, D vitamini, K vitamini, folat, biyotin, iyot ve selenyum gibi çok az miktarda bulunanlar mikrogramla ifade edilir. Aynı kutunun üzerinde iki birimi yan yana görmek bu yüzden olağandır.',
      'Karşılaştırma yaparken önce birime, sonra sayıya bakın. Bir üründe "1.000 mcg", öbüründe "1 mg" yazıyorsa bu ikisi eşittir; sayının büyük görünmesi daha fazla içerik anlamına gelmez. Tersine, "5 mg" ile "5 mcg" arasında bin kat fark vardır.',
    ] },
    { h: 'Uluslararası ünite (IU) ile karıştırmayın', p: [
      'Bazı vitaminler etiketlerde mikrogram yerine ya da mikrogramla birlikte <strong>IU</strong> (uluslararası ünite) olarak yazılır. IU bir kütle birimi değildir; maddenin biyolojik etkisine göre tanımlanır ve her madde için karşılığı farklıdır. Yaygın olarak bilinen bir örnek D vitaminidir: 1 mikrogram D vitamini 40 IU kabul edilir. Aynı katsayı A ya da E vitamini için geçerli değildir.',
      'Bu nedenle IU değerini tek bir formülle miligrama çevirmek mümkün değildir ve bu araç IU çevirisi yapmaz. IU ile verilen bir değeri kütleye çevirmeniz gerekiyorsa ürünün kendi etiketindeki karşılığa bakın ya da eczacınıza sorun.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 mcg</strong> = 0,001 mg',
      '<strong>10 mcg</strong> = 0,01 mg',
      '<strong>50 mcg</strong> = 0,05 mg',
      '<strong>100 mcg</strong> = 0,1 mg',
      '<strong>250 mcg</strong> = 0,25 mg',
      '<strong>500 mcg</strong> = 0,5 mg',
      '<strong>1.000 mcg</strong> = 1 mg',
      '<strong>5.000 mcg</strong> = 5 mg',
      '<strong>0,1 mg</strong> = 100 mcg',
      '<strong>2 mg</strong> = 2.000 mcg',
    ] },
    { h: 'Tahlil sonuçlarında mikrogram ve nanogram', p: [
      'Kan ve idrar tahlillerinde değerler çoğu zaman bir hacme oranlanarak verilir: mcg/dL, ng/mL, mg/L gibi. Burada hem pay hem payda değişebildiği için yalnızca mikrogramı miligrama çevirmek yetmez; paydadaki hacim birimi de aynı kalmalıdır. Örneğin mcg/L ile ng/mL sayısal olarak aynıdır, çünkü hem pay hem payda bin kat küçülmüştür.',
      'Farklı laboratuvarlar aynı testi farklı birimlerle raporlayabilir ve her birinin referans aralığı kendi birimine göre yazılır. Sonuçlarınızı yorumlarken raporun üzerindeki referans aralığını esas alın; birim çevirerek başka bir kaynağın aralığıyla karşılaştırmak yanıltıcı olabilir.',
    ] },
    { h: 'Sağlık uyarısı ve sınırlar', p: [
      'Bu sayfa yalnızca birim çevirir. Hangi vitaminden ya da ilaçtan ne kadar alınacağını söylemez, doz hesaplamaz. Mikrogram ile miligramın karıştırılması bin katlık bir fark demektir ve ilaçlarda ciddi sonuçlar doğurabilir. Reçeteli ilaçlarda, çocuklarda, gebelikte ve kronik hastalıklarda dozla ilgili her kararı hekiminize ya da eczacınıza danışarak verin. Araç negatif değer kabul etmez; binlik ayraç olarak tek nokta kullanmayın, 1500 biçiminde yazın.',
    ] },
  ],
  faq: [
    ['1 mg kaç mcg eder?', '1 miligram 1.000 mikrogramdır. 0,5 mg 500 mcg, 2 mg 2.000 mcg eder.'],
    ['1 mcg kaç mg eder?', '1 mikrogram 0,001 miligramdır, yani miligramın binde biri. 100 mcg 0,1 mg, 1.000 mcg ise tam 1 mg eder.'],
    ['mcg ile µg aynı şey mi?', 'Evet. İkisi de mikrogram demektir. µg resmî simgedir; mcg ise µ harfinin yanlış okunmasını önlemek için özellikle sağlık alanında kullanılan kısaltmadır. Bazı etiketlerde ug yazımı da görülür.'],
    ['1000 mcg B12 kaç miligramdır?', '1.000 mcg tam olarak 1 mg eder. Bu yalnızca bir birim çevirisidir; sizin için uygun miktarı hekiminiz ya da eczacınız belirler.'],
    ['Mikrogramı IU birimine çevirebilir miyim?', 'Tek bir katsayıyla çeviremezsiniz. IU maddeye özgü bir etki birimidir; örneğin D vitamininde 1 mcg 40 IU kabul edilirken başka vitaminlerde karşılık farklıdır. Ürün etiketindeki eşdeğeri kullanın.'],
    ['Mikrogram mı daha küçük, nanogram mı?', 'Nanogram daha küçüktür. 1 mikrogram 1.000 nanograma eşittir. Sıralama büyükten küçüğe gram, miligram, mikrogram, nanogram biçimindedir ve her basamak bir öncekinin binde biridir.'],
    ['Mikrogramı evde tartabilir miyim?', 'Hayır. Mutfak terazileri gram, hassas kuyumcu terazileri ise en iyi ihtimalle miligram düzeyinde ölçer. Mikrogram düzeyindeki miktarlar yalnızca laboratuvar cihazlarıyla ölçülebilir.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; yazdığınız değer hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['gram-miligram-cevir', 'kg-gram-cevir', 'karat-gram-cevir', 'birim-donustur', 'kalori-hesapla'],
};
