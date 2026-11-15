export default {
  slug: 'mermer-agirligi-hesapla',
  title: 'Mermer ve Granit Ağırlığı Hesaplama',
  h1Tail: 'plaka ve blok',
  pageTitle: 'Mermer ve Granit Ağırlığı Hesaplama – Plaka Kaç Kg Gelir?',
  description: 'Mermer, granit, traverten ya da bazalt plakanın en, boy ve kalınlığını girin; parça ağırlığını, metrekare ağırlığını ve toplam yükü kilogram olarak hesaplayın.',
  card: 'Mermer, granit, traverten ve diğer doğal taş plakaların ağırlığını ölçü ve kalınlığa göre kilogram olarak hesaplayın.',
  category: 'insaat',
  keywords: ['mermer ağırlığı hesaplama', 'granit ağırlığı hesaplama', '1 m2 mermer kaç kg', '2 cm mermer ağırlığı', 'mermer yoğunluğu', 'granit tezgah ağırlığı', 'traverten ağırlığı', 'doğal taş ağırlık hesabı'],
  lead: `Taşın cinsini seçin, plakanın enini, boyunu ve kalınlığını yazın. Araç hacmi bulur ve taşın tipik yoğunluğuyla çarparak <strong>parça ağırlığını, metrekare ağırlığını ve toplam yükü</strong> verir. Taşınızın yoğunluğunu biliyorsanız kendi değerinizi de girebilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'tas', label: 'Taş cinsi', type: 'select', options: [['2700', 'Mermer (≈ 2.700 kg/m³)'], ['2750', 'Granit (≈ 2.750 kg/m³)'], ['2450', 'Traverten (≈ 2.450 kg/m³)'], ['2500', 'Kireçtaşı (≈ 2.500 kg/m³)'], ['2900', 'Bazalt (≈ 2.900 kg/m³)'], ['2400', 'Kuvars kompoze (≈ 2.400 kg/m³)']] },
    { id: 'en', label: 'En (cm)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'boy', label: 'Boy (cm)', type: 'number', placeholder: 'Örn. 60' },
    { id: 'kalinlik', label: 'Kalınlık (cm)', type: 'number', placeholder: 'Örn. 2' },
    { id: 'adet', label: 'Adet', type: 'number', value: '1' },
    { id: 'ozel', label: 'Özel yoğunluk (kg/m³)', type: 'number', placeholder: 'İsteğe bağlı', hint: 'Doldurursanız taş cinsi yerine bu değer kullanılır. Binlik ayraç kullanmayın (örn. 2650).' },
  ],
  compute(v, h) {
    const en = h.pos(v.en, 'En');
    const boy = h.pos(v.boy, 'Boy');
    const kal = h.pos(v.kalinlik, 'Kalınlık');
    const adet = h.posint(v.adet, 'Adet');
    let yog;
    if (String(v.ozel ?? '').trim() !== '') {
      yog = h.pos(v.ozel, 'Özel yoğunluk');
      if (yog < 500 || yog > 5000) h.err('Özel yoğunluk kg/m³ olarak yazılmalı; doğal taşlarda yaklaşık 2.000–3.200 arasındadır (örn. 2650).');
    } else {
      yog = Number(v.tas);
      if (![2700, 2750, 2450, 2500, 2900, 2400].includes(yog)) h.err('Taş cinsini listeden seçin.');
    }
    const alan = (en / 100) * (boy / 100);
    const hacim = alan * (kal / 100);
    const tek = hacim * yog;
    const toplam = tek * adet;
    const rows = [
      ['Toplam ağırlık', h.fmt(toplam, 2) + ' kg'],
      ['Tek parça ağırlığı', h.fmt(tek, 2) + ' kg'],
      ['m² ağırlığı', h.fmt(yog * kal / 100, 2) + ' kg/m²'],
      ['Toplam alan', h.fmt(alan * adet, 3) + ' m²'],
      ['Toplam hacim', h.fmt(hacim * adet, 4) + ' m³'],
      ['Kullanılan yoğunluk', h.fmt(yog, 0) + ' kg/m³'],
    ];
    if (toplam >= 1000) rows.splice(1, 0, ['Ton olarak', h.fmt(toplam / 1000, 3) + ' ton']);
    return {
      rows,
      note: 'Yoğunluklar tipik ortalama değerlerdir; aynı cins taş ocaktan ocağa birkaç yüzde farklılık gösterebilir.',
    };
  },
  cases: [
    { in: { tas: '2700', en: '100', boy: '60', kalinlik: '2' }, out: { 'Toplam ağırlık': '32,4 kg', 'm² ağırlığı': '54 kg/m²', 'Toplam alan': '0,6 m²', 'Toplam hacim': '0,012 m³' } },
    { in: { tas: '2750', en: '200', boy: '60', kalinlik: '3' }, out: { 'Toplam ağırlık': '99 kg', 'm² ağırlığı': '82,5 kg/m²', 'Kullanılan yoğunluk': '2.750 kg/m³' } },
    { in: { tas: '2450', en: '60', boy: '60', kalinlik: '2', adet: '10' }, out: { 'Toplam ağırlık': '176,4 kg', 'Tek parça ağırlığı': '17,64 kg', 'Toplam alan': '3,6 m²' } },
    { in: { tas: '2900', en: '100', boy: '100', kalinlik: '5' }, out: { 'Toplam ağırlık': '145 kg', 'm² ağırlığı': '145 kg/m²' } },
    { in: { tas: '2700', en: '120', boy: '50', kalinlik: '2', ozel: '2600' }, out: { 'Toplam ağırlık': '31,2 kg', 'Kullanılan yoğunluk': '2.600 kg/m³' } },
    { in: { tas: '2700', en: '30', boy: '30', kalinlik: '1', adet: '100' }, out: { 'Toplam ağırlık': '243 kg', 'Tek parça ağırlığı': '2,43 kg', 'Toplam alan': '9 m²' } },
    { in: { tas: '2700', en: '300', boy: '150', kalinlik: '100' }, out: { 'Toplam ağırlık': '12.150 kg', 'Ton olarak': '12,15 ton', 'Toplam hacim': '4,5 m³' } },
    { in: { tas: '2700', en: '100', boy: '', kalinlik: '2' }, error: true },
    { in: { tas: '2700', en: '100', boy: '60', kalinlik: '2', ozel: '2,7' }, error: true },
    { in: { tas: '2700', en: '100', boy: '60', kalinlik: '-2' }, error: true },
  ],
  howto: [
    `"Taş cinsi" listesinden malzemenizi seçin. Her seçeneğin yanında hesapta kullanılan tipik yoğunluk yazar.`,
    `Plakanın enini, boyunu ve kalınlığını santimetre olarak girin. 20 mm kalınlık için 2, 30 mm için 3 yazılır.`,
    `Aynı ölçüde birden fazla parça varsa adedi yazın; basamak, karo ya da tezgâh parçalarını tek seferde hesaplayabilirsiniz.`,
    `Tedarikçiniz taşın yoğunluğunu bildirdiyse "Özel yoğunluk" alanına bu değeri yazın; boş bırakırsanız listeden seçtiğiniz taşın değeri kullanılır.`,
    `"Hesapla" düğmesine basın; toplam ağırlık, parça ağırlığı ve metrekare ağırlığı görüntülenir.`,
  ],
  sections: [
    { h: 'Doğal taş ağırlığı nasıl hesaplanır?', p: [
      `Bir taş plakanın ağırlığı, hacmi ile yoğunluğunun çarpımıdır: <strong>ağırlık = en × boy × kalınlık × yoğunluk</strong>. Ölçüler metreye çevrilerek hacim metreküp cinsinden bulunur, yoğunluk ise kg/m³ olarak alınır. Araç en, boy ve kalınlığı santimetre olarak ister, çünkü mermerciler ve taş atölyeleri plakaları genellikle "2'lik", "3'lük" diyerek santimetre kalınlığıyla anar.`,
      `Metrekare ağırlığı ise yalnızca kalınlığa ve yoğunluğa bağlıdır: <strong>kg/m² = yoğunluk × kalınlık (m)</strong>. Yoğunluğu 2.700 kg/m³ olan bir mermerin her santimetre kalınlığı metrekarede 27 kg gelir. Bu sayıyı akılda tutmak, hızlı tahminler için çok işe yarar.`,
    ] },
    { h: 'Çözümlü örnek: mutfak tezgâhı ve döşeme', p: [
      `100 × 60 cm ölçüsünde, 2 cm kalınlığında bir mermer plaka düşünelim. Hacim 1,00 × 0,60 × 0,02 = 0,012 m³'tür. Yoğunluk 2.700 kg/m³ alındığında ağırlık 0,012 × 2.700 = <strong>32,4 kg</strong> bulunur. Metrekare ağırlığı 2.700 × 0,02 = 54 kg/m²'dir.`,
      `İkinci örnek: 200 × 60 cm, 3 cm kalınlığında granit bir tezgâh. Hacim 2,00 × 0,60 × 0,03 = 0,036 m³; 2.750 kg/m³ yoğunlukla ağırlık 99 kg eder. Bu ağırlık tek kişinin taşıyabileceğinin çok üzerindedir ve alt dolapların taşıma kapasitesi için de dikkate alınmalıdır.`,
      `Üçüncü örnek: 60 × 60 cm, 2 cm kalınlığında on adet traverten karo. Tek karo 0,0072 m³ × 2.450 = 17,64 kg, on karo toplam 176,4 kg gelir.`,
    ] },
    { h: 'Taş cinslerinin tipik yoğunlukları', p: [
      `Doğal taşların yoğunluğu mineral yapısına ve gözenekliliğine göre değişir. Araçta kullanılan değerler, her taş cinsi için yaygın olarak kabul edilen ortalamalardır:`,
    ], ul: [
      `<strong>Mermer:</strong> yaklaşık 2.700 kg/m³ (çoğunlukla 2.600–2.800 arası).`,
      `<strong>Granit:</strong> yaklaşık 2.750 kg/m³ (çoğunlukla 2.600–2.800 arası).`,
      `<strong>Traverten:</strong> yaklaşık 2.450 kg/m³; gözenekli yapısı nedeniyle mermerden hafiftir.`,
      `<strong>Kireçtaşı:</strong> yaklaşık 2.500 kg/m³; cinsine göre geniş bir aralıkta değişir.`,
      `<strong>Bazalt:</strong> yaklaşık 2.900 kg/m³; yaygın yapı taşları arasında en ağırlarındandır.`,
      `<strong>Kuvars kompoze taş:</strong> yaklaşık 2.400 kg/m³; reçine bağlayıcı içerdiği için doğal granitten biraz hafiftir.`,
    ] },
    { h: 'Kalınlığa göre mermer metrekare ağırlıkları', p: [
      `2.700 kg/m³ yoğunluk için hızlı başvuru değerleri:`,
    ], ul: [
      `<strong>1 cm:</strong> 27 kg/m²`,
      `<strong>2 cm:</strong> 54 kg/m²`,
      `<strong>3 cm:</strong> 81 kg/m²`,
      `<strong>4 cm:</strong> 108 kg/m²`,
      `<strong>5 cm:</strong> 135 kg/m²`,
    ] },
    { h: 'Ağırlık bilgisi nerede gerekir?', ul: [
      `<strong>Nakliye:</strong> palet ve araç yükü planlanırken; bir palet karo kolayca bir tonu aşabilir.`,
      `<strong>Taşıma ve montaj:</strong> tezgâh ve büyük plakaların kaç kişiyle ya da hangi ekipmanla taşınacağına karar verirken.`,
      `<strong>Mobilya ve taşıyıcılar:</strong> tezgâh altı dolapların, masa ayaklarının ve konsolların kapasitesi seçilirken.`,
      `<strong>Döşeme yükü:</strong> eski binalarda ya da asma katlarda kalın taş kaplamanın döşemeye getireceği ek yük değerlendirilirken.`,
      `<strong>Cephe kaplaması:</strong> ankraj ve taşıyıcı sistem tasarımında birim alan ağırlığı temel veridir.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Kalınlığı milimetre yazmak: 20 mm plaka için 20 değil 2 girilmelidir; aksi hâlde sonuç on kat büyük çıkar.`,
      `Kesim boşluklarını hesaba katmamak: evye ve ocak boşluğu açılmış tezgâh, dolu plakadan hafiftir. Araç dolu dikdörtgeni hesaplar; bu, taşıma için güvenli tarafta bir değerdir.`,
      `Tüm taşları aynı saymak: traverten ile bazalt arasında yaklaşık yüzde 18 ağırlık farkı vardır; doğru cinsi seçin.`,
      `Islak taşı tartmak: gözenekli taşlar su emer ve geçici olarak ağırlaşır; araç kuru yoğunluğu esas alır.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Sonuçlar, tipik ortalama yoğunluklara dayanan yaklaşık değerlerdir. Aynı ada sahip taşlar bile ocağa, damar yapısına ve gözenekliliğe göre farklı yoğunlukta olabilir; kesin değer için tedarikçinizin teknik bilgi föyünü kullanın. Bu araç yalnızca dikdörtgen plaka ve blokları hesaplar. Döşeme taşıma kapasitesi, cephe ankrajı ve benzeri yapısal kararlar için mutlaka bir inşaat mühendisine danışın.`,
    ] },
  ],
  faq: [
    ['1 m² mermer kaç kilogramdır?', `Kalınlığa bağlıdır. 2.700 kg/m³ yoğunlukla 1 cm kalınlık 27 kg/m², 2 cm kalınlık 54 kg/m², 3 cm kalınlık 81 kg/m² eder.`],
    ['Granit mi daha ağırdır, mermer mi?', `İkisinin yoğunluğu birbirine çok yakındır; her ikisi de çoğunlukla 2.600–2.800 kg/m³ aralığındadır. Araç granit için 2.750, mermer için 2.700 kg/m³ kullanır; aynı ölçüdeki iki plaka arasındaki fark yaklaşık yüzde 2'dir.`],
    ['Tezgâhımın ağırlığını nasıl bulurum?', `Tezgâhı dikdörtgen parçalara ayırın, her parçanın en, boy ve kalınlığını girip ağırlıkları toplayın. L tezgâhlarda iki kolu ayrı ayrı hesaplamak en kolay yoldur. Evye ve ocak boşlukları sonucu bir miktar azaltır.`],
    ['1 m³ mermer kaç ton gelir?', `Yaklaşık 2,7 ton. Granit için yaklaşık 2,75 ton, traverten için 2,45 ton, bazalt için 2,9 ton alınabilir. Blok ağırlığı için en, boy ve kalınlığı santimetre olarak girmeniz yeterlidir; sonuç bir tonu aşarsa ton karşılığı da gösterilir.`],
    ['Taşımın yoğunluğunu bilmiyorum, ne yapmalıyım?', `Listeden taş cinsini seçmeniz yeterlidir; araç o cins için tipik bir ortalama kullanır. Daha kesin sonuç isterseniz tedarikçinizden birim hacim ağırlığını öğrenip "Özel yoğunluk" alanına yazabilirsiniz.`],
    ['Porselen ya da seramik karo için kullanabilir miyim?', `Listede yer almaz, ancak ürünün yoğunluğunu biliyorsanız "Özel yoğunluk" alanına yazarak hesaplayabilirsiniz. Daha pratik yol, kutu üzerindeki kutu ağırlığı ve kutu metrekaresi bilgisinden yararlanmaktır.`],
    ['Sonuç ne kadar hassastır?', `Ölçüleriniz doğruysa hata payı esas olarak yoğunluktan gelir ve çoğu taş için birkaç yüzde düzeyindedir. Taşıma ve nakliye planı için bu hassasiyet yeterlidir; yapısal hesaplar için ölçülmüş değerler kullanılmalıdır.`],
    ['Girdiğim ölçüler kaydediliyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; ölçüleriniz hiçbir sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra internet bağlantısı olmadan da çalışır.`],
  ],
  related: ['cam-agirligi-hesapla', 'sac-agirligi-hesapla', 'yogunluk-hesapla', 'hacim-hesapla', 'metrekare-hesapla', 'kilit-tasi-hesapla'],
};
