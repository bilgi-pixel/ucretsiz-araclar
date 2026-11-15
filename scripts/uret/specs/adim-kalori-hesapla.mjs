export default {
  slug: 'adim-kalori-hesapla',
  title: 'Adım Sayısından Kalori Hesaplama',
  h1Tail: 'adım → mesafe → kcal',
  pageTitle: 'Adım Sayısından Kalori Hesaplama – 10.000 Adım Kaç Kalori?',
  description: 'Attığınız adım sayısını, boyunuzu ve kilonuzu yazın; yürünen mesafeyi, yaklaşık süreyi ve yakılan kaloriyi tempoya göre hesaplayın. 10.000 adım kaç kalori?',
  card: 'Adım sayınızı kaloriye çevirin: boy, kilo ve tempoya göre mesafe, süre ve yakılan enerji.',
  category: 'saglik',
  keywords: ['adım kalori hesaplama', '10000 adım kaç kalori', 'adım sayısından kalori', 'kaç adım kaç kalori', '10 bin adım kaç km', 'adım mesafe hesaplama', 'yürüyüş adım kalori'],
  lead: 'Telefonunuzun ya da akıllı saatinizin saydığı adımları enerjiye çevirin. Araç, boyunuzdan adım uzunluğunu tahmin eder, yürünen <strong>mesafeyi ve süreyi</strong> bulur ve kilonuzla tempoya göre <strong>yakılan kaloriyi</strong> hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'adim', label: 'Adım sayısı', type: 'number', placeholder: 'Örn. 10000' },
    { id: 'boy', label: 'Boy (cm)', type: 'number', placeholder: 'Örn. 170' },
    { id: 'kilo', label: 'Kilo (kg)', type: 'number', placeholder: 'Örn. 70' },
    { id: 'tempo', label: 'Yürüyüş temposu', type: 'select', options: [['orta', 'Orta (yaklaşık 4,8 km/sa)'], ['yavas', 'Yavaş (yaklaşık 3,2 km/sa)'], ['hizli', 'Hızlı (yaklaşık 6,4 km/sa)']] },
    { id: 'adimBoyu', label: 'Adım uzunluğu (cm, isteğe bağlı)', type: 'number', placeholder: 'Boş = boydan tahmin', hint: 'Kendi adımınızı ölçtüyseniz yazın; boş bırakırsanız boy × 0,414 kullanılır.' },
  ],
  compute(v, h) {
    const adim = h.posint(v.adim, 'Adım sayısı');
    const kilo = h.pos(v.kilo, 'Kilo');
    if (adim > 500000) h.err('Adım sayısı 500.000\'den büyük olamaz; tek bir güne ya da yürüyüşe ait değeri yazın.');
    if (kilo < 20 || kilo > 400) h.err('Kilo 20 ile 400 kg arasında olmalı.');
    let adimCm;
    if (String(v.adimBoyu ?? '').trim() !== '') {
      adimCm = h.pos(v.adimBoyu, 'Adım uzunluğu');
      if (adimCm < 20 || adimCm > 150) h.err('Adım uzunluğu 20 ile 150 cm arasında olmalı.');
    } else {
      const boy = h.pos(v.boy, 'Boy');
      if (boy < 100 || boy > 250) h.err('Boy 100 ile 250 cm arasında olmalı; santimetre cinsinden yazın.');
      adimCm = boy * 0.414;
    }
    const tablo = { yavas: [3.2, 2.8], orta: [4.8, 3.5], hizli: [6.4, 5.0] };
    const [hiz, met] = tablo[v.tempo] || tablo.orta;
    const km = adim * adimCm / 100000;
    const saat = km / hiz;
    const kcal = met * kilo * saat;
    const net = (met - 1) * kilo * saat;
    const dk = saat * 60;
    const sa = Math.floor(dk / 60 + 1e-9);
    const kalanDk = Math.round(dk - sa * 60);
    const sureMetin = sa > 0 ? `${sa} sa ${kalanDk} dk` : `${h.fmt(dk, 0)} dk`;
    return {
      rows: [
        ['Yakılan kalori', h.fmt(kcal, 0) + ' kcal'],
        ['Mesafe', h.fmt(km, 2) + ' km'],
        ['Yaklaşık süre', sureMetin],
        ['Adım uzunluğu', h.fmt(adimCm, 1) + ' cm'],
        ['1.000 adımda kalori', h.fmt(kcal / adim * 1000, 1) + ' kcal'],
        ['Net kalori (dinlenme hariç)', h.fmt(net, 0) + ' kcal'],
      ],
      note: `Hesap ${h.fmt(met, 1)} MET ve ${h.fmt(hiz, 1)} km/sa tempo varsayımıyla yapılır. Eğim, zemin ve kişisel farklar sonucu değiştirir; değerler tahmindir.`,
    };
  },
  cases: [
    { in: { adim: '10000', boy: '170', kilo: '70', tempo: 'orta' }, out: { 'Yakılan kalori': '359 kcal', 'Mesafe': '7,04 km', 'Yaklaşık süre': '1 sa 28 dk', 'Adım uzunluğu': '70,4 cm', '1.000 adımda kalori': '35,9 kcal' } },
    { in: { adim: '5000', boy: '160', kilo: '60', tempo: 'yavas' }, out: { 'Yakılan kalori': '174 kcal', 'Mesafe': '3,31 km', 'Yaklaşık süre': '1 sa 2 dk' } },
    { in: { adim: '8000', boy: '180', kilo: '85', tempo: 'hizli' }, out: { 'Yakılan kalori': '396 kcal', 'Mesafe': '5,96 km', 'Yaklaşık süre': '56 dk' } },
    { in: { adim: '10000', kilo: '80', tempo: 'orta', adimBoyu: '75' }, out: { 'Yakılan kalori': '438 kcal', 'Mesafe': '7,5 km', 'Adım uzunluğu': '75 cm', 'Net kalori (dinlenme hariç)': '313 kcal' } },
    { in: { adim: '1000', boy: '170', kilo: '70', tempo: 'orta' }, out: { 'Yakılan kalori': '36 kcal', 'Mesafe': '0,7 km', 'Yaklaşık süre': '9 dk' } },
    { in: { adim: '20000', boy: '175', kilo: '90', tempo: 'orta' }, out: { 'Yakılan kalori': '951 kcal', 'Mesafe': '14,49 km' } },
    { in: { adim: '0', boy: '170', kilo: '70', tempo: 'orta' }, error: true },
    { in: { adim: '10000', boy: '', kilo: '70', tempo: 'orta' }, error: true },
    { in: { adim: '10000', boy: '1,70', kilo: '70', tempo: 'orta' }, error: true },
  ],
  howto: [
    '"Adım sayısı" alanına telefonunuzun, akıllı saatinizin ya da adımsayarınızın gösterdiği değeri yazın.',
    'Boyunuzu santimetre, kilonuzu kilogram olarak girin. Boy, adım uzunluğunu tahmin etmek için; kilo, harcanan enerjiyi bulmak için kullanılır.',
    'Yürüyüş temponuzu seçin: gezinti hızındaysanız yavaş, olağan yürüyüşte orta, nefesinizi hızlandıran tempoda hızlı.',
    'Adımınızı daha önce ölçtüyseniz "Adım uzunluğu" alanına santimetre olarak yazın; bu durumda boy alanı dikkate alınmaz.',
    '"Hesapla" düğmesine basın; yakılan kalori, mesafe, süre ve 1.000 adım başına düşen enerji listelenir.',
  ],
  sections: [
    { h: 'Adım sayısı kaloriye nasıl çevrilir?', p: [
      'Hesap üç adımda yapılır. Önce adım uzunluğu bulunur: ölçülmüş bir değer yoksa yürüyüş için yaygın kullanılan <strong>adım uzunluğu ≈ boy × 0,414</strong> tahmini uygulanır. Sonra mesafe hesaplanır: <strong>mesafe = adım sayısı × adım uzunluğu</strong>. Son olarak mesafe seçilen tempoya bölünerek süre elde edilir ve enerji, fiziksel aktivite çalışmalarında kullanılan MET yöntemiyle bulunur: <strong>kalori = MET × kilo (kg) × süre (saat)</strong>.',
      'MET, bir etkinliğin dinlenme hâline göre kaç kat enerji harcattığını gösteren katsayıdır. Araç yavaş yürüyüş için 2,8, orta tempo için 3,5, hızlı yürüyüş için 5,0 MET değerini kullanır. Bu değerler düz ve sert zeminde yürüyüş için kabul edilen tipik katsayılardır.',
    ] },
    { h: 'Çözümlü örnek: 10.000 adım kaç kalori?', p: [
      'Boyu 170 cm, kilosu 70 kg olan biri orta tempoda 10.000 adım atmış olsun. Adım uzunluğu 170 × 0,414 = 70,38 cm\'dir. Mesafe 10.000 × 70,38 cm = 703.800 cm, yani yaklaşık <strong>7,04 km</strong> eder. Saatte 4,8 km hızla bu mesafe 7,038 ÷ 4,8 = 1,466 saat, yani yaklaşık 1 saat 28 dakika sürer. Enerji 3,5 × 70 × 1,466 = <strong>yaklaşık 359 kcal</strong> olarak bulunur; bu da her 1.000 adım için kabaca 36 kcal demektir.',
      'Aynı adım sayısını 90 kg bir kişi atarsa sonuç kiloyla orantılı olarak artar; 60 kg bir kişide ise azalır. Bu yüzden "10.000 adım şu kadar kalori yakar" biçimindeki tek sayılı cevaplar herkes için doğru olamaz.',
    ] },
    { h: 'Brüt kalori ve net kalori farkı', p: [
      'MET hesabı, etkinlik sırasında harcanan toplam enerjiyi verir; bunun içinde o sürede hiçbir şey yapmasanız da harcayacağınız dinlenme enerjisi de vardır. Araç bu yüzden ikinci bir satırda <strong>net kaloriyi</strong> gösterir: MET değerinden 1 çıkarılarak yalnızca yürüyüşün eklediği enerji hesaplanır. Yukarıdaki örnekte brüt değer 359 kcal iken net değer yaklaşık 257 kcal\'dir.',
      'Kilo kontrolü planlarken net değeri kullanmak daha temkinlidir; çünkü günlük enerji ihtiyacınız zaten dinlenme harcamasını içerir. Brüt değeri bunun üzerine eklemek aynı enerjiyi iki kez saymak olur.',
    ] },
    { h: 'Adım uzunluğunu kendiniz ölçün', p: [
      'Boydan yapılan tahmin ortalama bir değerdir; bacak uzunluğu, yaş ve yürüme alışkanlığı adımı değiştirir. Daha doğru sonuç için düz bir zeminde 20 adım atın, başlangıç ve bitiş noktası arasını metreyle ölçün ve 20\'ye bölün. Örneğin 20 adımda 15 metre gittiyseniz adımınız 75 cm\'dir. Bu değeri "Adım uzunluğu" alanına yazdığınızda mesafe sizin adımınıza göre hesaplanır.',
      'Hızlandıkça adım uzar, yavaşladıkça kısalır. Koşu adımı yürüyüş adımından belirgin biçimde uzundur; bu araç yürüyüş içindir, koşu için ayrı bir hesap kullanılmalıdır.',
    ] },
    { h: 'Hızlı başvuru: 70 kg, 170 cm, orta tempo', ul: [
      '<strong>2.000 adım</strong> ≈ 1,41 km ≈ 72 kcal',
      '<strong>5.000 adım</strong> ≈ 3,52 km ≈ 180 kcal',
      '<strong>7.500 adım</strong> ≈ 5,28 km ≈ 269 kcal',
      '<strong>10.000 adım</strong> ≈ 7,04 km ≈ 359 kcal',
      '<strong>15.000 adım</strong> ≈ 10,56 km ≈ 539 kcal',
    ] },
    { h: 'Sonucu etkileyen etkenler ve sınırlar', p: [
      'Yokuş çıkmak, kumda ya da karda yürümek, sırt çantası taşımak ve merdiven kullanmak harcamayı artırır; araç düz zemin varsayar. Adımsayarlar da hatasız değildir: telefon cepte ya da çantada taşındığında, araç yolculuğundaki sarsıntılarda ya da bebek arabası iterken sayım sapabilir.',
      'Sonuçlar bilgilendirme amaçlı tahminlerdir; tıbbi ya da beslenme önerisi yerine geçmez. Kalp, eklem ya da başka bir sağlık sorununuz varsa yürüyüş programına başlamadan önce hekiminize danışın.',
    ] },
  ],
  faq: [
    ['10.000 adım kaç kalori yakar?', 'Kiloya, boya ve tempoya göre değişir. 70 kg ve 170 cm bir kişi orta tempoda yaklaşık 359 kcal harcar. 90 kg bir kişide bu değer 460 kcal civarına çıkar, 55 kg bir kişide 280 kcal civarına iner.'],
    ['10.000 adım kaç kilometre eder?', 'Adım uzunluğuna bağlıdır. 170 cm boyunda biri için tahmini adım 70,4 cm olduğundan 10.000 adım yaklaşık 7,04 km eder. 160 cm boy için bu mesafe yaklaşık 6,6 km, 185 cm için yaklaşık 7,7 km\'dir.'],
    ['Adım uzunluğu neden boy × 0,414 alınıyor?', 'Bu çarpan, yürüyüşte adım uzunluğunu boydan tahmin etmek için yaygın kullanılan ortalama bir değerdir. Kişisel adımınız bundan farklı olabilir; en doğru sonuç için adımınızı ölçüp ilgili alana yazın.'],
    ['Hızlı yürümek daha çok kalori yakar mı?', 'Aynı adım sayısı için hızlı tempo daha yüksek MET değeri taşır, ancak mesafeyi daha kısa sürede bitirirsiniz. Araçtaki katsayılarla hızlı yürüyüş, aynı adım sayısında orta tempoya göre biraz daha fazla enerji harcatır; asıl fark, aynı sürede daha çok adım atabilmenizden gelir.'],
    ['Net kalori ile toplam kalori arasındaki fark nedir?', 'Toplam kalori yürüyüş süresince harcadığınız bütün enerjidir. Net kalori, o sürede dinlenirken de harcayacağınız enerjiyi çıkarır ve yalnızca yürüyüşün katkısını gösterir. Kalori açığı hesabında net değeri kullanmak daha doğrudur.'],
    ['Koşu adımlarını da bu araçla hesaplayabilir miyim?', 'Hayır, katsayılar ve adım uzunluğu tahmini yürüyüşe göredir. Koşuda adım uzar ve enerji harcaması farklı hesaplanır; koşu için ayrı kalori aracını kullanın.'],
    ['Akıllı saatim farklı bir kalori gösteriyor, hangisi doğru?', 'İkisi de tahmindir. Saatler nabız, ivmeölçer ve kişisel profil verisini birleştirir; bu araç ise standart MET katsayılarını kullanır. Aradaki fark olağandır; eğilimi izlemek için tek bir kaynağı tutarlı biçimde kullanmak yeterlidir.'],
    ['Girdiğim bilgiler saklanıyor mu?', 'Hayır. Adım, boy ve kilo bilgileriniz yalnızca tarayıcınızda işlenir; hiçbir sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['adim-hesapla', 'yuruyus-kalori-hesapla', 'met-kalori-hesapla', 'kalori-acigi-hesapla', 'merdiven-kalori-hesapla'],
};
