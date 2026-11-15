export default {
  slug: 'cim-tohumu-hesapla',
  title: 'Çim Tohumu Hesaplama',
  h1Tail: 'kaç kilo tohum gerekir?',
  pageTitle: 'Çim Tohumu Hesaplama – Metrekareye Kaç Gram, Kaç Kilo?',
  description: 'Bahçe alanına ve metrekareye atılacak gram miktarına göre gereken çim tohumunu kilogram olarak hesaplayın; fire payını ve alınacak paket sayısını görün.',
  card: 'Alan ve metrekare başına ekim miktarına göre gereken çim tohumunu kilogram ve paket sayısı olarak bulun.',
  category: 'insaat',
  keywords: ['çim tohumu hesaplama', 'metrekareye kaç gram çim tohumu', 'kaç kilo çim tohumu', '100 metrekareye çim tohumu', 'çim ekimi hesaplama', 'çim tohumu miktarı', 'ara ekim tohum miktarı'],
  lead: `Çimlendireceğiniz alanı ve tohum paketinde önerilen ekim sıklığını girin; araç <strong>kaç kilogram çim tohumu</strong> gerektiğini, fire payı eklenmiş miktarı ve seçtiğiniz ambalaj boyuna göre <strong>kaç paket</strong> almanız gerektiğini hesaplar.`,
  button: 'Hesapla',
  inputs: [
    { id: 'alan', label: 'Ekilecek alan (m²)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'siklik', label: 'Ekim sıklığı (g/m²)', type: 'number', value: '40', hint: 'Tohum paketinin üzerindeki önerilen değeri yazın; karışıma göre değişir.' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '10', hint: 'Kuş, rüzgâr, dengesiz serpme ve sonradan yama için ayrılan pay.' },
    { id: 'paket', label: 'Paket ağırlığı (kg)', type: 'number', value: '1' },
  ],
  compute(v, h) {
    const alan = h.pos(v.alan, 'Ekilecek alan');
    const g = h.pos(v.siklik, 'Ekim sıklığı');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const paket = h.pos(v.paket, 'Paket ağırlığı');
    if (fire > 100) h.err('"Fire payı" %100\'den büyük olamaz.');
    const net = alan * g / 1000;
    const toplam = net * (1 + fire / 100);
    const adet = Math.ceil(toplam / paket - 1e-9);
    return {
      rows: [
        ['Gereken tohum (fire dahil)', h.fmt(toplam, 3) + ' kg'],
        ['Firesiz miktar', h.fmt(net, 3) + ' kg'],
        ['Alınacak paket', h.fmt(adet, 0) + ' paket (' + h.fmt(paket, 2) + ' kg\'lık)'],
        ['Satın alınan toplam', h.fmt(adet * paket, 2) + ' kg'],
        ['Artan tohum', h.fmt(adet * paket - toplam, 3) + ' kg'],
      ],
      note: 'Ekim sıklığı tohum karışımına göre değişir; paketteki üretici önerisini esas alın. Ekimi iki çapraz geçişte, miktarı ikiye bölerek yapmak daha dengeli sonuç verir.',
    };
  },
  cases: [
    { in: { alan: '100', siklik: '40', fire: '10', paket: '1' }, out: { 'Gereken tohum (fire dahil)': '4,4 kg', 'Firesiz miktar': '4 kg', 'Alınacak paket': '5 paket (1 kg\'lık)', 'Artan tohum': '0,6 kg' } },
    { in: { alan: '250', siklik: '50', fire: '0', paket: '5' }, out: { 'Gereken tohum (fire dahil)': '12,5 kg', 'Alınacak paket': '3 paket (5 kg\'lık)', 'Satın alınan toplam': '15 kg' } },
    { in: { alan: '50', siklik: '35', fire: '10', paket: '1' }, out: { 'Gereken tohum (fire dahil)': '1,925 kg', 'Firesiz miktar': '1,75 kg', 'Alınacak paket': '2 paket (1 kg\'lık)' } },
    { in: { alan: '1000', siklik: '40', fire: '5', paket: '10' }, out: { 'Gereken tohum (fire dahil)': '42 kg', 'Firesiz miktar': '40 kg', 'Alınacak paket': '5 paket (10 kg\'lık)' } },
    { in: { alan: '20', siklik: '30', fire: '0', paket: '1' }, out: { 'Gereken tohum (fire dahil)': '0,6 kg', 'Alınacak paket': '1 paket (1 kg\'lık)', 'Artan tohum': '0,4 kg' } },
    { in: { alan: '100', siklik: '20', fire: '0', paket: '0,5' }, out: { 'Gereken tohum (fire dahil)': '2 kg', 'Alınacak paket': '4 paket (0,5 kg\'lık)', 'Artan tohum': '0 kg' } },
    { in: { alan: '0', siklik: '40' }, error: true },
    { in: { alan: '100', siklik: 'kırk' }, error: true },
  ],
  howto: [
    'Çim ekilecek alanı metrekare olarak yazın. Dikdörtgen bahçede en ile boyu çarpın; yolları, tarhları ve yapı oturumunu çıkarın.',
    'Tohum paketinin arkasındaki "ekim normu" ya da "metrekareye atılacak miktar" değerini gram olarak girin.',
    'Fire payını belirleyin. Düz ve rüzgârsız küçük alanlarda %5, eğimli ya da kuşların yoğun olduğu yerlerde %10–15 uygun olur.',
    'Satın alacağınız ambalajın kilogram değerini yazın (500 gramlık kutu için 0,5).',
    '"Hesapla" düğmesine basın; toplam tohum, paket sayısı ve elinizde kalacak miktar listelenir.',
  ],
  sections: [
    { h: 'Çim tohumu miktarı nasıl hesaplanır?', p: [
      `Hesap tek bir çarpmaya dayanır: <strong>tohum (kg) = alan (m²) × ekim sıklığı (g/m²) ÷ 1.000</strong>. Fire payı eklemek için sonuç (1 + fire ÷ 100) ile çarpılır. Paket sayısı, fireli miktarın paket ağırlığına bölünüp yukarı yuvarlanmasıyla bulunur; yarım paket satılmadığı için 4,4 kg ihtiyaç 1 kg'lık paketlerle 5 paket demektir.`,
      `Örnek: 100 m² bir bahçeye metrekareye 40 gram atılacaksa 100 × 40 ÷ 1.000 = 4 kg tohum gerekir. %10 fire payıyla 4,4 kg olur. 1 kg'lık kutulardan 5 adet alındığında 0,6 kg tohum artar; bu artan miktar, çimlenmenin zayıf kaldığı yerleri birkaç hafta sonra yamamak için saklanır.`,
    ] },
    { h: 'Metrekareye kaç gram tohum atılır?', p: [
      `Bu sorunun tek bir cevabı yoktur; miktar tohum karışımındaki türlere göre değişir. İri taneli türlerin ağırlıkça daha fazla, çok ince taneli türlerin daha az atılması gerekir, çünkü önemli olan gram değil metrekareye düşen tohum sayısıdır. Piyasadaki bahçe karışımlarında paket üzerinde çoğunlukla 30–50 g/m² aralığında bir değer önerildiği görülür; araçtaki 40 g/m² varsayılanı bu aralığın ortasıdır.`,
      `En doğru değer, elinizdeki paketin üzerinde üreticinin yazdığı ekim normudur. Paketi aldıktan sonra o değeri "Ekim sıklığı" alanına yazıp hesabı yenileyin. Var olan çimi sıklaştırmak için yapılan <strong>ara ekimde</strong> (üstten tohumlama) genellikle yeni ekimdeki miktarın yaklaşık yarısı kullanılır.`,
    ] },
    { h: 'Fazla ya da az tohum atmanın sonuçları', p: [
      `Tohumu bol atmak daha gür çim anlamına gelmez. Çok sık çimlenen fideler ışık, su ve besin için birbiriyle yarışır; zayıf ve ince kalır, mantar hastalıklarına açık hale gelir. Az tohum atıldığında ise aralar boş kalır, bu boşlukları yabani otlar doldurur ve çim örtüsünün kapanması aylar sürer. Paket üzerindeki norma yakın kalmak ve tohumu eşit dağıtmak, miktarı artırmaktan çok daha etkilidir.`,
      `Eşit dağıtım için bilinen yöntem, toplam tohumu ikiye bölmektir: yarısı bahçe boyunca bir yönde, diğer yarısı buna dik yönde serpilir. Geniş alanlarda alanı iplerle eşit parsellere ayırıp her parsele düşen tohumu ayrı tartmak, sonunda tohumun yetmemesi ya da artması sorununu önler.`,
    ] },
    { h: 'Alanı doğru ölçmek', ul: [
      '<strong>Dikdörtgen:</strong> en × boy. 8 m × 12 m bir bahçe 96 m² eder.',
      '<strong>L biçimli bahçe:</strong> iki dikdörtgene ayırın, alanlarını toplayın.',
      '<strong>Üçgen köşe:</strong> taban × yükseklik ÷ 2.',
      '<strong>Daire:</strong> π × yarıçap²; çapı 6 m olan dairesel bir alan yaklaşık 28,3 m²\'dir.',
      '<strong>Düşülecekler:</strong> yürüyüş yolu, veranda, çiçek tarhı, havuz, ağaç dipleri ve yapı oturumu.',
      '<strong>Tapu alanına dikkat:</strong> parselin tamamı değil, yalnızca fiilen çim ekilecek yüzey hesaba girer.',
    ] },
    { h: 'Ekim öncesi ve sonrası kısa notlar', p: [
      `Tohumun tutması miktardan çok zemin hazırlığına bağlıdır. Toprak taş ve yabani ot köklerinden temizlenir, tırmıkla inceltilip düzeltilir ve hafifçe sıkıştırılır. Tohum serpildikten sonra üzeri ince bir kapak toprağı ya da elenmiş kompostla örtülür ve silindirle bastırılır; böylece tohum toprağa temas eder ve kuşlara karşı korunur. Çimlenme tamamlanana kadar toprak yüzeyi sürekli nemli tutulur, ancak su birikintisi oluşturulmaz.`,
      `Ekim için genellikle ilkbahar ve sonbaharın ılık dönemleri uygun görülür; yaz sıcağında ve don riskinde çimlenme zayıf kalır. Bölgenizin iklimine uygun karışım ve doğru zaman için yerel bir fidanlığa ya da ziraat mühendisine danışmak iyi sonuç almanın en kısa yoludur. Artan tohumu serin, kuru ve karanlık bir yerde ağzı kapalı saklayın; çimlenme gücü zamanla azalır.`,
    ] },
    { h: 'Sınırlar', p: [
      `Araç bir aritmetik hesaplayıcıdır: tohum türü, toprak analizi, sulama düzeni ya da iklim hakkında öneride bulunmaz ve çimlenme oranını garanti etmez. Rulo (hazır) çim için tohum değil metrekare hesabı gerekir; o durumda alanınızı %5 kadar kesim payıyla sipariş etmeniz yeterlidir. Spor sahası gibi profesyonel uygulamalarda ekim normları farklıdır ve uzman önerisiyle belirlenir.`,
    ] },
  ],
  faq: [
    ['100 metrekareye kaç kilo çim tohumu gerekir?', 'Metrekareye 40 gram üzerinden 4 kg, 30 gram üzerinden 3 kg, 50 gram üzerinden 5 kg gerekir. %10 fire payıyla bu değerler sırasıyla 4,4 kg, 3,3 kg ve 5,5 kg olur.'],
    ['1 kilo çim tohumu kaç metrekareye yeter?', '1.000 gramı metrekareye atılacak grama bölün. 40 g/m² için 25 m², 30 g/m² için yaklaşık 33 m², 50 g/m² için 20 m² alana yeter.'],
    ['Fire payını neden eklemeliyim?', 'Serpme sırasında tohumun bir kısmı alan dışına düşer, bir kısmını kuşlar ve karıncalar taşır, yağmur eğimli yerlerde sürükler. Ayrıca çimlenmeyen bölgeleri yamamak için elde bir miktar tohum bulunması işinizi kolaylaştırır.'],
    ['Ara ekim için ekim sıklığını nasıl girmeliyim?', 'Paketinizde ara ekim için ayrı bir değer varsa onu, yoksa yeni ekim değerinin yaklaşık yarısını yazın. Örneğin yeni ekim için 40 g/m² önerilen bir karışımda ara ekim için 20 g/m² girebilirsiniz.'],
    ['Paket ağırlığını gram olarak yazabilir miyim?', 'Alan kilogram bekler. 500 gramlık kutu için 0,5, 250 gramlık paket için 0,25 yazın.'],
    ['Daha fazla tohum atarsam çim daha sık olur mu?', 'Hayır. Aşırı sık ekimde fideler birbirini bastırır, zayıf kalır ve hastalığa yatkın olur. Önerilen normda kalıp tohumu eşit dağıtmak daha sağlıklı bir örtü verir.'],
    ['Rulo çim için bu hesap kullanılır mı?', 'Hayır. Rulo çim metrekareyle satılır; alanınıza kesim payı olarak yaklaşık %5 ekleyerek sipariş verirsiniz. Bu araç yalnızca tohumla ekim içindir.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz alan ve miktar bilgileri sunucuya gönderilmez.'],
  ],
  related: ['bahce-topragi-hesapla', 'cit-hesapla', 'kum-cakil-hesapla', 'yagmur-suyu-hasadi-hesapla'],
};
