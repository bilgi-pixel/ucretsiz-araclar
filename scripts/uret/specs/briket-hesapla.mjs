export default {
  slug: 'briket-hesapla',
  title: 'Briket Hesaplama',
  h1Tail: 'duvar için kaç briket?',
  pageTitle: 'Briket Hesaplama – 1 Metrekare Duvara Kaç Briket Gider?',
  description: 'Duvar uzunluğu, yüksekliği, briket ölçüsü ve derz kalınlığına göre gereken briket adedini hesaplayın. Boşlukları düşün, fire payını ve sıra sayısını görün.',
  card: 'Duvar ölçüleri, briket boyutu ve derz kalınlığına göre gereken briket adedini ve metrekare başına sayıyı bulun.',
  category: 'insaat',
  keywords: ['briket hesaplama', '1 metrekareye kaç briket gider', 'kaç briket lazım', 'briket duvar hesabı', 'bahçe duvarı briket hesaplama', 'bims hesaplama', 'briket adedi hesaplama'],
  lead: `Bahçe duvarı, depo, garaj ya da bölme duvar için <strong>kaç briket</strong> gerektiğini hesaplayın. Duvar ölçülerini, briket boyutunu ve derz kalınlığını girin; araç boşlukları düşer, fire payını ekler ve metrekareye düşen briket sayısını gösterir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'uzunluk', label: 'Duvar uzunluğu (m)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'yukseklik', label: 'Duvar yüksekliği (m)', type: 'number', placeholder: 'Örn. 2' },
    { id: 'bosluk', label: 'Kapı ve pencere boşlukları (m²)', type: 'number', value: '0' },
    { id: 'briketBoy', label: 'Briket uzunluğu (cm)', type: 'number', value: '39' },
    { id: 'briketYuk', label: 'Briket yüksekliği (cm)', type: 'number', value: '19' },
    { id: 'derz', label: 'Derz kalınlığı (mm)', type: 'number', value: '10', hint: 'Briketler arasındaki harç kalınlığı; derzsiz hesap için 0 yazın.' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '5' },
  ],
  compute(v, h) {
    const L = h.pos(v.uzunluk, 'Duvar uzunluğu');
    const H = h.pos(v.yukseklik, 'Duvar yüksekliği');
    const bos = h.nonneg(v.bosluk, 'Kapı ve pencere boşlukları');
    const bb = h.pos(v.briketBoy, 'Briket uzunluğu');
    const by = h.pos(v.briketYuk, 'Briket yüksekliği');
    const derz = h.nonneg(v.derz, 'Derz kalınlığı') / 10;
    const fire = h.nonneg(v.fire, 'Fire payı');
    if (fire > 100) h.err('"Fire payı" %100\'den büyük olamaz.');
    if (derz > 5) h.err('Derz kalınlığı milimetre cinsindendir ve 50 mm\'yi geçemez; genellikle 10 mm kullanılır.');
    const brut = L * H;
    if (bos >= brut) h.err('Boşluk alanı duvar alanından küçük olmalı; kapı ve pencere ölçülerini kontrol edin.');
    const net = brut - bos;
    const m2Adet = 10000 / ((bb + derz) * (by + derz));
    const firesiz = net * m2Adet;
    const adet = Math.ceil(firesiz * (1 + fire / 100) - 1e-9);
    const sira = Math.ceil(H * 100 / (by + derz) - 1e-9);
    return {
      rows: [
        ['Gereken briket (fire dahil)', h.fmt(adet, 0) + ' adet'],
        ['Firesiz briket sayısı', h.fmt(firesiz, 1) + ' adet'],
        ['Net duvar alanı', h.fmt(net, 2) + ' m²'],
        ['Metrekare başına briket', h.fmt(m2Adet, 2) + ' adet/m²'],
        ['Sıra sayısı', h.fmt(sira, 0) + ' sıra'],
        ['Bir sıradaki briket (tam uzunlukta)', h.fmt(L * 100 / (bb + derz), 1) + ' adet'],
      ],
      note: 'Tek sıra (briket boyuna dizili) örgü varsayılır. Harç, hatıl, kolon ve temel bu hesaba dahil değildir.',
    };
  },
  cases: [
    { in: { uzunluk: '10', yukseklik: '2', bosluk: '0', briketBoy: '39', briketYuk: '19', derz: '10', fire: '0' }, out: { 'Gereken briket (fire dahil)': '250 adet', 'Net duvar alanı': '20 m²', 'Metrekare başına briket': '12,5 adet/m²', 'Sıra sayısı': '10 sıra', 'Bir sıradaki briket (tam uzunlukta)': '25 adet' } },
    { in: { uzunluk: '10', yukseklik: '2', bosluk: '0', briketBoy: '39', briketYuk: '19', derz: '10', fire: '5' }, out: { 'Gereken briket (fire dahil)': '263 adet', 'Firesiz briket sayısı': '250 adet' } },
    { in: { uzunluk: '8', yukseklik: '3', bosluk: '4', briketBoy: '39', briketYuk: '19', derz: '10', fire: '10' }, out: { 'Gereken briket (fire dahil)': '275 adet', 'Net duvar alanı': '20 m²', 'Sıra sayısı': '15 sıra' } },
    { in: { uzunluk: '5', yukseklik: '2', bosluk: '0', briketBoy: '40', briketYuk: '20', derz: '0', fire: '0' }, out: { 'Gereken briket (fire dahil)': '125 adet', 'Metrekare başına briket': '12,5 adet/m²' } },
    { in: { uzunluk: '5', yukseklik: '2', bosluk: '0', briketBoy: '40', briketYuk: '20', derz: '10', fire: '0' }, out: { 'Gereken briket (fire dahil)': '117 adet', 'Metrekare başına briket': '11,61 adet/m²', 'Firesiz briket sayısı': '116,1 adet' } },
    { in: { uzunluk: '30', yukseklik: '1,6', bosluk: '0', briketBoy: '39', briketYuk: '19', derz: '10', fire: '5' }, out: { 'Gereken briket (fire dahil)': '630 adet', 'Net duvar alanı': '48 m²', 'Sıra sayısı': '8 sıra' } },
    { in: { uzunluk: '2', yukseklik: '2', bosluk: '5' }, error: true },
    { in: { uzunluk: '10', yukseklik: '-2' }, error: true },
  ],
  howto: [
    'Duvarın toplam uzunluğunu ve yüksekliğini metre olarak yazın. Bahçe duvarında çevre uzunluğunu, kapı açıklığını çıkararak girin.',
    'Varsa kapı ve pencere boşluklarının toplam alanını metrekare olarak ekleyin.',
    'Briketin duvarda görünen uzunluk ve yüksekliğini santimetre olarak girin; satın alacağınız briketi ölçmek en güvenli yoldur.',
    'Derz kalınlığını milimetre olarak yazın. Ustalar çoğunlukla 10 mm civarında çalışır.',
    'Fire payını belirleyip "Hesapla" düğmesine basın; adet, sıra sayısı ve metrekare başına briket sayısı listelenir.',
  ],
  sections: [
    { h: 'Briket hesabı nasıl yapılır?', p: [
      `Duvardaki her briket, kendi yüzünün yanı sıra bir yanındaki ve altındaki harç derzini de "kaplar". Bu yüzden hesapta briketin ölçülerine derz kalınlığı eklenir. Bir briketin duvarda işgal ettiği alan <strong>(uzunluk + derz) × (yükseklik + derz)</strong> olur; 1 m² bu alana bölündüğünde metrekareye giden adet bulunur. Net duvar alanı bu sayıyla çarpılır, fire payı eklenir ve sonuç yukarı yuvarlanır.`,
      `En yaygın örnek: yüzü 39 cm × 19 cm olan briket 10 mm derzle örüldüğünde modül 40 cm × 20 cm, yani 0,08 m² olur. 1 ÷ 0,08 = <strong>12,5 adet/m²</strong>. Briket üreticilerinin bloğu 40 × 20 yerine 39 × 19 üretmesinin nedeni de budur: bir santimetrelik derzle birlikte ölçüler yuvarlak modüle oturur ve duvar boyu kolay planlanır.`,
    ] },
    { h: 'Çözümlü örnek: bahçe duvarı', p: [
      `10 m uzunluğunda ve 2 m yüksekliğinde bir bahçe duvarı düşünelim. Alan 10 × 2 = 20 m², metrekare başına 12,5 adetle firesiz ihtiyaç 250 brikettir. %5 fire payıyla 262,5, yukarı yuvarlanınca 263 adet alınır. Yükseklik 20 cm'lik modüle bölündüğünde duvar 10 sıradan oluşur ve her sırada 25 briket bulunur.`,
      `Boşluklu bir örnek: 8 m × 3 m ölçüsünde bir depo duvarında toplam 4 m² kapı ve pencere var. Net alan 24 − 4 = 20 m², firesiz 250 adet eder; %10 fire payıyla 275 briket sipariş edilir. Duvar 15 sıra yükselir.`,
    ] },
    { h: 'Derz kalınlığının etkisi', p: [
      `Derz payını hesaba katmamak, gereğinden fazla briket almanın en yaygın nedenidir. 40 cm × 20 cm ölçüsünde bir briket derzsiz hesaplanırsa metrekareye 12,5 adet çıkar; aynı briket 10 mm derzle örüldüğünde modül 41 cm × 21 cm olur ve sayı 11,61 adede düşer. 5 m × 2 m'lik küçük bir duvarda bile bu fark 125 yerine 117 briket demektir; büyük bir çevre duvarında fark yüzlerce adede ulaşır.`,
      `Derz kalınlaştıkça briket sayısı azalır ama harç tüketimi artar; ayrıca çok kalın derz duvarın dayanımını ve görünümünü olumsuz etkiler. Derz kalınlığını ustanızın çalışma biçimine göre girin ve duvar yüksekliğinin tam sıra sayısına denk gelmesine dikkat edin; aksi halde en üst sırada briket kesmek gerekir.`,
    ] },
    { h: 'Briket ölçüleri ve kalınlık', p: [
      `Briketler farklı kalınlıklarda üretilir; bölme duvarlar için ince, taşıyıcı olmayan dış duvarlar ve bahçe duvarları için daha kalın olanlar seçilir. Kalınlık, tıpkı diğer blok malzemelerde olduğu gibi adet sayısını değiştirmez; çünkü hesap duvarın yüz alanı üzerinden yapılır. Değişen şey duvarın ağırlığı, harç tüketimi ve birim fiyattır.`,
      `Piyasada beton briketin yanında pomza (bims) agregalı hafif bloklar da yaygındır ve çoğu zaman aynı adla anılır. Bunların yüz ölçüleri üreticiye göre farklılık gösterebilir: 39 × 19 cm en sık görülen ölçü olmakla birlikte farklı boy ve yüksekliklerde bloklar da vardır. Bu nedenle araçta ölçü alanları serbesttir; sipariş öncesinde satıcıdan gerçek ölçüleri alın ya da bir bloğu metreyle ölçün.`,
    ] },
    { h: 'Hesaba girmeyen kalemler', ul: [
      '<strong>Temel:</strong> Duvarın oturduğu beton temel ya da hatıl ayrı hesaplanır.',
      '<strong>Kolon ve hatıllar:</strong> Uzun ve yüksek duvarlarda belirli aralıklarla betonarme düşey ve yatay elemanlar gerekir; bunların kapladığı alanı duvar alanından düşebilirsiniz.',
      '<strong>Harç:</strong> Çimento ve kum miktarı derz kalınlığına, briket kalınlığına ve briketin boşluk yapısına göre değişir.',
      '<strong>Harpuşta:</strong> Bahçe duvarlarının üstüne konan kapak elemanları metretül olarak ayrıca sipariş edilir.',
      '<strong>Sıva ve boya:</strong> Net duvar alanını iki yüz için ikiyle çarparak sıva metrajına geçebilirsiniz.',
    ] },
    { h: 'Fire payı ve uygulama uyarıları', p: [
      `Briket kırılgan bir malzemedir; indirme, taşıma ve kesim sırasında bir kısmı zayi olur. Şaşırtmalı örgüde her iki sırada bir duvar başlarına yarım briket gerekir ve bu kesimlerin bir bölümü fireye dönüşür. Uzun ve düz duvarlarda %5, çok köşeli, boşluklu ya da kısa duvarlı işlerde %8–10 pay bırakmak yaygındır. Nakliye mesafesi uzunsa ve aynı partiden sonradan tamamlama zor olacaksa payı yüksek tutmak daha ekonomik olabilir.`,
      `Bu araç yalnızca malzeme adedini hesaplar. Bahçe duvarı gibi serbest duran duvarlar rüzgâr ve deprem etkisinde devrilme riski taşır; yükseklik arttıkça temel, donatı, kolon ve hatıl gereksinimi doğar. İstinat (toprak tutan) duvarlar ise briketle değil, mühendislik hesabıyla tasarlanmalıdır. Yüksek ya da yük taşıyan duvarlar için bir inşaat mühendisine danışın ve belediyenizin imar kurallarını kontrol edin.`,
    ] },
  ],
  faq: [
    ['1 metrekare duvara kaç briket gider?', '39 × 19 cm yüz ölçülü briket 10 mm derzle örüldüğünde 12,5 adet gider. Briket ölçüsü ya da derz kalınlığı farklıysa sayı değişir; araç girdiğiniz değerlere göre kesin sayıyı verir.'],
    ['100 metrekare duvar için kaç briket lazım?', 'Metrekareye 12,5 adet üzerinden firesiz 1.250 briket gerekir. %5 fire payıyla 1.313 adet sipariş etmek uygun olur.'],
    ['Briket kalınlığı adedi değiştirir mi?', 'Hayır. Adet, duvarın yüz alanına ve briketin yüz ölçüsüne bağlıdır. Kalınlık yalnızca duvarın enini, ağırlığını ve harç tüketimini etkiler.'],
    ['Derz kalınlığını neden milimetre olarak giriyorum?', 'Derz briket ölçülerine göre küçük bir değer olduğu için milimetre daha okunaklıdır. 1 santimetrelik derz için 10, bir buçuk santimetre için 15 yazın.'],
    ['Bahçe duvarında kapı açıklığını nasıl düşerim?', 'İki yol var: kapı genişliğini toplam uzunluktan çıkarabilir ya da kapı genişliği × duvar yüksekliği değerini boşluk alanı olarak yazabilirsiniz. İkisini birden yapmayın.'],
    ['Sıra sayısı ne işe yarar?', 'Duvarın kaç kat briketle tamamlanacağını gösterir. Yüksekliğin tam sıra sayısına denk gelip gelmediğini görmenize ve iş programı yapmanıza yardımcı olur; kesirli çıkan değer yukarı yuvarlanır.'],
    ['Çift sıra (kalın) duvar için nasıl hesaplarım?', 'Duvar iki briket kalınlığında örülecekse bulunan adedi ikiyle çarpın. Briket enine dizilecekse uzunluk alanına briketin kalınlık ölçüsünü yazarak hesabı yenileyin.'],
    ['Girdiğim ölçüler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda çalışır; duvar ve briket ölçüleri sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['tugla-hesapla', 'gazbeton-hesapla', 'harc-karisim-hesapla', 'duvar-alani-hesapla', 'siva-hesapla'],
};
