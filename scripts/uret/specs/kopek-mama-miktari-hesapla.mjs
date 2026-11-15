export default {
  slug: 'kopek-mama-miktari-hesapla',
  title: 'Köpek Mama Miktarı Hesaplama',
  h1Tail: 'günlük gram ve kalori',
  pageTitle: "Köpek Mama Miktarı Hesaplama – Günlük Kaç Gram Mama Verilmeli?",
  description: "Köpeğinizin kilosuna, yaşına ve hareketliliğine göre günlük kalori ihtiyacını ve mamanın enerji değerine göre verilecek gramajı öğün öğün hesaplayın.",
  card: "Köpeğinizin kilosuna ve hareketliliğine göre günlük kalori ihtiyacını ve mama gramajını öğün başına hesaplayın.",
  category: 'gunluk',
  keywords: ['köpek mama miktarı', 'köpek günde kaç gram mama yer', 'köpek kalori ihtiyacı', 'yavru köpek mama miktarı', 'köpek mama hesaplama', 'köpek öğün gramajı', 'kısır köpek mama miktarı'],
  lead: "Köpeğinizin ağırlığını, yaşam dönemini ve mamanın paketinde yazan enerji değerini girin. Araç, <strong>70 × kg<sup>0,75</sup></strong> formülüne dayanan günlük enerji ihtiyacını ve buna karşılık gelen mama miktarını gram olarak verir.",
  button: 'Hesapla',
  inputs: [
    { id: 'kilo', label: 'Köpeğin ağırlığı (kg)', type: 'number', placeholder: 'Örn. 16' },
    { id: 'durum', label: 'Yaşam dönemi / hareketlilik', type: 'select', options: [
      ['kisir', 'Kısırlaştırılmış yetişkin'],
      ['normal', 'Kısırlaştırılmamış yetişkin'],
      ['hareketsiz', 'Hareketsiz / kiloya yatkın yetişkin'],
      ['zayiflama', 'Kilo vermesi gereken (ideal kiloyu yazın)'],
      ['aktif', 'Çok hareketli / çalışan köpek'],
      ['yavru1', 'Yavru (4 aya kadar)'],
      ['yavru2', 'Yavru (4 aydan yetişkinliğe)'],
    ] },
    { id: 'enerji', label: 'Mamanın enerjisi (kcal/100 g)', type: 'number', value: '360', hint: 'Paketteki metabolik enerji değeri. kcal/kg olarak verilmişse 10\'a bölün.' },
    { id: 'ogun', label: 'Günlük öğün sayısı', type: 'number', value: '2' },
  ],
  compute(v, h) {
    const kg = h.pos(v.kilo, 'Köpeğin ağırlığı');
    if (kg > 120) h.err('Köpeğin ağırlığı 120 kg\'dan büyük olamaz. Ağırlığı kilogram olarak yazdığınızdan emin olun.');
    const e = h.pos(v.enerji, 'Mamanın enerjisi');
    if (e < 20 || e > 700) h.err('Mamanın enerjisi 20 ile 700 kcal/100 g arasında olmalı. Paketteki değer kcal/kg ise 10\'a bölerek yazın.');
    const ogun = h.posint(v.ogun, 'Günlük öğün sayısı');
    if (ogun > 12) h.err('Günlük öğün sayısı en fazla 12 olabilir.');
    const kats = { kisir: 1.6, normal: 1.8, hareketsiz: 1.4, zayiflama: 1.0, aktif: 2.5, yavru1: 3.0, yavru2: 2.0 };
    const k = kats[v.durum] || 1.6;
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
      note: 'Sonuç ortalama bir tahmindir; ırk, yaş ve hareketliliğe göre gerçek ihtiyaç belirgin biçimde değişebilir. Köpeğinizi düzenli tartıp miktarı ayarlayın. Hastalık, gebelik ve emzirme dönemlerinde veteriner hekime danışın.',
    };
  },
  cases: [
    { in: { kilo: '16', durum: 'kisir', enerji: '350', ogun: '2' }, out: { 'Günlük mama miktarı': '256 g', 'Öğün başına': '128 g', 'Günlük enerji ihtiyacı': '896 kcal', 'Dinlenme enerji ihtiyacı (RER)': '560 kcal' } },
    { in: { kilo: '1', durum: 'yavru1', enerji: '400', ogun: '4' }, out: { 'Günlük enerji ihtiyacı': '210 kcal', 'Günlük mama miktarı': '53 g', 'Öğün başına': '13 g' } },
    { in: { kilo: '16', durum: 'normal', enerji: '360', ogun: '2' }, out: { 'Günlük enerji ihtiyacı': '1.008 kcal', 'Günlük mama miktarı': '280 g', 'Öğün başına': '140 g' } },
    { in: { kilo: '81', durum: 'zayiflama', enerji: '300', ogun: '3' }, out: { 'Günlük enerji ihtiyacı': '1.890 kcal', 'Günlük mama miktarı': '630 g', 'Öğün başına': '210 g' } },
    { in: { kilo: '16', durum: 'aktif', enerji: '400', ogun: '2' }, out: { 'Günlük enerji ihtiyacı': '1.400 kcal', 'Günlük mama miktarı': '350 g' } },
    { in: { kilo: '16', durum: 'hareketsiz', enerji: '392', ogun: '1' }, out: { 'Günlük enerji ihtiyacı': '784 kcal', 'Günlük mama miktarı': '200 g' } },
    { in: { kilo: '10', durum: 'yavru2', enerji: '360', ogun: '3' }, out: { 'Dinlenme enerji ihtiyacı (RER)': '394 kcal', 'Günlük enerji ihtiyacı': '787 kcal', 'Günlük mama miktarı': '219 g' } },
    { in: { kilo: '-3', durum: 'kisir', enerji: '360', ogun: '2' }, error: true },
    { in: { kilo: '16', durum: 'kisir', enerji: '360', ogun: '0' }, error: true },
  ],
  howto: [
    "Köpeğinizi tartın ve ağırlığını kilogram olarak yazın. Küçük ırklarda kucağınıza alıp tartılmak, büyük ırklarda veteriner kliniğindeki baskülü kullanmak pratik olur.",
    "Yaşam dönemi listesinden köpeğinize en uygun seçeneği işaretleyin. Zayıflama programındaki köpekler için ideal kiloyu yazmayı unutmayın.",
    "Mama paketindeki metabolik enerji değerini 100 gram başına kilokalori olarak girin. 3600 kcal/kg yazan bir mama için 360 yazmalısınız.",
    "Günde kaç öğün verdiğinizi belirtip 'Hesapla' düğmesine basın.",
    "Çıkan günlük gramajı mutfak terazisiyle tartarak verin ve iki üç hafta sonra köpeğinizin kilosunu kontrol edip gerekirse miktarı düzeltin.",
  ],
  sections: [
    { h: 'Köpeklerde enerji ihtiyacı nasıl hesaplanır?', p: [
      "Bir Chihuahua ile bir Kangal'ın mama ihtiyacı kilolarıyla aynı oranda artmaz. 40 kiloluk bir köpek, 4 kiloluk bir köpeğin on katı değil, yaklaşık beş buçuk katı enerji harcar. Bunun nedeni küçük hayvanların vücut yüzeyinin ağırlıklarına oranla daha büyük olması ve daha hızlı ısı kaybetmeleridir. Veteriner beslenmesinde bu ilişkiyi yansıtmak için metabolik ağırlık, yani ağırlığın 0,75'inci kuvveti kullanılır.",
      "Hesap iki adımdır. Önce dinlenme enerji ihtiyacı bulunur: <strong>RER = 70 × (kg)<sup>0,75</sup></strong>. Sonra bu değer köpeğin durumunu yansıtan bir çarpanla çarpılır ve günlük enerji ihtiyacı elde edilir. Son olarak kalori mamanın enerji yoğunluğuna bölünür: <strong>mama (g) = kalori ÷ (kcal/100 g) × 100</strong>.",
    ] },
    { h: 'Araçta kullanılan çarpanlar', ul: [
      "<strong>Kısırlaştırılmış yetişkin:</strong> RER × 1,6",
      "<strong>Kısırlaştırılmamış yetişkin:</strong> RER × 1,8",
      "<strong>Hareketsiz ya da kiloya yatkın:</strong> RER × 1,4",
      "<strong>Kilo vermesi gereken:</strong> ideal kilonun RER değeri × 1,0",
      "<strong>Çok hareketli / çalışan köpek:</strong> RER × 2,5",
      "<strong>4 aya kadar yavru:</strong> RER × 3,0",
      "<strong>4 aydan yetişkinliğe kadar yavru:</strong> RER × 2,0",
    ], p: [
      "Çalışan köpeklerde gerçek ihtiyaç işin yoğunluğuna göre çok geniş bir aralıkta değişir. Araçtaki 2,5 çarpanı düzenli ve yoğun egzersiz yapan köpekler için orta bir değerdir; kızak çeken ya da gün boyu sürü güden köpeklerde ihtiyaç bunun da üzerine çıkabilir.",
    ] },
    { h: 'Çözümlü örnek', p: [
      "16 kilogram ağırlığında, kısırlaştırılmış yetişkin bir köpek alalım. 16'nın 0,75'inci kuvveti tam olarak 8'dir, dolayısıyla RER = 70 × 8 = 560 kcal olur. Kısır yetişkin çarpanı 1,6 ile günlük ihtiyaç 560 × 1,6 = 896 kcal bulunur.",
      "Mamanın enerjisi 350 kcal/100 g ise günlük miktar 896 ÷ 350 × 100 = 256 gramdır. Sabah ve akşam olmak üzere iki öğünde 128'er gram verilir. Aynı köpek kısırlaştırılmamış olsaydı ve 360 kcal/100 g enerjili bir mama yeseydi ihtiyaç 560 × 1,8 = 1.008 kcal, günlük miktar 280 gram olurdu.",
    ] },
    { h: 'Yavru köpeklerde dikkat edilecekler', p: [
      "Yavrular büyüme için yetişkinlerden çok daha fazla enerjiye ihtiyaç duyar; ancak mideleri küçüktür. Bu yüzden günlük miktar üç ya da dört öğüne bölünmelidir. Hesapta yavrunun o günkü ağırlığını kullanın ve her hafta yeniden tartıp miktarı güncelleyin, çünkü ağırlık hızla değişir.",
      "Büyük ve dev ırk yavrularında fazla enerji ve hızlı büyüme, eklem ve kemik gelişimi sorunlarıyla ilişkilendirilir. Bu ırklarda 'daha çok yesin, daha iri olsun' yaklaşımı zararlıdır; büyük ırk yavru maması kullanmak ve büyüme hızını veteriner hekimle birlikte izlemek gerekir. Irkların yetişkinliğe ulaşma yaşı da farklıdır: küçük ırklar bir yaş dolmadan, dev ırklar ise iki yaşa doğru yetişkin beslenmesine geçer.",
    ] },
    { h: 'Sonucu köpeğinize göre ayarlama', p: [
      "Formül ortalama bir köpeği anlatır. Aynı kilodaki iki köpekten biri gün boyu bahçede koşarken diğeri apartman dairesinde yaşıyorsa ihtiyaçları da farklı olur. Soğuk havada dışarıda yaşayan köpekler vücut ısısını korumak için daha fazla enerji harcar. Yaşlı köpeklerde ise hareket azaldığı için ihtiyaç genellikle düşer.",
      "En güvenilir gösterge köpeğinizin vücut kondisyonudur. Kaburgaları elinizle hafif bir baskıyla hissedebilmeli, yukarıdan baktığınızda bel girintisini, yandan baktığınızda karın çekikliğini görebilmelisiniz. Kaburgalar hissedilmiyorsa miktarı yüzde 10 azaltın, gözle belirgin biçimde görünüyorsa aynı oranda artırın ve iki üç hafta sonra yeniden değerlendirin.",
      "Ödül mamaları, çiğneme kemikleri ve sofradan verilen yiyecekler de kaloridir. Eğitim döneminde çok ödül veriyorsanız ana öğünlerden o kadar eksiltin; ödüllerin günlük enerjinin onda birini aşmaması genel bir kuraldır.",
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      "Bu araç bilgilendirme amaçlıdır; veteriner hekim değerlendirmesinin yerini almaz. Gebe ve emziren köpeklerde, böbrek, karaciğer, kalp ya da hormon hastalığı olan hayvanlarda, ameliyat sonrası iyileşme döneminde enerji ve besin ihtiyacı buradaki çarpanlardan farklıdır. Ev yapımı diyetlerde yalnızca kalori değil besin dengesi de önemlidir ve bu hesap onu kapsamaz. Ani kilo değişimi, iştahsızlık ya da halsizlik fark ederseniz mama miktarını değiştirmeden önce hekime başvurun.",
    ] },
  ],
  faq: [
    ["Köpeğim günde kaç gram mama yemeli?", "Kilosuna, hareketliliğine ve mamanın enerji değerine bağlıdır. Örneğin 16 kg ağırlığındaki kısır bir yetişkin köpek günde yaklaşık 896 kcal'ye ihtiyaç duyar; 350 kcal/100 g enerjili mamada bu 256 gram eder."],
    ["Paketteki besleme tablosu ile bu hesap neden farklı?", "Paket tabloları geniş ağırlık aralıkları için ortalama değerler verir ve çoğunlukla hareketlilik ya da kısırlık durumunu ayırmaz. Araç ise seçtiğiniz duruma göre tek bir değer hesaplar. İkisi de başlangıç noktasıdır; son kararı köpeğinizin kilo takibi verir."],
    ["Günde kaç öğün vermeliyim?", "Yetişkin köpeklerde günde iki öğün yaygın uygulamadır. Yavrularda üç dört öğün önerilir. Derin göğüslü büyük ırklarda günlük miktarı tek seferde vermek yerine bölmek ve yemekten hemen sonra yoğun egzersizden kaçınmak tavsiye edilir."],
    ["Kilo vermesi gereken köpek için hangi kiloyu girmeliyim?", "Mevcut kiloyu değil, veteriner hekimin belirlediği ideal kiloyu yazın. Araç bu seçenekte ideal kilonun dinlenme enerjisini günlük hedef olarak alır."],
    ["Yaş mama ya da ev yemeği veriyorsam nasıl hesaplarım?", "Yaş mamanın paketindeki enerji değerini 100 gram başına kcal olarak yazmanız yeterlidir; yaş mamalar su içerdiği için gramaj kuru mamaya göre çok daha yüksek çıkar. Ev yemeklerinde enerji değerini kesin bilmek zordur ve besin dengesi ayrıca planlanmalıdır."],
    ["Irk hesabı etkiler mi?", "Formül doğrudan ağırlığa dayanır, ırk ayrı bir girdi değildir. Yine de bazı ırklar kiloya daha yatkın, bazıları daha hareketlidir. Bu farkı hareketlilik seçeneğiyle ve düzenli kilo takibiyle yansıtabilirsiniz."],
    ["Yaşlı köpeğim için hangi seçeneği kullanmalıyım?", "Hareketi azalmış yaşlı köpeklerde 'hareketsiz / kiloya yatkın' seçeneği genellikle daha uygun bir başlangıçtır. Yaşlı köpeklerde kas kaybı ve eşlik eden hastalıklar da sık görüldüğünden beslenme planını hekiminizle gözden geçirin."],
    ["Yazdığım bilgiler bir yere gönderiliyor mu?", "Hayır. Hesaplama tarayıcınızın içinde yapılır; köpeğinize ait hiçbir bilgi sunucuya iletilmez ya da saklanmaz."],
  ],
  related: ['kedi-mama-miktari-hesapla', 'akvaryum-hacmi-hesapla', 'kcal-kj-cevir', 'kg-gram-cevir', 'kg-pound-cevir'],
};
