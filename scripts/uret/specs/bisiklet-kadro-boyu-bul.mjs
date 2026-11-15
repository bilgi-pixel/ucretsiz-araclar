export default {
  slug: 'bisiklet-kadro-boyu-bul',
  title: 'Bisiklet Kadro Boyu Bulma',
  h1Tail: 'iç bacak boyuna göre',
  pageTitle: "Bisiklet Kadro Boyu Bulma – İç Bacak Boyuna Göre Kadro Hesaplama",
  description: "İç bacak boyunuzu yazın; yol, dağ, trekking ve şehir bisikleti için önerilen kadro boyunu santimetre ve inç olarak, sele yüksekliğiyle birlikte öğrenin.",
  card: "İç bacak boyunuza göre yol, dağ, trekking ve şehir bisikleti için kadro boyunu cm ve inç olarak bulun.",
  category: 'gunluk',
  keywords: ['bisiklet kadro boyu', 'kadro boyu hesaplama', 'bisiklet boyu nasıl seçilir', 'iç bacak boyu kadro', 'dağ bisikleti kadro inç', 'yol bisikleti kadro cm', 'sele yüksekliği hesaplama'],
  lead: "İç bacak boyunuzu ve bisiklet türünü girin; araç, yaygın kullanılan katsayılarla <strong>önerilen kadro boyunu</strong> santimetre ve inç olarak, başlangıç için sele yüksekliğiyle birlikte hesaplar.",
  button: 'Hesapla',
  inputs: [
    { id: 'bacak', label: 'İç bacak boyu (cm)', type: 'number', placeholder: 'Örn. 80', hint: 'Ayakkabısız, kasıktan yere kadar ölçün.' },
    { id: 'tur', label: 'Bisiklet türü', type: 'select', options: [['yol', 'Yol bisikleti'], ['dag', 'Dağ bisikleti (MTB)'], ['trekking', 'Trekking / tur bisikleti'], ['sehir', 'Şehir bisikleti']] },
  ],
  compute(v, h) {
    const b = h.pos(v.bacak, 'İç bacak boyu');
    if (b < 45 || b > 110) h.err('İç bacak boyu 45 ile 110 cm arasında olmalı. Değeri santimetre olarak ve kasıktan yere ölçerek yazın.');
    const kats = { yol: 0.665, dag: 0.574, trekking: 0.66, sehir: 0.685 };
    const adlar = { yol: 'Yol bisikleti', dag: 'Dağ bisikleti', trekking: 'Trekking / tur bisikleti', sehir: 'Şehir bisikleti' };
    const k = kats[v.tur] || kats.yol;
    const cm = b * k;
    const inc = cm / 2.54;
    const sele = b * 0.883;
    return {
      rows: [
        ['Önerilen kadro boyu', h.fmt(cm, 1) + ' cm'],
        ['İnç karşılığı', h.fmt(inc, 1) + ' inç'],
        ['Uygun aralık', h.fmt(cm - 1, 1) + ' – ' + h.fmt(cm + 1, 1) + ' cm'],
        ['Sele yüksekliği (başlangıç)', h.fmt(sele, 1) + ' cm'],
        ['Kullanılan katsayı', (adlar[v.tur] || adlar.yol) + ': iç bacak × ' + h.fmt(k, 3)],
      ],
      note: 'Kadro boyu, orta göbek merkezinden sele borusunun üst ucuna kadar olan ölçüdür. Sele yüksekliği orta göbek merkezinden selenin üstüne kadardır. Değerler başlangıç önerisidir; üreticinin beden tablosunu da kontrol edin.',
    };
  },
  cases: [
    { in: { bacak: '80', tur: 'yol' }, out: { 'Önerilen kadro boyu': '53,2 cm', 'İnç karşılığı': '20,9 inç', 'Sele yüksekliği (başlangıç)': '70,6 cm' } },
    { in: { bacak: '80', tur: 'dag' }, out: { 'Önerilen kadro boyu': '45,9 cm', 'İnç karşılığı': '18,1 inç' } },
    { in: { bacak: '85', tur: 'trekking' }, out: { 'Önerilen kadro boyu': '56,1 cm', 'Uygun aralık': '55,1 – 57,1 cm' } },
    { in: { bacak: '74', tur: 'sehir' }, out: { 'Önerilen kadro boyu': '50,7 cm', 'İnç karşılığı': '20 inç' } },
    { in: { bacak: '90', tur: 'yol' }, out: { 'Önerilen kadro boyu': '59,9 cm', 'Sele yüksekliği (başlangıç)': '79,5 cm' } },
    { in: { bacak: '100', tur: 'dag' }, out: { 'Önerilen kadro boyu': '57,4 cm', 'İnç karşılığı': '22,6 inç' } },
    { in: { bacak: '', tur: 'yol' }, error: true },
    { in: { bacak: '180', tur: 'yol' }, error: true },
  ],
  howto: [
    "Ayakkabılarınızı çıkarın, sırtınızı duvara verin ve ayaklarınızı 15–20 cm açın. Bacak aranıza sırtı yukarı bakacak şekilde bir kitap yerleştirip seleye oturur gibi hafifçe yukarı bastırın.",
    "Kitabın üst kenarını duvarda işaretleyin ve işaretten yere olan mesafeyi santimetre olarak ölçün. Bu değer iç bacak boyunuzdur; pantolon iç dikiş boyu ile aynı şey değildir.",
    "Ölçtüğünüz değeri 'İç bacak boyu' alanına yazın ve almayı düşündüğünüz bisiklet türünü seçin.",
    "'Hesapla' düğmesine basın. Önerilen kadro boyunu santimetre ve inç olarak, kabul edilebilir aralığı ve başlangıç sele yüksekliğini göreceksiniz.",
    "Sonucu, bakmakta olduğunuz modelin beden tablosuyla karşılaştırın; iki beden arasında kalırsanız aşağıdaki bölümdeki önerilere göre karar verin.",
  ],
  sections: [
    { h: 'Kadro boyu neden boya değil iç bacak boyuna göre seçilir?', p: [
      "Aynı boydaki iki kişinin bacak ve gövde oranı birbirinden oldukça farklı olabilir. 175 cm boyundaki bir sürücünün iç bacak boyu 78 cm de olabilir, 85 cm de. Bisiklette pedal çevirirken bacağın ne kadar açıldığını ve sürücünün üst borunun üzerinde rahatça durup duramayacağını belirleyen ölçü boy değil, iç bacak boyudur. Bu nedenle beden tablolarındaki boy aralıkları yalnızca kaba bir fikir verir; doğru seçim için kasıktan yere ölçülen değer kullanılır.",
      "Kadro boyu denildiğinde klasik olarak sele borusunun uzunluğu kastedilir: orta göbeğin (pedal kollarının bağlandığı mil) merkezinden sele borusunun üst ucuna kadar olan mesafe. Yol bisikletlerinde bu ölçü genellikle santimetre, dağ bisikletlerinde inç olarak verilir. Bu sayfadaki araç her iki birimi de gösterir.",
    ] },
    { h: 'Hesaplama formülü ve katsayılar', p: [
      "Araç, bisikletçiler arasında yıllardır kullanılan basit çarpanlarla çalışır: <strong>kadro boyu = iç bacak boyu × katsayı</strong>. Katsayı bisikletin türüne göre değişir, çünkü her türde sürüş pozisyonu ve kadro geometrisi farklıdır.",
    ], ul: [
      "<strong>Yol bisikleti:</strong> iç bacak × 0,665",
      "<strong>Dağ bisikleti:</strong> iç bacak × 0,574 (sonuç santimetredir; inç için 2,54'e bölünür)",
      "<strong>Trekking / tur bisikleti:</strong> iç bacak × 0,66",
      "<strong>Şehir bisikleti:</strong> iç bacak × 0,685",
      "<strong>Sele yüksekliği:</strong> iç bacak × 0,883 (orta göbek merkezinden sele üstüne)",
    ] },
    { h: 'Çözümlü örnek', p: [
      "İç bacak boyu 80 cm olan bir sürücü yol bisikleti alacak olsun. Kadro boyu 80 × 0,665 = 53,2 cm bulunur; bu da 53,2 ÷ 2,54 = 20,9 inç eder. Piyasadaki yol kadroları çoğunlukla 2 cm aralıklarla üretildiği için bu sürücü 52 ya da 54 numaralı kadroya bakmalıdır. Sele yüksekliği için başlangıç değeri 80 × 0,883 = 70,6 cm olur.",
      "Aynı kişi dağ bisikleti alacaksa hesap 80 × 0,574 = 45,9 cm, yani 18,1 inç verir. Dağ bisikletlerinde 17–18 inç kadrolar genellikle orta (M) beden olarak satılır. Dağ bisikleti kadrosunun yol bisikletine göre belirgin biçimde küçük çıkması hata değildir: arazide bisikletin üzerinde hareket edebilmek ve üst boruyla kasık arasında daha fazla boşluk bırakmak için kadro kısa tutulur.",
    ] },
    { h: 'İki beden arasında kalırsanız', p: [
      "Hesap sonucu çoğu zaman üretilen iki kadro boyunun ortasına düşer. Araç bu yüzden sonucun bir santimetre altını ve üstünü 'uygun aralık' olarak gösterir. Karar verirken kol ve gövde uzunluğunuzu ve sürüş tarzınızı düşünün. Gövdesi ve kolları uzun olan sürücüler büyük bedende daha rahat eder; bacakları uzun ama gövdesi kısa olanlar küçük bedeni seçip sele borusunu biraz daha yukarı çıkarabilir.",
      "Daha atak, çevik bir sürüş isteyenler küçük kadroyu; uzun yolda dengeli ve rahat bir pozisyon isteyenler büyük kadroyu tercih eder. Küçük bir kadro uzun gidon boğazı ve yüksek sele borusuyla bir ölçüde büyütülebilir, fazla büyük bir kadroyu küçültmek ise mümkün değildir. Kararsız kaldığınızda küçük olanı almak genellikle daha güvenlidir.",
    ] },
    { h: 'Üst boru boşluğu ve güvenlik kontrolü', p: [
      "Kadro boyunu hesapladıktan sonra bisikletin üzerine çıkıp basit bir kontrol yapın. İki ayağınız yerde, üst borunun üzerinde dururken kasığınızla boru arasında yol ve şehir bisikletlerinde yaklaşık 2–3 cm, dağ bisikletlerinde 5 cm ve üzeri boşluk kalmalıdır. Bu boşluk ani duruşlarda yaralanmayı önler. Eğimli üst borulu modern kadrolarda boşluk zaten fazladır; bu durumda kararı sele yüksekliği ve gidona uzanma mesafesi belirler.",
      "Sele yüksekliğini ayarladıktan sonra pedal en alt noktadayken dizinizin hafifçe bükülü kalması gerekir. Diz tam kilitleniyorsa sele yüksek, belirgin biçimde kırık kalıyorsa alçaktır. Kalçanız pedal çevirirken sağa sola sallanıyorsa seleyi birkaç milimetre indirin.",
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      "Bu hesap klasik, yatay ya da yataya yakın üst borulu kadrolar için geliştirilmiş katsayılara dayanır. Günümüzde birçok üretici kadrolarını S, M, L gibi harflerle ve kendi geometrisine göre adlandırır; aynı '54' etiketi iki farklı markada farklı sürüş hissi verebilir. Bu nedenle sonucu kesin bir beden olarak değil, mağazaya gitmeden önce elinizde bulunması gereken bir başlangıç değeri olarak kullanın.",
      "Araç yetişkin bisikletleri içindir. Çocuk bisikletlerinde beden kadroya göre değil jant çapına göre (12, 16, 20, 24 inç gibi) seçilir. Katlanır bisikletler, BMX ve elektrikli kargo bisikletleri de bu katsayıların kapsamı dışındadır. Bel, diz ya da boyun şikâyetiniz varsa ya da uzun mesafe yarışlarına hazırlanıyorsanız profesyonel bir bisiklet ayarı (bike fit) yaptırmanız daha doğru olur.",
    ] },
  ],
  faq: [
    ["İç bacak boyu nasıl ölçülür?", "Ayakkabısız olarak duvara yaslanın, bacak aranıza bir kitabı sırtı yukarı gelecek şekilde yerleştirip kasığınıza hafifçe bastırın. Kitabın üst kenarından yere kadar olan mesafe iç bacak boyunuzdur. Ölçümü iki üç kez tekrarlayıp ortalamasını almak hatayı azaltır."],
    ["Boyuma göre kadro seçebilir miyim?", "Boy yalnızca kaba bir tahmin verir, çünkü bacak ve gövde oranı kişiden kişiye değişir. Aynı boydaki iki kişinin iç bacak boyu arasında 6–7 cm fark olabilir ve bu, bir tam kadro bedeni anlamına gelir. Doğru sonuç için iç bacak boyunu ölçmeniz gerekir."],
    ["Dağ bisikleti kadrosu neden inç ile verilir?", "Dağ bisikleti ABD kökenli bir tür olduğu için kadro ölçüleri geleneksel olarak inç ile ifade edilir. Araç dağ bisikleti için sonucu hem santimetre hem inç olarak gösterir; 1 inç 2,54 santimetredir."],
    ["Jant boyu ile kadro boyu aynı şey mi?", "Hayır. 26, 27,5 ya da 29 inç gibi değerler tekerleğin çapını anlatır; kadro boyu ise sele borusunun uzunluğudur. Aynı 29 jantlı bisiklet, küçükten büyüğe birkaç farklı kadro boyunda üretilir."],
    ["Sele yüksekliği için 0,883 katsayısı kesin midir?", "Hayır, bu yalnızca iyi bir başlangıç noktasıdır. Ayakkabı tabanı kalınlığı, pedal türü, pedal kolu uzunluğu ve esneklik gibi etkenler birkaç milimetrelik düzeltme gerektirebilir. Değeri ayarladıktan sonra kısa bir sürüşle dizinizin ve kalçanızın rahatlığını kontrol edin."],
    ["Kadınlar için hesap farklı mı?", "Formül aynıdır, çünkü hesap doğrudan iç bacak boyuna dayanır. Kadınlara özel kadrolarda genellikle üst boru daha kısa, gidon daha dar tutulur; yani fark kadro boyunda değil, uzanma mesafesi ve temas noktalarındadır."],
    ["Hesaplanan değer mağazadaki bedenlerle uyuşmuyorsa ne yapmalıyım?", "Üreticinin kendi beden tablosuna bakın ve mümkünse bisikleti deneyin. Eğimli üst borulu kadrolarda etikette yazan değer gerçek sele borusu uzunluğundan farklı olabilir. Araçtaki sonuç, hangi bedenleri denemeniz gerektiğini daraltmanıza yardımcı olur."],
    ["Girdiğim ölçüler kaydediliyor mu?", "Hayır. Hesaplama tamamen tarayıcınızda yapılır; yazdığınız iç bacak boyu hiçbir sunucuya gönderilmez ve saklanmaz."],
  ],
  related: ['bisiklet-vites-orani-hesapla', 'bisiklet-hiz-kadans-hesapla', 'bisiklet-kalori-hesapla', 'beden-olcusu-bul', 'cm-inc-cevir'],
};
