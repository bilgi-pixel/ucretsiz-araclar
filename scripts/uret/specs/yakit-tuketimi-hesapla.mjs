export default {
  slug: 'yakit-tuketimi-hesapla',
  title: 'Araç Yakıt Tüketimi (100 km\'de Litre) Hesaplama',
  h1Tail: 'depodan depoya',
  pageTitle: 'Araç Yakıt Tüketimi Hesaplama – 100 km\'de Kaç Litre Yakıyor?',
  description: 'Gidilen kilometreyi ve harcanan yakıtı girin; aracınızın 100 km\'de kaç litre yaktığını, litreyle kaç km gittiğini ve km başına yakıt maliyetini hesaplayın.',
  card: 'Aracınızın 100 km\'de kaç litre yaktığını, bir litreyle kaç km gittiğini ve kilometre başına maliyetini bulun.',
  category: 'gunluk',
  keywords: ['yakıt tüketimi hesaplama', '100 km de kaç litre yakar', 'araç yakıt hesaplama', 'ortalama yakıt tüketimi', 'km başına yakıt maliyeti', 'litre başına km', 'depo doldurma yöntemi'],
  lead: 'İki yakıt alımı arasında gittiğiniz mesafeyi ve depoya giren litreyi yazın; araç ortalama tüketimi <strong>litre/100 km</strong> olarak hesaplasın. Litre fiyatını da girerseniz kilometre başına yakıt maliyetini görürsünüz.',
  button: 'Hesapla',
  inputs: [
    { id: 'km', label: 'Gidilen mesafe (km)', type: 'number', placeholder: 'Örn. 500' },
    { id: 'litre', label: 'Harcanan yakıt (litre)', type: 'number', placeholder: 'Örn. 35' },
    { id: 'fiyat', label: 'Litre fiyatı (TL, isteğe bağlı)', type: 'number', placeholder: 'Örn. 45,50', hint: 'Binlik ayraç kullanmayın ya da 1.500,00 biçiminde yazın.' },
  ],
  compute(v, h) {
    const km = h.pos(v.km, 'Gidilen mesafe');
    const litre = h.pos(v.litre, 'Harcanan yakıt');
    if (km > 1e7) h.err('Gidilen mesafe çok büyük; değeri kontrol edin.');
    const l100 = (litre / km) * 100;
    if (l100 > 200) h.err('Hesaplanan tüketim 100 km\'de 200 litreyi aşıyor; mesafe ve litre değerlerini kontrol edin.');
    const rows = [
      ['100 km\'de tüketim', h.fmt(l100, 2) + ' L/100 km'],
      ['Litre başına yol', h.fmt(km / litre, 2) + ' km/L'],
      ['Mil/galon karşılığı (ABD)', h.fmt(235.214583 / l100, 2) + ' mpg'],
    ];
    if (String(v.fiyat ?? '').trim() !== '') {
      const f = h.pos(v.fiyat, 'Litre fiyatı');
      rows.push(['Kilometre başına yakıt maliyeti', h.para((litre * f) / km)]);
      rows.push(['100 km yakıt maliyeti', h.para(l100 * f)]);
      rows.push(['Toplam yakıt gideri', h.para(litre * f)]);
    }
    return { rows, note: 'Sonuç, girdiğiniz mesafedeki ortalama tüketimdir. Doğru ölçüm için depoyu iki alımda da aynı düzeye kadar doldurun. Maliyet yalnızca yakıtı kapsar.' };
  },
  cases: [
    { in: { km: '500', litre: '35', fiyat: '40' }, out: { '100 km\'de tüketim': '7 L/100 km', 'Litre başına yol': '14,29 km/L', 'Kilometre başına yakıt maliyeti': '2,80 TL', '100 km yakıt maliyeti': '280,00 TL', 'Toplam yakıt gideri': '1.400,00 TL' } },
    { in: { km: '650', litre: '45,5' }, out: { '100 km\'de tüketim': '7 L/100 km', 'Mil/galon karşılığı (ABD)': '33,6 mpg' } },
    { in: { km: '420', litre: '21' }, out: { '100 km\'de tüketim': '5 L/100 km', 'Litre başına yol': '20 km/L', 'Mil/galon karşılığı (ABD)': '47,04 mpg' } },
    { in: { km: '100', litre: '8', fiyat: '50' }, out: { '100 km\'de tüketim': '8 L/100 km', 'Litre başına yol': '12,5 km/L', 'Kilometre başına yakıt maliyeti': '4,00 TL', 'Toplam yakıt gideri': '400,00 TL' } },
    { in: { km: '823', litre: '52,4' }, out: { '100 km\'de tüketim': '6,37 L/100 km', 'Litre başına yol': '15,71 km/L' } },
    { in: { km: '1000', litre: '60' }, out: { '100 km\'de tüketim': '6 L/100 km', 'Litre başına yol': '16,67 km/L' } },
    { in: { km: '0', litre: '35' }, error: true },
    { in: { km: '500', litre: 'abc' }, error: true },
    { in: { km: '10', litre: '50' }, error: true },
  ],
  howto: [
    'Depoyu ağzına kadar doldurun ve gösterge panelindeki günlük kilometre sayacını (trip) sıfırlayın ya da toplam kilometreyi not edin.',
    'Aracı her zamanki gibi kullanın. Bir sonraki yakıt alımında depoyu yine aynı düzeye kadar doldurun.',
    'İkinci alımda pompanın gösterdiği litreyi "Harcanan yakıt" alanına, iki alım arasında gittiğiniz kilometreyi "Gidilen mesafe" alanına yazın.',
    'Maliyeti de görmek istiyorsanız litre fiyatını girin ve "Hesapla" düğmesine basın.',
  ],
  sections: [
    { h: 'Yakıt tüketimi nasıl hesaplanır?', p: [
      'Türkiye\'de ve Avrupa\'da yakıt tüketimi, aracın 100 kilometrede kaç litre yaktığıyla ifade edilir. Formül basittir: <strong>tüketim (L/100 km) = harcanan litre ÷ gidilen kilometre × 100</strong>. Sayı ne kadar küçükse araç o kadar tutumludur.',
      'Aynı bilginin tersi, bir litre yakıtla kaç kilometre gidildiğidir: <strong>km/L = gidilen kilometre ÷ harcanan litre</strong>. İki değer birbirine 100 ÷ değer işlemiyle çevrilir; 5 L/100 km tüketen araç bir litreyle 20 km gider. Araç her iki gösterimi de verir, ayrıca yabancı kaynaklarla karşılaştırma yapabilmeniz için ABD galonu üzerinden mil/galon karşılığını ekler.',
    ] },
    { h: 'Depodan depoya ölçüm yöntemi', p: [
      'Gösterge panelindeki anlık ya da ortalama tüketim değeri bir tahmindir ve gerçek tüketimden sapabilir. En güvenilir ev yöntemi <strong>depodan depoya</strong> ölçümdür. Depo tam doldurulur, kilometre not edilir; bir sonraki alımda depo yeniden tam doldurulur. İkinci alımda depoya giren yakıt, aradaki mesafede harcanan yakıttır.',
      'Yöntemin doğruluğu, deponun iki seferde de aynı düzeye dolmasına bağlıdır. Pompa tabancası ilk kez kendiliğinden attığında durmak ve bunu her seferinde aynı biçimde yapmak yeterlidir. Tek bir depo yanıltıcı olabilir; üç dört deponun toplam litresini toplam kilometreye bölmek çok daha sağlıklı bir ortalama verir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Depoyu doldurup 500 km yol yaptınız ve ikinci alımda depoya 35 litre yakıt girdi. Tüketim 35 ÷ 500 × 100 = <strong>7 L/100 km</strong>, litre başına yol 500 ÷ 35 = <strong>14,29 km</strong> olur.',
      'Litre fiyatı 40 TL ise bu yolculuğun yakıt gideri 35 × 40 = 1.400 TL, kilometre başına yakıt maliyeti 1.400 ÷ 500 = <strong>2,80 TL</strong>, 100 kilometrenin maliyeti ise 280 TL\'dir. Fiyatlar sık değiştiği için alanı kendi ödediğiniz güncel fiyatla doldurun.',
      'Aynı araçla şehir içinde 420 km yerine 300 km gidebildiğiniz bir depoda 21 litre harcadıysanız tüketim 7 L/100 km\'ye çıkar; 420 km gidebildiyseniz 5 L/100 km\'dir. Kullanım koşullarının farkını bu şekilde sayıya dökebilirsiniz.',
    ] },
    { h: 'Tüketimi artıran etkenler', ul: [
      '<strong>Şehir içi dur-kalk</strong>: sık hızlanma ve rölantide bekleme tüketimi belirgin biçimde yükseltir.',
      '<strong>Yüksek hız</strong>: hava direnci hızın karesiyle arttığı için otoyolda hız yükseldikçe tüketim hızla büyür.',
      '<strong>Düşük lastik basıncı</strong>: yuvarlanma direncini artırır. Basıncı üreticinin önerdiği değerde tutmak en kolay tasarruf yöntemidir.',
      '<strong>Klima ve elektrikli yükler</strong>: özellikle şehir içinde ve küçük motorlarda etkisi hissedilir.',
      '<strong>Fazla yük ve tavan bagajı</strong>: ağırlık ve hava direnci tüketimi artırır; kullanılmayan port bagajı sökmek işe yarar.',
      '<strong>Soğuk hava ve kısa mesafeler</strong>: motor çalışma sıcaklığına ulaşana kadar daha fazla yakıt harcar.',
      '<strong>Bakım</strong>: kirli hava filtresi, eskimiş bujiler ve uygun olmayan motor yağı verimi düşürür.',
    ] },
    { h: 'Katalog değeri ile gerçek tüketim neden farklı?', p: [
      'Üreticilerin açıkladığı tüketim değerleri, standart bir test çevriminde, belirli sıcaklık ve yük koşullarında ölçülür. Amaç araçları birbiriyle aynı koşullarda karşılaştırabilmektir; her sürücünün kendi yolunda aynı değeri alacağı anlamına gelmez. Trafik yoğunluğu, sürüş tarzı, arazi yapısı, hava sıcaklığı ve yük gerçek tüketimi katalog değerinin üzerine çıkarabilir. Kendi ölçümünüz, sizin kullanımınız için en doğru veridir.',
    ] },
    { h: 'LPG, dizel ve hibrit araçlarda kullanım', p: [
      'Formül yakıt türünden bağımsızdır. Dizel ve benzinli araçlarda doğrudan kullanılır. LPG\'li araçlarda yalnızca LPG ile gidilen mesafe ve alınan LPG litresi girilmelidir; motor ilk çalıştırmada bir süre benzin kullandığı için küçük bir benzin tüketimi ayrıca oluşur. Şarj edilebilir hibritlerde elektrikle gidilen yol tüketimi olduğundan düşük gösterir; elektrikli araçlarda ise ölçü litre değil kilovatsaattir ve bu araç onlar için uygun değildir.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç, girdiğiniz iki sayının doğru olduğunu varsayar; deponun tam dolmaması, pompanın ölçüm toleransı ve kilometre sayacının sapması sonucu etkiler. Maliyet satırları yalnızca yakıt giderini gösterir; lastik, bakım, sigorta, vergi, otoyol ve değer kaybı gibi kalemler dahil değildir. Sonuçlar bilgilendirme amaçlıdır; araç alım satımı ya da işletme maliyeti gibi mali kararlarda tüm gider kalemlerini ayrıca değerlendirin.',
    ] },
  ],
  faq: [
    ['100 km\'de kaç litre yaktığımı nasıl hesaplarım?', 'Harcadığınız litreyi gittiğiniz kilometreye bölüp 100 ile çarpın. 500 km\'de 35 litre harcadıysanız 35 ÷ 500 × 100 = 7 L/100 km eder. Bu sayfaya iki değeri yazmanız yeterlidir.'],
    ['Bir litre yakıtla kaç kilometre gidilir?', 'Gidilen kilometreyi harcanan litreye bölerek bulunur. 7 L/100 km tüketen bir araç litreyle yaklaşık 14,29 km, 5 L/100 km tüketen araç 20 km gider.'],
    ['Depoyu tam doldurmadan ölçüm yapabilir miyim?', 'Sonuç güvenilir olmaz, çünkü depoda başlangıçta ve sonda ne kadar yakıt olduğu bilinmez. Doğru ölçüm için iki alımda da depoyu aynı düzeye, tabanca ilk attığı ana kadar doldurun.'],
    ['Gösterge panelindeki ortalama tüketim neden farklı çıkıyor?', 'Yol bilgisayarı tüketimi enjeksiyon verilerinden tahmin eder ve araçtan araca değişen bir sapma payı vardır. Depodan depoya ölçüm, gerçekte pompadan aldığınız yakıta dayandığı için daha güvenilirdir.'],
    ['Kilometre başına yakıt maliyeti nasıl bulunur?', 'Harcanan litre, litre fiyatıyla çarpılıp gidilen kilometreye bölünür. 35 litre, 40 TL fiyat ve 500 km için sonuç 2,80 TL\'dir. Litre fiyatı alanını doldurduğunuzda araç bunu kendisi hesaplar.'],
    ['Mil/galon (mpg) değeri ne işe yarar?', 'ABD kaynaklı incelemelerde tüketim mil/galon olarak verilir ve büyük sayı daha tutumlu araç demektir. 7 L/100 km yaklaşık 33,6 mpg eder. Birleşik Krallık galonu daha büyük olduğu için oradaki mpg değerleri farklıdır.'],
    ['Tüketimim normal mi?', 'Bu, aracın motoruna, ağırlığına, yakıt türüne ve kullanım koşullarına bağlıdır; tek bir doğru sayı yoktur. Kendi ölçümünüzü birkaç depo boyunca tekrarlayıp aynı model için açıklanan değerlerle ve önceki ölçümlerinizle karşılaştırmak en sağlıklı yoldur. Ani bir artış bakım gereğine işaret edebilir.'],
    ['Girdiğim veriler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; kilometre, litre ve fiyat bilgileri sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['yol-masrafi-paylasimi', 'kilometre-maliyeti-hesapla', 'lpg-benzin-karsilastir', 'elektrikli-arac-menzil-hesapla', 'lastik-olcusu-hesapla'],
};
