export default {
  slug: 'kedi-mama-miktari-hesapla',
  title: 'Kedi Mama Miktarı Hesaplama',
  h1Tail: 'günlük gram ve kalori',
  pageTitle: "Kedi Mama Miktarı Hesaplama – Günlük Kaç Gram Mama Verilmeli?",
  description: "Kedinizin kilosuna, yaşam dönemine ve mamanın enerji değerine göre günlük kalori ihtiyacını, verilecek mama gramajını ve öğün başına miktarı hesaplayın.",
  card: "Kedinizin kilosuna ve durumuna göre günlük kalori ihtiyacını ve verilecek mama miktarını gram olarak hesaplayın.",
  category: 'gunluk',
  keywords: ['kedi mama miktarı', 'kedi günde kaç gram mama yer', 'kedi kalori ihtiyacı', 'kedi mama hesaplama', 'yavru kedi mama miktarı', 'kısır kedi mama gramajı', 'kedi öğün miktarı'],
  lead: "Kedinizin ağırlığını, yaşam dönemini ve mama paketinde yazan enerji değerini girin. Araç, veteriner beslenmesinde kullanılan <strong>dinlenme enerji ihtiyacı</strong> formülüyle günlük kaloriyi ve buna karşılık gelen mama gramajını hesaplar.",
  button: 'Hesapla',
  inputs: [
    { id: 'kilo', label: 'Kedinin ağırlığı (kg)', type: 'number', placeholder: 'Örn. 4' },
    { id: 'durum', label: 'Yaşam dönemi / durum', type: 'select', options: [
      ['kisir', 'Kısırlaştırılmış yetişkin'],
      ['normal', 'Kısırlaştırılmamış yetişkin'],
      ['hareketsiz', 'Hareketsiz / kiloya yatkın yetişkin'],
      ['zayiflama', 'Kilo vermesi gereken (ideal kiloyu yazın)'],
      ['yavru1', 'Yavru (4 aya kadar)'],
      ['yavru2', 'Yavru (4–12 ay)'],
    ] },
    { id: 'enerji', label: 'Mamanın enerjisi (kcal/100 g)', type: 'number', value: '380', hint: 'Paketteki metabolik enerji değeri. Kuru mamada çoğunlukla 340–420, yaş mamada 70–120 arasındadır.' },
    { id: 'ogun', label: 'Günlük öğün sayısı', type: 'number', value: '2' },
  ],
  compute(v, h) {
    const kg = h.pos(v.kilo, 'Kedinin ağırlığı');
    if (kg > 20) h.err('Kedinin ağırlığı 20 kg\'dan büyük olamaz. Ağırlığı kilogram olarak yazdığınızdan emin olun (örn. 4,5).');
    const e = h.pos(v.enerji, 'Mamanın enerjisi');
    if (e < 20 || e > 700) h.err('Mamanın enerjisi 20 ile 700 kcal/100 g arasında olmalı. Paketteki değer kcal/kg ise 10\'a bölerek yazın.');
    const ogun = h.posint(v.ogun, 'Günlük öğün sayısı');
    if (ogun > 12) h.err('Günlük öğün sayısı en fazla 12 olabilir.');
    const kats = { kisir: 1.2, normal: 1.4, hareketsiz: 1.0, zayiflama: 0.8, yavru1: 2.5, yavru2: 2.0 };
    const k = kats[v.durum] || 1.2;
    const rer = 70 * Math.pow(kg, 0.75);
    const kcal = rer * k;
    const gram = kcal / e * 100;
    return {
      rows: [
        ['Günlük mama miktarı', h.fmt(gram, 0) + ' g'],
        ['Öğün başına', h.fmt(gram / ogun, 0) + ' g'],
        ['Günlük enerji ihtiyacı', h.fmt(kcal, 0) + ' kcal'],
        ['Dinlenme enerji ihtiyacı (RER)', h.fmt(rer, 0) + ' kcal'],
        ['Kullanılan çarpan', '× ' + h.fmt(k, 1)],
      ],
      note: 'Sonuç ortalama bir tahmindir; kediden kediye yüzde 20\'ye varan fark olabilir. Kilosunu iki üç haftada bir tartıp miktarı ayarlayın. Hastalık, gebelik ve emzirme dönemlerinde veteriner hekime danışın.',
    };
  },
  cases: [
    { in: { kilo: '4', durum: 'kisir', enerji: '380', ogun: '2' }, out: { 'Günlük mama miktarı': '63 g', 'Öğün başına': '31 g', 'Günlük enerji ihtiyacı': '238 kcal', 'Dinlenme enerji ihtiyacı (RER)': '198 kcal' } },
    { in: { kilo: '16', durum: 'hareketsiz', enerji: '400', ogun: '4' }, out: { 'Günlük enerji ihtiyacı': '560 kcal', 'Günlük mama miktarı': '140 g', 'Öğün başına': '35 g' } },
    { in: { kilo: '1', durum: 'yavru1', enerji: '400', ogun: '4' }, out: { 'Günlük enerji ihtiyacı': '175 kcal', 'Günlük mama miktarı': '44 g', 'Öğün başına': '11 g' } },
    { in: { kilo: '4', durum: 'normal', enerji: '90', ogun: '3' }, out: { 'Günlük enerji ihtiyacı': '277 kcal', 'Günlük mama miktarı': '308 g' } },
    { in: { kilo: '1', durum: 'zayiflama', enerji: '350', ogun: '1' }, out: { 'Günlük enerji ihtiyacı': '56 kcal', 'Günlük mama miktarı': '16 g' } },
    { in: { kilo: '4', durum: 'yavru2', enerji: '380', ogun: '3' }, out: { 'Günlük enerji ihtiyacı': '396 kcal', 'Günlük mama miktarı': '104 g', 'Öğün başına': '35 g' } },
    { in: { kilo: '0', durum: 'kisir', enerji: '380', ogun: '2' }, error: true },
    { in: { kilo: '4', durum: 'kisir', enerji: '3800', ogun: '2' }, error: true },
  ],
  howto: [
    "Kedinizi tartın. Evde en kolay yol, önce kendinizi sonra kediyle birlikte kendinizi tartıp aradaki farkı almaktır. Ağırlığı kilogram olarak yazın.",
    "Kedinizin durumuna en yakın seçeneği işaretleyin. Kilo vermesi gereken kedilerde mevcut kiloyu değil, veteriner hekimin belirlediği ideal kiloyu girin.",
    "Mama paketinin arkasındaki 'metabolik enerji' değerini bulun ve 100 gramdaki kilokalori olarak yazın. Paket kcal/kg veriyorsa 10'a bölün (3800 kcal/kg = 380 kcal/100 g).",
    "Günde kaç öğün verdiğinizi yazıp 'Hesapla' düğmesine basın. Günlük toplam gramajı ve öğün başına düşen miktarı göreceksiniz.",
    "Mamayı mutfak terazisiyle tartın; ölçü kabıyla verilen miktar gerçek gramajdan belirgin biçimde sapabilir.",
  ],
  sections: [
    { h: 'Hesaplama nasıl yapılır?', p: [
      "Kedilerin enerji ihtiyacı vücut ağırlığıyla doğru orantılı artmaz; küçük hayvanlar kilogram başına daha fazla enerji harcar. Bu yüzden veteriner beslenmesinde ağırlığın 0,75'inci kuvvetine dayanan bir formül kullanılır: <strong>RER = 70 × (ağırlık)<sup>0,75</sup></strong>. RER (dinlenme enerji ihtiyacı), hayvanın dinlenirken yaşamını sürdürmek için harcadığı günlük kaloridir.",
      "Günlük gerçek ihtiyaç, RER'in yaşam dönemine uygun bir çarpanla çarpılmasıyla bulunur. Ardından bu kalori mamanın enerji yoğunluğuna bölünerek gram cinsinden miktar elde edilir: <strong>günlük mama (g) = günlük kalori ÷ (kcal/100 g) × 100</strong>.",
    ], ul: [
      "Kısırlaştırılmış yetişkin: RER × 1,2",
      "Kısırlaştırılmamış yetişkin: RER × 1,4",
      "Hareketsiz ya da kiloya yatkın yetişkin: RER × 1,0",
      "Kilo vermesi gereken kedi: ideal kilonun RER değeri × 0,8",
      "4 aya kadar yavru: RER × 2,5",
      "4–12 ay arası yavru: RER × 2,0",
    ] },
    { h: 'Çözümlü örnek', p: [
      "4 kilogramlık, kısırlaştırılmış yetişkin bir kedi düşünelim. Önce dinlenme enerjisini buluruz: 4<sup>0,75</sup> yaklaşık 2,83'tür, 70 ile çarpınca RER yaklaşık 198 kcal eder. Kısır yetişkin çarpanı 1,2 olduğundan günlük ihtiyaç 198 × 1,2 = yaklaşık 238 kcal olur.",
      "Mama paketinde 380 kcal/100 g yazıyorsa günlük miktar 238 ÷ 380 × 100 = yaklaşık 63 gramdır. İki öğüne bölündüğünde her öğünde 31 gram civarı mama verilir. Aynı kedi 90 kcal/100 g enerjili yaş mamayla beslenseydi aynı kalori için çok daha fazla gram gerekirdi; yaş mamanın büyük kısmı sudur ve enerji yoğunluğu düşüktür.",
    ] },
    { h: 'Kuru mama, yaş mama ve karışık besleme', p: [
      "Kuru mamalar az su içerdiği için enerji açısından yoğundur; birkaç gramlık fark bile günlük kalorinin önemli bir bölümünü oluşturur. Yaş mamalar ise yüksek oranda su içerir, bu sayede kedinin su alımına katkı sağlar ama aynı kalori için daha büyük porsiyon gerekir.",
      "İki mamayı birlikte veriyorsanız toplam kaloriyi paylaştırın. Örneğin 238 kcal ihtiyacı olan kediye günde 85 gramlık, 90 kcal/100 g değerinde bir yaş mama poşeti veriyorsanız bu yaklaşık 77 kcal eder. Geriye kalan 161 kcal'yi kuru mamadan karşılamak için aracı kuru mamanın enerji değeriyle çalıştırıp çıkan gramajı aynı oranda azaltabilirsiniz: 161 ÷ 380 × 100 = yaklaşık 42 gram kuru mama.",
      "Ödül mamaları da hesaba dahildir. Genel öneri, ödüllerin günlük kalorinin onda birini geçmemesidir; ödül verdiğiniz günlerde ana öğünü o kadar azaltın.",
    ] },
    { h: 'Paketteki tabloyla sonuç neden farklı çıkabilir?', p: [
      "Mama paketlerindeki besleme tabloları geniş bir kedi topluluğunun ortalamasına göre hazırlanır ve çoğu zaman aralık olarak verilir. Araçtaki hesap ise seçtiğiniz yaşam dönemine göre tek bir değer üretir. İki sonuç arasında fark görmeniz olağandır. Hangi değeri kullanırsanız kullanın, belirleyici olan kedinizin zaman içindeki kilo değişimidir.",
      "Kedinizi iki üç haftada bir aynı koşullarda tartın. Kilo alıyorsa günlük miktarı yüzde 10 kadar azaltın, istenmeden kilo veriyorsa aynı oranda artırın. Kaburgalar hafif bir yağ tabakasının altında elle hissedilebiliyor ve yukarıdan bakıldığında bel hattı seçiliyorsa kedi genellikle ideal kilosundadır.",
    ] },
    { h: 'Kısırlaştırma ve kilo kontrolü', p: [
      "Kısırlaştırma sonrasında kedilerin enerji ihtiyacı düşerken iştahı artma eğilimindedir. Bu yüzden operasyondan sonra aynı miktarda mama vermeye devam etmek kilo artışına yol açabilir; araçta kısır kediler için daha düşük bir çarpan kullanılmasının nedeni budur.",
      "Fazla kilolu bir kediyi zayıflatırken hesabı mevcut kiloya göre değil, hedeflenen ideal kiloya göre yapmak gerekir. Kedilerde hızlı kilo kaybı karaciğer yağlanması gibi ciddi sorunlara yol açabildiği için zayıflama programı mutlaka veteriner hekim gözetiminde yürütülmelidir. Araç bu durumda yalnızca hekimle konuşurken elinizde bulunacak bir başlangıç değeri verir.",
    ] },
    { h: 'Önemli uyarı', p: [
      "Bu araç genel bilgilendirme amaçlıdır ve veteriner hekim muayenesinin yerini tutmaz. Böbrek hastalığı, diyabet, tiroit sorunları gibi durumlarda, gebe ve emziren kedilerde, çok yaşlı kedilerde enerji ve besin ihtiyacı burada kullanılan çarpanlardan farklıdır. Kedinizde iştahsızlık, hızlı kilo kaybı ya da aşırı su içme gibi belirtiler varsa mama miktarını değiştirmek yerine hekime başvurun.",
    ] },
  ],
  faq: [
    ["Yetişkin bir kedi günde kaç gram mama yer?", "Kiloya ve mamanın enerji değerine göre değişir. 4 kg ağırlığındaki kısır bir kedi için günlük ihtiyaç yaklaşık 238 kcal'dir; 380 kcal/100 g enerjili kuru mamada bu yaklaşık 63 grama denk gelir."],
    ["Mamanın enerji değerini pakette bulamıyorum, ne yapmalıyım?", "Değer genellikle 'metabolik enerji' ya da 'ME' başlığı altında kcal/kg olarak yazılır; 10'a bölerek 100 gramdaki karşılığını bulursunuz. Hiç yazmıyorsa üreticinin müşteri hizmetlerinden öğrenebilirsiniz. Tahmini değerle hesap yaparsanız kedinizin kilosunu daha sık takip edin."],
    ["Kediye günde kaç öğün verilmeli?", "Yetişkin kedilerde günlük miktarı iki ya da daha fazla küçük öğüne bölmek yaygın uygulamadır. Yavru kedilerin midesi küçük olduğu için üç dört öğün daha uygundur. Araç toplam miktarı yazdığınız öğün sayısına eşit olarak böler."],
    ["Yavru kediler neden bu kadar fazla kalori alır?", "Büyüme döneminde vücut hem yaşamını sürdürmek hem yeni doku oluşturmak için enerji harcar. Bu nedenle ilk dört ayda dinlenme enerjisinin yaklaşık 2,5 katı, sonraki aylarda yaklaşık 2 katı kullanılır. Yavrular için yavru maması tercih edilmelidir."],
    ["Kilolu kedim için hangi kiloyu yazmalıyım?", "'Kilo vermesi gereken' seçeneğinde mevcut kiloyu değil, ulaşılması istenen ideal kiloyu yazın. İdeal kiloyu veteriner hekiminiz vücut kondisyon skoruna bakarak belirler."],
    ["Ölçü kabı yerine terazi kullanmak şart mı?", "Şart değildir ama önerilir. Mama taneciklerinin boyutu ve kabın doldurulma şekli nedeniyle aynı ölçü kabı her seferinde farklı gramaj verebilir. Birkaç gramlık sapma küçük bir kedide günlük kalorinin önemli bir kısmına karşılık gelir."],
    ["Sonuç kedim için kesin doğru mudur?", "Hayır, ortalama bir tahmindir. Aynı kilodaki iki kedinin gerçek ihtiyacı hareketlilik, yaş ve metabolizma farkı yüzünden belirgin biçimde ayrışabilir. Sonucu başlangıç noktası kabul edip kilo takibiyle düzeltin."],
    ["Girdiğim bilgiler saklanıyor mu?", "Hayır. Hesaplama yalnızca tarayıcınızda çalışır; yazdığınız değerler sunucuya gönderilmez ve kaydedilmez."],
  ],
  related: ['kopek-mama-miktari-hesapla', 'akvaryum-hacmi-hesapla', 'kcal-kj-cevir', 'kg-gram-cevir', 'oran-oranti-hesapla'],
};
