export default {
  slug: 'sap-hesapla',
  title: 'Şap Hesaplama',
  h1Tail: 'hacim, çimento ve kum',
  pageTitle: 'Şap Hesaplama – Kaç Torba Çimento, Kaç m³ Kum Gerekir?',
  description: 'Zemin alanı ve şap kalınlığından şap hacmini, gereken çimento torbasını ve kum miktarını hesaplayın. Karışım oranı ve fire payı ayarlanabilir.',
  card: 'Alan ve kalınlıktan şap hacmini, çimento torbası adedini ve kum miktarını karışım oranına göre hesaplayın.',
  category: 'insaat',
  keywords: ['şap hesaplama', 'şap kaç torba çimento', 'şap kum hesabı', 'm2 şap malzemesi', 'şap hacmi', 'şap karışım oranı', 'zemin şapı hesaplama'],
  lead: 'Şap atılacak zeminin alanını ve şap kalınlığını yazın; araç gereken <strong>şap hacmini</strong>, seçtiğiniz karışım oranına göre <strong>çimento torbası</strong> adedini ve <strong>kum miktarını</strong> hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'alan', label: 'Zemin alanı (m²)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'kalinlik', label: 'Şap kalınlığı (cm)', type: 'number', placeholder: 'Örn. 5', value: '5' },
    { id: 'oran', label: 'Karışım oranı (çimento : kum, hacimce)', type: 'select', options: [['4', '1 : 4 (yaygın)'], ['3', '1 : 3 (daha güçlü)'], ['5', '1 : 5 (zayıf, dolgu)']] },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '5', hint: 'Zemin bozukluğu ve dökülme için; istemezseniz 0 yazın.' },
    { id: 'torba', label: 'Çimento torbası (kg)', type: 'number', value: '50' },
  ],
  compute(v, h) {
    const alan = h.pos(v.alan, 'Zemin alanı');
    const kal = h.pos(v.kalinlik, 'Şap kalınlığı');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const torba = h.pos(v.torba, 'Çimento torbası');
    const n = v.oran === '3' ? 3 : v.oran === '5' ? 5 : 4;
    if (kal > 30) h.err('Şap kalınlığı santimetre olarak yazılmalı; 30 cm üzeri şap için değeri kontrol edin.');
    if (fire > 100) h.err('"Fire payı" en fazla 100 olabilir.');
    const hacim = alan * kal / 100 * (1 + fire / 100);
    const kuru = hacim * 1.33;
    const cimKg = kuru / (1 + n) * 1440;
    const adet = Math.ceil(cimKg / torba - 1e-9);
    const kumM3 = kuru * n / (1 + n);
    const kumTon = kumM3 * 1.6;
    return {
      rows: [
        ['Şap hacmi', h.fmt(hacim, 2) + ' m³'],
        ['Çimento', h.fmt(cimKg, 2) + ' kg'],
        ['Çimento torbası', `${h.fmt(adet, 0)} torba (${h.fmt(torba, 1)} kg)`],
        ['Kum', h.fmt(kumM3, 2) + ' m³'],
        ['Kum (yaklaşık ağırlık)', h.fmt(kumTon, 2) + ' ton'],
        ['m² başına çimento', h.fmt(cimKg / alan, 2) + ' kg/m²'],
      ],
      note: 'Varsayımlar: kuru malzeme hacmi = yaş hacim × 1,33; çimento 1.440 kg/m³, kum 1.600 kg/m³ yığın yoğunluğu. Sonuç yaklaşık keşif içindir.',
    };
  },
  cases: [
    { in: { alan: '100', kalinlik: '5', oran: '4', fire: '0', torba: '50' }, out: { 'Şap hacmi': '5 m³', 'Çimento': '1.915,2 kg', 'Çimento torbası': '39 torba (50 kg)', 'Kum': '5,32 m³', 'Kum (yaklaşık ağırlık)': '8,51 ton' } },
    { in: { alan: '20', kalinlik: '4', oran: '4', fire: '5', torba: '50' }, out: { 'Şap hacmi': '0,84 m³', 'Çimento': '321,75 kg', 'Çimento torbası': '7 torba (50 kg)', 'Kum': '0,89 m³' } },
    { in: { alan: '50', kalinlik: '3', oran: '3', fire: '0', torba: '50' }, out: { 'Şap hacmi': '1,5 m³', 'Çimento': '718,2 kg', 'Çimento torbası': '15 torba (50 kg)' } },
    { in: { alan: '10', kalinlik: '5', oran: '5', fire: '0', torba: '25' }, out: { 'Şap hacmi': '0,5 m³', 'Çimento': '159,6 kg', 'Çimento torbası': '7 torba (25 kg)', 'Kum': '0,55 m³' } },
    { in: { alan: '200', kalinlik: '6', oran: '4', fire: '10', torba: '50' }, out: { 'Şap hacmi': '13,2 m³', 'Çimento': '5.056,13 kg', 'Çimento torbası': '102 torba (50 kg)', 'Kum': '14,04 m³', 'Kum (yaklaşık ağırlık)': '22,47 ton' } },
    { in: { alan: '0', kalinlik: '5' }, error: true },
    { in: { alan: '40', kalinlik: 'abc' }, error: true },
    { in: { alan: '40', kalinlik: '50' }, error: true },
  ],
  howto: [
    'Şap atılacak zeminin toplam alanını metrekare olarak yazın. Birden fazla oda varsa alanlarını toplayın.',
    'Şap kalınlığını santimetre olarak girin. Kalınlık zemin boyunca değişiyorsa ortalama değeri kullanın.',
    'Karışım oranını seçin: 1 ölçü çimentoya karşılık kaç ölçü kum konulacağını belirtir.',
    'Fire payını ve kullanacağınız çimento torbasının ağırlığını gerekirse değiştirin.',
    '"Hesapla" düğmesine basın; şap hacmi, çimento kilogramı, torba adedi ve kum miktarı listelenir.',
  ],
  sections: [
    { h: 'Şap nedir, ne işe yarar?', p: [
      'Şap; beton döşemenin üzerine, kaplama malzemesinden önce atılan çimento ve kum esaslı düzeltme tabakasıdır. Kaba betonun yüzeyi parke, laminat, seramik ya da halı gibi kaplamalar için yeterince düz değildir; ayrıca tesisat boruları ve yerden ısıtma hatları bu tabakanın içinde kalır. Şap hem yüzeyi teraziye getirir hem de kaplamanın oturacağı sağlam bir zemin oluşturur.',
      'Uygulamada kalınlık işe göre değişir. Düz bir döşemeyi tesviye etmek için birkaç santimetre yeterli olabilirken, yerden ısıtma borularının üzerini örtmek ya da kot farkını kapatmak için daha kalın şap atılır. Doğru kalınlığı kaplama üreticisinin ve uygulama ustasının önerisiyle belirlemek gerekir; bu araç verdiğiniz kalınlığa göre malzeme miktarını bulur.',
    ] },
    { h: 'Hesap nasıl yapılır?', p: [
      'İlk adım hacimdir: <strong>şap hacmi (m³) = alan (m²) × kalınlık (cm) ÷ 100</strong>. Fire payı girdiyseniz hacim bu oranda artırılır. Ardından yaş harcın hacmi kuru malzeme hacmine çevrilir. Çimento ve kum suyla karıştırıldığında taneler arasındaki boşluklar dolduğu için karışım hacim kaybeder; bu nedenle kuru malzeme toplamı yaş hacimden fazla olmalıdır. Araç yaygın keşif kabulü olan <strong>1,33</strong> katsayısını kullanır.',
      'Kuru hacim, seçilen orana göre paylaştırılır. 1 : 4 karışımda toplam 5 ölçünün 1 ölçüsü çimento, 4 ölçüsü kumdur. Çimentonun hacmi, 1.440 kg/m³ yığın yoğunluğuyla kilograma çevrilir ve torba ağırlığına bölünerek yukarı yuvarlanır. Kum hacmi metreküp olarak verilir; nakliye planı için 1.600 kg/m³ kabulüyle yaklaşık tonajı da gösterilir.',
    ] },
    { h: 'Çözümlü örnek: 100 m² daireye 5 cm şap', p: [
      'Alan 100 m², kalınlık 5 cm, karışım 1 : 4 ve fire sıfır olsun. Hacim 100 × 5 ÷ 100 = <strong>5 m³</strong> eder. Kuru malzeme hacmi 5 × 1,33 = 6,65 m³ olur. Bunun beşte biri çimentodur: 6,65 ÷ 5 = 1,33 m³. Ağırlığı 1,33 × 1.440 = <strong>1.915,2 kg</strong> eder; 50 kilogramlık torbalarla 38,3 torba, yani yukarı yuvarlanınca <strong>39 torba</strong> gerekir.',
      'Kum ise kuru hacmin beşte dördüdür: 6,65 × 4 ÷ 5 = <strong>5,32 m³</strong>, yaklaşık 8,51 ton. Metrekare başına çimento tüketimi 19,15 kg çıkar. Aynı değerleri araca yazdığınızda bu sonuçları görürsünüz; fire payını yüzde 5 yaparsanız bütün miktarlar aynı oranda artar.',
    ] },
    { h: 'Karışım oranı nasıl seçilir?', ul: [
      '<strong>1 : 3</strong> — çimentosu bol, daha dayanıklı karışım. İnce şaplarda ve yük alan zeminlerde tercih edilir; çimento tüketimi en yüksektir.',
      '<strong>1 : 4</strong> — konutlarda en sık kullanılan orandır; dayanım ve maliyet dengelidir.',
      '<strong>1 : 5</strong> — çimentosu az, zayıf karışım. Daha çok dolgu ve tesviye altı tabakalarda kullanılır; son kat için uygun olmayabilir.',
    ], p: [
      'Oranlar hacimcedir: aynı kova ya da el arabasıyla bir ölçü çimentoya üç, dört ya da beş ölçü kum konur. Hazır şap ya da kendiliğinden yayılan şap kullanacaksanız bu hesap geçerli değildir; o ürünlerde torba üzerindeki metrekare tüketimi esas alınır.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Kalınlığı milimetre ya da metre olarak yazmak. Alan metrekare, kalınlık santimetre olmalıdır.',
      'Zemin bozukluğunu hesaba katmamak. Kaba beton dalgalıysa ortalama kalınlık planlanandan fazla çıkar; fire payını yükseltin.',
      'Kumu yaş tartmak. Islak kum hem daha ağırdır hem de kabarır; hacimce ölçerken bunu göz önünde bulundurun.',
      'Fazla su eklemek. Sulu şap kolay yayılır ama kuruyunca çatlar ve tozur; malzeme miktarı doğru olsa bile sonuç kötü olur.',
      'Yapının taşıyabileceği yükü unutmak. Şap ağır bir tabakadır; kalın şap döşemeye kayda değer ek yük getirir.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Sonuçlar yaklaşık keşif değerleridir. Çimento ve kumun gerçek yoğunluğu, kumun nemi, tane dağılımı ve sıkıştırma düzeyi tüketimi değiştirir. 1,33 kuru hacim katsayısı ile 1.440 ve 1.600 kg/m³ yoğunlukları genel kabullerdir; şantiyede kullanılan malzemeye göre birkaç puan sapma olağandır.',
      'Araç taşıyıcı sistem hesabı yapmaz. Kalın şap, yerden ısıtma, yüzer şap, ıslak hacim eğimi gibi konularda dayanım, derz ve kuruma süresi için bir inşaat mühendisine ya da deneyimli bir uygulayıcıya danışın. Satın almadan önce bir iki torba yedek bulundurmak iş ortasında malzemesiz kalmayı önler.',
    ] },
  ],
  faq: [
    ['1 m² şap için kaç kg çimento gerekir?', '1 : 4 karışım ve 5 cm kalınlıkta, bu aracın kabulleriyle metrekareye yaklaşık 19 kg çimento düşer. Kalınlık 3 cm olursa bu değer yaklaşık 11,5 kg olur; oran 1 : 3 seçilirse tüketim artar.'],
    ['100 m² şap için kaç torba çimento alınır?', '5 cm kalınlık ve 1 : 4 oranla fire hariç 39 adet 50 kilogramlık torba hesaplanır. Yüzde 5 fire payıyla bu sayı 41 torbaya çıkar. Kalınlık ve oran değiştikçe sonuç da değişir.'],
    ['Şap kalınlığı kaç cm olmalı?', 'Tek bir doğru değer yoktur; zeminin düzgünlüğüne, altından geçen tesisata, yerden ısıtma olup olmadığına ve kaplama türüne göre belirlenir. Kararı uygulayıcı ve gerekirse mühendis verir; araç yalnızca girdiğiniz kalınlığa göre malzeme hesaplar.'],
    ['Kuru hacim katsayısı 1,33 ne anlama geliyor?', 'Kum ve çimento suyla karıştırıldığında taneler arasındaki boşluk dolar ve karışım hacmi azalır. 1 m³ yaş harç elde etmek için yaklaşık 1,33 m³ kuru malzeme gerekir. Bu, keşif hesaplarında yaygın kullanılan bir kabuldür.'],
    ['Hazır şap kullanırsam bu hesap işe yarar mı?', 'Hacim satırı işinize yarar, çünkü hazır şap ya da hazır beton santralinden gelen şap metreküp üzerinden sipariş edilir. Torbalı hazır şaplarda ise üreticinin belirttiği metrekare tüketimini kullanın.'],
    ['Kum miktarı neden hem m³ hem ton olarak veriliyor?', 'Kum bazı satıcılarda metreküp, bazılarında ton üzerinden satılır. Ton değeri 1.600 kg/m³ kabulüyle hesaplanan yaklaşık bir karşılıktır; nemli kum daha ağır gelir.'],
    ['Fire payı ne kadar olmalı?', 'Düzgün bir döşemede yüzde 5 çoğu zaman yeterlidir. Zemin kotu çok değişkense, borular arasında boşluk fazlaysa ya da malzeme uzun mesafe taşınacaksa yüzde 10 almak daha güvenlidir.'],
    ['Girdiğim ölçüler kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız alan ve kalınlık değerleri sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['beton-hesapla', 'cimento-hesapla', 'harc-karisim-hesapla', 'siva-hesapla', 'parke-hesapla'],
};
