export default {
  slug: 'cimento-hesapla',
  title: 'Çimento Torbası Hesaplama',
  h1Tail: 'kaç torba çimento?',
  pageTitle: 'Çimento Torbası Hesaplama – Kaç Torba Çimento Gerekir?',
  description: 'Beton, şap ya da harç hacmine ve dozaja (kg/m³) göre gereken çimentoyu kilogram, ton ve torba sayısı olarak hesaplayın; fire payını ekleyin.',
  card: 'Beton ya da harç hacmine ve dozaja göre gereken çimentoyu kilogram ve torba sayısı olarak hesaplayın.',
  category: 'insaat',
  keywords: ['çimento hesaplama', 'kaç torba çimento gerekir', 'çimento torbası hesaplama', '1 metreküp betona kaç torba çimento', 'dozaj hesaplama', 'çimento miktarı hesabı', '300 doz beton kaç torba'],
  lead: `Dökeceğiniz beton, şap ya da harcın hacmini ve <strong>dozajını</strong> (1 m³ karışımdaki çimento kilogramı) girin; araç gereken çimentoyu kilogram ve ton olarak bulur, torba ağırlığına göre <strong>kaç torba</strong> almanız gerektiğini hesaplar.`,
  button: 'Hesapla',
  inputs: [
    { id: 'hacim', label: 'Karışım hacmi (m³)', type: 'number', placeholder: 'Örn. 2,5' },
    { id: 'dozaj', label: 'Dozaj (kg çimento / m³)', type: 'number', value: '300', hint: '"300 doz" 1 m³ karışımda 300 kg çimento demektir. Projedeki ya da ustanızın belirttiği değeri yazın.' },
    { id: 'torba', label: 'Torba ağırlığı', type: 'select', options: [['50', '50 kg'], ['25', '25 kg'], ['40', '40 kg']] },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '0' },
  ],
  compute(v, h) {
    const hacim = h.pos(v.hacim, 'Karışım hacmi');
    const dozaj = h.pos(v.dozaj, 'Dozaj');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const torba = Number(v.torba) || 50;
    if (fire > 100) h.err('"Fire payı" %100\'den büyük olamaz.');
    if (dozaj > 1000) h.err('Dozaj 1.000 kg/m³\'ten büyük olamaz; yapı işlerinde genellikle 150–500 kg/m³ arası değerler kullanılır.');
    const net = hacim * dozaj;
    const kg = net * (1 + fire / 100);
    const adet = Math.ceil(kg / torba - 1e-9);
    return {
      rows: [
        ['Gereken torba sayısı', h.fmt(adet, 0) + ' torba (' + torba + ' kg\'lık)'],
        ['Toplam çimento', h.fmt(kg, 1) + ' kg'],
        ['Toplam çimento (ton)', h.fmt(kg / 1000, 3) + ' ton'],
        ['Firesiz çimento', h.fmt(net, 1) + ' kg'],
        ['1 m³ karışım için torba', h.fmt(dozaj / torba, 2) + ' torba'],
        ['Satın alınan miktar', h.fmt(adet * torba, 0) + ' kg'],
      ],
      note: 'Torba sayısı yukarı yuvarlanır. Dozaj, yerine yerleşmiş 1 m³ karışımdaki çimento miktarıdır; kum, çakıl ve su ayrıca hesaplanır.',
    };
  },
  cases: [
    { in: { hacim: '1', dozaj: '300', torba: '50', fire: '0' }, out: { 'Gereken torba sayısı': '6 torba (50 kg\'lık)', 'Toplam çimento': '300 kg', 'Toplam çimento (ton)': '0,3 ton' } },
    { in: { hacim: '2,5', dozaj: '350', torba: '50', fire: '0' }, out: { 'Gereken torba sayısı': '18 torba (50 kg\'lık)', 'Toplam çimento': '875 kg', '1 m³ karışım için torba': '7 torba', 'Satın alınan miktar': '900 kg' } },
    { in: { hacim: '10', dozaj: '250', torba: '50', fire: '5' }, out: { 'Gereken torba sayısı': '53 torba (50 kg\'lık)', 'Toplam çimento': '2.625 kg', 'Firesiz çimento': '2.500 kg' } },
    { in: { hacim: '0,5', dozaj: '400', torba: '25', fire: '0' }, out: { 'Gereken torba sayısı': '8 torba (25 kg\'lık)', 'Toplam çimento': '200 kg' } },
    { in: { hacim: '3', dozaj: '300', torba: '50', fire: '10' }, out: { 'Gereken torba sayısı': '20 torba (50 kg\'lık)', 'Toplam çimento': '990 kg', 'Toplam çimento (ton)': '0,99 ton' } },
    { in: { hacim: '0,2', dozaj: '300', torba: '50', fire: '0' }, out: { 'Gereken torba sayısı': '2 torba (50 kg\'lık)', 'Toplam çimento': '60 kg' } },
    { in: { hacim: '0', dozaj: '300' }, error: true },
    { in: { hacim: '2', dozaj: 'üçyüz' }, error: true },
  ],
  howto: [
    'Dökülecek beton, şap ya da harcın hacmini metreküp olarak yazın. Hacmi bilmiyorsanız en × boy × kalınlık (hepsi metre) çarpımıyla bulun.',
    'Dozajı girin: 1 metreküp karışıma konacak çimentonun kilogram değeri. Projede ya da şartnamede belirtilen değeri kullanın.',
    'Satın alacağınız torbanın ağırlığını listeden seçin.',
    'Dökülme, torba dibinde kalma ve nemden sertleşme gibi kayıplar için isterseniz fire payı ekleyin.',
    '"Hesapla" düğmesine basın; torba sayısı, toplam kilogram ve ton değerleri listelenir.',
  ],
  sections: [
    { h: 'Çimento miktarı nasıl hesaplanır?', p: [
      `Şantiye dilinde "doz" ya da "dozaj", yerine yerleştirilmiş 1 metreküp beton veya harcın içindeki çimento kilogramını anlatır. "300 dozlu beton" denildiğinde her metreküpte 300 kg çimento bulunduğu kastedilir. Bu tanım hesabı tek bir çarpmaya indirir: <strong>çimento (kg) = hacim (m³) × dozaj (kg/m³)</strong>. Torba sayısı için sonuç torba ağırlığına bölünür ve yukarı yuvarlanır, çünkü yarım torba satılmaz.`,
      `Örneğin 2,5 m³ hacmindeki bir döşeme için 350 doz karışım hazırlanacaksa 2,5 × 350 = 875 kg çimento gerekir. 50 kg'lık torbalarla 875 ÷ 50 = 17,5, yani 18 torba alınır; 25 kg'lık bir miktar artar. Fire payı girildiğinde kilogram değeri önce bu oran kadar artırılır, torba sayısı sonra hesaplanır.`,
    ] },
    { h: 'Hacmi nasıl bulurum?', p: [
      `Aracın ilk girdisi karışımın hacmidir. Dikdörtgen bir döşeme, şap ya da temel için hacim en × boy × kalınlık çarpımıdır ve üç ölçü de metre olmalıdır. Kalınlığı santimetre olarak biliyorsanız 100'e bölün: 8 cm = 0,08 m.`,
    ], ul: [
      '<strong>Şap:</strong> 20 m² alana 5 cm şap → 20 × 0,05 = 1 m³.',
      '<strong>Saha betonu:</strong> 6 m × 4 m alana 10 cm beton → 6 × 4 × 0,10 = 2,4 m³.',
      '<strong>Kolon:</strong> 30 cm × 30 cm kesitli, 3 m yüksekliğinde kolon → 0,3 × 0,3 × 3 = 0,27 m³.',
      '<strong>Çit direği temeli:</strong> 40 cm × 40 cm × 50 cm çukur → 0,08 m³; 12 direk için 0,96 m³.',
      '<strong>Sıva ve örgü harcı:</strong> alan × ortalama kalınlık; örgü harcında derz hacmi ayrıca tahmin edilir.',
    ] },
    { h: 'Dozaj değerini nereden bilirim?', p: [
      `Doğru dozaj işin türüne, istenen dayanıma, agreganın özelliklerine ve çimento tipine göre belirlenir. Betonarme taşıyıcı elemanlarda bu değer keyfî seçilmez; statik projede beton sınıfı tanımlanır ve karışım o sınıfı sağlayacak biçimde tasarlanır. Bu yüzden araç bir dozaj önermez; değeri siz girersiniz.`,
      `Gündelik konuşmada 150–200 dozun dolgu ve grobeton gibi yük taşımayan işlerde, 250–300 dozun şap ve basit saha betonlarında, 300–400 dozun ise yapısal betonlarda anıldığı sık duyulur. Bunlar kaba alışkanlık değerleridir ve dayanım garantisi anlamına gelmez; aynı dozajla hazırlanan iki karışım, su miktarı ve agrega kalitesi farklıysa çok farklı dayanım verebilir. Taşıyıcı elemanlar için santralden sınıfı belgeli hazır beton kullanmak ve güncel yönetmelikleri kontrol etmek gerekir.`,
    ] },
    { h: 'Hızlı başvuru: 1 m³ için torba sayısı', p: [
      `Aşağıdaki değerler doğrudan dozajın torba ağırlığına bölünmesiyle elde edilir ve araçtaki "1 m³ karışım için torba" satırıyla aynıdır.`,
    ], ul: [
      '<strong>200 doz:</strong> 50 kg\'lık torbadan 4, 25 kg\'lık torbadan 8',
      '<strong>250 doz:</strong> 50 kg\'lık torbadan 5, 25 kg\'lık torbadan 10',
      '<strong>300 doz:</strong> 50 kg\'lık torbadan 6, 25 kg\'lık torbadan 12',
      '<strong>350 doz:</strong> 50 kg\'lık torbadan 7, 25 kg\'lık torbadan 14',
      '<strong>400 doz:</strong> 50 kg\'lık torbadan 8, 25 kg\'lık torbadan 16',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Dozajı kuru malzeme hacmine uygulamak. Dozaj, karıştırılıp yerine yerleşmiş 1 m³ içindir; kum ve çakılın gevşek hacimlerinin toplamı bitmiş beton hacminden büyüktür.',
      'Hacmi santimetreyle çarpmak. 5 cm şap için kalınlık 5 değil 0,05 metre yazılmalıdır; aksi halde sonuç yüz kat büyür.',
      'Karışıma dayanımı artırır düşüncesiyle fazla su eklemek. Fazla su işlenebilirliği artırır ama dayanımı düşürür ve çatlamayı artırır.',
      'Torbaları uzun süre nemli ortamda bekletmek. Çimento havadaki nemle tepkimeye girip topaklanır; taşlaşmış çimento kullanılmaz.',
      'Zemindeki bozukluklar ve kalıp esnemesi nedeniyle hacmin hesaplanandan fazla çıkacağını unutmak; bunun için küçük bir fire payı eklemek yerinde olur.',
    ] },
    { h: 'Saklama, güvenlik ve sınırlar', p: [
      `Çimento torbaları kuru, kapalı bir yerde, zeminden yükseltilmiş palet üzerinde ve duvara değmeyecek biçimde istiflenmelidir. Raf ömrü sınırlıdır; torba üzerindeki üretim tarihine bakın ve ihtiyacınızdan çok fazlasını stoklamayın. Islak çimento ciltte tahrişe ve yanığa yol açabilir; çalışırken eldiven, gözlük ve toz maskesi kullanın, cilde temas eden harcı bol suyla yıkayın.`,
      `Bu araç yalnızca çimento miktarını verir; kum, çakıl ve su oranlarını ya da betonun ulaşacağı dayanımı hesaplamaz. Sonuçlar keşif ve bütçe amaçlı bilgilendirmedir. Kolon, kiriş, döşeme, temel gibi taşıyıcı elemanların betonu için karışım tasarımı ve beton sınıfı inşaat mühendisinin sorumluluğundadır.`,
    ] },
  ],
  faq: [
    ['1 metreküp betona kaç torba çimento gider?', 'Dozaja bağlıdır. 300 dozlu karışımda 300 kg çimento, yani 50 kg\'lık torbadan 6 adet gider. 250 dozda 5, 350 dozda 7, 400 dozda 8 torba gerekir.'],
    ['Dozaj (doz) ne demektir?', 'Yerine yerleşmiş 1 metreküp beton ya da harcın içindeki çimentonun kilogram cinsinden miktarıdır. "300 doz" 300 kg/m³ çimento anlamına gelir.'],
    ['1 torba çimento kaç kilogramdır?', 'Türkiye\'de en yaygın torba 50 kg\'dır; perakende satışta 25 kg\'lık torbalar da bulunur. Hazır harç ve yapıştırıcı torbaları farklı ağırlıklarda olabilir; torbanın üzerindeki net ağırlığı kontrol edin.'],
    ['20 metrekare şap için kaç torba çimento gerekir?', '5 cm kalınlıkta 20 m² şap 1 m³ eder. 300 dozla 300 kg, yani 6 torba (50 kg) çimento gerekir. Kalınlık 4 cm olursa hacim 0,8 m³, çimento 240 kg, torba sayısı 5 olur.'],
    ['Fire payı eklemeli miyim?', 'Küçük işlerde torba sayısı zaten yukarı yuvarlandığı için çoğu zaman gerekmez. Zemin bozuksa, hacim tahminiyse ya da tamamlama almak zorsa %5–10 pay eklemek tedbirli olur.'],
    ['Araç kum ve çakıl miktarını da veriyor mu?', 'Hayır, yalnızca çimentoyu hesaplar. Agrega miktarları karışım oranına göre değişir; bunun için harç karışımı ve kum-çakıl hesaplayıcılarını kullanabilirsiniz.'],
    ['Hazır beton alacaksam bu hesap gerekli mi?', 'Hazır betonda çimento santralde tartılarak eklenir; sizin sipariş edeceğiniz şey metreküp ve beton sınıfıdır. Bu araç daha çok elle ya da betoniyerle karılan küçük işler içindir.'],
    ['Girdiğim değerler saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; hacim ve dozaj bilgileri sunucuya gönderilmez, kaydedilmez.'],
  ],
  related: ['harc-karisim-hesapla', 'sap-hesapla', 'kum-cakil-hesapla', 'temel-beton-hesapla', 'kolon-beton-hesapla'],
};
